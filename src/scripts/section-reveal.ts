// Once-only section entrances for a route: each [data-reveal] group fades and
// rises as one. The static document is the complete page; a group is held back
// only while this script is running and will reveal it.
const DURATION = 400;
const EASING = "cubic-bezier(0.22, 0.61, 0.36, 1)";
const RISE: Keyframe[] = [
  { opacity: 0, transform: "translateY(16px)" },
  { opacity: 1, transform: "none" },
];

function enhance(root: HTMLElement, reduced: MediaQueryList) {
  const listeners = new AbortController();
  // Groups waiting below the fold, held at their first frame.
  const armed = new Map<Element, Animation>();
  const active = new Set<Animation>();
  let observer: IntersectionObserver | null = null;
  let stopped = false;

  function stop() {
    if (stopped) return;
    stopped = true;
    observer?.disconnect();
    listeners.abort();
    for (const animation of [...armed.values(), ...active]) animation.cancel();
    armed.clear();
    active.clear();
  }
  const retire = () => {
    if (!stopped && !armed.size && !active.size) stop();
  };
  const release = (element: Element) => {
    const animation = armed.get(element);
    if (!animation) return;
    armed.delete(element);
    observer?.unobserve(element);
    animation.play();
  };
  const show = (element: Element) => {
    const animation = armed.get(element);
    if (!animation) return;
    armed.delete(element);
    observer?.unobserve(element);
    animation.cancel();
  };

  // Reduced motion chosen mid-visit, or printing: show everything at once.
  reduced.addEventListener("change", stop, { signal: listeners.signal });
  window.addEventListener("beforeprint", stop, { signal: listeners.signal });
  // Focus takes precedence: a held group that receives focus is shown.
  document.addEventListener(
    "focusin",
    (event) => {
      for (const element of [...armed.keys()])
        if (event.target instanceof Node && element.contains(event.target))
          show(element);
      retire();
    },
    { signal: listeners.signal },
  );
  // A jump past a held group never intersects it, so show anything that is
  // now above the viewport rather than leave it held.
  let queued = false;
  window.addEventListener(
    "scroll",
    () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        for (const element of [...armed.keys()])
          if (element.getBoundingClientRect().bottom < 0) show(element);
        retire();
      });
    },
    { passive: true, signal: listeners.signal },
  );

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries)
        if (entry.isIntersecting) release(entry.target);
    },
    // No inset: a held group plays the moment any of it reaches the viewport,
    // so nothing can sit hidden on screen waiting for a scroll.
    { threshold: 0, rootMargin: "0px" },
  );
  // Only a group that is well below the viewport is held back. Anything on
  // screen, or within a short scroll of it, stays exactly as it is.
  const near = innerHeight * 1.25;
  for (const group of root.querySelectorAll("[data-reveal]")) {
    if (group.getBoundingClientRect().top <= near) continue;
    const animation = group.animate(RISE, {
      duration: DURATION,
      easing: EASING,
      fill: "backwards",
    });
    animation.pause();
    const done = () => {
      active.delete(animation);
      retire();
    };
    active.add(animation);
    animation.addEventListener("finish", done);
    animation.addEventListener("cancel", done);
    armed.set(group, animation);
    observer.observe(group);
  }
  // The browser may move to an anchor or a restored position after this ran.
  // Whatever is then on screen is shown at once, without waiting for a scroll.
  const settle = () => {
    for (const element of [...armed.keys()]) {
      const box = element.getBoundingClientRect();
      if (box.top < innerHeight && box.bottom > 0) show(element);
      else if (box.bottom <= 0) show(element);
    }
    retire();
  };
  window.addEventListener("load", settle, { signal: listeners.signal });
  window.addEventListener("pageshow", settle, { signal: listeners.signal });
  window.addEventListener("hashchange", settle, { signal: listeners.signal });
  retire();
}

/** Start the section entrances for the route whose root matches the selector. */
export function revealSections(selector: string) {
  const root = document.querySelector<HTMLElement>(selector);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  if (
    !root ||
    reduced.matches ||
    !("IntersectionObserver" in window) ||
    !("animate" in Element.prototype)
  )
    return;
  try {
    enhance(root, reduced);
  } catch {
    // Any failure leaves the complete static page: release whatever was held.
    for (const animation of root.getAnimations({ subtree: true }))
      animation.cancel();
  }
}
