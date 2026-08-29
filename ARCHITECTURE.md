# TEESSIDE DIGITAL — ARCHITECTURE DOCUMENT (PHASE 1)

**Status:** Phase 1 Launch Planning
**Last Updated:** 28 August 2026
**Deployment Target:** Netlify
**Primary Stack:** Astro 5, Tailwind CSS 4, React 18 (islands only)

---

## 1. PHILOSOPHY

This document describes the architecture for a solo-developer website that is production-ready *today* and extensible *tomorrow*. Every decision prioritises:

1. **Simplicity** — no premature abstractions
2. **Maintainability** — one person, full-stack responsibility
3. **Performance** — static generation where possible, minimal JavaScript
4. **Security** — sensible defaults, no shortcuts
5. **Phase 2 readiness** — structure that accommodates Supabase, Resend, etc. without rewriting core files

Where a choice trades off between "elegant architecture" and "one person can maintain this," solo maintainability wins.

---

## 2. FILE STRUCTURE

```
teesside-digital/
├── .github/
│   └── workflows/
│       └── build-deploy.yml          # Netlify deploy trigger (optional, see 5.2)
├── .gitignore
├── README.md
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml                   # Static, generated at build time
│   ├── fonts/
│   │   └── inter-*.woff2              # System fonts preferred; if needed, Inter subset only
│   └── images/
│       ├── hero/
│       ├── work/                      # Portfolio/case study images
│       ├── logos/
│       └── demo-mockups/              # Screenshots of demo projects (Phase 1)
├── src/
│   ├── config/
│   │   ├── constants.ts               # Site metadata, URLs, feature flags
│   │   └── navigation.ts              # Nav menu structure, links
│   ├── components/
│   │   ├── Astro/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Navigation.astro
│   │   │   ├── Hero.astro
│   │   │   ├── Section.astro          # Reusable section wrapper
│   │   │   ├── Card.astro
│   │   │   ├── Button.astro
│   │   │   ├── Breadcrumb.astro
│   │   │   ├── CaseStudyCard.astro
│   │   │   ├── SEO.astro              # Meta tags, structured data
│   │   │   └── Layout.astro           # Main page layout wrapper
│   │   └── React/
│   │       ├── HealthCheck.tsx        # Client-side health check tool
│   │       ├── HealthCheckForm.tsx    # Email capture at bottom
│   │       └── MobileMenu.tsx         # Mobile nav hamburger menu
│   ├── layouts/
│   │   ├── BaseLayout.astro           # Wraps all pages
│   │   ├── ServiceLayout.astro        # Services pages
│   │   └── WorkDetailLayout.astro     # Case study detail pages
│   ├── pages/
│   │   ├── index.astro                # Homepage
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── services/
│   │   │   ├── index.astro
│   │   │   ├── web-development.astro
│   │   │   ├── ai-automation.astro
│   │   │   └── cybersecurity.astro
│   │   ├── work/
│   │   │   ├── index.astro            # Portfolio grid
│   │   │   ├── [slug].astro           # Dynamic case study pages
│   │   │   ├── northeast-joinery.md   # Case study (Markdown frontmatter)
│   │   │   ├── quoteflow.md
│   │   │   └── siteguard.md
│   │   ├── privacy.astro
│   │   ├── accessibility.astro
│   │   └── 404.astro
│   ├── styles/
│   │   ├── globals.css                # Tailwind directives + custom CSS
│   │   └── animations.css             # Micro-interactions (if needed)
│   ├── lib/
│   │   ├── health-check.ts            # Health check logic (client-side)
│   │   ├── validation.ts              # Form validation
│   │   └── seo.ts                     # SEO helpers
│   └── data/
│       ├── work.ts                    # Work/case study metadata (Phase 1: manual; Phase 2: Supabase)
│       ├── services.ts                # Services data
│       └── testimonials.ts            # Testimonials (Phase 2, currently empty)
├── netlify.toml                        # Netlify configuration
└── .env.example                        # Environment variables (for reference, not committed)
```

---

## 3. COMPONENT BREAKDOWN

### 3.1 Astro Components (Server-side, static-friendly)

**Layout Components:**
- `BaseLayout.astro` — Wraps every page; includes Header, Footer, global meta tags
- `ServiceLayout.astro` — Service detail pages (inherits BaseLayout)
- `WorkDetailLayout.astro` — Case study detail pages (inherits BaseLayout)

**Shared Components:**
- `Header.astro` — Desktop/mobile aware; wraps Navigation + MobileMenu island
- `Navigation.astro` — Nav links (desktop)
- `Footer.astro` — Logo, quick links, contact, legal
- `Hero.astro` — Large section with background, headline, subheading, CTA
- `Section.astro` — Generic section wrapper (padding, max-width, optional background)
- `Card.astro` — Reusable card component (border, padding, shadow)
- `Button.astro` — Link or button with variant support (primary, secondary, outline)
- `Breadcrumb.astro` — Navigation breadcrumbs (for case studies)
- `CaseStudyCard.astro` — Portfolio grid card (image, title, tags, link)
- `SEO.astro` — Renders meta tags, Open Graph, structured data
- `MobileMenu.tsx` → wrapped in island for interactivity

**Why Astro for these?**
- All are static or minimally interactive
- No client-side state required
- Renders to plain HTML → better performance, simpler caching
- Netlify can cache these aggressively

### 3.2 React Islands (Client-side, interactive)

**HealthCheck.tsx**
- Accepts user URL input
- Runs client-side validation and analysis (no server requests)
- Displays scores + findings
- Lazy-loads only when section is in viewport

**HealthCheckForm.tsx**
- Appears below results
- Email input + optional message
- Submits to Netlify Forms
- Shows confirmation/error states
- Lazy-loaded after results render

**MobileMenu.tsx**
- Hamburger menu toggle
- Mobile navigation
- Closes on link click
- Lazy-loaded on mobile only

**Why React for these?**
- Require client-side state (toggle, form submission, input)
- Need real-time feedback (validation, loading states)
- Astro Islands keep bundle size minimal (only these 3 components hydrate)

**Why NOT React for everything:**
- Adds JavaScript overhead for static content
- Slower Time to Interactive
- Harder to cache aggressively
- Unnecessary complexity for a solo developer

---

## 4. DATA FLOW

### 4.1 Work/Case Study Data (Phase 1)

**Source:** Markdown files + frontmatter
```
src/pages/work/northeast-joinery.md
```

**Frontmatter structure:**
```yaml
---
title: "North East Joinery — Premium Local Business Website"
slug: "northeast-joinery"
client: "Demonstration Project"
date: "2026-08-01"
tags: ["Web Design", "E-commerce", "Local SEO"]
image: "/images/work/northeast-joinery-hero.jpg"
imageAlt: "North East Joinery website homepage mockup"
caseStudyType: "demonstration"
description: "A premium website for a local joinery business, showcasing portfolio, services, and online quotes."
results:
  - "5-page responsive design"
  - "Online quote request form"
  - "Local SEO optimisation"
challenge: "..."
solution: "..."
technologies: ["Astro", "Tailwind CSS", "Netlify Forms"]
---
```

**Runtime:** Astro collects all `.md` files from `src/pages/work/`, parses frontmatter, generates static pages at `/work/[slug]` and renders the portfolio grid at `/work`.

**Why Markdown?**
- Single source of truth (no database yet)
- Version-controlled in Git
- Easy to add/remove case studies
- Zero runtime overhead (builds to static HTML)
- Seamless Phase 2 migration: when you add Supabase, you query the DB instead, no template changes needed

**Phase 2 migration plan:**
- Add `src/lib/getWork.ts` that can switch between Markdown (Phase 1) and Supabase queries (Phase 2)
- Template files stay the same

### 4.2 Services Data (Phase 1)

**Source:** `src/data/services.ts`
```typescript
export const services = [
  {
    id: "web-development",
    title: "Web Development",
    description: "...",
    slug: "web-development",
    image: "/images/services/web-dev.jpg",
  },
  // ...
];
```

**Runtime:** Services pages query this object, render static pages + grid.

**Why not Markdown?**
- Services are shorter + less content than case studies
- Easier to manage as a single data file
- Phase 2: can stay as-is or migrate to Supabase (choice is yours)

---

### 4.3 Contact Form & Health Check Email Flow

**Contact Page Form (Netlify Forms):**

```html
<form name="contact" method="POST" netlify>
  <input type="email" name="email" required>
  <textarea name="message"></textarea>
  <!-- Netlify honeypot for spam prevention -->
  <input type="hidden" name="form-name" value="contact">
  <button type="submit">Send</button>
</form>
```

**Flow:**
1. User submits form
2. Netlify captures submission
3. Netlify sends email to `dave@teessidedigital.uk` (configured in Netlify UI)
4. Form data also appears in Netlify Forms dashboard
5. Dave manually reviews + replies

**Health Check Email (HealthCheckForm.tsx):**

```html
<form name="health-check-report" method="POST" netlify>
  <input type="email" name="email" required>
  <input type="hidden" name="url" value={userUrl}>
  <input type="hidden" name="report" value={JSON.stringify(scores)}>
  <button type="submit">Send Report</button>
</form>
```

**Flow:**
1. User runs Health Check
2. Sees results
3. Optionally enters email
4. Submits via Netlify Forms
5. Netlify emails dave@teessidedigital.uk
6. Email includes: user email, website URL, health check scores
7. Dave follows up manually

**Why Netlify Forms (not a backend)?**
- Zero backend code required
- Netlify handles SPAM filtering, honeypots
- Email delivered via Netlify's SMTP
- Submissions stored in Netlify dashboard (searchable)
- Phase 1 solo workflow: Dave checks Netlify dashboard + spreadsheet, replies manually
- Phase 2 upgrade: Add Supabase to store structured lead data, eventually integrate CRM

**Why not Gmail API directly?**
- Requires OAuth setup, token management, more complexity
- SSRF risk if server posts to Gmail
- Netlify Forms is safer + simpler for Phase 1

---

### 4.4 Email Configuration (dave@teessidedigital.uk)

**Setup steps (done once, before launch):**

1. **Netlify Dashboard:**
   - Site Settings → Forms → Set notification email to `dave@teessidedigital.uk`
   - Enable spam filtering, set abuse limits

2. **Gmail account:**
   - Receive Netlify emails normally
   - No additional auth/OAuth needed at launch
   - Dave uses Gmail interface to reply to customers

3. **Phase 2 (when automating):**
   - Configure Resend + API key
   - Set up automated email templates
   - Send "thank you" + "we'll review and contact you" replies

---

## 5. DEPLOYMENT STRATEGY

### 5.1 Netlify Configuration

**netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[dev]
  command = "npm run dev"
  port = 3000

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404

[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "SAMEORIGIN"
    X-XSS-Protection = "0"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=604800"

[[headers]]
  for = "/"
  [headers.values]
    Cache-Control = "public, max-age=3600"
```

**Why these decisions:**

- **Static file caching (31536000s = 1 year):** Astro hashes bundle outputs, so old hashes never collide. Safe to cache forever.
- **Image caching (604800s = 1 week):** Images can change; shorter TTL gives flexibility.
- **HTML caching (3600s = 1 hour):** Pages update; hourly refresh keeps data relatively fresh without hammering Netlify.
- **Security headers:** Blocks XSS, clickjacking, MIME sniffing. Disables geolocation/mic/camera.
- **X-XSS-Protection = "0":** Modern browsers ignore this; Netlify's built-in protection is better.

### 5.2 GitHub ↔ Netlify Integration

**Setup (one-time):**
1. Push repo to GitHub
2. Connect GitHub to Netlify (Netlify dashboard → integrations)
3. Select `TeessideDigital/teesside-digital` repo
4. Set build command: `npm run build`
5. Set publish directory: `dist`
6. Netlify automatically deploys on push to `main`

**Why no GitHub Actions (Phase 1)?**
- Netlify's native GitHub integration is sufficient
- Actions add complexity (CI/CD config, secrets management, debugging)
- Solo developer benefit: push to main, Netlify handles the rest
- Phase 2: Actions becomes useful when you add automated testing, security scanning, etc.

**Deployment workflow:**
```
Local: npm run build → git push main
GitHub: receives push
Netlify: detects push → rebuilds → deploys to CDN (automatic)
Result: live at teessidedigital.uk within 1-2 minutes
```

**Preview deploys:**
- Netlify automatically generates preview URLs for pull requests
- Useful for testing before merging (optional for solo dev, but good practice)

### 5.3 Environment Variables

**Phase 1 (minimal):**
```
# .env.example (committed to Git, no secrets)
SITE_URL=https://teessidedigital.uk
CONTACT_EMAIL=dave@teessidedigital.uk

# .env (NOT committed, local development only)
# Same as above; Netlify has no secrets to manage at launch
```

**Phase 2 (when adding integrations):**
```
SUPABASE_URL=...
SUPABASE_KEY=...
RESEND_API_KEY=...
SENTRY_DSN=...
```

These go in Netlify Environment Variables (dashboard), not in `.env`.

---

## 6. BUILD & DEVELOPMENT WORKFLOW

### 6.1 Local Development

```bash
# Install
npm install

# Dev server (hot reload)
npm run dev
# Opens http://localhost:3000

# Build (test production build locally)
npm run build
npm run preview

# Format, lint (if added later)
npm run format
npm run lint
```

### 6.2 Package.json Scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "astro": "^5.x",
    "react": "^18.x",
    "react-dom": "^18.x",
    "tailwindcss": "^4.x"
  },
  "devDependencies": {
    "@types/react": "^18.x",
    "typescript": "^5.x",
    "prettier": "latest"
  }
}
```

### 6.3 Development Workflow (Solo)

**Daily:**
1. Pull from `main`
2. `npm run dev` (local testing)
3. Make changes (components, content, styles)
4. Browser auto-reloads (Astro hot module reload)
5. Review locally at http://localhost:3000

**Before pushing:**
1. `npm run build` — test production build
2. `npm run preview` — test production output locally
3. Check for console errors, broken links
4. `npm run type-check` — verify TypeScript
5. `git add`, `git commit`, `git push main`

**After push:**
1. Netlify automatically builds + deploys
2. Check Netlify dashboard for build logs
3. Visit live site, spot-check key pages
4. Keep Netlify notifications on Slack (optional, Phase 2)

---

## 7. SECURITY CONSIDERATIONS

### 7.1 Phase 1 (Launch)

**XSS Prevention:**
- Astro auto-escapes all template expressions
- React components use JSX, which auto-escapes by default
- No `dangerouslySetInnerHTML` or eval

**CSRF Prevention:**
- Netlify Forms includes CSRF tokens automatically
- No custom form handling needed

**SSRF Prevention (Health Check):**
- Health Check runs entirely client-side
- Browser's CORS policy prevents cross-origin requests
- No server proxy = no SSRF surface
- Health Check data never leaves the user's browser (optional: user submits email + results, but no server-side requests to arbitrary URLs)

**Secrets:**
- No API keys in client code
- No secrets committed to Git
- Netlify environment variables (Phase 2) stored securely

**Dependencies:**
- Keep Astro, React, Tailwind updated
- `npm audit` before each release
- Consider Dependabot (GitHub) for automated PRs (Phase 2)

### 7.2 Phase 2 Considerations

When adding Supabase, Resend, Sentry:
- Store API keys in Netlify Environment Variables only
- Use environment-specific keys (dev, staging, production)
- Implement rate limiting on form submissions
- Add request validation on any backend functions

---

## 8. PERFORMANCE TARGETS

### 8.1 Lighthouse Goals (Phase 1)

- **Performance:** 85+
- **Accessibility:** 95+
- **Best Practices:** 90+
- **SEO:** 95+

**Why 85 for Performance, not 95?**
- Real-world constraints (third-party fonts, images, etc.)
- 85 is "very good" in real user terms
- Pursuing 95+ often means over-optimisation with diminishing returns

### 8.2 Core Web Vitals Targets

- **LCP (Largest Contentful Paint):** < 2.5s
- **INP (Interaction to Next Paint):** < 200ms (replaces FID)
- **CLS (Cumulative Layout Shift):** < 0.1

### 8.3 Optimisations Built In

- Static generation (HTML pre-rendered)
- Astro ships zero JavaScript by default (islands only)
- Tailwind purges unused CSS
- Images optimised (Astro Image component)
- Fonts: system stack preferred, subset if needed
- Caching headers (see Section 5.1)
- CDN delivery via Netlify

---

## 9. ACCESSIBILITY (WCAG 2.2 AA)

### 9.1 HTML Semantics

- Proper heading hierarchy (h1, h2, h3)
- Semantic elements (`<nav>`, `<main>`, `<article>`, `<footer>`)
- Form labels associated with inputs (`<label for="...">`)
- Alt text on all images
- ARIA labels where needed (e.g., hamburger menu)

### 9.2 Keyboard Navigation

- All interactive elements keyboard-accessible
- Tab order logical and visible
- Focus indicators visible (Tailwind's `focus:` utilities)
- No keyboard traps

### 9.3 Colour Contrast

- Text primary (`#f0f0f0`) on background (`#0a0a0a`): 15.7:1 ✓
- Accent (`#5b7f9e`) on background: 4.5:1 ✓
- Tested with WebAIM contrast checker before launch

### 9.4 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Apply to any animations (health check, mobile menu, etc.)

### 9.5 Screen Reader Testing

- Test with NVDA (Windows) or VoiceOver (macOS/iOS)
- Ensure all content is announced
- Skip navigation link to main content
- Form errors announced clearly

---

## 10. SEO

### 10.1 On-Page

- Unique titles (50-60 chars): home, services, work pages, case studies
- Meta descriptions (150-160 chars) on all pages
- Canonical URLs (Astro handles automatically)
- Proper heading hierarchy
- Internal linking between related content
- Alt text on images (descriptive, not keyword-stuffed)
- Structured data (schema.org) for:
  - Organisation (homepage)
  - BreadcrumbList (case studies)
  - LocalBusiness (Hartlepool/North East)
  - Article (case studies)

### 10.2 Technical SEO

- `robots.txt` (generated at build time)
- `sitemap.xml` (generated at build time)
- Mobile-responsive (Astro grid-aware)
- HTTPS only (Netlify enforces)
- Fast load times (Core Web Vitals)
- No duplicate content
- XML sitemaps in GSC/Bing

### 10.3 Local SEO (Phase 1)

- Service pages mention: Teesside, Hartlepool, North East, UK
- Contact page has: address, phone, email, map (Phase 2)
- Schema markup for LocalBusiness
- Google Business Profile (Phase 2)

### 10.4 Link Building (Phase 2)

- Case study pages have internal links to service pages
- Service pages link to relevant case studies
- Footer links to key pages
- "Related" section on case studies (Phase 2)

---

## 11. PHASE 1 vs PHASE 2

### Phase 1 (Launch) — In Scope

✓ Static site: Astro
✓ Design system: Tailwind + custom CSS
✓ Pages: Home, Services, About, Contact, Work, Case Studies
✓ Health Check tool: React island (client-side only)
✓ Forms: Netlify Forms (contact, health check email)
✓ Email: dave@teessidedigital.uk (manual follow-up)
✓ Case studies: Markdown + frontmatter (3 demo projects with mockups)
✓ Deployment: Netlify
✓ Security headers, accessibility, SEO fundamentals
✓ Lighthouse 85+, WCAG AA, Core Web Vitals

### Phase 2 (When Justified) — Out of Scope

✗ Database: Supabase (add when >50 leads/month)
✗ Bulk email: Resend (add when automating follow-up)
✗ Analytics: Fathom (add when optimising traffic)
✗ Error tracking: Sentry (add if errors become frequent)
✗ Server-side health check audit (add with proper SSRF mitigations)
✗ Live demo projects (build after portfolio is live)
✗ Client portal, project management, automations

**Why this cutoff?**
- Phase 1 is launchable and maintainable by one person
- Each Phase 2 addition solves a real problem (volume, time spent, etc.)
- Structure allows seamless upgrades without rewriting core files

---

## 12. EXTENSIBILITY CHECKLIST

### When Adding Supabase (Phase 2)

- [ ] Create `src/lib/db.ts` (Supabase client)
- [ ] Update `src/data/work.ts` to query DB instead of Markdown
- [ ] Migrate case study data: Markdown → Supabase JSON
- [ ] Update case study detail page to query by slug
- [ ] No template changes needed (thanks to abstraction)
- [ ] Add `.env` variables: `SUPABASE_URL`, `SUPABASE_KEY`

### When Adding Resend (Phase 2)

- [ ] Create serverless function: `functions/send-email.ts`
- [ ] Deploy to Netlify Functions
- [ ] Add form submission endpoint
- [ ] Update HealthCheckForm.tsx to post to endpoint (not Netlify Forms)
- [ ] Email templates in Resend dashboard
- [ ] Automated replies + Dave's custom follow-ups

### When Adding Fathom (Phase 2)

- [ ] Add Fathom script to `BaseLayout.astro`
- [ ] Configure tracking in Fathom dashboard
- [ ] Set goals: form submissions, CTA clicks, page views
- [ ] No code changes needed (script-based)

### When Adding Sentry (Phase 2)

- [ ] Create `src/lib/sentry.ts` (Sentry client)
- [ ] Add to React islands + Astro middleware
- [ ] Configure in `.env`: `SENTRY_DSN`
- [ ] Deploy and monitor errors

---

## 13. DEPLOYMENT CHECKLIST (Pre-Launch)

- [ ] DNS pointed to Netlify (A record or CNAME)
- [ ] HTTPS enabled (automatic on Netlify)
- [ ] Netlify Forms configured, notifications to dave@teessidedigital.uk
- [ ] Lighthouse audited (85+, AA, 90+, 95+)
- [ ] Accessibility audit passed (NVDA/VoiceOver tested)
- [ ] Security headers verified (no console errors)
- [ ] Mobile responsiveness tested (320px to 1920px)
- [ ] Forms tested (contact, health check)
- [ ] Links checked (internal, external, 404s)
- [ ] robots.txt and sitemap.xml verified
- [ ] Google Search Console setup (Phase 1: basic, Phase 2: advanced)
- [ ] Backup of content + assets (Git is your backup)
- [ ] `.env.example` committed, `.env` gitignored

---

## 14. MAINTENANCE & MONITORING (Phase 1)

### Daily/Weekly

- Check Netlify build logs (automatic, but skim if anything looks odd)
- Review Netlify Forms dashboard for new submissions
- Reply to leads manually via email
- Update spreadsheet with lead info

### Monthly

- Check Lighthouse scores (regression testing)
- Review 404 errors (broken links, search queries)
- Update dependencies: `npm outdated`, then selective `npm update`
- Check Core Web Vitals in GSC

### Quarterly

- Full accessibility audit (redo WCAG checklist)
- Security audit (check OWASP top 10, run `npm audit`)
- SEO audit (rankings, traffic, backlinks)
- Update case studies or add new content

---

## 15. TROUBLESHOOTING REFERENCE

### Build fails locally

```bash
# Clear cache and reinstall
rm -rf node_modules dist
npm install
npm run build
```

### Netlify deploy fails

- Check build logs in Netlify dashboard
- Common: Node version mismatch (Netlify uses Node 18 by default; check `netlify.toml`)
- Re-trigger deploy: push empty commit (`git commit --allow-empty -m "Rebuild"`)

### Images not displaying

- Verify path relative to `public/` (e.g., `/images/work/northeast-joinery.jpg`)
- Check alt text in Markdown frontmatter
- Run Astro build, check `dist/` for image copies

### Lighthouse score drops

- Run locally: `npm run build && npm run preview`
- Check Core Web Vitals in Chrome DevTools
- Common: third-party script, large image, slow font load
- Use Lighthouse trace to identify culprit

### Form emails not arriving

- Check Netlify Forms dashboard (submission visible?)
- Check spam folder in Gmail
- Verify notification email in Netlify settings
- Test with Netlify's form testing tool

---

**End of Architecture Document**
