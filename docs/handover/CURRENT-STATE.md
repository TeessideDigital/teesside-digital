# Teesside Digital V2.1 — Current State

Last updated: 5 October 2026

## Repository

Branch: `redesign/v2`

Repository HEAD at the time of this update, and current approved product baseline:

`a6710d92b4ac2c98818d56a0ef6f65b913a70472`

`feat: add V2.1 about motion`

Any commit after that baseline that only updates this file is documentation and does not change product source.

The V2.1 implementation remains local and has not been pushed.

Local tags:

- `pre-claude-handover-2026-10-05` on `d72a55d` (About static, the pre-Claude product state)
- `claude-ready-2026-10-05` on `14fc42d` (migration documentation complete)

A verified Git bundle backup of the pre-Claude product state was created at:

`..\teesside-digital-pre-claude.bundle`

Expected working-tree state before the next task starts:

clean

## Completed

- V2 strategy and architecture
- V2 theme and typography foundation
- V2 global shell and responsive navigation
- V2.1 homepage opening
- V2.1 complete homepage narrative
- V2.1 homepage motion
- V2.1 Services experience
- V2.1 Services motion
- V2.1 About static experience
- Claude migration documentation and approved Services/About visual references
- V2.1 About motion (Implementation 7B)

## Current approved route state

### Home

Static complete and committed.
Motion complete and committed.
Do not redesign unless a concrete whole-site QA issue requires it.

### Services

Static complete and committed.
Motion complete and committed.
Do not redesign unless a concrete whole-site QA issue requires it.

### About

Static complete and committed at `d72a55d`.
Motion complete and committed at `a6710d9`.
Dark/Light desktop/mobile states were visually approved.
Do not redesign unless a concrete whole-site QA issue requires it.

## Next phase

**Contact: V2 redesign and functional correction.**

No implementation brief has been issued yet. Do not start without one.

## Authority notes

- The committed Home, Services and About motion code is the motion authority. The 210/400/900ms tokens and the once-only route coordinators supersede the 120/200/360/480ms timings and the hero-only reveal limit in `docs/v2/motion-system.md`. That document's principles still apply.
- No V2.1 visual-grammar document exists yet. Until one is written, the approved implementation and the approved references under `docs/v2/references/` are the authority.

## Implementation 7B decisions

Approved by Dave on 5 October 2026 and present in `a6710d9`:

- The study scene has two triggers: the headline and the cue list. The cue rules sit too far below the headline for one trigger to show them. Desktop therefore has 10 entrance groups and mobile has 7.
- Principles have no translate, because no translate primitive exists in Home or Services. Each principle rule establishes and its title and body tone in, using the Services treatments.
- Below 48rem the four principles resolve as one quiet group, mirroring Services' mobile behaviour.
- `AboutMotion.astro` loads `editorial-motion.css` through a CSS `@import`, as Home does. A JavaScript import made the bundler split a shared chunk and change the Services page output.
- Extending the shared selectors to `.about-experience` gives About's secondary link the same 7px arrow travel that Services' secondary link has.
- Arrival rules are stricter than on Home and Services. On a scrolled, reloaded, back/forward or late arrival, targets at or above the fold never animate, including after scrolling back up. A hash arrival does nothing.
- The coordinator checks for support of the `pseudoElement` animation option. Where it is unsupported, the generated-rule animations (the date cue rule and the principle rules) are skipped and stay static. Nothing animates their parent elements instead.
- The About coordinator removes its listeners once its work is finished. Home and Services do not; that was deliberately not back-ported.

## Latest verification

For Implementation 7B, on the production build in headless Microsoft Edge:

- `npm run check` passed: 0 errors, 0 warnings, 2 existing hints
- `npm run type-check` passed
- `npm run build` passed
- 15 pages were generated
- `git diff --check` passed apart from Windows LF/CRLF notices
- About at rest was pixel-identical to the pre-7B build and to the approved references at 1440 and 390, Dark and Light
- Home and Services output was unchanged apart from one hashed CSS filename each; their screenshots, geometry and animation logs matched the pre-7B build
- About coordinator: 3,076 bytes raw, 1,475 bytes gzip (Services: 3,253 / 1,477)
- no hydration, dependency or new external script was added

The two existing Astro hints are in:

- `src/components/astro/ContactForm.astro`
- `src/layouts/BaseLayout.astro`

They are existing non-blocking script-processing hints.

## Launch audit test debt

Not yet tested for any V2.1 route. All motion and layout verification so far is browser automation on Windows.

- real iOS and Android devices
- Safari
- Firefox
- screen reader
- genuine browser text zoom (200% checks so far used a font-size doubling harness)
- bfcache restore
- real print behaviour
- real hidden-tab behaviour

## Important unfinished work

1. Contact V2 redesign and functional correction
2. `/website-review/`
3. Privacy / Accessibility / Terms / 404 V2 cleanup
4. Legacy service-route migration
5. Work publication/evidence decision
6. SEO/schema cleanup
7. Dependency/tooling review
8. Final studio/launch audit

## Known transitional route state

The latest build still generated 15 pages, including legacy routes for:

- `/services/web-development/`
- `/services/ai-automation/`
- `/services/cybersecurity/`
- `/work/`
- `/work/northeast-joinery/`
- `/work/quoteflow/`
- `/work/siteguard/`

The approved V2 launch architecture does not treat those legacy routes as settled launch content. Do not infer approval from route existence.

`/website-review/` is still not present in the latest verified build.

## Authority

For repository state:

1. Current Git/source
2. This file
3. `HANDOVER-CODEX.md`
4. `HANDOVER-CHATGPT.md`

For approved product/design decisions:

1. Latest explicitly approved V2.1 decision / implementation
2. Current route-specific approved references
3. Handover documents
4. Approved V2 documents
5. Older V1 material

If there is a material conflict, stop and ask Dave rather than guessing.
