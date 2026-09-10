# Teesside Digital V2 - Implementation plan

**APPROVED V2 implementation plan. Production implementation has not begun.**

Prepared on 9 September 2026. Repository branch verified as `redesign/v2`.

Dave has approved this repository-level implementation plan. This approval update changes only this document and does not begin Implementation 0. No dependencies, routes, components, styles, assets or configuration have been changed. Existing uncommitted phase documents are preserved.

## Approval record

Dave has reviewed and approved:

- The repository-level V2 change map and ordered implementation sequence.
- Tooling/diagnostic cleanup before visual implementation.
- Semantic Dark/Light theme architecture and the vertical SiteIndex shell strategy.
- The static hero before motion and Services consolidation.
- Truthful Contact and Website Review form architecture.
- The hard Work publication gate.
- Operational/legal fact verification, SEO/schema cleanup and security/header planning.
- Motion after static design acceptance and cross-site hardening.
- Deferred migration-response review and the final launch audit.

All existing implementation sequencing, boundaries, risks, verification requirements and deferred decisions remain in force. The Work route mechanism remains a technical recommendation as clarified in section 14. Implementation 0 remains the small tooling-only task in section 30; any larger security/dependency change discovered during the baseline must be reported separately for review. Production implementation has not begun.

## Authority and evidence

The thirteen requested documents were read completely: `V2_MASTER_BRIEF.md`, `AGENTS.md`, `docs/v2/README.md`, the Phase 0 audit and decisions, creative direction options and approved direction, content system, experience architecture, hero specification, motion system, `ARCHITECTURE.md` and `PLAN.md`.

Approved strategy comes from `phase-0-decisions.md`; content from `content-system.md`; route and content ownership from `experience-architecture.md`; the opening from `hero-spec.md`; interactions from `motion-system.md`. Later approved subject-specific decisions supersede earlier assumptions. In particular, the approved atmospheric image and frame settle supersede earlier image-optional/static-opening proposals. Historical V1 plans and the old `.claude/instructions.md` references to them do not override V2. The audit's earlier narrower market recommendation is not the approved target market.

The implementation remains static-first Astro. The approved direction is Engineered editorial + kinetic portfolio: dark-default mineral/blue-charcoal, a complementary light theme, a real desktop identity/index spine, an Offer/Directory opening, environmental imagery, open service links and evidence-led Work. No business or aesthetic decision is reopened here.

Findings below distinguish source inspection, installed tooling, historical output and operational unknowns. The current source, configuration, lockfile, public asset inventory and existing build artefacts were inspected. North East Joinery's separate repository, Netlify's dashboard, actual submission capture, mailbox delivery and deployed response headers were not verified in this task. Those are explicit later gates.

## 1. Repository baseline

Classification means: KEEP a sound responsibility; MODIFY its implementation; REPLACE an unsuitable implementation; REMOVE an obsolete responsibility; ADD a missing responsibility. A replacement does not imply changing framework or rewriting unrelated systems.

| System | Actual repository evidence | V2 disposition |
| --- | --- | --- |
| Astro | `package.json` declares `^5.0.0`; local lockfile and installed package resolve 5.18.2. Static output, React/Tailwind/sitemap integrations and Sharp image service are configured. | KEEP Astro/static output; MODIFY configuration after compatibility review. |
| TypeScript | Declared `^5.3.3`, resolved 5.9.3. `tsconfig.json` extends Astro strict, uses React JSX and path aliases. | KEEP strict typing and useful aliases; MODIFY generated-type setup and later remove unused JSX settings. |
| Tailwind | Declared `^3.4.1`, resolved 3.4.19; `@astrojs/tailwind` resolves 5.1.5. Dark V1 colours, Inter fallback, container/type scales and animation utilities live in configuration and globals. | KEEP existing integration initially; REPLACE V1 visual tokens and simplify utilities. No incidental Tailwind major migration. |
| React | React/React DOM 18.3.1, `@astrojs/react` 4.4.2. `MobileMenu` hydrates with `client:load`; Home's `HealthCheck` uses `client:idle` and contains the report-request flow. | REPLACE navigation with static Astro/progressive enhancement; REMOVE both Health Check components. Remove React packages only after the final import disappears. |
| Shell | One `BaseLayout.astro`, horizontal sticky `Header`, `Navigation`, footer, skip link and `main`. Header adds a nav around Navigation's nav. | KEEP layout responsibility, language and skip-link intent; REPLACE shell organisation and nested navigation. |
| Components | Hero, Section, Button, Card, ServiceCard, ProjectCard and TechnicalLabel are reusable V1 building blocks. | Preserve useful semantics selectively; card-based service presentation, generic hero and decorative status treatment do not become V2 defaults. |
| Data | `services.ts`, `work.ts`, empty `testimonials.ts`, `legal.ts`; business facts, navigation, metadata and feature flags share `constants.ts`. Additional service copy is duplicated in `[slug].astro`. | MODIFY into small typed owners; REMOVE obsolete records, duplicate copy and speculative flags. |
| Services | Three old records generate web-development, ai-automation and cybersecurity pages. Detail copy includes broad security and commercial claims. | REPLACE with one substantive Services page and three approved fragments. |
| Work | Both index and dynamic detail publish all three demos. Data says in-development; detail template also says Completed and 8-12 weeks. Some fallback copy says work has not been built. | REPLACE publication rules and presentation; retain useful typed-record idea. |
| Contact | Static Netlify-marked form plus inline enhancement. Success is displayed before the POST resolves; rejection is not checked reliably. Old subject/service/budget controls and response-time copy remain. | REPLACE submission behaviour and field model. |
| Health Check | Client-side cross-origin fetch, detached DOM heuristics and scores; report form does not establish report generation or delivery. | REMOVE, including scoring utilities, islands, flags, headings and promises. ADD the separate manual review route. |
| Theme | One dark palette; no explicit remembered Dark/Light control. | REPLACE colour architecture; ADD small root-state enhancement. |
| Motion | Blanket colour/transform transitions, generic card image scale, skeleton/fade/slide utilities and smooth scrolling. | REMOVE generic motion; ADD only the approved component-specific system. |
| SEO | Head metadata, canonical helpers and schema helpers exist. Default organisation logo points to nonexistent `/images/logo.svg`; social identities need verification. Page titles can receive the brand twice. | MODIFY useful infrastructure, correct facts and serialisation; test generated output. |
| Public assets | Existing TD SVG mark and horizontal lock-up, favicons, two OG JPEGs, three service images and three work images. | KEEP mark identity; review favicons/OG; REPLACE unsuitable imagery through the approved pipeline. |
| Netlify | `npm run build`, `dist`, dev port 3000, apex-domain redirect, catch-all 404, selected security/cache headers. No current server-side scanner or custom form function is present. | KEEP static hosting; MODIFY verified headers, caching and form configuration. |

### Tooling evidence and limits

| Check | Current observation | Consequence |
| --- | --- | --- |
| Runtime | Local Node is 24.14.1; this is an observation, not an approved deployment runtime. | Select and pin a tested supported runtime in Implementation 0. |
| Lockfile | Local `package-lock.json`, lockfileVersion 3, exists; `.gitignore` excludes package lockfiles, so this one is not tracked. | Make installation reproducible before visual work. |
| `type-check` | Runs `tsc --noEmit`. Direct invocation of installed TypeScript currently fails at `src/config/constants.ts(11,20)`: `Property 'env' does not exist on type 'ImportMeta'`. | Establish Astro-generated type setup, then separate remaining application errors. Do not repeat Phase 0's historical pass as current evidence. |
| `lint` | Runs `astro check`, but `@astrojs/check` is absent from installed packages and the lockfile. | This is neither an established passing diagnostic nor a general lint suite. |
| `build` | Runs `astro build`. Existing `dist` contains 15 HTML documents; Phase 0 recorded a successful build. | No fresh build was run here because it generates files. Existing output is not proof that today's checkout builds cleanly. |
| Formatting/tests | `format` runs `prettier --write .`; no configured independent lint/test suite or tracked CI workflow was found. | Add truthful non-writing checks and focused verification as needed; never run whole-repository formatting as incidental cleanup. |
| Dependencies | Phase 0 recorded four affected package entries, two high and two low. Installed versions still require fresh advisory triage. | Historical counts are not a current audit. See section 22. |

`astro.config.mjs` also contains `trailingSlash: 'never'`, `prefetchAll: true`, React experimental configuration, explicit React SSR externals, duplicated aliases and Shiki configuration. Each requires a usage check; none justifies a framework migration. Canonical slash policy must be reconciled with approved route notation before migration is implemented.

The current large JPEGs are not an optimised evidence pipeline. Examples: North East Joinery hero is 6000 x 4000 and 4,706,160 bytes; web-development image is 4000 x 6000 and 3,343,368 bytes. The 1200 x 630 default OG image is 77,446 bytes. Dimensions and filenames establish asset characteristics, not rights or evidential value.

## 2. Target V2 route map

Paths below identify current content routes. V1 currently specifies no trailing slash; V2 notation uses one. Neither notation establishes the deployed HTTP response. This table decides content disposition only.

| Current V1 route | Disposition | Approved V2 owner / migration review |
| --- | --- | --- |
| `/` | Rewrite | `/`: approved opening and H1-H5 responsibilities. |
| `/services` | Rewrite | `/services/`: all three substantive service sections. |
| `/services/web-development` | Consolidate; migration review required | `/services/#websites-web-development`; confirm useful equivalence rather than blindly redirecting. |
| `/services/ai-automation` | Consolidate; migration review required | `/services/#automation-ai`; remove inflated claims before judging equivalence. |
| `/services/cybersecurity` | Remove; migration review required | No equivalent specialist service. Embedded engineering standards do not make this a like-for-like replacement. |
| `/work` | Conditional rewrite; migration review required | `/work/` only after the hard evidence gate. Otherwise withhold publication and choose honest recovery later. |
| `/work/northeast-joinery` | Conditional rewrite; migration review required | Same detail identity only after evidence qualification; no surviving V1 Completed page if withheld. |
| `/work/quoteflow` | Remove; migration review required | Excluded from launch. No empty or hidden case study. |
| `/work/siteguard` | Remove; migration review required | Excluded from launch. No security-product implication. |
| `/about` | Rewrite | `/about/`: business responsibility followed by accurate founder account. |
| `/contact` | Rewrite | `/contact/`: one dedicated project enquiry task. |
| `/privacy` | Retain route; rewrite verified facts | `/privacy/`. |
| `/accessibility` | Retain route; rewrite verified statement | `/accessibility/`. |
| `/terms` | Retain route; review and rewrite | `/terms/`; website terms are not automatically the project contract. |
| 404 / generated `404.html` | Retain recovery responsibility; modify | Genuine missing-page response at hosting, useful links and no Work link when withheld. |
| No existing review page | Add | `/website-review/`: manual free review. |

`/#health-check` is an existing fragment, not a separate HTTP route. Replace internal references with the manual review destination. During migration review, decide whether a small truthful legacy anchor/recovery link is useful. Servers do not receive fragments, so a server path redirect cannot selectively detect this hash.

For each retired or normalised URL, record: exact deployed URL and response; content equivalence; useful inbound links if Search Console, analytics or other evidence is available; intended canonical; sitemap treatment; all internal references; and understandable recovery. Unknown inbound traffic must be labelled unknown. Test slash/no-slash variants, query strings, direct entry, links and missing URLs on a deployment preview. Then propose exact 301/404/410 behaviour for review. Do not lock it in this plan or implement a catch-all redirect to Home.

## 3. Component architecture

Keep `src/components/astro/` and `BaseLayout.astro` conventions. The following are responsibilities and likely boundaries, not instructions to create every file at once. Static Astro is sufficient for every rendering responsibility listed. Small scripts enhance behaviour without React hydration.

| Boundary | Existing basis / proposed change | Data or props | Semantic responsibility | Client requirement |
| --- | --- | --- | --- | --- |
| BaseLayout | MODIFY existing | Title, description, canonical path, optional schema, page identity; content slot | Document head, skip link, one main, shell and footer | Theme initialiser only; no island. |
| SiteIndex | REPLACE Header/Navigation organisation | Shared destinations, current pathname, eligible Work state | One labelled site nav; identity and actions arranged in the spine | None initially; optional compact disclosure only if tests justify it. |
| BrandIdentity | ADD | Home href; existing mark asset; live wording | One clearly named Home link; avoid duplicate accessible mark/title text | None. |
| ThemeControl | ADD | Current root theme; fixed Dark/Light labels | Native labelled choice, visible selected state | Tiny DOM/storage handler. |
| PrimaryAction | REPLACE relevant Button use | Label and href for navigation; separate submit semantics within forms | Real anchor for enquiry navigation, real button for submission | CSS states; no island. |
| DirectionalLink | ADD only for repeated directional behaviour | href, label, optional described context | Single anchor; decorative arrow hidden from assistive technology | CSS only. |
| ServiceDirectory | REPLACE ServiceCard composition | Three typed service identities, fragments and short descriptors | List of open service links; no arbitrary heading level imposed | CSS only. |
| AtmosphericHeroMedia | ADD, extracted from new Hero | Local image metadata, crop/sizes, alt decision, reserved ratio | Environmental image, not project evidence or control | Astro image output; optional bounded settle initialisation. |
| Hero | REPLACE existing | Approved opening copy and service data; media composition | Home's single H1 and short supporting context | Composition only; delegates media/theme behaviour. |
| EvidenceFigure | ADD when evidence qualifies | Image, dimensions, alt, caption | Figure and figcaption, readable capture | CSS image response only. |
| EvidenceExplanation | Page-local initially | Observed decision, reason, limitation | Ordinary heading/prose beside evidence | None; extract only after actual repetition. |
| WorkEntry | REPLACE ProjectCard | One published project record | Article with a named detail link; no nested links | CSS image emphasis on eligible input modes. |
| ProjectStatus | ADD if repeated in Home/index/detail | Explicit demonstration/WIP status and limitations | Visible text, not colour alone or a decorative live badge | None. |
| FormField | ADD for repeated field markup | Stable id, name, label, type, required, help/error IDs; textarea slot where needed | Explicit label/control/error relationship | None independently. |
| ProjectEnquiryForm | REPLACE ContactForm behaviour, retain its filename initially | Project form config, receiver, field limits | One named native form and feedback region | Shared small form enhancement. |
| WebsiteReviewForm | ADD | Review config, availability, receiver | Separate native form/task and receipt | Same state engine, different fields and copy. |
| Footer | MODIFY existing | Approved destinations, business facts and Work gate | One footer landmark; legal and secondary navigation clearly labelled | None. |
| Section / legal prose | SIMPLIFY existing Section if useful | Optional heading association, limited width variant, slot | Avoid automatic nested sections or duplicate H1s | None. A legal layout is optional only if real repetition warrants it. |

Do not build a configurable component framework. Keep single-use copy and explanation in its owning page. Do not move all field rendering into an elaborate schema interpreter. Do not give anchors a fake disabled state or turn whole evidence containers into controls when they contain other links.

## 4. Layout architecture

Source order: skip link, site identity/index and utilities, main document, footer. Within main, the page's H1 precedes its explanation and content. CSS Grid supplies the desktop spine and broad document field without rearranging keyboard order or absolutely positioning the document.

The index is a genuine vertical global orientation area, with existing mark, live stacked TEESSIDE DIGITAL, familiar destinations, primary enquiry, quieter review and theme utility. It must not become a decorative sidebar beside an independently functioning horizontal desktop navbar.

Use normal-flow grid placement with sticky positioning on the index's inner block only when both width and available height accommodate it. The footer remains after main in source order, visually aligned to the document field. Avoid a permanently fixed viewport-height sidebar, nested scrolling or a footer trapped behind fixed navigation.

Release sticky behaviour when the complete index cannot fit comfortably: short landscape, enlarged text, zoom or increased wrapping. Do not solve overflow by reducing type or clipping controls. Tablet can use a narrower relationship or place the identity/index above the document when content pressure warrants it. Compact layouts begin with a visible wrapping list, as approved, with brand and enquiry readily available. One nav tree should transform through CSS.

Only consider a progressively enhanced disclosure if measured compact navigation height overwhelms actual content. Record why a visible list failed. An enhancement failure must leave links available. If introduced, test expanded state, Escape, focus return, outside interaction and mode changes explicitly; do not copy the V1 menu's incomplete focus-management assumptions. No modal focus trap is needed for a normal in-flow list.

Keep the skip target stable and reachable. Direct fragments must reveal their heading below any compact sticky region; preferably keep compact navigation in normal flow. Do not use CSS order to create a different visual reading sequence from the document.

## 5. Theme architecture

Recommend a tiny synchronous inline initialiser in the document head, followed by a small ordinary script for the theme control. Render Dark as the complete HTML/CSS baseline. A root `data-theme` state and corresponding `color-scheme` govern semantic tokens and native controls.

Read a single allowlisted Dark/Light preference from localStorage in a guarded operation before first themed paint. A valid remembered choice wins; absent, corrupt or inaccessible storage yields Dark. Never infer first-visit Light from the operating system. Persist an explicit choice when possible, but allow an in-page change even if saving fails. No reload or page transition is required.

| Approach | Trade-off | Recommendation |
| --- | --- | --- |
| Tiny head initialiser | Avoids waiting for hydration; requires deliberate CSP handling and guarded storage access | Use, with stable build-derived script hash when enforcing CSP. |
| Client island | Adds runtime and starts late enough to risk a wrong-theme flash | Do not use for this small preference. |
| Server-only preference | A static page cannot read localStorage; cookies/server rendering add caching and operational complexity | Do not introduce SSR for theme selection. |

Prefer native labelled Dark/Light choices enhanced by script. With JavaScript unavailable, provide the usable dark site and no apparently functional dead switch. Keep focus and selection perceivable with keyboard and forced colours. Components consume semantic variables, never read storage individually. Update all theme roles together at 0ms; remove inherited blanket colour transitions. Inputs, errors, disabled controls, focus rings and browser control chrome must be tested in both themes.

Environmental and evidence images retain their actual pixels. No inversion filter, theme-dependent fake screenshot or animated image swap. Adjust surrounding surfaces and text contrast using paired tokens. Document the preference storage accurately in privacy information.

## 6. CSS and design token architecture

Recommend a modest hybrid: retain Tailwind 3 for useful layout/spacing utilities while using semantic custom properties and scoped Astro CSS for the editorial shell and component behaviour. This preserves the working build foundation without forcing the new composition through V1 card utilities.

Proposed `src/styles/tokens.css` owns shared roles; `globals.css` owns document defaults, reset, focus, prose and minimal utilities. Component-scoped CSS owns the spine, directory, media and form details. Do not duplicate the same values between Tailwind and CSS: Tailwind colour aliases should consume semantic variables.

| Token group | Responsibilities |
| --- | --- |
| Colour | Canvas, document surface, subtle surface, primary/muted text, action, hover/active action, rule, focus, error and success; paired Dark/Light values. |
| Typography | Brand, display/H1, section heading, body, small/context, label; line heights, measures and restrained tracking. |
| Spacing | Small coherent scale; document gutters, section rhythm and control spacing. |
| Layout | Index width range, index/document gap, readable prose measure, media ratio and compact gutters; avoid device-specific magic constants. |
| Rules/radii | Rule weights and hierarchy; square/open editorial surfaces, limited control radii where useful. No default rounded panel around every section. |
| States | Focus, current, hover, active, disabled, validation and accepted; never colour-only meaning. |
| Motion | 0, 120, 200, 360 and 480ms; responsive easing `cubic-bezier(.2,0,.2,1)` and settle easing `cubic-bezier(.22,1,.36,1)`. |
| Layers | Only named layers actually needed, such as document, sticky index and skip link; avoid an arbitrary z-index ladder. |

Retain Tailwind's content discovery and useful responsive utilities. Replace the V1 palette and fixed Inter assumption. Simplify duplicate container padding, card/shadow defaults and generic animation definitions. Remove global smooth scrolling and broad transitions that would animate theme changes. Extend configuration only to map real shared roles. Final hex values and families remain deferred; this plan selects neither.

## 7. Typography implementation plan

Evaluate a small shortlist in the actual shell and opening, not a specimen disconnected from the design. Record licence terms, web embedding rights, redistribution/subsetting permissions, source and file cost. Prefer self-hosting permitted WOFF2 assets for predictable delivery and fewer external connections; a provider requires a specific licensing or delivery reason and a privacy/CSP review.

Start evaluation with one family and only necessary weights; consider a second role/family only if it materially improves hierarchy. Variable versus static files is a measured transfer/coverage choice, not automatically an optimisation. No font is selected here.

Test the exact H1, live TEESSIDE DIGITAL, all three full service names, descriptors, form labels, long email/URL strings and legal prose. Check narrow widths, browser text enlargement, fallback rendering and late font arrival. Tune line height, measure and fallback metrics before considering forced line breaks. Do not shorten approved labels to fit a font.

Choose `font-display` after comparing readable fallback and swap behaviour; `swap` is the starting candidate, with `optional` considered only if its final appearance is acceptable. Preload only a genuinely critical above-fold face, not every weight. Remove unused Google Fonts preconnects. Measure transfer, wrapping and layout shift with cache disabled and with fonts blocked.

The North East Joinery independence test compares hierarchy, proportions, spacing, image treatment and navigation grammar as well as family choice. Teesside Digital must remain distinct even when both sites show ordinary body copy. Font approval belongs before the hero's visual acceptance, not before tooling cleanup.

## 8. Hero implementation plan

Keep Home composition in `src/pages/index.astro`; let the replaced Hero own only the opening's main content. Shell identity and global utilities belong to SiteIndex, service links to ServiceDirectory and image behaviour to AtmosphericHeroMedia.

| Approved inventory | Owner | Delivery |
| --- | --- | --- |
| Existing TD mark and live stacked TEESSIDE DIGITAL | BrandIdentity in SiteIndex | Static Astro markup and CSS; do not substitute the horizontal SVG lock-up for live wording. |
| Site/index navigation | SiteIndex | Shared static destinations; Work conditional. |
| Discuss your project | PrimaryAction in index and appropriate main context | Real link to `/contact/`. |
| Free website review | Quieter index/contextual link | `/website-review/`, subordinate to enquiry. |
| Dark / Light | ThemeControl | Small enhancement described in section 5. |
| H1 | Hero | Exact text: "Websites, business tools and practical automation." |
| Supporting copy | Hero/page-local | Working copy: "For small and owner-led businesses that need a clearer website, a better way to handle everyday tasks, or less repetitive work." |
| Three service links | ServiceDirectory | Approved names and short task descriptors; direct Services fragments. |
| Local cue | Hero/page-local | Hartlepool, Teesside and appropriate North East context; no invented office network. |
| Dave/accountability cue | Hero/page-local | Dave designs/builds and is responsible; no team implication. |
| Environmental image | AtmosphericHeroMedia | Optimised real/licensed local imagery; substantial field, not a floating card. |
| Frame settle | Media wrapper only | Optional clean-start enhancement, never content or CTA animation. |

Main source order remains proposition, supporting context, service entries and accountability/local context, then associated environmental media in an order that still reads coherently when linearised. Desktop CSS places the image as the substantial right-hand field. The site index precedes main in the shell source, without duplicating all its controls inside Hero.

Do not constrain the opening to 100vh, force two equal CTAs, shrink text to keep the fold neat or give each service a card. Build and review the complete static opening before adding the settle. The chosen image must not be necessary to understand the offer or use its links.

## 9. Hero image pipeline

1. Source an original photograph or a properly licensed asset in the approved Hartlepool/Teesside coastal, architectural, infrastructure or industrial-context territory. Prefer atmosphere and place over steelworks shorthand. No AI-generated local evidence, fake office, generic business stock or cyber illustration.
2. Record creator, original source, licence/permission, acquisition date, permitted edits and attribution requirement in a proposed `docs/v2/asset-register.md`. Confirm that the geographic description is accurate. Store large archival masters outside public delivery; keep a suitably sized licensed production source under proposed `src/assets/hero/`.
3. Inspect source dimensions and crop latitude against the actual media field. Select desktop and compact crops deliberately; do not automatically centre-crop an important subject. Capture crop decisions and minimum useful resolution.
4. Use Astro's existing image service for generated outputs from imported local metadata. Produce responsive candidates and an accurate `sizes` description of the document field, excluding the spine/gutters. Test whether a compact art-directed source needs a picture source rather than a different CSS object position.
5. Compare AVIF and WebP plus JPEG fallback where useful. Select quality by visible gradients, texture and artefacts as well as file size. Do not generate dozens of nearly identical widths or ship the master JPEG.
6. Reserve width/height or a stable wrapper aspect ratio before download. A real above-fold LCP candidate must not be lazy-loaded. Use high fetch priority for the chosen hero image; add preload only if request discovery measurements justify it and it matches the actual responsive candidate, avoiding duplicate downloads.
7. Evaluate the provisional desktop delivery ceiling around 300KB and compact around 180KB against visible quality and LCP. These are working budgets, not achieved limits or permission to ignore performance.
8. Test both themes, text adjacency, image failure, slow loading and narrow crop readability. Keep text off an uncontrolled photograph where possible. A stable mineral surface and all textual content remain when the image fails.

Astro's image components can generate responsive image output; validate the API against the retained installed release rather than copying examples for a newer major. See [Astro image guidance](https://docs.astro.build/en/guides/images/) and [asset component reference](https://docs.astro.build/en/reference/modules/astro-assets/).

## 10. Hero frame-settle implementation strategy

Recommend a local CSS `clip-path: inset()` keyframe on the image wrapper: approximately 2% inset at most, easing to the full frame over 480ms, then completely static. The underlying unanimated state is always the final full frame.

| Technique | Evaluation |
| --- | --- |
| Overflow wrapper with changing dimensions/inset | Easy to understand, but changing layout dimensions can shift adjacent content; nested counter-scaling is needless complexity. |
| Wrapper transform/scale | Can avoid layout shift, but may scale image content and alter the intended frame-opening character. |
| `clip-path: inset()` | Directly describes a shallow frame change without moving document layout. Rendering cost still needs measurement. Primary candidate. |
| Mask | More compositing and debugging complexity for no required visual benefit. Do not use. |

The hard part is clean start, not the keyframe. Do not load/decode an image, let it appear full, then clip it retroactively. Default to full static delivery. Permit the animation only if readiness and eligibility can be established synchronously before that media's first visible rendering opportunity. A late load/decode callback must never arm or replay it. If the actual delivery path cannot reliably establish that condition, skip the motion. An uncached or slow image may therefore remain entirely static, which is approved.

Use a minimal local initialisation check, not a page-wide animation coordinator. Exclude reduced motion, coarse/no-hover input, hidden documents, history restoration and any already visible/restored position where clean start is uncertain. Do not restart on resize, theme change, pageshow restoration or re-entry. Browser back/forward and scroll restoration require direct tests; checking scroll position alone is not proof that restoration has finished.

CSS starts from a final-state baseline and defines temporary keyframes only when eligible. No class should leave the image permanently inset if script execution or an event listener fails. Unsupported animation/clip features yield the full frame. Cancellation removes the animation and exposes the final frame immediately. A preference change to reduced motion also cancels it. Do not depend on animationend to reveal content.

No IntersectionObserver is necessary for this above-fold, first-presentation effect. Visibility observation does not solve image readiness or prevent retroactive clipping. No hover zoom, pointer response, parallax, scroll-linked crop or alternate image reveal follows it. The media is non-interactive, and its wrapper dimensions stay fixed throughout. Measure compositing/paint cost; remove the effect if it compromises the approved performance/accessibility requirements.

## 11. Motion implementation map

| Responsibility | Approved behaviour | Implementation owner |
| --- | --- | --- |
| Service links | Rule 16px to 40px, arrow +3px, 200ms responsive easing; fixed label/descriptor | ServiceDirectory/DirectionalLink scoped CSS, with reserved space and independent focus styling. |
| Primary CTA | Rule 20px to 48px, arrow +4px, 200ms | PrimaryAction scoped CSS; target/text must not shift. |
| Eligible Work imagery | Up to approximately 1.02 scale, approximately 360ms | Evidence/Work entry CSS on appropriate hover or focus-within; status, captions and limitations remain static. |
| Theme | Coordinated 0ms change | Root semantic tokens; no inherited transition or photograph filter. |
| Navigation | Static current-state marker | Path-derived markup and CSS; no scrollspy or moving indicator. |
| Page navigation | Normal browser navigation | Standard anchors; no ClientRouter or View Transitions added. |
| Scrolling/fragments | Native behaviour | Remove V1 smooth-scroll rules and scripted success scrolling. |
| Reduced motion | Explicit static final states | Component media queries; no token-duration trick that still causes a brief reveal. |
| Hero | One shallow 480ms settle only when eligible | Section 10; otherwise full static media. |

Focus appears immediately and independently of hover animation. Touch activates a link once, without a first-tap preview state. No neighbour dimming, stagger, bounce, queued transition, repeated fade-up or below-fold replacement reveal if Hero is skipped.

Animation library budget: 0 bytes. Approved incremental motion budgets: no more than 5KB gzip JavaScript and 3KB gzip CSS. These are motion-only budgets, not a claim that total site JavaScript/CSS fits them. Zero idle pointer/continuous-scroll work; no more than one major image movement at a time. Record compressed output deltas during integration.

## 12. Responsive implementation strategy

Use fluid grid tracks, sensible min/max bounds, wrapping and scoped media/container conditions where supported by the retained stack. Select breakpoints from content pressure, not the names phone/tablet/desktop.

| Test condition | Pressure to inspect | Required response |
| --- | --- | --- |
| 320px | Long service names, forms, theme choices and navigation density | No horizontal document overflow, truncation or tiny labels; linear opening and usable controls. |
| 375px, 390px, 430px | Real compact reading, crop and link targets | Offer first, useful media crop, readable directory and primary enquiry. |
| Around 768px | Neither comfortably narrow nor full desktop | Transform spine/directory when their minimum useful measures compete. |
| Around 1024px | Narrow document field beside index | Keep complete labels and meaningful image area; linearise before either becomes token decoration. |
| Wide desktop | Excess measure and empty space | Bound prose width while allowing deliberate field/image scale. |
| Short landscape | Index height and above-fold obstruction | Release sticky behaviour; retain access to all destinations. |
| Zoom/text enlargement | Equivalent narrow layout, line-height and label growth | Reflow without clipped controls, lost content or overlap. |

Linearise Offer/Directory when copy, directory and image no longer retain readable proportions. Reposition the image when a useful crop would otherwise become a thin strip. Transform the side index when its width crowds main, and release sticky independently when height is insufficient. Evaluate compact disclosure only after the visible-list baseline is tested. Record actual `window.innerWidth` and viewport height in browser evidence. A desktop resize is not proof of real touch-device behaviour; record real-device coverage separately.

Shell and hero responsive acceptance are gates before additional pages are stacked on top. Later hardening repeats affected cases, not substitutes for those early checks.

## 13. Services implementation

Replace `/services/` with one substantial document in approved order:

- `#websites-web-development` - Websites & Web Development.
- `#apps-digital-tools` - Apps & Digital Tools.
- `#automation-ai` - Automation & AI.

Each fragment targets a stable, descriptive heading within the document's heading hierarchy. Direct entry must provide enough service context, scope, limits and next step without requiring a visitor to start at Home. Use native anchors and test focus/orientation and obstruction at enlarged text and compact widths.

Keep recognisable tasks, possible work, sensible alternatives and boundaries specific to each area. Security, accessibility and performance are embedded responsibilities, not a fourth service or certification claim. Automation examples must not imply AI is necessary for deterministic rules or that public AI products are already delivered.

One shared expectations area owns scoping, direct responsibility, common engineering responsibilities and pricing-process language. No development price bands or guaranteed savings are approved. Contact may ask optional budget context; it does not become a second pricing authority. Remove the V1 dedicated service page generator and duplicate detail records after content is consolidated and migration entries recorded. Do not retain thin hidden SEO variants.

## 14. Work and evidence implementation

Use one typed publication decision in `src/data/work.ts`, separate from project development status. A proposed `publication` value such as withheld/approved records editorial readiness; an explicit demonstration-in-progress status records what the project actually is. A completeness check can reject missing fields, but only inspection and Dave's review can qualify evidence.

The same published-record selector controls SiteIndex, Footer, Home's H2 evidence region, Work index, detail output and related links including 404 recovery. Sitemap inclusion follows generated public routes. Do not use independent booleans that can disagree, CSS hiding, noindex-only concealment or an empty published Work page.

For static Astro, recommend replacing `src/pages/work/index.astro` and `[slug].astro` with proposed `src/pages/work/[...path].astro`. Its static path list emits the index and North East Joinery detail only when the gate passes, otherwise neither. A rest parameter can match the index with an undefined path; this avoids retaining an unconditional index file that still generates an artefact. Keep the two modest rendering branches clear; extract content templates only if their actual size warrants it. Verify this on the retained Astro release before proceeding. See [Astro static rest-parameter routing](https://docs.astro.build/en/guides/routing/).

Approval clarification: `src/pages/work/[...path].astro` remains a recommended technical approach, not an immutable approved mechanism. During Implementation 9, verify its behaviour against the retained Astro version and actual static output. If another simpler static implementation satisfies the same publication guarantees more robustly, it may be proposed for review. Regardless of mechanism, when Work is withheld, neither `/work/` nor `/work/northeast-joinery/` may be emitted as normal public content, and Work must be absent from navigation, footer, Home evidence, sitemap and normal discovery. The publication gate must not be weakened.

A published record requires: accurate title/status, visible demo disclosure, material remaining limitations, qualified evidence images and alt text, captions, observed behaviour, decision and reason, verified links, and an evidence-check date/reference. Remove hard-coded Completed, assumed delivery duration and planned-versus-built contradictions. QuoteFlow and SiteGuard are excluded from the public selector and route list.

Test clean builds both gate-off and gate-on. Gate-off must omit Work HTML artefacts, sitemap entries, navigation/footer/404 links and Home H2, with H3 following the opening naturally. Gate-on must produce only the approved index/detail and coherent discovery. Inspect clean output so stale `dist` files cannot simulate publication. Exact responses for old URLs remain the migration decision in section 2; withholding does not leave old V1 pages live.

## 15. North East Joinery evidence preparation

This is a separate prerequisite, not an assumption that Work is ready. When this implementation phase is authorised, inspect the current standalone project without importing its source into Teesside Digital or altering it as incidental work.

- Identify current commit/version, live destination and relevant routes; separate local behaviour from deployment behaviour.
- Capture truthful interface screenshots and inspect behaviours that actually work. A subject photograph is not evidence of website interaction.
- For every selected image, write what decision it demonstrates, why that decision was made and what a visitor can verify.
- State demonstration/WIP status and material remaining work next to the proof. In particular, distinguish a rendered enquiry form from proven deployed capture or notifications.
- Remove fixed completion/duration language and any claim of customer outcomes, paid client work or measured savings without evidence.
- Verify live/source link destinations and their access state; do not imply unavailable links are verification.
- Prepare optimised screenshots with readable compact crops, accurate alt/captions and no fabricated browser states or confidential data.
- Review the complete explanation at mobile sizes. If the screenshot is illegible without a usable larger view, change its presentation or choose better evidence.
- Ask whether the result supplies enough useful, inspectable substance to justify both Work routes. Dave reviews the evidence packet before publication.

If it does not pass, launch the rest of V2 without Work. Do not manufacture another demonstration, import the other repositories or create coming-soon placeholders to fill space.

## 16. Contact form implementation

Retain a native static HTML form and recommend Netlify Forms as the first receiver candidate because it is already the intended hosting path. Replace V1 success-on-click with a shared small state handler. This recommendation is conditional on verifying actual deployed acceptance and operations, not a statement that the current setup works.

Required fields: name, email and useful project description. Optional: business name, website URL and budget/spending constraint as free text if retained. No forced service selector, fixed budget bands, account, file upload or technical stack questionnaire.

| State | Trigger and behaviour |
| --- | --- |
| Ready | Usable native form, visible labels, privacy context and direct email alternative. |
| Validation issue | Identify affected fields, associate errors, focus the first useful error/summary and retain all values. |
| Sending | Only after validation and actual submission start; prevent duplicate activation and announce progress without claiming receipt. |
| Accepted | Only after the verified receiver's positive acceptance contract; acknowledge receipt and human next step, not email delivery or that Dave has read it. |
| Known rejection | A confirmed rejection from that receiver; explain recovery, preserve values and allow correction/retry. |
| Uncertain outcome | Network interruption, timeout or ambiguous response where capture may already have happened; say acceptance could not be confirmed, retain values and offer email. No automatic retry that may duplicate submissions. |

Plan stable distinct form names, static form detection markup, explicit hidden form-name and honeypot fields, correct POST target and encoding. Test against the published Netlify artefact, not Astro dev's response. Native no-JS submission must reach a genuine provider receipt or verified server response; do not invent a success state from a query parameter or create an unapproved thank-you route just to display optimistic copy. Netlify detects forms from built HTML and supports AJAX submissions; its operational settings still need verification. See [Netlify form setup](https://docs.netlify.com/manage/forms/setup/).

Client validation improves UX only. Replace the existing URL validator that can accept arbitrary schemes and the name validator that demands ASCII letters. Use bounded text, sensible lengths, appropriate email checks and HTTP(S) URL parsing without lowercasing case-sensitive paths. Names must accommodate real names; ASCII documentation rules do not restrict user input. Preserve description line breaks. Render user values as text, never raw HTML; generic pre-escaping is not a substitute for output-context handling.

Netlify's managed spam processing/honeypot are a useful baseline, not proof of application-specific server validation. Determine what constraints the receiver enforces and how untrusted/malformed submissions are handled. No URL is fetched, and no business/security action should trust client fields. If the required acceptance contract, bounded server validation or abuse controls cannot be satisfied by the managed route, stop that forms subtask and propose one small validated Netlify Function plus a known delivery provider. That alternative adds secrets, rate limits, logging/retention and failure handling; it is not a default proxy or reason to migrate the whole site to SSR. See [Netlify spam handling](https://docs.netlify.com/manage/forms/spam-filters/).

Before calling the flow complete, verify form detection, an authorised test appearing in the correct submissions inbox, spam classification, destination notification configuration and actual mailbox delivery. These are separate observations. A generic 200 from a fallback page is not evidence of capture. Test validation, rejection, uncertainty, double submit, keyboard, no JS and both themes. Keep feedback near the form in a suitable live region without announcing the entire page. Confirm the direct email address works and privacy facts match the actual receiver. See [Netlify submissions](https://docs.netlify.com/manage/forms/submissions/) and [notifications](https://docs.netlify.com/manage/forms/notifications/).

## 17. Website review form implementation

Add `/website-review/` as its own task, not a renamed scanner or section embedded in Home. Explain before the form: initially free, Dave performs a bounded manual review of the public website/customer enquiry journey, and there is no guaranteed turnaround. Exclude automated scan/report generation, penetration testing, a security audit, formal accessibility certification and guaranteed fixes or results.

Required fields: name, email and website URL. Optional: concerns and business context. Use the same verified state mechanics as Contact, with a distinct form name, field configuration, receiver checks and task-specific language. Submitting a URL only sends it as enquiry data; neither browser nor server automatically fetches or scans it.

Only after actual technical acceptance show the exact approved receipt:

> Your review request has been received. Dave will review the website and email you the report.

That receipt does not mean the report exists or an email has been delivered. Dave's manual fulfilment procedure and receipt of the request must be verified operationally. Do not offer an invented report preview or imply a response-time guarantee elsewhere in metadata or confirmation copy.

Use a small availability setting with open/limited/paused content states. Limited capacity must be explained honestly without fake scarcity. When paused, keep the route and scope explanation, remove the active invitation/form as appropriate and explain availability; do not silently turn the review task into a project enquiry. Update global offer wording consistently. Consider existing/cached submissions in the operational procedure rather than deleting captured data. Test open and paused builds and direct entry to the retained route.

## 18. Content and data architecture

| Content | Recommended owner | Boundary |
| --- | --- | --- |
| Page narrative | Its Astro page/frontmatter | Home excerpts, Services explanations and About chronology have distinct owners. |
| Business facts and site origin | Simplified `src/config/constants.ts` | Name, verified email, canonical origin, approved geographic/accountability facts; no speculative founding/qualification claims. |
| Service identity | `src/data/services.ts` | Stable id, exact name, fragment and reusable short summary. Full service explanation stays in Services, not repeated in a global object. |
| Navigation | Proposed `src/config/navigation.ts` | Familiar destinations and gate-derived Work inclusion. This file does not currently exist. |
| Project evidence | `src/data/work.ts` | Typed publication/status, assets, captions, decisions, limitations and verified destinations. Derive URLs rather than duplicating slugs and caseStudyUrl. |
| Form settings | Proposed `src/config/forms.ts` | Two distinct form identities, limits, availability and approved receipt text where shared; no secrets. |
| Form behaviour | Proposed `src/scripts/forms.ts` and modified validation utilities | Shared state behaviour only, not a form-builder framework. |
| Legal facts/copy | Reworked `src/data/legal.ts`, with fact evidence recorded during verification | No invented processor, retention, testing or response practices. |
| Location | Small verified business fact fields | Hartlepool/Teesside/North East context; no town-route generator or unsupported coverage list. |

Remove empty testimonial plumbing when its consumers disappear; do not add fake content. Use narrow TypeScript types where they prevent inconsistent status, service IDs or form names. No CMS, database, giant content object, taxonomy engine or additional validation library is required for these small static records.

## 19. SEO and structured data

Give every retained route an accurate title and description with the brand appended once. Separate canonical production origin from local preview origin; V1's `import.meta.env.PROD` URL switch is not a sufficient canonical policy. Decide trailing-slash consistency alongside actual hosting behaviour, then use one helper for canonical paths and internal destinations.

Retain a minimal verified organisation entity as the starting schema. Use the real mark/logo path and confirmed public identities. Do not emit the missing `/images/logo.svg`, unverified LinkedIn profile, assumed founding date, ratings, certifications or a fabricated street address. Evaluate LocalBusiness only if its factual properties and public business representation are appropriate; do not add it solely for an assumed ranking advantage.

Represent Services as the real subject matter of the consolidated page, without creating phantom service pages or specialist cyber offers. Describe Work explicitly as demonstration work; do not use review/rating or product-availability markup to inflate it. Breadcrumbs are useful on an eligible detail page, but must reference only published destinations. Safely serialise JSON-LD, including script-closing characters, rather than assuming arbitrary future strings are safe in raw script HTML.

Review default and page-specific Open Graph text/images for the new proposition. Existing OG assets are candidates for replacement, not approved V2 art. Retain the useful sitemap integration and robots file, verifying canonical host, actual generated routes and Work gate exclusions. Missing/recovery pages must not be indexed as successful content. Search metadata must not retain old cyber, instant review or completion claims after visible copy changes.

Test built head output on every route, canonical/slash consistency, structured-data validity and link targets. Search appearance is not guaranteed by valid schema. Migration review owns retired URL response decisions; do not add thin SEO stubs.

## 20. Accessibility implementation checklist

Target WCAG 2.2 AA; do not claim compliance before testing.

- Check one main landmark, meaningful header/nav/footer relationships, a working skip link, one H1 and logical headings on every route, including legal pages and 404.
- Give site navigation a clear name. Apply `aria-current="page"` only to the exact page; identify a Work section relationship on its detail without pretending the index is the current page. Do not use current state as scrollspy.
- Verify visible focus in both themes, independent of motion and hover. Ensure targets meet applicable minimum sizing/spacing and remain comfortable for touch.
- Test theme selection by keyboard and screen reader, including storage denial and JS failure. Colour must not carry status alone.
- Measure dark/light text, controls, rules carrying meaning and focus contrast. Test text near imagery at every crop; choose informative alt or an explicitly decorative image based on actual purpose.
- Test direct fragment entry, headings below any sticky region and browser back/forward orientation.
- Verify explicit field labels, instructions, required/optional meaning, autocomplete, error association, error focus, live feedback and retained values. Allow textarea resizing where it helps.
- Exercise reduced motion from initial load and when changed during a settle; final static content must remain complete.
- Test 200% text enlargement, 400% zoom/reflow where applicable, text-spacing overrides, narrow widths and short viewports; no two-dimensional reading scroll for ordinary content.
- Complete keyboard-only journeys for enquiry, review, navigation and eligible Work. Test forced colours, image failure and unavailable scripts.
- Perform actual screen-reader checks, recording browser/AT/version and tasks. Use NVDA on Windows and VoiceOver where available; do not list an unperformed test as completed.

Automated checks supplement manual work. Record findings and fixes per implementation gate, not a blanket certification based on a Lighthouse score.

## 21. Performance implementation checklist

Retain targets: LCP <2.5s, CLS <0.1, INP <200ms; Lighthouse Performance >=90, Accessibility >=95, Best Practices >=95 and SEO >=95. These are targets, not results from this task.

Measure the actual LCP element and request chain on Home. Use the selected responsive hero candidate, reserved geometry, early discovery and minimal font competition. Below-fold evidence should use appropriate lazy loading and stable dimensions. Check decode/paint cost as well as transfer bytes; an oversized decoded image can still be expensive after compression.

Audit emitted JS by route after each enhancement. Target zero React hydration for the planned launch responsibilities. Track theme, navigation and forms separately from the approved motion-only 5KB JS/3KB CSS gzip limits. Establish total page CSS/JS baselines after the shell; do not invent an already-approved whole-site budget. Reject unused islands and libraries. Remove blanket prefetch-all unless measured user benefit justifies its network cost.

Test font fallback, image failure, delayed image/font responses, theme initialisation and the frame settle for layout shift. No script should wait to reveal essential content. Compare cold/warm loads and both themes. Use repeatable mobile lab conditions and record limitations; lab Lighthouse does not establish field INP, which needs real interaction/field evidence when available.

Inspect production output, asset sizes, duplicate downloads, source maps where relevant and cache behaviour. V1 caches `/assets/*` although Astro normally emits `/_astro/`; broad immutable JS/CSS rules also need checking for unhashed files. Apply long immutable caching to verified fingerprinted assets, and suitable revalidation to HTML and mutable assets. Verify actual Netlify responses rather than assuming configuration globs match every clean URL. Coordinate CSP with the tiny theme script and form paths so security changes do not break loading or submission.

## 22. Dependency and tooling cleanup

### Necessary for V2

Make the npm installation reproducible: review the existing lockfile against package.json, stop ignoring the chosen npm lockfile, track it during the authorised implementation task, and pin a tested Node/npm environment consistently with Netlify. Use `npm ci` for clean verification. Do not start by regenerating every dependency to the newest version.

Install a compatible `@astrojs/check` deliberately, establish a non-interactive check command and include Astro-generated types through the appropriate sync/type configuration. Keep strictness. The current missing ImportMeta env type is a setup finding to investigate, not grounds for adding `any` or suppressing errors. Astro's documented configuration includes generated type declarations; confirm behaviour on the retained release. See [Astro TypeScript setup](https://docs.astro.build/en/guides/typescript/).

Make script names honest: a `check` command should cover Astro diagnostics; retain or rename `type-check` with an explicit scope; do not describe `astro check` as ESLint. If `lint` remains an alias for compatibility, document that it runs diagnostics, and add a separate non-writing formatting check if useful. A new lint framework is optional unless real checks justify it. Any newly revealed diagnostics need a bounded follow-up, not silent suppression or a broad UI rewrite.

Re-run an actual dependency audit during tooling work and record dependency path, affected version, severity, exploit prerequisites, build/dev/public exposure, available fix and decision. Current advisory pages show that the `define:vars` sanitisation issue lists an Astro fix at 6.1.6 and the inherited Sharp/libvips advisory lists 0.35.0. Those are not installed here. This means a compatible remediation needs investigation; it does not authorise `npm audit fix --force`. See the [Astro advisory](https://github.com/advisories/GHSA-j687-52p2-xcff) and [Sharp advisory](https://github.com/advisories/GHSA-f88m-g3jw-g9cj).

Also revisit the Phase 0 Astro server-error/SSRF, esbuild development-server and Tailwind integration dependency findings. A static public deployment reduces some server-runtime exposure but does not remove build/dev or image-processing risk. Check official advisories again at implementation time. Prefer supported compatible fixes; if remediation requires a major change, isolate and review that compatibility task before visual work. Record any residual risk and launch disposition explicitly.

Remove React, React DOM, their integration/types and JSX configuration only after MobileMenu and Health Check replacements leave no consumers. Remove stale React SSR/experimental options with that change. Review unused Shiki settings, duplicated aliases, speculative environment placeholders, preconnects and prefetch policy. Keep Sharp through Astro's supported image path; do not introduce a second image pipeline casually.

### Nice-to-have maintenance

Framework/Tailwind major upgrades without a security/support need, a large lint rule set, a general component test framework, CMS tooling and visual-regression infrastructure are not prerequisites. Focused automated checks for route publication, form state truthfulness and key journeys are justified because they protect meaningful failure boundaries. Introduce a browser test dependency only with those concrete tests, after checking available tooling; do not install tooling to test trivial presentational wrappers.

## 23. Security and headers implementation

Preserve secure static delivery and review dependencies throughout implementation. Treat form input as untrusted, bound and validate it at the receiver where applicable, display it as text and avoid logging unnecessary personal information. URLs are request data, never an instruction to fetch a remote resource. No automatic scanner or proxy is introduced.

Retain the intent of nosniff, restricted permissions and referrer policy. Review SAMEORIGIN framing against the site's actual embedding needs. Remove obsolete or ineffective header/configuration assumptions rather than adding a long untested list. Confirm HTTPS and actual host-provided HSTS before changing it; do not enable preload or includeSubDomains without checking all affected hosts and operational consequences.

Plan CSP from the real resource inventory: self-hosted assets/fonts where possible, required form destinations, script/style sources and framing restrictions. Use a staged report-only assessment before enforcement where hosting supports the workflow. A static inline theme initialiser needs a build-consistent hash or another deliberately tested solution; a per-request nonce is not naturally supplied by this static architecture. Do not solve a blocked initialiser by broadly enabling unsafe scripts. Test form enhancement, Astro output and both themes under the proposed enforced policy.

Avoid unnecessary external scripts, embeds, analytics or browser-to-third-party requests. Keep secrets out of public environment variables and client bundles. Verify headers on HTML, assets, recovery responses and any later function endpoint. Site-level hygiene supports engineering claims within scope; it is not penetration testing or a guarantee of no vulnerabilities.

## 24. Legal and privacy content verification

Before rewriting `legal.ts`, build a factual operations record with Dave. Verify:

| Fact | Required evidence |
| --- | --- |
| Hosting/form provider | Actual Netlify site/account configuration and enabled form detection; any alternate function/provider selected. |
| Data destination | Form inbox, notification recipient, mailbox provider and any forwarding/export process. |
| Retention/deletion | Actual settings and adopted manual practice for submissions, spam, mail, backups and project records; do not invent a number. |
| Email handling | Who accesses enquiries, report fulfilment, delivery failures and reply workflow. |
| Analytics | What actually runs in built/deployed pages; commented Fathom/Sentry placeholders are not live processing. |
| Cookies/localStorage | Real browser inventory, including the theme preference key, purpose and persistence behaviour. Do not assert a universal legal exemption. |
| Third parties/embeds | Actual loaded resources and processor arrangements, not assumptions about geographic hosting. |
| IP/log data | Provider documentation/settings and accessible logs; what is collected and for how long. |
| Review requests | Submitted URL/context, manual handling, report delivery, capacity and deletion practice. |
| Accessibility statement | Tests actually completed, known limitations and a working contact route. |
| Terms | Real scope/contract arrangements, liability/payment/support wording requiring Dave's confirmation or qualified advice. |

V1 asserts UK-based Netlify storage, no third-party sharing, 30-day log deletion, six-year business retention and named accessibility testing practices without evidence established here. Do not copy these assertions. Remove generic guarantees and promised response times unless adopted and supportable. Keep website-use terms distinct from project proposals/contracts. Publish an accurate update date only when the content has actually been reviewed.

## 25. Ordered implementation phases

These are implementation increments, distinct from the approved strategy/design Phases 0-5. The plan is approved; each increment retains its prerequisites and review gates. This documentation-only approval task does not begin any increment. Preserve unrelated changes and stay on `redesign/v2`. Keep commits coherent when commits are authorised. Branch previews are review environments; do not publish a partial V2 as the production launch.

The order adds an explicit Home-body increment so a finished hero is not mistaken for a finished homepage. Accessibility, responsive behaviour and truthful content are checked at every relevant gate; the later hardening phase is cross-site verification.

### Implementation 0 - Reproducible tooling and diagnostic baseline

- Objective: establish a trustworthy starting point before visual work.
- Likely files: `package.json`, `package-lock.json`, `.gitignore`, `tsconfig.json`; runtime pin/config only after compatibility selection.
- Prerequisites: plan and bounded first-task scope approved by Dave; Implementation 0 begins in a subsequent implementation task, not this approval update.
- Included: lockfile tracking, compatible diagnostics, generated-type setup, truthful scripts, runtime comparison and advisory triage. Separate a required major remediation into its own reviewed subtask.
- Excluded: UI/theme work, React removal, route/content/image changes, Astro/Tailwind major upgrades and broad dependency remediation. Any larger security/dependency change discovered during the baseline must be reported separately for review.
- Acceptance: clean installation is reproducible; diagnostics run without prompts; the current env-type failure is explained/resolved through correct setup; remaining findings are explicitly scoped.
- Tests: clean install, generated-type/check commands, fresh production build and asset/route-count comparison; record audit results and any remaining errors accurately.
- Review: inspect the small tooling diff and baseline before design implementation. Do not progress with unexplained build/check failures.
- Rollback/risk: revert only this coherent tooling change if necessary; preserve the original lockfile baseline and avoid broad dependency churn.

### Implementation 1 - Tokens, typography evaluation and theme foundation

- Objective: establish paired semantic roles and reliable preference behaviour.
- Likely files: `globals.css`, proposed `tokens.css`, Tailwind config, BaseLayout, proposed ThemeControl/theme script; approved font assets only after selection.
- Prerequisites: tooling passes; font shortlist/rights process and provisional token review.
- Included: semantic roles, dark baseline, remembered choice, native control states and real-copy font trials.
- Excluded: complete shell, hero composition, final pages and motion effects.
- Acceptance: no obvious wrong-theme flash; storage/JS failure usable; both palettes support readable controls and focus; no final font chosen without review.
- Tests: check/build, cold/warm and blocked storage/font tests, theme keyboard tests, contrast and initial CLS inspection.
- Review: approve paired theme/type evidence before treating tokens as final.
- Rollback/risk: keep changes isolated; do not let temporary V1 compatibility aliases become permanent duplicated colours.

### Implementation 2 - Global shell and responsive index

- Objective: implement the real vertical identity/index and document relationship.
- Likely files: BaseLayout, Header/Navigation replacements, BrandIdentity, SiteIndex, Footer, navigation/constants and removal of MobileMenu when unused.
- Prerequisites: theme foundation and actual approved labels.
- Included: one nav tree, brand/Home identity, enquiry/review hierarchy, gate-aware Work link, skip link, short-height/compact transformation.
- Excluded: final hero/media and new page bodies; no automatic hamburger fallback.
- Acceptance: desktop remains a functional spine; compact and zoom layouts remain usable; no nested nav or inaccessible duplicate tree.
- Tests: check/build, keyboard/current-state tests, all section 12 widths, short landscape, zoom, JS-off and console inspection.
- Review: shell gate before stacking page work.
- Rollback/risk: replace shell responsibility coherently; do not retain two competing public navigation systems.

### Implementation 3 - Static homepage opening and image delivery

- Objective: implement the approved Offer/Directory opening without motion dependency.
- Likely files: Home, replaced Hero, ServiceDirectory, PrimaryAction/DirectionalLink, AtmosphericHeroMedia, approved hero/font assets and asset-rights record.
- Prerequisites: shell responsive gate, final image rights/crop and typography decisions.
- Included: exact H1, working support, full service names, local/accountability cues, substantial right image field and optimised responsive delivery.
- Excluded: frame settle, below-fold evidence invention and other page bodies.
- Acceptance: complete useful static opening in both themes, no 100vh/card regression, no clipped labels, image failure usable and provisional budgets assessed.
- Tests: check/build, responsive/zoom review, actual selected image requests, cold-load LCP/CLS and no-JS inspection.
- Review: Dave reviews the actual desktop/compact opening against approved Phase 4.
- Rollback/risk: retain a stable static baseline for later motion comparison; do not fix composition defects with animation.

### Implementation 4 - Home body and Health Check retirement

- Objective: complete Home's approved responsibilities and remove the automated offer.
- Likely files: Home, HealthCheck/HealthCheckForm, health-check utilities, relevant flags/testimonial consumers and shared action components.
- Prerequisites: opening accepted; shared Work selector defaults to withheld.
- Included: H3 problem/scope orientation, H4 responsibility/expectations and H5 enquiry with quieter review; H2 only if qualified later. Remove scanner, scores and instant/report-sent promises.
- Excluded: a replacement scanner/backend, invented evidence and a full service catalogue/biography on Home.
- Acceptance: complete coherent Home with gate-off output; no health-check island/import/CTA except any separately approved legacy recovery anchor.
- Tests: check/build, output search for old claims/islands, keyboard and responsive Home journey, link inventory.
- Review: homepage content ownership and density review.
- Rollback/risk: do not restore deceptive automated functionality as a production fallback; incomplete branch remains unlaunched.

### Implementation 5 - Services consolidation

- Objective: build the substantive three-section service owner.
- Likely files: service index/data, old service `[slug].astro`, ServiceCard consumers and shared links.
- Prerequisites: shared tokens/actions; approved content system.
- Included: all fragments, distinct scope/limits, one shared expectations/pricing explanation; record retirement entries as old generator is removed.
- Excluded: thin service routes, fourth cyber service and numerical pricing invention; exact HTTP responses remain later.
- Acceptance: all three services independently understandable and reachable, no unsupported old claims in generated output.
- Tests: check/build, direct fragment/zoom/keyboard tests, link/metadata review and generated route inspection.
- Review: scope and direct-entry content review.
- Rollback/risk: consolidate data and consumers together; do not leave duplicate V1 detail content generating silently.

### Implementation 6 - About and founder account

- Objective: establish business responsibility and accurate chronology.
- Likely files: About, constants and its Home excerpt if consistency requires it.
- Prerequisites: approved chronology and content ownership.
- Included: business before biography; 2005-07 early web, 2007-10 construction, 2010-21 tattoo/studio work, 2022-present Open University; accurate ongoing degree wording and prior incomplete Cyber Security study.
- Excluded: invented portrait, continuous professional-web-experience claims, certifications, team language and biography duplication.
- Acceptance: BSc (Honours) Computer Science with Artificial Intelligence is ongoing; prior roughly two years of BSc (Honours) Cyber Security does not imply completion. I/Teesside Digital usage matches responsibility.
- Tests: check/build, chronology/copy comparison, heading, narrow prose and theme checks.
- Review: Dave verifies personal facts and voice.
- Rollback/risk: retain reviewed facts as authority; no placeholder portrait or live-status badge to fill space.

### Implementation 7 - Contact acceptance and recovery

- Objective: replace the false-success path with a verified enquiry flow.
- Likely files: Contact, ContactForm, FormField, form config/script, validation, Netlify configuration only as required; optional endpoint only after explicit decision.
- Prerequisites: receiver choice and operational facts; authorised deployment/test destination for end-to-end verification.
- Included: approved fields, all six states, progressive native fallback, spam/validation and direct email.
- Excluded: review form, file uploads, forced selector, CRM and unrelated infrastructure.
- Acceptance: accepted means verified technical acceptance; rejection/uncertainty retain values; actual capture and notification results recorded separately.
- Tests: check/build, focused state tests, keyboard/no-JS, timeout/rejection/double-submit and authorised end-to-end submission/mailbox checks.
- Review: demonstrate real acceptance and failure paths, then review privacy implications.
- Rollback/risk: if enhanced handling fails, use a verified native path or clearly stated email fallback; never restore success-on-click.

### Implementation 8 - Manual website review task

- Objective: deliver the distinct bounded review request journey.
- Likely files: proposed review page/form, shared form config, availability-aware secondary links and operational privacy content.
- Prerequisites: Contact receiver/state mechanics verified; Dave's manual fulfilment/availability confirmed.
- Included: required/optional fields, scope/exclusions, exact conditional receipt and retained paused route.
- Excluded: automated fetch/score/report, paid flow, scheduling promise and security certification.
- Acceptance: no receipt before acceptance; open/paused states coherent across entry points; submissions reach the correct review destination.
- Tests: check/build, shared state regression, real authorised review submission, direct route/no-JS and paused-build checks.
- Review: Dave reviews manual fulfilment and public expectations.
- Rollback/risk: pause requests honestly while retaining the route if operations fail; no misleading redirect into Contact.

### Implementation 9 - Evidence preparation and conditional Work

- Objective: either publish qualified North East Joinery proof or withhold Work cleanly.
- Likely files: work data, proposed rest route, WorkEntry/EvidenceFigure/ProjectStatus, Home H2 and shared gate consumers; approved screenshots/rights notes.
- Prerequisites: section 15 evidence inspection and Dave's publication decision.
- Included: truthful demo/WIP explanation, limitations, verified links, optimised captures and both publication states.
- Excluded: QuoteFlow, SiteGuard, fabricated results, separate repository source changes and assumed completion dates.
- Acceptance: evidence qualifies or Work remains absent; no contradictory status or normal discovery when withheld.
- Tests: verify the recommended rest-route mechanism against the retained Astro version and actual static output; check/build both gate states from clean output, sitemap/link/HTML absence assertions, screenshot readability and image interaction accessibility. A simpler, more robust static alternative may be proposed for review under section 14 without weakening publication guarantees.
- Review: evidence packet and complete Work journey, or explicit gate-off launch choice.
- Rollback/risk: gate-off is the safe supported state; retired URL behaviour still needs migration review.

### Implementation 10 - Supporting routes, verified policies and SEO

- Objective: finish retained legal/recovery routes and accurate head/schema output.
- Likely files: privacy/accessibility/terms/404, legal data, SEO helpers, BaseLayout, constants, robots/OG and sitemap configuration if needed.
- Prerequisites: actual hosting/form operations and completed test evidence; unresolved facts cannot be invented.
- Included: verified policies, accurate update dates, titles/canonicals, valid logo/schema, conditional recovery links and social metadata.
- Excluded: unsupported testing/retention claims, SEO stubs and exact retirement HTTP rules.
- Acceptance: all retained routes useful and truthful; no duplicate brand titles, phantom social identities or missing schema assets.
- Tests: check/build, every generated head/structured-data instance, links/fragments, policy fact review and both-theme prose checks.
- Review: Dave approves factual operational statements and any terms needing qualified review.
- Rollback/risk: retain only verified statements; do not restore V1 policy claims for completeness.

### Implementation 11 - Approved motion integration

- Objective: add only the approved motion to already usable static components.
- Likely files: media wrapper/initialiser, directory/actions/evidence scoped CSS and shared motion tokens.
- Prerequisites: static hero and affected journeys accepted; actual image loading path understood.
- Included: section 11 map and conservative clean-start settle with cancellation.
- Excluded: libraries, observers without need, page transitions, smooth scroll, repeated reveals and pointer effects.
- Acceptance: reduced/coarse/failure/history states remain full/static; no retroactive clipping, content delay or unapproved extra motion.
- Tests: check/build, cold/cached/failed image, history restoration, preference changes, keyboard/touch, compressed motion deltas and CLS/paint comparison.
- Review: Dave reviews eligible motion alongside static fallback.
- Rollback/risk: remove enhancement to its accepted static baseline if timing/performance cannot be made robust.

### Implementation 12 - Cross-site hardening and security configuration

- Objective: verify the complete site and resolve cross-cutting defects.
- Likely files: only affected source/config, cache/security headers and meaningful focused test files.
- Prerequisites: all included routes and form operations complete.
- Included: full responsive matrix, manual/automated accessibility, performance, dependency recheck, CSP/caching and emitted bundle audit; remove unused React/config/assets after reference checks.
- Excluded: aesthetic expansion, maintenance wishlist and unsupported compliance claims.
- Acceptance: recorded targets met in stated conditions, no unresolved serious regression, residual advisory decisions explicit and all essential journeys usable.
- Tests: production build/check/truthful lint or format check, console, keyboard/AT, both themes, real touch where available, Lighthouse and deployed headers/form regression.
- Review: evidence-based defect list and fixes; untested environments clearly labelled.
- Rollback/risk: isolate hardening fixes and roll back offending effects; do not accept mobile/a11y failure for visual polish.

### Implementation 13 - Migration and response review

- Objective: decide and verify exact legacy URL behaviour from evidence.
- Likely files: Netlify redirects/configuration, internal links/canonical helpers and any narrowly justified recovery response.
- Prerequisites: final route/evidence inventory and available inbound-link information.
- Included: section 2 checklist, slash policy reconciliation and proposed response matrix for Dave's review, then authorised implementation.
- Excluded: automatic all-to-Home redirects, thin service pages and unapproved public Work.
- Acceptance: each old URL has a reasoned outcome; useful recovery, no loops/chains or false 200 pages; sitemap/canonical/internal links agree.
- Tests: deployed GET/HEAD where relevant, slash/query/direct-link cases, genuine missing URL, legacy fragment recovery and both Work states as applicable.
- Review: exact response matrix before locking migration behaviour.
- Rollback/risk: preserve previous deployment/config evidence; isolate redirect changes so a bad rule can be reverted quickly.

### Implementation 14 - Launch audit and release review

- Objective: verify the final candidate against section 28 and prepare a reviewable release.
- Likely files: launch evidence/checklist documentation and only narrowly scoped fixes; deployment settings as separately authorised.
- Prerequisites: prior gates passed, migration approved and operational recipients ready.
- Included: fresh clean install/build/check, route/content/asset/claim audit, end-to-end forms, deployment configuration comparison and rollback plan.
- Excluded: automatic merge/deploy or new scope merely because the site is nearly finished.
- Acceptance: complete definition of done with evidence and no unacknowledged blocker; Dave reviews the actual release candidate.
- Tests: clean production candidate, all public routes, real response/header checks, key journeys, links, sitemap and recorded performance/accessibility results.
- Review: explicit launch review after all work is concrete and inspectable.
- Rollback/risk: record a known-good deploy and reversible release method; `main`/`v1.0` preserve historical V1, but rollback must not knowingly reinstate false form receipts or other unresolved defects without an honest recovery plan.

## 26. File-by-file change map

These are likely later changes, not edits made by this task. All paths are repository-relative. Proposed additions are explicitly labelled. Work rest-route entries remain recommendations subject to Implementation 9 verification and section 14's clarification; approval fixes the publication guarantees, not that specific mechanism.

| Actual file(s) | Action | Planned responsibility |
| --- | --- | --- |
| `package.json` | MODIFY | Reproducible diagnostics/scripts, necessary dependency changes, eventual React removal. |
| `package-lock.json` (present locally, ignored) | MODIFY / ADD to version control | Reviewed reproducible npm resolution; not a new imaginary file. |
| `.gitignore` | MODIFY | Track chosen npm lockfile; continue ignoring dependencies/build output/secrets. |
| `tsconfig.json` | MODIFY | Astro-generated types and strict diagnostics; later remove unused React JSX settings. |
| `astro.config.mjs` | MODIFY | Retain static Astro/images/sitemap; review prefetch, aliases, React options and canonical slash policy. |
| `tailwind.config.mjs` | MODIFY | Map semantic variables, simplify V1 visual/motion defaults. |
| `netlify.toml` | MODIFY | Verified form/build/runtime settings, cache paths, security headers and reviewed migration rules. |
| `.env.example` | MODIFY | Describe actual public config/receiver requirements; remove speculative integrations and unsupported SMTP assumptions. |
| `src/layouts/BaseLayout.astro` | MODIFY | Semantic shell, reliable theme init, accurate head/schema, remove unused preconnects/smooth scrolling. |
| `src/styles/globals.css` | REPLACE V1 styling rules | Minimal shared baseline, focus/prose and semantic consumers. Keep useful reset intent. |
| `src/config/constants.ts` | MODIFY | Verified business/site facts; remove old service/Health Check flags and duplicated navigation. |
| `src/data/services.ts` | REPLACE records/model as needed | Three approved identities and summaries; fragments instead of dedicated-page slugs. |
| `src/data/work.ts` | MODIFY | Qualified evidence model and single publication gate; excluded projects not in public records. |
| `src/data/legal.ts` | REPLACE unsupported content | Verified operational statements and maintainable structured prose. |
| `src/data/testimonials.ts` | REMOVE when unreferenced | Empty speculative feature has no launch content. |
| `src/lib/seo.ts` | MODIFY | Canonical/title correctness, minimal truthful schema and safe serialisation. |
| `src/lib/validation.ts` | MODIFY | Honest bounded form validation, inclusive names, safe URL rules; remove health-check-specific paths and misleading sanitisation claims. |
| `src/lib/health-check.ts` | REMOVE | Automated fetch/heuristic/scoring system excluded. |
| `src/pages/index.astro` | REPLACE composition/content | Approved opening plus H1-H5 responsibilities and conditional H2. |
| `src/pages/services/index.astro` | REPLACE content/composition | One substantive service document. |
| `src/pages/services/[slug].astro` | REMOVE | No launch service detail generator or hidden stubs. |
| `src/pages/work/index.astro` | REPLACE via proposed rest route | Conditional index generation rather than unconditional file. |
| `src/pages/work/[slug].astro` | REPLACE via proposed rest route | Only qualified detail generation; remove Completed/timeline fallbacks. |
| `src/pages/about.astro` | REPLACE content/composition | Business responsibility and approved personal history. |
| `src/pages/contact.astro` | MODIFY | Dedicated enquiry task, approved fields/context and verified form. |
| `src/pages/privacy.astro` | MODIFY | Verified policy, readable prose/contents and accurate metadata. |
| `src/pages/accessibility.astro` | MODIFY | Evidence-based statement and known limitations. |
| `src/pages/terms.astro` | MODIFY | Reviewed actual terms and useful prose structure. |
| `src/pages/404.astro` | MODIFY | Honest recovery, gate-aware links and deployed status verification. |
| `src/components/astro/Header.astro` | REPLACE with SiteIndex composition | Retire horizontal sticky header structure; remove old wrapper when consumers migrate. |
| `src/components/astro/Navigation.astro` | REPLACE / fold into SiteIndex | One labelled tree and correct current state, without redundant wrapper component. |
| `src/components/astro/Footer.astro` | MODIFY | Approved destinations and conditional Work, legal/review links. |
| `src/components/astro/Hero.astro` | REPLACE | Home opening composition with separated media/directory responsibilities. |
| `src/components/astro/Button.astro` | REPLACE relevant uses, then REMOVE if unused | Named directional action responsibility; preserve native link/button distinctions. |
| `src/components/astro/Card.astro` | REMOVE after consumer migration | Generic shadow/scale container does not define V2 grammar. |
| `src/components/astro/ServiceCard.astro` | REPLACE with ServiceDirectory, then REMOVE | Open service entries rather than cards. |
| `src/components/astro/ProjectCard.astro` | REPLACE with WorkEntry, then REMOVE | Evidence/status/explanation rather than generic project tile. |
| `src/components/astro/TechnicalLabel.astro` | REMOVE after references checked | Replace status uses with accurate plain ProjectStatus text, not generic live badges. |
| `src/components/astro/Section.astro` | MODIFY or remove if redundant | Small semantic spacing/measure wrapper; avoid nesting/double padding. |
| `src/components/astro/ContactForm.astro` | REPLACE behaviour/fields in place | ProjectEnquiryForm responsibility; no rename required merely to match a concept. |
| `src/components/react/MobileMenu.tsx` | REMOVE after shell replacement | Static wrapping navigation first; no React menu dependency. |
| `src/components/react/HealthCheck.tsx` | REMOVE | No automated review. |
| `src/components/react/HealthCheckForm.tsx` | REMOVE | Replace false report-sent flow with separate manual request. |
| `public/images/logo/teesside-digital-mark.svg` | KEEP | Existing TD identity; verify accessible embedding and theme context. |
| `public/images/logo/teesside-digital-logo.svg` | KEEP asset pending usage review | Existing horizontal lock-up is not the new live stacked identity; remove public copy only if unused and unnecessary. |
| `public/favicon.svg`, `public/favicon.png`, `public/apple-touch-icon.png` | KEEP, verify | Existing identity continuity, dimensions and theme/tab visibility. |
| `public/images/og-default.jpg`, `public/images/og-hero.jpg` | REPLACE if old visual/content fails review | Deliberate V2 social image; avoid duplicate payloads where unnecessary. |
| `public/images/services/web-development.jpg`, `ai-automation.jpg`, `cybersecurity.jpg` | REMOVE once unreferenced | Old service-card imagery has no automatic role in the open directory. |
| `public/images/work/northeast-joinery-hero.jpg` | REPLACE as evidence; remove old copy if unused | Real qualified interface captures, not an assumed proof image. |
| `public/images/work/quoteflow-hero.jpg`, `siteguard-hero.jpg` | REMOVE once unreferenced | Excluded projects should not remain public discovery artefacts. |
| `public/robots.txt` | KEEP intent / MODIFY if needed | Correct sitemap origin and final public discovery policy. |
| `AGENTS.md`, `V2_MASTER_BRIEF.md`, approved V2 phase files | KEEP | Governing decisions; do not rewrite approvals during implementation. |
| `PLAN.md` | KEEP historical | V1 intent, not V2 implementation authority. |
| `ARCHITECTURE.md`, root `README.md`, `docs/v2/README.md` | MODIFY later documentation only | Reconcile actual implementation and index when authorised; no change in this task. |
| `.claude/instructions.md` | MODIFY later guidance if authorised | Remove stale V1/SMTP authority conflicts without changing the user's learning/style preferences. |
| `node_modules/`, `.astro/`, `dist/` | KEEP generated/ignored role | Recreate through verified commands during implementation; never treat stale output as source. |

| Proposed addition - does not currently exist | Action / purpose |
| --- | --- |
| `src/styles/tokens.css` | ADD shared semantic theme/type/layout/motion roles. |
| `src/config/navigation.ts` | ADD small destination owner and gate-derived entries. |
| `src/config/forms.ts` | ADD distinct form identities/limits/review availability. |
| `src/scripts/theme.ts`, `src/scripts/forms.ts` | ADD only when needed for small reusable handlers; head initialisation remains deliberately early. |
| `src/components/astro/SiteIndex.astro`, `BrandIdentity.astro`, `ThemeControl.astro` | ADD shell responsibilities. |
| `src/components/astro/PrimaryAction.astro`, `DirectionalLink.astro`, `ServiceDirectory.astro` | ADD repeated action/directory responsibilities. |
| `src/components/astro/AtmosphericHeroMedia.astro` | ADD image delivery and optional settle boundary. |
| `src/components/astro/EvidenceFigure.astro`, `WorkEntry.astro`, `ProjectStatus.astro` | ADD only with qualified Work implementation. |
| `src/components/astro/FormField.astro`, `WebsiteReviewForm.astro` | ADD shared field markup and separate review form. |
| `src/pages/website-review.astro` | ADD approved manual-review route. |
| `src/pages/work/[...path].astro` | ADD replacement conditional static route generator for index/detail. |
| `src/assets/hero/`, `src/assets/work/` | ADD selected production image sources only after rights/evidence qualification. |
| `public/fonts/` or equivalent imported font assets | ADD only licensed selected files, with measured delivery. |
| `docs/v2/asset-register.md`, later validation/migration records | ADD factual decision/evidence records during relevant authorised phases; no empty files now. |
| Runtime pin file, focused tests/CI, optional Netlify Function | Conditional ADD only after the corresponding tooling/receiver decision; no assumed new server architecture. |

Before removing any file/asset, check source references, generated references and useful external URLs. Version control preserves history; do not retain obsolete assets in public solely as an archive. This map does not authorise editing a separate demonstration repository.

## 27. Implementation risks and mitigations

| Risk | Mitigation |
| --- | --- |
| V1 styling quietly controls V2 | Replace semantic tokens and remove generic card/hero rules at their owning phase; compare actual shell/opening with approved references. |
| North East Joinery grammar is reused | Perform the independence test with actual type, spacing, navigation and image composition; do not copy its source. |
| Spine becomes an ordinary navbar | Make shell acceptance a gate before Home; require genuine desktop identity/navigation responsibility. |
| Dark SaaS regression | Review open document structure, mineral palette and imagery; reject glow panels, card grids and decorative technical backgrounds. |
| Heavy hero hurts LCP/decode | Qualified crops, responsive candidates, provisional budgets and cold-load measurement before motion. |
| Light theme is an inversion | Paired semantic tokens and unchanged photographs; review every control/state in Light. |
| Hydration grows by convenience | Static Astro default, emitted bundle audit and remove React after final consumer; no library for a preference or link hover. |
| Forms claim receipt without evidence | Shared explicit states, known receiver contract, deployed capture tests and separate delivery observations. |
| Work gate is bypassed | One selector, conditional static route generation and clean gate-off/gate-on output tests. |
| Old services remain discoverable | Remove generator/data duplication and inventory routes, sitemap, canonicals and old links. |
| Compact navigation becomes huge | Test real labels/zoom early; visible-list baseline, documented disclosure decision only if necessary. |
| Motion accumulates | One approved map, zero library budget, no replacement reveal when Hero skips, static fallback review. |
| Content/status diverges | Small authoritative service/project records and explicit page ownership; compare generated copy with approved facts. |
| Cyber/legal claims exceed evidence | Claim search plus operational fact review; no inherited assertions from V1 policy/schema. |
| Accessibility is deferred | Keyboard/contrast/responsive checks at every affected phase; hardening is a final cross-check. |
| Plan becomes rewrite-everything | Keep Astro, static hosting, useful helpers and small responsibilities; isolate tooling, shell, pages and operations. |
| Clean-start settle is unreliable | Full static baseline; skip whenever prepaint readiness/restoration is uncertain; never reclip or delay content. |
| Advisory remediation forces major churn | Separate compatibility/security decision before visual implementation; no forced audit fix. |
| Partial branch preview is mistaken for launch | Clearly labelled review candidate, controlled preview discovery and explicit final release review. Robots is not access control. |
| Untracked approved documents are lost | Preserve current working tree, review status before each task and never reset/clean unrelated files. |

## 28. Definition of done

V2 is launch-ready only when all applicable items have recorded evidence:

- Approved visual direction, exact hero H1, service names, conversion hierarchy and content architecture are implemented. Desktop spine and compact transformation are reviewed.
- Both themes are complete, remembered preference/failure behaviour works and selected fonts/hero imagery have verified rights and suitable delivery.
- All intended routes, fragments and internal/external links work. Work is either qualified and consistently published or cleanly withheld from output and discovery. QuoteFlow and SiteGuard remain excluded.
- No automated Health Check, fabricated scan/report, unsupported cyber service, fake proof, contradictory completion claim or invented founder qualification remains in visible content, metadata or schema.
- Contact and review forms are tested end-to-end with authorised submissions. Acceptance, rejection and uncertainty are truthful; native fallback, spam handling, receipt routing and actual notification/mailbox results are recorded.
- Review scope, initially free price, manual fulfilment, no guaranteed turnaround and paused-route behaviour are accurate.
- Responsive tests cover the stated widths, short landscape and zoom/text enlargement; real-device coverage and any limits are identified.
- Keyboard, screen-reader, contrast, forced-colour, error, fragment and reduced-motion tests are recorded with serious defects resolved. Accessibility statements describe actual tests and limitations.
- Performance targets and Lighthouse targets are measured under stated conditions; image/font/JS/CSS/decode/cache behaviour is reviewed. Do not turn lab results into unsupported field claims.
- Schema, titles, descriptions, canonical policy, OG, sitemap and robots agree with final public content. Genuine missing URLs have genuine recovery responses.
- Exact migration decisions have been reviewed and deployed behaviour verified; no loops, misleading blanket redirects or stale generated pages remain.
- Hosting/form/privacy/retention/email/log/storage facts and terms are verified. Security headers/CSP are tested against actual resources and form flows.
- Clean install, production build, Astro diagnostics and the agreed truthful lint/format checks pass. No unresolved serious console errors, type failures or known functional regressions are left for later cleanup.
- Dependencies/advisories are freshly triaged, required remediation completed and any residual risk explicitly reviewed; unused runtime/dependency/configuration costs are removed.
- A final launch audit and Dave's release review are complete, with a known rollback method and operational ownership for enquiries/reviews.

## 29. Decisions for Dave

Dave has approved this plan and its bounded first-task scope. Implementation 0 has not begun and is excluded from this approval task. The following implementation decisions retain their later deadlines; they do not reopen the approved direction.

Approval does not resolve final font families, final colour tokens, the exact hero photograph/crop or its rights, exact responsive breakpoints, the form receiver beyond the current Netlify-first recommendation, Work launch status, exact 301/404/410 legacy URL behaviour, optional compact navigation disclosure or dependency major-version remediation requiring separate review. These remain deferred to their relevant implementation phases and review gates.

| Decision | Recommendation | When required |
| --- | --- | --- |
| Reproducible tooling change | Approved bounded scope: track the existing reviewed npm lockfile and install compatible Astro diagnostics; select a tested runtime. | Subsequent Implementation 0 task; not this approval update. |
| Major dependency remediation, if needed | Review a concrete compatibility/security proposal separately; do not silently upgrade during UI work. | After initial advisory triage, before affected implementation/release. |
| Hero sourcing | Use an owned local photograph if suitable, otherwise a properly licensed real asset; review actual candidate and rights/crop evidence. | Before static hero acceptance. No purchase or asset creation is authorised here. |
| Final font choice | Review a small licensed shortlist in the real opening, including transfer/fallback/mobile evidence. | Theme/type and hero phases; no need to settle before tooling. |
| Form receiver | Retain managed Netlify Forms if its verified acceptance and operational contract satisfies the task; otherwise review a bounded endpoint/provider alternative. | Before implementing submission behaviour or adding server infrastructure. |
| Form/mail operations | Confirm recipient, access, retention and authorised test destination; establish manual review fulfilment and availability. | Before form end-to-end testing and policy publication. |
| Work at launch | Decide from the inspected North East Joinery evidence packet; default withheld until it qualifies. | Work publication gate, not before initial coding. |
| Exact retired URL responses | Review the completed URL/equivalence/inbound/recovery matrix. | Migration phase, explicitly deferred until then. |
| Compact disclosure if necessary | Keep visible navigation unless actual content-pressure evidence justifies enhancement. | Shell responsive gate only if the baseline fails. |

No further approval is needed to preserve the already approved three-service proposition, Dark default, complementary Light, desktop spine, environmental hero, manual review or restrained motion. Numerical development prices and legal facts must not be invented to remove an apparent implementation dependency.

## 30. Approved first implementation task

The approved first task is: **Make the existing npm/Astro diagnostic baseline reproducible without changing the website.** It remains unstarted and must be carried out as a subsequent small tooling-only task.

Limit the first coding diff to `package.json`, the existing `package-lock.json`, `.gitignore` and the minimum correct `tsconfig.json` setup. Add a runtime pin only after checking compatibility with the actual Netlify environment. Review the existing lock before resolving packages; add only the compatible diagnostic dependency and its necessary resolution changes. Do not remove React yet, upgrade Astro/Tailwind majors, change page content, touch imagery or begin tokens/layout work.

Establish non-interactive Astro diagnostics and generated types, investigate the current ImportMeta env error, and run a fresh clean-install/check/build baseline. Record advisory applicability and report any larger security/dependency change separately for review; broad dependency remediation is outside Implementation 0. If diagnostics reveal unrelated application fixes, report and scope them as a small follow-up rather than widening this task silently. The review artefact is the small tooling diff plus exact command outcomes and remaining findings. This first task has not been executed.

**V2 implementation plan approved and complete. Production implementation has not begun.**
