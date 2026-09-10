# Teesside Digital V2 - Motion & Interaction System

Date: 9 September 2026

**Status: APPROVED Phase 5 motion and interaction system.**

Branch confirmed: `redesign/v2`.

## Authority, scope and evidence

Dave has approved Phase 5 with one material amendment: Option B shallow hero mask/frame settle replaces the recommended bounded hero hover zoom. This document records the approved behaviour, timing and technique direction. It does not produce animation code, begin implementation planning or authorise implementation.

The required reading for this continuing task comprises V2_MASTER_BRIEF.md, AGENTS.md, docs/v2/README.md, phase-0-audit.md, phase-0-decisions.md, creative-direction-options.md, creative-direction.md, content-system.md, experience-architecture.md, hero-spec.md, motion-system.md, ARCHITECTURE.md and PLAN.md. These documents were retrieved again for this phase. Earlier complete reading and approved decisions remain part of the continuing project context.

Authority is the latest explicit request, approved Phase 0 decisions, amended creative direction, approved content system, approved experience architecture and approved Phase 4 hero specification. The audit and original territories are evidence/history, not competing approvals. The master brief's older root-level motion-document filename is superseded by the requested docs/v2/motion-system.md location.

The approved north star is **Engineered editorial + kinetic portfolio**. Preserve the **Vertical identity spine + Offer/Directory + atmospheric image field**, with the exact headline **Websites, business tools and practical automation.** Dark remains default; mineral-light remains optional with remembered explicit preference. The mark above live stacked TEESSIDE DIGITAL wording remains the desktop starting point.

No sitemap, services, target market, hero composition, headline, atmospheric-image direction, founder positioning, primary enquiry, secondary manual review or Work gate is reopened. Hero environmental photography is brand atmosphere, not project evidence. The latest hero approval supersedes earlier media-free assumptions in creative-direction.md.

The motion vocabulary and numerical targets below are **APPROVED Phase 5 decisions**, not measured optimums or achieved performance. Geometry ceilings remain subject to the real asset and layout, within the approved behaviour. Final fonts, colours, hero image/crop, exact CSS/JS structure and responsive breakpoints remain DEFERRED. Accessibility and performance statements are requirements, not claims of passes.

### Current V1 inspection and classification

Source inspection covered globals.css, tailwind.config.mjs, BaseLayout, Home, Hero, Header, Navigation, Button, Card, ServiceCard, ProjectCard, MobileMenu, ContactForm and the HealthCheck interaction path, plus package.json and the existing mark. This was source inspection, not a fresh end-to-end V1 browser test.

| Existing system and evidence | Classification for later work | Reason |
|---|---|---|
| Ordinary Astro pages, anchors and static mark SVG | KEEP | Useful content and navigation do not need a motion runtime; the mark's two steel-blue paths need no logo animation |
| Global link/button colour transitions, mostly 200ms | MODIFY | Preserve feedback, restrict affected properties and apply the proposed shared timings |
| Input/Button/Card transition-all declarations | REPLACE | Broad transitions can animate unintended future changes; state contracts should name their visual responsibilities |
| Card shell scale/shadow and image scale-105, generally 300ms | REPLACE | Whole-shell motion can imply clickability where only inner links act; use a stable open entry and smaller bounded image response |
| Global 300ms fade/slide utilities and duplicate Tailwind definitions | REPLACE | A named, limited vocabulary is preferable to generic section entrance classes; definitions alone do not prove every page uses them |
| Hero animate-bounce indicator | REMOVE | Constant decorative movement conflicts with the approved opening |
| Hero dot grid and glows | REMOVE | They are static decorative treatments, not evidence of sophisticated motion; Phase 4 supersedes their visual role |
| Header logo hover opacity and horizontal navigation | MODIFY / REPLACE | Preserve a clear Home affordance; use the approved index and avoid fading brand identification |
| Navigation current-path styling | MODIFY | Preserve truthful location semantics, distinguish exact current page from Work's parent-section context |
| Navigation's optional animated underline | Historical code only | The width-transition example is commented out, not a running V1 animation |
| React MobileMenu | REPLACE interaction treatment | It uses a 300ms entrance, icon transforms, overlay and body-scroll lock; its comment claims a tab trap, but the source does not implement one |
| Escape-to-close and return-to-trigger intent | KEEP principle | Useful for an actual disclosure; it does not by itself prove the current overlay is accessible |
| Reduced-motion wildcard setting durations to 0.01ms | REPLACE | It shortens effects indiscriminately instead of defining understandable static states |
| CSS smooth scroll in BaseLayout/Home | MODIFY | Choose per-purpose native behaviour and a deliberate reduced-motion policy |
| HealthCheck delayed smooth scroll, fades, score bars and spinners | REMOVE from V2 flow | The approved replacement is a manual review, not a diagnostic animation system |
| ContactForm success before fetch acceptance and automatic smooth scroll | REPLACE | Visual feedback currently outruns evidence of acceptance; motion must never imply that a request succeeded before it did |
| Animation-library dependency | KEEP absence | package.json declares Astro 5, React and Tailwind integrations; no dedicated animation or smooth-scroll library is declared |

The searches did not identify a general IntersectionObserver reveal engine, requestAnimationFrame scroll loop or ClientRouter in the inspected source. That is a scoped finding, not proof about every deployed script. No V1 issue is fixed by this document.

### Reference review and limits

All three named references loaded in the in-app browser on this review. Homepages and scrolled states were inspected; no assets or code were copied.

| Reference | What was observable | Interpretation and limit |
|---|---|---|
| [Studio Soph](https://www.studiosoph.co.uk/) | Large website imagery, persistent top navigation and a strongly framed section after the opening | Shows image/text scale and pacing. One captured scrolled state had subdued heading text, but a still frame cannot establish its exact reveal mechanism or timing |
| [ID Studio](https://idstudio.co.uk/) | Layered image-led opening, prominent directional actions, and scrolled service areas pairing imagery with text; navigation presentation differed after scrolling | Useful example of visual emphasis and image/text relationships. Its multiple floating graphic elements and vivid treatment are not Teesside Digital's approved vocabulary |
| [AlfaNest Labs](https://alfanestlabs.com/) | Dark service/project presentation, emphatic labels and a highlighted service panel in the captured state | Atmosphere and contrast are inspectable; no claim is made that the highlight proves a particular hover or pointer mechanism |

**Reliable-motion limitation:** This inspection did not capture frame-accurate image hovers, mask entry/exit sequences, project-route transitions or controlled mobile/reduced-motion comparisons. Exact link motion, scrolling mechanisms and responsive choreography therefore remain unverified. These pages are qualitative references, not measured motion specifications. Continue from Dave's approved qualities without copying Studio Soph or ID Studio choreography, generated artefacts or AlfaNest's security claims.

Official native-platform documentation was checked for technique trade-offs. The modern-web-guidance skill's normal package-fetch workflow was not run because this task prohibits installation; official documentation supplies the technical check instead.

## 1. Governing motion principles

Seven approved principles govern the system.

| Principle | Teesside Digital application | Practical consequence |
|---|---|---|
| Follow a useful intent | The directory responds to the entry being considered; the CTA signals a route to Dave | Movement starts from hover, focus or an actual state change, not a timer seeking attention |
| Keep the reading structure still | Index labels, headline, body copy, captions and limitations remain dependable reading anchors | No letter cascades, text reveals, moving hit areas or displaced focus rings |
| Let imagery carry greater depth | The large environmental field and qualified project imagery receive slower, bounded motion | A photograph can settle or change framing; service names do not perform a showreel |
| Connect evidence to its explanation | A project title can reinforce its corresponding image; captions stay beside the actual subject | No floating image that detaches from its status or appears beside an unrelated claim |
| Treat reversal as normal | Visitors cross links quickly, change their minds and interrupt scrolling | Retarget from the present state; never queue hover sequences or delay activation |
| Design a complete static edition | Dark/light composition, image framing and useful rules already express the brand | Reduced motion, missing images or failed enhancement preserve every task and claim |
| Spend motion where it earns attention | One large image response can be valuable; dozens of simultaneous small effects are not | No idle loops, scroll engine or library added to make otherwise weak composition feel expensive |

The vertical index is the stable reference against which image depth is perceived. The open directory supplies a repeatable directional response. This relationship, rather than a collection of unrelated animations, is the recognisable system.

## 2. Motion intensity model

| Level | Name | Elements | Limit |
|---|---|---|---|
| 0 | Reading and orientation | Mark, headline, paragraphs, metadata, status, errors, current-page indication, theme change | Present immediately; no entrance or exit motion |
| 1 | Directional acknowledgement | Service/CTA arrow and rule, ordinary link affordance, form boundary feedback | Small local changes; no movement of target or layout |
| 2 | Framing response | Eligible linked project image response; user-selected evidence view | One affected image per interaction; bounded, reversible and interruptible |
| 3 | Image-led progression | One shallow hero frame settle, only when it can start cleanly | At most one major automatic Home reveal; zero if readiness, motion preference or performance requires skipping |

Level 3 is a ceiling, not a quota. The hero frame settle is the only planned major automatic Home reveal. Project/evidence imagery remains static until relevant user interaction. If the hero effect is skipped, do not transfer the reveal to a lower section.

Do not stack effects on the hero or repeat its mask throughout the page. After settling, the hero is static. At most one large image moves at once; a direct task takes precedence over decorative motion.

## 3. Approved motion tokens

Use four durations and two spatial easing families. Names describe design roles, not a required CSS API.

| Token | Normal value | Intended use | Reduced motion |
|---|---:|---|---|
| Instant | 0ms | Focus outline, current state, theme palette, errors and acceptance text | Same |
| Fast | 120ms | Ordinary link emphasis and press feedback | Immediate state change |
| Standard | 200ms | Service/CTA directional rule and arrow | No spatial movement; immediate affordance |
| Deliberate | 360ms | Eligible project framing response and return | Static approved crop |
| Image | 480ms | Single shallow hero frame settle when clean-start conditions are met | Full final static frame from the outset |

**Responsive easing:** cubic-bezier(0.2, 0, 0.2, 1), for 120/200ms local responses. It acknowledges interaction promptly without overshoot.

**Settle easing:** cubic-bezier(0.22, 1, 0.36, 1), for 360/480ms image framing. It moves most visibly early and settles into the final composition. It must not create a long perceptual tail through oversized distance.

Use linear interpolation only for a short opacity change between user-selected evidence views, if justified; it is not the default for spatial travel. No spring, bounce, elastic or back-overshoot family.

Rules:

- Default delay: 0ms. Never delay focus, activation, form validation, navigation or access to content.
- No stagger for headline, navigation, services or evidence disclosures. Optional coordinated elements start together; there is no sequential unveiling of the three services.
- Normal exit uses the same role token as entry, retargeting from the current state. A short interrupted move may naturally finish sooner; do not enforce a minimum visual duration.
- Maximum planned decorative duration: 480ms. Do not add multiple tokens in series to manufacture a longer scene.
- Rapid repeated input wins over choreography. No replay queue or finish-before-click requirement.
- A runtime change to reduced motion cancels decorative spatial work and applies the useful static state immediately.

Values are approved design targets, not empirical guarantees. They are short enough to support direct tasks while allowing large imagery a visibly different pace from links.

## 4. Approved hero motion system

### Identity spine

The existing TD mark and live TEESSIDE DIGITAL wording remain still. No drawing-on, rotation, stroke animation, opacity dip or logo assembly. The Home link has ordinary visible focus and restrained underline/emphasis feedback.

Navigation labels stay fixed. A static current-location mark establishes orientation; section 7 explains why a travelling marker is not recommended. Discuss your project receives the primary directional treatment in section 8. Free website review uses a quieter text-link response. The theme utility displays its true choice immediately, without spinning symbols.

### Headline and copy

Keep **Websites, business tools and practical automation.** entirely still. The supporting sentence and factual cues are also static. No text splitting, entrance fade, word replacement, hover reaction or scrolling opacity.

This leaves commercial clarity available while the photograph supplies the richer visual response. A static headline is a deliberate anchor, not an unfinished animation slot.

### Service directory

Each full service-name link remains visible with its descriptor. Use the shared rule-and-arrow response specified in section 6. Do not move the label or descriptor, animate neighbouring entries or change their content.

### Atmospheric image field

**APPROVED: Option B - shallow partial mask / frame settle.**

The baseline is the complete final image frame, integrated with the mineral field. If enhancement can start cleanly, the photograph begins already substantially visible within a very shallow constrained frame and settles to its final approved extent. Use no more than approximately 2% inset per edge, approximately 480ms and the approved settle easing.

This is architectural settling of the frame, not a reveal from black, full wipe, dramatic curtain, zero-width/height entrance or loading animation. The photograph itself is not scaled, panned or swapped as part of the effect. Exact base crop and robust clipping technique await the real asset and layout.

The mark, offer, headline, supporting copy, navigation, service directory and enquiry remain fully visible and usable throughout. Nothing waits for animation or image decoding. The environmental photograph remains brand imagery, not Work evidence.

**After the single settle, the hero image remains static.** No hover zoom, pointer tracking, parallax, scroll-relative movement, automatic swapping or additional mask animation is layered onto it. The normal cursor and ordinary document scrolling remain. Decorative photography adds no keyboard tab stop.

### Readiness and one-shot behaviour

A clean start means the shallow starting frame can be established before the image's first visible presentation, without delaying that presentation or hiding useful content. If that cannot be guaranteed, use the final static frame immediately. Never display the final image and then retroactively clip it to start the effect.

Skip the effect when:

- Image readiness is late, especially after the opening has become readable.
- A restored scroll position lands inside or below the opening.
- Reduced motion is active.
- Performance, device or viewport conditions make the effect inappropriate.
- Enhancement or its readiness check fails.

A new eligible document visit may have one settle; it does not replay on hover, scroll re-entry, theme change, resize or history restoration. If reduced motion becomes active or the user scrolls away during the settle, stop the optional motion and retain the final frame without moving focus or scrolling back. The effect must not rely on an animation-end event to expose the image.

On the approved static touch/coarse/no-hover presentation, skip the effect. Image failure leaves the complete mineral-field offer and navigation; when a late image becomes available, show its final frame without a compensating reveal.

The transition into the next homepage responsibility is ordinary scrolling and composition. Do not pin the hero, morph its photograph into project evidence or add a lower reveal when this effect is skipped.

## 5. Hero-image treatment decision and historical alternatives

**APPROVED: B - shallow partial mask / frame settle.** Dave selected this treatment to give the integrated atmospheric field one controlled cinematic moment without stacking effects.

| Treatment | Status | Rationale and boundary |
|---|---|---|
| A. Bounded hover scale/crop response | Not selected for the hero; historical recommendation only | The earlier scale-to-1.025 recommendation is superseded. Do not add it after the approved settle |
| B. Shallow frame settle | APPROVED | Already substantially visible image; at most approximately 2% inset per edge to the full frame, approximately 480ms, settle easing |
| C. Scroll-relative compositional shift | Not selected | No hero parallax, scroll-relative movement or continuous scroll work |

B requires careful readiness and clipping handling. Its baseline is the final frame; late readiness, restored position, reduced motion, unsuitable performance or failed enhancement produce the static version. Avoid complex masks and large paint costs; the exact simplest robust technique remains deferred until the asset/layout are known.

No secondary hero motion is approved. The static post-settle image, still identity spine and directional service links form the intended hierarchy. Do not reproduce distinctive reference-site choreography or turn the shallow frame change into a repeated page-wide reveal.

## 6. Service-link kinetic signature

Applies consistently to:

- Websites & Web Development -> /services/#websites-web-development
- Apps & Digital Tools -> /services/#apps-digital-tools
- Automation & AI -> /services/#automation-ai

**Signature: fixed label, extending directional rule, advancing arrow.**

Each name is a real link with a stable padded activation area. Its descriptor remains adjacent ordinary text. Keep the neutral separators that organise the directory static. Within each link, a decorative directional rule segment leads towards the arrow; it is part of the same link, not another button or a fourth separator around a tile.

Approved starting geometry: rest segment length 16px within a reserved 40px slot. Engaged length: 40px. Express this later by transform/masking inside reserved geometry, not by changing layout width. The arrow advances 3px horizontally within its reserved space. The label and descriptor remain fixed. All directional details are non-essential decoration with no duplicate accessible label.

| State | Label / descriptor | Rule / arrow | Access and timing |
|---|---|---|---|
| REST | Full name and useful descriptor visible; recognisable link affordance | Short rule and arrow visible | No dependency on hover to recognise navigation |
| HOVER | Same text, position and readable contrast | Rule extends; arrow advances 3px | 200ms, responsive easing; stable anchor box |
| FOCUS-VISIBLE | Same content; independent immediate outline around the actual target | Same engaged response, unless reduced motion | Focus outline appears at 0ms and is never clipped by the decoration |
| ACTIVE / PRESS | No text movement or scale; clear pressed emphasis | Hold the engaged position; no extra travel | 120ms emphasis at most; navigate immediately on activation |
| TOUCH | Ordinary complete resting content | Optional static pressed emphasis only | One tap follows the link; no tap-to-preview |
| REDUCED MOTION | Same text and contrast; immediate focus indication | No extension or arrow travel; static underline/emphasis signals engagement | All information and actions remain present |

No neighbouring-entry dimming is approved. It adds little to an already clear three-entry directory and creates contrast and focus/hover precedence problems. Neighbours retain their normal readable styling in every state.

On rapid entry/exit, reverse from the current decoration position without snapping to an artificial start or queueing work. If keyboard focus remains on an entry after pointer exit, preserve its focus treatment. If hover and focus concern different links, focus remains clearly identified; neither entry becomes hidden or falsely selected.

The descriptor area is not a false click target. Do not animate the entire row on hovering unrelated blank space unless that entire area is the actual single anchor and its semantics remain clear. No service cards, icons, numbering, repeated Learn More buttons or fake loading.

## 7. Side-index interaction

**APPROVED: static truthful location indicator, not a travelling rail marker.**

The index links mainly lead to documents, not homepage sections. A moving indicator between them would require cross-navigation continuity or imply scroll-spy behaviour that the architecture does not define. The directional link system already supplies tactile feedback.

| Destination/context | Location state | Interaction |
|---|---|---|
| Brand/Home on / | Exact current page, visible static mark | Home link stays still; underline/focus feedback |
| Services on /services/ and its fragments | Services is the current page | Fragment arrival does not create three global app states |
| Work on /work/ | Exact current page | Present only when eligible |
| Work on /work/northeast-joinery/ | Parent-section context, not falsely the exact current page | Visible Work context; exact detail title/local navigation identifies the page |
| About on /about/ | Exact current page | Ordinary index link response |
| Discuss your project on /contact/ | Exact current destination, still the primary action | No disabled styling or repeated Contact entry |
| Free website review on /website-review/ | Exact current destination, secondary hierarchy retained | Quiet underline/focus feedback |
| Privacy/legal/recovery routes | No invented matching global item | Page heading and relevant local context provide orientation |
| Dark / Light | Selected preference, never a route/current page | Name and selected state update immediately |

Use exact current-page semantics for actual destinations; a parent Work section must be distinguishable from that claim. On direct loading, reload and back/forward, the correct state is available from the destination document, without flying in from Home.

If Work is unpublished, it is absent from normal navigation and related discovery. Do not leave a disabled slot or animate the other links into a simulated replacement. The atmospheric hero is unaffected and does not unlock Work.

A travelling indicator is not approved, so there is no movement on hover, scrolling, direct navigation or project-detail arrival. Reduced motion receives the same static indication.

For the compact navigation arrangement, prefer the already approved accessible visible directory where it fits. If later detailed layout needs disclosure, open/close it directly without a staggered menu or animated height; expose meaningful expanded state, support Escape and appropriate return to the trigger when closing by keyboard. Do not create a modal overlay or body-scroll lock merely to imitate V1. A modal, if ever justified, requires its own focus contract rather than trusting V1's comment.

## 8. Primary CTA motion

**Discuss your project** uses the directory's directional vocabulary with a stronger permanent emphasis, not a generic fill-on-hover button.

Keep a stable target, fixed text and a visible directional rule/arrow. Its supporting plane or border, if chosen in detailed design, is static and must maintain contrast in both themes. The rule grows from 20px to 48px within reserved geometry, and the arrow advances 4px in 200ms. That slightly larger endpoint distinguishes the primary action without inventing another animation family.

Hover and keyboard focus share that directional response; keyboard focus also has an immediate independent outline. Pressing gives a 120ms or immediate emphasis change, with no target scaling and no waiting for the animation before navigation. Touch activates in one tap with no hover preview. Reduced motion keeps the arrow fixed and uses static emphasis/underline and focus.

Repeat this behaviour wherever the same primary enquiry action appears. Do not duplicate the hero action merely to display the animation. Free website review remains the quieter ordinary link treatment, not a second primary motion pattern.

No magnetic behaviour, excessive scaling, bouncing, glow, liquid morph, cursor replacement or text-swapping invitation.

## 9. Theme transition

**APPROVED: immediate coordinated palette change, 0ms for both normal and reduced motion.**

A dark/light crossfade is not automatically accessible. Independently interpolating dark text towards light text while the field changes the other way can produce poor contrast in the middle, even when both endpoints pass. Until actual tokens exist, there is no defensible universal crossfade interval that guarantees readability.

Change the page field, reading text, rules, control surfaces and state colours together. Do not use an intermediate blank white/black frame, full-screen overlay, animated wipe, root snapshot crossfade or spinning sun/moon. A direct intended change to a light palette is distinct from an unintended loading flash; the latter must be prevented.

Keep photographs unchanged. No automatic greyscale, inversion, brightness sweep or hue shift on hero/project evidence. If later themes require different static tonal integration, test the image/text relationship in each theme without implying that evidence itself changed.

The named theme control keeps focus and exposes the new choice immediately. Do not animate its label off-screen, show fake saving or add a delay before acknowledging selection. Actual persistence, storage failure and first-paint initialisation remain engineering work. First visit is Dark; remembered explicit Light takes precedence. A failed save must not block a current-visit change or navigation.

This intentionally still transition gives visitors a dependable utility while imagery and directional links carry the motion identity.

## 10. Eligible Work and project motion

The Work gate is unchanged. North East Joinery must have useful inspectable evidence, honest demonstration/WIP status, disclosure of substantial work remaining, actual behaviour and decision explanations. No amount of image polish qualifies weak evidence.

### Project entry and title/image relationship

Use a stable project title link with the same 200ms directional response. Its associated image may scale to at most 1.02 in 360ms on link hover or focus, provided the crop does not conceal the subject being evidenced. Status, limitations and explanation do not move or fade.

Where the image itself links to the same detail, make that destination and accessible name clear. Prefer a coherent single title/image link where semantics allow; keep contextual links outside it. Do not create nested links or make an unrelated whole section appear clickable. Non-linked screenshots must not receive a pointer cursor merely because they can respond visually.

Use one linked image response, not independent image/title/card-shell transforms. Fine-pointer hover and keyboard focus can reinforce the same relationship; reduced motion and touch retain static framing.

### Evidence framing boundary

Do not automatically run the former below-fold evidence mask settle on Home. Eligible project/evidence imagery is static until relevant user interaction. Status, limitations, explanation and evidence context remain completely static and visible throughout any permitted image response.

Richer project behaviour later needs justification from actual content; it is not automatically authorised by the kinetic portfolio direction. Do not animate a staged reconstruction of product UI or imply functionality absent from the real project.

### Image sequences

Do not invent a carousel simply because several screenshots exist. Prefer a readable sequence with each image's caption adjacent. If a real comparison requires an explicit view selector, provide labelled buttons with meaningful selected state and direct access to each view.

For such a justified selector, retain the approved 120ms image-only crossfade after the requested asset is ready; caption and selected-state changes occur together at the actual view change. Keep focus on the selector. No autoplay, hidden status, delayed limitations or swipe-only controls. Under reduced motion, change views directly. On failure, keep the current useful view and show an honest recoverable message; do not fade to an empty panel.

### Overview to detail

Use normal browser navigation. Do not morph the hero's environmental photograph into a North East Joinery screenshot or carry a project image across pages while its demonstration label disappears. The detail page presents its title, type/status and limitations without an entrance sequence.

Motion must never imply measured results, clients, finished status or working features that the source project cannot demonstrate.

## 11. Section entry and exit

**APPROVED:** Ordinary text and task content simply exist: headings, paragraphs, services, founder/accountability content, contact/review forms, legal content, captions, limitations and footer.

No universal fade-up, opacity-zero initial text, standard translateY section reveal, staggered section entrances or content-gated choreography.

**The hero shallow frame settle is the only planned major automatic Home reveal.** It runs at most once under the clean-start conditions in section 4. There is no second automatic reveal for below-fold evidence, no replay on returning to a section and no section exit animation.

Qualifying project/evidence imagery remains static until an appropriate user interaction, using the approved bounded project response. If the hero settle is skipped, do not transfer its motion allowance to another image or create a substitute reveal. Zero major reveals is acceptable.

Image scale within the composition, varied section density and evidence beside explanation provide pacing without automatic animation. No observer should make every section an animation target.

## 12. Page transitions

| Option | Benefits | Costs and risks | Recommendation |
|---|---|---|---|
| A. Normal browser navigation | Fits Astro's static pages, direct URLs, normal back/forward and document lifecycle | Less continuous visual movement between pages; initial theme must still be correct | APPROVED for V2 launch |
| B. Native View Transition enhancement where supported | Can connect document views without requiring a custom router; progressive fallback is possible | Snapshot cost, varying cross-document support, interruption/contrast/focus testing; can hide status during shared-image movement | DEFERRED future experiment requiring separate approval; not part of launch |
| C. Custom JavaScript transition system | Full choreography control | Owns routing/history, timing, cancellation, focus/announcement and failure handling; added runtime/maintenance | Reject for this requirement |

**APPROVED: A - normal browser navigation for V2 launch.** The most valuable kinetic relationships are local: service to destination, image to explanation, pointer action to a bounded response. Continuous page choreography adds less value to an owner trying to enquire.

Native cross-document View Transitions require participating same-origin documents and do not have uniform support across all browsers. Do not infer cross-document support from support for same-document transitions. Unsupported browsers must keep ordinary navigation. [MDN cross-document transition reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@view-transition)

Astro's ClientRouter is a separate opt-in routing choice, not a prerequisite for ordinary native browser navigation or a reason to add client routing here. Its accessibility features do not remove the need to verify focus and announcements for the actual application. [Astro view-transition documentation](https://docs.astro.build/en/guides/view-transitions/)

With A, preserve native back/forward scroll behaviour; do not force every visit to the top or rerun a reveal on restoration. Each destination has an informative title, heading and skip link. Native navigation still needs assistive-technology testing; do not claim that a fresh document guarantees every browser/screen-reader combination behaves identically.

If B is approved separately, it needs reduced-motion opt-out, no mandatory delay, stable theme, interruption safety, normal history fallback and a focus/announcement contract. Shared transitions must not separate a screenshot from its evidence status. No custom exit gate should delay sending the browser to the destination.

## 13. Scroll behaviour

Normal document scrolling is mandatory. No scroll-jacking, inertia hijacking, forced horizontal scrolling, mandatory snap points or smooth-scroll engine replacing the browser. No pinning the hero until an animation finishes.

**APPROVED: ordinary immediate native fragment navigation by default.** The service directory usually navigates to another document plus a fragment; a long smooth trip on the destination adds little orientation. Keep the relevant heading clear of any sticky navigation and preserve a meaningful fragment URL.

Native smooth scrolling can be useful for an explicit short same-page contents jump, but is not recommended globally here. If later justified for such a specific control, retain native interruption, use the browser's own timing, avoid custom duration logic and make reduced motion immediate. Do not use it for form validation, receipt feedback or automatic scrolling after a timer.

Visual clipping/transforms must never change document scroll distance or hijack wheel/touch input. The approved hero treatment has no scroll-linked JS. A one-shot observation may be used only if genuinely necessary for a clean start; it must not trigger a late hero replay or an automatic evidence reveal.

## 14. Technique classes for later engineering

These are approved technique directions, not a file-by-file build plan or code.

| Proposed behaviour | Simplest suitable class | Why / boundary |
|---|---|---|
| Service/CTA rule and arrow | CSS transforms in reserved geometry; ordinary hover/focus/active state | No per-frame JS or layout width animation needed |
| Hero shallow frame settle | Simplest robust CSS clipping/masking with minimal readiness state, once the real asset/layout are known | At most approximately 2% inset to final frame; no image scale, tracking or scroll linkage |
| Linked project image | CSS state relationship and transform | Title/image relationship can share state without a gallery runtime |
| One-shot observation, only if actually needed | Minimal IntersectionObserver state | May support clean-start eligibility; never a general reveal engine or late replay trigger |
| Justified image selector | Lightweight JS state plus short opacity transition | User-selected view and loading/error truth justify state; no autoplay |
| Current navigation | Static document state and CSS | No geometry tracker or travelling indicator |
| Theme | Small state change; coordinated static style roles | No snapshot/wipe runtime; persistence separately specified later |
| Form feedback | Native/semantic state plus text and limited border/emphasis change | Receipt/error meaning does not depend on animation |

Prefer transforms and opacity where they avoid layout/paint work, but do not treat them as free: oversized raster layers still cost memory and compositing. Measure actual rendering. [web.dev animation performance guide](https://web.dev/articles/animations-guide)

Clip-path performance depends on the shape, element and browser. Use a simple inset; avoid complex SVG masks, animated blur and filters over large photographs. An overflow crop is preferable when it meets the same visual need without animated clipping.

requestAnimationFrame is not required by the approved hero. If a future justified effect needs it, use one bounded update per frame, stop it offscreen/hidden and never poll continuously while idle. Web Animations API may help cancellation for a genuinely complex explicit state change, but no current requirement needs it. Native View Transitions remain the unselected alternative in section 12.

No GSAP, Framer Motion, animation-specific React island, Lenis or other animation library is approved for this system. Native/CSS methods are sufficient for the approved vocabulary. A future dependency would require a concrete unmet capability, measured bundle/runtime cost and maintenance rationale before approval; reputation or reference-site usage is not enough.

## 15. Approved motion performance targets

These are approved Phase 5 targets for later measurement, not achieved results. Provisional hero-image transfer ceilings remain planning targets requiring actual asset evaluation.

| Budget area | Approved target | Failure response |
|---|---|---|
| Motion-library transfer | 0 bytes | Remove the library unless a separately approved need exists |
| Incremental motion JS | Aim <=5KB gzip on any affected page, excluding unrelated existing app/form/theme code | Simplify observation/view state before requesting a larger budget |
| Incremental motion CSS | Aim <=3KB gzip for shared motion rules | Consolidate the vocabulary; avoid per-section one-offs |
| Idle animation | 0 loops; 0 continuous frame callbacks | Stop or remove idle effects |
| Scroll-linked JS | 0 continuous scroll handlers for the approved system | Use native scrolling and one-shot observation |
| Pointer tracking | 0 for the approved system | Keep hero static after settling; project response uses enter/leave rather than tracking |
| Concurrent large moving images | At most one | Finish/cancel the optional hero settle to its static frame if a relevant direct interaction takes precedence |
| Main-thread motion work | Target <=2ms per active frame at the 95th percentile on the agreed test device; no motion-attributable long task >=50ms | Reduce area/complexity or use static presentation |
| Frame budget | Aim to fit rendering within the device refresh interval, about 16.7ms at 60Hz; motion gets only a small part | Profile actual painting/compositing, not just script duration |
| Motion-induced layout shift | 0 intended shift from decorative transforms/states | Reserve image/control geometry; remove geometry animation |
| Hero image | Working transfer ceiling 300KB for a delivered desktop candidate and 180KB for compact, subject to readable image quality and actual LCP | Choose a better crop/encoding/size rather than lowering readability or inventing a pass |

The image limits are provisional asset-delivery budgets, not exact asset selection or a promise that every device receives the same file. Decode cost follows pixel dimensions, not just compressed bytes. Avoid decoding several high-resolution candidates or maintaining several full-viewport layers simultaneously. Image readiness must not delay essential content.

Do not animate width, height, margin, padding, top or left for these decorative behaviours. Reserve geometry and move inner presentation. Avoid global transition-all, blanket will-change promotion, large animated shadows/filters and unnecessary persistent compositing layers.

Input listeners must not block normal scrolling. Where later observational wheel/touch listeners are unavoidable and never cancel input, use passive semantics; passive does not make expensive work cheap. Do not read layout and write styles repeatedly in the same frame. Pause/cancel optional work offscreen, in hidden tabs and on a runtime reduced-motion change.

Mobile GPUs, memory and thermal/battery conditions can make a simple large-image transform expensive. The approved touch presentation is static partly for that reason. Test on real mobile hardware before claiming smoothness.

Preserve LCP <2.5s, CLS <0.1, INP <200ms and Lighthouse Performance >=90, alongside the existing Accessibility >=95, Best Practices >=95 and SEO >=95 targets. Lightweight source is not proof these targets are met. Record page, viewport, device, network, cold/warm load and image state when validating later.

## 16. Deliberate reduced-motion system

Respect prefers-reduced-motion from first presentation and respond if it changes while the page is open. It communicates a user preference; do not infer it from age, device price or theme choice. [MDN reduced-motion reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)

| Normal behaviour | Reduced-motion replacement |
|---|---|
| Service rule extension | Static underline/emphasis on engagement; no growing line |
| Service/CTA arrow movement | Fixed arrow, immediate visible focus and pressed state |
| Hero shallow mask/frame settle | Complete final approved static crop/frame from first presentation |
| Project image response | Static image; title/link focus still unmistakable |
| Automatic evidence mask settle | Not part of the approved system in either motion mode |
| Current navigation indication | Same static truthful mark |
| Theme transition | Same immediate coordinated palette change |
| User-selected evidence image crossfade | Direct view/caption/state change when ready |
| Section entry | Fully present text and imagery |
| Page navigation | Normal browser navigation |
| Fragment navigation | Immediate native arrival |

Do not shorten every animation to 0.01ms. Remove the spatial mechanism and supply the intended complete state. No invisible initial opacity, partially hidden proof or animation-end dependency may survive when motion is disabled.

Static presentation retains the side index, open rules, photographic scale, precise spacing, readable states and dark/light material identity. No user task, disclosure or piece of evidence is lost.

## 17. Mobile, touch and constrained conditions

| Condition | Behaviour |
|---|---|
| 320px | Final static hero crop/frame; full service names wrap; no rule/arrow decoration may cause overflow or crowd the text |
| 375px | Same direct activation and static imagery; test the long website service label and full CTA |
| 390px | Same vocabulary; verify comfortable target separation and image/text relationship |
| 430px | Do not turn on desktop tracking simply because there is more width; retain pointer-capability rules |
| Tablets | Layout follows available space; motion follows actual input/reduced-motion capability, not the label tablet |
| Coarse pointer or no hover | Final static hero frame, no image hover response/tracking or automatic evidence mask; one tap activates links |
| Hybrid device | Touch never requires a preliminary hover; any eligible project fine-pointer response must not persist as a stuck touch state; hero never gains hover zoom |
| Short landscape / zoom | Release obstructive stickiness, preserve navigation and focus; do not animate height changes to save the composition |
| Slow image decode / weak GPU | Show the final static frame; do not retroactively clip an already-read image or queue a late reveal |

These widths are verification conditions, not fixed breakpoints. The image composition may change responsively as approved, but do not animate a browser resize between desktop and compact layouts. Reflow should settle directly, with no scroll displacement created for atmosphere.

The directory's static rule/arrow remains a signature on touch. Its appeal must not depend on first-tap animation. Keep body reading, manual scrolling and enquiry more important than decorative depth.

## 18. Accessibility requirements

Target WCAG 2.2 AA; this document does not claim compliance.

- Essential content is never animation-gated. Screen readers receive ordinary semantic text, links, headings and states independent of visual timing.
- Focus appears immediately and remains visible outside masks/crops. Inner arrow movement must not move the control or focus ring.
- Do not move focus because an image entered the viewport, a theme changed, a pointer left or an animation ended.
- Keep focus on explicit view/theme controls during their state changes. A route change follows the chosen document-navigation contract.
- Hover and focus provide equivalent information and affordance, without requiring identical decorative pointer behaviour.
- No flashing, strobing, rapid alternating luminance or seizure-risk effects. No repeated automatic dark/light toggling.
- Neighbouring services remain readable. No group-opacity dimming that weakens text, status or action contrast.
- Photograph movement must preserve text/control contrast at all intermediate crops; static endpoints alone are insufficient if text overlaps imagery.
- Decorative rules/arrows do not add redundant announcements. A decorative non-linked hero image adds no tab stop.
- Form errors and receipt information are textual and semantically associated; a border flash or spinner cannot be the only message.
- Test reduced motion, high zoom, text spacing, forced colours, keyboard, touch and relevant screen-reader/browser combinations.
- If future page-transition enhancements are approved, define focus restoration, page-title announcement, history restoration, cancellation and snapshot behaviour before using them. Do not assume animation completion is the right point to announce a page.

For an actual invalid form submission, deliberate focus movement to a useful error summary or first invalid field may help recovery. That is task feedback, not decorative motion; it should be immediate, predictable and announced appropriately. Do not automatically smooth-scroll to an unverified success message.

## 19. Shared interaction-state vocabulary

States describe actual behaviour. Not every control needs every state.

| Element | Rest / hover | Focus-visible / press | Current / selected | Loading / disabled |
|---|---|---|---|---|
| Ordinary text link | Recognisable underline or equivalent; 120ms emphasis at most | Immediate focus; normal activation | Current only when it represents the actual page | No fake loading or disabled anchor attribute |
| Service link | Full name/descriptor; 200ms directional response | Stable focus; press never delays fragment navigation | Not selected like a tab | None |
| Primary CTA | Strong permanent emphasis; larger directional rule/arrow | Immediate outline; direct navigation | Current on Contact where appropriate | Not disabled because already current |
| Secondary review route | Quiet ordinary-link treatment | Same access, less visual intensity than primary | Current on review page | Paused service uses honest page content, not a decorative disabled nav item |
| Theme utility | Named choices and understandable state | Keyboard-operable; focus retained | Actual Dark/Light preference | No fake saving; failure to persist does not block current use |
| Project title link | Directional treatment tied to its real image | Focus reinforces same relationship | Exact route/local context only | No availability implied before evidence gate |
| Image link | Clear destination and accessible name | Visible stable focus outside crop | Only if actually meaningful | No click affordance on non-link imagery |
| Form field | Readable label; modest boundary emphasis | Immediate focus; no label flight or shake | Checked/selected for genuine choice controls | Disabled only when truly unavailable and explained |
| Form submit | Clear ready state | Direct submit action | Not a selected/current item | Sending only while a real request is pending; truthful retry/acceptance outcome |
| Evidence-view selector, only if needed | Clearly labelled views | Focus stays on selector | Actual displayed view | Genuine loading/error if requested asset unavailable |

Precedence: disabled/unavailable functionality is explicit; focus indication is always visible; pressed state does not hide focus; selected/current state remains readable during hover. Do not let a global anchor hover rule override CTA text into its background colour.

For real pending form submission, use a stable text label such as Sending... and prevent accidental duplicate submission without removing the control or losing focus. No minimum spinner duration, fabricated progress percentage or success-on-click. On failure restore a useful retry state and retain entered data. Show accepted wording only after the appropriate acceptance evidence; acceptance is not proof an email was delivered or a manual report completed.

No animated form success celebration, error shake, simulated review scan or automatic score count-up. The free review remains Dave's later manual work, not a live computation presented by the page.

## 20. Specific failure modes

| Failure | Symptom | Correction |
|---|---|---|
| Animation everywhere | Every viewport entry moves something | Restore Level 0 reading and the hero-only automatic reveal limit |
| Universal fade-up | Text starts invisible and translated | Present text immediately; reserve framing for eligible imagery |
| Portfolio showreel | Project motion dominates titles/status and enquiry | Keep explanation and truth visible; simplify image relationships |
| Sluggish transitions | Clicks wait for exit; effects replay in a queue | Navigate immediately; retarget/cancel rather than queue |
| Overlong theme switch | Full-screen wipe or muddy intermediate contrast | Immediate coordinated palette change |
| Scroll-jacking | Wheel input drives scenes instead of the document | Restore native document scrolling |
| Moving hit targets | CTA shell translates or scales under the pointer | Move only bounded inner decoration |
| Motion-dependent navigation | Indicator movement is the only location cue | Static current state and clear links |
| Low-contrast de-emphasis | Other services fade into the background | Keep neighbours unchanged and readable |
| Excessive image zoom | Screenshot details disappear or hero begins zooming | Hero has no zoom; keep eligible project response within approximately 1.02 or static |
| Generic parallax | Every image drifts at a different speed | Hero stays static after its one settle; project response is user-triggered, not scroll-relative |
| Too much pointer tracking | Whole page reacts to cursor position | No tracking in the approved system |
| Mobile GPU/battery cost | Large layers animate during touch scroll | Static coarse-pointer imagery; measure actual devices |
| WIP appears finished | Status arrives after a polished reveal or disappears on navigation | Keep status/limitations static and enforce publication gate |
| Copied reference choreography | Distinctive Studio Soph/ID Studio sequences reproduced | Use the independent rule/arrow/framing vocabulary |
| Library without need | Runtime added for hover, scrolling or simple masking | Prefer native/CSS; require a demonstrated unmet need |
| Late image entrance | Already-read content disappears then animates | Full baseline; skip enhancement when readiness is late |
| Misleading receipt | Message Sent appears before acceptance | Drive state from real outcome, never animation timing |
| Resizing becomes theatre | Columns/image travel while width changes | Immediate robust reflow and stable scroll |
| Hero effect stacking | Hover zoom, pointer response or parallax added after the frame settle | One shallow settle, then static; no secondary hero animation |
| Repeated mask reveal | Hero treatment reused on every image or below-fold evidence | Hero is the only planned major automatic Home reveal |
| Reference-led excess | Motion added merely because Studio Soph or ID Studio uses it | Require useful intent within the approved vocabulary |
| Motion quota | Skipped hero effect replaced with an evidence reveal | Accept zero reveals; do not compensate |
| Fake interaction on imagery | Decorative hero looks like a hidden button | Normal cursor, no new tab stop, no invented destination |

## 21. Approved behavioural contract

This contract records Phase 5 approval for later use. It is not authorisation or an implementation plan.

- Preserve the approved spine, explicit headline, Offer/Directory and substantial environmental image.
- Keep text, status, controls and current-location anchors still. Motion follows useful intent and remains interruptible.
- Tokens: Instant 0ms, Fast 120ms, Standard 200ms, Deliberate 360ms, Image 480ms. Zero default delay; no headline/navigation/service stagger.
- Easing: responsive cubic-bezier(0.2, 0, 0.2, 1); settle cubic-bezier(0.22, 1, 0.36, 1). No spring, bounce or elastic movement.
- Hero: Option B shallow frame settle, at most approximately 2% inset per edge to the final frame, approximately 480ms with settle easing; substantially visible throughout.
- Hero baseline/fallback: complete final static frame. Skip on late readiness, restored scroll, reduced motion, unsuitable performance or enhancement failure. Never retroactively clip an already-read image.
- After settling: static hero. No hover zoom, tracking, parallax, scroll shift, swapping or additional mask animation.
- Automatic Home reveal limit: hero only, at most once. No automatic evidence settle or compensating reveal when the hero is skipped.
- Services: fixed label/descriptor, rule 16px to 40px and arrow +3px, 200ms; reserved geometry, unchanged neighbours and immediate independent focus.
- Primary CTA: fixed text/target, rule 20px to 48px and arrow +4px, 200ms; direct activation.
- Side index: static truthful current-page/Work-parent context; no travelling marker or homepage scroll-spy.
- Theme: immediate coordinated palette change at 0ms, unchanged photographs and retained focus.
- Work: evidence-gated user-triggered image response up to approximately 1.02 over approximately 360ms; static on touch/reduced motion, with status and explanation always present.
- Pages/scroll: ordinary browser navigation, native scrolling and immediate fragment arrival. Future native View Transitions need separate approval.
- Reduced motion: complete static frame/crops, emphasis and states; no blanket 0.01ms workaround.
- Tasks: feedback follows actual acceptance/failure, never success-on-click, simulated scans or fake progress.
- Dependencies: no animation library, custom router, smooth-scroll engine or animation-specific React island.
- Performance budgets and web-vitals/Lighthouse thresholds are approved targets to measure later, not achieved results.

## 22. Phase 5 approval record and deferred work

Dave approved the motion and interaction system with the amended hero-image choice.

| Decision | Approval |
|---|---|
| Motion principles and tokens | APPROVED: stable reading/controls, useful intent, selective imagery depth, complete static edition and interruption-safe values |
| Primary hero treatment | APPROVED: Option B shallow partial mask/frame settle |
| Hero after settle | APPROVED: static, with no added hover zoom, tracking, parallax, scroll movement, swapping or mask replay |
| Automatic major Home reveal | APPROVED: hero only; zero if skipped; no automatic below-fold evidence settle |
| Service/CTA signature | APPROVED: fixed text, extending directional rule and advancing arrow in reserved geometry |
| Navigation indication | APPROVED: static truthful location state, including Work parent context |
| Theme transition | APPROVED: immediate coordinated change at 0ms; photographs unchanged |
| Work interaction | APPROVED: truthful eligible user-triggered framing response; static disclosures and limits |
| Page navigation and scrolling | APPROVED: normal browser navigation and native scroll, immediate fragment arrival |
| Dependencies | APPROVED: no animation dependency for this system; any future dependency requires separate justification |
| Performance/accessibility requirements | APPROVED as targets and acceptance requirements, not verification results |

The earlier Option A hero zoom and automatic evidence-mask proposals remain historical rationale only. They are not alternative launch choices or additional effects waiting to be implemented.

**DEFERRED:**

- Implementation and the implementation plan.
- Exact CSS/JS structure and the simplest robust hero clipping/readiness mechanism.
- Exact hero image asset and crop.
- Final colour tokens and font families.
- Exact responsive breakpoints.
- Measured performance and actual image-delivery evaluation.
- Accessibility testing and browser/device verification.
- Any future native View Transition experiment, requiring separate approval.

No remaining Phase 5 choice is presented as awaiting approval. Deferred engineering and verification do not reopen approved architecture, hero positioning or the Work evidence gate.

Only docs/v2/motion-system.md is updated. No other document, production code, component, style, asset, dependency or configuration is changed. No implementation file or implementation plan is created.

**Phase 5 approved and complete. Implementation has not begun.**
