/** Price guide: the range counts to its new value over 500ms with an
 * ease-out cubic (at once under reduced motion). "Get a proper quote" ticks
 * the matching need in the enquiry form. Figures come from the page, which
 * takes them from src/data/pricing.ts. */
import type { pricing as Pricing, ProjectType, Range } from "../data/pricing";
import { formatPounds } from "../data/pricing";

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
const box = document.querySelector<HTMLElement>(".pg[data-pricing]");
const form = document.getElementById("pg-form") as HTMLFormElement | null;
const out = document.getElementById("pg-range");
const list = document.getElementById("pg-list");
const care = document.getElementById("pg-care");
const quote = document.getElementById("pg-quote");
const said = document.getElementById("pg-said");

if (box && form && out && list && care) {
  const data = JSON.parse(box.dataset.pricing ?? "{}") as typeof Pricing;
  let current: Range = data.ranges.web[0]!;
  let frame = 0;

  const show = (low: number, high: number) => {
    const dash = document.createElement("span");
    dash.textContent = "–";
    out.replaceChildren(`${formatPounds(low)} `, dash, ` ${formatPounds(high)}`);
  };
  const selected = () => {
    const type = (form.querySelector<HTMLInputElement>('input[name="type"]:checked')?.value ??
      "web") as ProjectType;
    const size = Number(form.querySelector<HTMLInputElement>('input[name="size"]:checked')?.value ?? 0);
    return { type, size };
  };

  const calculate = () => {
    const { type, size } = selected();
    const base = data.ranges[type][size] ?? data.ranges[type][0]!;
    let low = base[0];
    let high = base[1];
    const noun = data.types.find((entry) => entry.value === type)?.noun ?? "";
    const items = [`${data.sizes[size]} ${noun}`];
    let hasCare = false;
    for (const box of form.querySelectorAll<HTMLInputElement>('input[name="extra"]:checked')) {
      if (box.value === "care") {
        hasCare = true;
        continue;
      }
      const extra = data.extras.find((entry) => entry.value === box.value);
      if (!extra) continue;
      low += extra.add[0];
      high += extra.add[1];
      items.push(extra.item);
    }
    list.replaceChildren(
      ...items.map((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        return li;
      }),
    );
    care.hidden = !hasCare;
    care.textContent = hasCare
      ? `Plus ongoing care from ${formatPounds(data.carePerMonth)} a month.`
      : "";

    // The counting figure is visual only; this line is what is announced.
    if (said) said.textContent = `Typical range ${formatPounds(low)} to ${formatPounds(high)}`;
    cancelAnimationFrame(frame);
    if (reduce.matches) {
      current = [low, high];
      show(low, high);
      return;
    }
    const from = current;
    const start = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - start) / 500);
      const e = 1 - (1 - k) ** 3;
      const a = from[0] + (low - from[0]) * e;
      const b = from[1] + (high - from[1]) * e;
      current = [a, b];
      show(a, b);
      if (k < 1) frame = requestAnimationFrame(step);
      else current = [low, high];
    };
    frame = requestAnimationFrame(step);
  };

  form.addEventListener("change", calculate);
  form.addEventListener("submit", (event) => event.preventDefault());

  quote?.addEventListener("click", () => {
    const { type } = selected();
    const need = data.types.find((entry) => entry.value === type)?.need;
    const enquiry = document.querySelector<HTMLFormElement>("#contact form.qf");
    const tick = need
      ? enquiry?.querySelector<HTMLInputElement>(`input[data-need="${need}"]`)
      : null;
    if (!tick || !enquiry) return;
    tick.checked = true;
    enquiry.dispatchEvent(new Event("enquiry:refresh"));
  });
}
