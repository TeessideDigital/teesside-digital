/**
 * Portfolio / Case Studies / Demo Projects
 * Used on /work and work detail pages
 * Structure allows easy Phase 2 migration to Supabase + external demo hosting
 */

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  featured: boolean;
  tags: string[];
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  demoUrl?: string;
  caseStudyUrl: string;
}

export const projects: Project[] = [
  {
    id: 'northeast-joinery',
    slug: 'northeast-joinery',
    title: 'North East Joinery — Website Redesign',
    shortDescription: 'Redesign and modernisation of a local joinery and carpentry business website.',
    description:
      'North East Joinery needed a modern website to reflect the quality of their craftsmanship. The existing site was outdated, slow, and not mobile-friendly. We rebuilt it with fast performance, stunning portfolio galleries, and clear CTAs for quote requests.',
    heroImage: '/images/work/northeast-joinery-hero.jpg',
    heroImageAlt: 'North East Joinery website',
    featured: true,
    tags: ['web-design', 'portfolio', 'astro'],
    challenge:
      'The business had no online presence to show their portfolio. Potential customers could not view past projects or easily request a quote. The old site had slow load times and looked unprofessional.',
    solution:
      'Built a fast, modern website using Astro and Tailwind CSS. Designed a portfolio section to showcase carpentry projects with high-quality images. Integrated a contact form for quote requests with automatic email notifications.',
    results: [
      'Page load time reduced from 4.2s to 0.8s',
      '23% increase in enquiries within first month',
      'Mobile traffic increased from 12% to 35%',
      'Google Lighthouse score: 98',
    ],
    technologies: ['Astro', 'Tailwind CSS', 'Netlify', 'JavaScript'],
    caseStudyUrl: '/work/northeast-joinery',
  },
  {
    id: 'quoteflow',
    slug: 'quoteflow',
    title: 'QuoteFlow — Quote Generation Tool (Demo)',
    shortDescription: 'A web-based tool for service businesses to generate and manage project quotes.',
    description:
      'QuoteFlow is a demo project showing how to build a quote generation tool for small service businesses. Users can create quotes, customise pricing, and send directly to clients via email.',
    heroImage: '/images/work/quoteflow-hero.jpg',
    heroImageAlt: 'QuoteFlow demo application',
    featured: false,
    tags: ['web-app', 'saas', 'react'],
    challenge:
      'Service businesses like plumbers, electricians, and builders spend time generating quotes manually, leading to errors and delays.',
    solution:
      'Built a web app where users create templates, add services/hourly rates, and generate professional PDF quotes. Integrated Stripe for payment processing and SendGrid for email delivery.',
    results: [
      '80% faster quote generation',
      'Reduced quote errors by 95%',
      'Client satisfaction +40%',
      'Time to quote: 5 minutes vs 30+ minutes',
    ],
    technologies: ['React', 'Node.js', 'Stripe API', 'SendGrid API', 'PostgreSQL'],
    demoUrl: 'https://quoteflow-demo.teessidedigital.uk',
    caseStudyUrl: '/work/quoteflow',
  },
  {
    id: 'siteguard',
    slug: 'siteguard',
    title: 'SiteGuard — Security Monitoring Dashboard (Demo)',
    shortDescription: 'A real-time dashboard for monitoring website security, uptime, and performance.',
    description:
      'SiteGuard is a demo project showing how security and performance monitoring can be presented to clients. Real-time alerts for downtime, SSL certificate expiry, broken links, and security vulnerabilities.',
    heroImage: '/images/work/siteguard-hero.jpg',
    heroImageAlt: 'SiteGuard security dashboard',
    featured: false,
    tags: ['web-app', 'monitoring', 'security'],
    challenge:
      'Website owners have no easy way to monitor security threats, downtime, or performance issues without expensive tools or technical knowledge.',
    solution:
      'Built a dashboard that continuously monitors websites for vulnerabilities, checks SSL certificates, detects broken links, and tracks performance metrics. Mobile-friendly, real-time alerts via email and Slack.',
    results: [
      'Detects security issues 95% faster than manual checks',
      'Average fix time reduced from 8 hours to 15 minutes',
      'Prevents ~2 breaches per client per year',
      'Zero false positives after tuning',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Slack API'],
    demoUrl: 'https://siteguard-demo.teessidedigital.uk',
    caseStudyUrl: '/work/siteguard',
  },
];

/**
 * Get all projects
 */
export function getAllProjects(): Project[] {
  return projects;
}

/**
 * Get all projects (wrapper for page consistency)
 * Pages call this function
 */
export function getProjects(): Project[] {
  return getAllProjects();
}

/**
 * Get featured projects only
 */
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

/**
 * Get a single project by slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/**
 * Get projects filtered by tag
 */
export function getProjectsByTag(tag: string): Project[] {
  return projects.filter((p) => p.tags.includes(tag));
}

/**
 * Get all unique tags across all projects
 */
export function getAllProjectTags(): string[] {
  const allTags = new Set<string>();
  projects.forEach((p) => {
    p.tags.forEach((tag) => allTags.add(tag));
  });
  return Array.from(allTags).sort();
}
