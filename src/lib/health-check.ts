/**
 * Health Check Tool Logic
 *
 * This file contains all the client-side logic for analysing websites.
 * No server-side requests are made — all analysis happens in the browser.
 * This completely eliminates SSRF risk.
 *
 * Categories:
 * - Performance (basic)
 * - Accessibility (basic)
 * - Security (basic, informational only)
 * - SEO (basic)
 */

export interface HealthCheckScore {
  performance: number;
  accessibility: number;
  security: number;
  seo: number;
  overall: number;
}

export interface HealthCheckFinding {
  category: 'performance' | 'accessibility' | 'security' | 'seo';
  priority: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  recommendation: string;
}

export interface HealthCheckResult {
  url: string;
  scores: HealthCheckScore;
  findings: HealthCheckFinding[];
  timestamp: string;
  disclaimer: string;
}

/**
 * Run a health check on a URL
 * All analysis is client-side; no server requests
 */
export async function runHealthCheck(urlInput: string): Promise<HealthCheckResult> {
  const url = normaliseUrl(urlInput);

  // Validate URL format
  if (!isValidUrl(url)) {
    throw new Error('Invalid URL format');
  }

  // Fetch the website content from the browser
  // CORS will prevent requests to disallowed origins (prevents SSRF)
  let html = '';
  try {
    const response = await fetch(url, {
      mode: 'cors',
      cache: 'no-cache',
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    html = await response.text();
  } catch (error) {
    throw new Error(`Could not fetch website: ${error instanceof Error ? error.message : 'Unknown error'}. This may be due to CORS restrictions or the website being offline.`);
  }

  // Parse HTML into a DOM
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Run analyses
  const findings: HealthCheckFinding[] = [];

  // Performance checks
  findings.push(...analysePerformance(doc, html));

  // Accessibility checks
  findings.push(...analyseAccessibility(doc));

  // Security checks
  findings.push(...analyseSecurity(doc, html));

  // SEO checks
  findings.push(...analyseSEO(doc));

  // Calculate scores
  const scores = calculateScores(findings);

  return {
    url,
    scores,
    findings: sortFindings(findings),
    timestamp: new Date().toISOString(),
    disclaimer:
      'This is a basic website health check. It is NOT a substitute for a full security audit or professional review. For security audits, contact Teesside Digital.',
  };
}

/* ============================================================
   URL Handling
   ============================================================ */

/**
 * Normalise URL (add protocol if missing)
 */
function normaliseUrl(input: string): string {
  const trimmed = input.trim().toLowerCase();

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  // Add https:// if no protocol
  return `https://${trimmed}`;
}

/**
 * Validate URL format
 */
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/* ============================================================
   Performance Analysis
   ============================================================ */

function analysePerformance(doc: Document, html: string): HealthCheckFinding[] {
  const findings: HealthCheckFinding[] = [];
  const docSize = new Blob([html]).size;

  // Check page size
  if (docSize > 5000000) {
    // > 5MB
    findings.push({
      category: 'performance',
      priority: 'high',
      title: 'Large page size',
      description: `Page HTML is ${(docSize / 1000000).toFixed(1)}MB. Large pages take longer to load.`,
      recommendation: 'Reduce page size by optimising images, removing unused code, and lazy-loading content.',
    });
  } else if (docSize > 2000000) {
    // > 2MB
    findings.push({
      category: 'performance',
      priority: 'medium',
      title: 'Large page size',
      description: `Page HTML is ${(docSize / 1000000).toFixed(1)}MB. Consider optimisation.`,
      recommendation: 'Optimise images and remove unnecessary scripts.',
    });
  }

  // Check for unoptimised images
  const images = doc.querySelectorAll('img');
  let unoptimisedCount = 0;

  images.forEach((img) => {
    const src = img.getAttribute('src') || '';
    // Simple check: if image is larger than expected, flag it
    if (!src.includes('.webp') && !src.includes('.jpg') && !src.includes('.png')) {
      // Warn about non-standard formats
    }
    if (!img.hasAttribute('alt') && img.offsetHeight > 100) {
      // Large image without alt text
      unoptimisedCount++;
    }
  });

  if (unoptimisedCount > 0) {
    findings.push({
      category: 'performance',
      priority: 'medium',
      title: 'Large images without alt text',
      description: `${unoptimisedCount} large image(s) are missing alt text.`,
      recommendation: 'Add descriptive alt text to all images and consider using modern formats (WebP).',
    });
  }

  // Check for render-blocking resources
  const scripts = doc.querySelectorAll('script[src]');
  let renderBlockingCount = 0;
  scripts.forEach((script) => {
    // Scripts without async/defer are render-blocking
    if (!script.hasAttribute('async') && !script.hasAttribute('defer')) {
      renderBlockingCount++;
    }
  });

  if (renderBlockingCount > 2) {
    findings.push({
      category: 'performance',
      priority: 'high',
      title: 'Render-blocking scripts',
      description: `${renderBlockingCount} script(s) could block page rendering.`,
      recommendation: 'Add async or defer attributes to non-critical scripts, or move them to the page bottom.',
    });
  }

  return findings;
}

/* ============================================================
   Accessibility Analysis
   ============================================================ */

function analyseAccessibility(doc: Document): HealthCheckFinding[] {
  const findings: HealthCheckFinding[] = [];

  // Check for page title
  const title = doc.querySelector('title');
  if (!title || !title.textContent || title.textContent.trim() === '') {
    findings.push({
      category: 'accessibility',
      priority: 'critical',
      title: 'Missing page title',
      description: 'The page has no <title> tag.',
      recommendation: 'Add a descriptive <title> tag to every page.',
    });
  }

  // Check for main landmark
  const main = doc.querySelector('main');
  if (!main) {
    findings.push({
      category: 'accessibility',
      priority: 'high',
      title: 'Missing <main> landmark',
      description: 'The page should have a <main> element to identify primary content.',
      recommendation: 'Wrap your main content in a <main> tag.',
    });
  }

  // Check heading hierarchy
  const h1Count = doc.querySelectorAll('h1').length;

  if (h1Count === 0) {
    findings.push({
      category: 'accessibility',
      priority: 'high',
      title: 'Missing H1 heading',
      description: 'Every page should have exactly one <h1> tag.',
      recommendation: 'Add a single H1 heading as the main page title.',
    });
  } else if (h1Count > 1) {
    findings.push({
      category: 'accessibility',
      priority: 'medium',
      title: 'Multiple H1 headings',
      description: `Page has ${h1Count} H1 tags. Best practice is one H1 per page.`,
      recommendation: 'Use only one H1 per page; use H2–H6 for hierarchy.',
    });
  }

  // Check for images without alt text
  const imagesNoAlt = doc.querySelectorAll('img:not([alt])');
  if (imagesNoAlt.length > 0) {
    findings.push({
      category: 'accessibility',
      priority: 'high',
      title: `${imagesNoAlt.length} images missing alt text`,
      description: 'Screen reader users cannot understand images without alt text.',
      recommendation: 'Add descriptive alt text to all images.',
    });
  }

  // Check for form inputs without labels
  const formInputs = doc.querySelectorAll('input:not([type="hidden"]), textarea, select');
  let unlabelledCount = 0;

  formInputs.forEach((input) => {
    const id = input.id;
    const hasAriaLabel = input.hasAttribute('aria-label');
    const hasLabel = id ? doc.querySelector(`label[for="${id}"]`) : false;

    if (!hasAriaLabel && !hasLabel) {
      unlabelledCount++;
    }
  });

  if (unlabelledCount > 0) {
    findings.push({
      category: 'accessibility',
      priority: 'high',
      title: `${unlabelledCount} form field(s) without label`,
      description: 'Form inputs must be associated with labels.',
      recommendation: 'Use <label> tags with for attributes or aria-label attributes.',
    });
  }

  return findings;
}

/* ============================================================
   Security Analysis
   ============================================================ */

function analyseSecurity(doc: Document, html: string): HealthCheckFinding[] {
  const findings: HealthCheckFinding[] = [];

  // Check for mixed content (http resources in https page)
  // This is a basic check; real audit requires more analysis
  const httpReferences = (html.match(/src="http:\/\/|href="http:\/\//gi) || []).length;
  if (httpReferences > 0) {
    findings.push({
      category: 'security',
      priority: 'high',
      title: 'Mixed content detected',
      description: `Found ${httpReferences} non-HTTPS resource(s). Browsers may block these.`,
      recommendation: 'Use HTTPS URLs for all external resources.',
    });
  }

  // Check for basic CSP headers (can't check actual headers from client-side fetch)
  // This is informational; real CSP checking requires server inspection
  findings.push({
    category: 'security',
    priority: 'medium',
    title: 'Security headers not verified',
    description: 'This tool cannot fully verify security headers (CSP, HSTS, X-Frame-Options, etc.) from the browser.',
    recommendation: 'Use a security audit tool or contact Teesside Digital for a full security assessment.',
  });

  // Check for unencrypted forms
  const forms = doc.querySelectorAll('form');
  forms.forEach((form) => {
    const method = form.getAttribute('method')?.toUpperCase() || 'GET';
    const action = form.getAttribute('action') || '';

    // If form uses POST but action is http:// it's a problem
    if (method === 'POST' && action.startsWith('http://')) {
      findings.push({
        category: 'security',
        priority: 'critical',
        title: 'Unencrypted form submission',
        description: 'A form submits to an unencrypted HTTP endpoint.',
        recommendation: 'Change form action to HTTPS or use a secure form service.',
      });
    }
  });

  // General security recommendation
  if (findings.filter((f) => f.category === 'security').length < 2) {
    findings.push({
      category: 'security',
      priority: 'low',
      title: 'Consider a professional security audit',
      description: 'This automated check is basic and informational. Real security assessment requires expert review.',
      recommendation: 'Contact Teesside Digital for a thorough security assessment.',
    });
  }

  return findings;
}

/* ============================================================
   SEO Analysis
   ============================================================ */

function analyseSEO(doc: Document): HealthCheckFinding[] {
  const findings: HealthCheckFinding[] = [];

  // Check for meta description
  const metaDescription = doc.querySelector('meta[name="description"]');
  if (!metaDescription || !metaDescription.hasAttribute('content')) {
    findings.push({
      category: 'seo',
      priority: 'high',
      title: 'Missing meta description',
      description: 'No meta description tag found.',
      recommendation: 'Add a meta description (150-160 characters) to improve click-through from search results.',
    });
  }

  // Check for Open Graph tags (not critical, but good for social)
  const ogTitle = doc.querySelector('meta[property="og:title"]');
  if (!ogTitle) {
    findings.push({
      category: 'seo',
      priority: 'low',
      title: 'Missing Open Graph tags',
      description: 'No Open Graph metadata found for social sharing.',
      recommendation: 'Add og:title, og:description, and og:image for better social media previews.',
    });
  }

  // Check for structured data (schema.org)
  const ldJsonScripts = doc.querySelectorAll('script[type="application/ld+json"]');
  if (ldJsonScripts.length === 0) {
    findings.push({
      category: 'seo',
      priority: 'medium',
      title: 'No structured data (schema.org)',
      description: 'Structured data helps search engines understand your content.',
      recommendation: 'Add structured data (JSON-LD) for your business, products, or articles.',
    });
  }

  // Check for readable headings
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
  if (headings.length < 2) {
    findings.push({
      category: 'seo',
      priority: 'medium',
      title: 'Few headings on page',
      description: 'Good SEO uses a clear heading hierarchy.',
      recommendation: 'Organise content with multiple headings (H1, H2, H3) to improve structure and SEO.',
    });
  }

  // Check viewport meta tag
  const viewport = doc.querySelector('meta[name="viewport"]');
  if (!viewport) {
    findings.push({
      category: 'seo',
      priority: 'high',
      title: 'Missing viewport meta tag',
      description: 'Mobile responsiveness requires the viewport meta tag.',
      recommendation: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> to <head>.',
    });
  }

  return findings;
}

/* ============================================================
   Scoring
   ============================================================ */

function calculateScores(findings: HealthCheckFinding[]): HealthCheckScore {
  const categories = {
    performance: 100,
    accessibility: 100,
    security: 100,
    seo: 100,
  };

  // Deduct points based on finding priority
  findings.forEach((finding) => {
    const deduction = {
      critical: 25,
      high: 15,
      medium: 10,
      low: 5,
    }[finding.priority];

    categories[finding.category] = Math.max(0, categories[finding.category] - deduction);
  });

  const overall = Math.round((categories.performance + categories.accessibility + categories.security + categories.seo) / 4);

  return {
    performance: Math.round(categories.performance),
    accessibility: Math.round(categories.accessibility),
    security: Math.round(categories.security),
    seo: Math.round(categories.seo),
    overall,
  };
}

/* ============================================================
   Helpers
   ============================================================ */

/**
 * Sort findings by priority (critical first, low last)
 */
function sortFindings(findings: HealthCheckFinding[]): HealthCheckFinding[] {
  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  return findings.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}
