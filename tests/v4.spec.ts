// V4 smoke and behaviour tests. Run with: npm run build && npm run test:e2e
import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = [
  "/",
  "/services/",
  "/about/",
  "/contact/",
  "/website-review/",
  "/privacy/",
  "/terms/",
  "/accessibility/",
  "/404.html",
];
const widths = [320, 390, 768, 1440];

/** Fails the test on any console error or uncaught exception. */
function watchErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

/** Answers the form receiver the way Netlify would, and records the body. */
async function fakeReceiver(page: Page, status = 200) {
  const posts: string[] = [];
  await page.route("**/*", async (route) => {
    const request = route.request();
    if (request.method() !== "POST") return route.continue();
    posts.push(request.postData() ?? "");
    await route.fulfill({ status, body: "" });
  });
  return posts;
}

for (const width of widths) {
  for (const path of pages) {
    test(`smoke ${path} at ${width}`, async ({ page }) => {
      const errors = watchErrors(page);
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path, { waitUntil: "networkidle" });
      await expect(page.locator("h1")).toHaveCount(1);
      // Scroll through, so every reveal and observer runs.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 30));
        }
      });
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, "horizontal overflow").toBeLessThanOrEqual(0);
      expect(await page.locator("text=TBC").count(), "no TBC text").toBe(0);
      expect(await page.locator("text=XXXXX").count(), "no phone placeholder").toBe(0);
      expect(errors).toEqual([]);
    });
  }
}

for (const path of pages) {
  for (const width of [390, 1440]) {
    test(`axe ${path} at ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path, { waitUntil: "networkidle" });
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
        .analyze();
      const serious = results.violations.filter(
        (violation) => violation.impact === "serious" || violation.impact === "critical",
      );
      expect(
        serious.map((violation) => `${violation.id}: ${violation.nodes.map((node) => node.target).join(" | ")}`),
      ).toEqual([]);
    });
  }
}

test.describe("shell", () => {
  test("nav links and current page at 1440, hidden at 390", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/services/");
    const current = page.locator('.links a[aria-current="page"]');
    await expect(current).toHaveText("Services");
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator(".links")).toBeHidden();
  });

  test("drawer opens, traps Tab, closes on Esc and returns focus", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/about/");
    const button = page.locator("#menu-button");
    await button.click();
    await expect(page.locator("#menu")).toBeVisible();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator(".d-close")).toBeFocused();
    await expect(page.locator('.d-links a[aria-current="page"]')).toHaveText("About");
    for (let i = 0; i < 25; i += 1) {
      await page.keyboard.press("Tab");
      const inside = await page.evaluate(() =>
        Boolean(document.activeElement?.closest("#menu")),
      );
      expect(inside, `focus stays in the drawer after ${i + 1} Tabs`).toBe(true);
    }
    await page.keyboard.press("Escape");
    await expect(page.locator("#menu")).toBeHidden();
    await expect(button).toBeFocused();
    await expect(button).toHaveAttribute("aria-expanded", "false");
  });

  test("drawer closes on scrim click and on choosing a link", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.locator("#menu-button").click();
    await expect(page.locator("#menu")).toBeVisible();
    await page.mouse.click(100, 450);
    await expect(page.locator("#menu")).toBeHidden();
    await page.locator("#menu-button").click();
    await page.locator('.d-links a:text-is("Work")').click();
    await expect(page.locator("#menu")).toBeHidden();
    await expect(page).toHaveURL(/#work$/);
  });

  test("mobile bar appears after the hero and hides at the contact section", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const bar = page.locator("#mbar");
    await expect(bar).not.toHaveClass(/show/);
    await page.locator("#difference").scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, 1200));
    await expect(bar).toHaveClass(/show/);
    await page.locator("#contact form").scrollIntoViewIfNeeded();
    await expect(bar).not.toHaveClass(/show/);
  });
});

test.describe("home", () => {
  test("hero questions open their answers", async ({ page }) => {
    await page.goto("/");
    const first = page.locator(".hero button.q").first();
    await expect(page.locator("#ans0")).toBeHidden();
    await first.click();
    await expect(first).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#ans0")).toBeVisible();
  });

  test("before and after slider works by keyboard and drag", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const range = page.locator("#ba-range");
    await range.focus();
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");
    await expect(range).toHaveValue("52");
    const pos = () => page.evaluate(() => document.getElementById("ba")!.style.getPropertyValue("--pos"));
    expect(await pos()).toBe("52%");
    const box = (await page.locator("#ba").boundingBox())!;
    await page.mouse.move(box.x + box.width * 0.52, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.2, box.y + box.height / 2, { steps: 8 });
    await page.mouse.up();
    expect(Number(await range.inputValue())).toBeLessThan(30);
  });

  test("service tabs: arrows move selection at 1440", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.locator("#tab-web").focus();
    await page.keyboard.press("ArrowDown");
    await expect(page.locator("#tab-app")).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("#tab-app")).toBeFocused();
    await expect(page.locator("#panel-app")).toBeVisible();
    await expect(page.locator("#panel-web")).toBeHidden();
    await page.keyboard.press("End");
    await expect(page.locator("#tab-care")).toHaveAttribute("aria-selected", "true");
  });

  test("service accordion at 390", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const list = page.locator(".svc-list");
    await expect(list).not.toHaveAttribute("role", "tablist");
    const ai = page.locator("#tab-ai");
    await ai.click();
    await expect(ai).toHaveAttribute("aria-expanded", "true");
    const next = await ai.evaluate((button) => button.nextElementSibling?.id);
    expect(next).toBe("panel-ai");
    await expect(page.locator("#panel-ai")).toBeVisible();
    await ai.click();
    await expect(ai).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator("#panel-ai")).toBeHidden();
  });

  for (const [preset, type] of [
    ["Price question", "Price question"],
    ["Booking", "Booking request"],
    ["Complaint", "Complaint"],
  ]) {
    test(`demo preset: ${preset}`, async ({ page }) => {
      await page.goto("/");
      await page.locator(".chip", { hasText: preset }).click();
      await expect(page.locator("#demo-status")).toHaveText("DONE. READY FOR YOU TO SEND", { timeout: 10_000 });
      await expect(page.locator("#demo-rows .pillv").first()).toHaveText(type);
      await expect(page.locator("#demo-rows .reply-draft")).toContainText("Thanks, Example Plumbing");
    });
  }

  test("demo escapes markup in the message", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.fill("#demo-msg", '<img src=x onerror="window.hacked=1"> Thanks, Eve');
    await page.locator("#demo-form button[type=submit]").click();
    await expect(page.locator("#demo-status")).toHaveText("DONE. READY FOR YOU TO SEND");
    expect(await page.locator("#demo-rows img").count()).toBe(0);
    expect(await page.evaluate(() => (window as unknown as { hacked?: number }).hacked)).toBeUndefined();
  });

  test("FAQ opens", async ({ page }) => {
    await page.goto("/");
    const item = page.locator("#faq details").first();
    await item.locator("summary").click();
    await expect(item).toHaveAttribute("open", "");
    await expect(item.locator("p")).toBeVisible();
  });
});

test.describe("enquiry form", () => {
  for (const path of ["/", "/contact/"]) {
    test(`invalid then valid path on ${path}`, async ({ page }) => {
      const posts = await fakeReceiver(page);
      await page.goto(path);
      const form = page.locator("form.qf");
      const next = form.locator(".qf-next");
      await expect(next).toBeDisabled();
      await form.locator(".opt", { hasText: "A website" }).click();
      await form.locator(".opt", { hasText: "Automation" }).click();
      await expect(next).toBeEnabled();
      await next.click();
      await expect(form.locator(".qf-count")).toHaveText("Step 2 of 4");
      await expect(form.locator(".qf-back")).toBeVisible();
      await expect(next).toBeDisabled();
      await form.locator('.qf-step[data-step="2"] .opt', { hasText: "£1k–3k" }).click();
      await next.click();
      await form.locator(".opt", { hasText: "In 1–3 months" }).click();
      await next.click();
      await expect(form.locator(".qf-count")).toHaveText("Step 4 of 4");
      await expect(next).toHaveText(/Send/);
      await next.click();
      await expect(form.locator(".err")).toHaveText("Please add your name so I know who to reply to.");
      await expect(form.locator('input[name="name"]')).toHaveAttribute("aria-invalid", "true");
      await expect(form.locator('input[name="name"]')).toBeFocused();
      await form.locator('input[name="name"]').fill("Test Person");
      await form.locator('input[name="email"]').fill("not-an-email");
      await next.click();
      await expect(form.locator(".err")).toHaveText("That email address doesn't look right. Please check it.");
      await expect(form.locator('input[name="email"]')).toBeFocused();
      await form.locator('input[name="email"]').fill("test@example.com");
      await form.locator('input[name="business"]').fill("Test Ltd");
      await next.click();
      await expect(form.locator(".qf-done")).toBeVisible();
      await expect(form.locator(".qf-thanks")).toHaveText("Thanks, Test.");
      await expect(form.locator(".qf-sum")).toContainText("A website, Automation");
      expect(posts).toHaveLength(1);
      const body = new URLSearchParams(posts[0]);
      expect(body.get("form-name")).toBe("enquiry");
      expect(body.get("needs")).toBe("A website, Automation");
      expect(body.get("budget")).toBe("£1k–3k");
      expect(body.get("timing")).toBe("In 1–3 months");
      expect(body.get("name")).toBe("Test Person");
      expect(body.get("email")).toBe("test@example.com");
      expect(body.get("business")).toBe("Test Ltd");
      expect(body.has("message")).toBe(true);
      expect(body.get("bot-field")).toBe("");
    });
  }

  test("a failed send shows the engine's message, not success", async ({ page }) => {
    await fakeReceiver(page, 500);
    await page.goto("/contact/");
    const form = page.locator("form.qf");
    const next = form.locator(".qf-next");
    await form.locator(".opt", { hasText: "Not sure yet" }).click();
    await next.click();
    await form.locator('.qf-step[data-step="2"] .opt', { hasText: "Not sure" }).click();
    await next.click();
    await form.locator(".opt", { hasText: "Just exploring" }).click();
    await next.click();
    await form.locator('input[name="name"]').fill("Test");
    await form.locator('input[name="email"]').fill("test@example.com");
    await next.click();
    await expect(form.locator(".qf-status")).toContainText("could not confirm");
    await expect(form.locator(".qf-done")).toBeHidden();
  });
});

test.describe("review form", () => {
  test("validation messages, then a confirmed send", async ({ page }) => {
    const posts = await fakeReceiver(page);
    await page.goto("/website-review/");
    await page.locator('a[href="#request"]').click();
    await expect(page.locator("#request")).toBeFocused();
    const form = page.locator("form.review-form");
    await form.locator(".submit").click();
    const summary = form.locator(".error-summary");
    await expect(summary).toBeVisible();
    await expect(summary).toContainText("Please add your name.");
    await expect(summary).toContainText("Please check your email address.");
    await expect(summary).toContainText("Please add your website address.");
    await expect(form.locator("#review-name")).toHaveAttribute("aria-invalid", "true");
    await form.locator("#review-name").fill("Test Person");
    await form.locator("#review-email").fill("test@example");
    await form.locator("#review-website").fill("not a site");
    await form.locator(".submit").click();
    await expect(summary).toContainText("Please check your email address.");
    await expect(summary).toContainText("Please add your website address.");
    await form.locator("#review-email").fill("test@example.com");
    await form.locator("#review-website").fill("example.co.uk");
    await form.locator("#review-goal").fill("Bring in enquiries");
    await form.locator(".submit").click();
    await expect(form.locator(".confirmation")).toBeVisible();
    await expect(form.locator(".confirmation")).toContainText(
      "Your review request has been received. Dave will review the website and email you the report.",
    );
    const body = new URLSearchParams(posts[0]);
    expect(body.get("form-name")).toBe("website-review");
    expect(body.get("website")).toBe("example.co.uk");
    expect(body.get("goal")).toBe("Bring in enquiries");
  });
});

test.describe("reduced motion", () => {
  test.use({ colorScheme: "dark" });
  for (const path of ["/", "/services/", "/404.html"]) {
    test(`everything static and visible on ${path}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path, { waitUntil: "networkidle" });
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      // Let the 0.01ms reduced-motion transitions (nav, progress bar) finish.
      await page.waitForTimeout(100);
      expect(await page.locator(".reveal.pending").count()).toBe(0);
      const running = await page.evaluate(() =>
        document.getAnimations().filter((animation) => animation.playState === "running").length,
      );
      expect(running, "no running animations").toBe(0);
      if (path === "/") {
        await expect(page.locator(".typing")).toBeHidden();
        await expect(page.locator(".track-copy")).toBeHidden();
        await expect(page.locator(".reply")).toBeVisible();
      }
    });
  }
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("Home content is visible and the enquiry form submits natively", async ({ page }) => {
    const posts = await fakeReceiver(page);
    await page.goto("/");
    await expect(page.locator("#ans0")).toBeVisible();
    await expect(page.locator(".svc-panels .panel")).toHaveCount(8);
    for (const panel of await page.locator(".svc-panels .panel").all()) await expect(panel).toBeVisible();
    const form = page.locator("#contact form.qf");
    for (const step of await form.locator(".qf-step").all()) await expect(step).toBeVisible();
    await expect(form.locator(".qf-top")).toBeHidden();
    await form.locator(".opt", { hasText: "A website" }).click();
    await form.locator('input[name="name"]').fill("Test Person");
    await form.locator('input[name="email"]').fill("test@example.com");
    await form.locator(".qf-next").click();
    await expect.poll(() => posts.length).toBe(1);
    const body = new URLSearchParams(posts[0]);
    expect(body.get("form-name")).toBe("enquiry");
    expect(body.get("needs")).toBe("A website");
  });

  test("the review form submits natively", async ({ page }) => {
    const posts = await fakeReceiver(page);
    await page.goto("/website-review/");
    const form = page.locator("form.review-form");
    await form.locator("#review-name").fill("Test Person");
    await form.locator("#review-email").fill("test@example.com");
    await form.locator("#review-website").fill("example.co.uk");
    await form.locator(".submit").click();
    await expect.poll(() => posts.length).toBe(1);
    expect(new URLSearchParams(posts[0]).get("form-name")).toBe("website-review");
  });

  test("every page shows its content", async ({ page }) => {
    for (const path of pages) {
      await page.goto(path);
      await expect(page.locator("h1")).toBeVisible();
      expect(await page.locator(".reveal.pending").count()).toBe(0);
    }
  });
});

test.describe("content security policy", () => {
  // Serves each page with the policy from netlify.toml and fails on any
  // violation, so the policy never blocks the site's own scripts, styles,
  // fonts, images, view transitions or forms.
  for (const path of pages) {
    test(`nothing blocked on ${path}`, async ({ page }) => {
      const { readFileSync } = await import("node:fs");
      const policy = /Content-Security-Policy\s*=\s*"([^"]*)"/.exec(
        readFileSync("netlify.toml", "utf8"),
      )?.[1];
      expect(policy).toBeTruthy();
      await page.route("**/*", async (route) => {
        const response = await route.fetch();
        const headers = { ...response.headers(), "content-security-policy": policy! };
        await route.fulfill({ response, headers });
      });
      const violations: string[] = [];
      page.on("console", (message) => {
        if (/Content Security Policy|Refused to/i.test(message.text())) violations.push(message.text());
      });
      await page.goto(path, { waitUntil: "networkidle" });
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(300);
      expect(violations).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.classList.contains("js-ok"))).toBe(true);
    });
  }
});

test.describe("V4 fix run", () => {
  test("the demo's first result is the engine's: Sort it changes nothing", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const before = (await page.locator("#demo-rows").innerText()).replace(/\s+/g, " ");
    await page.locator("#demo-form button[type=submit]").click();
    await expect(page.locator("#demo-status")).toHaveText("DONE. READY FOR YOU TO SEND");
    const after = (await page.locator("#demo-rows").innerText()).replace(/\s+/g, " ");
    expect(after).toBe(before);
  });

  test("skip link: hidden on load, shown on first Tab, hidden again on blur", async ({ page }) => {
    await page.goto("/");
    const bottom = () => page.locator(".skip").evaluate((el) => el.getBoundingClientRect().bottom);
    expect(await bottom()).toBeLessThanOrEqual(0);
    await page.keyboard.press("Tab");
    await expect(page.locator(".skip")).toBeFocused();
    await expect.poll(bottom).toBeGreaterThan(0);
    await page.keyboard.press("Tab");
    await expect.poll(bottom).toBeLessThanOrEqual(0);
  });

  test("review form: website example is a placeholder, and empty is required", async ({ page }) => {
    await page.goto("/website-review/");
    const field = page.locator("#review-website");
    await expect(field).toHaveValue("");
    expect(await field.getAttribute("value")).toBeNull();
    expect(await field.getAttribute("placeholder")).toBe("www.yourbusiness.co.uk");
    expect(await field.evaluate((el) => getComputedStyle(el, "::placeholder").color)).toBe("rgb(141, 149, 145)");
    await page.fill("#review-name", "Test");
    await page.fill("#review-email", "test@example.com");
    await page.locator("form.review-form .submit").click();
    await expect(page.locator("#review-website-error")).toHaveText("Please add your website address.");
  });

  for (const width of [390, 768]) {
    test(`QuoteFlow preview is not cut off at ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      const frame = await page.locator(".wcard .wshot").first().boundingBox();
      const head = await page.locator(".mini .mh").boundingBox();
      expect(head!.y).toBeGreaterThanOrEqual(frame!.y);
    });
  }

  test("the price guide sentence never renders on Contact", async ({ page }) => {
    await page.goto("/contact/");
    expect(await page.locator("#faq").innerText()).not.toContain("price guide");
  });

  test("mobile bar hides while the drawer is open", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/services/");
    await page.evaluate(() => window.scrollTo(0, 1400));
    await expect(page.locator("#mbar")).toHaveClass(/show/);
    await expect(page.locator("#mbar")).toBeInViewport();
    await page.locator("#menu-button").click();
    await expect(page.locator("#mbar")).not.toBeInViewport();
    await page.keyboard.press("Escape");
    await expect(page.locator("#mbar")).toBeInViewport();
  });
});

test.describe("accessibility checks", () => {
  /** Where focus shows: the chip for a hidden radio or checkbox, the knob for
   * the slider, otherwise the focused element itself. */
  const focusRing = () => {
    const el = document.activeElement as HTMLElement | null;
    if (!el || el === document.body) return null;
    let target: Element = el;
    if (el.matches(".opt input")) target = el.nextElementSibling ?? el;
    if (el.id === "ba-range") target = document.querySelector(".ba .knob") ?? el;
    const style = getComputedStyle(target);
    const box = target.getBoundingClientRect();
    return {
      tag: el.tagName + (el.id ? "#" + el.id : "") + (el.className ? "." + String(el.className).split(" ")[0] : ""),
      outline: style.outlineStyle !== "none" && parseFloat(style.outlineWidth) >= 2,
      onScreen: box.width > 0 && box.height > 0 && box.bottom > 0 && box.top < window.innerHeight,
    };
  };

  for (const path of pages) {
    test(`keyboard: every stop on ${path} shows a visible focus indicator`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path, { waitUntil: "networkidle" });
      let stops = 0;
      for (let i = 0; i < 150; i += 1) {
        await page.keyboard.press("Tab");
        // One frame for the skip link's slide-in transition to apply.
        await page.waitForTimeout(60);
        const state = await page.evaluate(focusRing);
        if (!state) break;
        expect(state.outline, `focus outline on ${state.tag}`).toBe(true);
        expect(state.onScreen, `${state.tag} in view when focused`).toBe(true);
        stops += 1;
      }
      expect(stops).toBeGreaterThan(5);
    });
  }

  test("keyboard only: the enquiry form can be completed and sent", async ({ page }) => {
    const posts = await fakeReceiver(page);
    await page.goto("/contact/");
    const form = page.locator("form.qf");
    await form.locator('input[data-need="website"]').focus();
    await page.keyboard.press("Space");
    await page.keyboard.press("Enter");
    await expect(form.locator(".qf-count")).toHaveText("Step 2 of 4");
    await form.locator('input[name="budget"]').first().focus();
    await page.keyboard.press("Space");
    await page.keyboard.press("Enter");
    await form.locator('input[name="timing"]').first().focus();
    await page.keyboard.press("Space");
    await page.keyboard.press("Enter");
    await expect(form.locator('input[name="name"]')).toBeFocused();
    await page.keyboard.type("Keyboard Test");
    await page.keyboard.press("Tab");
    await page.keyboard.type("keyboard@example.com");
    await page.keyboard.press("Enter");
    await expect(form.locator(".qf-done")).toBeVisible();
    expect(posts).toHaveLength(1);
  });

  test("keyboard only: the review form can be completed and sent", async ({ page }) => {
    const posts = await fakeReceiver(page);
    await page.goto("/website-review/");
    await page.locator("#review-name").focus();
    await page.keyboard.type("Keyboard Test");
    await page.keyboard.press("Tab");
    await page.keyboard.type("keyboard@example.com");
    await page.keyboard.press("Tab");
    await page.keyboard.type("example.co.uk");
    await page.keyboard.press("Enter");
    await expect(page.locator("form.review-form .confirmation")).toBeVisible();
    expect(posts).toHaveLength(1);
  });

  for (const path of pages) {
    test(`forced colours: ${path} renders with no errors or overflow`, async ({ page }) => {
      const errors = watchErrors(page);
      await page.emulateMedia({ forcedColors: "active" });
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(path, { waitUntil: "networkidle" });
      await expect(page.locator("h1")).toBeVisible();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
      expect(errors).toEqual([]);
    });
  }

  for (const path of pages) {
    test(`colour contrast (axe) on ${path}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path, { waitUntil: "networkidle" });
      // The grain overlay stops axe deciding; it shifts colours by a few per
      // cent at most, so measure the colours underneath it.
      await page.addStyleTag({ content: ".grain{display:none!important}" });
      const results = await new AxeBuilder({ page }).withRules(["color-contrast"]).analyze();
      expect(results.violations.map((v) => v.nodes.map((n) => n.target.join(" ")).join(", "))).toEqual([]);
    });
  }
});
