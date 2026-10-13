// Home route coordinator. The static document is the complete page: this only
// adds a once-only hero sequence and one fade-and-rise per section group.
// Nothing is hidden unless this script is running and will reveal it.
const root = document.querySelector<HTMLElement>(".home-experience");
const reduced = matchMedia("(prefers-reduced-motion: reduce)");

function enhance(root: HTMLElement) {
  const tokens = getComputedStyle(root);
  const milliseconds = (name: string, fallback: number) => {
    const value = tokens.getPropertyValue(name).trim();
    const number = parseFloat(value);
    if (!Number.isFinite(number)) return fallback;
    return value.endsWith("ms") ? number : number * 1000;
  };
  const micro = milliseconds("--home-motion-micro", 210);
  const structural = milliseconds("--home-motion-structural", 400);
  const easing =
    tokens.getPropertyValue("--home-ease-structural").trim() || "ease-out";

  const listeners = new AbortController();
  const active = new Set<Animation>();
  // Section groups waiting below the fold, held at their first frame.
  const armed = new Map<Element, Animation>();
  let observer: IntersectionObserver | null = null;
  let stopped = false;

  const rise: Keyframe[] = [
    { opacity: 0, transform: "translateY(16px)" },
    { opacity: 1, transform: "none" },
  ];
  const appear: Keyframe[] = [
    { opacity: 0, transform: "scale(0.6)" },
    { opacity: 1, transform: "none" },
  ];

  const retire = () => {
    if (stopped || active.size || armed.size) return;
    stop();
  };
  const track = (animation: Animation) => {
    active.add(animation);
    const done = () => {
      active.delete(animation);
      retire();
    };
    animation.addEventListener("finish", done);
    animation.addEventListener("cancel", done);
    return animation;
  };
  // fill: backwards holds the first frame through any delay, then releases the
  // element to its authored state when the animation ends.
  const play = (
    element: Element | null,
    frames: Keyframe[],
    duration: number,
    delay = 0,
  ) => {
    if (!element) return;
    track(element.animate(frames, { duration, delay, easing, fill: "backwards" }));
  };
  const release = (element: Element) => {
    const animation = armed.get(element);
    if (!animation) return;
    armed.delete(element);
    observer?.unobserve(element);
    animation.play();
  };
  function stop() {
    if (stopped) return;
    stopped = true;
    observer?.disconnect();
    listeners.abort();
    for (const animation of [...armed.values(), ...active]) animation.cancel();
    armed.clear();
    active.clear();
  }

  // Reduced motion chosen mid-visit, or printing: show everything at once.
  reduced.addEventListener("change", stop, { signal: listeners.signal });
  window.addEventListener("beforeprint", stop, { signal: listeners.signal });
  const show = (element: Element) => {
    const animation = armed.get(element);
    if (!animation) return;
    armed.delete(element);
    observer?.unobserve(element);
    animation.cancel();
  };
  // Focus takes precedence. Anything already moving settles at once (this is
  // what the skip link does), and a held group that receives focus is shown.
  document.addEventListener(
    "focusin",
    (event) => {
      for (const animation of [...active])
        if (![...armed.values()].includes(animation)) animation.cancel();
      for (const element of [...armed.keys()])
        if (event.target instanceof Node && element.contains(event.target))
          show(element);
      retire();
    },
    { signal: listeners.signal },
  );
  // A jump past a held group (End, a long fling) never intersects it, so show
  // anything that is now above the viewport rather than leave it held.
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

  // The hero sequence belongs to a clean first arrival only. A hash (including
  // the skip link's #main), a restored scroll position, a history restore or a
  // script that ran late all leave the hero in its final state.
  const navigation = performance.getEntriesByType("navigation")[0] as
    PerformanceNavigationTiming | undefined;
  const firstPaint = performance.getEntriesByName("first-contentful-paint")[0];
  const clean =
    !location.hash &&
    scrollY === 0 &&
    navigation?.type !== "back_forward" &&
    (!firstPaint || performance.now() - firstPaint.startTime < 120);

  if (clean) {
    const stage = root.querySelector("[data-hero-stage]");
    // Website, then booking, then automation; its marks complete in turn.
    play(stage?.querySelector(".pv-website") ?? null, rise, structural, 0);
    play(stage?.querySelector(".pv-booking") ?? null, rise, structural, 220);
    play(stage?.querySelector(".pv-automation") ?? null, rise, structural, 440);
    stage?.querySelectorAll("[data-pv-mark]").forEach((mark, index) => {
      play(mark, appear, micro, 800 + index * 150);
    });
  }

  // Section groups. Only a group that is well below the viewport is held back.
  // Anything on screen, or within a short scroll of it, stays exactly as it is.
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries)
        if (entry.isIntersecting) release(entry.target);
    },
    // No inset: a held group plays the moment any of it reaches the viewport,
    // so nothing can sit hidden on screen waiting for a scroll.
    { threshold: 0, rootMargin: "0px" },
  );
  for (const group of root.querySelectorAll("[data-reveal]")) {
    if (group.getBoundingClientRect().top <= innerHeight * 1.25) continue;
    const animation = track(
      group.animate(rise, { duration: structural, easing, fill: "backwards" }),
    );
    animation.pause();
    armed.set(group, animation);
    observer.observe(group);
  }
  // The browser may restore a scroll position after this ran. Whatever is
  // then on screen is shown at once, without waiting for a scroll.
  const settle = () => {
    for (const element of [...armed.keys()]) {
      const box = element.getBoundingClientRect();
      if (box.top < innerHeight) show(element);
    }
    retire();
  };
  window.addEventListener("load", settle, { signal: listeners.signal });
  window.addEventListener("pageshow", settle, { signal: listeners.signal });
  retire();
  return stop;
}

if (
  root &&
  !reduced.matches &&
  "IntersectionObserver" in window &&
  "animate" in Element.prototype
) {
  try {
    enhance(root);
  } catch {
    // Any failure leaves the complete static page: release whatever was held.
    for (const animation of root.getAnimations({ subtree: true }))
      animation.cancel();
  }
}
