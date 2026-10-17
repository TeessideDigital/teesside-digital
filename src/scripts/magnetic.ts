/** Primary buttons lean slightly towards the pointer: up to 8px across and 6px
 * down or up. Fine pointers only, never under reduced motion. */

const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (fine && !reduce) {
  for (const button of document.querySelectorAll<HTMLElement>(".btn")) {
    button.addEventListener("pointermove", (event) => {
      if ((button as HTMLButtonElement).disabled) return;
      const box = button.getBoundingClientRect();
      const x = (event.clientX - box.left - box.width / 2) / box.width;
      const y = (event.clientY - box.top - box.height / 2) / box.height;
      button.style.transform = `translate(${(x * 8).toFixed(1)}px, ${(y * 6 - 2).toFixed(1)}px)`;
    });
    button.addEventListener("pointerleave", () => {
      button.style.transform = "";
    });
  }
}

export {};
