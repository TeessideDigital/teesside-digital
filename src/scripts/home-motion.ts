/** One-shot enhancement. No initial hidden styles, scroll loop or dependency.
 * Native finite animations fall back to the underlying static CSS themselves,
 * even if subsequent JavaScript fails. Nothing uses a forwards fill state.
 */
function enhanceHome() {
  const opening = document.querySelector<HTMLElement>(".home-opening");
  const narrative = document.querySelector<HTMLElement>(".home-narrative");
  if (
    !opening ||
    !narrative ||
    !Element.prototype.animate ||
    !window.IntersectionObserver
  )
    return;

  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const forced = matchMedia("(forced-colors: active)");
  if (reduced.matches || forced.matches) return;

  const compact = matchMedia("(max-width: 47.999rem)").matches;
  const tokens = getComputedStyle(opening);
  // CSS minification may serialise milliseconds as seconds. WAAPI takes ms.
  const milliseconds = (name: string) => {
    const value = tokens.getPropertyValue(name).trim();
    return parseFloat(value) * (value.endsWith("ms") ? 1 : 1000);
  };
  const structural = milliseconds("--home-motion-structural");
  const settle = milliseconds("--home-motion-settle");
  const easing = tokens.getPropertyValue("--home-ease-structural").trim();
  const imageEasing = tokens.getPropertyValue("--home-ease-settle").trim();
  if (!Number.isFinite(structural) || !Number.isFinite(settle)) return;

  const active = new Set<Animation>();
  const pending = new Map<Element, () => void>();
  const listeners = new AbortController();
  let observer: IntersectionObserver | undefined;
  let stopped = false;
  const all = (root: Element, selector: string) =>
    Array.from(root.querySelectorAll<HTMLElement>(selector));

  const stop = () => {
    stopped = true;
    observer?.disconnect();
    pending.clear();
    for (const animation of active) animation.cancel();
    active.clear();
    listeners.abort();
  };
  const play = (
    element: Element | null,
    frames: Keyframe[],
    duration = structural,
    delay = 0,
    curve = easing,
  ) => {
    if (!element || stopped || element.closest("a:focus, a:hover")) return;
    const animation = element.animate(frames, {
      duration,
      delay,
      easing: curve,
      fill: "backwards",
    });
    active.add(animation);
    const release = () => active.delete(animation);
    animation.addEventListener("finish", release, { once: true });
    animation.addEventListener("cancel", release, { once: true });
  };
  const expose = (element: Element | null, duration = structural, delay = 0) =>
    play(
      element,
      [{ clipPath: "inset(0 0 8% 0)" }, { clipPath: "inset(0 0 0% 0)" }],
      duration,
      delay,
    );
  const rule = (element: Element | null, duration = structural, delay = 0) =>
    play(
      element,
      [
        { transform: "scaleX(0.88)", opacity: 0.55 },
        { transform: "scaleX(1)", opacity: 1 },
      ],
      duration,
      delay,
    );
  const image = (
    element: HTMLImageElement | null,
    duration: number,
    scale: number,
  ) => {
    // A late or failed image simply arrives at its final crop. Never wait for it.
    if (!element?.complete || !element.naturalWidth) return;
    play(
      element,
      [{ transform: `scale(${scale})` }, { transform: "scale(1)" }],
      duration,
      0,
      imageEasing,
    );
  };
  const observe = (element: Element | null, action: () => void) => {
    if (!element) return;
    pending.set(element, action);
    observer!.observe(element);
  };

  try {
    observer = new IntersectionObserver(
      (entries) => {
        try {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const action = pending.get(entry.target);
            observer!.unobserve(entry.target);
            pending.delete(entry.target);
            // Already passed by a fast scroll? Leave the static edition alone.
            if (entry.boundingClientRect.bottom > 0 && !stopped) action?.();
          }
          if (!pending.size) observer!.disconnect();
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
        // Focus always takes precedence; CSS supplies immediate outline/feedback.
        for (const animation of active) animation.cancel();
      },
      { signal: listeners.signal },
    );

    const navigation = performance.getEntriesByType("navigation")[0] as
      PerformanceNavigationTiming | undefined;
    const firstPaint = performance.getEntriesByName(
      "first-contentful-paint",
    )[0];
    const cleanOpening =
      !location.hash &&
      scrollY === 0 &&
      navigation?.type !== "back_forward" &&
      (!firstPaint || performance.now() - firstPaint.startTime < 120);
    if (cleanOpening) {
      image(
        opening.querySelector("img"),
        compact ? settle * 0.86 : settle,
        compact ? 1.007 : 1.012,
      );
      expose(opening.querySelector("h1"), structural * 1.2, 100);
      play(
        opening.querySelector(".opening-support"),
        [{ opacity: 0.9 }, { opacity: 1 }],
        structural * 0.75,
        280,
      );
      for (const line of all(opening, ".service-rule, .advancing-rule"))
        rule(line, structural, 500);
    }

    all(narrative, ".expanded-service").forEach((service, index) => {
      const line = service.querySelector<HTMLElement>(".direction > span");
      if (line)
        line.style.transformOrigin =
          index === 1 ? (compact ? "60% center" : "right") : "left";
      observe(service, () => rule(line, structural * [0.9, 0.98, 1.1][index]));
    });
    const accountability = narrative.querySelector(".direct-accountability");
    observe(accountability, () => {
      for (const text of all(accountability!, "h2, p"))
        play(text, [{ opacity: 0.94 }, { opacity: 1 }], structural * 1.05);
    });
    const framing = narrative.querySelector(".engineering-approach > h2");
    observe(framing, () => expose(framing));
    const principles = narrative.querySelector(".principles");
    const resolvePrinciple = (principle: HTMLElement) => {
      // The authored border stays in place; establish its tone without reflow.
      play(
        principle,
        [
          { borderTopColor: "transparent" },
          { borderTopColor: getComputedStyle(principle).borderTopColor },
        ],
        structural * 0.8,
      );
      for (const text of all(principle, "h3, p"))
        play(text, [{ opacity: 0.9 }, { opacity: 1 }], structural * 0.7, 50);
    };
    if (compact)
      observe(principles, () =>
        play(principles, [{ opacity: 0.96 }, { opacity: 1 }], structural * 0.7),
      );
    else
      all(narrative, ".principle").forEach((principle) =>
        observe(principle, () => resolvePrinciple(principle)),
      );

    const regional = narrative.querySelector(".regional-release");
    observe(regional, () => {
      // Do not overlap the two large image moments during a quick jump down.
      for (const animation of active) animation.cancel();
      image(
        regional!.querySelector("img"),
        compact ? settle * 0.72 : settle * 0.95,
        compact ? 1.01 : 1.015,
      );
    });
    const conversion = narrative.querySelector(".conversion-primary");
    observe(conversion, () =>
      rule(
        conversion!.querySelector(".direction > span"),
        structural * (compact ? 0.9 : 1.1),
      ),
    );
  } catch {
    stop();
  }
}

// Unsupported APIs or a setup failure leave the complete static document.
try {
  enhanceHome();
} catch {
  /* Optional decoration has no recovery UI. */
}
