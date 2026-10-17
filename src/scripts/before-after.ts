/** Before and after slider. The range input drives the split; the first time
 * half the slider is in view it nudges 50 > 28 > 72 > 50 to show it moves
 * (once, never under reduced motion). */

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const stage = document.getElementById("ba");
const range = document.getElementById("ba-range") as HTMLInputElement | null;

if (stage && range) {
  const set = (value: number) => stage.style.setProperty("--pos", `${value}%`);
  let touched = false;
  range.addEventListener("input", () => {
    touched = true;
    set(Number(range.value));
  });
  set(Number(range.value));

  if (!reduce && "IntersectionObserver" in window) {
    const keys: [number, number][] = [
      [0, 50],
      [600, 28],
      [1300, 72],
      [1900, 50],
    ];
    const ease = (k: number) => (k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2);
    const hint = () => {
      const start = performance.now();
      const step = (now: number) => {
        // Someone took hold of the slider: stop and leave it where they put it.
        if (touched) return;
        const t = now - start;
        let i = 0;
        while (i < keys.length - 1 && t > keys[i + 1]![0]) i += 1;
        if (i >= keys.length - 1) {
          set(50);
          range.value = "50";
          return;
        }
        const [t0, v0] = keys[i]!;
        const [t1, v1] = keys[i + 1]!;
        const value = v0 + (v1 - v0) * ease((t - t0) / (t1 - t0));
        set(value);
        range.value = String(Math.round(value));
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        hint();
      },
      { threshold: 0.5 },
    );
    observer.observe(stage);
  }
}

export {};
