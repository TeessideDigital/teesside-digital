# Teesside Digital — Claude Code Project Instructions

## Read before changing anything

This repository is an in-progress redesign of Teesside Digital. The V2.1 build is being moved onto the V2.2 visual direction, approved by Dave on 13 October 2026.

Before the first implementation task, read:

1. `docs/handover/CURRENT-STATE.md`
2. `docs/handover/HANDOVER-CODEX.md`
3. `docs/handover/HANDOVER-CHATGPT.md`
4. the relevant current source files
5. `docs/v2/phase-0-decisions.md`
6. `docs/v2/content-system.md`
7. `docs/v2/experience-architecture.md`
8. `docs/v2/decisions/2026-10-13-visual-direction.md`, the current visual direction
9. approved visual references if present under `docs/v2/references/`

Always inspect Git before editing:

```bash
git branch --show-current
git status --short
git rev-parse HEAD
git log --oneline --decorate -12
git diff
```

Expected working branch:

`redesign/v2`

The approved pre-Claude product checkpoint is tagged:

`pre-claude-handover-2026-10-05`

Do not push, merge, rebase, reset, amend, deploy or change branches unless Dave explicitly asks.

Do not discard uncommitted work.

---

## Authority order

When information conflicts, use this precedence:

1. Actual current repository source and Git state.
2. `docs/handover/CURRENT-STATE.md`.
3. Explicitly approved later implementation/design decisions, including the decision records in `docs/v2/decisions/`.
4. `docs/handover/HANDOVER-CODEX.md` for repository/implementation history.
5. `docs/handover/HANDOVER-CHATGPT.md` for broader project, product and design history.
6. Latest approved V2/V2.1 documents. Where they describe the irregular-grid composition, the V2.2 decision record overrides them.
7. Older planning documents.
8. V1 source and historical plans.

Legacy code remaining in the repository is not proof that its V1 behaviour or content is still approved.

If two authoritative sources materially conflict, stop and explain the conflict to Dave before changing code.

---

## Business truth

Business: Teesside Digital.

Founder/operator: Dave.

Location: Hartlepool / Teesside.

Initial audience: small and owner-led businesses across Teesside, then the wider North East, then UK-wide where appropriate.

Teesside Digital is a solo technical consultancy. Never imply a large agency or team.

The three approved service families are exactly:

1. Websites & Web Development
2. Apps & Digital Tools
3. Automation & AI

Security, accessibility, performance and maintainability are engineering disciplines, not equivalent top-level service pillars.

Do not restore Cybersecurity as a broad standalone service.

Do not force AI into solutions where ordinary automation, configuration or a simpler change is more appropriate.

---

## Core conversion model

Primary action:

`Discuss your project` -> `/contact/`

Secondary action:

`Free website review` -> `/website-review/`

The website review is a manual, bounded review performed by Dave.

It is not an automated scanner or instant score.

Work/portfolio remains withheld until real evidence passes the approved evidence gate.

Never invent:

- clients;
- testimonials;
- logos;
- screenshots;
- completed projects;
- case-study results;
- commercial outcomes;
- performance claims;
- security findings.

---

## Design authority

The current visual direction is V2.2, recorded in:

`docs/v2/decisions/2026-10-13-visual-direction.md`

It retires the irregular-grid "Structural Datum" composition by Dave's decision. `docs/v2/creative-direction.md` and `docs/v2/hero-spec.md` remain as history only.

Visual character:

- bold but restrained;
- high end;
- calm;
- precise;
- grounded.

Never use neon, glows, pulsing effects or a grid texture.

Typefaces, all self-hosted:

- `Instrument Serif` for headings;
- `Instrument Sans` for body text and interface;
- `IBM Plex Mono` for small uppercase labels.

Colour:

- tokens live in `src/styles/tokens.css`, with the names in the decision record;
- amber is the accent and is for actions only: primary buttons, link arrows, the current page and focus;
- some sections use an inverse band, at most one or two per page.

Layout:

- content is capped at 1200px inside the area beside the rail;
- a regular 12-column grid with a 24px gap;
- no stagger: grouped items share starts and ends;
- verify at 320, 390, 768, 1024, 1440, 1920, 2560 and 3440 wide, in both themes.

Shell:

- a 240px desktop left rail;
- a mobile header with a menu button, which must work without JavaScript and by keyboard;
- a mobile sticky action bar, except on Contact and the website review;
- phone features render only when `SITE.phone` is set. It stays empty until the dedicated business line exists.

Dark is the default theme.

Light is an explicit persisted option, not simply an OS inversion.

Theme controls remain explicit accessible Dark / Light radio choices.

Shared components and classes live in `src/components/system/` and `src/styles/system.css`. Use them before writing page-specific styles.

Product visuals are drawn in HTML and CSS, hidden from assistive technology, and use neutral example content.

Never introduce decorative:

- coordinates;
- fictional diagnostics;
- HUD elements;
- terminals;
- dashboards;
- fake technical metadata;
- statistics that cannot be backed up.

Do not reintroduce generic:

- SaaS heroes;
- glowing borders;
- gradient blobs;
- stock photography or generated images in place of real photographs.

Photographs are real ones taken by Dave. Until they exist, their slots stay hidden. Never show a placeholder on a live page.

---

## Static-first engineering

Astro/static-first is deliberate.

Do not introduce framework hydration for normal content.

Prefer:

- Astro;
- semantic HTML;
- CSS;
- small TypeScript progressive-enhancement scripts;
- browser-native APIs.

Do not add React, Vue, Svelte or an animation library for something that does not require it.

Required content must exist and remain usable when JavaScript is unavailable.

Make no third-party requests. Fonts and scripts are self-hosted, and the Privacy page says so.

Base document state must be the complete visible state.

Motion enhancement may temporarily establish pre-animation state only after successful enhancement initialisation.

---

## Motion

The committed motion system is the authority: its tokens, the Web Animations API, one IntersectionObserver per route and once-only entrances.

Do not invent another motion language.

Use the existing shared timing/easing vocabulary.

Motion is restrained, once-only and structural.

No:

- scroll-jacking;
- continuous scroll animation loops;
- parallax system;
- pointer tracking;
- custom cursors;
- loading sequences;
- universal fade-up;
- letter-by-letter hero animation;
- cinematic route transitions;
- animation dependency.

Reduced motion must render the final state immediately.

JavaScript failure must leave complete readable content.

---

## Content style

Use British English.

Use ASCII punctuation in production copy unless there is a specific reason otherwise.

Write clearly and specifically.

Avoid generic agency and AI language including:

- unlock;
- revolutionise;
- transform your business;
- supercharge;
- future-ready;
- digital solutions;
- cutting-edge.

Use `Teesside Digital` for company-level statements.

Write about Dave in the third person site-wide. Use `David Young` only on legal pages.

Do not use fake team language.

Do not claim:

- fully accessible;
- no vulnerabilities;
- guaranteed security;
- guaranteed performance;
- guaranteed business growth;
- guaranteed savings;
- completed qualifications that are still in progress.

---

## Scope discipline

Do not refactor unrelated code during a route task.

Do not modify Home while implementing About unless a demonstrated shared-system defect requires it.

Do not modify Services while implementing Contact unless required by an approved shared primitive.

Do not globally reformat the repository as incidental cleanup.

Do not perform dependency-major upgrades during visual implementation unless that upgrade is the explicit task.

Do not add routes, services, content or features simply to make the site appear larger.

---

## Review process

For major visual route work:

1. inspect current implementation;
2. preserve approved content;
3. build static composition first;
4. run technical verification;
5. generate visual review evidence;
6. wait for Dave's visual approval;
7. commit static implementation;
8. implement motion separately where required;
9. review motion;
10. commit motion.

Do not combine static redesign and motion unless Dave explicitly asks.

---

## Verification baseline

At minimum, relevant implementation work should run:

```bash
npm run check
npm run type-check
npm run build
git diff --check
```

Also verify as relevant:

- Dark theme;
- Light theme;
- 1440px;
- 390px;
- 320px;
- short landscape viewport;
- simulated 200% text;
- keyboard operation;
- visible focus;
- forced colours;
- JavaScript disabled;
- reduced motion;
- logical DOM/source order;
- no horizontal document overflow.

For motion work also verify:

- fast scrolling;
- entrances run once;
- failed enhancement leaves final content visible;
- reduced-motion preference changes resolve safely;
- no unexpected CLS;
- no continuous observers/listeners after their job is finished.

Browser automation does not equal real-device or full screen-reader certification. State verification limits accurately.

---

## Git discipline

Before a task:

```bash
git status --short
git rev-parse HEAD
```

After a task:

```bash
git status --short
git diff
git diff --check
```

Never stage or commit unrelated files.

Do not commit until Dave approves the relevant implementation/review state unless Dave explicitly authorises autonomous committing.

Never push without explicit approval.

---

## Current implementation checkpoint

Always check Git and `docs/handover/CURRENT-STATE.md` first; this section is a summary and may be behind.

At the V2.2 decision, the product baseline was:

`41af0e2f4319942b0a32eada0864686fe1a17866`

`feat: build V2.1 accessibility, terms and 404 pages`

The V2.2 work is phased:

- 11A: design foundation, shell, and Contact, website review, Privacy, Terms, Accessibility and 404 moved onto the system;
- 11B: Home rebuilt;
- 11C: Services and About rebuilt;
- later: a content proposal (price guide, care plan, "how it works", FAQ) and real photographs.

Until 11B and 11C, Home, Services and About are interim pages. Do not restyle them outside their own phase.

Each phase needs its own brief from Dave. Do not start one without it.

---

## First-session rule

On the first Claude Code session for this repository:

DO NOT EDIT FILES.

First reconcile:

- Git state;
- current source;
- `CURRENT-STATE.md`;
- both handovers;
- approved V2 documentation;
- approved visual references if present.

Report:

- branch;
- HEAD;
- working-tree state;
- most recent completed implementation;
- any discrepancies between handovers and repository;
- current route count;
- legacy routes still present;
- exact next task according to the current state.

Wait for Dave's approval before editing.
