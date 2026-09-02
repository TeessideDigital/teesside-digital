/**
 * Site-wide constants and configuration
 * Centralizes metadata, URLs, and feature flags for easy maintenance
 */

export const SITE = {
  title: 'Teesside Digital',
  tagline: 'Precision engineering for small businesses',
  description:
    'Web development, AI automation, and cybersecurity consultancy for small and medium-sized businesses across the UK.',
  url: import.meta.env.PROD ? 'https://teessidedigital.uk' : 'http://localhost:3000',
  language: 'en-GB',
  author: 'Dave',
  email: 'dave@teessidedigital.uk',
};

export const BUSINESS = {
  name: 'Teesside Digital',
  founder: 'Dave',
  location: 'Hartlepool',
  region: 'North East England',
  founded: 2026,
  description: 'A solo-operated technology consultancy providing web development, AI automation, and cybersecurity services.',
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
    'web development Hartlepool',
    'web design North East',
    'cybersecurity consultancy UK',
    'AI automation Teesside',
    'web developer Middlesbrough',
    'freelance developer Stockton',
  ],
};

export const NAVIGATION = {
  header: [
    { label: 'Services', href: '/services' },
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  footer: [
    { label: 'Services', href: '/services' },
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Accessibility', href: '/accessibility' },
  ],
};
