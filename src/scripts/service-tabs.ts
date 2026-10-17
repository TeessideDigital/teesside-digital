/** "What I build". Wide screens: a vertical tablist (arrow keys move between
 * tabs, a fine pointer selects on hover) with one panel beside it. Phone
 * widths: an accordion, each panel moved straight after its button and the
 * ARIA switched to disclosure buttons. */

const list = document.querySelector<HTMLElement>(".svc-list");
const holder = document.querySelector<HTMLElement>(".svc-panels");
const phone = window.matchMedia("(max-width: 760px)");
const hover = window.matchMedia("(hover: hover) and (pointer: fine)");

if (list && holder) {
  const buttons = Array.from(list.querySelectorAll<HTMLButtonElement>(".svc-btn"));
  const panelOf = (button: HTMLButtonElement) =>
    document.getElementById(button.getAttribute("aria-controls") ?? "");
  let current: HTMLButtonElement | undefined = buttons[0];
  let accordion = false;

  const show = (button: HTMLButtonElement | undefined, focus = false) => {
    current = button;
    for (const candidate of buttons) {
      const on = candidate === button;
      const panel = panelOf(candidate);
      if (accordion) candidate.setAttribute("aria-expanded", String(on));
      else {
        candidate.setAttribute("aria-selected", String(on));
        candidate.tabIndex = on ? 0 : -1;
      }
      if (panel) {
        panel.hidden = !on;
        panel.classList.toggle("on", on);
      }
    }
    if (focus) button?.focus();
  };

  const setMode = () => {
    accordion = phone.matches;
    list.classList.toggle("accordion", accordion);
    if (accordion) {
      list.removeAttribute("role");
      list.removeAttribute("aria-orientation");
      list.removeAttribute("aria-label");
    } else {
      list.setAttribute("role", "tablist");
      list.setAttribute("aria-orientation", "vertical");
      list.setAttribute("aria-label", "Services");
    }
    for (const button of buttons) {
      const panel = panelOf(button);
      if (accordion) {
        button.removeAttribute("role");
        button.removeAttribute("aria-selected");
        button.tabIndex = 0;
        if (panel) {
          panel.setAttribute("role", "region");
          panel.removeAttribute("tabindex");
          button.after(panel);
        }
      } else {
        button.setAttribute("role", "tab");
        button.removeAttribute("aria-expanded");
        if (panel) {
          panel.setAttribute("role", "tabpanel");
          panel.tabIndex = 0;
          holder.append(panel);
        }
      }
    }
    show(current ?? buttons[0]);
  };

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      // In the accordion a second press closes the open panel.
      if (accordion && current === button) show(undefined);
      else show(button);
    });
    button.addEventListener("mouseenter", () => {
      if (!accordion && hover.matches) show(button);
    });
    button.addEventListener("keydown", (event) => {
      if (accordion) return;
      const last = buttons.length - 1;
      let target: HTMLButtonElement | undefined;
      if (event.key === "ArrowDown" || event.key === "ArrowRight")
        target = buttons[index === last ? 0 : index + 1];
      else if (event.key === "ArrowUp" || event.key === "ArrowLeft")
        target = buttons[index === 0 ? last : index - 1];
      else if (event.key === "Home") target = buttons[0];
      else if (event.key === "End") target = buttons[last];
      if (!target) return;
      event.preventDefault();
      show(target, true);
    });
  });

  phone.addEventListener("change", setMode);
  setMode();
  list.closest(".svc")?.classList.add("ready");
}

export {};
