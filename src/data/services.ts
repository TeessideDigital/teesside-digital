/**
 * Services offered by Teesside Digital
 * Used on /services and service detail pages
 * Structure allows easy Phase 2 migration to Supabase
 */

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  imageAlt: string;
  benefits: string[];
  useCases: string[];
  accentColor: 'cyan' | 'purple' | 'green' | 'lime'; // matches Card.astro's accent bar colours
  features: string[]; // short capability tags shown on the card, e.g. "Performance", "SEO"
  categoryCode: string; // short label for the "01 / WEB" style numbered tag, e.g. "WEB"
}

export const services: Service[] = [
  {
    id: 'web-development',
    slug: 'web-development',
    title: 'Web Development',
    shortDescription: 'Fast, secure, accessible websites built to convert.',
    description:
      'From simple brochure sites to complex web applications, we build websites that perform. Fast load times, mobile-responsive design, and security by default. We use modern technologies like Astro, Next.js, and React to deliver production-quality sites.',
    image: '/images/services/web-development.jpg',
    imageAlt: 'Web development services',
    benefits: [
      'Fast, lighthouse-optimised sites',
      'Mobile-first responsive design',
      'Security built in from the start',
      'Accessible to all users (WCAG 2.2)',
      'SEO-friendly architecture',
      'Easy to maintain and update',
    ],
    useCases: [
      'Small business websites',
      'Professional portfolios',
      'E-commerce sites',
      'Blog platforms',
      'SaaS landing pages',
      'Web applications',
    ],
    accentColor: 'cyan',
    features: ['Performance', 'SEO', 'Accessibility', 'CMS'],
    categoryCode: 'WEB',
  },
  {
    id: 'ai-automation',
    slug: 'ai-automation',
    title: 'AI & Automation',
    shortDescription: 'Intelligent workflows that save time and reduce costs.',
    description:
      'Integrate AI into your business processes to automate repetitive tasks, improve decision-making, and free up your team to focus on what matters. From chatbots to content generation to process automation, we design solutions that actually work.',
    image: '/images/services/ai-automation.jpg',
    imageAlt: 'AI and automation services',
    benefits: [
      'Reduce manual, repetitive work',
      'Improve consistency and accuracy',
      'Scale without scaling headcount',
      'Lower operational costs',
      'Better data-driven decisions',
      'Competitive advantage',
    ],
    useCases: [
      'Customer support chatbots',
      'Email and content automation',
      'Lead qualification workflows',
      'Document processing',
      'Data analysis and reporting',
      'Predictive analytics',
    ],
    accentColor: 'purple',
    features: ['Chatbots', 'Automation', 'Integrations', 'Analytics'],
    categoryCode: 'AI',
  },
  {
    id: 'cybersecurity',
    slug: 'cybersecurity',
    title: 'Cybersecurity & Audit',
    shortDescription: 'Protect your business from threats. Transparently.',
    description:
      'Security is not optional. We assess your digital infrastructure, identify vulnerabilities, and implement practical defences. No fluff, no unnecessary jargon — just honest assessment and actionable recommendations.',
    image: '/images/services/cybersecurity.jpg',
    imageAlt: 'Cybersecurity and audit services',
    benefits: [
      'Identify real security gaps',
      'Actionable remediation plans',
      'Compliance guidance',
      'Secure code review',
      'Infrastructure hardening',
      'Ongoing security support',
    ],
    useCases: [
      'Website security audits',
      'Code review and penetration testing',
      'Security compliance (GDPR, ISO)',
      'Incident response and recovery',
      'Employee security training',
      'Security infrastructure design',
    ],
    accentColor: 'green',
    features: ['Audits', 'Pen Testing', 'Compliance', 'Hardening'],
    categoryCode: 'SECURITY',
  },
];

/**
 * Detailed service descriptions for individual service pages
 * These are expanded versions of the service cards above
 */
export const serviceDetails: Record<string, Service> = {
  'web-development': services[0]!,
  'ai-automation': services[1]!,
  cybersecurity: services[2]!,
};

/**
 * Get all services
 * (Wrapper for consistency with pages)
 */
export function getServices(): Service[] {
  return services;
}

/**
 * Get a single service by slug
 */
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
