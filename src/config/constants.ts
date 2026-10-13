/**
 * Site-wide constants and configuration
 * Centralizes metadata, URLs, and feature flags for easy maintenance
 */

export const SITE = {
  title: "Teesside Digital",
  tagline: "Precision engineering for small businesses",
  description:
    "Web development, AI automation, and cybersecurity consultancy for small and medium-sized businesses across the UK.",
  url: import.meta.env.PROD
    ? "https://teessidedigital.uk"
    : "http://localhost:3000",
  language: "en-GB",
  author: "Dave",
  email: "dave@teessidedigital.uk",
  // The dedicated business line, written as it should be read, with spaces.
  // Leave it empty until that line exists: while it is empty, nothing
  // phone-related is rendered anywhere on the site.
  phone: "",
};

/** A tel: link for a phone number written with spaces. */
export function telephoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export const BUSINESS = {
  name: "Teesside Digital",
  founder: "Dave",
  location: "Hartlepool",
  region: "North East England",
  founded: 2026,
  description:
    "A solo-operated technology consultancy providing web development, AI automation, and cybersecurity services.",
};

export const FEATURE_FLAGS = {
  // Phase 1: Launch features
  showHealthCheck: true,
  showDemoProjects: true,
  showTestimonials: false,

  // Phase 2: Future features (set to true when ready)
  showAnalytics: false,
  showServerHealthCheckAudit: false,
  showClientPortal: false,
};

export const SEO = {
  // Local SEO keywords (Teesside/North East focus)
  keywords: [
    "web development Hartlepool",
    "web design North East",
    "cybersecurity consultancy UK",
    "AI automation Teesside",
    "web developer Middlesbrough",
    "freelance developer Stockton",
  ],
};
