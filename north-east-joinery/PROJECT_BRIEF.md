# PROJECT BRIEF -- North East Joinery (Demo Project)

This file exists so a new Claude Code session has full context without
needing the original planning conversation. Read this in full before
making changes.

---

## 1. WHAT THIS PROJECT IS

North East Joinery is **not a real business**. It is a demonstration
project built by Teesside Digital (a real one-person web development
consultancy, teessidedigital.uk) to showcase design and development
capability to prospective clients.

**This changes how the project must be built, in one specific way:**
the site must be honest about being a demo, persistently and on every
page -- not just a single disclaimer buried somewhere. See Section 4.

The site still needs to be built to full production quality. "It's a
demo" is not licence for lower standards -- if anything the bar is
higher, since this site's entire purpose is to prove build quality to
someone evaluating whether to hire Teesside Digital.

---

## 2. BUSINESS IDENTITY (for content/copy)

- **Name:** North East Joinery
- **Specialism:** bespoke fitted furniture -- wardrobes, kitchens,
  staircases. A focused offering, not "we do everything."
- **Positioning:** premium/craftsmanship-led, not budget. Direct
  communication with the person actually doing the work.
- **Service area:** Hartlepool, Teesside, North East England
- **Differentiator:** experienced tradesperson, fully insured, free
  on-site consultations (adjust/expand as real copy is written, but
  keep it a specific, believable detail -- not vague marketing language)

---

## 3. HONESTY RULES (non-negotiable, inherited from the parent project)

Never fabricate:
- Customer testimonials or reviews
- Statistics, completion counts, years-in-business numbers presented as fact
- Client names, logos, or partnerships
- Before/after project results
- Certifications or awards

If the site needs a testimonial, statistic, or completed-project claim
to feel real, either:
(a) write it clearly labelled as illustrative example content, or
(b) don't include that element at all.

Do not invent fake completed projects and present them as real. The
gallery/portfolio content should either be clearly-labelled example
imagery (sourced per Section 6) or omitted.

---

## 4. DEMO STATUS -- MUST BE VISIBLE EVERYWHERE

Every page must make clear this is a demonstration project, not a live
business. Currently implemented as:

- `src/components/DemoBanner.astro` -- persistent banner included in
  `BaseLayout.astro`, appears above the header on every page. Not
  dismissible. Links back to teessidedigital.uk.
- `src/components/Footer.astro` -- reiterates the demo status in the
  footer, specifically because the footer sits near contact/quote forms
  where someone might otherwise think they're submitting a real enquiry.

**If you add a new page or template, confirm both of these render on
it.** Do not build a page that bypasses `BaseLayout.astro`.

The Quote Request form (not yet built) needs its own explicit note near
the form itself, not just relying on the sitewide banner -- that's the
single place someone is most likely to think they're contacting a real
tradesperson.

---

## 5. TECH STACK

- Astro 5 (static output)
- Tailwind CSS 3.4.1 (NOT v4 -- pinned intentionally, matches the main
  Teesside Digital site)
- React 18, islands only, for genuinely interactive components
- Netlify (hosting + Forms, once a Quote Request form exists)
- No CMS, no database -- content lives in typed `.ts` files under
  `src/data/` (none created yet)

**No domain has been registered yet.** `astro.config.mjs`'s `site`
value is a placeholder guess at a Netlify subdomain
(`https://north-east-joinery.netlify.app`). Update it the moment the
real Netlify site exists and has an actual assigned name, or a real
domain is bought. Canonical tags and the sitemap both derive from this
one value.

`public/robots.txt` currently disallows all indexing sitewide. This is
deliberate -- leave it this way until there's a real domain and a
conscious decision to make the site discoverable. Do not remove this
disallow rule as a side effect of an unrelated change.

---

## 6. IMAGERY

No photos exist yet. When sourcing:

- **Only use Unsplash, Pexels, or Pixabay** (or equivalent genuinely
  free-for-commercial-use, no-attribution-required libraries). Check
  the licence on the actual image page, don't assume.
- **Never use images found via general web/image search results that
  turn out to belong to real, named competing joinery businesses.**
  This happened once already during planning -- a search for
  "carpentry joinery workshop" returned real businesses' actual site
  photos (J Hallam Joinery, Brinard Joinery, etc.), which are
  copyrighted and would also be dishonest to present as this project's
  work. Verify the source of any image before using it.
- Because this is an openly-declared demo (Section 4), using stock
  photography to illustrate "what a site like this could look like" is
  honest. It would NOT be honest to caption stock photos as if they
  were real completed jobs for a real client.

---

## 7. DESIGN SYSTEM (already decided -- do not redesign from scratch)

**Design read:** premium consumer/craft brand, editorial and
material-grounded rather than tech-SaaS minimalism. Deliberately
different from Teesside Digital's own charcoal/tech-consultancy visual
identity -- a joinery brand should not look like an IT consultancy.

### Palette (defined in `tailwind.config.mjs`)

| Name | Hex | Role |
|---|---|---|
| linen | `#F6F2EA` | background |
| ebonised | `#211A14` | text / one deep-contrast section |
| surface | `#ECE4D3` | section/card separation, no shadows needed |
| text-secondary | `#6B5D4A` | muted secondary text |
| brass | `#9C6B2E` | the one controlled accent -- CTAs, key emphasis |
| brass-hover | `#B27F3B` | hover state for brass |
| heritage | `#2B3A2F` | sparing secondary contrast, traditional trade colour |
| border | `#D8CDBA` | hairlines, not heavy shadows |

Deliberately avoids two common AI-generated design tells: (1) warm
cream + serif display + terracotta accent, and (2) near-black + neon
accent. This palette differs from both in the specific accent choices
and pairing.

### Typography

- Display/headlines: **Instrument Sans** -- architectural, geometric
- Body: **Lora** -- warm serif, comfortable reading
- Technical labels only (timber species, dimensions): **IBM Plex Mono**
  -- used sparingly, grounded in real joinery cut-lists/shop drawings,
  not decorative

Currently loaded via Google Fonts `<link>` tags in `BaseLayout.astro`
(see comment there). Self-hosting via `@font-face` is a planned later
performance improvement, not done yet -- the sandbox used to plan this
project couldn't reach Google Fonts' CDN to download the actual font
files.

### Layout principles

- Asymmetric editorial hero (large left-aligned headline + full-bleed
  image), not a centred hero over a gradient
- No repeated identical three-card grids for services -- each
  capability gets distinct visual treatment
- No numbered markers (01/02/03) on non-sequential content like a
  services list -- only use numbering where content is genuinely a
  sequence (e.g. an actual process/timeline)
- One orchestrated hero motion moment is fine; avoid scroll-triggered
  fade-in-on-every-section, which reads as generic
- Respect `prefers-reduced-motion` (already wired into `globals.css`)

---

## 8. SITE STRUCTURE (planned, not all built yet)

1. Home (`/`) -- currently a placeholder scaffold page, needs real hero/services/gallery
2. Services (`/services`)
3. Gallery (`/gallery`)
4. About (`/about`)
5. Quote Request (`/quote`) -- multi-step form, React island, Netlify Forms
6. Contact (`/contact`)
7. Optional: Case studies

**Currently built:** config files, `globals.css`, `DemoBanner.astro`,
minimal `Header.astro`/`Footer.astro` (functional skeleton, not final
design), `BaseLayout.astro`, placeholder `index.astro`. Confirmed to
build cleanly with `npm run build`.

**Not built yet:** every page's real content and design, the Quote
Request form, any `.ts` data files under `src/data/`.

---

## 9. KNOWN BUG PATTERNS TO ACTIVELY AVOID

These are real bugs that happened while building the parent Teesside
Digital site. Watch for the same category of mistake here:

- **Invalid Tailwind utility classes fail silently.** Tailwind only
  generates CSS for class names matching its actual scale. A class like
  `opacity-3` (not a real step in Tailwind's default scale) generates
  nothing at build time -- no error, no warning -- leaving the element
  at its default value instead. This exact bug shipped a broken mobile
  hero on the main site. For any non-standard percentage/value, use
  arbitrary-value syntax (`opacity-[0.03]`), which bypasses the named
  scale entirely and is guaranteed correct.
- **Component prop names must be verified against the actual component
  definition, not assumed from memory.** The parent project shipped
  several silently-broken pages because call sites used prop names
  (`canonicalURL` vs `canonical`, `variant="dark"` vs `background`,
  `headline` vs `title`) that didn't match what the component actually
  accepted. Astro/TypeScript did not catch these at the time; always
  check the component's actual `interface Props` before calling it.
- **Desktop-only review misses real mobile bugs.** Actually resize to
  320px/375px/390px/768px and scroll the whole page, don't just check
  desktop width and assume responsive classes handle the rest.
- **Netlify only detects forms present in static build-time HTML.** A
  form that only renders conditionally via client-side JavaScript (e.g.
  after a React state change) will never be detected by Netlify's form
  scanner, no matter how many times you redeploy. The fix is a hidden,
  always-present static form with matching `name` and field `name`
  attributes, purely so the build-time scanner has something to
  register.
- **A working form submission does not mean the notification email
  will arrive.** These are independent links in a chain: form detected
  -> submission captured -> notification rule configured -> DNS mail
  records (MX/SPF/DKIM/DMARC) actually correct for the receiving
  domain. If a Quote Request form is built here and mail notifications
  matter, all of these need independent verification, not just "it
  submitted successfully."

---

## 10. HOW DAVE WORKS (communication/learning preferences)

- CS student, wants to understand the "how" and "why," not just get
  working code handed over. Explain reasoning, trade-offs, and
  alternatives when making non-trivial technical decisions.
- British English spelling/grammar throughout, including code comments
  and commit messages.
- ASCII punctuation only: straight quotes, hyphens not em dashes, three
  full stops not a Unicode ellipsis character.
- Direct, honest, no corporate waffle. Push back on bad ideas rather
  than agreeing by default.
- WCAG 2.2 AA target: semantic HTML, keyboard nav, visible focus,
  labelled forms, reduced motion support.
- Test mobile-first, actually, not as an afterthought -- 320px through
  1920px.

---

## 11. IMMEDIATE NEXT STEPS

1. Confirm the real Netlify site exists and update `astro.config.mjs`'s
   `site` value accordingly.
2. Source real stock photography per Section 6.
3. Build the real homepage (hero, services, gallery preview) against
   the design system in Section 7 -- replace the current placeholder
   `index.astro`.
4. Build out the remaining pages in Section 8.
5. Build the Quote Request form as a React island, including the hidden
   static-form workaround from Section 9, and the demo-status note
   specific to that page from Section 4.
