/** Honest submission states for the enquiry form.
 * The static form already validates and posts natively. This only replaces that
 * with an accessible summary and outcomes that follow the receiver's response.
 * Nothing is stored, logged or retried, and success is never assumed.
 */
type Field = HTMLInputElement | HTMLTextAreaElement;
type Outcome = "accepted" | "rejected" | "uncertain";

const TIMEOUT = 15000;
const SENDING = "Sending your enquiry...";
const REJECTED = (email: string) =>
  `Your enquiry was not sent. Please try again, or email Dave at ${email}.`;
const UNCERTAIN = (email: string) =>
  `The website could not confirm whether your enquiry was received. To check, email Dave at ${email}. Sending again may create a duplicate.`;

/** Optional. A bare domain is welcome; anything that is not a web address is not. */
function isWebAddress(raw: string) {
  const value = raw.trim();
  if (!value) return true;
  if (/\s/.test(value)) return false;
  try {
    const url = new URL(value.includes("://") ? value : `https://${value}`);
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      url.hostname.includes(".")
    );
  } catch {
    return false;
  }
}

function enhanceContactForm() {
  const form = document.querySelector<HTMLFormElement>("form.contact-form");
  if (!form) return;
  const find = <T extends HTMLElement>(selector: string) =>
    form.querySelector<T>(selector);
  const fields = find(".fields");
  const summary = find(".error-summary");
  const list = find(".error-summary ul");
  const button = find<HTMLButtonElement>(".submit");
  const label = find(".submit span");
  const status = find('[role="status"]');
  const confirmation = find(".confirmation");
  const heading = find(".confirmation h3");
  const email = find(".confirmation a")?.textContent?.trim();
  const name = find<HTMLInputElement>("#contact-name");
  const address = find<HTMLInputElement>("#contact-email");
  const website = find<HTMLInputElement>("#contact-website");
  const message = find<HTMLTextAreaElement>("#contact-message");
  if (
    !fields ||
    !summary ||
    !list ||
    !button ||
    !label ||
    !status ||
    !confirmation ||
    !heading ||
    !email ||
    !name ||
    !address ||
    !website ||
    !message
  )
    return;

  // Field order is the order of the summary. An empty result means valid.
  const checks: [Field, () => string][] = [
    [name, () => (name.value.trim() ? "" : "Enter your name.")],
    [
      address,
      () =>
        !address.value.trim()
          ? "Enter an email address so Dave can reply."
          : address.validity.typeMismatch
            ? "Enter an email address in the format name@example.com."
            : "",
    ],
    [
      website,
      () =>
        isWebAddress(website.value)
          ? ""
          : "Enter a website address like example.co.uk, or leave this blank.",
    ],
    [
      message,
      () =>
        message.value.trim()
          ? ""
          : "Add a short description of what you need help with.",
    ],
  ];
  const idle = label.textContent ?? "";
  let sending = false;

  const slot = (field: Field) => document.getElementById(`${field.id}-error`);
  // The slot joins aria-describedby only while it has something to say.
  const describe = (field: Field, on: boolean) => {
    const id = `${field.id}-error`;
    const ids = (field.getAttribute("aria-describedby") ?? "")
      .split(/\s+/)
      .filter((token) => token && token !== id);
    if (on) ids.push(id);
    if (ids.length) field.setAttribute("aria-describedby", ids.join(" "));
    else field.removeAttribute("aria-describedby");
  };
  const mark = (field: Field, text: string) => {
    const target = slot(field);
    if (!target) return;
    target.textContent = text;
    target.hidden = !text;
    describe(field, Boolean(text));
    if (text) field.setAttribute("aria-invalid", "true");
    else field.removeAttribute("aria-invalid");
  };
  const summarise = () => {
    const items = checks
      .map(([field]) => [field, slot(field)?.textContent ?? ""] as const)
      .filter(([, text]) => text)
      .map(([field, text]) => {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = `#${field.id}`;
        link.textContent = text;
        item.append(link);
        return item;
      });
    list.replaceChildren(...items);
    summary.hidden = !items.length;
    return items.length;
  };
  const say = (text = "", state = "") => {
    const [before, after] = text.split(email);
    const line = document.createElement("p");
    line.append(before ?? "");
    if (after !== undefined) {
      const link = document.createElement("a");
      link.href = `mailto:${email}`;
      link.textContent = email;
      line.append(link, after);
    }
    status.replaceChildren(...(text ? [line] : []));
    if (state) status.dataset.state = state;
    else delete status.dataset.state;
  };
  const busy = (on: boolean) => {
    sending = on;
    label.textContent = on ? SENDING : idle;
    if (on) button.setAttribute("aria-disabled", "true");
    else button.removeAttribute("aria-disabled");
  };

  const send = async (): Promise<Outcome> => {
    const abort = new AbortController();
    const timer = setTimeout(() => abort.abort(), TIMEOUT);
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        // Values go exactly as entered. The form has no file inputs.
        body: new URLSearchParams(
          new FormData(form) as unknown as Record<string, string>,
        ).toString(),
        signal: abort.signal,
      });
      if (response.ok) return "accepted";
      // A client error is a definite refusal. Anything else may have been stored.
      return response.status >= 400 && response.status < 500
        ? "rejected"
        : "uncertain";
    } catch {
      return "uncertain";
    } finally {
      clearTimeout(timer);
    }
  };

  const submit = async (event: SubmitEvent) => {
    event.preventDefault();
    if (sending) return;
    for (const [field, check] of checks) mark(field, check());
    if (summarise()) {
      say();
      summary.focus();
      return;
    }
    busy(true);
    say(SENDING);
    const outcome = await send();
    if (outcome === "accepted") {
      // The guard stays set: there is nothing left to send from this page.
      say();
      fields.hidden = true;
      confirmation.hidden = false;
      heading.focus();
      return;
    }
    busy(false);
    if (outcome === "rejected") say(REJECTED(email), "error");
    else say(UNCERTAIN(email), "warning");
  };

  form.addEventListener("submit", (event) => {
    void submit(event);
  });
  // After a failed attempt, a message leaves as soon as its field is valid.
  form.addEventListener("input", (event) => {
    const entry = checks.find(([field]) => field === event.target);
    if (!entry || !entry[0].hasAttribute("aria-invalid") || entry[1]()) return;
    mark(entry[0], "");
    summarise();
  });
  // A summary link takes the keyboard to its field, without changing the URL.
  list.addEventListener("click", (event) => {
    const link = (event.target as Element).closest("a");
    const id = link?.getAttribute("href")?.slice(1);
    const field = id ? document.getElementById(id) : null;
    if (!field) return;
    event.preventDefault();
    field.focus();
  });
  // Last, so any failure above leaves the browser's own validation in place.
  form.noValidate = true;
}

try {
  enhanceContactForm();
} catch {
  // The static form keeps working natively.
  document.querySelector("form.contact-form")?.removeAttribute("novalidate");
}
