# Content to confirm before go-live

Everything the V4 reference marked `TBC`, plus anything the build found that needs Dave's decision. Each item has a safe default: while it is empty or `false`, the content that depends on it stays off the site, so nothing unconfirmed or invented goes live. No `TBC` tag is ever rendered.

To change a value, edit the file named, then rebuild. Tick each item when done.

## 1. Site settings: `src/config/constants.ts` (the `SITE` object)

| Done | Key | Current default | What happens while it is empty or false | What Dave needs to supply |
| --- | --- | --- | --- | --- |
| [ ] | `SITE.phone` | `""` | Every phone pill, call button and phone row is left out (nav, menu, mobile bar, footer, Contact). | The dedicated business number, written as it should be read, for example `01429 000000`. |
| [ ] | `SITE.availability` | `""` | The availability badge in the Home hero is hidden. | A short line, for example "Taking on new projects for November", and a plan to keep it current (it goes stale fast). |
| [ ] | `SITE.headline` | "Software that fits how your business works." | Always shown. The last word is lime. | Confirm the final headline, or supply a new one. |
| [ ] | `SITE.portrait` | `{ src: "", alt: "" }` | The two photo slots (Home "Hi, I'm Dave" and the About hero) show a designed panel with the mark. | A real photograph from the shoot, portrait 4:5 (at least 800 x 1000), saved under `public/images/`, plus a one-sentence description for `alt`. |
| [ ] | `SITE.introAbout` | "I run Teesside Digital from Hartlepool. I design, build and look after websites, apps and software for businesses across Teesside, and you deal with me from the first chat to long after launch." | Always shown (About lede). | Confirm, or rewrite in Dave's own words. |
| [ ] | `SITE.hours` | `""` | The Hours row on Contact is hidden. | Working hours, for example "Monday to Friday, 9am to 5pm" (the reference showed this, unconfirmed). |
| [ ] | `SITE.replyTime` | `""` | No reply-time promise anywhere (Home contact section and Contact lede). | A full sentence, for example "I reply within one working day." Only if Dave is happy to commit to it. |
| [ ] | `SITE.carePlan` | `""` | "How I work" step 4 reads only "Once it's live, I keep it updated, secure and working." | A sentence on the care plan, for example what it includes. Must match the price guide's care figure if both are used. |
| [ ] | `SITE.ownershipConfirmed` | `false` | The "Yours" fact under "Under the bonnet" is hidden; the FAQ "Do I own what you build?" reads "We'll agree who owns what in writing before any work starts."; the "You own it" line under Bespoke software on /services/ is hidden. | Confirm the ownership terms (for example "Once it's paid for, it's yours") and set to `true`. |
| [ ] | `SITE.aboutBackgroundConfirmed` | `false` | The whole "Background" timeline on About is hidden. | Approve or edit the four entries in `src/pages/about.astro`: "Years ago: Building and taking software apart", "Ongoing: Studying computing (Computing degree with The Open University)", "2026: Founded Teesside Digital", "Now: Building QuoteFlow". Then set to `true`. Check the Open University wording does not imply a completed qualification. |
| [ ] | `SITE.tools` | Python, TypeScript, JavaScript, C++, Java, Lua, HTML and CSS, Astro, SQL, APIs, Netlify, Git, AI models, Automation | Shown on About. An empty list hides the section. | Confirm the list. |

## 2. Price guide: `src/data/pricing.ts`

| Done | Key | Current default | While `false` | What Dave needs to supply |
| --- | --- | --- | --- | --- |
| [ ] | `pricing.confirmed` | `false` | The whole Price guide section on Home, the "Prices" nav link and the "Price guide" menu link are left out. The FAQ cost answer reads "It depends on what you need. You get a fixed written quote before any work starts." (no "few hundred pounds", no price guide sentence). | Real figures for every range below, then set to `true`. |
| [ ] | `pricing.ranges` | Website 800-1,500 / 1,500-3,000 / 3,000-6,000; App 4,000-8,000 / 8,000-15,000 / 15,000-30,000; Automation 400-900 / 900-2,500 / 2,500-6,000; Bespoke 2,500-5,000 / 5,000-12,000 / 12,000-25,000 | Not shown. | Confirm or replace (small, medium, large, in pounds). |
| [ ] | `pricing.extras` | Online booking +400-900; Take payments +300-700; Connect to accounts +400-1,000 | Not shown. | Confirm or replace. |
| [ ] | `pricing.carePerMonth` | `30` | Not shown. | The care plan starting price per month. |
| [ ] | `budgetBands` | Under £1k, £1k–3k, £3k–10k, £10k+, Not sure | **Shown** in step 2 of the enquiry form (they are answer options, not prices). | Confirm the bands. Note: the V2.2 decision of 5 October 2026 had an optional free-text budget with no bands; V4 replaces it with these. |

## 3. Services: `src/data/services.ts`

Each service has `confirmed: false`. While false, its meta row on /services/ hides "Typical time", shows "Price on request", and keeps "Under the bonnet". Set `confirmed: true` per service once its figures are approved.

| Done | Service | Typical time (hidden) | Price guide (hidden) | Under the bonnet (shown) |
| --- | --- | --- | --- | --- |
| [ ] | Websites | 2 to 6 weeks | From £800 | Astro, modern HTML and CSS, Netlify hosting |
| [ ] | Web and mobile apps | 6 to 16 weeks | From £4,000 | Progressive web apps, TypeScript, cloud databases |
| [ ] | Bespoke software | 4 to 12 weeks | From £2,500 | Python, TypeScript, SQL databases |
| [ ] | Automation | 1 to 4 weeks | From £400 | Python, APIs, scheduled jobs |
| [ ] | AI tools | 2 to 6 weeks | Price on request | Leading AI models, connected to your tools |
| [ ] | Integrations | 1 to 4 weeks | Price on request | APIs, webhooks, secure connections |
| [ ] | Security reviews | 1 to 2 weeks | Price on request | Industry checklists, careful manual review |
| [ ] | Support and care | Ongoing | From £30 a month | Monitoring, backups, updates |

## 4. Lighthouse scores: `src/data/scores.ts`

| Done | Key | Current value | What Dave needs to do |
| --- | --- | --- | --- |
| [ ] | `scores` | Measured on the V4 production build (see the file for the date and figures). The rings and the caption "Lighthouse, mobile, measured {date}" show these. Set to `null` to hide the rings. | Re-measure on the live site after go-live and update the figures and date, so the claim stays true. |

Run Lighthouse on teessidedigital.uk straight after go-live.

## 5. Work

| Done | Item | Current state | What Dave needs to supply |
| --- | --- | --- | --- |
| [ ] | Client case studies | None. The Work section shows QuoteFlow (sample data, labelled) and this website, with "Client case studies are on the way." | Real client projects that pass the evidence gate, with permission. |

## 6. Legal and policy pages (wording not changed in this build)

The brief kept the Privacy, Terms and Accessibility wording exactly as it was. V4 changes some of the facts those pages describe, so these statements are now out of date. **They need Dave's approved wording before go-live.**

| Done | Page | Statement | What changed |
| --- | --- | --- | --- |
| [ ] | Privacy, "Cookies and storage" | "If you choose Dark or Light using the theme switch, your browser remembers that choice on your own device..." | V4 has no theme switch. It stores one session-only flag (`td:intro` in `sessionStorage`) so the logo animation plays once per visit. Nothing is sent anywhere. |
| [ ] | Privacy, "What is collected" (enquiry) | "...your name, email address and a description of what you need, and optionally your business name, website address and a budget or spending limit." | The V4 enquiry form asks for: what you need (choices), a budget band, when you would like to start, name, email, and optionally business name and a message. It no longer asks for a website address. |
| [ ] | Privacy, "What is collected" (review) | "...optionally anything you would like Dave to look at." | The review form now has two optional questions: what concerns you about the site (`message`), and what the site is meant to achieve (`goal`, new). |
| [ ] | Privacy, "Last updated" | 13 October 2026 | Update when the wording changes. |
| [ ] | Accessibility, "What has been checked" | "colour contrast ... in both the Dark and Light themes"; the list describes checks on the V2.2 build | V4 is a single dark theme. The checks listed were carried out on V2.2; the V4 checks are in `docs/handover/CURRENT-STATE.md`. |
| [ ] | Accessibility, "Features that help" | "a choice of Dark or Light theme, remembered on your device" | No longer true. |
| [ ] | Accessibility, "Last reviewed" | 13 October 2026 | Update when the wording changes. |

## 7. Other wording to approve

| Done | Where | Text | Why it is listed |
| --- | --- | --- | --- |
| [ ] | Enquiry form, step 4 | "I'll use these details to reply to your enquiry. Please don't include passwords or payment details. Privacy notice" | Not in the V4 reference. Added so the form keeps a privacy notice link, as V2.2 had. |
| [ ] | FAQ, cost answer (while prices are unconfirmed) | "It depends on what you need. You get a fixed written quote before any work starts." | Shortened from the reference so no figure is implied. |
| [ ] | Contact, "What happens next" | "You get a clear proposal with a fixed price." | A commitment: confirm Dave always quotes fixed prices. |
| [ ] | Enquiry and review success messages | "Your enquiry has been received. Dave will review the details and reply by email." | Kept from the shared form engine (third person) as the brief asks, beside first-person marketing copy. |

## 8. Netlify

| Done | Item |
| --- | --- |
| [ ] | Delete any test submissions marked "TEST" in the `enquiry` and `website-review` forms that are still there (see the V4 report). |
| [ ] | Check Netlify registered every field of both forms after the first production deploy: `enquiry` (needs, budget, timing, name, email, business, message) and `website-review` (name, email, website, message, goal). |
