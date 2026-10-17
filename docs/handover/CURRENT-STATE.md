# Teesside Digital V4 - Current State

Last updated: 17 October 2026

## Live

**V4 is live on https://teessidedigital.uk** (17 October 2026).

| | |
| --- | --- |
| main | `5ad3889` (score rings), on top of the merge commit `114808b` (`redesign/v4` into `main`, no squash) |
| Tags | `v4.0.0` on `114808b` (go-live); `v4.0.1` on `5ad3889` (live Lighthouse rings) |
| Production deploys | `6ad3b977fdc53a3f9709503b` (go-live, `114808b`); `6ad3bb12192db2691d1b3665` (`5ad3889`); later docs-only commits redeploy the same site |
| Rollback | Netlify deploy `6acf70360735b11d356429f9` (V2.2, `main` at `f61bbcb`, 14 October 2026). Publish it from the Netlify deploys list to roll back. `redesign/v2` is untouched as the source fallback |
| Deploys | Production builds automatically from `main` on GitHub (`npm run build`, publish `dist`) |

Live Lighthouse 12.8.2, mobile: Home 95 / 100 / 93 / 100 (median of five), Services 94 / 100 / 93 / 100, About 93 / 100 / 93 / 100, Contact 97 / 100 / 93 / 100, Website review 100 / 100 / 93 / 100.

**Open issue: Netlify injects a script into every live page** (`<script async src="/.netlify/scripts/hud?variant=public">`, not part of the build). It tries to run an inline script, which the CSP blocks, so every page logs one console error; this is the whole Best practices deduction (93), and its 35 KB script is the likely cause of the extra blocking time seen live (up to 240 ms, against 0 ms locally). For signed-in Netlify team members it also writes a localStorage key (`nl-hud:owner-private:v1`); for anonymous visitors it stores nothing. Removing it is a Netlify site setting, left to Dave.

## Repository

Branch: `main` (V4 merged). `redesign/v4` is pushed and merged; `redesign/v2` is untouched and remains the V2.2 fallback.

V4 commits:

| Phase | Commit | Content |
| --- | --- | --- |
| A | `567faa8` | Foundation: reference package, tokens, fonts, Tailwind theme, Logo, favicons, manifest, config modules |
| B | `42aae42` | Shell: progress bar, pill nav, menu drawer, footer, mobile bar, reveal, view transitions, skip link |
| C | `022cb96` | Home, every section and interaction |
| D | `ded03c5` | Services, About, Contact, Website review |
| E | `7052c74` | Legal pages, 404, SEO and metadata, sitemap, `CONTENT-TBC.md` |
| F | `3e16b8a` | Test suite, fixes found in testing, CSP, Lighthouse scores |
| G | this commit | This file |

The build brief is `design/v4-reference/BRIEF-V4-BUILD.md`, approved by Dave on 17 October 2026. The six reference pages and the final logo set are beside it. The original download `design/td-v4-handoff.zip` is ignored by Git.

Netlify draft deploys, not published, behind Netlify team login (the latest is listed under "V4 fix run" below):

- `6ad35fa721d053a32c91ebe1`, of `3e16b8a`, on 17 October 2026, at https://redesign-v4--teesside-digital.netlify.app


## V4 fix run (17 October 2026)

| Part | Commit | Content |
| --- | --- | --- |
| 1 | `04502f1` | QuoteFlow preview no longer clipped below 1000px; Home map without the HARTLEPOOL label box behind the form; service rows at the reference line height; placeholders in --fg-3; lime square markers in legal lists |
| 2 | `7349455` | Confirmed content: availability, reply time, care plan, ownership, seven-entry Background (`src/data/background.ts`), tools, FAQ answers, per-service time and price flags |
| 3 | `41f9ce4` | No browser storage (logo intro now uses a same-origin referrer check); Privacy and Accessibility wording corrected (approved by Dave); forced-colours fixes for the menu bars and the mark; new CSP hash |
| 4 | this commit | Tests for the fix run and the accessibility checks; docs |

Draft redeployed: `6ad398f71c5f4010faf5fd14`, of `41f9ce4`, at https://redesign-v4--teesside-digital.netlify.app (branch deploy context, not published).

Verification on the local production build: check, type-check, lint and build clean; CSP matches the build (one head-script hash, no unsafe-inline for scripts); 278+ internal links resolve; Playwright 122 passed, 2 skipped (the price guide tests, while `pricing.confirmed` is false), covering 320, 390, 768 and 1440 on every page, keyboard-only use with visible focus on every page and both forms, forced colours, reduced motion, no JavaScript, and axe (no serious or critical issues; colour contrast passes with the grain overlay hidden); Lighthouse mobile on `astro preview`: Home, Services, About, Contact and Website review 99 / 100 / 100 / 100, CLS 0. The built output contains no TBC, XXXXX, Prototype, sessionStorage or localStorage.

## Status

V4 is live. Remaining content items are in `CONTENT-TBC.md`: phone, hours, photograph, price guide estimator, and a manual text-at-200% check.

## What changed from V2.2

These were approved by Dave in the V4 brief and replace the V2.2 decisions they contradict:

- Visual system: single dark theme (no Light theme, no theme switch), lime accent, Schibsted Grotesk and JetBrains Mono, grain overlay, floating pill nav with a menu drawer instead of the left rail.
- Voice: marketing pages in the first person ("I"). The website review page keeps its approved third-person copy; the legal pages are unchanged.
- Services: eight services (Websites, Web and mobile apps, Bespoke software, Automation, AI tools, Integrations, Security reviews, Support and care) instead of three families.
- Work: shown on Home (QuoteFlow, labelled sample data, and this website) with "Client case studies are on the way."
- Enquiry form: four steps (needs, budget band, timing, details). The budget is now a choice of bands, replacing the free-text field.
- Motion: the V4 motion set (marquee, typing indicator, illustration loops, contour drift, view transitions), all off under reduced motion.

## Route state

| Route | State |
| --- | --- |
| `/` | V4: hero, services strip, before and after, what I build, demo, work, how I work, price guide (hidden until `pricing.confirmed`), under the bonnet, meet Dave, FAQ, contact with the four-step `enquiry` form |
| `/services/` | V4: eight sections, anchors `#websites`, `#apps`, `#software`, `#automation`, `#ai`, `#integrations`, `#security`, `#care` |
| `/about/` | V4; Background timeline hidden until `SITE.aboutBackgroundConfirmed` |
| `/contact/` | V4: four-step `enquiry` form, details, review band, FAQ |
| `/website-review/` | V4: approved third-person copy, `website-review` form (existing field names plus optional `goal`) |
| `/privacy/`, `/terms/`, `/accessibility/` | V4 shell, wording unchanged |
| 404 | V4; `noindex`, no canonical |

Redirects (301, in `netlify.toml`, above the catch-all 404): `/services/web-development` to `/services/#websites`; `/services/ai-automation` to `/services/#automation`; `/services/cybersecurity` to `/services/#security`; `/work` and `/work/*` to `/#work`.

## Config and content switches

All unconfirmed content sits behind config with a safe default, listed in full in `CONTENT-TBC.md`:

- `src/config/constants.ts`: `SITE.phone`, `availability`, `headline`, `portrait`, `introAbout`, `hours`, `replyTime`, `carePlan`, `ownershipConfirmed`, `aboutBackgroundConfirmed`, `tools`.
- `src/data/pricing.ts`: `pricing.confirmed` (false), ranges, extras, care, `budgetBands`.
- `src/data/services.ts`: per-service `confirmed` (all false), times, prices, tools.
- `src/data/scores.ts`: Lighthouse figures shown as rings on Home.

## Engineering notes

- Static Astro, no client framework. One small TypeScript module per feature, loaded only where used (Home about 10 KB of JavaScript gzipped; other pages 2 to 5 KB).
- Page scripts are external files (`vite.build.assetsInlineLimit: 0`), so the CSP allows the single inline head script (`src/scripts/head.js`) by one hash. Line endings are normalised before hashing. After changing `head.js`, run `npm run build` then `npm run check:csp` and update `netlify.toml`.
- `img-src` allows `data:` for the grain overlay.
- Tailwind 3 supplies only its base reset; utility classes are deliberately not generated because names such as `ring` and `outline` collide with the site's classes.
- The head script adds `js` to `<html>` so CSS can close the hero answers, later form steps and extra service panels without a flash. If the page scripts have not run within 4 seconds, it removes `js` again so nothing stays hidden.
- The menu is a native modal `<dialog>`, opened by the shell script (and by invoker commands where a browser supports them without script).
- The enquiry form posts through the shared engine `src/scripts/form-submission.ts` (`submitForm`, `encodeForm`), which joins checkbox answers with commas. Success shows only after a 2xx.
- The contour map is one shared file, `public/images/contour-hartlepool.svg`.
- The outlined footer wordmark and 404 figure use a 2 KB static subset of Schibsted Grotesk 800, because the variable font's overlapping contours show through a text stroke.

## Verification (17 October 2026, local production build, Chrome 155 on Windows)

- `npm run check`, `npm run type-check`, `npm run build`, `git diff --check`: clean.
- `npm run test:e2e` (Playwright, `tests/`): 77 passed, 2 skipped (the price guide tests, which skip while `pricing.confirmed` is false; both passed in a temporary build with it set to true).
- axe-core: no violations of any impact on any page at 390 and 1440.
- Lighthouse 12.8.2, mobile: Home 99 / 100 / 100 / 100 (with the rings), Services, About, Contact and Website review 99 / 100 / 100 / 100; CLS 0 on every page.
- `npm run check:links`: 278 internal links, every page, anchor and file resolves.
- `npm run check:csp`: the policy matches the build; the policy replayed on every page blocks nothing.
- No horizontal overflow at 320, 390, 768, 1024, 1440, 1920, 2560, 3440 and 844 x 390.
- Netlify registered both forms from the draft deploy with every V4 field.

Checked on the draft deploy (17 October 2026, in Dave's signed-in Brave):

- Every page 200; an unknown URL 404 with the V4 page and noindex; `/services` redirects to `/services/`; each V1 URL redirects once to its V4 target.
- Headers: the Content-Security-Policy matches `netlify.toml` exactly and blocks nothing (head script runs, grain overlay shows); X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy and Permissions-Policy present; hashed `/_astro/` files are cached for a year and HTML revalidates. On `*.netlify.app` Netlify adds its own HSTS with includeSubDomains and preload; on the real domain the site's own one-year HSTS applies.
- One test submission each, sent through the real forms, arrived with every field: `enquiry` `6ad363190b126c7db42d6b4a` (needs, budget, timing, name, email, business, message) and `website-review` `6ad36325f9b039098cd38c52` (name, email, website, message, goal). Both are marked TEST and left for Dave to delete, with the older TEST entries `6acf699192556cbe62b1830a` and `6acf69a002c561c85e53597f` from 14 October.

Not verified: Lighthouse on the draft itself (it needs a signed-in browser; run it from Brave's DevTools). The figures above are from the local production build.

Testing not done at all: real iOS and Android devices, Safari and Firefox, a screen reader, genuine browser text zoom.

## Post-launch debt

- Everything in `CONTENT-TBC.md`, including the Privacy and Accessibility statements that V4 has made out of date (theme switch, form fields, session storage).
- Re-measure Lighthouse on the live site and update `src/data/scores.ts`.
- Tailwind 4 upgrade (its own phase).
- ICO fee self-assessment and full postal address (TODO comments in the legal content).

## Authority

For repository state:

1. Current Git/source
2. This file
3. `design/v4-reference/BRIEF-V4-BUILD.md` for the V4 design and behaviour
4. `HANDOVER-CODEX.md`, `HANDOVER-CHATGPT.md` for history

If there is a material conflict, stop and ask Dave rather than guessing.
