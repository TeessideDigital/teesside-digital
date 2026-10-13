# Decision: V2.2 visual direction

Date: 13 October 2026.
Decided by: Dave.
Status: approved. Implemented in phases 11A, 11B and 11C.
Source: the "Visual redesign (V2.2 direction)" design proposal from Claude Chat, approved by Dave on the basis of the "bolder concept" boards for Home, Services and About.

## What this replaces

This retires the irregular-grid "Structural Datum" composition described in `docs/v2/creative-direction.md`. That is a deliberate decision by Dave, not drift. Where `creative-direction.md` or `hero-spec.md` describe the staggered irregular grid, a single typeface or a ban on a mobile menu button, this record takes precedence. Root `CLAUDE.md` was updated to match it.

An intermediate "calm layout" proposal (a width cap, two alignment lines, a smaller type scale) was approved and then superseded the same day, because Dave wanted more visual impact.

## Why

Dave reviewed the built V2.1 site on his own 3440 x 1440 monitor and judged it messy, hard to read and without impact. A read-only investigation at `41af0e2` found that:

- Home had no maximum content width;
- the hero image was stretched and cropped;
- content was repeated;
- the voice was mixed between "I" and "Dave".

Even with a width cap, the staggered composition read as disorganised. A review of local competitors showed the strongest ones win on bold type, filled call-to-action buttons, depth and section rhythm. Dave rejects their neon style as cheap and wants the site to look high end.

## Decisions

| Topic | Decision |
| --- | --- |
| Direction | Bold but restrained, high end. No neon, glows or pulsing effects |
| Headlines | Serif: Instrument Serif |
| Hero | A product visual drawn in HTML and CSS (a website, a booking tool, an automation flow), not a photograph |
| Photography | Real photographs only, taken by Dave, on About and beside his portrait. The generated images leave the hero |
| Accent | Amber, for actions only |
| Grid texture | None |
| Price guide | Yes, "from" prices with no upper limit. A content proposal follows |
| Phone | Yes, but no number until the dedicated business line exists. Phone features stay hidden until then |
| Care plan | Yes. A content proposal follows |
| Portrait | Yes, added before launch. No placeholder on a live page |
| Voice | Third person "Dave" site-wide. "David Young" only on legal pages |

## What stays from V2.1

- The 240px desktop left rail, the Dark and Light themes stored as `td:theme`, and Dark as the default.
- Instrument Sans for body text and interface.
- All approved copy, apart from the changes listed in the proposal.
- The form engine and its behaviour, the forms' Netlify setup, and the legal pages' content.
- The accessibility commitments: a WCAG 2.2 AA target, a site that works without JavaScript, and full reduced-motion support.
- No third-party requests. The Privacy page says so, so new fonts are self-hosted.

## Design system

### Colour

Dark theme (default):

| Token | Value | Use |
| --- | --- | --- |
| bg | `#15191f` | Page |
| bg-deep | `#12161b` | Rail, footer |
| surface | `#1a1f26` | Panels, cards, facts band |
| surface-2 | `#20262f` | Card media areas, chips |
| border | `#2f3a46` | Panel and section borders |
| border-strong | `#3a4756` | Secondary buttons |
| text-strong | `#f6f7f8` | Headings |
| text | `#f1f3f5` | Body emphasis |
| text-2 | `#b4c3cf` | Body and lead |
| text-3 | `#8798a6` | Small print |
| steel | `#8fb0cc` | Mono labels, brand mark |
| accent | `#f0a04b` | Primary buttons, link arrows, current page, focus |
| on-accent | `#1a1208` | Text on amber |

Light theme:

| Token | Value |
| --- | --- |
| bg | `#f6f5f2` |
| bg-deep | `#eeece8` |
| surface | `#ffffff` |
| surface-2 | `#f1f2f4` |
| border | `#d9dde2` |
| border-strong | `#c4cad1` |
| text-strong | `#12161b` |
| text | `#1b2027` |
| text-2 | `#3e4a56` |
| text-3 | `#5a6875` |
| steel | `#3f6584` |
| accent, as a fill | `#f0a04b`, with on-accent `#1a1208` |
| accent, as text, arrows and focus | `#8f520f` |

Inverse band, for alternate sections: in Dark, bg `#eef0f2`, text `#15191f`, text-2 `#3e4a56`, label `#4a5b6b`, accent `#8f520f`. In Light, bg `#1a1f26`, text `#f1f3f5`, text-2 `#b4c3cf`, accent `#f0a04b`.

These values are starting points. Every pairing is measured: text at least 4.5:1 (3:1 at 24px and above) and non-text interface elements at least 3:1. Implementation adjusts any value that fails and reports the change.

### Type

| Role | Font | Desktop / mobile |
| --- | --- | --- |
| H1 | Instrument Serif 400 | 76 / 48px, line height 1.02, tracking -0.015em |
| Section H2 | Instrument Serif 400 | 52 / 36px |
| Statement H2 | Instrument Serif 400 | 44 / 32px |
| Card or row title | Instrument Sans 600 | 20 to 22 / 20px |
| Lead | Instrument Sans 400 | 20 to 22 / 18px |
| Body | Instrument Sans 400 | 17 / 16px, line height about 1.6, measure about 660px |
| Label | IBM Plex Mono 400 and 500 | 13 / 12px, uppercase, tracking 0.06 to 0.08em |
| Small print | Instrument Sans | 14 to 15px |

Nothing is smaller than 14px, except mono labels at 12 to 13px. All three families are self-hosted with `font-display: swap`.

### Layout

- Content is capped at 1200px, with 64px padding, inside the area to the right of the rail.
- Full-width background bands are allowed; their content stays capped.
- A 12-column grid with a 24px gap.
- Section padding is 112px on desktop and 64px on mobile.
- No stagger. Grouped items share starts and ends.

### Components

- Primary button: 52px tall (56px in the closing panel), 6px radius, amber fill, an arrow that moves 4px on hover.
- Secondary button: a 1px outline on a transparent background.
- Arrow link: accent text with an arrow that travels 7px on hover in 0.21s, keeping the earlier Advancing Rule idea.
- Chip: a bordered pill with an accent dot, used once, in the Home hero.
- Panel: surface background, 1px border, 12px radius (16px for the closing panel). No shadows, except on product visuals.
- Facts band: a panel divided into cells. Only true facts, never statistics that cannot be backed up.
- Section label: mono, for example "01 / SERVICES".
- Product visuals: drawn in HTML and CSS, hidden from assistive technology, with neutral example content.
- Timeline, on About: a vertical rule with dots, the current period in amber.
- Inverse band: at most one or two per page.

### Shell

- Rail: deep background, current page in the accent colour, theme control kept.
- Mobile header: the brand plus a menu button. It must work without JavaScript and by keyboard, close with Escape and manage focus.
- Mobile sticky action bar on every page except Contact and the review page: "Get in touch", plus "Call Dave" only when a phone number is configured.
- Desktop "Call Dave" pill: only when a phone number is configured. It slides in once and never pulses.
- Footer: deep background, on the grid, with the label "Privacy".

### Motion

The committed motion system stays the authority: its tokens, the Web Animations API, one IntersectionObserver per route, once-only entrances and full reduced-motion support. Sections fade and rise a short distance as one group. The Home hero's three product cards appear in sequence, once, in under about 1.5 seconds. Nothing loops or pulses.

## Phases

| Phase | Scope |
| --- | --- |
| 11A Foundation | Tokens, fonts, components, shell, and the six utility pages moved onto the system |
| 11B Home | Home rebuilt, including product visuals and hero motion |
| 11C Services and About | Both rebuilt |
| Content proposal | Price guide, care plan, "how it works", FAQ |
| Assets | Portrait and real photographs, then their slots are shown |

Every phase is verified at 320, 390, 768, 1024, 1440, 1920, 2560 and 3440 wide, in both themes.
