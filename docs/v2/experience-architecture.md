# Teesside Digital V2 - Experience Architecture

Date: 8 September 2026

**Status: APPROVED Phase 3 experience architecture, including Dave's final clarifications and the hard Work publication evidence gate.**

Branch confirmed: `redesign/v2`.

## Authority and scope

The eleven required documents, including this experience architecture, have been read completely during this continuing phase-by-phase task: `V2_MASTER_BRIEF.md`, `AGENTS.md`, `docs/v2/README.md`, `docs/v2/phase-0-audit.md`, `docs/v2/phase-0-decisions.md`, `docs/v2/creative-direction-options.md`, `docs/v2/creative-direction.md`, `docs/v2/content-system.md`, `docs/v2/experience-architecture.md`, `ARCHITECTURE.md` and `PLAN.md`. The source documents were checked against the preceding task and were unchanged before this approval update. Dave has approved the Phase 3 recommendations subject to the clarifications recorded here. Exact migration responses remain deferred; approval of the Work routes does not establish readiness to publish evidence.

The latest instruction governs this phase. `phase-0-decisions.md` supplies approved strategic truth, `creative-direction.md` supplies the approved Open Edition direction, and `content-system.md` supplies the approved communication system. The audit and creative options explain earlier reasoning; they do not override those decisions. V1's architecture and plan remain historical context. In particular, the audit's narrower sector recommendation and V1's broad cybersecurity service do not return here.

The current route inventory, navigation constants, Header, Navigation and project data were inspected alongside the implementation evidence in Phase 0. V1 has separate service and project routes, navigation defined in `src/config/constants.ts`, and project data whose presentation requires correction. There is no implemented `src/config/navigation.ts` despite its appearance in the historical architecture. The architecture below concerns the actual route structure, not an assumed implementation of that plan. External demonstration repositories were not newly audited in this phase; their approved status is context, while publication of specific evidence remains conditional on inspection.

Status vocabulary:

- **APPROVED CONTEXT:** Existing strategy, content rules or creative principles that this phase must preserve.
- **APPROVED ARCHITECTURE:** The routes, navigation hierarchy, homepage responsibilities, page outlines, ownership rules and structural principles accepted by Dave. These govern later work, subject to the publication gate and explicit deferred details.
- **PROVISIONAL:** A detail or content dependency needing later verification within the approved model. It is not a licence to publish a placeholder. In particular, a proposed item of project evidence must be inspected before use.
- **DEFERRED:** Work outside Phase 3, including final hero design/copy, typography, colour tokens, complete production copy, detailed motion, technical implementation and launch verification. Exact 301 redirect, 404 and 410 Gone migration behaviour requires later review of actual URLs, inbound links, content equivalence, canonical behaviour, sitemap state and user recovery.

No page outline is final production copy. Familiar labels and CTA wording reuse the approved content system. This document neither designs a final hero nor selects one of its candidate headlines.

Dave's approval resolves the architectural choices in this document. Comparisons of alternative models are retained as decision rationale, not unresolved launch options. The hard evidence gate remains a publication condition, and all explicitly provisional or deferred details retain that status. Phase 4 and implementation are not authorised by this approval update.

## 1. Architectural principles

**APPROVED CONTEXT:** Teesside Digital serves small and owner-led businesses across sectors, starting in Teesside, then the wider North East and suitable UK projects. All three services remain available. A qualified project enquiry directly to Dave is primary; the initially free manual website review is secondary.

**APPROVED structural rules:**

| Rule | Architectural consequence |
|---|---|
| Clarity before novelty | Use Services, Work, About and Contact vocabulary. Distinctive placement must not require unfamiliar destination names. |
| One clear purpose per route | Separate an offer explanation, an evidence record and a form task where their depth or expectations justify it. Do not create pages to imply scale. |
| Enquiry stays reachable | Provide a global route to Contact and contextual invitations after useful information. No compulsory review, call, quiz or portfolio tour. |
| Review stays secondary | Explain the free review where an existing website is the subject. Do not give it equal prominence beside every enquiry action. |
| Real evidence before portfolio volume | One useful demonstration can have a clear index entry and a substantial detail record. Empty categories and coming-soon projects cannot substitute for evidence. |
| One primary owner for detailed content | Home introduces and links; Services explains scope; project detail owns evidence; About owns chronology; each form route owns its expectations. |
| Utility pages prioritise their task | Contact, review and policy routes start with relevant instructions, not an inherited promotional hero. |
| Navigation and reading have different jobs | The side index is global orientation. Any local contents links describe the current page, not another competing global menu. |
| Structure survives little content | A single project and a short service explanation must still look intentional. No fixed number of portfolio slots or mandatory testimonials. |
| Explanation travels with evidence | Keep status, subject, claim and material limitation together on every screen size and reused excerpt. |
| Growth follows a real information need | Add a route when it answers a distinct visitor question with sufficient maintained content, not when a new idea or search phrase appears. |

Open Edition affects relationships: a stable side index, compact reading groups, unequal emphasis, and evidence beside its explanation. It does not turn Home into a publication cover, Work into an archive of imaginary editions, or About into an author's CV. Variation in information density is useful; arbitrarily different page structures are not a goal.

The information sequence must work as an ordinary readable document. Motion is unnecessary to reveal the offer or establish the route to enquiry. Detailed layout may be asymmetric; source and keyboard order must remain coherent.

## 2. Approved sitemap

**APPROVED ARCHITECTURE:** Ten ordinary content/task routes, plus a not-found recovery template, with both the Work index and North East Joinery detail route subject to the hard publication evidence gate. This is a target launch architecture, not a claim that all launch content is ready. Do not publish any page with unmet truth or operating dependencies simply to match the route count.

Route notation below uses trailing slashes for ordinary pages, aligning with the host behaviour observed in Phase 0. Root remains `/`. Exact redirect/retirement responses, host rules and canonical consistency are **DEFERRED** to migration review and implementation verification; the notation does not approve a particular 301, 404 or 410 rule. No redirect or configuration is changed here. Fragment links are sections of a page, not separate routes.

| Route | Public label | Purpose and audience question | Conversion role | Content dependency | Required at launch? | Navigation placement |
|---|---|---|---|---|---|---|
| `/` | Home, through the brand link | Establish relevance: what does this business do and is it for me? | Primary enquiry; introduce secondary review | Approved proposition, three service names, local/accountability facts, eligible evidence excerpt | Yes | Primary, through clearly named brand/Home link |
| `/services/` | Services | Explain the three areas and their boundaries: what kind of help fits my task? | Primary enquiry with contextual service links | Distinct service explanations, examples, limits, shared scope/pricing process | Yes | Primary |
| `/work/` | Work | Orient visitors to available proof: what can I inspect and what does it establish? | Evidence exploration leading to enquiry | At least one useful inspectable evidence entry; truthful type/status | Conditional on hard evidence gate below | Primary only when published |
| `/work/northeast-joinery/` | North East Joinery | Explain one demonstration: what exists, why was it built this way and what remains unfinished? | Confidence through evidence, then contextual enquiry | Actual screenshot/behaviour and explanation verified against the separate project; visible limitations | Conditional on hard evidence gate below | Secondary, from Work and relevant excerpts only when published; not global navigation |
| `/about/` | About | Establish the business and responsible person: who is Dave and what experience is relevant? | Trust supporting primary enquiry | Approved chronology, ongoing degree wording, direct-delivery facts | Yes | Primary |
| `/contact/` | Contact; action label Discuss your project | Receive a useful description: how do I approach Dave without a technical brief? | Primary enquiry task | Form instructions, privacy facts, verified receiving/failure behaviour, direct email | Yes | Primary action; Contact also in footer |
| `/website-review/` | Free website review | Explain and request the bounded offer: can Dave help me understand my existing website? | Secondary conversion task | Approved free scope/exclusions, manual fulfilment, no guaranteed turnaround, working receiver | Yes while offer is available; retain explanatory route if paused | Secondary global link and contextual links; footer |
| `/privacy/` | Privacy | Explain actual handling of personal information | Informed form use and trust, not a sales funnel | Verified processing, providers, retention and contact facts | Yes | Footer and near relevant forms |
| `/accessibility/` | Accessibility | Explain target, known barriers and reporting route | Help and accountability | Accurate target, actual testing/limitations when available, usable feedback route | Yes | Footer; contextual help where relevant |
| `/terms/` | Terms | Explain applicable website-use terms and their limits | Clarify expectations | Verified website-use content, clearly separate from project agreements | Retain and rewrite for launch | Footer only |
| Missing URL handled by 404 template | Page not found | Recover from an unavailable destination | Return to a useful route; contact if needed | Working recovery links and genuine not-found response | Yes as system behaviour, not a browsable content destination | None; reached through an invalid URL |

The approved Terms architecture retains an existing useful destination. It is not a claim that a particular legal page is universally mandatory or that website-use terms form the client contract. Legal content must reflect actual arrangements.

**Service destinations inside `/services/`:**

| Fragment | Public service name | Role |
|---|---|---|
| `#websites-web-development` | Websites & Web Development | Direct access to website scope and suitability |
| `#apps-digital-tools` | Apps & Digital Tools | Direct access to tools, apps and the existing-product question |
| `#automation-ai` | Automation & AI | Direct access to repetitive-work scope and rules-before-AI judgement |

**Not part of the approved launch architecture:** individual service routes, a separate enquiry route, Approach, Standards, Pricing, Testimonials, sectors, towns, a blog, QuoteFlow or SiteGuard. Their relevant current information has an owner elsewhere. `hero-spec.md` and other phase documents are not public content routes.

## 3. Service page decision

**APPROVED ARCHITECTURE: A - one substantive Services page with three directly linkable sections.** This is a consolidation of explanation, not a reduction of the approved service offer.

Do not create separate service pages at launch. All three services must remain clearly distinct and individually reachable through the fragment links in section 2. The alternatives below record the reasoning behind the approved choice.

| Criterion | A. One Services page | B. Overview plus three detail pages | C. Three detail destinations without an overview |
|---|---|---|---|
| Visitor clarity | Compares the three areas in one place; needs clear section entry points | Clear overview can route people, but introduces another reading step | Good for someone already certain of the service; weak for uncertainty between categories |
| Local small-business audience | Supports problem-first browsing without technical self-classification | Can support deeper decisions if each page contains distinct useful detail | Risks asking owners to choose a technical category before understanding it |
| Discoverability | One broad document with explicit subjects and meaningful headings; no separate service-page metadata | Separate page intent can support relevant discovery if the content deserves separate pages | Distinct intent, but loses a natural comparison destination |
| Content depth now | Enough room for the Phase 2 scope, examples and boundaries without forcing repetition | Four pages invite duplicated introductions, standards, process and contact sections at present | Three pages still need distinct depth; cross-service context must be repeated or linked awkwardly |
| Maintainability | One owner for scope and shared expectations | More pages and opportunities for contradictory claims | Fewer pages than B, but repeated shared explanations remain a risk |
| Side index | One Services item; child links belong to local contents | One global parent with contextual child navigation | Three long service labels or a new grouping mechanism are needed globally |
| Future expansion | Move a substantial section to a dedicated route when justified; preserve links | Already provides room for deep service-specific proof | Scales within each service, but an overview may become necessary later |
| Thin/repetitive-page risk | Lowest, provided the page is edited rather than encyclopaedic | Highest with current evidence and offer depth | Moderate to high without distinctive material for all three |

All three areas need visible explanation at launch. They do not each need a URL to be taken seriously. The Phase 2 content already supplies useful distinctions: the customer task, appropriate work, limits, intended benefits and relevant engineering responsibilities. Put those distinctions in the Services page and keep shared material shared.

Each service section should answer: which situations fit; what help might involve; when an existing system or a smaller change is enough; what is outside the offer; what evidence actually exists; and how to discuss the problem. Technical detail follows the business explanation. Do not add the same generic process and standards essay three times.

The disadvantage of A is real: all three services share one page title and description, and a long page can bury later services. Counter that with a visible local directory, descriptive section headings, direct fragment links from Home and concise content. Do not pretend fragments provide three independently authored search documents. If the page requires excessive scrolling to compare scope, edit or reconsider separation rather than adding a complicated tab interface.

**Future split trigger:** A service gains distinct buyer questions, substantive unique content, relevant evidence and enough scope depth to justify a standalone page without duplication. Then evaluate a detail route, retaining Services as the comparison page. A new keyword or a desire for a larger sitemap is insufficient. Final service URL choices for that future expansion are deferred.

## 4. Work / portfolio architecture

**APPROVED ARCHITECTURE:** Use `/work/` as a compact evidence index and `/work/northeast-joinery/` as its detail route, subject to the hard publication evidence gate. The two pages have different jobs: the index explains what is available to inspect; the detail lets someone assess a specific decision without overwhelming Home or Services.

One project does not require three columns, category filters, project counts, archive navigation or a long introduction about a portfolio. A short Work page can contain one well-described entry. It must not reproduce the full case study merely to fill space. Do not call the collection client successes when it currently contains demonstration work.

### Hard publication evidence gate - approved launch condition

**APPROVED LAUNCH CONDITION:** Neither the Work index nor the North East Joinery detail page may be published merely because its route exists. The approved fact that North East Joinery is built does not establish which individual feature is suitable proof. Before launch publication, inspect its current implementation and establish enough truthful, useful, inspectable substance to justify the visitor's time. The minimum is:

- A real, relevant screen or behaviour, identifiable as the current demonstration rather than stock subject imagery.
- One useful design or engineering decision and an explanation that matches what can be inspected.
- Visible project type and status: demonstration in progress, built with substantial work remaining.
- Material limitations, including those affecting the illustrated behaviour.
- A detail page with real substance, including the evidence, decision, reason, status and meaningful limits above. External live/source links are optional and require verification.

This does not require pretending the whole demonstration is polished. It requires enough substance to justify the visitor's time. A screenshot can support a visual decision; it cannot alone prove delivery, keyboard behaviour, performance or business outcomes.

If this gate is not met when V2 is otherwise ready to launch, withhold Work from public navigation, withhold the North East Joinery detail from normal discovery and omit the homepage evidence region cleanly. Do not publish an empty index or a detail page with weak proof merely to fill the architecture. Remove ineligible entries from contextual links, footer discovery and the published sitemap as well. Keep the rest of the website useful and complete; the approved Work architecture remains valid for later publication once the evidence qualifies. Do not add coming-soon cards, invent work or results, fabricate screenshots/behaviours, or imply completed client work. Exact handling of existing URLs remains deferred under section 21.

### Detail record architecture

| Information group | Responsibility | Omit or qualify when |
|---|---|---|
| Identity and state | Name, project type, current status and a concise material limitation before any evidence | Never hide demonstration status; separate deployment from completion |
| Context | Explain the purpose of this demonstration and the task it explores | There is no real commissioned brief; do not invent a client's problem |
| What exists | Identify actual implemented scope, not the full roadmap | Planned features must not sit in the implemented list |
| Evidence and decision | Pair a real screen/behaviour with the reason for a choice and what it demonstrates | No supported claim exists; omit the unit rather than add decorative annotation |
| Limits and next state | Explain meaningful unfinished work and intended development direction | Avoid promised completion dates and a public backlog of every minor task |
| Relevant technical detail | Explain technology only where it clarifies a decision or trade-off | Technology tags add no understanding or imply unsupported expertise |
| Verification and links | Record method/date/environment for measured claims; verified live/source links where useful | No measurement was made or a destination is not usable |
| Related task and contact | Link to the relevant service section and a project enquiry | Do not imply the visitor must buy the demonstration's exact solution |

Use only the groups supported by real information. There is no mandatory Results region when there are no measured results, no default duration and no hardcoded Completed status. Every excerpt carries the same type/status facts as the detail record.

**QuoteFlow:** Keep off current public proof. Add it through the same index/detail relationship only after a meaningful task can be inspected, its behaviour and limitations are documented, and any AI claim is supported. It may enter as a demonstration in progress; it need not masquerade as completed client software.

**Teesside Digital V2:** May later gain an internal-project detail record after implementation supplies real evidence. Explain selected decisions, dated checks and limitations. Do not publish this planning document as proof that the implemented site meets its targets.

**Future client work:** Add ordinary entries using truthful client-project status and agreed disclosure. A real outcome belongs beside its source and context. The same reading/evidence grammar accommodates demonstrations, internal work and client work without inventing separate thin categories.

## 5. Homepage experience architecture

**APPROVED homepage responsibility sequence:** compact offer and service entry points -> selected evidence with explanation -> problem and scope orientation -> direct responsibility and working expectations -> enquiry invitation with a quieter review alternative.

These are content responsibilities, not five mandatory full-width sections or a hero specification. Related content may share an editorial spread during later design. No region is assigned a viewport height, final headline, typeface, token or decorative visual.

### H1. Offer and service entry points

- **Purpose:** Establish the business, audience, useful service scope and access to enquiry immediately.
- **Visitor question:** What does Teesside Digital do, and could this be relevant to my business?
- **Content type:** Compact proposition direction, all three exact service names linked to their Services sections, brief problem relevance, a short Teesside/local cue and direct accountability cue.
- **Proof needed:** Approved business and operating facts. A prominent hero image is not a dependency. No metric or seniority claim.
- **CTA role:** Primary enquiry is directly reachable through the index/entry context. Service links offer exploration. Do not force two equally prominent promotional actions beneath a headline.
- **Open Edition relationship:** Service-led opening within the side-index reading structure. Compact means useful, not cramped or artificially restricted to one screen.
- **Launch:** Essential. Final headline, hero composition and detailed positioning remain Phase 4 work.

### H2. Selected evidence and explanation

- **Purpose:** Let visitors assess something concrete early, after understanding the offer.
- **Visitor question:** What can I actually inspect, and what does it show?
- **Content type:** One eligible project extract, visible demonstration/internal status, one decision explanation and a material limitation; link to the detail record.
- **Proof needed:** The Work evidence gate. North East Joinery's subject photography and planned features are not substitutes.
- **CTA role:** Tertiary evidence exploration; no need for another enquiry button inside every evidence unit.
- **Open Edition relationship:** Evidence beside explanation on suitable screens; a useful extract followed immediately by its explanation on smaller screens. Scale follows inspectability.
- **Launch:** Conditional on eligible material. The duty to be honest is essential; an empty proof region is not. If omitted, move directly to H3 without a placeholder.

### H3. Problem and scope orientation

- **Purpose:** Connect recognisable difficulties to possible help while allowing the answer to be a smaller change or existing product.
- **Visitor question:** Do I need a website, a tool, automation, or simply a clearer process?
- **Content type:** A small edited set of problem-to-response explanations spanning the approved offer, with relevant Services links. No claim that every visitor has these problems.
- **Proof needed:** Examples must be labelled as possibilities unless actually demonstrated. Do not imply QuoteFlow supplies current proof for tools.
- **CTA role:** Contextual service exploration; a direct enquiry route for someone still unsure. Website review is mentioned only when the existing-site question makes it relevant.
- **Open Edition relationship:** Compact unboxed reading groups with unequal depth according to the explanation, not three equally sized capability cards or a task-map graphic.
- **Launch:** Essential, but concise. Services owns detailed inclusions, exclusions and suitability.

### H4. Responsibility and working expectations

- **Purpose:** Explain who handles the work and how sound judgement affects scope and quality.
- **Visitor question:** Who will I deal with, and how is care made practical?
- **Content type:** Short founder/accountability introduction, practical business relevance, a brief account of understanding the task and agreeing scope. Security, accessibility and performance appear as engineering responsibilities connected to decisions, not badges.
- **Proof needed:** Approved founder facts and adopted working commitments. Any named test or implementation detail requires evidence. No full chronology or performance target presented as a result.
- **CTA role:** About for further context; Contact for the ready visitor. Avoid a second biography funnel before enquiry.
- **Open Edition relationship:** A focused reading passage with relevant explanation, denser than the evidence view. A portrait is optional and must be real.
- **Launch:** Essential responsibility content; portrait optional. Keep this shorter than About and the shared expectations on Services.

### H5. Next-step choice

- **Purpose:** Resolve what to do now without demanding a technical diagnosis.
- **Visitor question:** How can I describe my need, or get help understanding an existing website?
- **Content type:** Primary enquiry invitation and brief expectation; a separate, quieter explanation of the free manual review and its bounded, non-instant nature.
- **Proof needed:** Accurate operating offer and eventual verified receiving behaviour. No promised response deadline.
- **CTA role:** Discuss your project leads to Contact. Request a website review leads to its own route. Email remains an available alternative channel.
- **Open Edition relationship:** A direct decision area, not a giant closing slogan or equal-button promotion. The review's longer scope stays on its owner page.
- **Launch:** Essential. No site-wide embedded form is required.

The global index and footer support all regions but are not extra homepage sales sections. Do not add testimonials, client logos, pricing cards, a process timeline or a technology wall to complete an expected landing-page pattern.

## 6. Side-index navigation architecture

**APPROVED CONTEXT:** The desktop side index is a central signature. **APPROVED information order:**

| Group | Contents in order | Responsibility |
|---|---|---|
| Brand/Home | Teesside Digital, linked to `/` with an explicit Home purpose | Ownership and return to the start; no second Home item required |
| Main destinations | Services, Work, About | Offer, evidence and responsibility |
| Primary action | Discuss your project -> `/contact/` | Direct access to the main commercial task |
| Secondary route | Free website review -> `/website-review/` | Available alternative, clearly below the primary action in hierarchy |

This gives three main destination labels, one primary action and one secondary route, plus the Home link. Four primary entries are sufficient for this scope; the fifth link is deliberately secondary. This is a readability judgement for this site, not a universal numerical navigation rule.

The Work entry is conditional on the approved publication evidence gate. If it is withheld, omit it from desktop, tablet, mobile and footer navigation consistently; do not leave a disabled or coming-soon placeholder. Restore it when qualifying evidence is published without changing the rest of the hierarchy.

Contact is both a real destination and the task reached by the enquiry action. Use one index entry labelled Discuss your project, not adjacent Contact and Discuss your project links to the same page. The destination uses familiar Contact context; the footer can use Contact. On the Contact page, the existing global entry indicates the current destination rather than sending the visitor back to a duplicate page.

Service child links appear in the Services page's local directory, not permanently in the global index. Home and relevant evidence may deep-link to them. There are no nested menus needed for three fragment destinations. Project titles, legal links, technology tags, founder chronology, social links and long descriptions do not belong in the side index.

Use a clear non-colour-only current-page indication and appropriate semantics. On project detail, indicate the Work section as the parent context; do not falsely label the Work overview as the current page. A breadcrumb or explicit Back to Work link can establish the hierarchy. Services remains the current page when navigating its fragments; any local current-location treatment is optional and must not require scroll tracking to navigate.

Global orientation and local contents must remain distinguishable. The index is not a table of every heading on Home. Exact visual grouping, sticky behaviour, widths and breakpoints remain provisional within the approved side-index principle.

## 7. Tablet and mobile navigation architecture

**APPROVED ARCHITECTURE:** Transform the side index into a compact brand-and-directory arrangement in normal reading flow. Preserve the same destinations, action priority and order. The smaller-screen version is not a separate information architecture.

- Brand/Home remains first and identifiable.
- Services, Work and About remain visible as a short directory.
- Discuss your project remains plainly available without opening another control.
- Free website review remains a secondary route, not a fixed promotional strip covering content.
- Full service names remain visible in Home's entry content and the Services local directory. They are not squeezed into an icon menu.
- Policies and supporting footer links stay in the footer, with Privacy also next to forms.

With this small set of destinations, a visible wrapping list is the approved architectural starting point, subject to later responsive testing. Let long labels wrap and let the directory occupy additional lines when text is enlarged. Do not shrink type, truncate service names, require horizontal swiping or hide the primary action to preserve a one-line header.

No hamburger or disclosure menu is required by the approved launch architecture. If later real-content testing demonstrates excessive navigation height, evaluate a progressively enhanced disclosure for the ordinary destinations while keeping brand and enquiry visible. Its collapsed state must not depend on a script that has not loaded, and failed enhancement must leave links available. Such a change needs recorded usability reasoning; it must not quietly replace the approved desktop side index.

Keyboard order follows reading order. Touch targets must remain usable when labels wrap. A responsive transition must not remove the currently focused link or produce two accessible copies of the same menu. Prefer one semantic navigation structure transformed by layout. At short heights and zoom, release stickiness before orientation or focused content becomes obstructed. Exact mechanics and measurements belong to later design and validation.

## 8. Visitor journeys

**APPROVED ARCHITECTURE:** Each row is a short viable route, not a compulsory funnel. Evidence may be an honest explanation of method and limits where no relevant completed project exists; do not substitute unrelated work as proof of a capability.

| Visitor | ENTRY | UNDERSTAND | EVIDENCE | ACTION | ESCAPE HATCH |
|---|---|---|---|---|---|
| 1. New or improved website | Home or Services website section | Website scope, content/enquiry purpose and whether improvement is enough | Relevant inspected North East Joinery detail, with demonstration status and limits | Contextual website enquiry -> Contact | Existing-site uncertainty -> Website review; direct email if the form does not suit |
| 2. Repetitive process, uncertain whether software is needed | Home problem orientation or Services | Process ownership, existing products and smaller changes are valid answers | Explanation of a bounded task and failure handling; labelled possibilities where no project exists | Describe the problem on Contact | Email Dave; retain the current process if no useful case for change is established |
| 3. Thinks an app is needed | Services apps/tools fragment | Actual task, users and constraints before choosing web, existing product or native app | Scope reasoning; future QuoteFlow only after its evidence gate | Discuss a business tool -> Contact | Explore automation or website section without losing context; enquire without choosing a platform |
| 4. Curious about AI | Services automation/AI fragment | Rules first where suitable; AI limits, checks, data and ongoing costs | A clear distinction between possible use and implemented proof; future verified automation example | Discuss a repetitive task -> Contact | Ask a question by email or use existing templates/rules; no forced AI assessment |
| 5. Existing website, unsure what is wrong | Website review directly or Home's secondary route | Free price, bounded public scope, manual report and no guaranteed turnaround | Transparent review method and exclusions; no automated score or fabricated sample finding | Send review request | Contact for a known project instead; email for an access question without sending passwords |
| 6. Wants evidence first | Work or a project deep link | Type, current status, what can actually be inspected | Project detail with evidence, reasoning and limitations | Relevant service context or Contact, according to readiness | Return to Work, inspect a verified demo/source link or ask Dave about the limits |
| 7. Wants to know who Dave is | About | Solo responsibility, relevant business experience and accurate ongoing study | Approved chronology, inspectable work and honest capability boundaries | Contact | Services for relevance or Work for implementation evidence; biography is not a required step |
| 8. Search arrival seeking a service | `/services/` or its website/automation fragment after a legacy redirect | Brand, location, service context and next step without reading Home | Relevant evidence link and service-specific limits; no assumption of prior knowledge | Contextual enquiry -> Contact | Local service directory, Home, or review when the question concerns an existing website |

Under the approved single-page service model, a direct search arrival is a Services-page arrival, not an invented dedicated service route. Every section should remain understandable when reached by an anchor. If a future service page meets the expansion gate and is subsequently approved, it must preserve the same independent entry responsibilities. Dedicated service pages are not part of launch.

No journey requires the visitor to inspect all three services, request the free review, book a call or read the full founder chronology before contacting Dave.

## 9. Conversion architecture

**APPROVED CONTEXT:** Discuss your project is primary; Request a website review is secondary; exploration and direct email are tertiary in content emphasis. Email can still produce a primary commercial enquiry - visual priority does not measure lead quality.

| Context | Emphasise | Supporting routes | Avoid |
|---|---|---|---|
| Home | Primary enquiry in global orientation and final decision area | Service/evidence exploration; one concise review introduction | Repeating two equal CTAs after every region |
| Services | Contextual enquiry after enough scope to judge fit | Relevant evidence; review in the website section only | Making every service lead through a website review |
| Work overview | Inspect the actual project entry | Available global enquiry and a modest closing route if useful | A review promotion displacing proof |
| Project detail | Understand evidence, then discuss a related need | Relevant Services fragment and Back to Work | Treating a demo visit as evidence of an enquiry or forcing a call |
| About | Primary enquiry after responsibility and context | Work and Services for independent assessment | Biography as a gate or a student recruitment appeal |
| Contact | Complete the enquiry or use email | Quiet review link only for someone seeking that different task | Competing review form, signup or promotional content beside submission |
| Website review | Complete this secondary service request | Quiet Contact route for an already defined project | Repeated primary sales prompts interrupting the requested task |
| Policies | Read the information and find relevant help | Appropriate Contact/email and return routes | Aggressive sales interruptions |
| 404/retired destination | Recover to a relevant working destination | Home, Services, Work when available, Contact | Converting every error into a free-review advert |

Secondary at business level does not mean weak or confusing on its own page. Once someone chooses the review, its request is the local primary task. The global enquiry route remains available without interrupting it.

Do not count a CTA click as an accepted enquiry. Later measurement, if useful and appropriately implemented, should distinguish route visits, attempts, accepted submissions and Dave's assessment of fit. No analytics product, tracking configuration or conversion forecast is selected here.

## 10. Project enquiry architecture

**APPROVED ARCHITECTURE:** Retain `/contact/` as the dedicated enquiry page, reached through Discuss your project and contextual variants.

Do not add a duplicate `/discuss-your-project/` route, repeat the form site-wide, or use a modal, wizard or conversational intake flow. The comparison below is retained as rationale for the approved dedicated Contact model, not as a choice still awaiting review.

| Option | Advantage | Cost or risk | Decision |
|---|---|---|---|
| Dedicated Contact page | Familiar, existing route; one place for instructions, form states and email | Requires a navigation step from explanatory pages | Approved |
| Separate Discuss Your Project route | Action-aligned URL and potentially focused task | Adds a second name/route for an existing familiar purpose or an unnecessary migration | Do not add |
| Site-wide embedded form | Some visitors can type without navigating | Repeated forms, privacy/state duplication, page length and maintenance burden | Do not use at launch |
| Modal, wizard or conversational intake | Can gather structured detail where genuinely complex | Adds interaction and recovery costs before need is established | Do not use at launch |

Contact begins with task context and who receives the enquiry. The form should be discoverable immediately in the page's main content; no tall promotional introduction or CTA that simply reloads Contact. The global action navigates to the page. A same-page action, if later necessary, must lead to the actual form entry rather than restart the route.

### Information requested

Use the Phase 2 field direction. **APPROVED launch form direction:** required name, email address and a useful description of the need; optional business name and website address. Include optional free-text budget/spending-limit context if it helps qualification, without invented ranges. A deadline can be mentioned in the description rather than adding another initial field. Preferred contact method is conditional on actual supported methods; do not add a phone choice merely to fill out the form.

This resolves initial form density without changing the approved principle that optional details must be useful. No mandatory service selector, technical stack choice, account, file upload or booking step. Do not collect passwords, payment data or sensitive customer records. Privacy context belongs near submission and must match actual processing.

### State architecture

| State | What the visitor needs | Truth boundary |
|---|---|---|
| Ready | Visible labels, requirements, concise hints, email alternative | No implication that entering data sends it |
| Validation issue | Specific field problem and a route to correction | Format validation cannot prove a mailbox or delivery |
| Sending | A clear in-progress status without invented progress | Not receipt |
| Accepted | Stable receipt acknowledgement and the approved next human step | Only after actual acceptance is known; not a claim Dave has read it |
| Known rejection | Explanation and retry/email recovery | State definite failure only when known |
| Uncertain outcome | Explain uncertainty and how to check | Do not falsely report success or insist nothing was received |

Preserve useful entered information through recoverable failures where feasible, without claiming storage behaviour that has not been implemented. Do not clear a success state on a timer. Detailed backend responses, error handling, focus mechanics, abuse controls and any non-JavaScript response route are deferred to implementation. A public marketing thank-you page is not required by this architecture; any necessary technical response route must not become an indexed content destination or expose submitted data.

Direct email stays visible as an alternative, not only after failure. Future capacity can be explained before submission if it affects fit. Do not manufacture slots, countdowns, availability badges or response deadlines. Dave can decline unsuitable work after understanding it; the form need not encode every capacity decision.

## 11. Free website review architecture

**APPROVED ARCHITECTURE:** A standalone `/website-review/` route. Unlike a short service fragment, this has a distinct promise, required input, bounded scope, exclusions and receipt expectations. Keeping those together reduces the risk of the V1 journey changing meaning between a CTA, scan and report promise.

Keep this secondary service separate from the main project enquiry. Do not combine the two forms into one route. No payment, automated scanning or report generation is authorised.

Reach it through the secondary index link, Home's quieter review introduction, the website section of Services, a low-emphasis Contact alternative and the footer. It is not a prerequisite for any paid enquiry and need not be promoted in app/automation explanations.

### Request journey

1. Establish that the offer is free, manual, bounded and personally fulfilled by Dave, with no guaranteed turnaround.
2. Explain what the review considers, what the visitor receives and the material exclusions before submission.
3. Request name, email and website URL, plus optional concerns/business context. Do not request credentials or private-system access.
4. Validate and submit the request, showing sending, accepted, rejected or uncertain state according to actual knowledge.
5. After acceptance, explain the subsequent human work without implying that it has started, a report exists, an email has been sent or a date is guaranteed.

The conditional approved receipt wording remains: "Your review request has been received. Dave will review the website and email you the report." Its technical acceptance condition must be fulfilled later; this architecture does not implement or certify delivery.

### Scope information before the form

The main public-facing website experience and enquiry journey are the subject. Possible considerations are first impression/trust, offer clarity, key public pages, mobile use, navigation, enquiry/contact, obvious accessibility issues, performance observations, obvious technical/security hygiene concerns and prioritised improvements.

State the exclusions clearly: no promise to inspect every page, review the backend or source code unless separately agreed, perform penetration testing or vulnerability assessment, provide a formal accessibility audit or WCAG certification, assess compliance, provide a comprehensive security review or SEO campaign/audit, guarantee business results, or implement fixes. An unobserved issue is not assurance of absence. The report separates observations, evidence, limitations and recommendations.

Important limits must remain visible before requesting; optional explanatory detail may be shorter or expanded later, but the human/manual nature, scope and no-turnaround guarantee cannot be hidden in policy text. No automated score, simulated scan, report preview populated with invented findings, payment flow or report-generation system is part of this approved architecture.

### Capacity changes

**APPROVED CONTEXT:** The offer may later be limited, paused, changed to an availability/request model or made paid. **APPROVED architectural treatment:** preserve the route when paused, explain current availability before any form entry, and replace the request action with an honest paused state. Keep Contact as a route for genuine projects, not a disguised way to bypass the pause.

Update Home, Services, the index and footer together so they no longer imply requests are currently open. Do not erase the explanatory URL or redirect it to a sales form with different expectations. If a request is already accepted, changing the public page must not imply that it was never received; handling existing requests is an operational responsibility. A later availability model needs accurate pending-state copy. Payment and the design of any future paid service remain outside this phase.

## 12. About / founder architecture

**APPROVED ARCHITECTURE:** Keep About as the business-responsibility page with a supporting founder account. Start with what Teesside Digital does, who does the work and the practical meaning of direct access. Do not start with a timeline or oversized personal introduction.

Suggested information progression:

1. Teesside Digital's role, Hartlepool base and direct responsibility to clients.
2. A short introduction to Dave, connecting practical business experience, visual judgement and engineering without implying that these are interchangeable qualifications.
3. A concise account of how that background affects briefing, communication, scope and accountability.
4. The full chronology in chronological reading order, with current study accurately identified.
5. Routes to actual work and the enquiry, so biography supports independent assessment rather than replacing it.

| Chronology item | Placement and purpose | Boundary |
|---|---|---|
| 2005-2007 early web development | First historical item after present-day responsibility | Early connection, not uninterrupted professional experience since 2005 |
| 2007-2010 construction | Brief historical passage about real constraints and practical work | Not an industrial visual theme or proof of software expertise |
| 2010-2021 tattoo artist and studio owner, approximately 11 years | Give business ownership, interpreting briefs and visual responsibility adequate context | Not a tattoo portfolio, career-redemption story or technical qualification |
| 2022-present, The Open University | Establish ongoing formal study | Do not imply graduation or hide ongoing status |
| Current BSc (Honours) Computer Science with Artificial Intelligence | Use the full title at the substantive study introduction | Still in progress |
| Approximately two years studying BSc (Honours) Cyber Security before changing pathway | Explain accurately beside the current academic history | Previous study, not a completed second degree or professional certification |

Home owns only a short relevance/accountability excerpt. About owns the full history. Do not duplicate the timeline in the side index, homepage or footer. A real portrait is optional; unavailable photography does not justify a placeholder. Use Teesside Digital for the business and I for attributable personal statements. No implied team or CV-style skills-rating list.

## 13. Engineering standards architecture

**APPROVED ARCHITECTURE:** No separate Approach or Standards page at launch. The current business needs clear scope and inspectable evidence more than another general explanation of quality.

| Location | What belongs there | What does not |
|---|---|---|
| Services | Shared engineering responsibilities, then task-specific implications inside each service | Three repeated standards blocks or a fourth cybersecurity offer |
| Project detail | Actual controls, accessible behaviour or measured delivery evidence adjacent to the decision it supports | Broad assurance inferred from a screenshot or technology choice |
| Home | Short explanation connected to relevant work or responsibility | Security/accessibility/performance badges as proof |
| Own-site detail, later | Implemented V2 decisions, dated checks and known limits | Claims that this architecture document proves performance or conformance |
| Accessibility page | The site's target, tested scope, barriers and reporting route | Certification claims without evidence or a general paid accessibility-audit offer |
| Website review | Its precise observational limits | Rebranded penetration testing, formal accessibility audit or comprehensive security assessment |

No vulnerabilities and fully accessible remain prohibited claims. Targets remain targets. Where a technical claim is used, the project evidence owns its subject/version, date, method, environment, result and limitations. Later writing should explain practical consequences before implementation terminology.

An Approach page could become useful if a substantial, distinct delivery method and maintained evidence answer questions not served elsewhere. It should not be created merely to give engineering standards a URL or add a navigation item.

## 14. Local identity architecture

**APPROVED ARCHITECTURE:** Use location to establish relevance and responsibility, without creating a repetitive local-search layer.

| Context | Appropriate role |
|---|---|
| Home opening | Short Teesside focus and Hartlepool base where it improves immediate understanding |
| About | Full location context with Dave's business responsibility and wider appropriate coverage |
| Contact | Actual base, supported contact arrangements and coverage; no invented office visit, phone or meeting promise |
| Services | Natural geographic context for the overall offer, not a town list inside each service |
| Footer | Concise consistent business/location fact and genuine contact route |
| Metadata later | Describe the page's actual subject and relevant location without repeating an identical title across routes |

Teesside first does not mean trades only. North East Joinery's subject must not become the site's industry positioning. Do not add Hartlepool, Middlesbrough and Stockton clones, sector landing pages, steel/shipyard metaphors or claims of local clients that do not exist. UK availability remains conditional on project fit and capacity, not a second enterprise proposition.

## 15. Page-by-page structural outlines

These outlines specify information order and responsibility. They do not require identical visual regions. Global orientation, a usable main landmark and the footer are shared; promotional openings are not. Interaction is limited to understandable navigation, evidence inspection where supported and truthful form states. Detailed motion and visual treatment are deferred.

### Home - `/`

- **PAGE PURPOSE:** Fast relevance, credible orientation and onward choice.
- **ENTRY CONTEXT:** First-time or returning visitor who may know little about the business.
- **OPENING CONTENT:** Offer, all three service entry points, audience/local cue and direct accountability, within the approved compact opening principle.
- **PRIMARY INFORMATION:** H1-H5 responsibilities in section 5; no full service catalogue or biography.
- **EVIDENCE:** One eligible excerpt with adjacent explanation and visible limits; omit if unsupported.
- **SUPPORTING INFORMATION:** Brief working expectations and contextual standards, not a process manifesto.
- **CONVERSION:** Primary enquiry; quieter secondary manual-review introduction.
- **EXIT / RELATED DESTINATIONS:** Services fragments, eligible project detail/Work, About, Contact and Website review.

### Services - `/services/`

- **PAGE PURPOSE:** Help an owner distinguish the three services and assess fit.
- **ENTRY CONTEXT:** General browsing, service-specific deep link, legacy redirect or search arrival.
- **OPENING CONTENT:** Concise offer context and local directory listing all three full service names; no compulsory Home visit.
- **PRIMARY INFORMATION:** Website section, apps/tools section and automation/AI section in the approved service order. Each contains recognisable tasks, possible work, sensible alternatives, scope limits and a contextual enquiry route.
- **EVIDENCE:** A relevant link or compact supported explanation within its service context. Missing app/AI portfolio proof must remain missing rather than be filled with concepts presented as results.
- **SUPPORTING INFORMATION:** One shared expectations area covering proportionate scope, direct responsibility, embedded standards and factors affecting cost. No invented numerical pricing or repeated common FAQs under every service.
- **CONVERSION:** Contextual primary enquiries; website review only alongside relevant existing-website needs.
- **EXIT / RELATED DESTINATIONS:** Contact, eligible project detail, About where personal context is useful, Website review.

### Work - `/work/`

- **PAGE PURPOSE:** Make available proof easy to understand and reach.
- **ENTRY CONTEXT:** Visitor checking credibility or following a general Work link.
- **OPENING CONTENT:** Brief explanation of the available work's type; no suggestion of a mature client portfolio.
- **PRIMARY INFORMATION:** One entry initially: project identity, type/status, concise subject, one reason to inspect and a detail link. Add real entries in the same pattern as they qualify.
- **EVIDENCE:** Short current extract if useful; the fuller argument belongs on detail. An index with no eligible entry should not ship.
- **SUPPORTING INFORMATION:** Only necessary disclosure; no filters, empty categories, placeholder cards or essay about why demos matter.
- **CONVERSION:** Evidence exploration first, with the global project enquiry available.
- **EXIT / RELATED DESTINATIONS:** Project detail, Services and Contact.

### North East Joinery - `/work/northeast-joinery/`

- **PAGE PURPOSE:** Explain a real demonstration and permit assessment of a specific decision.
- **ENTRY CONTEXT:** Work/Home/Services link or direct project arrival; visitor may not know this is a demonstration.
- **OPENING CONTENT:** Identity, demonstration-in-progress status and substantial remaining work before large media or feature claims.
- **PRIMARY INFORMATION:** Context -> what exists -> one or more eligible evidence/decision pairs -> meaningful limits and next state.
- **EVIDENCE:** Actual inspected screens/behaviour. Measured claims only with recorded conditions; no mandatory Results section.
- **SUPPORTING INFORMATION:** Relevant technology rationale and verified live/source links. No copied marketing image treated as a screenshot.
- **CONVERSION:** Discuss a relevant website need after evidence; never imply the demonstration produced customer revenue.
- **EXIT / RELATED DESTINATIONS:** Work, Services website section, Contact and verified external evidence where available.

### About - `/about/`

- **PAGE PURPOSE:** Establish responsibility and relevant background without replacing the offer.
- **ENTRY CONTEXT:** Visitor assessing trust, not necessarily seeking a personal biography.
- **OPENING CONTENT:** Teesside Digital's role, Hartlepool base, Dave's direct involvement and brief founder introduction.
- **PRIMARY INFORMATION:** Practical meaning of that background, then the accurate chronology and ongoing study from section 12.
- **EVIDENCE:** Confirmed facts and links to actual work; a portrait supports identification, not technical proof.
- **SUPPORTING INFORMATION:** Limits of what experience/study establishes, handled plainly rather than defensively.
- **CONVERSION:** Primary enquiry once responsibility is clear.
- **EXIT / RELATED DESTINATIONS:** Work, Services and Contact.

### Contact - `/contact/`

- **PAGE PURPOSE:** Receive a qualified project enquiry with low unnecessary effort.
- **ENTRY CONTEXT:** Ready visitor, uncertain problem-holder or direct return.
- **OPENING CONTENT:** Familiar Contact context, who receives it, what description helps and the email alternative.
- **PRIMARY INFORMATION:** Short form with required essentials and justified optional context; privacy information near submission.
- **EVIDENCE:** No portfolio region required. Confidence comes from accurate instructions and dependable behaviour.
- **SUPPORTING INFORMATION:** Only real scope/response expectations; a quiet link to the different review task where useful.
- **CONVERSION:** Sending, accepted, rejected and uncertain states as defined in section 10. No generic self-linking hero CTA.
- **EXIT / RELATED DESTINATIONS:** Direct email, Privacy, Services if more context is needed, Website review for that specific need.

### Free website review - `/website-review/`

- **PAGE PURPOSE:** Explain and request the free bounded human review.
- **ENTRY CONTEXT:** Existing-site owner seeking judgement, including a direct link from outside the site.
- **OPENING CONTENT:** Free price, Dave's manual role, main public website/enquiry scope and no guaranteed turnaround.
- **PRIMARY INFORMATION:** What the report provides, scope and material exclusions, then required name/email/URL and optional context.
- **EVIDENCE:** An honest description of review boundaries; no invented report, live score or claimed findings.
- **SUPPORTING INFORMATION:** Privacy and current availability. Any paused state takes precedence over the form.
- **CONVERSION:** Submit review request and truthful state feedback. No payment, download gate or simulated report generation.
- **EXIT / RELATED DESTINATIONS:** Contact for a defined project, Privacy, direct email where appropriate.

### Privacy - `/privacy/`

- **PAGE PURPOSE:** Explain actual personal-information handling.
- **ENTRY CONTEXT:** Form user, recipient or visitor investigating privacy.
- **OPENING CONTENT:** Subject, responsible business/contact and meaningful update context when verified.
- **PRIMARY INFORMATION:** Actual information collected, purposes, relevant providers/handling, retention and applicable choices/requests based on verified arrangements.
- **EVIDENCE:** Operating facts, not generic claims of UK-only hosting or exclusive access by Dave.
- **SUPPORTING INFORMATION:** Plain explanations and usable section links if length warrants them. Exact legal content requires later verification.
- **CONVERSION:** Relevant privacy contact only; ordinary global enquiry remains available without promotion inside the policy.
- **EXIT / RELATED DESTINATIONS:** Contact/email and relevant form routes; preserve normal browser return behaviour.

### Accessibility - `/accessibility/`

- **PAGE PURPOSE:** Explain the site's accessibility target, real testing and barriers, and how to report difficulty.
- **ENTRY CONTEXT:** Someone needing help or assessing the stated standard.
- **OPENING CONTENT:** WCAG 2.2 AA as a target, plus a direct reporting route.
- **PRIMARY INFORMATION:** Actual assessment scope/method where available, known limitations, accessible alternatives and feedback information.
- **EVIDENCE:** Dated checks that were performed; do not reproduce unverified NVDA/VoiceOver or periodic-audit claims.
- **SUPPORTING INFORMATION:** Relevant references with descriptive links, avoiding raw unbroken URLs that caused V1 overflow.
- **CONVERSION:** Report a barrier through a usable contact/email path, not a project-sales form alone.
- **EXIT / RELATED DESTINATIONS:** Contact/email and the relevant affected task where appropriate.

### Terms - `/terms/`

- **PAGE PURPOSE:** Explain applicable website-use terms without confusing them with a project agreement.
- **ENTRY CONTEXT:** Visitor checking rights, responsibilities or a footer reference.
- **OPENING CONTENT:** What these terms cover and who to contact.
- **PRIMARY INFORMATION:** Verified website-use provisions, clearly scoped and written for this business.
- **EVIDENCE:** Actual ownership and operating facts. Do not use boilerplate to invent warranties, support periods or commercial arrangements.
- **SUPPORTING INFORMATION:** Explain that project scope and commercial terms are agreed separately where that matches practice. Final legal wording is deferred.
- **CONVERSION:** Relevant contact for questions, not an embedded lead funnel.
- **EXIT / RELATED DESTINATIONS:** Contact and Privacy where related.

### Not-found recovery - 404 template

- **PAGE PURPOSE:** Help someone recover from an unavailable URL.
- **ENTRY CONTEXT:** Old link, mistyped path or missing content.
- **OPENING CONTENT:** Plain not-found explanation; no claim the visitor made an error.
- **PRIMARY INFORMATION:** A small set of working recovery routes selected for this site's scope.
- **EVIDENCE:** None required. No search box unless a working useful site search later exists.
- **SUPPORTING INFORMATION:** Contact/email if help is needed; do not repeat a submitted or sensitive URL into the page uncritically.
- **CONVERSION:** Recovery before sales.
- **EXIT / RELATED DESTINATIONS:** Home, Services, Work if published and Contact. Actual missing requests must retain a not-found status, not return a normal success page.

## 16. Homepage density and content ownership

**APPROVED ARCHITECTURE:** Home is an edited introduction, not a second owner of every page's content. Reuse facts consistently; do not maintain separately worded promises that can drift apart.

| Content | Primary owner | Allowed shorter use elsewhere | Duplication boundary |
|---|---|---|---|
| Immediate proposition and overall audience | Home, based on approved Phase 2 positioning | Brief context on direct-entry pages | Do not reproduce the full opening on every page |
| Service scope, fit and exclusions | Services, within each service section | Names and short role summaries on Home; relevant links from work | No separate launch service pages with the same descriptions |
| Cross-service relationship and shared working expectations | Services | Short Home responsibility/fit explanation | Do not repeat identical process/standards blocks three times |
| Founder chronology and degree history | About | Short accountability introduction on Home and relevant attribution elsewhere | No timeline in the footer, Contact or each service |
| Available evidence catalogue | Work | One selected Home excerpt; relevant service reference | Do not rebuild the whole index inside Home |
| Project facts, evidence and limitations | Project detail, backed by consistent project records later | Short excerpts retaining type/status and material limits | No separately hardcoded status, duration or result in summaries |
| General pricing explanation | Services shared expectations | Contact asks optional budget context | No invented price page, bands or repeated anti-agency comparison |
| Enquiry requirements and next step | Contact | Brief invitation elsewhere | Do not duplicate the form across the site |
| Free review price, scope, exclusions and availability | Website review | Short accurate offer/availability excerpt in Home, Services and global secondary links | No independent version of the offer inside each CTA area |
| Evidence-backed engineering claims | Relevant project detail and its source record | Exact scoped excerpts with access to supporting context | General standards language cannot stand in for a missing test |
| Own-site accessibility information | Accessibility | Target or relevant known limitation where useful | Do not scatter incompatible conformance statements |
| Privacy and website-use terms | Their respective policy pages | Concise accurate form context and links | No miniature conflicting policy in each form |
| Business location/contact facts | Shared business facts, explained fully in About/Contact | Concise consistent footer and Home references | One factual source later; no invented local-office variations |

Edit Home by asking whether a paragraph changes the visitor's immediate decision. If it belongs mainly to detailed suitability, chronology, test methodology or review exclusions, move it to its owner and leave a useful excerpt. Keep the status/limitation needed to interpret a proof excerpt even if that makes the excerpt slightly longer.

Do not set a hard homepage word count before real content is selected. Use the five responsibilities as a ceiling on distinct arguments, not an excuse for five long essays. A missing testimonial or project is not a density problem to solve with decoration.

## 17. Responsive information priority

**APPROVED ARCHITECTURE:** Preserve meaning and useful entry points rather than desktop geometry.

| Context | Remains near the beginning | Can follow later | Must remain attached |
|---|---|---|---|
| Home | Brand, offer, all three service names and direct enquiry access | Expanded problem examples and founder detail | Any evidence extract with its type/status and material limit |
| Services | Offer context and a usable directory of all three service sections | Longer shared working/pricing explanation | A service's exclusions and its possible benefits |
| Work | Honest collection context and actual entry | Secondary technical explanation | Demonstration/internal/client type with the entry |
| Project detail | Identity, status, context and meaningful limitation | Technical methods and fuller supplementary evidence | Screen/behaviour with explanation; measurements with conditions |
| About | Business role, Dave's responsibility and local context | Full chronology and study detail | Ongoing status with degree wording |
| Contact | Task context, required input and email alternative | Non-essential qualification explanation | Hints/errors with their fields; receipt with the submitted task context |
| Review | Free/manual/bounded nature, current availability and no guaranteed turnaround | Longer explanatory detail after core scope is understood | Material exclusions before submission; uncertainty with the affected request |
| Policies | Subject, useful contents where warranted and relevant contact | Detailed subsections | Limitations with the claims they qualify |

On narrow screens, present a readable evidence extract and then its explanation. A smaller view must not conceal the unfinished state, and a full screenshot link must not be the only way to discover the conclusion. Avoid tiny full-desktop screenshots presented as self-explanatory proof.

The directory can wrap; the offer can grow vertically with larger text. Do not preserve asymmetry by making narrow annotations, reordering keyboard targets, hiding services or shrinking labels. Wider screens can place related information beside each other; smaller screens establish that relationship through proximity and reading order. Exact layout transitions remain provisional and need later tests at the project viewports, short landscape sizes, zoom and enlarged text.

## 18. Accessibility architecture

**APPROVED CONTEXT:** WCAG 2.2 AA remains the target. This document does not establish conformance.

**APPROVED structural requirements:**

- Provide a clear main content landmark, a global navigation landmark and a footer. The side index's position does not make it an application menu; use ordinary website navigation semantics.
- Provide a skip-to-main route before repeated navigation. Local contents should help with a long page such as Services without creating another block that must always be traversed.
- Give each page one clear page-level heading and a logical topic hierarchy. Service sections are subordinate topics, not three competing page titles. Evidence captions do not need to become decorative headings.
- Keep source, reading and keyboard order consistent with the intended information sequence before applying asymmetric layout. Do not use visual placement to repair an incoherent source order.
- Distinguish current page from current parent section. On `/work/northeast-joinery/`, a Work parent treatment must not announce that `/work/` is the page currently being read.
- Make link purpose clear, particularly service fragments, project detail versus live demonstration, email and form entry. A navigation link is not a submit action.
- Use one coherent global navigation tree where practical. If later implementation needs alternatives, ensure only the appropriate version is exposed and focused elements remain reachable when the viewport changes.
- A local fragment should lead to the relevant labelled content without obscuring it under sticky elements. Navigating through fragments must not require animation or a scroll-position observer.
- On task pages, keep labels, required/optional meaning, privacy context, validation and recovery available in the reading flow. Any error summary should lead to the affected fields where useful; detailed focus and announcement mechanics are deferred for implementation and testing.
- Do not trap focus or lock background scrolling simply because navigation is on a small screen. Any later disclosure/dialog must have a coherent interaction model justified by its actual behaviour.
- Keep essential scope, status and limitations out of hover-only content. Reduced-motion users and users without enhancement must receive the same information and route choices.
- Verify responsive navigation does not cover focused controls or create inaccessible sticky content at zoom and short heights. Fix the obstruction within the side-index principle before proposing a different navigation model.

Actual contrast, target sizes, assistive-technology behaviour, focus handling, error announcements and reflow must be checked on the implemented experience. A document with sensible landmarks and clear labels is a plan, not evidence of a passing site.

## 19. SEO / discoverability architecture

No keyword research, search-volume estimate or ranking forecast was conducted. **APPROVED ARCHITECTURE:** Give each published route a human purpose first, then make its title, description, headings and internal links accurately reflect that purpose during later copy/implementation work.

Services covers website development, apps/business tools and automation/AI as distinct named subjects within one document. Direct links help visitors reach relevant information. The trade-off is shared page-level metadata and less service-specific landing-page scope; do not claim equal discoverability to three substantial standalone pages. A future split needs the human-content threshold in section 3.

Home establishes the overall business and geographic context. About establishes genuine responsibility and location. Contact serves enquiry intent. Website review serves a separate bounded offer. Project details explain actual work, preserving demonstration status in search-facing summaries where omission would mislead. Work is a real navigation index, not a keyword catalogue.

Use Hartlepool, Teesside and the North East naturally where relevant to the business and page. No thin town clones, sector pages, fictitious offices or repeated location phrases in every heading. Local relevance does not establish local customer results.

Later implementation should align visible content, canonical URLs, sitemap entries, redirects and any structured data. Include only published canonical content routes in the sitemap; fragments, missing/retired pages and form response states are not additional content entries. Do not emit invented ratings, clients, completed status, unavailable logo URLs or organisational facts. More schema is not a substitute for useful content.

Keep redirect decisions tied to genuine content equivalence. Do not send every retired specialist service or planned project to Home merely to retain a URL. No SEO rationale permits disguising a withdrawn service as an active one.

## 20. Future scalability

**APPROVED ARCHITECTURE:** Grow records and explanation before navigation complexity.

| New substance | Architectural change | Gate and restraint |
|---|---|---|
| First genuine client case study | Add a project detail and Work entry; optionally replace the selected Home excerpt | Permission, genuine scope, accurate client status and evidence; no invented outcome figures |
| Multiple website projects | Add concise Work entries ordered by relevance and evidence quality | Keep simple reading/index structure; filters only when a real collection becomes difficult to navigate |
| Substantive QuoteFlow | Add its honest demonstration detail and relevant Apps & Digital Tools link | Working task, inspectable evidence, explicit limitations and no unsupported AI/results claims |
| Automation & AI demonstration | Add a normal project record linked from its Services section | Show what runs, what a person checks, failures and limitations; disclose demonstration data |
| Genuine testimonials | Use a short permitted quotation beside relevant work or responsibility | Accurate attribution and context; no standalone Testimonials page or rotating carousel required |
| More detailed evidence | Expand the relevant project record; use a linked supporting record only if depth justifies it | Keep main explanation readable, preserve method/date/version and avoid a public technical-document maze |
| Substantial distinct service depth | Consider dedicated service pages while retaining a useful overview | Distinct buyer need, maintained content and appropriate evidence; preserve old fragment entry points |
| Refined service offer | Update the primary scope owner and dependent excerpts together | Requires an explicit strategic decision; architecture does not silently broaden security or enterprise claims |
| Changed review capacity | Keep the explanatory route and change availability/request state | Update every offer entry point consistently; do not add payment without a later authorised decision |

The second or third real project should require adding coherent content, not redesigning the site. No CMS, database, taxonomy engine, account system or enterprise service tree is needed merely to permit that growth. Preserve the approved static-first foundation and choose technical tools later only if real maintenance needs justify them.

## 21. Routes / content to remove or retire

**APPROVED CONTENT DECISIONS:** Remove the broad Cybersecurity service, QuoteFlow and SiteGuard from current public proof, and the old automated Website Health Check. Consolidate service content into the approved Services page. The table distinguishes those content decisions from possible migration treatments.

**DEFERRED MIGRATION MECHANICS:** Exact 301 redirects, 404 responses and 410 Gone responses are not locked by Phase 3 approval. Before selecting or implementing them, review actual existing URLs, useful inbound links, content equivalence, canonical behaviour, sitemap state and user recovery needs. A suggested 410 is an option for review, not an irreversible instruction. No redirect, response code, data record or feature has been changed here.

| Existing V1 system or route | Approved content disposition | Destination or treatment; HTTP mechanics deferred | Reason / verification needed |
|---|---|---|---|
| `/` | MODIFY | Retain route; replace its content architecture with section 5 | Stop duplicating full service, biography and diagnostic flows |
| `/services/` | MODIFY | Retain as substantive three-service owner | Approved offer changes and consolidated scope |
| `/services/web-development/` | REPLACE with consolidated Services content | Equivalent-content candidate: `/services/#websites-web-development`. A 301 redirect is an option; exact behaviour DEFERRED | Review actual URLs, inbound links, both slash forms, canonical policy and fragment arrival |
| `/services/ai-automation/` | REPLACE with consolidated Services content | Equivalent-content candidate: `/services/#automation-ai`. A 301 redirect is an option; exact behaviour DEFERRED | Preserve useful arrival while replacing unsupported claims; verify equivalence and recovery |
| `/services/cybersecurity/` | REMOVE broad service from current offer | Honest retirement/recovery required; 410 Gone is a candidate, not a locked decision. Exact response DEFERRED | No equivalent broad security service exists. Do not redirect it as though a general website review is a replacement security engagement |
| No existing Apps & Digital Tools route | ADD content destination within Services | `/services/#apps-digital-tools` | New approved service explanation, not a new standalone route |
| `/work/` | MODIFY | Compact evidence index, gated by real material | Remove fictitious portfolio scale and unsuitable entries |
| `/work/northeast-joinery/` | MODIFY | Retain detail URL if eligible evidence exists; truthful demonstration-in-progress treatment | Remove Completed/default timeline/unbuilt contradictions. Approved status overrides stale source assertions |
| `/work/quoteflow/` | REMOVE from current public proof | Remove entry/internal links/sitemap; possible 404/410 or other justified migration treatment remains DEFERRED to URL and recovery review | No redirect to unrelated work. Preserve the separate project privately; URL can return later when a real record qualifies |
| `/work/siteguard/` | REMOVE from current public proof | Remove entry/internal links/sitemap; possible 404/410 or other justified migration treatment remains DEFERRED to URL and recovery review | Planned dashboard is not security evidence; idea is not permanently deleted |
| `/about/` | MODIFY | Retain and rewrite around business responsibility and approved history | Remove chronology conflicts, placeholders and exaggerated experience |
| `/contact/` | MODIFY | Retain dedicated enquiry; replace false-positive state handling later | Keep familiarity and email; no self-linking promotional hero |
| Home automated Health Check, scores and report capture | REMOVE feature; REPLACE offer | Manual review information and `/website-review/` request route | No instant scanner, security scores, sales deductions or automatic report promise |
| Old homepage review/Health Check fragment links | REPLACE links; preserve useful recovery if needed | Identify actual legacy fragment IDs and inbound links later; keep a truthful transition link to `/website-review/` where required | Fragments are client-side locations, not independent server routes. A normal server path redirect cannot selectively recognise them |
| `/privacy/` | REPLACE content, retain route | Actual processing facts and useful form context | V1 assurance claims need verification |
| `/accessibility/` | MODIFY | Accurate target/testing/limits and usable feedback | Remove unsupported tests and fix raw-URL reading issues later |
| `/terms/` | REPLACE content, retain route | Clear website-use scope based on real arrangements | Do not present boilerplate as a complete service agreement |
| Not-found recovery | MODIFY | Preserve useful recovery; exact 404/retired-route mapping and host behaviour DEFERRED to verification | Do not include recovery states as normal sitemap/marketing destinations |
| Header/footer navigation | REPLACE organisation, retain useful labels | Approved side-index principle and approved hierarchy, with conditional Work entry | Existing top navigation layout is not the V2 specification |
| Repeated service facts, standards blocks and project labels | MODIFY content ownership | Single owners and accurate excerpts in section 16 | Prevent contradictory scope/status across pages |

A retired-response page, if selected during migration review, is a recovery state, not an extra primary content destination or hidden portfolio entry. It can explain that old content is unavailable and link to real alternatives without repeating unsupported project/service claims. Exact Netlify response handling is deferred and must be verified. If the North East Joinery evidence gate fails, remove it from public discovery and handle its existing URL honestly rather than leaving the misleading V1 page live. No particular 301, 404 or 410 treatment for that URL is approved here.

Before launch, inventory actual existing URLs, fragment references, internal links and useful inbound destinations. Use that evidence to select migration behaviour, then verify suitable redirects/recovery and consistent canonical/sitemap policy. Do not treat the draft's HTTP suggestions as automatically approved. This architecture approval is not a performed migration or a claim about existing search traffic.

## 22. Architecture failure modes

| Failure mode | Symptom | Corrective principle |
|---|---|---|
| Too many thin service pages | Four pages repeat the same offer, process and CTA | Keep one Services owner until distinct depth justifies a split |
| Homepage becomes the whole site | Full biography, complete service scope and every test appear before contact | Restore short introductions and link to primary owners |
| Review takes over sales | Every page presents the free offer as an equal or dominant action | Keep it contextual and secondary; give its own route a clear local task |
| Clever navigation hides enquiry | Contact is an unexplained symbol or obscure editorial label | Use the approved Discuss your project action and familiar destination context |
| Empty-looking portfolio | Blank grid slots, filters with one item, coming-soon projects | Use a concise index of actual evidence; withhold it if no useful entry exists |
| Side index is decorative | It contains slogans while a second conventional top menu does the real work | Put genuine global orientation and enquiry in the approved side index |
| About becomes a CV | Qualifications and timeline precede the business offer | Start with present responsibility; history supports relevance |
| Duplicated service copy | Scope differs between Home, service routes and form selectors | Keep Services as the detailed owner; use consistent excerpts |
| Every page gets a marketing hero | Contact and policies require a promotional scroll before their task | Start each route with its own useful entry content |
| Search-first route inflation | Town/sector clones or unsupported specialist pages appear | Require a distinct human question and maintained truthful content |
| Demo disclosure detaches | A flattering image appears before type/status or a mobile crop hides limits | Keep identity, status and material qualification attached to evidence |
| False consistency | Every page has the same number of regions despite different tasks | Reuse relationships and labels, not an identical promotional template |
| Responsive hierarchy changes | Enquiry vanishes into a menu or captions detach from evidence | Preserve semantic priority and recompose for reading |
| Generic Open Edition imitation | A large slogan, two buttons and three cards acquire a sidebar | Preserve compact service visibility and evidence/explanation relationships; review structure, not just colour |
| Form optimism | A submit click produces receipt or a completed-report implication | Confirm only the state actually known and offer recovery |
| Uncontrolled service growth | A new idea becomes a fourth pillar or enterprise promise | Revisit strategy explicitly; do not let navigation make commercial commitments |
| Scope leaks through review naming | Free review becomes free audit in metadata or promotions | Keep approved naming and scope consistent at every entry point |

## 23. Approved architecture summary

**APPROVED CONTEXT:** Sector-agnostic small/owner-led market, three named services, direct solo accountability, primary enquiry, secondary initially free manual review, truthful proof boundaries and Open Edition's side index/evidence grammar remain unchanged.

**APPROVED ARCHITECTURE:**

- **Launch sitemap:** `/`, `/services/`, `/work/`, `/work/northeast-joinery/`, `/about/`, `/contact/`, `/website-review/`, `/privacy/`, `/accessibility/`, `/terms/`, plus a genuine 404 recovery template. Work/detail publication requires eligible evidence; no empty substitute pages.
- **Primary navigation:** Brand/Home, then Services, Work and About, followed by the single Discuss your project action to Contact. No duplicated Contact/enquiry pair in the index.
- **Secondary/footer:** Free website review as a distinct secondary index route. Footer repeats useful ordinary destinations and Contact, with Website review, Privacy, Accessibility and Terms; direct email and accurate location remain available. Project detail links are contextual, not global.
- **Home sequence:** Compact offer/all-service entry points -> eligible evidence and explanation -> problem/scope orientation -> accountability/working expectations -> enquiry with a quieter review alternative. These are responsibilities, not final hero or pixel layout.
- **Services:** One substantive page, three direct fragments, shared expectations once. No dedicated service pages at launch.
- **Work:** Compact index and useful detail records; one truthful demonstration is acceptable, empty categories are not. QuoteFlow/SiteGuard remain out of current proof.
- **Enquiry:** Retain Contact as the dedicated task page with short input requirements, accurate states and visible email fallback.
- **Review:** Dedicated stable route with scope/exclusions before requesting, required name/email/URL, optional context and truthful receipt. No payment or report-generation design. Keep the route useful if availability changes.
- **About:** Business responsibility first, founder relevance next, full accurate chronology later; short excerpt only on Home.
- **Engineering standards:** Contextual responsibilities on Services and real evidence beside work; no separate Approach/Standards page at launch.

## 24. Phase 3 approval record

Dave has approved the Phase 3 architecture, including its navigation hierarchy, homepage responsibilities, content ownership and page outlines, subject to the hard publication gate and deferred migration mechanics. The three material architectural choices are resolved; they are not pending approval.

| Decision | Approval and consequence |
|---|---|
| Service architecture | **APPROVED:** One substantive `/services/` page with three distinct direct fragments. No separate launch service pages. Future separation requires distinct buyer questions, substantive unique content, relevant evidence and scope depth without duplication. |
| Work architecture | **APPROVED, SUBJECT TO HARD PUBLICATION EVIDENCE GATE:** Compact `/work/` index and `/work/northeast-joinery/` detail. Both require truthful, useful, inspectable substance. If the gate fails at launch, withhold Work navigation and normal detail discovery, omit Home evidence and keep the rest of the site complete. The architecture remains available for later qualifying evidence. |
| Separate enquiry and review routes | **APPROVED:** `/contact/` is the primary project enquiry destination reached through Discuss your project. `/website-review/` is the separate secondary review request. No duplicate enquiry route, combined form route, repeated site-wide form, modal, wizard or conversational intake. Direct email remains available. |
| Review offer and availability | **APPROVED:** Before submission explain the initially free, manual, bounded public-website/enquiry review, deliverable, material exclusions and no guaranteed turnaround. Preserve the route and explain availability if paused/limited. No payment, automated scanning or report generation. |
| Navigation | **APPROVED:** Brand/Home; primary Services, Work and About; primary action Discuss your project; secondary Free website review. Work remains conditional on publication readiness. Contact is the page/footer context, not a duplicate global entry. Service children stay local, project links contextual and legal/supporting routes primarily in the footer. |
| Homepage | **APPROVED:** Compact offer/all-service entries -> eligible evidence and explanation -> problem/scope orientation -> direct responsibility/working expectations -> project enquiry with quieter review alternative. These are responsibilities, not five identical sections. Omit evidence cleanly if it does not qualify. |
| About | **APPROVED:** Business, responsibility, Hartlepool/Teesside and Dave's role first; relevant background next; full chronology later. Home has only a concise accountability excerpt. No CV, biography-first, career-change, skills-rating or student-portfolio structure. |
| Engineering standards | **APPROVED:** Contextual Services expectations, real project/own-site evidence, relevant Accessibility content and bounded review observations. No launch Approach/Standards page, three marketing badges, fourth service or unsupported assurance. |
| Local identity | **APPROVED:** Natural Hartlepool/Teesside context on Home, About, Contact, footer and relevant metadata later. No town/sector landing pages, industrial copy gimmicks or fake local-client proof. Teesside is the priority, not an exclusive availability boundary. |
| Content retirement versus HTTP mechanics | **APPROVED:** Remove broad Cybersecurity, current QuoteFlow/SiteGuard proof and the old automated Health Check; consolidate services. **DEFERRED:** Exact 301/404/410 behaviour after actual URL, inbound-link, equivalence, canonical, sitemap and recovery review. Earlier suggested 410 responses are not irreversible decisions. |

The approved market, service names, founder chronology and degree wording, free review model, Open Edition direction, content-system rules, claims/evidence boundaries and side-index principle remain intact.

**PROVISIONAL dependencies:** Current North East Joinery evidence must be inspected before public claims; form processing and privacy facts require implementation/operational verification; actual responsive content must be tested. Missing evidence cannot be solved by approving a route.

**DEFERRED:** Exact migration/HTTP handling, final hero design and headline selection, final typography, final colour tokens, detailed motion, complete production copy and implementation. No candidate hero headline is promoted to final copy. These deferrals do not leave the approved architecture unresolved and do not authorise Phase 4.

Only `docs/v2/experience-architecture.md` is updated by this approval task. Existing V2 documents, production code, components, styles, configuration and dependencies remain unchanged. No `hero-spec.md`, final hero, implementation or deployment is included.

**Phase 3 approved and complete. Phase 4 and implementation have not begun.**
