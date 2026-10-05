/** About reuses the Home and Services vocabulary at lower intensity.
 * Finite native animations expose the underlying static styles on completion.
 * No initial hidden CSS, persistent fill state or animation loop is required.
 */
function enhanceAbout() {
  const root = document.querySelector<HTMLElement>(".about-experience");
  if (!root || !Element.prototype.animate || !window.IntersectionObserver)
    return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const forced = matchMedia("(forced-colors: active)");
  // A fragment arrival delivers the settled document, as on Services.
  if (reduced.matches || forced.matches || location.hash) return;

  const compact = matchMedia("(max-width: 47.999rem)").matches;
  const tokens = getComputedStyle(root);
  const value = tokens.getPropertyValue("--home-motion-structural").trim();
  const structural = parseFloat(value) * (value.endsWith("ms") ? 1 : 1000);
  const easing = tokens.getPropertyValue("--home-ease-structural").trim();
  if (!Number.isFinite(structural)) return;

  // Without this option an engine would animate the parent, text included.
  const generated = "pseudoElement" in KeyframeEffect.prototype;
  const active = new Set<Animation>();
  const pending = new Map<Element, () => void>();
  const listeners = new AbortController();
  let observer: IntersectionObserver | undefined;
  let stopped = false;
  let first = true;
  const find = (selector: string) => root.querySelector<HTMLElement>(selector);
  const all = (selector: string) =>
    Array.from(root.querySelectorAll<HTMLElement>(selector));
  const stop = () => {
    stopped = true;
    observer?.disconnect();
    pending.clear();
    for (const animation of active) animation.cancel();
    active.clear();
    listeners.abort();
  };
  // Unlike Home and Services, nothing stays attached once the work is finished.
  const retire = () => {
    if (!stopped && !pending.size && !active.size) stop();
  };
  const play = (
    element: Element | null,
    frames: Keyframe[],
    duration = structural,
    delay = 0,
    pseudoElement?: string,
  ) => {
    if (
      !element ||
      stopped ||
      (pseudoElement && !generated) ||
      element.matches(":focus, :target") ||
      element.closest("a:focus, a:hover")
    )
      return;
    const animation = element.animate(frames, {
      duration,
      delay,
      easing,
      fill: "backwards",
      pseudoElement,
    });
    active.add(animation);
    const release = () => {
      active.delete(animation);
      retire();
    };
    animation.addEventListener("finish", release, { once: true });
    animation.addEventListener("cancel", release, { once: true });
  };
  const expose = (element: Element | null) =>
    play(element, [
      { clipPath: "inset(0 0 6% 0)" },
      { clipPath: "inset(0 0 0 0)" },
    ]);
  const tone = (element: Element | null, from = 0.94, delay = 0) =>
    play(
      element,
      [{ opacity: from }, { opacity: 1 }],
      structural * 0.75,
      delay,
    );
  // The origin travels in the keyframes so generated rules need no extra markup.
  const line = (
    element: Element | null,
    pseudoElement?: string,
    duration = structural,
  ) =>
    play(
      element,
      [
        { transform: "scaleX(0.88)", opacity: 0.55, transformOrigin: "left" },
        { transform: "scaleX(1)", opacity: 1, transformOrigin: "left" },
      ],
      duration,
      0,
      pseudoElement,
    );
  const border = (element: Element | null, delay = 0) =>
    element &&
    play(
      element,
      [
        { borderTopColor: "transparent" },
        { borderTopColor: getComputedStyle(element).borderTopColor },
      ],
      structural * 0.8,
      delay,
    );
  const observe = (element: Element | null, action: () => void) => {
    if (!element) return;
    pending.set(element, action);
    observer!.observe(element);
  };

  try {
    const navigation = performance.getEntriesByType("navigation")[0] as
      PerformanceNavigationTiming | undefined;
    const paint = performance.getEntriesByName("first-contentful-paint")[0];
    const clean =
      scrollY === 0 &&
      navigation?.type !== "back_forward" &&
      (!paint || performance.now() - paint.startTime < 120);

    observer = new IntersectionObserver(
      (entries) => {
        try {
          // A restored or late arrival keeps everything at or above the fold still.
          const settled = first && !(clean && scrollY === 0);
          first = false;
          for (const entry of entries) {
            const rect = entry.boundingClientRect;
            const still = settled && rect.top < innerHeight;
            if (!entry.isIntersecting && !still) continue;
            const action = pending.get(entry.target);
            observer!.unobserve(entry.target);
            pending.delete(entry.target);
            if (!still && !stopped && rect.bottom > 0) action?.();
          }
          retire();
        } catch {
          stop();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px 24px 0px" },
    );

    reduced.addEventListener("change", stop, { signal: listeners.signal });
    forced.addEventListener("change", stop, { signal: listeners.signal });
    window.addEventListener("pagehide", stop, { signal: listeners.signal });
    window.addEventListener("beforeprint", stop, { signal: listeners.signal });
    window.addEventListener("hashchange", stop, { signal: listeners.signal });
    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.hidden) stop();
      },
      { signal: listeners.signal },
    );
    document.addEventListener(
      "focusin",
      () => {
        for (const animation of active) animation.cancel();
      },
      { signal: listeners.signal },
    );

    if (clean) {
      expose(find("h1"));
      tone(find(".framing"), 0.94, 120);
      border(find(".location"), 220);
    }

    const origin = find(".origin h2");
    observe(origin, () => {
      expose(origin);
      line(find(".origin .date"), "::after");
    });
    // The craft scene stays almost still: one barely perceptible statement.
    const craft = find(".craft h2");
    observe(craft, () => play(craft, [{ opacity: 0.97 }, { opacity: 1 }]));
    const study = find(".study h2");
    observe(study, () => expose(study));
    observe(find(".technical-cues"), () => {
      for (const cue of all(".technical-cues li")) border(cue);
    });
    if (compact) {
      // Mobile keeps one quiet group instead of animating every principle.
      const principles = find(".principles");
      observe(principles, () => tone(principles, 0.97));
    } else {
      all(".principle").forEach((principle) =>
        observe(principle, () => {
          line(principle, "::before");
          for (const text of principle.children) tone(text, 0.94, 50);
        }),
      );
    }
    const conversion = find(".conversion-primary");
    observe(conversion, () =>
      line(
        conversion!.querySelector(".direction > span"),
        undefined,
        structural * (compact ? 0.9 : 1.1),
      ),
    );
  } catch {
    stop();
  }
}

try {
  enhanceAbout();
} catch {
  /* Optional decoration leaves the static page intact. */
}
