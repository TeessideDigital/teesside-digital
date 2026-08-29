/**
 * SEO Helpers
 * Centralised functions for meta tags, structured data, and Open Graph generation
 */

import { SITE } from '@config/constants';

export interface SEOProps {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  canonical?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
  };
  robots?: string;
}

/**
 * Generate meta title (appends site name)
 */
export function getPageTitle(title: string): string {
  if (title.includes('|')) {
    return title; // Already formatted
  }
  return title === SITE.title ? title : `${title} | ${SITE.title}`;
}

/**
 * Generate canonical URL
 */
export function getCanonicalUrl(path: string): string {
  return `${SITE.url}${path}`;
}

/**
 * Generate Open Graph image URL (full URL required)
 */
export function getOgImageUrl(image?: string): string {
  if (!image) {
    return `${SITE.url}/images/og-default.jpg`;
  }
  if (image.startsWith('http')) {
    return image;
  }
  return `${SITE.url}${image}`;
}

/**
 * Structured Data: Organisation (for homepage)
 * Used for Google Knowledge Panel and rich snippets
 */
export function getOrganisationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.title,
    url: SITE.url,
    logo: `${SITE.url}/images/logo.svg`,
    description: SITE.description,
    founder: {
      '@type': 'Person',
      name: 'Dave',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      telephone: '', // Add if available
      email: SITE.email,
    },
    sameAs: [
      'https://github.com/TeessideDigital',
      'https://linkedin.com/company/teessidedigital',
    ],
  };
}

/**
 * Structured Data: LocalBusiness (for local SEO)
 * Helps Google understand your service area
 */
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE.title,
    image: `${SITE.url}/images/logo.svg`,
    description: SITE.description,
    url: SITE.url,
    telephone: '', // Add if available
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hartlepool',
      addressRegion: 'England',
      addressCountry: 'GB',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Hartlepool',
      },
      {
        '@type': 'City',
        name: 'Middlesbrough',
      },
      {
        '@type': 'City',
        name: 'Stockton-on-Tees',
      },
      {
        '@type': 'Region',
        name: 'North East England',
      },
      {
        '@type': 'Country',
        name: 'United Kingdom',
      },
    ],
    sameAs: [
      'https://github.com/TeessideDigital',
      'https://linkedin.com/company/teessidedigital',
    ],
  };
}

/**
 * Structured Data: Service
 * Used on service detail pages
 */
export function getServiceSchema(service: {
  name: string;
  description: string;
  image: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    image: getOgImageUrl(service.image),
    provider: {
      '@type': 'Organization',
      name: SITE.title,
      url: SITE.url,
    },
    url: getCanonicalUrl(service.url),
    areaServed: {
      '@type': 'GeoShape',
      name: 'United Kingdom',
    },
  };
}

/**
 * Structured Data: BreadcrumbList
 * Improves navigation clarity and SEO
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.url),
    })),
  };
}

/**
 * Structured Data: Article / BlogPosting
 * Used on case study pages
 */
export function getArticleSchema(article: {
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: getOgImageUrl(article.image),
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.author || SITE.title,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.title,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE.url}/images/logo.svg`,
      },
    },
    url: getCanonicalUrl(article.url),
  };
}

/**
 * Sanitise text for meta descriptions
 * Removes HTML, trims to 160 characters
 */
export function sanitiseDescription(text: string, maxLength = 160): string {
  const stripped = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  return stripped.length > maxLength ? `${stripped.substring(0, maxLength)}...` : stripped;
}

/**
 * Generate Twitter Card meta tags
 */
export function getTwitterCard(props: SEOProps) {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': props.title,
    'twitter:description': props.description,
    'twitter:image': getOgImageUrl(props.image),
  };
}
