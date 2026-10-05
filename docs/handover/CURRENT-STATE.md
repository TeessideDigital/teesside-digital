# Teesside Digital V2.1 — Current State

Last updated: 5 October 2026

## Repository

Branch: `redesign/v2`

Current repository HEAD:

`0111e5cc4a0945a2963c0103359e8aec5936b278`

`docs: add Claude migration context`

Current approved product baseline:

`d72a55dc6d2c81c88b15a3b2c2a019a3c1fecad4`

`feat: build V2.1 about experience`

The commit after the approved product baseline contains migration documentation and approved visual references only. It does not change product source.

The V2.1 implementation remains local and has not been pushed during this migration work.

A local recovery tag exists on the approved product baseline:

`pre-claude-handover-2026-10-05`

A verified Git bundle backup of the pre-Claude product state was created at:

`..\teesside-digital-pre-claude.bundle`

Expected working-tree state before Claude Code starts:

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
Dark/Light desktop/mobile states were visually approved.
No About motion has been implemented yet.

## Immediate next implementation

**Implementation 7B — About motion.**

Reuse the existing V2.1 Home/Services motion vocabulary.
Do not redesign the approved About static composition.
Do not alter Home or Services unless a demonstrated shared-system defect requires it.

## Latest verification

Before the About static commit:

- `npm run check` passed: 0 errors, 0 warnings, 2 existing hints
- `npm run type-check` passed
- `npm run build` passed
- 15 pages were generated
- `git diff --check` passed apart from Windows LF/CRLF notices
- no About JavaScript, hydration or dependency was added in the static implementation

The two existing Astro hints are in:

- `src/components/astro/ContactForm.astro`
- `src/layouts/BaseLayout.astro`

They are existing non-blocking script-processing hints and were not introduced by About.

## Important unfinished work after About motion

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
