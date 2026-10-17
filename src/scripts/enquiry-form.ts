/** The four-step enquiry. The markup is one ordinary form that works without
 * this script; this turns it into steps (needs, budget, timing, details) and
 * sends it through the shared form engine. Success shows only after the
 * receiver accepts the submission. */
import { messageWithEmail, submitForm } from "./form-submission";

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function enhance(form: HTMLFormElement) {
  const q = <T extends Element>(selector: string) => form.querySelector<T>(selector);
  const steps = Array.from(form.querySelectorAll<HTMLFieldSetElement>(".qf-step"));
  const count = q<HTMLElement>(".qf-count");
  const label = q<HTMLElement>(".qf-label");
  const bar = q<HTMLElement>(".qf-bar span");
  const back = q<HTMLButtonElement>(".qf-back");
  const next = q<HTMLButtonElement>(".qf-next");
  const nextLabel = q<HTMLElement>(".qf-next span");
  const nav = q<HTMLElement>(".qf-nav");
  const status = q<HTMLElement>(".qf-status");
  const done = q<HTMLElement>(".qf-done");
  const thanks = q<HTMLElement>(".qf-thanks");
  const summary = q<HTMLElement>(".qf-sum");
  const error = q<HTMLElement>(".err");
  const name = q<HTMLInputElement>('input[name="name"]');
  const email = q<HTMLInputElement>('input[name="email"]');
  const address = form.dataset.email ?? "";
  const { sending: sendingText = "", rejected = "", uncertain = "" } = form.dataset;
  if (
    steps.length !== 4 || !count || !label || !bar || !back || !next || !nextLabel ||
    !nav || !status || !done || !thanks || !summary || !error || !name || !email
  )
    return;

  let step = 1;
  let sending = false;

  const chosen = (field: string) =>
    Array.from(form.querySelectorAll<HTMLInputElement>(`input[name="${field}"]:checked`)).map(
      (input) => input.value,
    );
  const valid = () => {
    if (step === 1) return chosen("needs").length > 0;
    if (step === 2) return chosen("budget").length > 0;
    if (step === 3) return chosen("timing").length > 0;
    return true;
  };
  const refresh = () => {
    next.disabled = !valid();
  };
  const render = (moveFocus: boolean) => {
    for (const fieldset of steps) {
      const on = Number(fieldset.dataset.step) === step;
      fieldset.hidden = !on;
      if (on && !reduce.matches) {
        fieldset.classList.remove("in");
        void fieldset.offsetWidth;
        fieldset.classList.add("in");
      }
    }
    count.textContent = `Step ${step} of 4`;
    label.textContent = steps[step - 1]?.dataset.label ?? "";
    bar.style.width = `${step * 25}%`;
    back.hidden = step === 1;
    nextLabel.textContent = step === 4 ? "Send" : "Next";
    refresh();
    if (!moveFocus) return;
    if (step === 4) name.focus();
    else steps[step - 1]?.querySelector<HTMLElement>(".qf-h")?.focus();
  };

  const flag = (field: HTMLInputElement | null, message: string) => {
    for (const input of [name, email]) {
      input.removeAttribute("aria-invalid");
      input.removeAttribute("aria-describedby");
    }
    error.textContent = message;
    if (!field) return;
    field.setAttribute("aria-invalid", "true");
    field.setAttribute("aria-describedby", error.id);
    field.focus();
  };

  const finish = () => {
    const first = name.value.trim().split(/\s+/)[0] ?? "";
    thanks.textContent = first ? `Thanks, ${first}.` : "Thanks.";
    const rows: [string, string][] = [
      ["Needs", chosen("needs").join(", ")],
      ["Budget", chosen("budget").join(", ")],
      ["Start", chosen("timing").join(", ")],
    ];
    summary.replaceChildren(
      ...rows.map(([key, value]) => {
        const item = document.createElement("li");
        const term = document.createElement("b");
        term.textContent = `${key}:`;
        item.append(term, ` ${value}`);
        return item;
      }),
    );
    for (const fieldset of steps) fieldset.hidden = true;
    nav.hidden = true;
    status.replaceChildren();
    bar.style.width = "100%";
    count.textContent = "Done";
    label.textContent = "Sent";
    done.hidden = false;
    thanks.focus();
  };

  const send = async () => {
    if (!name.value.trim()) {
      flag(name, "Please add your name so I know who to reply to.");
      return;
    }
    if (!EMAIL.test(email.value.trim())) {
      flag(email, "That email address doesn't look right. Please check it.");
      return;
    }
    flag(null, "");
    sending = true;
    nextLabel.textContent = sendingText || "Sending...";
    next.setAttribute("aria-disabled", "true");
    status.replaceChildren(messageWithEmail(sendingText, address));
    const outcome = await submitForm(form);
    if (outcome === "accepted") {
      // The guard stays set: there is nothing left to send from this page.
      finish();
      return;
    }
    sending = false;
    next.removeAttribute("aria-disabled");
    nextLabel.textContent = "Send";
    status.dataset.state = outcome === "rejected" ? "error" : "warning";
    status.replaceChildren(
      messageWithEmail(outcome === "rejected" ? rejected : uncertain, address),
    );
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (sending) return;
    if (step < 4) {
      if (!valid()) return;
      step += 1;
      render(true);
      return;
    }
    void send();
  });
  back.addEventListener("click", () => {
    if (step === 1 || sending) return;
    step -= 1;
    render(true);
  });
  form.addEventListener("change", refresh);
  form.addEventListener("input", (event) => {
    refresh();
    // A message leaves as soon as its field is filled in.
    const target = event.target as HTMLInputElement;
    if (target.getAttribute("aria-invalid") === "true" && target.value.trim()) {
      if (target === name || EMAIL.test(email.value.trim())) flag(null, "");
    }
  });
  // Lets other parts of the page (the price guide) tick a need and re-check.
  form.addEventListener("enquiry:refresh", refresh);

  // Last, so any failure above leaves the browser's own validation in place.
  form.noValidate = true;
  form.classList.add("stepped");
  render(false);
}

export function initEnquiryForms() {
  for (const form of document.querySelectorAll<HTMLFormElement>("form.qf")) {
    try {
      enhance(form);
    } catch {
      form.noValidate = false;
    }
  }
}
