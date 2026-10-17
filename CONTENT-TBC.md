# Content to confirm before go-live

Every item the V4 reference marked `TBC`, and what has happened to it. Each unconfirmed item has a safe default: while it is empty or `false`, the content that depends on it stays off the site, so nothing unconfirmed or invented goes live. No `TBC` tag is ever rendered.

To change a value, edit the file named, then rebuild.

## Still open

| Done | Item | Where | Current state | What Dave needs to supply |
| --- | --- | --- | --- | --- |
| [ ] | Phone number | `SITE.phone` in `src/config/constants.ts` | `""`: every phone pill, call button and phone row is left out | The dedicated business number, written as it should be read |
| [ ] | Working hours | `SITE.hours` | `""`: the Hours row on Contact is hidden | Hours, for example "Monday to Friday, 9am to 5pm" |
| [ ] | Photograph | `SITE.portrait` | Empty: the Home and About photo slots show the designed mark panel | A real 4:5 photograph (at least 800 x 1000) under `public/images/`, plus a one-sentence `alt` |
| [ ] | Price guide estimator | `pricing.confirmed` and figures in `src/data/pricing.ts` | `false`: the Home price guide, the "Prices" nav link and the "Price guide" menu link are hidden | Real ranges for every type and size, the extras and the monthly care figure, then set `confirmed: true` |
| [ ] | Lighthouse on the live site | `src/data/scores.ts` | Local production build figures, 17 October 2026 | Run Lighthouse on teessidedigital.uk straight after go-live, and update the figures and date |
| [ ] | Client case studies | Work section on Home | None; the section says "Client case studies are on the way." | Real client projects that pass the evidence gate, with permission |
| [ ] | Netlify forms after go-live | Netlify dashboard | Both forms registered with every V4 field | Check one real submission per form after the first production deploy |

## Confirmed by Dave, 17 October 2026

| Item | Where | Value |
| --- | --- | --- |
| Headline | `SITE.headline` | "Software that fits how your business works." |
| Availability badge | `SITE.availability` | "Taking on new projects" |
| Reply time | `SITE.replyTime` | "within two working days", rendered as "I'll reply within two working days." on the Contact lede and the Home contact section |
| Care plan | `SITE.carePlan` | "Care plans start from £30 a month and cover hosting, security updates, backups, uptime checks and small changes when you need them." (How I work, step 4) |
| Ownership | `SITE.ownershipConfirmed` | `true`: the "Yours" fact, "You own it" under Bespoke software, and the FAQ answer on ownership |
| Background timeline | `SITE.aboutBackgroundConfirmed`, `src/data/background.ts` | `true`: seven entries, from early web development (2005-2007) to building QuoteFlow |
| Tools | `SITE.tools` | Python, TypeScript, JavaScript, Node.js, HTML and CSS, Tailwind CSS, Astro, SQL, APIs, Git, Netlify, Playwright, Claude, ChatGPT, Other AI models |
| About intro | `SITE.introAbout` | Kept as written |
| FAQ: cost | `src/components/ui/Faq.astro` | "It depends on what you need. Small websites start from £800, and bigger systems cost more. You get a fixed written quote before any work starts." The price guide sentence appears only on Home, and only once `pricing.confirmed` is true |
| FAQ: after go-live | `src/components/ui/Faq.astro` | "...on a monthly care plan from £30 a month, or you can call on me when you need me." |
| Typical times | `src/data/services.ts` (`timeConfirmed`) | All eight: Websites 2 to 6 weeks; Web and mobile apps 6 to 16 weeks; Bespoke software 4 to 12 weeks; Automation 1 to 4 weeks; AI tools 2 to 6 weeks; Integrations 1 to 4 weeks; Security reviews 1 to 2 weeks; Support and care Ongoing |
| Price guides | `src/data/services.ts` (`priceConfirmed`) | Websites from £800; Bespoke software from £2,500; Automation from £400; Support and care from £30 a month; Web and mobile apps, AI tools, Integrations and Security reviews: Price on request |
| Budget bands | `budgetBands` in `src/data/pricing.ts` | Under £1k, £1k–3k, £3k–10k, £10k+, Not sure |
| Phone and hours | `SITE.phone`, `SITE.hours` | Stay empty for now (see Still open) |
| Legal pages | Privacy, Accessibility | Wording corrected for V4 (see the V4 fix run in `docs/handover/CURRENT-STATE.md`) |
