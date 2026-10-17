/**
 * Lighthouse (mobile) scores for this website, shown as rings on Home. They
 * must be real measurements of the production build. Leave `measured` null to
 * hide the rings.
 */
export interface Scores {
  measured: string; // ISO date, for example "2026-10-17"
  performance: number;
  accessibility: number;
  bestPractices: number;
}

export const scores: Scores | null = null;
