/** Honest submission states for any static form on the site.
 * A form already validates and posts natively. This only replaces that with an
 * accessible summary and outcomes that follow the receiver's response. Nothing
 * is stored, logged or retried, and success is never assumed.
 *
 * The engine holds no copy. Each form supplies its own in its markup:
 * - on the form: data-sending, data-rejected, data-uncertain;
 * - on a validated field: data-missing (shown when a required field is empty)
 *   and data-format (shown when an email or web address does not parse);
 * - data-rule="website" marks a field checked as a web address;
 * - the confirmation block's mailto link names the address linked in messages.
 */
type Field = HTMLInputElement | HTMLTextAreaElement;
export type Outcome = "accepted" | "rejected" | "uncertain";

const TIMEOUT = 15000;

/** The form's fields, encoded as the receiver expects. Several values under
 * one name (a group of checkboxes) are joined with commas, so each answer
 * arrives as one field. */
export function encodeForm(form: HTMLFormElement): string {
  const joined = new Map<string, string[]>();
  for (const [name, value] of new FormData(form)) {
    // These forms have no file inputs.
    if (typeof value !== "string") continue;
    joined.set(name, [...(joined.get(name) ?? []), value]);
  }
  const body = new URLSearchParams();
  for (const [name, values] of joined) body.set(name, values.join(", "));
  return body.toString();
}

/** Posts a form to the receiver and maps the response honestly: 2xx is
 * accepted, 4xx a definite refusal, anything else (5xx, network failure,
 * timeout) uncertain, because it may have been stored. */
export async function submitForm(form: HTMLFormElement): Promise<Outcome> {
  const abort = new AbortController();
  const timer = setTimeout(() => abort.abort(), TIMEOUT);
  try {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeForm(form),
      signal: abort.signal,
    });
    if (response.ok) return "accepted";
    return response.status >= 400 && response.status < 500
      ? "rejected"
      : "uncertain";
  } catch {
    return "uncertain";
  } finally {
    clearTimeout(timer);
  }
}

/** A message as a paragraph, with the email address in it made a link. */
export function messageWithEmail(text: string, email: string): HTMLParagraphElement {
  const [before, after] = text.split(email);
  const line = document.createElement("p");
  line.append(before ?? "");
  if (after !== undefined) {
    const link = document.createElement("a");
    link.href = `mailto:${email}`;
    link.textContent = email;
    line.append(link, after);
  }
  return line;
}

/** A bare domain is welcome; anything that is not a web address is not. */
function isWebAddress(value: string) {
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

/** An empty result means valid. Values are trimmed to check, never to send. */
function check(field: Field) {
  const value = field.value.trim();
  if (!value) return field.required ? (field.dataset.missing ?? "") : "";
  const format = field.dataset.format ?? "";
  if (field.type === "email" && field.validity.typeMismatch) return format;
  if (field.dataset.rule === "website" && !isWebAddress(value)) return format;
  return "";
}

function enhance(form: HTMLFormElement) {
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
  const { sending: sendingText, rejected, uncertain } = form.dataset;
  // Field order in the document is the order of the summary.
  const checked = Array.from(
    form.querySelectorAll<Field>("[data-missing], [data-format]"),
  );
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
    !sendingText ||
    !rejected ||
    !uncertain ||
    !checked.length
  )
    return;

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
    const items = checked
      .map((field) => [field, slot(field)?.textContent ?? ""] as const)
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
    status.replaceChildren(...(text ? [messageWithEmail(text, email)] : []));
    if (state) status.dataset.state = state;
    else delete status.dataset.state;
  };
  const busy = (on: boolean) => {
    sending = on;
    label.textContent = on ? sendingText : idle;
    if (on) button.setAttribute("aria-disabled", "true");
    else button.removeAttribute("aria-disabled");
  };

  const submit = async (event: SubmitEvent) => {
    event.preventDefault();
    if (sending) return;
    for (const field of checked) mark(field, check(field));
    if (summarise()) {
      say();
      summary.focus();
      return;
    }
    busy(true);
    say(sendingText);
    const outcome = await submitForm(form);
    if (outcome === "accepted") {
      // The guard stays set: there is nothing left to send from this page.
      say();
      fields.hidden = true;
      confirmation.hidden = false;
      heading.focus();
      return;
    }
    busy(false);
    if (outcome === "rejected") say(rejected, "error");
    else say(uncertain, "warning");
  };

  form.addEventListener("submit", (event) => {
    void submit(event);
  });
  // After a failed attempt, a message leaves as soon as its field is valid.
  form.addEventListener("input", (event) => {
    const field = checked.find((candidate) => candidate === event.target);
    if (!field || !field.hasAttribute("aria-invalid") || check(field)) return;
    mark(field, "");
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

/** Enhances one form. Any failure leaves it working natively. */
export function initForm(form: HTMLFormElement | null) {
  if (!form) return;
  try {
    enhance(form);
  } catch {
    form.removeAttribute("novalidate");
  }
}
