/** Home hero: the question buttons open their answers, and a soft glow
 * follows a fine pointer across the hero (never under reduced motion). */

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

for (const button of document.querySelectorAll<HTMLButtonElement>(".hero button.q")) {
  const answer = document.getElementById(button.getAttribute("aria-controls") ?? "");
  if (!answer) continue;
  button.setAttribute("aria-expanded", "false");
  answer.hidden = true;
  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!open));
    answer.hidden = open;
    if (!open) {
      answer.classList.remove("show");
      void answer.offsetWidth;
      answer.classList.add("show");
    }
  });
}
document.querySelector(".hero .chat")?.classList.add("ready");

const hero = document.getElementById("hero");
if (hero && fine && !reduce) {
  hero.addEventListener("pointermove", (event) => {
    const box = hero.getBoundingClientRect();
    hero.style.setProperty("--gx", `${event.clientX - box.left}px`);
    hero.style.setProperty("--gy", `${event.clientY - box.top}px`);
    hero.classList.add("glowing");
  });
  hero.addEventListener("pointerleave", () => hero.classList.remove("glowing"));
}

export {};
