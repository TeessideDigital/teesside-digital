# Phase 0: Business, Positioning and Current-Site Audit

**Date:** 6 September 2026  
**Status:** Phase 0 complete, awaiting review. Recommendations are not approved implementation decisions.  
**Branch confirmed:** `redesign/v2`  
**Audited commit:** `4b40111f566fd63c26b664993846610030436838`  
**Scope:** Audit only. No production code, components, styles, configuration or other project documents changed. Phase 1 has not begun.

The five requested documents were read completely before repository inspection: `V2_MASTER_BRIEF.md`, `AGENTS.md`, `docs/v2/README.md`, `ARCHITECTURE.md` and `PLAN.md`. The user's requested output path takes precedence over the older root-level filename in the master brief. This document is the review deliverable, not a claim of user approval.

Evidence references use repository-relative paths and source line numbers at the audited commit. **Observed** means inspected in source, generated output or the browser; **inferred** means a reasoned consequence; **unverified** identifies an external or operational fact this repository cannot establish. Severity measures commercial, credibility and user impact, not a security CVSS score:

- **CRITICAL:** Misrepresents essential evidence, makes an indefensible assurance, or can silently lose the principal conversion. Resolve before reusing the system or claim in V2.
- **HIGH:** Materially weakens trust, commercial fit, accessibility or engineering credibility.
- **MEDIUM:** Meaningful usability, consistency or maintenance problem.
- **LOW:** Limited-impact hygiene or refinement.

## 1. Executive assessment

Teesside Digital has a sensible technical foundation and a potentially credible founder-led business, but V1 currently asks for more trust than its evidence supports. Its largest problems are not a lack of cinematic design. They are conflicting project facts, excessive security assurances, an unreliable primary conversion proposition and contact feedback that can claim receipt without delivery.

The recommended direction is a focused web consultancy for established owner-led service businesses in the North East. Lead with useful websites and enquiry journeys; offer narrowly scoped automation where it solves a demonstrated administrative problem; make security-conscious development an evidenced delivery standard. Do not present these as three equally mature specialist consulting practices.

The website demonstrates useful competence through static rendering, semantic structure, reusable components, working routes and restrained infrastructure. It undermines that competence through stock images presented as project concepts, large unoptimised assets, a primary link whose text disappears on hover, founder placeholders and unverified assurance copy. An independent visitor could reasonably question the claimed precision.

### Highest-priority findings

| ID | Rank | Finding | Principal evidence |
|---|---|---|---|
| C01 | CRITICAL | Contact confirmation precedes its network request; failed delivery can still appear successful. | `src/components/astro/ContactForm.astro:298-319`; local browser submission reproduced the confirmation on a preview with no Netlify receiver. |
| C02 | CRITICAL | Every case-study sidebar says Completed and 8-12 weeks, while all project data says in-development and the same page says it has not been built. | `src/pages/work/[slug].astro:109-110,160-168`; `src/data/work.ts:45,65,85`. |
| C03 | CRITICAL | The service overview promises no vulnerabilities. The advertised security practice extends into penetration testing, incident recovery and compliance without supporting evidence here. | `src/pages/services/index.astro:93-94`; `src/data/services.ts:98-104`; service FAQ in `src/pages/services/[slug].astro:181-188`. |
| H01 | HIGH | The primary review CTA leads to a browser diagnostic that cannot reliably read arbitrary customer websites. | `src/pages/index.astro:48-49,130-136`; `src/lib/health-check.ts:55-69`. |
| H02 | HIGH | Health scores imply assurance the checks cannot provide. Unknown headers and a sales suggestion reduce the security score. | `src/lib/health-check.ts:320-355,436-456`; own-site browser result: overall 96, performance 100, accessibility 100, security 85, SEO 100. |
| H03 | HIGH | The report flow promises email delivery without an implemented visitor-report service or static registration for its conditional form. | `src/components/react/HealthCheckForm.tsx:51-80,97-117,211-213`; built and live homepage HTML. |
| H04 | HIGH | Target customer and service scope are too broad for the available proof and a solo delivery model. | Services data; service use cases; `src/pages/work/index.astro:122-143`. |
| H05 | HIGH | Founder chronology, study status and commercial-experience implications conflict. | `src/pages/index.astro:308-316`; `src/pages/about.astro:65-94`; master brief founder context. |
| H06 | HIGH | Agency price attacks contradict the site's own 5k-50k+ pricing; value is framed as cheaper overhead rather than demonstrated fit. | `src/pages/index.astro:82,188-190`; `src/pages/services/index.astro:183-185`. |
| H07 | HIGH | The primary anchor CTA becomes unreadable on hover: text and background both compute to `#6e93b5`, a 1:1 contrast ratio. | Browser-confirmed; `src/styles/globals.css:52`; `src/components/astro/Button.astro:65`. |
| H08 | HIGH | Large original images bypass the configured optimisation pipeline; case studies show subject imagery rather than evidence of the software. | `src/components/astro/Card.astro:123-129`; `src/pages/work/[slug].astro:61-66`; public image inventory. |
| H09 | HIGH | Privacy and accessibility pages assert operating practices, locations and tests that require substantiation and contain contradictions. | `src/data/legal.ts:41-110,175-185,199-209`. |
| H10 | HIGH | The installed dependency graph has reported advisories requiring applicability review. Static delivery limits some exposure but does not justify ignoring them. | Read-only `npm audit --json`: four affected package entries, two high and two low, zero critical. |

No claim is made that Dave lacks undisclosed experience, that all live enquiries have failed, or that the site has been compromised. Those conclusions would exceed the evidence. The verified contradictions and failure paths are sufficient reasons to change the relevant claims and systems.

## 2. Current positioning assessment

### What the visitor is asked to believe

The homepage headline, Precision Engineering for Small Businesses, communicates care but does not identify a specific buying problem. The supporting sentence clarifies websites and applications; subsequent sections expand into AI, cybersecurity, scalability and nationwide clients. The site alternates between a local solo developer, a broad technology consultancy and an agency-like provider of complete digital transformation.

Direct access to Dave is an authentic benefit. It is not unique among freelancers. Astro, React, security awareness and modern design are also not distinctive commercial propositions by themselves. Differentiation needs the combination of a relevant customer problem, personal business understanding, visible work and dependable delivery.

The founder's prior business ownership is more commercially useful than generic claims of passion or being an expert. The site should explain how this affects briefing, communication, practical constraints and accountability, without suggesting that another profession substitutes for specialist security experience.

### V1 intention, actual implementation and V2 ambition

| Area | What V1 intended | What the repository actually does | V2 ambition and audit judgement |
|---|---|---|---|
| Business proposition | Solo consultancy, technical but human, precision for small businesses. | Broad three-pillar catalogue; repeated we/our; strong anti-agency and price messaging. | Direct founder accountability is sound. Equal emphasis on three specialist practices needs narrowing. |
| Customer | Small businesses, initially local relevance. | Brochure businesses, startups, SaaS, growing teams, sensitive-data organisations and nationwide clients. | North East focus is plausible, but geography alone is not a buying segment. |
| Homepage | Eleven sections in a prescribed order. | Closely follows that sequence, including repeated service/process/solo claims before detailed proof. | Question the sequence rather than merely restyling it. Every section needs a decision-making role. |
| Services | Web, AI/automation and cybersecurity. | Brochure sites through predictive analytics, infrastructure, compliance and breach response. | A coherent customer system can connect the disciplines; three equal practices are not established by the evidence. |
| Founder | Student, former tattoo artist and construction worker. | Homepage implies previous study and years of UK client delivery; About says current student and frames a shift into technology. | Use the fuller chronology supplied in V2, without inventing uninterrupted professional seniority. |
| Work | Three clearly labelled demonstrations, built after launch. | Typed data and cards label demos/in-development; detail template hardcodes Completed; no live demo URLs populated. | V2 is correct to require status consistency. Separate repositories may be further advanced; inspect them before changing claims. |
| Health Check | Browser-side HTML checks, category scores, optional lead capture, no server proxy. | CORS-constrained fetch, inaccurate heuristics, arbitrary scores and unsupported email promise. | The brief correctly challenges this. A server scanner is not automatically the best replacement. |
| Stack | Astro 5, React 18, Tailwind 4. | Installed Astro 5.18.2, React 18.3.1 and Tailwind 3.4.19. React also powers the mobile menu. | Keep Astro and static-first architecture. Version remediation is an engineering decision, not a reason for framework churn. |
| Content model | Architecture describes Markdown case studies and specialised layouts. | TypeScript work data, dynamic Astro routes and one BaseLayout; additional service copy is embedded in the route template. | Static typed data is appropriate. Fix duplication; do not introduce a database to match old documentation. |
| Performance | Static output, limited islands, optimised images and Web Vitals targets. | Static output is real; image optimisation is configured but not used by visible images; menu hydrates on all routes. | Retain the foundation and measure delivery. A build pass is not a performance result. |
| SEO | Canonicals, sitemap, social cards, local and case-study structured data. | Canonicals and generated sitemap work; organisation schema references a missing logo; other schema helpers are unused. | Correct emitted facts and actual URLs. More schema is not inherently better. |
| Accessibility | WCAG 2.2 AA target, labels, keyboard, focus and reduced motion. | Strong baseline semantics; hover contrast failure, mobile overflow, incomplete form feedback and motion/focus issues remain. | Keep the target; publish tested evidence and known limitations instead of blanket assurance. |
| Visual identity | Dark palette, steel blue, Inter, restrained components. | Dark/blue hero, glows/grid, coloured service accents, stock subject images, repeated cards and circles; Inter is named but not loaded. | The generic-pattern diagnosis is supported. Cinematic ambition remains a hypothesis, not the commercial objective. |
| Delivery operations | Netlify Forms, manual follow-up, minimal integrations. | Live contact form is registered; actual notification routing, visitor-report delivery, retention and support processes remain unverified. | Keep simple infrastructure; establish dependable operations before promising more. |

`PLAN.md` itself ends at its Component Architecture heading and contains escaped Markdown. Numerous code comments refer to later V1 plan sections that are not present in this checkout. Those comments are historical hints, not recoverable approved specifications.

## 3. Strongest assets worth preserving

1. **Static-first Astro architecture.** Fifteen pages build successfully without a database, authenticated application or custom URL-fetching backend. This is appropriate for the actual site.
2. **A small direct dependency surface and reusable implementation.** Shared layouts, explicit Tailwind class maps and typed service/project records reduce unnecessary duplication. All eleven shared Astro components are referenced.
3. **Honest foundations in the work model.** The status enum, optional results and demo URL, explicit Demo titles, empty testimonials and guarded live links are useful safeguards. The detail template violates the model; the model is not the problem.
4. **Real founder accountability.** Direct access to the person doing the work and prior client-facing business ownership can support a relevant, credible proposition.
5. **Navigable information architecture.** Services, Work, About and Contact are understandable top-level destinations. Footer links and the recovery route provide useful onward navigation.
6. **Accessibility basics already implemented.** Language declaration, skip link, a main landmark, one H1 per inspected route, native links/buttons, form labels, focus rings and reduced-motion CSS provide a worthwhile baseline.
7. **Working deployment fundamentals.** Public checks confirmed Netlify delivery, `www` to apex 301, HSTS, MIME-sniffing protection, framing/referrer/permissions headers and immutable caching on sampled generated CSS/JS.
8. **Real contact options.** The direct email route and live Netlify form registration are valuable. Keep them while correcting submission feedback and verifying actual receipt.
9. **A restrained identity starting point.** The TD mark, steel blue and generally legible system-font rendering are usable assets. Their existence does not mandate retaining every V1 composition or effect.

## 4. Weakest areas

The most damaging weakness is the gap between claims and observable evidence: C02/C03 and H02/H05/H09. The most commercially dangerous implementation is C01. The most consequential strategic weakness is H04: a solo company appears to offer several unrelated levels of specialist assurance to almost any business.

Next comes proof quality. A stock photograph and a future-tense description do not demonstrate an engineered website; a security-themed dashboard concept does not demonstrate security assessment competence. The site currently uses considerable space to explain why it is good and little space to make that quality independently inspectable.

Finally, repeated page structures and unfinished details weaken the claimed standard. V2 should first become more truthful, useful and dependable. A distinctive presentation can then amplify something worth believing.

## 5. Credibility risks

### Project facts and demonstrations: CRITICAL / HIGH

All three records in `src/data/work.ts` have `status: 'in-development'`, no `results`, and no `demoUrl`. Cards correctly show in-development and withhold live links. The detail page instead displays Completed and an identical timeline for every project. Its Results block simultaneously states that the project has not been built. This is a direct rendered contradiction, not merely ambiguous marketing.

The work index also refers to real outcomes, challenges faced and solid outcomes (`src/pages/work/index.astro:73-96`). North East Joinery mixes will feature with built. Demo disclosure is necessary but cannot legitimise unsupported completed-work language.

The two named standalone demo repositories remain outside this repository and were not moved or edited. This audit does not establish their current completion or deployment status. Reconcile actual code, working demos and dated evidence before updating site records. SiteGuard should not be used as proof of a security practice while it remains a planned dashboard concept.

The card alt descriptions call photographs and generic analytics imagery website/application/dashboard concepts. The case-study hero uses only the project title as alt text. Neither treatment accurately communicates what the image depicts. Actual screenshots and clearly stated limitations would provide stronger evidence; illustrative imagery must be labelled as such.

### Security assurances: CRITICAL

No vulnerabilities is an impossible general assurance. Penetration testing, incident response, recovery, security infrastructure and compliance engagements require specific competence, scope and operating arrangements. The repository does not substantiate that breadth. Academic study and a security-conscious build do not establish it.

Remove absolute guarantees irrespective of qualifications. Suspend unsupported specialist offers until Dave can provide an honest method, relevant evidence and delivery boundaries. Distinguish a bounded web configuration/code review from a penetration test, continuous monitoring, incident response or compliance assurance. Do not disguise the same broad service under the softer word review.

### Founder and operational assurance: HIGH

The homepage's years-of-UK-client-work statement needs evidence; the current student wording needs consistency; the chronology needs correction. Similarly, claims of NVDA/VoiceOver testing, disabled-user feedback, quarterly audits, retention periods and processor locations require records. Absence of such records here is a substantiation gap, not proof that no external work or testing occurred.

Remove public photo-coming-soon placeholders. A personal consultancy does not have to publish a portrait, but reserving a prominent square for unfinished content weakens trust.

## 6. Commercial and positioning problems

### Three disciplines, one business: coherent only with a customer rationale

Web engineering, automation and security can belong together around a practical system: a website explains the service and captures an enquiry; an integration routes information into a useful workflow; security-conscious engineering protects the handling and operation of that system. That is a coherent capability set.

The current site sells them as three broad specialisms. A business shopping for a brochure site is not making the same risk decision as a company buying incident response or predictive analytics. Separate service labels do not resolve these differences. Start with one clear commercial offer and carefully bounded adjacent work.

### Pricing and comparison: HIGH

The homepage says agencies charging GBP 5,000+ sell overhead rather than quality. The services page then gives Teesside Digital a 5k-50k+ range. This damages both the cheaper-solo argument and the premium-quality argument. There is no evidence here for either blanket competitor criticism or that range's commercial validation.

Pricing should follow a viable scope, support commitment, capacity and buyer value. Do not invent a replacement price in Phase 0. The customer needs a credible indication of project fit and how scope affects cost, not an adversarial comparison or an exceptionally wide unexplained range.

### Why choose Teesside Digital, with honest limits

| Alternative | Defensible reason to choose Dave | When the alternative may be better |
|---|---|---|
| Local agency | Direct continuity from discovery to implementation; personal accountability; relevant practical business understanding. | More concurrent capacity, specialist disciplines or continuity cover is required. |
| Another freelancer | Demonstrably better fit, inspectable work, clear communication and a relevant enquiry/workflow approach. | Another freelancer has stronger evidence or specialist fit. Solo status alone does not win. |
| Wix, Squarespace or a WordPress template | The customer needs help with content, a particular enquiry journey, integration or technical constraint that justifies additional work. | A straightforward managed site meets the need economically. Reuse is not inherently poor craft. |
| Shopify | Custom surrounding content or integration work can justify Dave's involvement. | Conventional commerce is better served by an established commerce platform. Do not rebuild checkout to demonstrate engineering. |
| AI website generator | Human discovery, editorial judgement, integration, verification and ongoing responsibility can add value beyond initial page generation. | A low-risk simple requirement is already adequately met. |
| Larger technology consultancy | A bounded problem fits Dave's demonstrated competence and available capacity. | Broad security assurance, complex infrastructure or regulated delivery needs exceed that scope. |
| Doing nothing | There is a specific, valuable problem with the current website or process. | The current system works and the improvement cannot justify its cost. Discovery should recognise this outcome. |

These are strategic fit arguments, not a surveyed ranking of current vendors or a claim that custom software is always superior.

### Solo capacity and free work: HIGH

Direct access also creates dependency on one person. Current study, holidays, response windows and support boundaries matter. A free review for every visitor may consume the same time needed for paid delivery. A high-quality review must have a scope, deliverable and capacity limit. Faster, cheaper and available for the long term should not be automatic promises.

## 7. UX problems

### Conversion and task completion

- **CRITICAL - false contact success (C01).** Confirmation appears before `fetch`, the button becomes Message Sent, HTTP status is ignored and network errors only reach the console. The local preview reproduced the positive receipt message without a functioning submission service. This demonstrates misleading feedback; live delivery rates remain unknown.
- **HIGH - the review journey changes meaning (H01/H03).** Free Website Review first means an instant automated check, then an emailed detailed report, then a personal follow-up. A failed cross-origin fetch does not offer a direct manual-review capture within the failure state. The most prominent conversion path depends on a technical operation customers cannot control.
- **MEDIUM - contact hero loops to itself.** Contact uses Hero's default Get Started link to `/contact` (`src/pages/contact.astro:33-37`; `Hero.astro:50-51`). It reloads the destination instead of advancing to the form. At a 900px-tall desktop viewport, the form starts around y=857, before its own substantial padding and labels.
- **MEDIUM - CTAs misdescribe their destinations.** Schedule Consultation opens a contact form, not scheduling. Urgent visitors are told to call, but there is no phone number. The final contact block says scroll up instead of providing a direct action (`contact.astro:44,177`).
- **MEDIUM - enquiry friction lacks a clear rationale.** Name, email and message are sensible essentials. Subject, budget and service interests add work; the broad catalogue makes self-classification difficult. Keep optional details only where they improve qualification. The form lacks explicit autocomplete tokens and disables textarea resizing.

### Accessibility and interaction

- **HIGH - primary CTA hover contrast (H07).** At 1440px, pointer interaction produced text and background both `rgb(110,147,181)`. A global `a:hover` rule defeats the primary link's text colour. This affects the shared primary anchor variant; the form's native submit button is a different case. Ordinary text requires appropriate contrast in interactive states too. See [WCAG contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
- **MEDIUM - narrow accessibility-page overflow.** At 320px, document scroll width was 344px. Long plain-text resource URLs in Standards & References overflow the 248px content column (`accessibility.astro:72-76`; corresponding `legal.ts` content). The other fourteen routes did not show document-level horizontal overflow in that sweep. Decorative offscreen hero shapes were clipped and were not counted as failures.
- **MEDIUM - mobile menu mixes disclosure and modal behaviour.** It opens, links are keyboard reachable, and Escape closes it and returns focus to the button. These behaviours worked at 375px. However, body scrolling is locked while the background remains focusable; there is no focus containment, despite a source comment claiming a Tab trap. Decide whether it is an ordinary disclosure or a modal interaction and implement that model consistently. A disclosure should not acquire a focus trap merely to satisfy a comment.
- **MEDIUM - mobile header requires JavaScript.** Its links are conditionally rendered after opening the React menu. Desktop links are hidden on mobile, so a failed/unavailable script removes the mobile header's navigation options; footer links remain. `client:load` also hydrates this menu on desktop where CSS hides it.
- **MEDIUM - validation feedback is incomplete.** In both health components, early custom validation sets an error without setting the status required to display it. Contact errors have alerts and `aria-invalid`, but lack associations through `aria-describedby` and do not move focus to a custom invalid field. Native required/email constraints still provide some validation; not every invalid submission is silent.
- **MEDIUM - result transitions need accessible state handling.** The Health Check scrolls to results without moving focus or announcing the result region. Successful report capture clears its email value before displaying the recipient and resets the entire report after two seconds. Users should control dismissal of useful results.
- **MEDIUM - reduced motion is incomplete.** Global CSS shortens animations and disables CSS smooth scrolling, but explicit JavaScript `scrollIntoView({ behavior: 'smooth' })` remains in the contact and diagnostic flows. A considered reduced-motion experience needs to include these calls.
- **LOW - redundant navigation landmarks and small controls.** Header/Navigation and the mobile menu nest navigation landmarks; footer navigation groups are unnamed. Some small secondary controls need target-size review in context. Do not declare every 20px icon a WCAG failure without considering the spacing exception.

## 8. Visual/design problems

The V2 brief's generic-pattern diagnosis is substantially supported by the implementation. The homepage uses a centred oversized headline, brand pill, dot grid, blurred blue washes, an endlessly bouncing arrow, familiar service cards and numbered process circles. The service images depict code, an AI chip and a glowing padlock; cyan, purple and green accent bars reinforce three familiar technology categories. These choices communicate modern technology more readily than particular judgement or craftsmanship.

The issue is the aggregate language, not that a card, a dark background or Inter is intrinsically wrong. A list of banned patterns is not a design strategy either. Changing the font and replacing cards with arbitrary asymmetry would leave the commercial problem unresolved.

| Rank | Observed problem | Consequence |
|---|---|---|
| HIGH | Project visuals are illustrative photography/generic analytics rather than software evidence. | Visitors cannot inspect the quality being sold; alt text overstates what is shown. |
| HIGH | Case-study descriptions overlay detailed photographs with insufficient visual separation, particularly on mobile. | At 320px the North East Joinery paragraph is visibly difficult to read. This needs image-specific contrast verification, not a blanket claim about all pixels. |
| MEDIUM | Only North East Joinery is featured, but the homepage reserves a three-column grid. | A single narrow project card leaves the desktop proof section looking unfinished. |
| MEDIUM | Reused tall heroes dominate About, Contact and service routes. | They delay the specific information/action a returning or high-intent visitor came to find. |
| MEDIUM | Repeated padding, centred sections, card shells and process grids flatten hierarchy. | Long pages offer limited evidence or decision value for the amount of scrolling. |
| MEDIUM | Founder photo placeholders occupy prominent areas. | Visible incompletion conflicts with precision and personal accountability. |
| MEDIUM | Fixed type scales and several nested containers need closer responsive treatment. | Text columns become narrow; the 768px breakpoint combines Tailwind desktop rules with component max-width overrides. |
| LOW | Inter is declared but not loaded; Google Fonts preconnects are unused. | The intended type identity is not reliably delivered, although the fallback is readable and avoids a font download. |
| LOW | Decorative continuous motion and broad transition-all rules lack a clear job. | Small costs and distractions accumulate without improving comprehension. |

Keep the expectation of deliberate typography, spacing, mobile composition and restrained motion. Do not choose a new visual territory, font family, palette or hero concept in Phase 0.

## 9. Engineering problems

### Health Check: limitations extend beyond CORS

**Recommendation: REPLACE the public product, REMOVE the current scoring model.** Retain only useful UI or parsing concepts if a later approved specification establishes a truthful purpose.

The tool performs a single browser fetch and analyses detached HTML. It does not execute the target application, measure its complete assets, test its interactive behaviour or inspect its backend. CORS requires appropriate server permission to read cross-origin responses; it is not a universal firewall preventing all requests. The absence of a user-controlled server fetch is why this repository has no server-side diagnostic proxy surface. See [MDN's CORS explanation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS).

| Claimed category | What the code actually checks | Important missing or inaccurate assessment |
|---|---|---|
| Performance | HTML byte count; simple script attributes; an image/alt heuristic. | No LCP, INP, CLS, asset transfer budget or real render timing. Detached `offsetHeight` cannot establish image size; module scripts are misclassified by the async/defer heuristic. |
| Accessibility | Title, main, H1 count, alt attribute presence and a narrow label lookup. | No colour contrast, keyboard use, focus, reflow, accessible interaction or actual alt quality. Wrapped labels and `aria-labelledby` are missed. |
| Security | A string match for HTTP references, explicit HTTP POST actions and unconditional advice. | No vulnerability assessment, actual response-header checks, TLS/certificate analysis, authentication or backend review. Ordinary HTTP navigation links can be called mixed content; alternate quoting and page scheme are not handled correctly. |
| SEO | Presence of description, OG title, JSON-LD, headings and viewport. | No assessment of the metadata's truth, schema validity, missing schema-logo asset, indexing, canonical consistency, rendered content or relevance. |

Scores start at 100 and subtract arbitrary severity deductions. A medium finding for unverified headers and a low-priority professional-audit suggestion give otherwise clean HTML security 85. The browser test of the actual local homepage returned overall 96 and Excellent with performance/accessibility/SEO all 100. This happened despite large original images and independently verified UI/metadata defects.

By direct calculation from the code, a page with otherwise clean checks and one critical unencrypted POST receives security 65 and overall 91, still Excellent. This is a code-derived example, not a live vulnerability test. An average must not bury a serious issue, and unavailable evidence must not be converted into a defect to support an upsell.

Additional **MEDIUM** implementation defects include lowercasing entire case-sensitive paths/query strings; permissive protocol validation; no timeout, cancellation, response-size or content-type bound; and interpolating fetched input IDs unescaped into a CSS selector. These are reasons not to preserve the engine merely because it runs locally.

The V2 options should be assessed commercially:

- A narrowly defined human website review request is the strongest initial hypothesis: useful, deliverable and inexpensive to maintain if capacity is controlled.
- A limited client-side demonstration can be honest if it operates on a known example or clearly labelled input and makes only verifiable claims.
- A server diagnostic is a separate product commitment. It would require strict URL/protocol restrictions, IPv4/IPv6/private and metadata address protection, DNS/redirect/rebinding controls, timeouts, response limits, rate limits and abuse handling. It still would not establish complete accessibility or security assurance. No proxy was implemented in this audit.

### Forms and actual deployment

Keep Netlify Forms as a plausible simple receiver. The public `/contact/` HTML contains the contact form and Netlify-injected `form-name` field. Its absence in the source is therefore **not** proof that the deployed contact form is unregistered. Actual notification settings, spam handling, successful receipt and Dave's follow-up process require an authorised end-to-end production test.

The Health Check report form is different: it is conditionally rendered only after analysis and has no matching static discovery form in the source/build or inspected live homepage. Netlify documents the static discovery requirement for JavaScript-rendered forms. Registration from older deployments or other account configuration remains unknown. See [Netlify form setup](https://docs.netlify.com/manage/forms/setup/).

The report POST includes email, URL, message and scores, but omits findings, recommendations, timestamp and disclaimer. No visitor email service is implemented here. A configured notification to Dave is not evidence that the visitor has received a detailed report. See [Netlify notifications](https://docs.netlify.com/manage/forms/notifications/). Replace the delivery promise and establish a real, tested flow before making it again.

The static contact receiver is not an authenticated business application. Do not claim that browser validation secures it or that the repository proves automatic CSRF-token protection. Treat input as untrusted at the receiving/processing boundary and verify abuse handling. No production forms were submitted in this audit.

### Images, JavaScript and performance architecture

The six principal service/work JPEGs total approximately **14.0 MB** of original files:

| Asset | Original dimensions | Bytes |
|---|---|---:|
| Web development service | 4000 x 6000 | 3,343,368 |
| AI/automation service | 3840 x 2400 | 905,611 |
| Cybersecurity service | 1536 x 1024 | 2,204,566 |
| North East Joinery | 6000 x 4000 | 4,706,160 |
| QuoteFlow | 2947 x 2121 | 673,162 |
| SiteGuard | 4810 x 3207 | 2,168,671 |

This is an asset inventory, not a claim that every page downloads all six immediately. Cards lazy-load images and reserve a fixed-height container, which helps. However, raw `public` image URLs have no responsive derivatives/srcset; case-study heroes eagerly use their original file. Configuring Sharp does not automatically transform these `<img>` references. See [Astro image guidance](https://docs.astro.build/en/guides/images/).

The production build reports a React client chunk of **136.51 kB / 44.01 kB gzip**, a Health Check chunk of **21.14 kB / 6.44 kB gzip**, and a mobile-menu chunk of **2.96 kB / 1.05 kB gzip**, plus smaller shared chunks. These are build artefact sizes, not total page transfer or measured responsiveness. `client:idle` loads the Health Check without requiring viewport visibility; `client:load` loads the menu everywhere. Review whether either justifies its runtime cost after the product decision. `prefetchAll` also needs a deliberate bandwidth rationale.

No Lighthouse score, real-user Web Vitals result, network-throttled performance result or universal accessibility conformance result was established. V1's own Health Check scores must not be used in their place. V2's targets remain targets: LCP <2.5s, CLS <0.1, INP <200ms, Lighthouse 90/95/95/95.

### Dependencies and verification: HIGH / MEDIUM

Installed direct versions were inspected: Astro 5.18.2, React/React DOM 18.3.1, Tailwind 3.4.19, `@astrojs/react` 4.4.2, `@astrojs/tailwind` 5.1.5, sitemap 3.7.4 and TypeScript 5.9.3. The runtime used for this audit was Node 24.14.1; Netlify's actual configured build runtime was not inspected.

The read-only npm audit reported affected entries for Astro (high), Sharp (high), esbuild (low) and the Tailwind integration (low via dependency). Advisory subjects include Astro rendering/XSS paths, a server error-page SSRF path, Sharp/libvips processing and a Windows development-server issue. The static output, absence of server islands and lack of an untrusted image-upload pipeline limit several reported attack paths. The `define:vars` contact form currently receives a fixed trusted form name, not user-supplied template content. Do not treat dependency labels as proof of reachable exploitation.

Nevertheless, security-sensitive positioning makes documented triage and a supported-version plan important. Do not run `npm audit fix --force` blindly: the tool proposes major changes and a Tailwind-integration version change that require compatibility review. Relevant reported advisories include [Astro define:vars](https://github.com/advisories/GHSA-j687-52p2-xcff), [Astro server error-page SSRF](https://github.com/advisories/GHSA-2pvr-wf23-7pc7), [Sharp/libvips](https://github.com/advisories/GHSA-f88m-g3jw-g9cj) and [esbuild on Windows](https://github.com/advisories/GHSA-g7r4-m6w7-qqqr). No packages were changed.

`.gitignore` excludes all common lockfiles, so the successful installed graph is not reproducibly pinned in version control. No automated test suite or CI workflow is present. `npm run build` passes; `npm run type-check` passes; `npm run lint` only prompts for the missing `@astrojs/check` dependency and does not produce diagnostics. Its process exit is not a lint pass. `tsc` does not check `.astro` templates, and Astro builds do not perform that type checking. See [Astro TypeScript documentation](https://docs.astro.build/en/guides/typescript/).

### SEO and structured data: MEDIUM

Keep generated static routes, sitemap integration, canonical metadata, social-card infrastructure and British locale. The build produced fourteen normal sitemap URLs and the separate 404 page; a scan of generated HTML found no missing local href/src targets. This scan does not validate URLs embedded inside JSON-LD.

The emitted organisation logo points to `/images/logo.svg`, which does not exist; the live URL returned 404. The correct assets live under `/images/logo/`. Schema also publishes a LinkedIn identity while the footer explicitly says that account is not set up. Remove or verify it. LocalBusiness, Service, BreadcrumbList and Article helpers exist but are not called by the corresponding pages. No case-study Completed status is emitted in schema; that false status is in the visible sidebar.

Many titles already append Teesside Digital and then receive a second suffix from `getPageTitle`. Case studies use the default social image and website type rather than their page-specific article inputs. Shared social imagery is present and usable, but does not make individual work inspectable. Static geographic mentions are useful context, not evidence of local search demand or rankings.

Live `/contact` returned 301 to `/contact/`, while source canonicals and `trailingSlash: 'never'` prefer no slash. Resolve the hosting/canonical policy consistently; this is not a broken page. The 404 template inherits index/follow metadata; use an explicit appropriate indexing policy and verify real missing-route responses during launch verification.

### Netlify, security configuration and maintenance: KEEP with targeted changes

Live checks confirmed HSTS `max-age=31536000`, the configured nosniff/framing/referrer/permissions headers, the `www` redirect and immutable year-long caching on sampled `/_astro/` CSS/JS. Do not report HSTS or asset caching as absent simply because the TOML's explicit directory example says `/assets/*`.

No CSP appeared in the inspected live headers or repository configuration. This is a defence-in-depth gap to assess around actual scripts and connections, not evidence of compromise. The homepage has a one-hour cache policy; contact uses revalidation. Verify intended policies across actual clean URLs instead of assuming `/*.html` describes every request.

Configuration contains no pinned Node engine; production/preview NODE_ENV settings and adapter assumptions need review before any eventual deployment change. Keep static hosting and avoid adding server infrastructure solely to look more sophisticated. Remove dead flags and obsolete configuration only when their consumers are confirmed: `FEATURE_FLAGS` currently do not control the displayed features.

## 10. Content problems

### Founder narrative

Use the supplied sequence, subject to Dave confirming the exact public wording:

| Period | Supplied background | What it may credibly establish |
|---|---|---|
| 2005-2007 | Early web development experience. | A genuine earlier connection with the web; not uninterrupted professional experience since 2005. |
| 2007-2010 | Construction. | Practical constraints, reliability and familiarity with owner-operated businesses. |
| 2010-2021 | Professional tattoo artistry and studio ownership. | Client interpretation, visual judgement, commercial responsibility and personal accountability. |
| 2022-present | Computer Science study, with AI/cybersecurity interests. | Current learning and technical development; not a completed qualification or professional security certification. |

The chronology should support a customer-relevant story, not become an elaborate justification for hiring someone. Specific decisions and work quality must carry the technical claims. Do not turn the background into construction/tattoo visual branding.

### Voice and claims

**MEDIUM:** Use I for Dave's work and communication, Teesside Digital for company-level statements, and we only for a genuinely shared action. The current mix of Our Work, Contact Us, How We Work and first-person About implies different operating models. A defined company we in policy is not necessarily a claim of a team, but clearer wording would reduce ambiguity.

Replace generic or unsupported phrases such as everything your business needs, complete digital transformation, expert/no junior developer, no excuses and no bloat with specific scope and evidence. The current bespoke/templates rhetoric also conflicts with V1's own instruction to avoid empty bespoke claims.

AI claims need particular care: automation works everywhere, it will not replace staff, and unspecified immediate savings are not defensible general promises (`services/[slug].astro:141-161`). Prefer deterministic automation when it meets the need. Any AI work requires explicit suitability, human review, failure behaviour, data handling and operating-cost assumptions.

**HIGH:** Privacy text both describes processor/log handling and claims collection only when supplied, no third-party sharing, no international companies and UK-based Netlify infrastructure. Verify the actual processors, contracts, locations/transfers and retention before rewriting; this is an operational/content audit, not a legal compliance certification. The terms page is generic website-use boilerplate despite being described as service terms. Separate website terms from actual engagement scope, payment, ownership and support arrangements; obtain appropriate review of the latter.

**LOW:** Correct British-English inconsistencies such as inquiries, Color Contrast and Use License. Remove public development-phase references. Preserve the user's plain-language and punctuation preferences over external style-guide preferences.

Service content is split between `src/data/services.ts`, hardcoded details/use cases/FAQs in `src/pages/services/[slug].astro`, and contact choices. Consolidate approved service facts later so future scope changes cannot leave old promises elsewhere. Legal content's newline-based paragraph splitting also renders list markers and resource URLs as plain text; semantic lists and usable links need consideration.

Root `README.md` duplicates the V2 documentation index rather than explaining setup. `.claude/instructions.md` still treats V1 PLAN as master. `ARCHITECTURE.md` contains inaccurate security explanations and aspirational files/components. Update these in a later authorised documentation pass; none were changed here.

## 11. Recommended initial target customer

**Initial hypothesis:** an established, owner-led service business in Teesside/the North East with a credible offline offer, an outdated or unclear website, considered purchases and an enquiry/quotation process that matters commercially.

Trades and home-improvement firms are the strongest initial niche to test, given Dave's practical background and the North East Joinery/QuoteFlow demonstration concepts. This is a recommendation derived from fit, not market research proving demand or willingness to pay. Do not make every local tradesperson the target: some need only a simple platform site, and others have no meaningful website problem.

Good-fit indicators are access to the decision-maker, a defined business problem, willingness to supply real content, manageable integrations, a viable project budget and realistic support needs. Initial poor fits include emergency breach response, broad compliance assurance, complex enterprise infrastructure, speculative high-risk products and projects whose ongoing requirements exceed solo capacity.

The problems worth buying help with are clarity and trust before contact, a usable enquiry route, more useful information arriving with enquiries, fewer missed handoffs and less repeated administration. Do not promise more leads or hours saved until there is a baseline and measured evidence. Validate this hypothesis through real prospect conversations and Dave's existing access to customers before treating it as a permanent specialism.

## 12. Recommended service positioning

| Role | Recommended scope | Evidence/boundary |
|---|---|---|
| Primary offer | Business websites and enquiry journeys, including justified improvements to an existing site. | Demonstrate content clarity, responsive execution, useful forms and reliable delivery. Choose the platform to fit the problem. |
| Adjacent offer | Focused integrations and workflow automation around enquiries, quotations and routine administration. | Start with one bounded workflow and observable acceptance criteria; AI is optional, not the product by default. |
| Embedded standard | Security-conscious web engineering, accessibility and performance. | Explain the actual controls/checks and their limits. These are engineering responsibilities, not universal guarantees. |
| Conditional specialist work | Bounded web configuration/code reviews and hardening only where competence and a repeatable method can be shown. | Written authorisation, clear exclusions, reporting and remediation boundaries. Do not imply penetration testing or compliance certification. |
| Remove from current advertised scope pending evidence | Broad penetration testing, incident response/recovery, ISO/compliance assurance, infrastructure security design and unsupported continuous protection. | Reintroduce only when actual capability, evidence and operating arrangements justify the expectation. |

Keep room to expand as experience and demand develop. Do not build a broad catalogue now merely because the technology interests belong to the founder.

## 13. Recommended primary conversion objective

**A qualified project enquiry sent directly to Dave, followed by a personal response and an appropriate next step.** A strategy-level CTA such as Discuss your project or Tell me what you need fits this objective. Final copy belongs to the later content phase.

Give high-intent prospects a direct route to describe the problem. Let less certain visitors inspect relevant work, understand fit and use direct email. Offer a clearly scoped human website review as a secondary route only if Dave can state what it includes, what it does not include and when he can deliver it. Do not force every visitor into a call or a technical score.

The success measure is an enquiry reliably received and suitable for the agreed offer, not a button click or the number of free scans. Initially record enquiry source, fit, response and progression with a simple process; add analytics only if it answers a defined question. No third-party analytics or tracking implementation is proposed in this phase.

Before promising a response window, agree capacity and working-day exceptions. Avoid a universal emergency-service expectation. A request acknowledgement must distinguish submission acceptance from an actual review or report being completed.

## 14. Recommended positioning statement

> Teesside Digital helps established service businesses in the North East build clearer, more useful websites and practical enquiry workflows. Clients work directly with Dave, combining hands-on business understanding with careful web engineering and security-conscious development.

Supporting strategic proposition:

> A useful website, a clearer route to enquiry and less unnecessary administration, designed and built with the person responsible for the work.

These are proposed positioning statements for review, not final homepage copy or guarantees of a commercial uplift. Precision engineering can remain a supporting principle if the work demonstrates it. It is too abstract to carry the entire proposition alone. Ongoing support should only enter the promise once its scope and availability are agreed.

## 15. KEEP / MODIFY / REPLACE / REMOVE matrix

Each row has one disposition for the named system. **KEEP** retains its role/foundation; **MODIFY** retains it with targeted correction; **REPLACE** changes the current approach; **REMOVE** eliminates it from the public proposition or implementation. These are recommendations, not changes made in Phase 0.

| Significant system | Decision | Rank | Why |
|---|---|---|---|
| Astro static output and file-based routing | KEEP | LOW | Appropriate for a small content/conversion website. |
| Netlify static hosting | KEEP | LOW | Working delivery foundation; no demonstrated reason to migrate. |
| TypeScript and typed static records | KEEP | LOW | Useful correctness/maintenance base without a runtime database. |
| Installed dependency/version policy | MODIFY | HIGH | Triage advisories, establish supported versions and reproducible installs. |
| Lockfile exclusion | REMOVE | MEDIUM | Prevents version-controlled reproducibility of the verified build. |
| Build/type/lint verification | MODIFY | MEDIUM | Add reliable Astro diagnostics and appropriate release checks later; current lint does not run. |
| BaseLayout and semantic page shell | MODIFY | MEDIUM | Keep structure, metadata, skip link and language; correct emitted facts and redundant head configuration. |
| Header/top-level destinations | MODIFY | MEDIUM | Keep understandable destinations; correct navigation semantics and intentional CTA placement. |
| React MobileMenu implementation | REPLACE | MEDIUM | Prefer dependable progressive enhancement; resolve focus/scroll model and unnecessary desktop hydration. |
| Footer | MODIFY | LOW | Keep email/navigation/legal access; label navigation groups and remove repeated/stale facts. |
| Hero composition/default behaviour | REPLACE | MEDIUM | Generic composition and inappropriate route-wide CTA defaults obstruct specific page tasks. |
| Section primitive | MODIFY | MEDIUM | Keep semantic spacing role; stop forcing repeated density and nested padding. |
| Button primitive | MODIFY | HIGH | Keep link/button distinction; repair hover contrast and review supported disabled-link semantics. |
| Card primitive | MODIFY | HIGH | Keep reusable shell where useful; fix media pipeline and content sizing. |
| ServiceCard presentation | REPLACE | MEDIUM | Equal technology panels and imagery reinforce the overly broad proposition. |
| ProjectCard status/live-link guard | KEEP | LOW | Correctly discloses status and avoids unsupported live links/nested anchors. |
| ProjectCard content/proof presentation | MODIFY | HIGH | Make image, description, link names and evidence appropriate to actual work. |
| TechnicalLabel/status component | MODIFY | LOW | Useful state text with colour as reinforcement; avoid excessive technical badges. |
| Global token approach | KEEP | LOW | Centralised design values are worth retaining independently of the final palette. |
| Current type/colour/spacing implementation | MODIFY | HIGH | Repair contrast/hover, actual font delivery and responsive rhythm. |
| TD mark and steel-blue brand equity | KEEP | LOW | A credible starting asset; Phase 0 does not mandate a replacement identity. |
| Three decorative service accent families | REMOVE | MEDIUM | Reinforce separate technology silos without a customer-centred reason. |
| Generic glows, dot grid and perpetual arrow | REMOVE | LOW | Current use adds generic technology atmosphere without meaningful explanatory value. |
| Motion and reduced-motion rules | MODIFY | MEDIUM | Preserve preference support; include JS scrolling and purposeful state feedback. |
| Public image pipeline | MODIFY | HIGH | Raw multi-megabyte originals undermine mobile performance architecture. |
| Stock project imagery as software proof | REPLACE | HIGH | Use actual inspected evidence or explicitly illustrative material. |
| Founder photo placeholders | REMOVE | MEDIUM | Visible incompletion is unnecessary. |
| Equal Web/AI/Cybersecurity selling proposition | REPLACE | HIGH | Focus on one buyer/problem, bounded adjacent capability and embedded quality. |
| Service data/template content split | MODIFY | MEDIUM | Consolidate approved facts to prevent contradictory scope. |
| Unsupported security guarantees/specialist offers | REMOVE | CRITICAL | Current assurance exceeds what can be substantiated; absolute guarantees are indefensible. |
| Founder story and experience wording | REPLACE | HIGH | Correct chronology and distinguish experience, study and qualification. |
| We/our operating voice | MODIFY | MEDIUM | Match the solo model and preserve genuinely shared uses. |
| Agency price attacks | REMOVE | HIGH | Unsupported comparisons contradict the site's own price range. |
| Pricing, process and support information | MODIFY | HIGH | Base promises on viable scope, capacity and agreed responsibilities. |
| Work data/status/results model | MODIFY | HIGH | Keep typed model; reconcile actual external demo evidence and distinguish planned from in-progress states. |
| Case-study detail template | MODIFY | CRITICAL | Render verified status/timeline, relevant proof links and truthful results. |
| Hardcoded Completed/timeline and unverified outcomes | REMOVE | CRITICAL | Direct contradiction of the available project facts. |
| Standalone North East Joinery/QuoteFlow repositories | KEEP | LOW | Appropriate separation; validate and link evidence without importing their source. |
| SiteGuard concept as public security evidence | REMOVE | HIGH | A planned dashboard cannot substantiate assessment or monitoring capability. |
| Empty testimonials rather than fabricated endorsements | KEEP | LOW | Honest absence is preferable to invented social proof. |
| Primary conversion hierarchy | REPLACE | HIGH | Qualified direct enquiry is more coherent than a universal automated score funnel. |
| Contact form receiver and direct email | KEEP | LOW | Viable infrastructure and fallback contact route. |
| Contact submission state handling | REPLACE | CRITICAL | Receipt must follow verified acceptance and failures need recovery. |
| Contact fields/validation/accessibility | MODIFY | MEDIUM | Keep essentials; improve associations, autofill, scope and feedback. |
| Website Health Check public product | REPLACE | HIGH | Current purpose/claims exceed reliable browser capability. |
| Percentage health scores and sales-based deductions | REMOVE | HIGH | Misleading assurance and ethically weak upselling. |
| Health report capture/delivery flow | REPLACE | HIGH | Registration, payload, delivery promise and state transitions need a coherent real service. |
| Existing URL/parser helpers | REPLACE | MEDIUM | If diagnostics survive, use a defined validation/check specification rather than patching misleading heuristics. |
| Canonical/sitemap/robots/social infrastructure | MODIFY | MEDIUM | Preserve generation; reconcile redirects, duplicate titles, images and indexing policy. |
| JSON-LD helpers and emitted organisation data | MODIFY | MEDIUM | Correct logo/identity and emit only useful, verified page-specific facts. |
| Security headers/caching configuration | MODIFY | MEDIUM | Preserve verified working headers/cache; assess CSP and document actual path behaviour. |
| Privacy content | REPLACE | HIGH | Rebuild from actual collection, processors, retention and operating facts. |
| Accessibility statement | MODIFY | HIGH | Distinguish target, dated testing evidence and known limitations. |
| Terms content | REPLACE | MEDIUM | Clarify website-use terms versus actual service engagement arrangements. |
| Legal routes/table-of-contents structure | MODIFY | MEDIUM | Keep access; fix semantic lists/links and narrow-screen wrapping. |
| 404 recovery page | MODIFY | LOW | Keep useful recovery links; set deliberate indexing and verify host responses. |
| Inert feature flags/unused preconnects and obsolete helpers | REMOVE | LOW | They imply behaviour or dependencies that are not real. |
| Repository operating documentation | MODIFY | LOW | Restore setup instructions, resolve stale V1 references and retain history clearly. |

## 16. Strategic recommendations for V2

1. **Make evidence and dependable enquiry handling the first constraints.** A visually refined site that misstates project status or loses enquiries is not premium work. The critical findings take priority over spectacle in any later authorised implementation.
2. **Choose a buyer and practical problem before choosing a visual identity.** Validate the proposed owner-led service-business niche, viable engagement size and access to prospects. Keep the hypothesis revisable.
3. **Lead with web outcomes; narrow automation; embed security.** Distinguish engineering standards from separate specialist assurance. Growth in scope should follow evidence and demand.
4. **Make actual work inspectable.** Reconcile the standalone demos, show their real state and limitations, and explain meaningful decisions. A demonstration can prove craft and technical reasoning; it cannot prove client revenue or operational results.
5. **Make direct contact the commercial spine.** Preserve email and a dependable enquiry route. Define any free-review offer before designing around it.
6. **Treat the own site as evidence, with limits.** Its responsiveness, accessibility, interaction quality and delivery discipline can demonstrate care. It cannot establish client results or an enterprise cybersecurity track record.
7. **Challenge cinematic and studio-quality language.** The brief's GBP 20k studio-quality aspiration is an internal quality bar, not a project price, buyer need or reason to add effects. Composition and motion must improve understanding or state feedback. Restraint may be the stronger commercial decision.
8. **Avoid replacing one template with another fashionable pattern.** Distinctiveness should come from a clear proposition, relevant proof and coherent decisions. The Phase 1 task should compare genuinely different territories only after this audit is reviewed.
9. **Preserve technical restraint.** Retain Astro, static delivery and simple content data. Do not add a database, CMS, scanner, analytics suite or framework migration without a concrete requirement. Address dependency support separately from aesthetic redesign.
10. **Define operational truth.** Agree what Dave delivers personally, what support means, response capacity, who processes enquiry data and what testing has actually occurred. A solo model needs clarity about continuity as well as direct access.

The master brief is strongest on truth, sequential work and restraint. It is weakest where its desired founder narrative, three-discipline structure and cinematic aspiration could become predetermined answers before customer evidence. Those should remain open to challenge.

## 17. Open questions or decisions required before Phase 1

These are review decisions, not requests to begin implementation.

| Decision | Information or choice needed | What it constrains |
|---|---|---|
| Initial customer | Accept or revise the established owner-led service-business hypothesis; identify reachable prospects and their actual website/workflow problems. | Positioning, proof selection and creative relevance. |
| Commercial viability | Dave's minimum viable engagement, realistic budgets, available delivery hours and support capacity. | Scope, price communication and promises. No replacement price range is assumed. |
| Service boundaries | Which web/automation services can Dave demonstrate now? What exact security work, if any, is presently defensible? | Service architecture, risk expectations and copy. |
| Founder facts | Confirm dates, studio ownership wording, current degree status and real commercial work that can be cited. | Biography and credibility without invented seniority. |
| Demo evidence | Inspect current North East Joinery and QuoteFlow repositories/deployments; agree live versus in-progress labels, actual features, assets and measured results. | Work presentation and what V2 can truthfully claim. |
| SiteGuard | Remove from public proof, retain only as an explicitly planned concept, or later substantiate an actual demonstration? Recommendation: remove from current public proof. | Whether a third project should influence the experience at all. |
| Conversion objective | Approve direct qualified enquiry as primary; decide whether a human review is a useful secondary offer. | CTA hierarchy and user journey. |
| Health Check | Accept replacement/removal of current scores; choose whether V2 needs any interactive showcase. A server scanner is not assumed. | Product scope, technical costs and future design constraints. |
| Brand ambition | Agree that clarity, credibility, accessibility and speed outrank cinematic effects and the appearance of expense. | Fair criteria for Phase 1's eventual creative comparison. |
| Operational assurance | Establish actual contact receipt/notifications, review delivery, processors, retention, response commitments and accessibility-test records. | Which public assurances can be retained. Detailed validation may continue later, but unverified claims must not become creative premises. |
| Technical baseline | Agree that the framework foundation remains, while advisories, lockfiles, Astro diagnostics and identified defects require later scoped remediation. | Responsible engineering planning without premature implementation. |
| Evidence threshold | Agree how measured claims are recorded: date, environment, method, actual result and limitations. | Project metrics, performance claims, accessibility statement and security wording. |

### Phase boundary

This audit recommends strategy and dispositions only. It does not select a creative territory, design a new interface, write a full content system or authorise implementation. Review the conclusions and resolve the decisions that affect Phase 1 before instructing the next phase.

## Appendix A. Complete public-route review

Every source route, shared layout/component and data source was inspected. All fifteen generated pages were opened in the local production preview at **320px and 1440px**. Main headings/structure, route rendering and image failure checks were collected. Representative screenshots and interaction checks supplemented the source/DOM review; this was not a screenshot comparison of every section at every breakpoint.

| Route | Observed purpose/implementation | Principal assessment |
|---|---|---|
| `/` | Eleven-section V1 sequence, three service cards, Health Check, solo/process sections, one featured project and founder block. | Broad positioning; unreliable review funnel; hover failure; sparse proof; placeholders and conflicting biography. |
| `/about` | Shared tall Hero, availability label, story, capabilities, process and solo advantages. | Useful personal route; chronology incomplete; current student wording conflicts with homepage; placeholder portrait. |
| `/contact` | Shared Hero and static Netlify form, direct email, FAQs and final CTA. | Registered live receiver; self-linking hero, delayed form and false-success enhancement. |
| `/services` | Three cards, cross-service selling, promises, price range and process. | Broad offer, absolute security promise and pricing contradiction. |
| `/services/web-development` | Shared dynamic service template with included items, use cases, approach and FAQs. | Credible core subject; scope spans too many project types; generic proof and migration/ranking assurances need qualification. |
| `/services/ai-automation` | Same template; chatbots, integration, workflow and ROI language. | Narrow to practical workflow needs; remove universal suitability/staffing/savings assertions. |
| `/services/cybersecurity` | Same template; audits, hardening, compliance and incident promises. | Highest capability/assurance risk; rewrite around evidenced scope before public reuse. |
| `/work` | Three demo cards, methodology, target-project types and benefits of sharing work. | Labels help, but real-outcome language contradicts planned evidence and broadens the buyer again. |
| `/work/northeast-joinery` | Image-overlay hero; challenge, approach, empty-results notice and sidebar. | In-development/unbuilt versus Completed contradiction; stock photo instead of website proof; 4.71 MB original image. |
| `/work/quoteflow` | Same detail template using quote-tool concept data. | Same status/timeline contradiction; generic analytics image; planned AI claims require actual build evidence. |
| `/work/siteguard` | Same detail template using planned security dashboard data. | Same contradiction; dashboard concept cannot substantiate security practice. |
| `/privacy` | Legal data rendered as paragraphs with a contents list. | Processor/collection/retention claims require correction and verification. |
| `/accessibility` | Commitment, testing, limitations, feedback and references. | Unsupported testing assurances; raw reference URLs cause 320px horizontal overflow. |
| `/terms` | Generic use licence/disclaimer terms with contents navigation. | Website-use boilerplate does not explain actual service engagement terms. |
| `/404` / generated `/404.html` | Recovery message and links to main destinations. | Useful baseline; explicitly verify indexing/host status during launch work. |

All inspected routes had one H1. The generated href/src target scan found no missing local targets; the JSON-LD logo is a separate confirmed missing URL. No source for additional public API routes, server functions, content collections or authenticated areas exists in this repository. `robots.txt`, generated sitemap files, favicons, logos and social assets were included in the inventory.

## Appendix B. Validation record and limits

| Check | Result and limit |
|---|---|
| Git baseline | `redesign/v2`, commit recorded above, initially clean working tree. `main` and `v1.0` references exist. Their presence does not establish that the current live deploy equals this commit. |
| Repository scope | All tracked source/configuration/docs and public asset inventory inspected across the audit. Installed/generated directories were inspected for runtime/build evidence, not treated as authored application source. No secret-value dump or Git-history security scan was performed. |
| Production build | PASS: fifteen pages built to a temporary folder outside the project. No production source was edited. |
| TypeScript | PASS: `npm run type-check`; limited to its actual coverage. |
| Astro diagnostics | NOT RUN TO COMPLETION: `npm run lint` requires missing `@astrojs/check`. Installation was not accepted. |
| Dependencies | `npm ls --depth=0` inspected; `npm audit --json` returned four affected package entries. No updates/fixes installed. Applicability and supported remediation remain open. |
| Route rendering | Fifteen pages at 320px and 1440px, with one H1 and no broken-image indicator in the collected snapshots. This does not prove every image decoded immediately or every interaction is correct. |
| Additional responsive checks | Home, Contact and Accessibility at 375, 390, 430, 768, 1024, 1280 and 1920px. No document horizontal overflow in those checks. Homepage also inspected at 812 x 375 landscape. |
| Narrow-screen finding | Accessibility route: 344px scroll width at 320px viewport from unbroken reference URLs. Case-study image-overlay text visibly weak at 320px. |
| Keyboard/mobile | Menu opening, first-link Tab access, Escape closing and focus return verified at 375px. Background-focus/scroll-lock mismatch and no-JS fallback assessed from source. No full NVDA/VoiceOver session performed. |
| Hover | Primary homepage CTA computed foreground/background both `#6e93b5` under actual hover, reproduced visually. |
| Health Check | Local same-origin homepage test returned overall 96, performance/accessibility/SEO 100, security 85 and Excellent. These are the tool's outputs, not audit scores. Failure UI and underlying fetch/validation paths were inspected. |
| Contact | Local-only dummy submission showed Message Sent and receipt acknowledgement on the static preview. No live enquiry/report submitted; live notification delivery remains unverified. |
| Console | Sampled local preview console logs returned no captured errors/warnings. This is not an exhaustive cross-browser console certification. |
| Live HTTP | Homepage/contact 200 after redirects; `www` 301 to apex; `/contact` 301 to `/contact/`; missing schema logo 404; HSTS and configured baseline headers present; no CSP observed. |
| Live forms/cache | Contact HTML contains Netlify-injected registration; report form absent from inspected initial homepage HTML. Sampled generated CSS/JS have immutable year-long caching. No dashboard settings inspected. |
| Performance/conformance | No Lighthouse, field Web Vitals, throttled-device benchmark or comprehensive WCAG conformance test performed. Do not infer a pass from static architecture, build success or Health Check scores. |
| External demo evidence | Separate demo repositories/deployments not audited here. Their current facts must be reconciled before changes to public status or outcomes. |
| Changed project files | This audit document only. No redesign, UI creation, style change, dependency change, deployment or Phase 1 output. |

External technical references were used to validate specific platform behaviour, not to substitute for inspecting this implementation. Web Interface Guidelines and the available forms/accessibility guidance informed the review; the user's Phase 0 scope, British-English voice and project instructions take precedence over generic style preferences.
