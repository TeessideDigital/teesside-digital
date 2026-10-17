/* Runs in the head, before first paint. CSP: the policy allows this inline
 * script by the hash of its exact emitted bytes; keep it deterministic.
 * - "js" lets CSS hide what scripts will manage (closed answers, later form
 *   steps) without a flash. If the page scripts have not said "js-ok" within
 *   4 seconds, the class is removed again so nothing stays hidden.
 * - "intro" plays the logo animation when a visit arrives from outside the
 *   site, and skips it when moving between pages. Nothing is stored.
 */
(() => {
  const root = document.documentElement;
  root.classList.add("js");
  setTimeout(() => {
    if (!root.classList.contains("js-ok")) root.classList.remove("js");
  }, 4000);
  let internal = false;
  try {
    internal = new URL(document.referrer).origin === location.origin;
  } catch {
    // No referrer, or not a URL: treat it as arriving from outside.
  }
  if (!internal) root.classList.add("intro");
})();
