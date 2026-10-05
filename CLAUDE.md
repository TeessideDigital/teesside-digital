# Teesside Digital — Claude Code Project Instructions

## Read before changing anything

This repository is an in-progress V2.1 redesign of Teesside Digital.

Before the first implementation task, read:

1. `docs/handover/CURRENT-STATE.md`
2. `docs/handover/HANDOVER-CODEX.md`
3. `docs/handover/HANDOVER-CHATGPT.md`
4. the relevant current source files
5. `docs/v2/phase-0-decisions.md`
6. `docs/v2/content-system.md`
7. `docs/v2/experience-architecture.md`
8. the latest V2/V2.1 visual/design specification available in `docs/v2/`
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
3. Explicitly approved later V2.1 implementation/design decisions.
4. `docs/handover/HANDOVER-CODEX.md` for repository/implementation history.
5. `docs/handover/HANDOVER-CHATGPT.md` for broader project, product and design history.
6. Latest approved V2/V2.1 documents.
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

The central V2.1 creative concept is the Structural Datum.

The desktop SiteIndex is an architectural datum, not merely a sidebar.

The experience should feel closer to an architectural publication, infrastructure monograph or carefully art-directed technical journal than a SaaS template or generic agency site.

Visual character:

- quietly formidable;
- editorial;
- engineered;
- asymmetric;
- atmospheric;
- precise;
- calm;
- grounded.

Do not imitate engineering software.

Never introduce decorative:

- coordinates;
- fictional diagnostics;
- HUD elements;
- terminals;
- dashboards;
- service numbering;
- fake technical metadata.

Do not reintroduce generic:

- card grids;
- bento layouts;
- SaaS heroes;
- glowing borders;
- gradient blobs;
- generic CTA button rows;
- equal three-column services;
- generic mobile hamburger navigation.

Typeface:

`Instrument Sans`

Desktop SiteIndex target is approximately 240px.

Desktop main field uses an irregular 12-column editorial grid.

Mobile uses a 4-column editorial grid.

Dark is the default theme.

Light is an explicit persisted option, not simply an OS inversion.

Theme controls remain explicit accessible Dark / Light radio choices.

No hamburger is approved for the current navigation architecture.

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

Base document state must be the complete visible state.

Motion enhancement may temporarily establish pre-animation state only after successful enhancement initialisation.

---

## Motion

The existing Home/Services motion system is the authority.

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

Use `Dave` / `I` where personal responsibility is relevant.

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

At migration time, the approved product baseline was:

`d72a55dc6d2c81c88b15a3b2c2a019a3c1fecad4`

`feat: build V2.1 about experience`

Home:
- static complete;
- motion complete;
- do not redesign.

Services:
- static complete;
- motion complete;
- do not redesign.

About:
- static complete and visually approved;
- motion not yet implemented at the migration checkpoint.

The immediate next implementation after reconciliation is expected to be:

`Implementation 7B — About motion`

Do not assume this is still current without checking Git and `docs/handover/CURRENT-STATE.md`.

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
