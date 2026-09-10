# Teesside Digital V2 - Creative Direction Options

Date: 7 September 2026

Status: Phase 1 proposals for Dave's review. No territory is approved by this document.

Branch confirmed: `redesign/v2`.

## Basis and scope

All seven requested documents were read completely: `V2_MASTER_BRIEF.md`, `AGENTS.md`, `docs/v2/README.md`, `docs/v2/phase-0-audit.md`, `docs/v2/phase-0-decisions.md`, `ARCHITECTURE.md` and `PLAN.md`. The approved Phase 0 decisions take precedence over conflicting audit recommendations and historical V1 intentions. The latest supplied AGENTS instructions also apply, including British English and ASCII punctuation.

Reading this as a brand-led consultancy website for ordinary small-business owners, requiring distinctive studio quality with clear services, inspectable evidence and direct contact. This is a comparison of three design languages, not a finished design system, approved copy, page architecture or hero specification.

The Phase 0 implementation audit supplies the baseline. A further source check of the actual Header, Hero, global styles and TD mark confirmed the relevant V1 grammar: sticky logo-left navigation, centred tall hero, headline/paragraph/two-button sequence, decorative grid and glows, and generic shared interaction styling. North East Joinery is used only as the anti-reference described in the approved decisions and request. Its external implementation was not independently re-audited for this document. The distinction tests below are reasoned design hypotheses, not results from visitor testing.

The design-taste skill informed the critique of generic patterns. Its implementation defaults do not override this brief: no framework changes, generated filler, mandatory animation library, forced stacked mobile layout or preservation of the existing hero composition. No assets, components or code have been created.

### Approved constraints carried through every option

- Market: small and owner-led businesses, sector-agnostic, Teesside first, wider North East next, UK-wide where appropriate. Geography establishes relevance; it does not become industrial scenery or a trades-only identity.
- Services: **Websites & Web Development**, **Apps & Digital Tools**, **Automation & AI**. All three remain explicit and available. Different visual emphasis must not imply that apps or automation have been withdrawn.
- Security, accessibility and performance are embedded engineering standards. No equal cybersecurity pillar, shields implying certification, security scores or unsupported specialist assurance.
- Primary conversion: a qualified project enquiry directly to Dave. Secondary: a manual website review request. The automated Website Health Check and its scoring language have no place in these concepts.
- Teesside Digital leads. Dave provides accountability and business understanding. Use "I" for his personal actions, "Teesside Digital" for the business, and "we" only for genuinely shared work.
- North East Joinery is built but needs substantial further work. It is an active demonstration, not a completed client success. QuoteFlow remains off the main portfolio until meaningful functionality exists. SiteGuard is absent from current public proof.
- No invented prices, client logos, testimonials, results, delivery guarantees, support availability or completed qualifications.

### How to read the proposals

Names below are internal creative territory names, not proposed public taglines. Type sizes, colour values, spacing and timings are representative starting points for comparison. They need testing with approved content later. They are not production tokens or a Phase 4 hero design.

Each direction uses a different organising principle:

| Territory | Organising principle | Visitor's main action | Spatial signature |
|---|---|---|---|
| A. Open Edition | A carefully edited publication | Read a clear offer and inspect the decisions behind work | Side index, unequal editorial columns, captions beside evidence |
| B. Signal Room | An exhibition of working digital objects | Examine a piece of work, then its explanation | Broad dark display bays, narrow information ledge, bottom navigation |
| C. Connected Practice | A map of everyday business tasks | Recognise a problem and understand possible connections | Open branching paths, plain-language nodes, integrated directory |

These are not three skins for one component tree. Their display type, reading order, navigation position, proof format, spacing rhythm and mobile transformation differ. All use ordinary vertical document scrolling.

## Territory A - Open Edition

### 1. Name

**Open Edition.** An editorial identity built around clear explanation and visible judgement. "Edition" describes the composition; the public site is not labelled like a newspaper or a development journal.

### 2. One-sentence creative thesis

Present Teesside Digital as a carefully edited account of useful digital work, where a clear offer, real evidence and accountable decisions share the same page.

### 3. Why it fits Teesside Digital

Dave needs to demonstrate judgement before a large client portfolio exists. An editorial system can give a real design decision, a limitation and an actual screenshot appropriate weight without pretending they are a commercial case study. It connects visual craftsmanship with engineering through the quality of explanation.

The brand can encompass all three services because the subject is useful work rather than one technology or industry. Retaining a recognisable blue also gives continuity without retaining V1's composition. The editorial approach must serve the enquiry, not turn Dave into a content publisher with a weekly writing obligation.

### 4. Emotional experience

- First 5 seconds: "This looks considered, and I can immediately see what the business does."
- After 30 seconds: "I understand the kinds of problems Dave can help with, and he explains his work plainly."
- At the final CTA: "I can describe my situation without knowing the technical answer."

The desired feeling is informed confidence. It should not feel exclusive, academic or expensive for the sake of appearance.

### 5. Visual narrative

Arrival presents the brand, a short practical offer and an immediately readable service directory. A nearby evidence extract invites inspection without interrupting comprehension. Further reading moves between concise explanations, actual work and supporting notes, varying density according to the decision the visitor is making.

The closing invitation takes the same editorial form as the opening: one clear action with a plain explanation of who receives it. The manual review appears as a quieter alternative for someone with an existing website. No funnel requires reading every section or completing a review before contact.

### 6. Typography

Display direction: a sturdy contemporary editorial serif, provisionally **Source Serif 4**, at weight 600. Its role is to give important statements a recognisable reading voice, not to add decorative elegance. Use complete phrases, not an isolated italic word dropped into another family.

Body and interface direction: **Source Sans 3**, weight 400 for text and 600 for labels/actions. Adobe designed Source Serif to complement Source Sans; this offers a coherent starting relationship rather than an arbitrary font pairing. See the official [Source Serif](https://github.com/adobe-fonts/source-serif) and [Source Sans](https://github.com/adobe-fonts/source-sans) projects. The visual suitability remains this proposal's judgement.

Representative display range: 42-68px desktop, 32-42px mobile; section headings 28-40px; body 18-20px desktop and 17-18px mobile; captions 15-16px. Display line-height around 1.08-1.15, body 1.55-1.65. Display tracking between -0.015em and normal; body and captions normal. Avoid thin hairlines and tightly squeezed lowercase.

Metadata uses the same sans family, sentence case and ordinary spacing. A third monospace font is unjustified. Long prose stays around 55-68 characters per line. This is an explanatory publication aesthetic, so the serif has a defined role; it is not shorthand for "premium".

### 7. Colour system

| Role | Representative HEX | Intended use |
|---|---|---|
| Background | `#f4f6f8` | Cool, clean page field |
| Surface | `#ffffff` | Evidence and form reading surface |
| Supporting surface | `#e5ecf1` | Small contextual notes, not every section |
| Primary text | `#18232b` | Headings and prose |
| Secondary text | `#53616b` | Captions and supporting explanations |
| Accent | `#315974` | Primary action and underlined links |
| Hover / pressed | `#234358` / `#182f40` | Darker action fill; label remains white |
| Decorative divider | `#c8d2d9` | Editorial grouping only |
| Control border | `#798892` | Visible input boundaries |
| Focus | `#18232b` | Dark outline with a light separation gap |
| Success / error text | `#24543b` / `#a12b36` | Explicit state messages, never colour alone |
| Disabled surface / text | `#e5ecf1` / `#53616b` | Clear unavailable state with explanation |

**Evolve steel blue.** Keep `#5b7f9e` as a restrained brand-mark/supporting colour, but use the deeper `#315974` for text and filled actions on light backgrounds. The old blue should not automatically become small text on white. This preserves recognition while giving the editorial system a stronger ink-like accent.

No grain overlay, yellowed paper or sepia photography: those would pull the identity towards the warm material language assigned to the joinery business. The palette remains cool and digitally precise.

### 8. Grid and composition

At wide desktop sizes, reserve a modest left rail for brand/navigation and use a 12-column content grid beside it. A typical reading spread allocates seven columns to the argument, four to supporting evidence and one to separation. Other spreads let a screenshot occupy nine columns with its caption in three. This is a relationship between information types, not random offsets.

Alignment follows two persistent vertical axes: main reading edge and evidence edge. Text and visuals meet at meaningful baselines. Whitespace separates unrelated decisions; it does not create repeated empty screens. Start with 24-32px gutters, 24-40px within a group and 64-104px between major groups, with less space for utility pages.

Density alternates between a compact service directory, a broader evidence spread and short explanatory passages. Avoid the V1 sequence of centred heading, equal cards and oversized section padding. At 1920px, cap reading widths rather than stretching prose to fill the display.

### 9. Material and visual language

Flat opaque surfaces, sharp edges and a small 2-4px radius for controls. Depth comes from scale, alignment and the difference between image and caption, not floating panels. Rules separate actual topics; there are no background crosshairs or decorative graph-paper grids.

Use real screenshots, clearly captioned detail crops and an optional natural portrait. A crop must preserve the feature being discussed and offer access to the fuller view. Graphics explain a specific decision, such as the relationship between an enquiry field and useful information received. They do not simulate code or invent an interface.

The characteristic motif is **evidence with an adjacent explanation**. A line may connect a caption to its actual subject, but should disappear where proximity already makes the relationship clear.

### 10. Hero direction

The opening behaves like the first spread of a publication rather than a promotional banner. The brand/index rail establishes ownership. A compact headline and the three service names occupy the main reading area; one actual piece of work with a short explanatory caption occupies an unequal adjacent area. The primary action has its own clear place in the rail or reading edge, not a pair of buttons under a centred paragraph.

The first evidence item is optional if no suitable honest asset exists; the composition must still work as a useful service directory. Do not fabricate a polished screenshot to complete the layout. Its memorable feature is simultaneous access to the offer and the reasoning behind work. Its height follows content rather than filling a viewport. Detailed copy, dimensions and final ordering remain later-phase decisions.

### 11. Navigation philosophy

Desktop: a left-side, text-labelled index groups the brand, familiar destinations and a prominent contact link. It can remain sticky only while the viewport is tall enough to contain it. This gives visitors an independent way through an editorial page without placing navigation above every spread.

Tablet: replace the rail with a compact brand masthead and a separate horizontal row of links. Mobile: keep a visible, wrapping navigation list below the masthead; avoid making basic navigation dependent on a hamburger script. At narrow widths, two short rows are preferable to tiny text or sideways swiping.

Current page indication uses weight plus an underline or marker. A local contents list, if needed on a long page, is visually separate from global navigation. Conventional labels are valuable even where placement differs. The rail is functional orientation, not novelty.

### 12. Section architecture style

Editorial spreads and short reading passages. A service comparison can be a simple directory; project evidence can be a large image with marginal notes; a founder contribution can be a signed passage. Related facts share a spread rather than occupying separate padded boxes.

The system should have a small set of repeatable relationships, not a unique layout for every paragraph. Contact and legal pages become direct reading/task pages, with no inherited promotional hero. This describes the spatial vocabulary, not a final homepage section order or route map.

### 13. Work and portfolio presentation

Present North East Joinery as a **demonstration in progress**, with that fact visible before its evidence. Show one real screen and one meaningful decision or limitation. Do not frame its logo like an endorsement, add a client quote or imply that the pictured interface is finished. If the current screen does not merit prominent display, link to a modest work entry instead of enlarging weak proof.

Later QuoteFlow can use the same editorial relationship: actual task view, explanation of behaviour, implementation status and limitations. Until there is meaningful functionality, it stays off the main portfolio. No empty second and third project slots.

The own site can eventually demonstrate its responsive and engineering choices with dated evidence. The proof format makes judgement inspectable without inventing business outcomes or distracting the main audience with source code.

### 14. Founder treatment

Dave appears as the accountable author of a short supporting passage, with a restrained portrait only when a real suitable photograph is available. The brand remains the masthead and the offer remains the opening subject. No enormous signature, portrait-first hero or "tattoo artist turned coder" storyline.

The About treatment can use a compact chronological reading column with the exact approved history recorded later in this document. Prior business ownership supports understanding of briefs and responsibility; ongoing study is accurately labelled. A personal "I" paragraph should be visibly attributable to Dave, not mixed into an implied agency voice.

### 15. Motion philosophy

Motion is sparse and quick: roughly 120-180ms for control feedback, with a gentle ease-out such as `cubic-bezier(0.2, 0, 0, 1)`. Its purpose is to acknowledge an action. Links, text and evidence are visible immediately; there is no scroll-triggered fade-up sequence.

An optional 180-240ms crossfade between explicitly selected evidence views can help preserve context, provided the frame is stable. Route changes can remain native and immediate. No parallax, cursor attraction, floating media or page-turn simulation. Main reading content remains still.

Reduced motion removes the evidence crossfade and any spatial movement, retaining instant state changes, focus indication and error feedback. The concept should be equally recognisable as a static page.

### 16. Interaction philosophy

Use the native pointer. Text links are underlined; hover strengthens the underline or changes the tested colour. Buttons have a stable footprint and explicit normal, hover, pressed and focus states. Do not reproduce V1's global link rule overriding a button label.

Project titles link to evidence pages. A clearly labelled larger-image link is preferable to a hover-only magnifier. Navigation does not rearrange as the pointer passes. Small caption disclosures can reveal additional technical detail, but the meaningful claim and limitation remain visible.

The enquiry form feels like a concise letter to Dave: visible labels, a useful problem field and honest submission feedback. Keep input after failure; show receipt only after acceptance by the receiver. The manual review has its own stated purpose and never resembles an instant diagnostic. No animated typing or artificial progress bar.

### 17. Mobile interpretation

The editorial spread becomes an **extract followed by its explanation**, not a shrunk two-column article. The side index becomes the visible masthead directory. Marginal notes move immediately after their related evidence, while the screenshot is recropped for the relevant feature rather than merely reduced to unreadable desktop scale.

Service links become compact full-width lines with enough height to tap. One reading axis takes over, but selective image breadth and inset captions retain hierarchy. The enquiry action appears in the opening navigation and where the visitor reaches a decision, without a persistent bar covering text.

At 320px and enlarged text, allow labels and headings to wrap naturally. At intermediate tablet widths, keep two columns only where each remains useful. Mobile has a different information relationship, not merely desktop blocks in their CSS order.

### 18. Accessibility implications

Strengths: visible navigation, static reading, high-contrast text, no compulsory motion and captions adjacent to evidence. Risks: serif strokes at small sizes, an over-dense service directory, narrow marginal notes and visual order diverging from reading order.

Mitigate through robust display weight, sans body/captions, generous line spacing and a meaningful source order before applying the grid. Keep controls comfortably around 44px high where practical; this is a design target, not a blanket statement of the WCAG minimum. Disable rail stickiness at short heights and zoom. Use text status labels as well as colour. Do not force horizontal scrolling at 320 CSS pixels; see [W3C reflow guidance](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).

### 19. Performance implications

Low runtime cost. Astro can render the publication, navigation and forms as HTML; creative behaviour requires no React island or animation library. Optional evidence switching is a small enhancement rather than a dependency of the page.

The principal costs are two font families and genuine work images. Start with only the required styles, self-host appropriate webfont files later, reserve media dimensions and provide responsive image sizes. Avoid loading full-resolution screenshots in the first view. No video is needed.

The existing LCP, CLS, INP and Lighthouse targets are realistic design constraints here, but cannot be claimed as achieved without implementation measurements. Font substitution and screenshot sizing are more likely risks than animation.

### 20. Commercial strengths

An ordinary owner can see the service names, inspect how Dave thinks and contact him without learning a new interface. Careful explanation supports trust where client evidence is still developing. The format can discuss websites, tools and automation without pretending they are equally proven by the existing portfolio.

It also offers a durable brand as evidence improves: an actual client result can replace an early demonstration without changing the whole visual language. The local connection can be stated plainly in the offer and contact information, without regional stereotypes.

### 21. Commercial risks

Too much prose could make the site feel like a journal rather than a business. A highly literary serif treatment could seem artistic or expensive. Tiny captions and too many rules could look corporate or bureaucratic. Excessive restraint could produce another generic editorial agency site.

Keep the commercial offer explicit, constrain the amount of reading before an action, and make supporting technical detail optional. Do not assume that tasteful typography itself establishes capability. Its credibility comes from the actual evidence and dependable experience.

### 22. Implementation risks

The main complexity is responsive composition and content governance. Arbitrary per-page grid overrides would turn an editorial system into a collection of exceptions. Use a small set of content relationships later, with clear limits for prose and media, rather than coordinates tied to a screenshot.

Long service names, missing images, captions and large text must all have coherent layouts. Avoid CSS visual reordering that produces a different keyboard sequence. Maintain the claim, project status and caption from consistent data. Changing the text must not demand manual line breaks on every device.

### 23. Distinction test

"Would an independent visitor reasonably think this and North East Joinery came from the same website template?"

**NO, if implemented as specified.** The side index, compact editorial opening, serif/sans reading hierarchy, unequal evidence spreads, visible captions and mobile extract format establish different spatial grammar. There is no conventional top hero with two CTAs followed by repeated business cards. The distinction survives a greyscale view and replacement of all images with neutral rectangles.

This is a proposed outcome. Later visual review must test it against the actual joinery site; changing the background to white would not be sufficient evidence of independence.

### 24. Failure mode

A large serif slogan on pale paper, two buttons, three cards and decorative numbered sections. That would be V1 in editorial clothing. Another failure is a sparse magazine imitation with tiny metadata, faux publication dates and no obvious service offer. Preserve the service directory, evidence relationships and direct navigation; remove editorial decoration that does not help a visitor decide.

## Territory B - Signal Room

### 1. Name

**Signal Room.** A controlled exhibition space for real digital work. The room is a compositional idea, not a rendered 3D environment or a virtual tour.

### 2. One-sentence creative thesis

Make the quality of an actual digital object the centre of attention, with clear business context and direct access to its maker arranged around it.

### 3. Why it fits Teesside Digital

This direction gives visual judgement and technical execution equal visibility. It could become a strong identity for a small company that makes websites, useful tools and automated workflows: the object being examined changes, but the discipline of presentation remains consistent.

It is the most demanding option for the present proof situation. A carefully lit display space cannot make unfinished work mature. That is a strategic constraint, not something to solve with mockups or larger claims. Dave's accountability supports the exhibition, but the brand and work remain central.

### 4. Emotional experience

- First 5 seconds: "This looks unusually confident, and the thing being shown is real."
- After 30 seconds: "I understand what it does, why it was made and what its limitations are."
- At the final CTA: "I could bring a specific problem to the person responsible for this work."

The desired movement is curiosity into confidence. If curiosity persists because the visitor cannot identify the service, the concept has failed commercially.

### 5. Visual narrative

The opening gives an actual interface a broad display area, paired with a compact service explanation and a persistent route to enquiry. As the visitor scrolls normally, the composition changes from viewing distance to inspection distance: a complete screen, a meaningful detail and the reasoning behind a behaviour.

Supporting passages use tighter information ledges beside the work. The closing contact area becomes a clear, calm place to act, without a cinematic finale. The manual review is a secondary text route for existing websites. It never appears as a glowing scan or status console.

### 6. Typography

Display direction: **IBM Plex Sans Condensed**, weight 600, for short upright statements and project titles. Body/interface: **IBM Plex Sans**, weights 400 and 500, with 600 for actions. The narrower display shape creates a strong vertical edge alongside wide interface imagery without enlarging every heading to fill the screen. IBM provides Sans and Sans Condensed within the [Plex family](https://github.com/ibm/plex); this proposal borrows the type family, not IBM's brand layout or implied affiliation.

Representative display sizes: 56-88px desktop and 36-48px mobile, line-height 1.02-1.1. Use normal to -0.01em tracking; condensed letterforms do not need further squeezing. Body: 18-20px at 1.6 line-height, with 16px minimum starting point for captions. Metadata stays in regular-width Sans at weight 500. No monospace labels unless a future case study genuinely contains code.

Use sentence case and complete phrases. Do not rotate headings, clip words offscreen or use all-caps condensed paragraphs. Optical strength should come from proportion and placement, not illegible scale.

### 7. Colour system

| Role | Representative HEX | Intended use |
|---|---|---|
| Background | `#151719` | Neutral dark exhibition field |
| Surface | `#22262a` | Opaque information and form surfaces |
| Supporting surface | `#30363b` | Selected evidence control or small inset |
| Primary text | `#f2f2ec` | Main copy and headings |
| Secondary text | `#b5bdc3` | Captions and supporting text |
| Accent | `#dbe87b` | Primary action and selected control |
| Action label | `#151719` | Dark text on the light accent |
| Hover / pressed | `#edf4ad` / `#c2ce64` | Action fill, keeping the dark label |
| Decorative divider | `#454d53` | Separation where grouping needs it |
| Control border | `#788289` | Inputs and unselected controls |
| Focus | `#f2f2ec` | Light outline with dark separation gap |
| Success / error text | `#b8dfc6` / `#ffb5ad` | Explicit feedback with text labels |
| Disabled surface / text | `#30363b` / `#b5bdc3` | Stable, legible unavailable state |

**Reject steel blue as the active palette.** A dark blue accent system would be too close to V1's technology atmosphere. The muted citron action colour creates a different hierarchy without neon or glow. A future monochrome treatment of the existing TD mark would require an approved asset treatment; this proposal does not change the SVG.

The page field stays dark, with opaque surfaces and no alternating light marketing sections. Screenshots retain their authentic colours, including light interfaces. They are evidence inside the composition, not a theme change.

### 8. Grid and composition

Use a broad eight-column display field with an adjacent four-column information ledge, within a 12-column frame. The main work may expand to ten columns while its short caption occupies the remaining two, but prose never gets squeezed into that caption width. Work carries the visual mass; explanatory text is deliberately more compact.

Desktop navigation sits along a bottom edge, leaving the top free for a prominent brand wordmark and an immediate service statement. The page progresses through wide display bays and shorter explanation bands. Spacing is quiet around a complex object and tighter around related notes: roughly 32px internal grouping and 72-120px between major displays, reduced on utility pages.

This is not an alternating left/right split at every section. Broad horizontal edges and differences in viewing scale establish rhythm. No perspective-tilted device pile, boxed card grid or fixed-height screen-by-screen scroll.

### 9. Material and visual language

Opaque charcoal planes, crisp edges, minimal 2px control rounding and one restrained shadow only if it separates real media from a similar surface. Light is implied by contrast around a screen, not simulated by spotlights following the pointer. No blur, glass, grain or metallic reflections.

Media is the actual interface or a captured interaction with appropriate context. Graphics can isolate a meaningful control or annotate a real state. Avoid fabricated dashboards, studio glamour photography and hardware mockups. Depth comes from showing a whole object and then a larger detail, not from 3D transforms.

The signature is a wide, unframed piece of work with a narrow explanatory ledge. This makes the quality of the object unusually exposed, which is both its strength and its risk.

### 10. Hero direction

Open with a wide actual screen occupying the central visual field. A compact upright headline and explicit service summary sit on a narrow side ledge, with the Teesside Digital wordmark establishing the brand above. Global navigation and the enquiry action occupy a labelled bottom bar, not two buttons beneath the headline.

The screen must remain understandable as evidence of a demonstration, with status adjacent and visible. It must not become an anonymous decorative interface. The memorable idea is immediate inspection of a made thing, supported by plain explanation. Unlike North East Joinery's conventional promotional opening, the composition is object-led with peripheral orientation and unequal density.

Do not finalise the object or hero geometry now. If no asset honestly meets the required standard, this territory should lose the selection rather than borrow imaginary proof.

### 11. Navigation philosophy

Desktop: a solid, text-labelled bottom navigation bar containing familiar destinations and a distinct enquiry action. No dock magnification, icons without labels or floating pill. The placement leaves room for broad display composition and provides continuity between exhibits.

Reserve document space so the bar cannot cover content or focused elements. On short viewports or high zoom, it becomes normal-flow navigation. Mobile: abandon the bottom dock. Put a visible two-row directory below the brand at the top, where it cannot conflict with the on-screen keyboard or obscure work.

The main risk is discovery: some visitors expect navigation at the top. Clear labels and a visible first-view bar reduce that risk, but later usability testing must determine whether the placement is worth keeping. Unconventional placement is expendable; understandable navigation is not.

### 12. Section architecture style

Architectural display bays interspersed with compact information ledges. An object can span the content field, while an explanation or founder statement uses a narrower stable reading area. Service information should be a concise catalogue of the three approved areas, not three empty exhibition plinths.

The grammar permits a small number of work items without an unfinished grid, but it gives each a lot of scrutiny. Contact and legal pages use direct task layouts within the same dark system. No final section order, route changes or pinned sequence is prescribed.

### 13. Work and portfolio presentation

North East Joinery would be shown as an active demonstration, with real captured screens and a visible statement that substantial work remains. A single verified detail could be examined before the overall site is showcase-ready, but it must not be isolated to conceal the wider project's limitations. Link to the fuller state where appropriate.

QuoteFlow is absent until there is meaningful working behaviour. Later, a user-controlled recording could show an actual task, with a still image and text explanation available. No autoplay, invented records presented as real customers, or staged result metrics. A future recording must identify demonstration data where used.

Presentation demonstrates judgement by showing what happens before, during and after an actual interaction. The visual system must never imply "client commissioned" merely because the exhibit looks expensive.

### 14. Founder treatment

Dave appears in a compact contributor passage, with a simple portrait and direct-accountability explanation near relevant work or contact. He is not the object of the exhibition. The About page can use a clear timeline and short supporting passages without a dramatic personal-origin narrative.

Use the exact approved chronology below. Study stays in progress; cybersecurity study is context, not a badge. Avoid studio machinery, tattoo close-ups, construction images or a dark hacker portrait as identity assets.

### 15. Motion philosophy

The most deliberate motion of the three options, but only on demand. An evidence selection may crossfade over 220-320ms with a smooth, non-elastic ease-out, helping the eye understand that the same object has changed view. Control feedback remains quicker at 120-180ms.

No scroll pinning, parallax, entrance blackout, automatic zoom or opening film. Text, navigation and the primary action remain still and available from first render. Route navigation can use the browser's normal behaviour; continuity does not require a transition engine.

Reduced motion makes view changes immediate and leaves recordings paused until explicitly played. Do not automatically start media when a user selects a thumbnail. A still frame and explanatory text carry the same essential meaning.

### 16. Interaction philosophy

Native pointer, steady buttons and explicit underlined text links. Hover can strengthen the selected frame or underline; it does not tilt the work. Show labelled evidence controls beneath the media, reachable by keyboard and touch. Essential facts are never revealed only by hover.

Enlargement should have an explicit route or button. If a dialog is later justified, it needs a clear close action and predictable focus restoration; a normal evidence page is the simpler default. Bottom navigation never changes size as the user moves across it.

Forms use solid input surfaces, visible labels and sufficient contrast. Submission state is functional: sending, accepted, or failed with preserved input and recovery. No particle celebration or "transmission complete" terminology. The manual review request explains Dave's subsequent work rather than pretending a report is being generated in the browser.

### 17. Mobile interpretation

Replace the wide exhibition view with a **selected detail and a readable caption**. Provide an explicit route to the complete screen; shrinking an entire desktop interface to 280px would make the evidence useless. The narrow ledge becomes a normal-width explanation, and condensed display type becomes smaller and less dominant.

Global navigation moves to the top. Evidence controls become labelled rows with generous targets. Portrait landscape media is selected intentionally for the device; avoid horizontal carousels that hide essential work or require swiping to discover the service.

The experience becomes a close inspection rather than a miniature gallery. At 320px, the image may be modest in height so the service explanation and action are not buried. On landscape phones, all navigation stays in normal flow.

### 18. Accessibility implications

Strengths: high-contrast text, stable opaque surfaces and explicit media controls. Risks: condensed headings, light-on-dark reading discomfort, fixed navigation obstruction and screenshots carrying information unavailable in text.

Keep body text in regular-width Sans, avoid excessive high-brightness display type, and provide adjacent explanations for meaningful visual evidence. Captions must be outside images. Fixed navigation needs zoom and focus-obscuration checks, with normal-flow fallback. Recordings require appropriate captions or text equivalents depending on their content. Do not infer accessibility from a screenshot of an interface.

The direction can target WCAG 2.2 AA, but the media and navigation introduce more verification work than A. Dark styling is not itself an accessibility failure or a guarantee of comfort.

### 19. Performance implications

Moderate cost, driven by media rather than the dark palette. Static Astro HTML and CSS can deliver the display bays and navigation. Small optional JavaScript can switch evidence views; a React runtime and WebGL are unnecessary.

Two related font families and a large opening screenshot need careful transfer control. Later recordings should load on request with a lightweight poster, not download as an autoplay hero. Reserving image space reduces layout shift; selecting useful mobile crops reduces bytes and improves comprehension together.

Targets are feasible with static imagery. They become harder if this concept is interpreted as a film, a live iframe gallery or a carousel preloading every screen. The apparent simplicity of a dark room must not hide a heavy media payload.

### 20. Commercial strengths

Strong work can communicate quality faster than a long explanation. Seeing an actual booking, enquiry or tool interaction helps owners connect technical work to something they recognise. The restrained environment could support a memorable, confident brand beyond Teesside as the portfolio matures.

The enquiry route remains independent of the exhibits. A visitor should not have to demonstrate design knowledge or inspect source code to approach Dave.

### 21. Commercial risks

Most likely to seem expensive, artistic or agency-like before the business has the proof to sustain that impression. Peripheral navigation could confuse less confident users. Condensed titles and a dark display environment could become intimidating or feel like technology branding for developers.

An exhibition of weak evidence magnifies the weakness. Replacing missing work with atmosphere would make it generic dark SaaS or a designer portfolio. Plain service language and visible solo accountability help, but do not remove the present proof dependency.

### 22. Implementation risks

Evidence-view state, focus behaviour, responsive crops and fixed-navigation space need disciplined treatment. A gallery can quickly accumulate preloading, transitions, dialogs and nested interactions that one person must maintain. Prefer ordinary linked evidence pages before adding a custom viewer.

Media production is an ongoing maintenance cost: a recording can become stale as soon as the demo changes. Captions, status and recordings must describe the same version of reality. Screenshot-specific positioning should not become a general page layout dependency.

### 23. Distinction test

"Would an independent visitor reasonably think this and North East Joinery came from the same website template?"

**NO, if implemented as specified.** The work-first display bays, condensed vertical type against broad media, bottom desktop directory and mobile close-inspection format are structurally different from the joinery site's conventional promotional hero and section stack. Both can contain photography or screenshots without sharing the same template.

The answer becomes uncertain if the opening is changed to a large centred slogan with a decorative screen beneath it. The dark palette alone would fail the distinction test against V1.

### 24. Failure mode

A dark agency portfolio with a giant condensed slogan, lime button, glowing mockup and scroll animation. Alternatively, a virtual showroom that hides the services and makes customers hunt for contact. Keep the object real, the explanation immediate and navigation plain. If strong inspectable work is unavailable, do not compensate with cinematic effects.

## Territory C - Connected Practice

### 1. Name

**Connected Practice.** An open map of practical digital tasks and their relationships. It is a communication system, not a simulated application dashboard.

### 2. One-sentence creative thesis

Make the relationship between a business problem, a useful digital intervention and the person delivering it visible in a clear, approachable connected composition.

### 3. Why it fits Teesside Digital

The three approved services can otherwise seem like unrelated purchases. A task map shows how a website, an internal tool and an automation can connect while remaining independently useful. It suits Dave's practical problem-solving history and makes technical judgement intelligible to an owner who does not know which service to request.

This must not become a claim that every customer needs all three services or a large interconnected system. Simple standalone work remains a legitimate outcome. The map communicates possible relationships across sectors; it does not quietly reposition the business as an enterprise systems consultancy.

### 4. Emotional experience

- First 5 seconds: "This seems approachable, and it describes work I recognise."
- After 30 seconds: "I can see how my problem might connect to a useful website, tool or simpler process."
- At the final CTA: "I can explain the problem and let Dave help determine the right scope."

The emotional goal is agency and understanding. A visitor must not feel obliged to solve a puzzle or complete a diagnostic before making contact.

### 5. Visual narrative

Arrival pairs an explicit business offer with a small open map of recognisable tasks. Reading follows short connections from a problem to an appropriate type of help. Later evidence shows one real example, separating current implementation from illustrative possibilities.

The visual connections become simpler as the visitor reaches contact: the open network resolves into a straightforward problem description sent to Dave. This is a narrative relationship, not an animated flow into a form. The secondary manual review is a separate route for an existing website, not a branch that scores the visitor's business.

### 6. Typography

Use a single humanist sans family across display, body and interface, provisionally **Atkinson Hyperlegible Next**. Weight 700 for short headings, 400 for prose and 600 for actions. The open shapes and differentiated characters suit quick reading among connected labels. The Braille Institute describes its [Hyperlegible family](https://www.brailleinstitute.org/freefont/) as designed to improve legibility for people with low vision. That design purpose does not make this proposed website automatically accessible.

The display voice is broad, open and conversational, rather than editorial serif or condensed exhibition type. Representative sizes: 38-58px desktop and 30-38px mobile, line-height 1.12-1.2. Body 18px at 1.55-1.65; task labels 18-24px at 1.3; captions 16px at 1.5. Use normal tracking, with at most -0.01em on large headings. No stretched type, all-caps control labels or monospace technical ornaments.

Scale gives the business problem priority, while weight distinguishes actions. The single family reduces visual competition in the map and can reduce font cost. Final testing must check the actual service names and long labels rather than assuming a friendly typeface solves density.

### 7. Colour system

| Role | Representative HEX | Intended use |
|---|---|---|
| Background | `#eff7f1` | Pale mineral green field |
| Surface | `#ffffff` | Forms and selected explanation area |
| Supporting surface | `#dcece2` | Related task grouping |
| Primary text | `#17352c` | Main copy and headings |
| Secondary text | `#4c685c` | Supporting explanations |
| Accent | `#2459bc` | Actions and explicitly selected route |
| Hover / pressed | `#194598` / `#123575` | Darker action fill with white label |
| Decorative connection | `#bdcec3` | Non-essential visual grouping |
| Meaningful connection / control border | `#71877c` | Relations or boundaries that must remain visible |
| Focus | `#17352c` | Dark outline with light separation gap |
| Success / error text | `#24543b` / `#a12b36` | Text-labelled state feedback |
| Disabled surface / text | `#dcece2` / `#4c685c` | Legible unavailable state |

**Replace steel blue with a clearer action blue.** `#5b7f9e` is too muted to establish the selected path against the green field. `#2459bc` supplies an unambiguous interaction accent; green remains the neutral environment rather than a second competing brand accent. There are no separate colours for Web, Apps and AI, which would recreate the old service silos.

The TD mark's geometry can remain, with a proposed palette treatment subject to later approval. No asset changes are made here. Avoid eco imagery: the green is a calm surface choice, not an environmental claim.

### 8. Grid and composition

Use a six-column open field with a stable text origin and branching task relationships. A problem statement may occupy two columns; the related service explanation occupies three; the remaining column provides separation and a connector. Keep visible relationships few enough to understand without zooming.

Asymmetry comes from the length and direction of a meaningful relationship, not from different card sizes. Connections terminate at real labels. No boxed nodes floating in an infinite canvas, decorative circuits or background dot grid. A later evidence area can widen across the field without adopting the map layout itself.

Whitespace distinguishes separate possibilities; proximity groups related ones. A 24px base gutter and 32-56px between linked groups are useful starting points, with 64-96px for a new topic. Prose remains a normal reading width. The result should be more compact and interconnected than V1's independently padded sections.

### 9. Material and visual language

Matte, opaque pale surfaces, modest 6px rounding for controls and grouping areas, and no elevation unless an actual overlay requires it. Mostly unboxed labels and short explanations keep the page from becoming a dashboard.

The signature graphic is a short connector between named business tasks. It must explain a relationship that the words also state. Use straight or gently bending paths, not circuitry, decorative arrows everywhere or fake live signals. A small semantic diagram can be rendered later without canvas or a graph library.

Imagery remains actual work with ordinary captions. No stock photographs of teams, AI brains, machinery or handshake scenes. Illustrative task relationships are labelled as examples rather than presented as completed customer systems.

### 10. Hero direction

The opening is a compact **offer plus navigable task map**, beneath a prominent Teesside Digital masthead. The three approved service names are immediately readable as services; a few plain-language examples demonstrate the relationship to business tasks. Contact has one clear action at the edge of this composition, not a second competing button below a slogan.

The visual idea is connection between useful tasks, not a diagram of the technology stack. All essential content is visible without selecting a node. Optional exploration can reveal more detail later, but must not be necessary to understand the offer.

Unlike the joinery hero, text is organised around relationships and choice rather than headline/paragraph/CTA stacking. Phase 4 must determine the actual example and geometry. Do not invent a working product or automatic recommendation engine to support this concept.

### 11. Navigation philosophy

Use a centred brand masthead with a **separate full-width text directory** beneath it. Familiar destinations occupy the directory; the primary enquiry is clearly distinguished at one end. This deliberately keeps a conventional top location because the task map below already introduces a new reading pattern. Adding novel navigation as well would impose unnecessary learning.

The directory scrolls normally rather than becoming a permanent application toolbar. On mobile it becomes two visible rows with the brand on its own line. Task-map links are local content choices, visibly distinct from the global navigation. A selected task does not rename destinations or hide the rest of the site.

The structural difference from V1 is the masthead/directory relationship and the connected opening, not a claim that top navigation itself is forbidden.

### 12. Section architecture style

Relational and explanatory. Short groups show a need and a possible response; broader evidence views demonstrate one actual decision; straightforward passages establish delivery responsibility. Connections are limited to content that benefits from them, so the entire site does not become a flowchart.

Services remain separately understandable even where their examples intersect. Utility pages use plain reading and form layouts. The eventual section order must be chosen in Phase 3; this concept does not prescribe a compulsory journey from website to app to automation.

### 13. Work and portfolio presentation

North East Joinery can illustrate one verified relationship, such as a visible enquiry route and the information it requests, only after that behaviour is inspected. State "Demonstration in progress" and substantial remaining work outside the image. Do not draw a customer outcome node that implies measured enquiries or sales.

QuoteFlow stays absent now. Later, actual quoting behaviour can show how an input becomes a usable output, with demonstration data and limitations disclosed. Automation examples without implemented proof remain explanatory examples, not portfolio entries.

The presentation shows engineering judgement by identifying where a system starts, what it actually does, what a person still decides and where its limits lie. A clear boundary is more credible than a diagram implying that everything is automated.

### 14. Founder treatment

Dave appears in a normal supporting passage explaining who takes responsibility for the work. Do not place his face as the central node connecting every customer task; that would turn the brand into a personal diagram and imply unlimited capacity.

A later About timeline can describe the approved chronology in a simple reading sequence. It must not map prior occupations into implied technical qualifications. Business ownership supports understanding of real constraints; study explains continued development. Teesside Digital remains the masthead and the service provider.

### 15. Motion philosophy

Feedback is immediate and purposeful. When someone explicitly selects an example, a connector or emphasis may change over 140-200ms with a gentle ease-out. A related explanatory area may crossfade over 180-240ms in a stable frame. The purpose is to show which explanation belongs to the selection.

No automatic pulses travelling along paths, perpetual flow animation, scroll-drawn network or simulated processing. Headings, core service labels and contact remain still. No parallax or depth movement.

Reduced motion switches emphasis instantly and shows all essential relationships statically. Selection must remain understandable through a text label and semantic state, not solely the colour of a line. The static version must be a complete website, not a fallback apology.

### 16. Interaction philosophy

Native pointer and stable controls. Links remain visibly links. A task that navigates uses a link; a task that changes an explanation uses a button with an explicit selected state. Do not make every word look draggable or allow panning around a graph.

Hover may emphasise the related connection, but keyboard focus and touch selection must provide the same information. The complete offer remains visible without any interaction. Project evidence opens through labelled links, not hidden hotspots or drag-to-reveal mechanics.

The form is an ordinary problem description with useful optional context, not a branching quiz that forces a technical diagnosis. Preserve data on error and confirm only accepted submission. The manual review stays a separate human service. No conversational AI interface is added merely because Automation & AI is a service.

### 17. Mobile interpretation

The open desktop map becomes a **short linear explanation of each relationship**, using a small left-side connecting rule and full-width text. It does not shrink into a pan-and-zoom diagram. The service names remain visible, and each example's explanation sits immediately below it.

If optional selectors survive, they become normal labelled buttons or disclosures with visible content on failure, not a horizontal strip of hidden choices. Screenshots use useful detail crops with access to full evidence. The masthead and directory stay in normal flow.

At 320px, remove non-essential branches and let the words describe the same relationship. Do not remove actual service scope. At tablet widths, a pair of related text areas may sit beside each other only if both remain readable. Mobile prioritises explanation over resemblance to the desktop diagram.

### 18. Accessibility implications

Strengths: readable type, approachable language, ordinary controls and a potentially clear linear alternative. Risks: meaning conveyed only by connectors, ambiguous click targets, colour-only selection, visual/source-order mismatch and too many simultaneous choices.

Every relationship needs a textual explanation. Keep source order meaningful without the diagram. Decorative connectors should not add screen-reader noise; meaningful diagrams need an appropriate accessible description. Focus should identify the active control without moving content unexpectedly. At zoom, the linear composition takes over rather than preserving the network at unreadable scale.

A typeface designed for legibility helps only one part of this. Keyboard use, language, structure, contrast and honest state feedback still need testing. Limit the number of visible examples rather than solving overload with more animation.

### 19. Performance implications

Low to moderate cost. A small static diagram and one font family can be very light. Astro HTML and ordinary CSS handle the essential content; optional example selection needs only a small enhancement. No graph layout engine, canvas, AI service or React dependency is required by the concept.

Real project screenshots remain the main media cost. Avoid duplicating entire desktop and mobile content trees or loading all optional example images at once. Connectors should not be recalculated continuously on scroll or pointer movement.

The performance targets are realistic if the map is primarily semantic content with a few visual relationships. An interactive graph playground would add cost while worsening the customer journey. The static layout is the baseline to preserve.

### 20. Commercial strengths

It most directly explains why Websites & Web Development, Apps & Digital Tools and Automation & AI belong in one business. Customers can recognise a task before knowing a technical term. The approachable colour and open type reduce the risk of seeming like a specialist consultancy beyond their needs.

It can accommodate many sectors without inserting irrelevant stock imagery. A simple website and a more involved workflow can both be legitimate examples. Direct contact makes uncertainty acceptable rather than demanding self-service diagnosis.

### 21. Commercial risks

The map could imply that buying one service requires the others, inflating perceived cost. Too many connectors would feel technical or corporate. Pastel surfaces and rounded controls could drift into a generic productivity app. A clever task selector could become confusing, while overly friendly copy could weaken professional credibility.

Keep the scope explicit: examples show possibilities, not packages or mandatory stages. Do not suggest that AI belongs in every workflow. If the explanation takes longer to decode than a plain sentence, remove the visual relationship.

### 22. Implementation risks

Responsive connectors are the main trap. Absolute-positioned paths tied to exact text lengths become fragile when content changes, fonts load or users enlarge text. Prefer a small number of fixed relationships expressed through normal layout; remove connectors when proximity suffices.

Optional state must not create a hidden parallel website whose content differs from the static version. Use one source of service/project facts and keep enhancement local. Resist generic graph abstractions: they introduce more maintenance than a small consultancy's communication requires.

### 23. Distinction test

"Would an independent visitor reasonably think this and North East Joinery came from the same website template?"

**NO, if implemented as specified.** The brand masthead over a separate directory, relationship-based opening, unboxed task groups, continuous explanatory connections and mobile linear interpretation use different composition and interaction rules. The distinction is present without the green palette or a custom font.

Keeping navigation at the top does not invalidate independence. If the map becomes three rounded service cards under a large headline and two buttons, however, the structural distinction disappears.

### 24. Failure mode

A pastel SaaS landing page with three illustrated cards, animated arrows and an AI chatbot. Or an oversized technical flowchart requiring the visitor to navigate a maze. Preserve the small number of useful relationships, plain labels and direct enquiry; discard network decoration and simulated live system behaviour.

## Comparison

Scores are subjective forecasts against the approved brief, not measured customer responses or accessibility/performance results. A difference of one point indicates a modest preference, not scientific precision. Every column uses **10 as more favourable**. For implementation complexity, 10 means simpler/lower cost and 1 means more complex/higher cost. No total is used: a high originality score cannot compensate for misleading evidence or an unusable enquiry route.

| Criterion | A. Open Edition | B. Signal Room | C. Connected Practice | Reasoning |
|---|---:|---:|---:|---|
| Brand fit | 9 | 8 | 9 | A combines visual judgement and accountable explanation; B foregrounds craft but depends on stronger proof; C makes practical problem-solving explicit. |
| Commercial clarity | 9 | 7 | 8 | A offers direct reading and familiar labels; B can place work before understanding; C clarifies relationships but adds interpretation. |
| Originality | 8 | 8 | 9 | A and B use recognisable publication/exhibition traditions in distinct ways; C has the most specific relational language if it avoids diagram cliches. |
| Visual memorability | 8 | 9 | 8 | B has the strongest visual object and scale contrast; A's typography and evidence spreads are quieter; C's map is distinctive but needs careful restraint. |
| Difference from V1 | 9 | 8 | 9 | A and C replace the dark hero/card grammar completely; B changes structure strongly but retains a dark field. |
| Difference from North East Joinery | 9 | 9 | 9 | Each changes opening, density, media treatment and mobile logic, using the supplied anti-reference. None has been visitor-tested. |
| Accessibility potential | 9 | 7 | 8 | A has the fewest interaction obstacles; B adds media and fixed-navigation risks; C needs careful translation of visual relationships. |
| Performance potential | 9 | 7 | 9 | A and C can be mainly static; B's prominent imagery and possible recordings create greater delivery pressure. |
| Responsive potential | 9 | 8 | 8 | A has a strong extract/caption translation; B needs alternate media crops; C needs a deliberate map-to-linear change. |
| Implementation complexity: simpler is higher | 8 | 6 | 7 | A's editorial rules are manageable; B adds viewing states and media handling; C's connectors and optional state need discipline. |
| Maintainability | 9 | 6 | 7 | A tolerates new text/evidence well with bounded layouts; B incurs recording and crop upkeep; C can become sensitive to text length and relationships. |
| Teesside small-business suitability | 9 | 7 | 9 | A explains without demanding expertise; B may suggest a costly studio; C makes everyday tasks recognisable across sectors. |
| Ability to scale with the business | 9 | 9 | 8 | A can absorb real case studies and broader work; B becomes stronger with a mature portfolio; C needs to keep its map from expanding with every new capability. |

### Ranked recommendation

**1. Open Edition - recommended.**

It best joins the current commercial reality to the desired standard. Teesside Digital needs to be visually distinctive while making limited early evidence useful and honest. A real screenshot with a clear account of a decision is valuable now; later, a genuine client result can take the same place. The identity does not depend on a large portfolio, an expensive film, an artificial product demo or an ongoing publishing schedule.

Its originality comes from a coherent reading structure: a side index, unequal editorial spreads, strong type and visible evidence. That makes it more than the safest light website. It directly challenges the shared V1/Joinery template while keeping actions understandable. Security, accessibility and performance can be evidenced beside relevant work without becoming decorative badges or a separate sales pillar.

Its weakness is real: editorial restraint can become anonymous or text-heavy. Selection should therefore retain the strong spatial idea, not merely approve the serif and blue. If later work reduces it to a conventional hero and card stack, it no longer fulfils this recommendation.

**2. Connected Practice - credible alternative.**

This has the clearest conceptual relationship between the approved services and a potentially distinctive identity. It may be the better choice if Dave places greatest value on explaining how business tasks connect. It is weaker overall because the diagram introduces a layer of interpretation, can imply unnecessarily broad projects, and requires discipline as content grows.

Its useful premise is that visitors recognise problems before technical solutions. Its risk is trying to communicate every relationship visually. The concept should be chosen only if the small map materially helps understanding when compared with plain text, not because the map looks engineered.

**3. Signal Room - strongest later-stage possibility, weakest current fit.**

It offers the strongest immediate visual drama without requiring spectacle, and a mature body of excellent work could make it commercially powerful. Current evidence makes it harder to justify. North East Joinery needs substantial work, QuoteFlow has little meaningful implementation, and no finished client results should be invented to occupy the display space.

The main objection is proof dependency, not the dark palette or the cost of implementation. A technically easy gallery would still be strategically weak if it magnified unfinished work. It should not be selected on the promise that missing evidence will somehow appear during visual implementation.

### Useful ideas to carry into Open Edition

| Source | Carry forward carefully | Keep out to preserve the direction |
|---|---|---|
| Signal Room | One generous view of actual work, followed by a readable detail where the detail proves something. | Dark exhibition surfaces, peripheral bottom navigation, condensed display type and media-viewer choreography. |
| Connected Practice | Plain-language problem-to-response explanations within an editorial spread; a small diagram only where prose alone is less clear. | A homepage-wide network, node navigation, branching enquiry quiz or a second colour/type system. |

These are content and evidence techniques inside A's existing grammar. Do not average the three palettes, combine their navigation systems or add every signature interaction. Accessibility, honest status and dependable forms belong to every option; they are requirements, not optional borrowed ideas.

## Shared truth and design checks

### Founder facts for every territory

The visual treatment may differ, but these facts do not:

| Period | Approved fact | Presentation boundary |
|---|---|---|
| 2005-2007 | Early web-development experience | Do not imply uninterrupted professional web work since 2005. |
| 2007-2010 | Construction | Supports practical experience, not a construction-themed identity. |
| 2010-2021 | Professional tattoo artist and studio owner for approximately 11 years | Supports visual judgement, briefing and accountability; not a tattoo-themed brand or substitute technical qualification. |
| 2022-present | Study at The Open University | Clearly ongoing. |
| Current degree | BSc (Honours) Computer Science with Artificial Intelligence | Still in progress; do not imply graduation. |
| Previous pathway | Approximately two years studying BSc (Honours) Cyber Security before changing pathway | Relevant background in security-conscious thinking, not professional certification or a completed second degree. |

The homepage should communicate who is responsible without reproducing the full chronology. The About page can accommodate it accurately in the selected system. No concept requires a dramatic career-change narrative, a university timetable, a claim of seniority or a large-agency persona.

### Colour checks and their limits

Representative foreground/background pairs were calculated using the WCAG relative-luminance contrast method. Ordinary text generally needs at least 4.5:1; large text has a 3:1 threshold under the criterion's definitions. These are minimum contrast requirements, not a complete accessibility test. See [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

| Pair | A | B | C |
|---|---:|---:|---:|
| Primary text on page background | 14.75:1 | 15.99:1 | 12.16:1 |
| Secondary text on page background | 5.89:1 | 9.44:1 | 5.59:1 |
| Action label on normal action fill | 7.47:1 | 13.56:1 | 6.50:1 |
| Action label on hover fill | 10.42:1 | 15.53:1 | 8.95:1 |
| Action label on pressed fill | 13.82:1 | 10.53:1 | 11.72:1 |
| Control border on main surface | 3.65:1 | 3.88:1 | 3.85:1 |

A and C use white action labels. B must use the specified dark label on citron; light text on that accent would be inappropriate. Decorative dividers are not approved substitutes for control boundaries. Colours with the same role must still be checked on every surface where they are actually used, including form feedback, focus separation, disabled states and image-adjacent content. No text-over-image contrast is assumed.

These palettes describe each territory's principal appearance. A second colour-scheme variant, if later required, must preserve the selected spatial grammar and contrast hierarchy; it must not introduce another territory's identity. Theme switching is not a necessary signature interaction. No theme implementation is authorised here.

### What must be validated after selection, in the appropriate phase

1. **Comprehension:** With ordinary owner-led businesses across different sectors, check whether visitors can identify the three services, solo accountability and direct enquiry route. No service preference or customer response is assumed from the design scores.
2. **Independence:** Compare the selected composition with V1 and the actual North East Joinery site in greyscale and with imagery neutralised. Review navigation, opening, density, section rhythm, proof and mobile together. If removing colour removes the difference, the redesign is insufficient.
3. **Evidence:** Verify screenshots, statuses, live links and demonstrated behaviours before placing them in prominent work areas. Keep illustrative scenarios separate from completed work and measured outcomes.
4. **Responsive behaviour:** Inspect 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920px, plus short landscape viewports and enlarged text. Breakpoint choice follows content pressure, not device names. Do not preserve asymmetry when it makes reading worse.
5. **Accessibility:** Verify semantic order, keyboard navigation, focus visibility and non-obscuration, labels, error recovery, contrast, reflow, text spacing, reduced motion and relevant assistive-technology behaviour. WCAG 2.2 AA remains the target, not an already earned claim.
6. **Performance:** Measure the implemented site against LCP <2.5s, CLS <0.1 and INP <200ms, with Lighthouse targets of Performance >=90, Accessibility >=95, Best Practices >=95 and SEO >=95. Record method, environment, date, results and limits. Static-first architecture makes these plausible; it does not prove them.
7. **Conversion:** Verify actual form acceptance, failure recovery and receipt by Dave before publishing positive delivery language. Agree manual-review scope and realistic capacity before promising a turnaround. No instant report, guaranteed result or automatic security assurance.

These checks identify the consequences of selecting a concept. They do not begin implementation, write final copy, set the Phase 3 architecture or complete the Phase 4 hero.

## Review decision

The recommendation is to select **Open Edition**, including its side-index desktop composition, compact service-led opening, evidence-and-explanation relationships and deliberately reformatted mobile reading experience. Approving only its colour or font would leave the essential creative decision unresolved.

Dave can approve a territory, request a specific revision to one, or reject the recommendation. The alternatives are complete enough to compare without blending them prematurely. Final copy, route and section decisions, hero design, font files, media production and implementation remain outside this task.

## Delivery record

- Created `docs/v2/creative-direction-options.md` only for this task.
- Preserved the pre-existing untracked `docs/v2/phase-0-audit.md`.
- No production code, components, styles, configuration, dependencies or other project documents changed.
- No `creative-direction.md` created. No territory marked approved.
- Documentation checks cover the three 24-part territories, all 13 comparison criteria, ranking, recommendation, approved strategic constraints and ASCII content.
- No build or browser performance claim is made for these unimplemented proposals.

**Phase 1 options complete. Awaiting review. Phase 2 and implementation have not begun.**
