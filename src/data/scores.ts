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

// Lighthouse 12.8.2, mobile (default throttling), the live home page on
// https://teessidedigital.uk, median of five runs, 17 October 2026.
export const scores: Scores | null = {
  measured: "2026-10-17",
  performance: 95,
  accessibility: 100,
  bestPractices: 93,
};
