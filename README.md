# Teesside Digital V2 Documentation

This directory contains the approved strategy, design, UX and implementation decisions for the Teesside Digital V2 redesign.

Do not create every document in advance.

Each file should be added when its phase has produced meaningful, reviewed decisions.

---

## Source of Truth

Use this order when project documents conflict:

1. The user's latest explicit instruction
2. `/V2_MASTER_BRIEF.md`
3. `/AGENTS.md`
4. Approved documents in this directory
5. `/ARCHITECTURE.md`
6. `/PLAN.md`
7. Existing implementation

`PLAN.md` is primarily V1 historical context.

---

## V2 Phase Documents

### Phase 0 - Business, Positioning and Current-Site Audit

Planned file:

`phase-0-audit.md`

Should contain:

- current-state assessment
- strongest assets worth preserving
- weakest areas
- credibility risks
- positioning problems
- service strategy
- UX issues
- design issues
- engineering issues
- content issues
- recommended target customer
- recommended primary conversion objective
- recommended positioning
- KEEP / MODIFY / REPLACE / REMOVE matrix
- unresolved decisions before creative direction

No redesign implementation should begin during this phase.

---

### Phase 1 - Creative Direction

Planned file:

`creative-direction.md`

Should contain the approved visual and experiential territory, including:

- central concept
- visual narrative
- emotional goal
- typography direction
- colour direction
- composition
- grid
- imagery
- materials
- lighting
- texture
- depth
- UI treatment
- motion philosophy
- interaction philosophy
- mobile interpretation
- commercial risks
- implementation risks

The selected direction should follow comparison of multiple genuinely different creative territories.

---

### Phase 2 - Content and Messaging

Planned file:

`content-system.md`

Should contain:

- core proposition
- supporting proposition
- homepage messaging
- service positioning
- CTA language
- proof messaging
- founder narrative
- process language
- case-study language
- navigation labels
- footer messaging
- microcopy principles
- page-level content architecture

Copy should remain direct, credible and free of generic agency/AI language.

---

### Phase 3 - Experience Architecture

Planned file:

`experience-architecture.md`

Should contain:

- sitemap
- navigation model
- homepage narrative
- section-by-section purpose
- service architecture
- work/case-study architecture
- about page
- contact experience
- legal/accessibility pages
- interactive showcase strategy
- CTA progression
- responsive considerations
- accessibility considerations

Every major section should have a defined purpose and conversion role.

---

### Phase 4 - Signature Hero

Planned file:

`hero-spec.md`

Should contain:

- central idea
- composition
- headline
- supporting copy
- CTA
- visual scene
- typography
- hierarchy
- materials
- lighting
- depth
- entrance sequence
- pointer behaviour
- scroll transition
- mobile adaptation
- reduced-motion adaptation
- performance budget

The hero should be specific enough to implement without guessing.

---

### Phase 5 - Motion and Interaction

Planned file:

`motion-system.md`

Should contain:

- motion principles
- page-entry behaviour
- navigation behaviour
- hero motion
- section transitions
- typography reveals
- project interactions
- service interactions
- controls and button feedback
- pointer behaviour where justified
- form feedback
- reduced-motion behaviour
- durations
- easing
- choreography
- mobile exceptions
- performance budget

Every animation should have a clear purpose.

---

### Phase 6 - Engineering and Implementation

Planned file:

`implementation-plan.md`

Should contain:

- architecture KEEP / MODIFY / REPLACE / REMOVE decisions
- implementation sequence
- component strategy
- design-token strategy
- dependency decisions
- performance considerations
- accessibility considerations
- testing approach
- rollout approach
- known risks

Implementation should be incremental rather than a single large rewrite.

---

### Phase 7 - Adversarial Studio Audit

Planned file:

`studio-audit.md`

Should contain independent review findings ranked:

- P0 - launch blocker
- P1 - major
- P2 - worthwhile
- P3 - polish

For each finding:

- problem
- why it matters
- exact fix
- expected improvement
- implementation status

The reviewer should not defend earlier decisions simply because the same model or agent created them.

---

### Phase 8 - Production and Launch Audit

Planned file:

`launch-audit.md`

Should contain final verification of:

- functionality
- responsive behaviour
- accessibility
- performance
- SEO
- security
- browser compatibility
- content truthfulness
- analytics
- deployment
- unresolved risks
- final launch checklist

Do not declare launch-ready while known P0 or P1 issues remain.

---

## Architecture Decisions

If V2 develops important technical decisions that deserve their own history, use:

`/docs/decisions/`

for Architecture Decision Records (ADRs).

Example:

`001-retain-astro.md`

Suggested structure:

```md
# Decision

## Context

What problem or decision required resolution?

## Decision

What was chosen?

## Alternatives Considered

What realistic alternatives were considered?

## Rationale

Why was this option chosen?

## Consequences

What trade-offs or future constraints result from the decision?
```

Use ADRs only for decisions significant enough to be useful later.

Do not document every minor implementation choice.

---

## Working Principle

Repository documentation should explain not only what V2 becomes, but why important decisions were made.

The goal is that another capable developer or coding agent can enter the project later and recover the intended strategy without relying on old chat history.
