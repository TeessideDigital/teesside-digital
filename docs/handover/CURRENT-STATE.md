# Teesside Digital V2.1 — Current State

Last updated: 13 October 2026

## Repository

Branch: `redesign/v2`

Repository HEAD at the time of this update, and current approved product baseline:

`17cc9dd16362258c90282961a17a03ff3a48ad5d`

`feat: build V2.1 website review page`

The commit before it is the Implementation 9A refactor:

`fe4899cfc9d03c88984339eed6dead0574762889`

`refactor: extract shared form engine from contact`

Any commit after that baseline that only updates this file or adds approved references is documentation and does not change product source.

The V2.1 implementation remains local and has not been pushed. Production still serves V1 from `main`.

Two Netlify draft deploys have been made to verify the form receiver. Neither is published and both sit behind Netlify team login:

- `6ac41773af93e69e0d3bd207`, of `bd5382f`, on 5 October 2026 (Contact);
- `6ac49a4b72eb0cc522ca5010`, of `17cc9dd`, on 6 October 2026 (website review, and Contact again).

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
- V2.1 Contact static page (Implementation 8A)
- V2.1 Contact form behaviour and live receiver verification (Implementation 8B)
- Shared form engine and V2.1 website review page (Implementation 9A)
- Live receiver verification for the website review form, with a Contact regression (Implementation 9B)

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

### Contact

Static complete and committed at `a420368` (Implementation 8A).
Form behaviour complete and committed at `bd5382f` (Implementation 8B).
Dark/Light desktop/mobile states were visually approved. The approved references are under `docs/v2/references/contact/`, captured at 1440 x 900 and 390 x 844.
Contact has no motion.
Do not redesign unless a concrete whole-site QA issue requires it.

### Website review

Complete and committed at `17cc9dd` (Implementation 9A), on the shared form engine committed at `fe4899c`.
Dark/Light desktop/mobile states were visually approved. The approved references are under `docs/v2/references/website-review/`, captured at 1440 x 900 and 390 x 844.
The website review page has no motion.
Do not redesign unless a concrete whole-site QA issue requires it.

## Next phase

**Privacy, Accessibility, Terms and 404 V2 cleanup, with Privacy first.**

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

## Contact decisions

Approved by Dave on 5 October 2026 and present in `bd5382f`:

- There is no response-time promise anywhere. The page says instead: "Enquiries go straight to Dave, who replies personally by email."
- The budget field is optional free text, with no price bands.
- The Netlify form is named `enquiry`. It is kept separate from the live V1 `contact` form, which is never touched and simply stops receiving submissions at launch.
- Contact has no motion.
- Without JavaScript the form validates and submits natively, and Netlify shows its default confirmation page. There is no custom thank-you route.
- With JavaScript the form posts to `/` and maps the response: 2xx is accepted, 4xx is a known rejection, anything else (5xx, network failure, 15-second timeout) is uncertain. Success is shown only after a 2xx.

The outcome mapping was verified live on 5 October 2026 against draft deploy `6ac41773af93e69e0d3bd207`:

- Netlify detected and registered the `enquiry` form on the draft deploy.
- A JavaScript submission returned 200, showed the accepted state and was stored.
- A native submission returned 200, showed Netlify's default confirmation page and was stored.
- A POST with an unknown form name returned 404 and stored nothing.
- Dave received the notification emails at dave@teessidedigital.uk, and both test submissions were verified, not spam.
- 5xx responses, network failure and timeouts were tested only with a simulated receiver.

## Website review decisions

Approved by Dave on 6 October 2026 and present in `17cc9dd`:

- The review is free and manual, carried out by Dave. There is no guaranteed turnaround.
- The page promises "a written report by email". Dave's working format is a PDF, which the page does not promise.
- The Netlify form is named `website-review`.
- The website address is required. An empty field and a value that is not a web address get different messages.
- There is no pause switch at launch. If pausing is ever needed: keep the route, replace the form with an honest availability message, and update every "Free website review" link together.
- Both forms use one shared engine, `src/scripts/form-submission.ts`, with shared control styles in `src/styles/forms.css`. Each form supplies its own copy and rules through data attributes in its markup; the engine holds none.
- The website review page has no motion and no page script other than the shared engine.

The receiver was verified live on 13 October 2026 against draft deploy `6ac49a4b72eb0cc522ca5010`:

- Netlify detected and registered the `website-review` form on the draft deploy.
- A review submission with JavaScript returned 200, showed the accepted state with focus on "Review request received", and was stored under `website-review`.
- A native review submission returned 200, showed Netlify's default confirmation page, and was stored under `website-review`.
- A Contact submission with JavaScript, as a regression check of the shared engine, returned 200, showed the accepted state with focus on "Enquiry received", and was stored under `enquiry`.
- Dave received three notification emails at dave@teessidedigital.uk.
- All three test submissions were verified, not spam.

## Latest verification

For Implementation 9A, on the production build in headless Microsoft Edge with a simulated receiver:

- `npm run check` passed: 0 errors, 0 warnings, 1 existing hint
- `npm run type-check` passed
- `npm run build` passed
- 16 pages were generated (15 at the refactor commit on its own)
- `git diff --check` passed apart from Windows LF/CRLF notices
- Contact matched the pre-9A build in every state tested: 40 recorded states, 83 state, focus and edge captures, and a byte-identical request body
- all six review form states matched the approved copy at 1440 Dark, 1440 Light and 390 Dark
- every other route's HTML was identical apart from the shared stylesheet's hashed filename; Home, Services and About were pixel-identical at 1440 Dark
- shared form engine: 2,898 bytes raw, 1,394 bytes gzip, one external module loaded by Contact and the review page
- no hydration or dependency was added

Earlier, for Implementation 8B Part 1, on the production build in headless Microsoft Edge with a simulated receiver:

- `npm run check` passed: 0 errors, 0 warnings, 1 existing hint
- `npm run type-check` passed
- `npm run build` passed
- 15 pages were generated
- `git diff --check` passed apart from Windows LF/CRLF notices
- all six form states matched the approved copy at 1440 Dark, 1440 Light and 390 Dark
- Contact at rest was pixel-identical to the approved 8A page in all four states
- every other route's HTML was byte-identical to the 8A build; Home, Services and About were pixel-identical at 1440 Dark
- Contact form script at that time: 3,409 bytes raw, 1,621 bytes gzip, inlined on Contact only
- no hydration or dependency was added

The remaining Astro hint is in `src/layouts/BaseLayout.astro` (the JSON-LD script). The `ContactForm.astro` hint went when its legacy script was removed in 8A.

Earlier still, for Implementation 7B, on the production build in headless Microsoft Edge:

- `npm run check` passed: 0 errors, 0 warnings, 2 hints at that time
- `npm run type-check` passed
- `npm run build` passed
- 15 pages were generated
- `git diff --check` passed apart from Windows LF/CRLF notices
- About at rest was pixel-identical to the pre-7B build and to the approved references at 1440 and 390, Dark and Light
- Home and Services output was unchanged apart from one hashed CSS filename each; their screenshots, geometry and animation logs matched the pre-7B build
- About coordinator: 3,076 bytes raw, 1,475 bytes gzip (Services: 3,253 / 1,477)
- no hydration, dependency or new external script was added

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
- browser autofill on the Contact and website review forms
- other browsers' email checks, which may differ from Edge's on an address such as name@example

## Other launch debt

- `/privacy/` must be rewritten before launch. Both forms now link to it, and it is still legacy content.
- A branded no-JavaScript confirmation page is a future decision. Netlify's default page is truthful but unbranded and says "Back to our site".
- `globals.css` gives every input a radius and every button a V1 focus ring, and recolours a focused input's border. `src/styles/forms.css` overrides all three for both forms.
- `validateContactForm` in `src/lib/validation.ts` is unused.
- The form script is now one external module shared by Contact and the website review page. The shared form styles are inlined as a style element on both pages, so any future Content Security Policy must allow that inline style, alongside the existing inline shell scripts.
- Tailwind's source scan reads the word "fixed" in the review copy as a utility class, which adds one unused rule to the shared stylesheet. It is harmless and can be blocklisted later.
- The review page's "Go to the request form" link relies on the browser moving focus to the form heading. That has been tested only in Edge.

## Important unfinished work

1. Privacy / Accessibility / Terms / 404 V2 cleanup, with Privacy first
2. Legacy service-route migration
3. Work publication/evidence decision
4. SEO/schema cleanup
5. Dependency/tooling review
6. Final studio/launch audit

## Known transitional route state

The latest build generated 16 pages, including legacy routes for:

- `/services/web-development/`
- `/services/ai-automation/`
- `/services/cybersecurity/`
- `/work/`
- `/work/northeast-joinery/`
- `/work/quoteflow/`
- `/work/siteguard/`

The approved V2 launch architecture does not treat those legacy routes as settled launch content. Do not infer approval from route existence.

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
