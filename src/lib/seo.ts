/**
 * SEO helpers: page title, canonical URL, social image and the one structured
 * data block the site publishes.
 */

import { SITE } from "@config/constants";

/** Append the site name, unless the title already carries it. */
export function getPageTitle(title: string): string {
  if (title.includes("|") || title.startsWith(SITE.title)) return title;
  return `${title} | ${SITE.title}`;
}

/** Absolute URL for a site path. Paths end in a slash, as every route does. */
export function getCanonicalUrl(path: string): string {
  return `${SITE.url}${path}`;
}

/** Absolute URL of the social image. Every page shares the one image. */
export function getOgImageUrl(image?: string): string {
  if (!image) return `${SITE.url}/images/og-image.png`;
  return image.startsWith("http") ? image : `${SITE.url}${image}`;
}

/**
 * Structured data: Organization. Facts only. Add a profile to sameAs once its
 * address is confirmed.
 */
export function getOrganisationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.title,
    url: `${SITE.url}/`,
    logo: `${SITE.url}/icon-512.png`,
    description: SITE.description,
    founder: {
      "@type": "Person",
      name: "Dave",
    },
    email: SITE.email,
    sameAs: ["https://github.com/TeessideDigital"],
  };
}
