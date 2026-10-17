/**
 * Lighthouse (mobile) scores for this website, shown as rings on Home. They
 * must be real measurements of the production build. Set `scores` to null to
 * hide the rings.
 */
export interface Scores {
  measured: string; // ISO date, for example "2026-10-17"
  performance: number;
  accessibility: number;
  bestPractices: number;
}

// Lighthouse 12.8.2, mobile (default throttling), Home with these rings in
// place, production build served locally, two runs, 17 October 2026.
// Re-measure on the live site after go-live.
export const scores: Scores | null = {
  measured: "2026-10-17",
  performance: 99,
  accessibility: 100,
  bestPractices: 100,
};
