/* Runs in the head, before first paint. CSP: the policy allows this inline
 * script by the hash of its exact emitted bytes; keep it deterministic.
 * - "js" lets CSS hide what scripts will manage (closed answers, later form
 *   steps) without a flash. If the page scripts have not said "js-ok" within
 *   4 seconds, the class is removed again so nothing stays hidden.
 * - "intro" plays the logo animation on the first page view of a session only.
 */
(() => {
  const root = document.documentElement;
  root.classList.add("js");
  setTimeout(() => {
    if (!root.classList.contains("js-ok")) root.classList.remove("js");
  }, 4000);
  try {
    if (!sessionStorage.getItem("td:intro")) {
      sessionStorage.setItem("td:intro", "1");
      root.classList.add("intro");
    }
  } catch {
    // Storage is optional: without it, the logo simply does not animate.
  }
})();
