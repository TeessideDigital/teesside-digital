/* Shared head initialiser and future control API. No automatic OS preference.
 * CSP: hash the exact emitted inline bytes; keep this output deterministic.
 */
(() => {
  const root = document.documentElement;
  const key = "td:theme";
  const valid = (value) => value === "dark" || value === "light";
  const get = () => (root.dataset.theme === "light" ? "light" : "dark");
  let initial = "dark";
  try {
    const saved = localStorage.getItem(key);
    if (valid(saved)) initial = saved;
  } catch {
    // Storage is optional. CSS and static HTML already provide Dark.
  }
  root.dataset.theme = initial;

  window.TeessideTheme = Object.freeze({
    get,
    // Future controls call set('dark'|'light'); persisted is not a save promise.
    set(value) {
      if (!valid(value)) return { theme: get(), persisted: false };
      if (value !== get()) {
        root.setAttribute("data-theme-changing", "");
        // Flush both states with transitions disabled, including V1 descendants.
        void root.offsetWidth;
        root.dataset.theme = value;
        void root.offsetWidth;
        root.removeAttribute("data-theme-changing");
      }
      let persisted = false;
      try {
        localStorage.setItem(key, value);
        persisted = true;
      } catch {
        // Explicit selection still applies for this document when saving fails.
      }
      return { theme: get(), persisted };
    },
  });
})();
