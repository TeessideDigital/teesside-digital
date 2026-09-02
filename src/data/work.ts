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
  results?: string[]; // Only ever real, verified results. Omit entirely for in-development projects -- never fabricate.
  servicesProvided: string[]; // Service slugs from services.ts (e.g. 'web-development'), resolved to display names via getServiceBySlug at render time -- keeps the display name in sync with services.ts as a single source of truth rather than duplicating it here.
  technologies: string[]; // Genuinely planned/standing toolkit only -- never an aspirational stack for this specific project. See PLAN.md's case study honesty rule.
  status: 'live' | 'in-development'; // 'live' unlocks demoUrl rendering; 'in-development' shows a status label instead
  demoUrl?: string; // Only set once the demo is actually deployed and reachable
  caseStudyUrl: string;
}

export const projects: Project[] = [
  {
    id: 'northeast-joinery',
    slug: 'northeast-joinery',
    title: 'North East Joinery — Local Business Website (Demo)',
    shortDescription: 'A demonstration of a modern, high-performance website for a local joinery and carpentry business.',
    description:
      'North East Joinery is a demonstration project showing how a modern website can transform a local trades business\'s online presence. It will feature fast, mobile-first design, a portfolio gallery for past work, and a straightforward path to requesting a quote.',
    heroImage: '/images/work/northeast-joinery-hero.jpg',
    heroImageAlt: 'North East Joinery website concept',
    featured: true,
    tags: ['web-design', 'portfolio', 'astro'],
    challenge:
      'Many local trades businesses have no real online presence: potential customers can\'t see past work or easily request a quote, and older sites are often slow and not mobile-friendly. This demo illustrates that common problem.',
    solution:
      'A fast, modern website built with Astro, Tailwind CSS, and a React-powered multi-step quote form, integrated with Netlify Forms for lead capture. Designed to showcase a portfolio of work with high-quality images and a clear call to action.',
    technologies: ['Astro', 'Tailwind CSS', 'React', 'Netlify Forms'],
    servicesProvided: ['web-development'],
    status: 'in-development',
    caseStudyUrl: '/work/northeast-joinery',
  },
  {
    id: 'quoteflow',
    slug: 'quoteflow',
    title: 'QuoteFlow — Quote Generation Tool (Demo)',
    shortDescription: 'A planned demonstration of an AI-powered quote generation tool for small service businesses.',
    description:
      'QuoteFlow is a demo project showing how an AI-assisted quote generation tool could work for small service businesses. The plan: let users create quotes, customise pricing, and send professional quotes to clients quickly.',
    heroImage: '/images/work/quoteflow-hero.jpg',
    heroImageAlt: 'QuoteFlow demo application concept',
    featured: false,
    tags: ['web-app', 'saas', 'react'],
    challenge:
      'Service businesses like plumbers, electricians, and builders often spend significant time generating quotes manually, which leads to errors and delays.',
    solution:
      'A planned web app where users create templates, add services and rates, and generate professional quotes quickly, with AI assistance to speed up the process.',
    technologies: ['Astro', 'Tailwind CSS', 'React'],
    servicesProvided: ['web-development', 'ai-automation'],
    status: 'in-development',
    caseStudyUrl: '/work/quoteflow',
  },
  {
    id: 'siteguard',
    slug: 'siteguard',
    title: 'SiteGuard — Security Monitoring Dashboard (Demo)',
    shortDescription: 'A planned demonstration of a real-time dashboard for monitoring website security, uptime, and performance.',
    description:
      'SiteGuard is a demo project showing how security and performance monitoring could be presented to clients: real-time alerts for downtime, SSL certificate expiry, broken links, and security issues.',
    heroImage: '/images/work/siteguard-hero.jpg',
    heroImageAlt: 'SiteGuard security dashboard concept',
    featured: false,
    tags: ['web-app', 'monitoring', 'security'],
    challenge:
      'Website owners often have no easy way to monitor security threats, downtime, or performance issues without expensive tools or specialist knowledge.',
    solution:
      'A planned dashboard that would continuously monitor websites for vulnerabilities, check SSL certificates, detect broken links, and track performance, with real-time alerts.',
    technologies: ['Astro', 'Tailwind CSS', 'React'],
    servicesProvided: ['web-development', 'cybersecurity'],
    status: 'in-development',
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
