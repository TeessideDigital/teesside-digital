# AGENTS.md
## Teesside Digital V2 - Agent Instructions

This repository contains the production Teesside Digital website and an active V2 redesign.

V2 work is developed on the `redesign/v2` branch.

The V1 production baseline is preserved by:

- `main`
- the `v1.0` tag

The existing implementation is a valid engineering baseline, not an untouchable design specification.

---

## 1. Read First

Before substantial work, read the relevant project documentation.

Primary documents:

1. `V2_MASTER_BRIEF.md`
2. `docs/v2/README.md`
3. the approved V2 phase document relevant to the task
4. `ARCHITECTURE.md`
5. `PLAN.md`
6. existing implementation

The user's latest explicit instruction always takes precedence.

`PLAN.md` primarily represents V1 historical intent. Do not allow an old V1 design decision to silently override an approved V2 decision.

If a V2 requirement conflicts with correctness, security, accessibility or maintainability, surface the conflict explicitly and recommend the safer approach.

---

## 2. Project Goal

Teesside Digital V2 is not a cosmetic reskin.

The redesign may improve:

- positioning
- messaging
- credibility
- information architecture
- visual identity
- UX
- conversion
- responsive design
- accessibility
- performance
- technical execution

Preserve strong engineering foundations.

Challenge weak product, content and design decisions.

Do not introduce technical churn merely because this is a redesign.

---

## 3. Work Phase-by-Phase

Follow the phases defined in `V2_MASTER_BRIEF.md`.

Do not execute the whole redesign in one pass.

During strategy and design phases:

- inspect the repository where useful
- analyse the current implementation
- produce documentation
- do not modify production code unless explicitly instructed

During implementation:

- work incrementally
- keep changes scoped
- validate after meaningful changes
- avoid large uncontrolled rewrites

Approved phase outputs belong under `docs/v2/`.

---

## 4. Before Editing Code

Before substantial changes:

1. Read the relevant approved V2 specification.
2. Inspect the current implementation.
3. Understand dependencies and affected routes.
4. Classify relevant existing systems as:
   - KEEP
   - MODIFY
   - REPLACE
   - REMOVE
5. Check impact on:
   - correctness
   - security
   - accessibility
   - performance
   - responsive behaviour
   - SEO
   - forms
   - structured data
   - project credibility

Explain non-obvious implementation decisions.

---

## 5. Preferred Technical Direction

Preferred stack:

- Astro
- TypeScript
- Tailwind CSS and/or project CSS
- React islands only where justified
- Netlify
- GitHub

Astro remains the preferred framework.

Do not migrate to another framework without a clear technical reason and explicit approval.

Prefer:

- static or server-rendered HTML
- Astro components
- semantic HTML
- CSS
- native browser APIs
- progressive enhancement
- minimal client-side JavaScript

Treat JavaScript and third-party dependencies as costs that must justify themselves.

---

## 6. Engineering Priorities

Prioritise in this order:

1. correctness
2. security
3. accessibility
4. performance
5. maintainability
6. clarity
7. visual sophistication

Prefer readable code over clever code.

Avoid:

- premature abstraction
- unnecessary dependencies
- duplicated business data
- magic constants
- fragile DOM assumptions
- unnecessary hydration
- hidden side effects

Use TypeScript where it improves correctness and maintainability.

---

## 7. Git Safety

V2 work should remain on `redesign/v2` until approved for merge.

Before large or risky changes:

- run `git status`
- inspect existing uncommitted work
- preserve unrelated user changes

Do not use destructive Git operations unless explicitly requested.

Avoid:

- `git reset --hard`
- force-push
- branch deletion
- rewriting published history

Prefer small, coherent commits.

---

## 8. Validation

After meaningful implementation changes, run the relevant available checks.

At minimum where applicable:

- production build
- type checking
- linting if configured
- affected route inspection
- browser console inspection

Also verify relevant behaviour at multiple viewport sizes.

Do not knowingly leave:

- build failures
- type errors
- broken routes
- obvious accessibility regressions
- obvious mobile regressions

for a later cleanup pass.

---

## 9. Accessibility and Performance

Target WCAG 2.2 AA.

Preserve or improve:

- semantic HTML
- logical heading hierarchy
- keyboard navigation
- visible focus
- accessible names and labels
- useful validation messages
- colour contrast
- touch target sizes
- alt text
- screen-reader semantics
- reduced-motion support

Performance targets:

- LCP < 2.5s
- CLS < 0.1
- INP < 200ms

Target Lighthouse:

- Performance >= 90
- Accessibility >= 95
- Best Practices >= 95
- SEO >= 95

If a visual effect causes unacceptable accessibility, performance or mobile regressions, redesign the effect rather than accepting the regression.

---

## 10. Brand and Content

Use British English.

Teesside Digital is a solo consultancy.

Do not make it sound like a large agency.

Use:

- `I` when Dave is personally speaking or doing the work
- `Teesside Digital` for company-level statements
- `we` only where genuinely appropriate

Avoid generic AI/agency marketing language.

Do not fabricate:

- clients
- testimonials
- project outcomes
- metrics
- certifications
- qualifications
- security findings
- penetration tests
- completed project status

Demo work must remain clearly identified as demonstration work.

---

## 11. Visual Direction

Do not default to common AI-generated agency/SaaS patterns such as:

- repeated three-column card grids
- arbitrary bento layouts
- glowing gradient blobs
- generic glassmorphism
- fake terminals
- meaningless code backgrounds
- floating laptop mockups
- giant chrome 3D objects
- gratuitous WebGL
- endless marquees
- identical fade-up reveals on every section
- excessive rounded containers

These are not absolute bans, but any use requires a clear conceptual reason.

Distinctiveness should come from deliberate design decisions, not maximum visual effects.

---

## 12. Security-Sensitive Features

Treat all user input as untrusted.

For forms:

- validate server-side where applicable
- use client validation as a UX enhancement only
- avoid exposing secrets
- avoid unnecessary sensitive logging
- provide accessible error messages

For any feature that fetches user-supplied URLs, SSRF defence is mandatory.

Never implement a naive server-side proxy.

Security-related marketing claims must match actual capability.

---

## 13. Demo Repositories

Current standalone demonstration projects include:

- North East Joinery
- QuoteFlow

They remain separate repositories.

Do not move their source code into this repository merely for convenience.

The Teesside Digital site may present them honestly as demonstrations and link to live demos or source repositories where appropriate.

---

## 14. Documentation

Important V2 decisions must be written into repository documentation, not left only in chat history.

Use `docs/v2/README.md` as the documentation index.

Do not create empty phase files in advance.

Create a phase document when that phase produces approved decisions.

---

## 15. Final Standard

The finished V2 website should demonstrate:

- precision
- craftsmanship
- engineering discipline
- technical judgement
- clarity
- accessibility
- performance
- trust

The design should earn attention.

The engineering should earn trust.

The content should earn credibility.

The experience should earn the enquiry.
