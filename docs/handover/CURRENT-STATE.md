# Teesside Digital V2.1 — Current State

Last updated: 13 October 2026

## Repository

Branch: `redesign/v2`

Repository HEAD at the time of this update, and current approved product baseline:

`41af0e2f4319942b0a32eada0864686fe1a17866`

`feat: build V2.1 accessibility, terms and 404 pages`

The commit before it is Implementation 10A:

`40bf386fb95d4f1c88bdc568938850952391672a`

`feat: build V2.1 privacy page`

Any commit after that baseline that only updates this file or adds approved references is documentation and does not change product source.

The V2.1 implementation remains local. Nothing has been pushed. Production still serves V1 from `main`.

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
- V2.1 Privacy page (Implementation 10A)
- V2.1 Accessibility, Terms and 404 pages (Implementation 10B)
- Wide-screen investigation at `41af0e2` (read-only; findings below)

## Current approved route state

### Home

V2.1 static and motion are complete and committed.
It is to be rebuilt in Implementation 11B under the V2.2 visual direction. Until then it is an interim page, not an approved final state.

### Services

V2.1 static and motion are complete and committed.
It is to be rebuilt in Implementation 11C under the V2.2 visual direction. Until then it is an interim page.

### About

Static complete and committed at `d72a55d`.
Motion complete and committed at `a6710d9`.
Dark/Light desktop/mobile states were visually approved for V2.1.
It is to be rebuilt in Implementation 11C under the V2.2 visual direction. Until then it is an interim page.

### Contact

Static complete and committed at `a420368` (Implementation 8A).
Form behaviour complete and committed at `bd5382f` (Implementation 8B).
Dark/Light desktop/mobile states were visually approved. The approved references are under `docs/v2/references/contact/`, captured at 1440 x 900 and 390 x 844.
Contact has no motion.
Its presentation moves onto the V2.2 design system in Implementation 11A. Copy and form behaviour do not change.

### Website review

Complete and committed at `17cc9dd` (Implementation 9A), on the shared form engine committed at `fe4899c`.
Dark/Light desktop/mobile states were visually approved. The approved references are under `docs/v2/references/website-review/`, captured at 1440 x 900 and 390 x 844.
The website review page has no motion.
Its presentation moves onto the V2.2 design system in Implementation 11A. Copy and form behaviour do not change.

### Privacy

Complete and committed at `40bf386` (Implementation 10A).
The notice is static, with no script or motion. It states that the site uses no cookies, analytics or tracking and loads nothing from other websites; that was verified on every route.
Two launch blockers are marked in the page source: the postal address (visible placeholder) and the ICO registration number (comment only).
Its presentation moves onto the V2.2 design system in Implementation 11A. Copy does not change.

### Accessibility, Terms and 404

Complete and committed at `41af0e2` (Implementation 10B).
The 404 page is `noindex`. Terms carries the same postal-address placeholder as Privacy. Accessibility carries an `UPDATE-AFTER-TEST: screen reader` comment for the line to add after Dave's screen-reader test.
Their presentation moves onto the V2.2 design system in Implementation 11A. Copy does not change.

## Next phase

**Implementation 11A: design foundation, shell and utility pages (V2.2 visual direction).**

The direction was approved by Dave on 13 October 2026 and is recorded in `docs/v2/decisions/2026-10-13-visual-direction.md`. The phases are:

- 11A: tokens, fonts, shared components, shell (rail, mobile menu, sticky action bar, call pill behind a phone setting, footer), and Contact, website review, Privacy, Terms, Accessibility and 404 moved onto the system
- 11B: Home rebuilt
- 11C: Services and About rebuilt
- a later content proposal: price guide, care plan, "how it works", FAQ
- assets: Dave's portrait and real photographs

Each phase needs its own brief. Do not start one without it.

## Authority notes

- The V2.2 visual direction in `docs/v2/decisions/2026-10-13-visual-direction.md` supersedes the irregular-grid "Structural Datum" composition in `docs/v2/creative-direction.md`, by Dave's decision. Root `CLAUDE.md` was updated to match on 13 October 2026.

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

## Wide-screen investigation findings

Read-only, at `41af0e2`, in headless Microsoft Edge at 1440, 1920, 2560 and 3440 wide. Dave's own monitor is 3440 x 1440.

- Home has no maximum content width. At 3440 its content spans about 3,100px, and its rules and column gaps stretch with it. Services, About and the utility pages cap at 1,600px.
- The footer has no maximum width on any route.
- The Home hero image is 1672 x 941. Its area is a fixed 720px tall, as wide as the field and cropped from the bottom, so the bridge is cut away as the window widens: 76% of the image height shows at 1920, 55% at 2560 and 40% at 3440, where the file is also stretched to 1.9 times its size.
- Home repeats content: each service is linked twice, "Discuss your project" and "Free website review" each appear four times, and "Work directly with Dave" and its line appear three times.
- The voice is mixed: "I design and build your project" sits beside third-person "Dave" copy.
- `astro.config.mjs` sets `trailingSlash: 'never'`, but the site's links use trailing slashes. `astro preview` and `astro dev` return 404 for those links. Netlify serves both forms, so the built site is unaffected. Local preview currently needs a plain static server.
- At 320px with text doubled, the shell wordmark runs 11px past the edge on most routes, Home's page content runs 21px past it, and Services scrolls sideways by 20px. The Accessibility page's "Known issues" text describes this.

## Latest verification

For Implementation 10B, on the production build in headless Microsoft Edge:

- `npm run check` passed: 0 errors, 0 warnings, 1 existing hint
- `npm run type-check` passed
- `npm run build` passed
- 16 pages were generated
- `git diff --check` passed apart from Windows LF/CRLF notices
- all three pages matched the approved copy exactly
- Home, Services, About, Contact, the website review and Privacy were pixel-identical to the pre-10B build at 1440 Dark; their HTML was identical apart from the shared stylesheet's hashed filename
- the shared stylesheet lost 11 utility rules that only the legacy markup used; the seven legacy service and Work pages each lost one line break inside an inlined style block
- no hydration or dependency was added

For Implementation 10A, the same commands passed with 16 pages, the page matched the approved copy exactly, only `privacy/index.html` changed in the build, and no route set a cookie or made a request to another origin.

Earlier, for Implementation 9A, on the production build in headless Microsoft Edge with a simulated receiver:

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

- Trailing-slash and canonical consistency: `trailingSlash: 'never'` conflicts with the site's trailing-slash links, and canonicals are written without a trailing slash.
- The 404 page has a self-canonical of `https://teessidedigital.uk/404`. It is `noindex`, but the canonical should go.
- The default description in `src/config/constants.ts` is stale V1 copy that names cybersecurity as a service. Every V2 page passes its own description, so it reaches only legacy routes.
- `src/data/legal.ts` has no importers and can be removed.
- Netlify's Data Privacy Framework certification, which the Privacy page relies on, must be re-checked at launch and then annually.
- The postal address on Privacy and Terms, and the ICO registration number on Privacy, are launch blockers marked `LAUNCH-BLOCKER` in the source.
- The Contact form has no accessible name. Fixed in Implementation 11A.
- Home's service links have long accessible names (title plus description). To be fixed in Implementation 11B.
- A branded no-JavaScript confirmation page is a future decision. Netlify's default page is truthful but unbranded and says "Back to our site".
- `globals.css` gives every input a radius and every button a V1 focus ring, and recolours a focused input's border. `src/styles/forms.css` overrides all three for both forms.
- `validateContactForm` in `src/lib/validation.ts` is unused.
- The form script is now one external module shared by Contact and the website review page. The shared form styles are inlined as a style element on both pages, so any future Content Security Policy must allow that inline style, alongside the existing inline shell scripts.
- Tailwind's source scan reads the word "fixed" in page copy as a utility class, which adds one unused rule to the shared stylesheet. It is harmless and can be blocklisted later.
- The review page's in-page "Go to the request form" link relies on the browser moving focus to the form heading. That has been tested only in Edge.

## Important unfinished work

1. V2.2 visual direction: Implementations 11A, 11B and 11C
2. Content proposal (price guide, care plan, "how it works", FAQ) and real photographs
3. Legacy service-route migration
4. Work publication/evidence decision
5. SEO/schema cleanup, including trailing slashes and canonicals
6. Dependency/tooling review
7. Final studio/launch audit

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

1. Latest explicitly approved decision / implementation, including the V2.2 visual direction
2. Current route-specific approved references
3. Handover documents
4. Approved V2 documents
5. Older V1 material

If there is a material conflict, stop and ask Dave rather than guessing.
