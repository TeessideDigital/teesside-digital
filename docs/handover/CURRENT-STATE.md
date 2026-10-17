# Teesside Digital V4 - Current State

Last updated: 17 October 2026

## Repository

Branch: `redesign/v4`, created from `main` at `f61bbcb`. It has no upstream and has not been pushed. `redesign/v2` is untouched and remains the V2.2 fallback.

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

Netlify draft deploy, not published, behind Netlify team login:

- `6ad35fa721d053a32c91ebe1`, of `3e16b8a`, on 17 October 2026, at https://redesign-v4--teesside-digital.netlify.app

Production still serves V1 from `main`.

## Status

V4 is built and tested locally. **Launch is pending**: Dave's review, the deployed checks that need a Netlify sign-in (below), and the items in `CONTENT-TBC.md`.

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

Not yet verified (needs the draft to be opened while signed in to Netlify):

- one test submission each to `enquiry` and `website-review` on the deploy, then deleting them;
- the security headers and redirects as served by Netlify;
- Lighthouse on the deployed draft.

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
