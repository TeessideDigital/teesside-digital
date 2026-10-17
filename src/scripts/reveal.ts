/** Reveal on scroll. `.reveal` elements are visible in the document; this only
 * holds back the ones that start below the first screen, and lets each go once
 * it scrolls into view. A 12-second safety net shows anything still held.
 * Nothing happens under reduced motion. */

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

if (!reduce && items.length && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.remove("pending");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  const fold = window.innerHeight * 0.92;
  for (const item of items) {
    if (item.getBoundingClientRect().top <= fold) continue;
    item.classList.add("pending");
    observer.observe(item);
  }
  window.setTimeout(() => {
    for (const item of items) item.classList.remove("pending");
    observer.disconnect();
  }, 12000);
}
