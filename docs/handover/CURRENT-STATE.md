# Teesside Digital V2.2 - Current State

Last updated: 14 October 2026

## Repository

Branch: `redesign/v2`

Current approved product baseline:

`137a546` `fix: logo accessible name and Home cache headers`

Any commit after that baseline that only updates this file is documentation and does not change product source.

The redesign remains local. Nothing has been pushed. Production still serves V1 from `main`.

Netlify draft deploys, none published, all behind Netlify team login:

- `6ac41773af93e69e0d3bd207`, of `bd5382f`, on 5 October 2026 (Contact receiver);
- `6ac49a4b72eb0cc522ca5010`, of `17cc9dd`, on 6 October 2026 (website review receiver, Contact again);
- `6ace38008c4aece5be63687d`, of `62e372e`, on 13 October 2026 (Implementation 12 launch checks).

Local tags:

- `pre-claude-handover-2026-10-05` on `d72a55d` (About static, the pre-Claude product state)
- `claude-ready-2026-10-05` on `14fc42d` (migration documentation complete)

A verified Git bundle backup of the pre-Claude product state is at `..\teesside-digital-pre-claude.bundle`.

Expected working-tree state before the next task starts: clean.

## Status

The V2.2 redesign and launch preparation are complete. **Launch is pending** Dave's go-ahead. The site builds 9 pages: Home, Services, About, Contact, Free website review, Privacy, Terms, Accessibility and the 404 page.

## Completed

V2.1 (history; its composition is superseded by V2.2):

- V2 strategy, architecture, theme, typography and shell
- Home, Services and About experiences and motion (to Implementation 7B)
- Contact static page and form behaviour, with live receiver verification (8A, 8B)
- Shared form engine and website review page, with live receiver verification (9A, 9B)
- Privacy (10A), Accessibility, Terms and 404 (10B)
- Wide-screen investigation at `41af0e2`

V2.2 (visual direction approved by Dave on 13 October 2026, recorded in `docs/v2/decisions/2026-10-13-visual-direction.md`):

| Phase | Commit | Content |
| --- | --- | --- |
| docs | `7ab53bd` | Visual direction, utility-page records, root `CLAUDE.md` |
| 11A | `cda03e5` | Tokens, self-hosted fonts (Instrument Serif, Instrument Sans, IBM Plex Mono), shared components and classes, shell (rail, mobile menu button, sticky action bar, call pill behind `SITE.phone`, footer), Contact, website review, Privacy, Terms, Accessibility and 404 moved onto the system |
| 11B | `fea967c` | Home rebuilt, with HTML/CSS product visuals |
| 11C | `c3f396b` | Services and About rebuilt; shared section reveal; anchor-arrival fix |
| 12A | `fb078d1` | V1 service and Work routes removed; 301 redirects added |
| 12B | `b80fb9c` | `trailingSlash: 'always'`, SEO titles and descriptions, no canonical on noindex pages, new social image `og-default.jpg` |
| 12C | `2d02f21` | Security headers and Content Security Policy; `npm run check:csp` |
| 12D | `400d8b3` | 28 unreachable files removed; React removed; `npm audit` 14 to 7 |
| 12F | `62e372e` | Launch blockers resolved: "Based in Hartlepool, Teesside." on Privacy and Terms; ICO line moved to a TODO |
| 12 follow-up | `137a546` | Logo link accessible name; Home and `.html` revalidate on every visit |

Implementation 12 Part E (live checks on draft `6ace38008c4aece5be63687d`) passed: every page 200, unknown URLs 404 with noindex, every V1 URL redirected once to its target, all security headers present, every executable inline script allowed by hash, no third-party requests, theme and menu working, one test each to `enquiry` and `website-review` received. Lighthouse mobile (local build): 99 / 100 / 100 / 100 on Home, Services and Contact.

## Route state

| Route | State |
| --- | --- |
| `/` | V2.2, with hero sequence and section reveals |
| `/services/` | V2.2, anchors `#websites-web-development`, `#apps-digital-tools`, `#automation-ai`; section reveals |
| `/about/` | V2.2; section reveals; photo slots hidden until real photographs exist |
| `/contact/` | V2.2; Netlify form `enquiry`; no motion |
| `/website-review/` | V2.2; Netlify form `website-review`; no motion |
| `/privacy/`, `/terms/`, `/accessibility/` | V2.2; static |
| 404 | V2.2; `noindex`, no canonical |

Redirects (301, in `netlify.toml`, above the catch-all 404):

- `/services/web-development` to `/services/#websites-web-development`
- `/services/ai-automation` to `/services/#automation-ai`
- `/services/cybersecurity` to `/services/`
- `/work`, `/work/*` to `/services/`

Work stays withheld until real evidence passes the evidence gate.

## Engineering notes

- The five inline-script hashes in the Content Security Policy are fixed in `netlify.toml`. If an inline script in the shell or on Home changes, run `npm run check:csp` after the build and update the hashes. `style-src` allows `'unsafe-inline'` because Astro inlines small stylesheets and the product visuals use style attributes.
- The motion authority is the committed code: `src/scripts/home-motion.ts` and `src/scripts/section-reveal.ts`. Sections well below the viewport are held; anything in or near the viewport on arrival is shown at once.
- The approved references under `docs/v2/references/` are V2.1 captures. They remain history; the V2.2 implementation is now the visual authority.
- The remaining Astro hint is the JSON-LD script in `src/layouts/BaseLayout.astro`.
- Local preview: `npm run build`, then serve `dist` with any static server.

## Contact decisions

Approved by Dave on 5 October 2026 and still in force:

- There is no response-time promise anywhere: "Enquiries go straight to Dave, who replies personally by email."
- The budget field is optional free text, with no price bands.
- The Netlify form is named `enquiry`. It is separate from the V1 `contact` form, which is never touched and simply stops receiving submissions at launch.
- Without JavaScript the form validates and submits natively, and Netlify shows its default confirmation page.
- With JavaScript the form posts to `/` and maps the response: 2xx is accepted, 4xx is a known rejection, anything else (5xx, network failure, 15-second timeout) is uncertain. Success is shown only after a 2xx.

## Website review decisions

Approved by Dave on 6 October 2026 and still in force:

- The review is free and manual, carried out by Dave. There is no guaranteed turnaround.
- The page promises "a written report by email", not a particular format.
- The Netlify form is named `website-review`. The website address is required.
- There is no pause switch. If pausing is ever needed: keep the route, replace the form with an honest availability message, and update every "Free website review" link together.
- Both forms use one shared engine, `src/scripts/form-submission.ts`, with styles in `src/styles/forms.css`. Each form supplies its own copy and rules through data attributes.

## Post-launch debt

Content and business:

- ICO: retake the fee self-assessment once trading; add a registration number to Privacy if one is issued (TODO comment in `PrivacyExperience.astro`).
- Full postal address on Privacy and Terms once a business address service is set up (TODO comments in both).
- Screen-reader test by Dave, then update the Accessibility page (`UPDATE-AFTER-TEST: screen reader` comment).
- Real photographs by Dave: portrait and local photo on About. Their slots stay hidden until then.
- Dedicated business phone line, then set `SITE.phone` to enable the call pill and phone features.
- Content extras: price guide, care plan, "how it works", FAQ. Each needs its own proposal and brief.
- Work publication, once real evidence passes the evidence gate.
- Netlify's Data Privacy Framework certification, which the Privacy page relies on: re-check at launch and then annually.
- Delete the Netlify test submissions marked "TEST" when convenient.

Engineering:

- Tailwind 4 upgrade. It clears the last 7 `npm audit` findings (`braces` and `postcss-selector-parser`, through Tailwind 3's build tools; build-time only). It is a breaking change and needs its own phase.
- A branded no-JavaScript form confirmation page is a future decision. Netlify's default is truthful but unbranded.

Testing not yet done (all verification so far is browser automation on Windows, mostly headless Edge):

- real iOS and Android devices
- Safari and Firefox
- screen reader
- genuine browser text zoom (200% checks used a font-size doubling harness)
- bfcache restore, print, hidden-tab behaviour
- browser autofill on both forms

## Authority

For repository state:

1. Current Git/source
2. This file
3. `HANDOVER-CODEX.md`
4. `HANDOVER-CHATGPT.md`

For approved product/design decisions:

1. Latest explicitly approved decision / implementation, including the V2.2 visual direction
2. Handover documents
3. Approved V2 documents
4. Older V1 material

If there is a material conflict, stop and ask Dave rather than guessing.
