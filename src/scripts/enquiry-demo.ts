/** "Watch an enquiry sort itself". Runs the rules in the browser and reveals
 * the result step by step: rows 380ms apart, then the reply typed out two
 * characters every 16ms. Under reduced motion the result appears at once.
 * Every piece of the message is inserted as text, never as markup. */
import { analyse } from "@lib/enquiry-rules";

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
const form = document.getElementById("demo-form") as HTMLFormElement | null;
const message = document.getElementById("demo-msg") as HTMLTextAreaElement | null;
const rows = document.getElementById("demo-rows");
const status = document.getElementById("demo-status");

if (form && message && rows && status) {
  let timer = 0;
  const setStatus = (text: string) => {
    const dot = document.createElement("i");
    status.replaceChildren(dot, text);
  };
  const el = (tag: string, className = "", text = "") => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  const row = (key: string, value: HTMLElement) => {
    const line = el("div", "drow row-in");
    line.append(el("b", "", key), value);
    return line;
  };
  const wrap = (child: HTMLElement) => {
    const span = el("span");
    span.append(child);
    return span;
  };

  const run = () => {
    window.clearTimeout(timer);
    const result = analyse(message.value || "");
    const facts = el("span", "facts2");
    for (const fact of result.facts.length ? result.facts : ["Nothing specific"])
      facts.append(el("em", "", fact));
    const reply = el("span", "reply-draft");
    const lines = [
      row("Type", wrap(el("span", `pillv${result.type === "Complaint" ? " hot" : ""}`, result.type))),
      row("Urgency", wrap(el("span", `pillv${result.hot ? " hot" : ""}`, result.urg))),
      row("Picked out", facts),
      row("Draft reply", reply),
    ];
    const instant = reduce.matches;
    rows.replaceChildren();
    setStatus("READING MESSAGE…");

    const typeOut = () => {
      setStatus("DRAFTING REPLY…");
      const text = result.reply;
      if (instant) {
        reply.textContent = text;
        setStatus("DONE. READY FOR YOU TO SEND");
        return;
      }
      // The typed copy is hidden from assistive technology; the finished
      // reply replaces it as one piece of text, announced once.
      const typed = el("span");
      typed.setAttribute("aria-hidden", "true");
      const caret = el("span", "caret");
      reply.replaceChildren(typed, caret);
      let shown = 0;
      const tick = () => {
        shown += 2;
        typed.textContent = text.slice(0, shown);
        if (shown < text.length) {
          timer = window.setTimeout(tick, 16);
          return;
        }
        reply.textContent = text;
        setStatus("DONE. READY FOR YOU TO SEND");
      };
      tick();
    };

    let index = 0;
    const add = () => {
      const line = lines[index];
      if (!line) {
        typeOut();
        return;
      }
      if (instant) line.classList.remove("row-in");
      rows.append(line);
      index += 1;
      timer = window.setTimeout(add, instant ? 0 : 380);
    };
    add();
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    run();
  });
  for (const chip of form.querySelectorAll<HTMLButtonElement>(".chip")) {
    chip.addEventListener("click", () => {
      message.value = chip.dataset.msg ?? "";
      run();
    });
  }
}
