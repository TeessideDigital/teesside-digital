# Teesside Digital V4 - full site build brief for Claude Code

Author: Claude Chat (design lead), 17 October 2026. Approved by Dave.

## 0. How to run this job

- **Do the whole job in one continuous run.** Work through every phase in section 13 without stopping for approval between phases. Commit at the end of each phase. Only stop and ask if something is genuinely blocked: a missing credential, a destructive action, or a contradiction you can't resolve from this brief and the reference files.
- **Source of truth for the look and behaviour:** the six reference pages in `design/v4-reference/reference/` (section 1). Match them closely: layout, spacing, type scale, colours, copy, motion and interactions. Where this brief and a reference page disagree, **this brief wins**.
- **Never push to `main`, and never publish to production.** Work on `redesign/v4` and use a Netlify branch deploy for review. Dave says "go live" separately.
- When finished, write the report described in section 14.

## 1. Inputs

The package is already in the repository:

```
design/v4-reference/
  BRIEF-V4-BUILD.md       this brief
  reference/
    index.html            homepage (approved V3 design + new logo)
    services.html
    about.html
    contact.html
    website-review.html
    404.html
  brand/                  final logo set (SVG, PNG, ICO, OG image)
design/td-v4-handoff.zip  the original download; don't commit it (add it to .gitignore)
```

Wherever this brief says "the reference pages" or names a file like `index.html`, it means `design/v4-reference/reference/`. Wherever it says `brand/`, it means `design/v4-reference/brand/`.

- Exclude `design/` from the build output and from the sitemap.
- The reference pages are self-contained prototypes. They use inline CSS and JS, Google Fonts and `TBC` tags. **None of that ships as-is.** Rebuild them properly as Astro components (section 4 onwards), and never reference `design/` from production code.

## 2. Branch, safety and what stays

**Branch:** create `redesign/v4` from current `main` (`f61bbcb` or later). Keep `redesign/v2` untouched as the fallback.

**Keep and reuse:**
- Stack and hosting:
  - Astro (static output), TypeScript, Tailwind 3 (no upgrade in this job), Netlify.
  - Node 24.
  - `netlify.toml`, including security headers, HSTS and the 301 redirects for V1 URLs.
- Forms: Netlify Forms `enquiry` and `website-review`, with the **same form names** and the shared form engine, extended as needed (section 7.8).
- Content and config:
  - The `SITE` config object. Extend it; don't replace it (section 8).
  - The legal page content: Privacy, Terms and Accessibility. Restyle them into the V4 shell and **do not change their wording**.
  - Sitemap, robots and canonical URLs.
- Policy:
  - Strict CSP with script hashes. Regenerate the hashes for the new inline scripts. No `unsafe-inline` for scripts.
  - No third-party requests in production. Fonts are self-hosted, with no analytics, trackers or external embeds.

**Remove:**
- The V2.2 visual layer: the Instrument Serif, Instrument Sans and IBM Plex Mono fonts, the slate and amber tokens, and the old service-card drawings.
- The Light/Dark theme toggle. V4 is a single dark theme by design.
- Any component no longer used. Leave the repository clean.

**Voice change (approved by Dave):** marketing pages switch from third person ("Dave") to **first person ("I")**, exactly as written in the reference pages. Two exceptions:
- **Website review page:** keep its approved third-person copy as in the reference.
- **Legal pages:** stay as they are.

## 3. Design system

### 3.1 Colour tokens (single dark theme)

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#0b0d0f` | page background |
| `--ink-2` | `#111417` | alternate bands |
| `--panel` | `#14181b` | cards, panels, inputs |
| `--line` | `rgba(255,255,255,.09)` | hairlines |
| `--line-2` | `rgba(255,255,255,.16)` | stronger borders |
| `--fg` | `#eef0ee` | primary text |
| `--fg-2` | `#b9bfbc` | body secondary |
| `--fg-3` | `#8d9591` | labels |
| `--fg-4` | `#6c7370` | inactive list items |
| `--lime` | `#d4ff3f` | brand accent: actions, emphasis, focus |
| `--lime-ink` | `#0b0d0f` | text on lime |
| warning | `#ffab94` text / `rgba(255,140,110,.4)` border | form errors, "urgent" chips only |

- Set `color-scheme: dark`.
- Lime is **never** used as text on a light background.
- Use the tokens through Tailwind theme extension or CSS variables. No stray hex values in components.

### 3.2 Type

- **Display and body:** Schibsted Grotesk, weights 400 to 800. Self-host the latin subset as WOFF2, either from `@fontsource/schibsted-grotesk` or the variable font, and preload the 700 weight.
- **Labels and mono:** JetBrains Mono, weights 400, 500 and 700. Self-host it.
- **Fallbacks:** `'Helvetica Neue', Arial, sans-serif` and `ui-monospace, Menlo, monospace`. Use metric-matched `size-adjust` fallbacks to avoid layout shift if practical.
- **Scale:** follow the reference pages:
  - H1: `clamp(46px, 6.4vw, 92px)`, line-height .96, letter-spacing -.045em.
  - H2: `clamp(36px, 4.6vw, 64px)`.
  - Labels: mono 12px, uppercase, letter-spacing .08em, with an 8px lime square before them.

### 3.3 Surfaces and details

- **Radii:**
  - 3px on buttons.
  - 6 to 10px on panels.
  - 999px only for pills and chips.
- **Grain:** a fixed SVG-noise overlay at opacity .18 with `mix-blend-mode: overlay`, as in the reference. It's decorative, so give it `aria-hidden` and `pointer-events: none`.
- **Container:** max-width 1440px, side padding `max(clamp(16px, 5vw, 72px), env(safe-area-inset-*))`.
- **Easing:** `cubic-bezier(.2,.7,.1,1)` (`--ease`) everywhere.

### 3.4 Motion rules

- All motion lives behind `@media (prefers-reduced-motion: no-preference)`. Under `reduce`, everything is static: no marquee, no typing animation, no wiggle, no count-up.
- Content must never depend on JavaScript to be visible (section 7.1).

## 4. Brand assets (logo R1, final)

From `design/v4-reference/brand/`:

| File | Use |
| --- | --- |
| `td-mark-dark.svg` | the mark on dark backgrounds (white T, lime D, pixel trail). **Primary.** |
| `td-mark-light.svg`, `td-mark-mono-*.svg`, `td-mark-lime-ink.svg` | alternates (light backgrounds, one-colour) |
| `td-lockup-horizontal-dark/light.svg` | mark + "Teesside Digital" (text outlined) |
| `td-lockup-stacked-dark/light.svg` | mark + TEESSIDE / DIGITAL |
| `favicon.svg`, `favicon.ico`, `favicon-32.png`, `favicon-48.png` | favicons |
| `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png` | touch and manifest icons |
| `og-image.png` (1200x630) | default social share image |
| `social-avatar.png` / `.svg` (400) | for LinkedIn, Google Business Profile and similar |

**How to use them:**
- Build a `<Logo>` component that inlines `td-mark-dark.svg`. Give the mask a unique id per instance, because the knockout uses an SVG mask. The nav shows the mark at about 44x37px next to the text "Teesside Digital" (Schibsted 700, 19px, letter-spacing -.02em). The menu drawer shows the mark alone at about 52px.
- Add `site.webmanifest` with the icons and `theme_color: #0b0d0f`.
- Use `og-image.png` as the default OG/Twitter image on every page.

**Logo intro animation:** the mark scales and rotates in on page load (`markIn`, .9s), and the wordmark slides in at .35s. **Run it on the first page view in a session only**, using `sessionStorage` wrapped in try/catch. It should not replay on every page navigation.

## 5. Global shell (every page)

1. **Scroll progress:**
   - A fixed 2px lime bar at the very top.
   - It shows `scrollY / (scrollHeight - innerHeight)` as `scaleX`.
   - Use `aria-hidden`.

2. **Floating pill nav:**
   - **Position:** sticky at `top: calc(env(safe-area-inset-top) + 14px)`, inset from the edges, max-width 1360px, height 72px, radius 999px.
   - **Look:** background `rgba(20,24,27,.72)` with backdrop blur, a 1px `--line` border and a soft shadow.
   - **On scroll** (`scrollY > 8`): add `.scrolled`, which raises the background to .9, uses `--line-2` and reduces the height to 64px.
   - **Left:** the Logo, linking to `/`.
   - **Centre:** links to Services (`/services`), Work (`/#work`), Prices (`/#prices`), About (`/about`) and Contact (`/contact`). Hover shows an animated lime underline. The current page gets `aria-current="page"` with the underline shown.
   - **Right:** a phone pill (number plus a lime round call button) and the menu button (three bars in a 48px rounded square).
   - **Phone pill:** render only when `SITE.phone` is set. Otherwise omit it entirely, along with every other call button (section 8).
   - **At 1000px and below:** hide the centre links.
   - **At 760px and below:** the pill is 62px tall and the phone becomes an icon-only button.
   - **View transitions:** give the nav `view-transition-name: sitenav` so it stays put during page transitions.

3. **Menu drawer**, opened by the three-bar button:
   - **Panel:** slides in from the right, `min(560px, 100%)` wide, with a gradient background, over a blurred scrim.
   - **Contents:**
     - The mark and a close button. The close button rotates 90 degrees on hover.
     - Large links: Home, Services, Work, Live demo (`/#demo`), Price guide (`/#prices`), About, Website review (with a small mono "FREE"), Contact. The current page is shown in lime.
     - At the foot: a "Start a project" outline pill linking to `/contact`, the phone pill (only if a phone number is set) and the email.
   - **Animation:** the links stagger in (`up` keyframes, 50ms apart).
   - **Behaviour:**
     - Esc, a scrim click, the close button or choosing a link all close it.
     - Focus moves to the close button on open and returns to the menu button on close.
     - Tab is trapped inside the drawer while it's open, and body scroll is locked.
     - `aria-expanded` and `aria-controls` are set on the button. Use `role="dialog"`, `aria-modal` and `aria-label="Menu"`.

4. **Footer:**
   - **Grid:** a lead line ("Websites, apps and software for businesses across Teesside."), then three columns:
     - Services: links to the `/services` anchors, plus "Free website review".
     - Areas: Hartlepool, Stockton-on-Tees, Middlesbrough, Darlington, Redcar and Billingham.
     - Contact: email, the phone if set, "Start a project" and "About Dave".
   - **Wordmark:** a large outlined "Teesside Digital" (`-webkit-text-stroke`, transparent fill), sized `clamp(44px, 10vw, 150px)`. The stroke turns lime-tinted when the footer is hovered.
   - **Bottom bar:** © year Teesside Digital, Hartlepool; links to Privacy, Terms and Accessibility; and a "Back to top" button that scrolls smoothly, or jumps under reduced motion.

5. **Sticky mobile bar (760px and below only):**
   - Fixed at the bottom, respecting the bottom safe-area inset.
   - Contains a "Start a project" button and a call button (only if a phone number is set).
   - Slides in once the page hero has scrolled out of view, and hides while the contact section or form is in view and while the drawer is open.
   - Add bottom padding to the footer so the bar never covers it.

6. **Page transitions:**
   - Use the CSS cross-document View Transitions API (`@view-transition { navigation: auto; }`): the old page fades up and out (.3s), the new page fades in from 18px below (.55s).
   - Turn it off under reduced motion.
   - **Do not** use Astro's ClientRouter or SPA mode. Pages stay fully static.

## 6. Pages

**Copy:** use the exact copy from the reference pages unless a section below says otherwise. Every `TBC` tag in the reference marks unconfirmed content: handle it through config as section 8 describes, and never render the tag itself.

### 6.1 Home (`/`): `index.html` reference

1. **Hero.**
   - **Availability badge:** a pill with a pulsing lime dot (`ping` animation). Text comes from `SITE.availability`; hide the badge if that's empty.
   - **Text:** the label "Hartlepool, Teesside", then the H1 "Software that fits how your business works.", with "works." in lime.
     - The H1 comes from `SITE.headline`. The default is that text, because Dave may change it.
     - Each word fades up with a 60ms stagger.
   - **Lede:** as in the reference.
   - **Buttons:** "Tell me what you need" (lime, magnetic, linking to `#contact`) and "See what I build" (outline, linking to `#build`).
   - **Founder line:** as in the reference.
   - **Right column, "Sound familiar? Tap one":** six question buttons, each with a plus icon. Tapping one reveals its answer bubble underneath (`aria-expanded` and `aria-controls`; the plus rotates 45 degrees). Use the six questions and answers exactly as in the reference.
   - **Load sequence:** the questions pop in one by one (starting at .8s, .35s apart), then a typing indicator (three bouncing dots) shows for about 1.3s, then the lime reply "I can help with all of these." links to `#build`.
   - **Cursor glow:** a soft lime radial glow follows the pointer within the hero. Fine pointers only, and off under reduced motion.

2. **Services marquee strip:**
   - Shows the eight service names in mono uppercase, with lime square separators.
   - Loops infinitely over 48s and pauses on hover.
   - Under reduced motion, show a static wrapped list instead.

3. **"See the difference": before and after slider.**
   - Use the copy from the reference.
   - **Stage:** a 16:9 box (4:3 at 760px and below) using `container-type: inline-size`.
     - **Both mock sites are built in HTML and CSS with `cqw` units, no images.**
     - Left: the "old" Example Plumbing site (Comic Sans banner, scrolling marquee, visitor counter, "Under construction").
     - Right: the "new" site (headline, booking slots, ticks).
   - **Control:**
     - The old site is clipped with `clip-path: inset(0 calc(100% - var(--pos)) 0 0)`.
     - A transparent full-size `<input type=range>` sits on top for dragging and keyboard use, with `aria-label` as in the reference.
     - The visual handle is a lime line with a 52px knob showing arrow icons.
     - BEFORE and AFTER tags sit in the bottom corners.
   - **Hint:** the first time the slider is half in view, animate it 50 → 28 → 72 → 50 over about 1.9s. Run this once, and not under reduced motion.
   - **Note under it:** "Example business made up for illustration. Not a real company or client."

4. **"What I build":**
   - **Layout:** the eight services as a vertical tablist on the left, with a sticky detail panel on the right.
   - **Selection:** hover (fine pointers only) or click selects a service.
     - Arrow keys move between tabs (roving tabindex).
     - The selected tab indents 14px and shows a lime arrow.
     - The panel animates in (`panelIn`).
   - **Panel contents:** an animated line illustration (port the eight SVGs and their animation classes: `spin`, `pulse`, `twinkle`, `draw`, `nudge`, `blink`, `hand` and `rise1`), the name, a description and "Good for" chips.
   - **Link:** "All services in detail →" goes to `/services`.
   - **At 760px and below:** it becomes an accordion, with each panel moving directly after its tab. Do this with markup that works at both sizes, or by moving the DOM nodes on a `matchMedia` change.

5. **"Try it": enquiry demo.** See section 7.5.

6. **"Work".** Two cards:
   - **QuoteFlow:** tags "My own product" and "In development"; a mini quote screenshot labelled SAMPLE DATA. The figures are 1,450.00 + 612.00 + 180.00 = 2,242.00 net, £2,690.40 including 20% VAT.
   - **This website:**
     - The tag "Live".
     - Three score rings for Performance, Accessibility and Best practices that fill when scrolled into view.
     - **The ring values must be real.** Run Lighthouse (mobile) on the finished V4 production build and put the actual scores in `src/data/scores.ts`, with the date. Add a small caption: "Lighthouse, mobile, measured {date}". If you can't measure, hide the rings.
   - Intro: "Client case studies are on the way. In the meantime, here's my own work."

7. **"How I work":**
   - Four steps: Talk, Plan, Build, Look after.
   - A lime progress line grows across as the section scrolls into view. Use the scroll-driven `animation-timeline: view()` where supported; otherwise show it full width.
   - **At 760px and below:** a vertical timeline.
   - Step 4's care-plan detail comes from `SITE.carePlan`. If that's empty, use the reference sentence without the extra detail.

8. **"Price guide" (`id="prices"`):** see section 7.6.

9. **"Under the bonnet":**
   - Four facts: Fast, Secure, Joined up, Yours.
   - **"Yours" ("You own what I build for you.") renders only when `SITE.ownershipConfirmed` is true.** Otherwise show three facts.
   - The isometric layered-stack graphic: port the inline SVG from the reference. At 760px and below, hide the SVG text labels and show the HTML legend list instead.

10. **"Hi, I'm Dave" teaser:**
    - Photo slot (section 8), copy and "More about me →" linking to `/about`.

11. **"Questions" (`id="faq"`):**
    - Six `<details>` items with a rotating plus icon and the answer fading up.
    - Answers that mention pricing or ownership read from config (section 8).

12. **Contact (`id="contact"`):**
    - Left: the heading, copy and email.
    - Right: the four-step form (section 7.8).
    - Background: the Hartlepool contour map, a static inline SVG ported from the reference, drifting slowly (30s alternate).

**On Home, nav links that point at sections use same-page anchors** (`#work` rather than `/#work`).

### 6.2 Services (`/services`): `services.html` reference

- **Page hero:**
  - The label "Services" and the H1 "Everything your business needs. One person to build it." (with "One person" in lime).
  - A lede, then jump chips linking to the anchors `#websites`, `#apps`, `#software`, `#automation`, `#ai`, `#integrations`, `#security` and `#care`.
- **Eight service sections**, each with the same structure:
  - A sticky illustration tile (animated), the H2 and the pitch.
  - Two columns: "What you get" and "Good for".
  - A three-cell meta row: Typical time, Price guide and Under the bonnet.
  - A text link: "Talk to me about {service} →" goes to `/contact`.
  - Section padding as in the reference, and `scroll-margin-top: 90px`.
- **Where the figures come from:** read Typical time, Price guide and Under the bonnet from `src/data/services.ts` (section 8). Put the reference values in as defaults, with each one flagged `confirmed: false`.
- **Band at the end:** "Not sure which one you need?" plus a CTA.

### 6.3 About (`/about`): `about.html` reference

- **Hero:**
  - Two columns: the H1 "Hi, I'm Dave. I build the tech behind local businesses." (with "the tech" in lime), the lede and two buttons.
  - On the right, a large 4:5 photo slot (section 8).
- **"How I work" values**, a 2x2 grid:
  - One person, start to finish.
  - Plain English, always.
  - Honest advice.
  - Here after launch.
- **"Background" timeline:**
  - Four entries as in the reference.
  - **The whole section renders only when `SITE.aboutBackgroundConfirmed` is true**, because Dave still has to approve what to share.
- **"Tools I use":**
  - Mono tags, read from `SITE.tools`, which defaults to the reference list.
  - Hide the section if that list is empty.
- **"Where I work":** a panel with copy, town chips and the contour map.
- **Band** with a CTA to Contact.

### 6.4 Contact (`/contact`): `contact.html` reference

- **Hero:** the H1 "Let's talk about what you need." (with "what you need." in lime).
- **Grid:**
  - Left: the four-step form (section 7.8).
  - Right: the details column:
    - Email.
    - Phone, only if set.
    - Based in: "Hartlepool, Teesside", plus the meeting note.
    - Hours, from `SITE.hours`; hide the row if empty.
    - "What happens next": three numbered steps.
- **Band:** "Just want a second opinion?" goes to `/website-review`.
- **FAQ:** the same component as on Home.

### 6.5 Free website review (`/website-review`): `website-review.html` reference

- **Copy:** use the approved copy exactly. It's third person, and the exclusions come before the form.
- **Opening:**
  - The H1, the lead, two fact panels, and the "Request a website review" button linking to `#request`.
  - **Focus behaviour:** activating that link moves focus to the "Request a review" heading (`tabindex="-1"`).
- **Request form:**
  - Name and Email side by side, then Website address, then two optional textareas.
  - It keeps the **existing `website-review` Netlify form and field names**. Map the new layout onto the existing fields, and add fields only if the engine already supports them.
  - Validation messages as in the reference.
  - **Success message**, shown only when the submission is confirmed: "Your review request has been received. Dave will review the website and email you the report."
- **Band:** "Already know what you need?" goes to `/contact`.

### 6.6 Privacy, Terms and Accessibility

Put them in the V4 shell with a page hero (label plus H1) and a readable prose column (about 68ch, body 17px, `--fg-2`, with headings in Schibsted). **The wording doesn't change.**

### 6.7 404

- An outlined "404" floating gently, then "This page has gone walkabout.", a line of copy and three buttons.
- Keep it `noindex`, and keep the Netlify 404 behaviour.

## 7. Interactions: technical detail

**Write the page scripts as small vanilla TypeScript modules**, one per feature, loaded only on pages that use them. No frameworks, and no client-side libraries.

1. **Reveal on scroll:**
   - Elements marked `.reveal` are visible by default.
   - On load, script adds `.pending` (opacity 0, translateY 28px) **only** to elements whose top is below 92% of the viewport height.
   - An IntersectionObserver (rootMargin `0px 0px -8% 0px`, threshold .08) removes `.pending`.
   - A 12-second safety timeout reveals everything.
   - Skip all of this under reduced motion.

2. **Magnetic buttons:** primary `.btn` elements follow the pointer slightly (up to 8px x, 6px y). Fine pointers only, off under reduced motion, and reset on pointerleave.

3. **Score rings:** stroke-dashoffset animates from 226 to `226 - 226 × v / 100` over 1.6s when 40% of the ring is in view.

4. **Before and after:** see section 6.1, item 3.

5. **Enquiry demo** ("Watch an enquiry sort itself"):
   - **Port the rules engine exactly from `index.html`** (the `analyse()` function): type detection, urgency, the extraction regexes for service, when, phone, email and name, and the reply templates.
   - Keep it **fully client-side**. It sends nothing anywhere, and it must say so in the note under it.
   - **The output reveals step by step:**
     1. The status reads "READING MESSAGE…".
     2. Rows appear 380ms apart: Type, Urgency, Picked out and Draft reply.
     3. The status changes to "DRAFTING REPLY…".
     4. The reply types out, 2 characters every 16ms, with a blinking lime caret.
     5. The status ends on "DONE. READY FOR YOU TO SEND".
   - Under reduced motion, show the result instantly.
   - Three preset chips load an example and run it.
   - **Initial state:** show the pre-filled Sarah example with its result already rendered, so the section is complete before anyone interacts.
   - Escape all user text before inserting it into the page.
   - Use `aria-live="polite"` on the output.

6. **Price guide:**
   - **Inputs:** radio chips for type (Website, Web or mobile app, Automation, Bespoke software) and size (Small, Medium, Large), plus checkboxes for the extras (Online booking, Take payments, Connect to accounts, Ongoing care).
   - **Output:** the range counts up or down over 500ms with an ease-out cubic (instantly under reduced motion), plus a list of the chosen items. "Ongoing care" adds the line "Plus ongoing care from £{carePerMonth} a month."
   - **All figures come from `src/data/pricing.ts`.** Put in the reference numbers as defaults:
     - Website: 800–1,500 / 1,500–3,000 / 3,000–6,000.
     - App: 4,000–8,000 / 8,000–15,000 / 15,000–30,000.
     - Automation: 400–900 / 900–2,500 / 2,500–6,000.
     - Bespoke: 2,500–5,000 / 5,000–12,000 / 12,000–25,000.
     - Extras: booking +400–900, payments +300–700, accounts +400–1,000.
     - Care from £30 a month.
   - Use `pricing.confirmed = false`.
   - **The whole Price guide section, its nav and drawer links, and the FAQ cost answer's reference to it all render only when `pricing.confirmed` is true.** This stops placeholder prices going live.
   - **"Get a proper quote"** links to `#contact` and pre-ticks the matching need in the contact form (website, app, automation or software).
   - Use `aria-live` on the output, and format money as en-GB.

7. **FAQ:** native `<details>`/`<summary>`. No script needed apart from styling.

8. **Four-step contact form** (Home `#contact` and `/contact`):
   - **Steps:**
     1. Needs: multi-select chips (8 options).
     2. Budget: radios.
     3. Timing: radios.
     4. Details: Name (required), Email (required, validated), Business (optional), Message (optional).
   - **Navigation:**
     - The header shows "Step n of 4" and the step label, with a lime progress bar at n × 25%.
     - Next stays disabled until the current step is valid. Back appears from step 2.
     - Each step animates in.
     - At step 4 the button reads "Send".
   - **Errors** are written in plain English, set `aria-invalid` and move focus to the field. Use the messages from the reference.
   - **Submission:**
     - Submit to the **existing Netlify `enquiry` form** using the shared form engine.
     - Send every answer: needs (comma-joined), budget, timing, name, email, business and message. Keep the honeypot.
     - Make sure the build-time form definition includes every field, so Netlify registers them.
   - **Success:** a lime tick that draws itself, "Thanks, {first name}.", a summary of the answers, and the confirmed-only success wording from the engine. Show success **only** after the submission is confirmed. Show the engine's error state if it fails.
   - **Without JavaScript:** all four groups show as one ordinary form that still submits. This is progressive enhancement: script adds the stepping.
   - Budget band labels come from `src/data/pricing.ts` (`budgetBands`).

9. **Mobile bar visibility:** see section 5, item 5.

10. **Session logo intro:** see section 4.

## 8. Content, config and placeholders

Extend `src/data/site.ts` (or the existing `SITE` module) and add `src/data/pricing.ts`, `src/data/services.ts` and `src/data/scores.ts`. **Nothing marked TBC in the reference may reach production as a TBC tag or as an invented fact.**

| Config key | Default | When empty or false |
| --- | --- | --- |
| `SITE.phone` | `''` | hide every phone pill and call button |
| `SITE.availability` | `''` | hide the hero badge |
| `SITE.headline` | "Software that fits how your business works." | always set |
| `SITE.portrait` | existing value (empty) | photo slots show a designed placeholder panel: the mark large on `--panel`, with no "TBC" text |
| `SITE.introAbout` | reference lede, without the TBC | always set |
| `SITE.hours` | `''` | hide the Hours row |
| `SITE.replyTime` | `''` | drop the reply-time sentence |
| `SITE.carePlan` | `''` | step 4 uses the base sentence |
| `SITE.ownershipConfirmed` | `false` | hide the "Yours" fact and soften the FAQ answer to "We'll agree who owns what in writing before any work starts." |
| `SITE.aboutBackgroundConfirmed` | `false` | hide the Background timeline |
| `SITE.tools` | reference list | hide the section if empty |
| `pricing.confirmed` | `false` | hide the price guide section and its links; the FAQ cost answer drops the "price guide above" sentence |
| `services.*.confirmed` | `false` | the meta row shows "Typical time", "Price on request" and the tools; hide time and price until confirmed |
| `scores` | measured values + date | hide the rings if missing |

**Produce `CONTENT-TBC.md`** at the repository root, listing every unconfirmed item: the key, the file, the current default and what Dave needs to supply. This is the checklist Dave works through before go-live.

## 9. Accessibility (WCAG 2.2 AA)

- **Semantic landmarks:** one `h1` per page and a logical heading order.
- **Skip link:** add one to `#main`.
- **Focus:** visible focus everywhere (2px lime outline with 3px offset). No keyboard traps, except inside the open drawer, where trapping is intended.
- **Contrast:** all text meets AA against its background.
- **Controls:**
  - The slider, tabs, accordion, FAQ, form steps and drawer all work by keyboard alone, with correct ARIA.
  - Live regions as specified.
  - Touch targets at least 44px.
- **Motion:** honour reduced motion fully.
- **Hidden content:** decorative SVGs get `aria-hidden`. Mock sites in the before/after are `aria-hidden`, and the range input carries the label.

## 10. Performance, security and SEO

- **Lighthouse (mobile) on Home, Services, About, Contact and Website review:** Performance at least 95, and Accessibility, Best practices and SEO all 100. CLS under 0.05.
- **Page weight:** keep JavaScript per page small, roughly 25 KB gzipped or less. Inline SVGs are fine. The contour map should be one shared static SVG asset or component, not duplicated in the JavaScript.
- **Fonts:** subset them, preload only what the first view uses, and use `font-display: swap`.
- **CSP:** regenerate the script hashes for every inline script, or move scripts to external hashed files. Check the CSP doesn't block the view transitions, the forms or the SVG masks.
- **SEO and metadata:**
  - A unique title and meta description per page. Write them in plain English, under 60 and 155 characters.
  - Canonical URL, OG/Twitter tags with `og-image.png`, favicons and the manifest.
  - Keep any existing structured data and update its logo URL.
  - Update the sitemap with the new pages and keep 404 out of it.

## 11. Testing (do all of it)

1. `npm run build` passes with no warnings you introduced. Type-check and lint pass.
2. **Playwright smoke tests at 390, 768 and 1440 widths on every page:**
   - No console errors.
   - No horizontal overflow.
   - The nav, drawer (open, Esc, focus return), slider (keyboard and drag), service tabs and accordion, demo (all three presets), price guide (when enabled), FAQ, multi-step form (valid and invalid paths) and the review form validation all work.
3. **axe-core** has no serious or critical issues on any page.
4. **Lighthouse** at the targets in section 10. Record the numbers.
5. **Link check:** every internal link and anchor resolves, and the V1 301s still work.
6. **Reduced-motion pass:** emulate `prefers-reduced-motion: reduce` and confirm everything is static and visible.
7. **No-JS pass:** content is visible and both forms still submit.
8. **On the Netlify branch deploy:**
   - Submit one test enquiry and one test review request, and confirm Netlify Forms received every field.
   - **Delete both test submissions afterwards.**
   - Check the CSP headers in the deployed response.

## 12. Do not

- Push to `main`, publish to production, or change DNS or Netlify production settings.
- Invent clients, testimonials, reviews, statistics, prices, timings or credentials.
- Ship any `TBC` tag, `XXXXX` phone placeholder or prototype-only text ("Prototype only, so nothing was sent").
- Change the form names, change the legal page wording, or add third-party scripts, fonts or trackers.
- Use Google Fonts or any CDN in production.

## 13. Phases (run them straight through, committing after each)

| Phase | Work | Commit message prefix |
| --- | --- | --- |
| A | Branch, copy the reference package, tokens, fonts, Tailwind theme, Logo component, favicons and manifest, config modules | `v4(A): foundation` |
| B | Shell: progress bar, pill nav, drawer, footer, mobile bar, reveal system, view transitions, skip link | `v4(B): shell` |
| C | Home: every section and interaction, including the before/after, demo, price guide and four-step form wired to `enquiry` | `v4(C): home` |
| D | Services, About, Contact, Website review | `v4(D): pages` |
| E | Legal pages restyle, 404, SEO and metadata, sitemap, structured data, `CONTENT-TBC.md` | `v4(E): legal, seo, content list` |
| F | Full testing (section 11), fixes, real Lighthouse scores into `scores.ts`, CSP hashes, branch deploy and form tests | `v4(F): qa` |
| G | Update the repository `CURRENT-STATE.md`, then write the report | `v4(G): docs` |

## 14. Final report (when everything is done)

Reply with:

1. The branch, the commits and the **Netlify branch deploy URL**.
2. A table of what was built, page by page, and anything that differs from the reference, with the reason.
3. Test results: Lighthouse per page, axe, Playwright and the form-submission check, with the test entries deleted.
4. The contents of `CONTENT-TBC.md`, so Dave knows exactly what to supply before go-live.
5. Any risks or open questions.
6. The exact steps to go live once Dave approves: merge `redesign/v4` to `main` and confirm the production deploy. **Do not do this yourself.**
