/** Score rings fill (stroke-dashoffset 226 down to 226 - 226 x v / 100, over
 * 1.6s) once 40% of a ring is in view. Without the observer, or under reduced
 * motion, they show filled at once. */

const rings = Array.from(document.querySelectorAll<HTMLElement>(".ring"));
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduce || !("IntersectionObserver" in window)) {
  for (const ring of rings) ring.classList.add("go");
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("go");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.4 },
  );
  for (const ring of rings) observer.observe(ring);
}

export {};
