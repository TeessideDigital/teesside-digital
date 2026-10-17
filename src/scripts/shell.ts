/** The shell on every page: nav state, scroll progress, the menu drawer, back
 * to top and the mobile action bar. Each part is independent, so one missing
 * element never stops the others. */

const root = document.documentElement;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

/* Tells the head script the page scripts are running (see head.js). */
root.classList.add("js-ok");

/* ---------- nav state and scroll progress ---------- */
const nav = document.getElementById("nav");
const bar = document.getElementById("progress");
let ticking = false;
const onScroll = () => {
  ticking = false;
  nav?.classList.toggle("scrolled", window.scrollY > 8);
  if (bar) {
    const height = root.scrollHeight - window.innerHeight;
    const ratio = height > 0 ? Math.min(1, window.scrollY / height) : 0;
    bar.style.transform = `scaleX(${ratio})`;
  }
};
const requestScroll = () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(onScroll);
};
window.addEventListener("scroll", requestScroll, { passive: true });
window.addEventListener("resize", requestScroll, { passive: true });
onScroll();

/* ---------- menu drawer ---------- */
const menu = document.getElementById("menu") as HTMLDialogElement | null;
const opener = document.getElementById("menu-button");
if (menu && opener && typeof menu.showModal === "function") {
  const closer = menu.querySelector<HTMLButtonElement>(".d-close");
  const sync = (open: boolean) => {
    opener.setAttribute("aria-expanded", String(open));
    root.classList.toggle("menu-open", open);
  };
  const open = () => {
    if (menu.open) return;
    menu.showModal();
    sync(true);
    closer?.focus();
  };
  const close = () => {
    if (menu.open) menu.close();
  };
  // The script owns opening and closing, so a browser that also supports the
  // invoker commands does not act twice.
  opener.addEventListener("click", (event) => {
    event.preventDefault();
    open();
  });
  closer?.addEventListener("click", (event) => {
    event.preventDefault();
    close();
  });
  // Native close covers Esc and closedby="any"; focus returns to the opener.
  menu.addEventListener("close", () => {
    sync(false);
    opener.focus();
  });
  // A click on the scrim lands on the dialog itself, outside its box.
  menu.addEventListener("click", (event) => {
    if (event.target !== menu) return;
    const box = menu.getBoundingClientRect();
    const inside =
      event.clientX >= box.left &&
      event.clientX <= box.right &&
      event.clientY >= box.top &&
      event.clientY <= box.bottom;
    if (!inside) close();
  });
  // Choosing a link closes the menu, so a same-page anchor is visible.
  menu.addEventListener("click", (event) => {
    const link = (event.target as Element).closest("a");
    if (link) close();
  });
  // Tab and Shift+Tab loop inside the open drawer.
  menu.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const items = Array.from(
      menu.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
    );
    const first = items[0];
    const last = items[items.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  // A page restored from the back-forward cache never shows a stale menu.
  window.addEventListener("pageshow", () => {
    if (menu.open) menu.close();
    sync(false);
  });
}

/* ---------- back to top ---------- */
const toTop = document.getElementById("to-top");
toTop?.addEventListener("click", (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: reduce.matches ? "auto" : "smooth" });
  document.getElementById("main")?.focus({ preventScroll: true });
});

/* ---------- mobile action bar ---------- */
const mbar = document.getElementById("mbar");
const hero = document.querySelector("[data-hero]");
const contacts = Array.from(document.querySelectorAll("[data-contact]"));
if (mbar && "IntersectionObserver" in window) {
  // Without a hero the bar may show from the start.
  let heroOut = !hero;
  const inView = new Set<Element>();
  const update = () => mbar.classList.toggle("show", heroOut && inView.size === 0);
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.target === hero) {
          heroOut =
            !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
        } else if (entry.isIntersecting) inView.add(entry.target);
        else inView.delete(entry.target);
      }
      update();
    },
    // A contact target counts once it reaches the lower 40% of the screen.
    { rootMargin: "0px 0px -40% 0px" },
  );
  if (hero) observer.observe(hero);
  for (const target of contacts) observer.observe(target);
  update();
}
