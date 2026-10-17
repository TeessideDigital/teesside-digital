// The price guide only renders when pricing.confirmed is true. To test it, set
// that flag, build, run: npx playwright test price-guide; then set it back.
import { expect, test } from "@playwright/test";

test("price guide calculates, lists items and pre-ticks the enquiry need", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#prices");
  test.skip((await section.count()) === 0, "pricing.confirmed is false, so the price guide is not built");
  await expect(page.locator('.links a:text-is("Prices")')).toHaveAttribute("href", "#prices");
  await page.emulateMedia({ reducedMotion: "reduce" });
  const range = page.locator("#pg-range");
  await expect(range).toHaveText("£800 – £1,500");
  await section.locator(".opt", { hasText: "Web or mobile app" }).click();
  await section.locator(".opt", { hasText: "Medium" }).click();
  await expect(range).toHaveText("£8,000 – £15,000");
  await section.locator(".opt", { hasText: "Take payments" }).click();
  await expect(range).toHaveText("£8,300 – £15,700");
  await section.locator(".opt", { hasText: "Ongoing care" }).click();
  await expect(page.locator("#pg-care")).toHaveText("Plus ongoing care from £30 a month.");
  await expect(page.locator("#pg-list")).toContainText("Medium web or mobile app");
  await expect(page.locator("#pg-list")).toContainText("Taking payments");
  await expect(page.locator("#pg-said")).toHaveText("Typical range £8,300 to £15,700");
  await page.locator("#pg-quote").click();
  await expect(page.locator('#contact input[data-need="app"]')).toBeChecked();
  await expect(page.locator("#contact .qf-next")).toBeEnabled();
  await expect(page).toHaveURL(/#contact$/);
});

test("animated count reaches the new range", async ({ page }) => {
  await page.goto("/");
  test.skip((await page.locator("#prices").count()) === 0, "price guide not built");
  await page.locator("#prices .opt", { hasText: "Large" }).click();
  await expect(page.locator("#pg-range")).toHaveText("£3,000 – £6,000");
});
