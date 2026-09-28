/** Services choreography uses Home's CSS vocabulary without changing its coordinator.
 * Finite native animations expose the underlying static styles on completion.
 * No initial hidden CSS, persistent fill state or animation loop is required.
 */
function enhanceServices() {
  const root = document.querySelector<HTMLElement>(".services-experience");
  if (!root || !Element.prototype.animate || !window.IntersectionObserver)
    return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const forced = matchMedia("(forced-colors: active)");
  // Direct service links deliver the settled document, not a fresh entrance.
  if (reduced.matches || forced.matches || location.hash) return;

  const compact = matchMedia("(max-width: 47.999rem)").matches;
  const tokens = getComputedStyle(root);
  const value = tokens.getPropertyValue("--home-motion-structural").trim();
  const structural = parseFloat(value) * (value.endsWith("ms") ? 1 : 1000);
  const easing = tokens.getPropertyValue("--home-ease-structural").trim();
  if (!Number.isFinite(structural)) return;

  const active = new Set<Animation>();
  const pending = new Map<Element, () => void>();
  const listeners = new AbortController();
  let observer: IntersectionObserver | undefined;
  let stopped = false;
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
  const play = (
    element: Element | null,
    frames: Keyframe[],
    duration = structural,
    delay = 0,
  ) => {
    if (
      !element ||
      stopped ||
      element.matches(":focus, :target") ||
      element.closest("a:focus, a:hover")
    )
      return;
    const animation = element.animate(frames, {
      duration,
      delay,
      easing,
      fill: "backwards",
    });
    active.add(animation);
    const release = () => active.delete(animation);
    animation.addEventListener("finish", release, { once: true });
    animation.addEventListener("cancel", release, { once: true });
  };
  const expose = (element: Element | null, inward = false) =>
    play(element, [
      { clipPath: inward && !compact ? "inset(0 4% 0 0)" : "inset(0 0 6% 0)" },
      { clipPath: "inset(0 0 0 0)" },
    ]);
  const tone = (element: Element | null, from = 0.94, delay = 0) =>
    play(
      element,
      [{ opacity: from }, { opacity: 1 }],
      structural * 0.75,
      delay,
    );
  const line = (
    element: HTMLElement | null,
    origin = "left",
    duration = structural,
    delay = 0,
  ) => {
    if (!element) return;
    element.style.transformOrigin = origin;
    play(
      element,
      [
        { transform: "scaleX(0.88)", opacity: 0.55 },
        { transform: "scaleX(1)", opacity: 1 },
      ],
      duration,
      delay,
    );
  };
  const border = (element: HTMLElement, duration = structural * 0.8) =>
    play(
      element,
      [
        { borderTopColor: "transparent" },
        { borderTopColor: getComputedStyle(element).borderTopColor },
      ],
      duration,
    );
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
            if (!stopped && entry.boundingClientRect.bottom > 0) action?.();
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
    // Native anchors take priority. No scroll interception or focus reassignment.
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

    const navigation = performance.getEntriesByType("navigation")[0] as
      PerformanceNavigationTiming | undefined;
    const paint = performance.getEntriesByName("first-contentful-paint")[0];
    if (
      scrollY === 0 &&
      navigation?.type !== "back_forward" &&
      (!paint || performance.now() - paint.startTime < 120)
    ) {
      expose(root.querySelector("h1"));
      tone(root.querySelector(".orientation-statement"), 0.94, 120);
      all(".contents .direction > span").forEach((rule, index) =>
        line(
          rule,
          index === 1 ? (compact ? "60% center" : "right") : "left",
          structural,
          220,
        ),
      );
    }

    all(".chapter-intro").forEach((intro) =>
      observe(intro, () => {
        expose(intro.querySelector("h2"), intro.closest(".apps") !== null);
        if (!compact) tone(intro.querySelector(".lead"), 0.95);
      }),
    );
    if (compact) {
      // Mobile keeps three quiet groups instead of animating every detail.
      for (const group of all(".website-details, .tool-examples, .disciplines"))
        observe(group, () => tone(group, 0.97));
    } else {
      all(".website-details .detail, .disciplines .detail").forEach((detail) =>
        observe(detail, () => {
          border(detail);
          tone(detail.querySelector("h3"), 0.94, 50);
        }),
      );
      all(".tool-examples li").forEach((example) =>
        observe(example, () => {
          border(example);
          expose(example, true);
        }),
      );
    }
    const applications = root.querySelector<HTMLElement>(
      ".automation-examples",
    );
    observe(applications, () => border(applications!, structural * 1.1));
    // The AI statement and application labels are already fully readable.
    const engineering = root.querySelector("#engineering-heading");
    observe(engineering, () => expose(engineering));
    if (!compact) {
      all(".fit h2, .fit h3").forEach((statement) =>
        observe(statement, () =>
          play(statement, [{ opacity: 0.97 }, { opacity: 1 }], structural),
        ),
      );
    }
    const conversion = root.querySelector(".conversion-primary");
    observe(conversion, () =>
      line(
        conversion!.querySelector(".direction > span"),
        "left",
        structural * (compact ? 0.9 : 1.1),
      ),
    );
  } catch {
    stop();
  }
}

try {
  enhanceServices();
} catch {
  /* Optional decoration leaves the static page intact. */
}
