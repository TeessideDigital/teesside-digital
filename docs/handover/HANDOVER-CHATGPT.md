HANDOVER.md
0. Handover status and source of truth
This document is the working handover for the Teesside Digital V2.1 redesign.
It is based on:
- the full design/build conversation to date;
- Codex implementation and verification reports;
- approved V2 strategy/content/experience documents;
- approved visual grammar;
- route-specific design storyboards and visual reviews;
- the latest reported Git commits and working-tree state.
Important repository-access limitation
This handover was prepared without direct access to the live Git working tree at C:\Users\david\Desktop\Work\Me\teesside-digital.
The repository has been inspected indirectly through previous coding-agent reports and project documents, but all current Git/file claims must be verified against the real checkout before making changes.
The first commands Claude Code should run are:
git branch --show-current
git status --short
git rev-parse HEAD
git log --oneline --decorate -12
git diff

Expected branch:
redesign/v2

Last confirmed committed baseline:
e2867ad04392d135f70df4dfaf0c916d2223c8d0
feat: add V2.1 services motion

After that commit, Implementation 7 About static was built, visually reviewed and approved.
The last reported uncommitted About files were:
src/pages/about.astro
src/components/astro/AboutExperience.astro

A final commit gate was then issued with the approved commit message:
feat: build V2.1 about experience

However, no subsequent Codex response confirming that commit was supplied before this handover request.
Therefore:
CURRENT HEAD / ABOUT COMMIT STATUS: UNKNOWN — needs verification immediately.

If HEAD is still e2867ad... and the only working-tree changes are the two approved About files, inspect them, run the final checks described below, and preserve the approved static result. Do not redesign it.
If a newer commit already exists with:
feat: build V2.1 about experience

then About static is complete and the immediate next task is Implementation 7B — About motion.
Authority precedence
When documents conflict, use this order:
1. Current repository source and latest explicitly approved implementation.
2. Latest route-specific approved decisions/visual review in this handover.
3. Phase 0 approved decisions.
4. Locked V2.1 visual grammar / approved creative direction.
5. Approved experience architecture.
6. Approved content rules.
7. Older V1 plans/audits only as historical context.
The approved strategy is small/owner-led businesses, Teesside-first, with exactly three top-level service families and security/accessibility/performance embedded as engineering standards.    phase-0-decisions
The approved V2 architecture deliberately assigns one clear job to each route, keeps Contact reachable, keeps Website Review secondary, and requires real evidence before portfolio volume.    experience-architecture(1)
The visual system is built around the Structural Datum: a stable desktop SiteIndex against which type, rules, imagery and negative space are composed. It is intended to feel like an architectural/technical editorial piece rather than an agency/SaaS template.    Pasted markdown(6)
1. Project summary
Business
Business name: Teesside Digital
Domain: teessidedigital.uk
Founder/operator: Dave
Base: Hartlepool / Teesside, North East England
Operating model: solo technical consultancy. Do not imply a larger team or agency.
What the business does
There are exactly three top-level service families:
1. Websites & Web Development
2. Apps & Digital Tools
3. Automation & AI
Security, accessibility, performance and maintainability are engineering disciplines within appropriate work, not equal fourth/fifth service pillars.
Cybersecurity must not return as a broad top-level consultancy offer.
AI must not be forced into a project merely because it is commercially fashionable. Deterministic automation or a simpler change may be the right answer.
Target audience / ideal clients
Initial market:
1. Small and owner-led businesses in Teesside.
2. Wider North East.
3. UK-wide where appropriate.
The business is not sector-specific.
Do not position Teesside Digital only for trades, construction, joinery, hospitality, etc.
Ideal engagements are realistic, manageable projects that Dave can personally deliver to a high standard.
Do not position the company for enterprise-scale projects that exceed current evidence or solo-delivery capacity.    phase-0-decisions
Core commercial positioning
Important ideas:
- clients work directly with Dave;
- the person discussing the project is also responsible for design/technical decisions;
- fewer handoffs;
- direct accountability;
- scope should remain proportionate;
- technology should solve a real business problem rather than demonstrate technical complexity.
Do not make "solo" the entire proposition.
Do not attack agencies or use language such as:
- "no middlemen";
- "no juniors";
- "agency nonsense";
- "small but mighty";
- "one-man agency".
Brand voice should be clear, grounded and specific rather than superlative. The content system explicitly prefers ordinary business language, British English and evidence-backed claims over generic transformation language.    content-system
Website goals
Primary goal:
- qualified lead generation through Discuss your project -> /contact/.
Secondary goal:
- Free website review -> /website-review/, a bounded, manual review performed by Dave.
Supporting goals:
- demonstrate judgement and technical quality through the site itself;
- establish trust in Dave without making the site biography-first;
- communicate Teesside/Hartlepool relevance;
- explain the three service families clearly;
- eventually provide real, inspectable Work evidence;
- demonstrate accessibility, performance and technical discipline without unsupported claims.
Not current goals:
- ecommerce;
- booking/scheduling;
- customer login;
- SaaS product sign-up;
- automated AI assessment;
- automated website scanner;
- large content marketing/blog operation.
Work / portfolio policy
Work is withheld until evidence passes a hard publication gate.
Do not fabricate:
- case studies;
- screenshots;
- testimonials;
- client logos;
- results;
- performance numbers;
- customer outcomes.
North East Joinery may eventually qualify as a demonstration project, but only after current implementation is inspected and a real design/engineering decision plus limitations can be demonstrated.
QuoteFlow is not currently valid public proof.
SiteGuard is not valid public proof.
If the Work gate is not met, omit Work from:
- navigation;
- homepage;
- footer discovery;
- sitemap/public discovery where appropriate.
Do not add "coming soon" Work cards.
The target architecture and evidence gate are explicitly approved.    experience-architecture(1)
Current project stage
Status:
Active V2.1 redesign/build, not launch-complete.

Major completed V2.1 areas:
- global shell and theme architecture;
- homepage static design;
- homepage motion;
- Services static design;
- Services motion;
- About static design visually approved and implemented, commit status currently needs verification.
Still outstanding:
- About motion;
- Contact redesign/implementation;
- Website Review route;
- legal/accessibility utility-route cleanup;
- old service-detail-route migration;
- Work publication/migration decision;
- SEO/schema cleanup;
- dependency/security maintenance;
- full launch audit;
- deployment/push of V2 branch.
The V2.1 commits repeatedly state nothing was pushed.
The live public domain may still be serving the older V1 implementation. Verify before assuming any V2.1 code is deployed.
2. Tech stack & environment
Confirmed/reported stack
Area	Current known state
Framework	Astro
Rendering	Static-first Astro
Astro declared version	^5.0.0
Astro historically resolved	5.18.2
Language	TypeScript
TypeScript declared	^5.3.3
TypeScript historically resolved	5.9.3
Styling	Tailwind CSS 3 + custom CSS/component styles
Tailwind historically resolved	3.4.19
Astro Tailwind integration	@astrojs/tailwind 5.1.5 historically
React packages	React / React DOM 18.3.1 historically installed
Astro React integration	@astrojs/react 4.4.2 historically
Image processing	Astro image pipeline / Sharp
Sitemap	@astrojs/sitemap, historically 3.7.4
Build output	Static dist/
Package manager	npm
Hosting	Netlify configuration is present; live/provider dashboard still needs verification
CMS	None known
Database	None implemented/confirmed
Auth	None
Payments	None
Analytics	UNKNOWN — needs verification
Form platform	Legacy Contact uses Netlify form handling
Email service	No external transactional email provider confirmed
Animation library	None; intentionally avoided
Client framework hydration in new V2 routes	None added


The repository baseline inspection established Astro/static output, Tailwind, React integration, sitemap and Sharp image processing. React was originally used for the V1 mobile menu and Health Check; the V2 shell and Home removed those responsibilities in favour of static/progressive enhancement. Do not assume the React packages can be removed until all current imports are searched.
Run:
rg "client:" src
rg "@astrojs/react|from ['\"]react|from ['\"]react-dom" src package.json

Local runtime observations
Historical audited local runtime:
Node 24.14.1
npm 11.11.0

This was an observation, not a deliberate production runtime pin.
Netlify's actual configured Node runtime was not verified.
Required verification
Check:
node --version
npm --version
cat package.json
cat netlify.toml

Look for:
- engines.node;
- .nvmrc;
- .node-version;
- NETLIFY_USE_YARN;
- Netlify Node overrides;
- deploy environment configuration.
Confirmed project commands
The following have been used repeatedly:
npm ci
npm run check
npm run type-check
npm run format:check
npm run build
git diff --check

Historical tooling work changed type-check to:
astro sync && tsc --noEmit

check runs Astro diagnostics.
A compatibility lint alias historically ran Astro diagnostics rather than ESLint.
Development server
UNKNOWN — needs verification from current package.json.
Likely standard Astro usage is npm run dev, but do not rely on that without checking the script.
Formatting
Historical state:
npm run format:check

reported existing formatting differences in approximately 52 files.
This debt was intentionally not globally reformatted.
Do not run a whole-repo prettier --write . as incidental cleanup during route implementation.
Environment variables
Exact environment variable names are:
UNKNOWN — needs verification.

Do not invent them.
Inspect:
.env.example
astro.config.mjs
src/config/constants.ts
src/components/astro/ContactForm.astro
netlify.toml
src/lib/*

Do not copy real secrets into this handover or into source.
Historical planning documents mentioned services such as Supabase, Resend, Fathom and Sentry, but these were recommendations/greenfield ideas, not confirmed current implementation.
Do not create env vars for them unless the product decision is explicitly reopened.
3. Repo & file map
Repository location
Known local path:
C:\Users\david\Desktop\Work\Me\teesside-digital

Repository URL
UNKNOWN — needs verification.

A GitHub repository is referenced by the site/footer/history, but the exact remote URL has not been established in this handover.
Run:
git remote -v

Active branch
redesign/v2

Important Git history
Implementation 2 — shell/navigation
7d955361bfc03122600af42029fe9fc8d44fd529
feat: establish V2 global shell and responsive navigation

Established:
- desktop SiteIndex;
- compact mobile visible navigation;
- TD mark + live TEESSIDE DIGITAL identity;
- Services/About;
- Discuss your project;
- Free website review;
- Dark/Light controls;
- no hamburger;
- Work withheld.
Implementation 3 — homepage opening
0a1a71394a9ddd470ade0bc7abef160cd8bf47b5
feat: build V2.1 editorial homepage opening

Files included:
src/pages/index.astro
src/components/astro/HomeOpening.astro
src/components/astro/AtmosphericHeroMedia.astro
src/components/astro/ServiceDirectory.astro
src/components/astro/SiteIndex.astro
src/assets/hero/tees-bridge-generated-hero.png
src/assets/hero/tees-bridge-generated-hero.source.md

Implementation 4 — full homepage narrative
252ce30f5554b49f622d4a03547f4b5e35b2d93b
feat: complete V2.1 homepage narrative

Files included:
src/pages/index.astro
src/components/astro/HomeNarrative.astro
src/components/astro/RegionalImageRelease.astro
src/components/astro/Footer.astro
src/layouts/BaseLayout.astro
src/assets/home/hartlepool-coastal-release.png
src/assets/home/hartlepool-coastal-release.source.md

Implementation 5 — homepage motion
a9a6f3b47afaff3b77e52be9f52c075414eab252
feat: add V2.1 motion system

Files included:
src/components/astro/HomeMotion.astro
src/pages/index.astro
src/scripts/home-motion.ts
src/styles/home-motion.css

Homepage coordinator reported:
3,469 bytes raw
1,570 bytes gzip

Implementation 6 — Services static
0991b718ab1dc020f47aa680f87706d5ce5233d1
feat: build V2.1 services experience

Files:
src/components/astro/ServicesExperience.astro
src/pages/services/index.astro

Implementation 6B — Services motion
e2867ad04392d135f70df4dfaf0c916d2223c8d0
feat: add V2.1 services motion

Files:
src/components/astro/ServicesMotion.astro
src/pages/services/index.astro
src/scripts/services-motion.ts
src/styles/editorial-motion.css
src/styles/home-motion.css

Services coordinator:
3,253 bytes raw
1,477 bytes gzip

home-motion.css was changed only to import/reuse shared editorial motion rules/tokens. Home's coordinator and motion definitions were verified unchanged.
Implementation 7 — About static
Implementation built and visually approved.
Last reported changed files:
src/pages/about.astro
src/components/astro/AboutExperience.astro

Expected commit message:
feat: build V2.1 about experience

Commit hash: UNKNOWN — needs verification.
Key current components/files
Shell / layout
src/layouts/BaseLayout.astro
src/components/astro/BrandIdentity.astro
src/components/astro/SiteIndex.astro
src/components/astro/ThemeControl.astro
src/components/astro/Footer.astro

BaseLayout.astro gained an optional editorialFooter property during Implementation 4.
It defaults to false.
Home was explicitly scoped to the editorial footer at that stage. Services/About may now opt in through their route; inspect current source rather than assuming.
Homepage
src/pages/index.astro
src/components/astro/HomeOpening.astro
src/components/astro/AtmosphericHeroMedia.astro
src/components/astro/ServiceDirectory.astro
src/components/astro/HomeNarrative.astro
src/components/astro/RegionalImageRelease.astro
src/components/astro/HomeMotion.astro
src/scripts/home-motion.ts
src/styles/home-motion.css

Services
src/pages/services/index.astro
src/components/astro/ServicesExperience.astro
src/components/astro/ServicesMotion.astro
src/scripts/services-motion.ts
src/styles/editorial-motion.css

About
src/pages/about.astro
src/components/astro/AboutExperience.astro

About motion does not yet exist unless another agent created it after this handover point.
Generated homepage image assets
src/assets/hero/tees-bridge-generated-hero.png
src/assets/hero/tees-bridge-generated-hero.source.md

src/assets/home/hartlepool-coastal-release.png
src/assets/home/hartlepool-coastal-release.source.md

Both assets are generated brand imagery.
They must not be described in repository provenance or public claims as:
- documentary photography;
- exact geographic records;
- Wikimedia photographs;
- the old Huw CC BY photograph.
The hero depicts a Transporter-Bridge/sunset scene used for art direction.
The coastal release is Hartlepool-inspired atmospheric imagery.
No visible "AI generated" label was required on the page; provenance is repository-internal.
Superseded hero photo
The former:
Middlesbrough_Transporter_Bridge.jpg

and its source record were removed before the Implementation 3 commit because they were introduced only in the uncommitted phase and no longer referenced.
Do not reintroduce that real photograph unless the user explicitly reopens the approved asset choice.
Historical/legacy data/config files to inspect
These existed in V1/project planning and may still exist:
src/config/constants.ts
src/data/services.ts
src/data/work.ts
src/data/legal.ts
src/data/testimonials.ts
src/lib/seo.ts
src/lib/validation.ts
src/lib/health-check.ts
src/components/astro/ContactForm.astro
src/pages/services/[slug].astro
src/pages/work/index.astro
src/pages/work/[slug].astro
src/pages/contact.astro
src/pages/privacy.astro
src/pages/accessibility.astro
src/pages/terms.astro
src/pages/404.astro

Verify exact current paths.
Do not assume old V1 source has already been deleted merely because the V2 route no longer links to it.
Project/config files
Inspect before making infrastructure changes:
package.json
package-lock.json
.gitignore
astro.config.mjs
tailwind.config.mjs
tsconfig.json
netlify.toml
.env.example

V2 documentation
The repository/project has historically used:
V2_MASTER_BRIEF.md
AGENTS.md
ARCHITECTURE.md
PLAN.md

docs/v2/README.md
docs/v2/phase-0-audit.md
docs/v2/phase-0-decisions.md
docs/v2/creative-direction-options.md
docs/v2/creative-direction.md
docs/v2/content-system.md
docs/v2/experience-architecture.md
docs/v2/hero-spec.md
docs/v2/motion-system.md
docs/v2/implementation-plan.md

Exact tracking/location status should be verified.
Do not treat old .claude/instructions.md references to V1 PLAN.md as higher authority than current V2.1 decisions.
4. Current status
Finished and working
Global shell
Approved and implemented.
Desktop:
- ~240px SiteIndex;
- fixed/stable structural datum;
- production TD mark;
- live TEESSIDE DIGITAL text identity;
- Services;
- About;
- Discuss your project;
- Free website review;
- explicit Dark/Light radio controls;
- Work omitted.
Mobile:
- visible compact shell;
- no hamburger;
- same information architecture;
- conversion routes remain visible;
- explicit Dark/Light choices.
Theme system
Approved behaviour:
- Dark default;
- Light is an explicit user-selected option;
- preference persisted;
- Light should apply before first paint when stored;
- if JavaScript is unavailable, usable Dark fallback remains;
- explicit radio semantics;
- forced-colour behaviour preserved;
- no theatrical theme transition.
Storage key:
UNKNOWN — inspect ThemeControl/BaseLayout.

Homepage
Static design complete and committed.
Motion complete and committed.
Dark desktop, Light desktop, Dark mobile and Light mobile approved.
Progressive enhancement and reduced-motion states verified.
No further homepage design work should occur unless a concrete whole-site QA issue is found.
Services
Static route complete and committed.
Motion complete and committed.
Dark/Light desktop/mobile approved.
Fragment links work natively and target focusable service headings.
No custom smooth-scroll system.
No new framework hydration.
About
Static implementation complete and visually approved.
Dark/Light desktop/mobile approved.
Commit status currently needs verification.
About motion has not begun.
Partially done
Website-wide V2 conversion
Only Home, Services overview and About have received the full V2.1 treatment.
Other routes remain legacy or need product/operational work.
Footer
V2 footer system exists and is visually integrated into completed routes.
Legal/support links still lead to routes that may contain legacy content.
SEO
Infrastructure exists but cleanup has not been completed.
Deployment
Repository is configured for Netlify-style static deployment, but V2.1 commits have not been pushed according to every confirmed implementation report.
Broken / missing
/website-review/
The global secondary CTA is:
Free website review

and points to:
/website-review/

The actual route is not currently built in the confirmed 15-route output.
This is a known broken/missing destination.
Do not silently change the link to another route; build the approved route.
Contact
Legacy form behaviour is not considered launch-ready.
Historical findings:
- success could be displayed before POST completion;
- rejection was not reliably checked;
- custom validation state handling had gaps;
- existing fields/copy do not match final V2 architecture;
- direct receipt/mailbox behaviour has not been fully verified.
Legacy service-detail routes
Still exist and have not been migrated:
/services/web-development
/services/ai-automation
/services/cybersecurity

Approved launch architecture is one /services/ page with fragments:
#websites-web-development
#apps-digital-tools
#automation-ai

The separate cybersecurity route must not survive as an equal specialist service page.
Legacy Work routes
Still exist in the route count but Work is withheld from V2 navigation/home.
Likely legacy routes:
/work/
/work/northeast-joinery
/work/quoteflow
/work/siteguard

These must not automatically remain public at launch.
Utility/legal pages
Privacy, Accessibility, Terms and 404 remain to be reviewed/reworked for V2.
Known 320px legacy issue
Historical V1 accessibility route had horizontal overflow around 320px due to long unbroken resource URLs.
This was deliberately not fixed during unrelated homepage work.
Verify whether it still exists.
Very last thing worked on
Implementation 7 — About static experience.
Four real browser screenshots were supplied:
- 1440 Dark;
- 1440 Light;
- 390 Dark;
- 390 Light.
The static About implementation was visually approved.
A final commit gate was given, but the commit result was not returned before this handover.
5. Pages, features, and content
Current route inventory
The latest builds repeatedly reported:
15 pages/routes

The known historical/current set is approximately:
/
 /services/
 /services/web-development
 /services/ai-automation
 /services/cybersecurity
 /work/
 /work/northeast-joinery
 /work/quoteflow
 /work/siteguard
 /about/
 /contact/
 /privacy/
 /accessibility/
 /terms/
 404

/website-review/ is not yet present.
This route inventory is transitional. The target launch architecture explicitly removes/consolidates the old service detail pages and makes Work conditional.    experience-architecture(1)
/ — Home
Status
COMPLETE / COMMITTED / DO NOT REDESIGN
Static commit:
252ce30f5554b49f622d4a03547f4b5e35b2d93b
feat: complete V2.1 homepage narrative

Motion commit:
a9a6f3b47afaff3b77e52be9f52c075414eab252
feat: add V2.1 motion system

Opening content
Exact H1:
Websites, business tools and practical automation.

Supporting proposition:
For small and owner-led businesses that need a clearer website, a better way to handle everyday tasks, or less repetitive work.

Opening service directory:
Websites & Web Development
Clear information and routes to enquiry.

Apps & Digital Tools
Quoting, booking and everyday tasks.

Automation & AI
Connected systems and repetitive work.

Local cue:
Based in Hartlepool
Working across Teesside and the North East.

Accountability cue:
Work directly with Dave
I design and build your project.

Primary CTA:
Discuss your project

Secondary:
Free website review

Full homepage narrative
Scene sequence:
1. approved opening;
2. service expansion;
3. direct accountability;
4. engineering approach;
5. regional image release;
6. conversion;
7. footer handoff.
Service expansion copy:
Websites & Web Development
Clear, fast websites built around what your business actually needs to do.

Apps & Digital Tools
Focused tools that replace awkward processes and make everyday work easier to manage.

Automation & AI
Practical automation for repetitive work, with AI used where it genuinely adds value.

Direct scene:
Work directly with Dave.
I design and build your project.

Engineering framing:
Use the right technology for the job.
Build the important details in from the start.

Principles used:
Clear scope before unnecessary complexity.
Understand the problem first, then decide what actually needs building.

Performance and accessibility belong in the work.
They should be considered during the build, not added as an afterthought.

Security starts with sensible implementation.
Make appropriate choices from the beginning rather than treating security as a bolt-on.

Build for the person who has to live with it afterwards.
Keep systems understandable and maintainable instead of adding complexity for its own sake.

Homepage images
Hero:
src/assets/hero/tees-bridge-generated-hero.png

Second regional release:
src/assets/home/hartlepool-coastal-release.png

Both have .source.md provenance records.
Homepage motion
Motion character:
- restrained;
- architectural;
- structural;
- cinematic but subtle;
- once-only entrances;
- no continuous scroll work.
Tokens:
/* micro */
180–240ms
cubic-bezier(0.2, 0.7, 0.2, 1)

/* structural */
360–440ms
cubic-bezier(0.22, 0.61, 0.36, 1)

/* settle */
760–950ms
cubic-bezier(0.16, 1, 0.3, 1)

Hero image settles approximately 1–2%.
H1 is animated as one unit, specifically to preserve approved line wrapping.
Reduced-motion:
- no spatial settle;
- no entrance clipping movement;
- no entrance rule growth;
- final state shown immediately.
/services/ — Services overview
Status
COMPLETE / COMMITTED / MOTION COMPLETE
Static commit:
0991b718ab1dc020f47aa680f87706d5ce5233d1
feat: build V2.1 services experience

Motion:
e2867ad04392d135f70df4dfaf0c916d2223c8d0
feat: add V2.1 services motion

Purpose
Explain:
- what each service solves;
- what kinds of problems fit;
- what might be built;
- engineering disciplines;
- fit/boundaries;
- direct working relationship;
- next action.
No photography.
Services is intentionally type/rule/negative-space led.
Service anchors
Approved target fragments:
#websites-web-development
#apps-digital-tools
#automation-ai

Verify exact current IDs in source.
Orientation
Services

Three areas of work. One aim: make the digital side of your business clearer, more useful and easier to run.

Directory:
Websites & Web Development
Apps & Digital Tools
Automation & AI

Websites copy
Websites & Web Development

Clear, fast websites built around what your business actually needs to do.

A website should make it easier for people to understand your business and take the next step. That can mean a new site, a considered redesign, clearer information, better enquiry routes or integrations that remove unnecessary friction.

Supporting entries:
Business websites

Clear, responsive sites designed around the information customers actually need.


Redesigns and structure

Improve an existing site when the content, navigation or enquiry journey is getting in the way.


Useful integrations

Connect the site to the systems or services the business already relies on where that genuinely helps.

Apps copy
Apps & Digital Tools

Focused tools that replace awkward processes and make everyday work easier to manage.

Some problems do not need another large software platform. A focused internal tool or purpose-built interface can often remove the spreadsheet workarounds, duplicated admin and manual handoffs that slow a small business down.

Example labels only — no explanatory paragraphs beneath:
Quoting and admin workflows
Booking and internal processes
Purpose-built business tools
Connecting useful existing systems

Automation copy
Automation & AI

Practical automation for repetitive work, with AI used where it genuinely adds value.

The starting point is the repetitive problem, not the technology. Automation can move information, route enquiries, connect systems or remove routine admin. AI can help with tasks such as summarising or classifying information where it is actually appropriate.

AI is not the product by default.

The aim is to remove useful amounts of repetition without making the system unnecessarily complicated.

Labels only:
Repetitive admin
Information / enquiry routing
Data movement / integrations
Summarisation or classification

Engineering copy
Framing:
The important engineering details should be part of the work from the start.

Performance

Build for useful speed and responsiveness rather than treating performance as a final optimisation pass.


Accessibility

Make appropriate accessibility decisions during design and implementation rather than bolting them on afterwards.


Security

Use sensible security practices from the beginning, proportionate to the system and the risks involved.


Maintainability

Keep the result understandable and supportable instead of creating unnecessary technical complexity.

Fit / boundaries
Teesside Digital works best with small and owner-led businesses that need focused digital work without layers of account management.

It tends to fit best when you want direct access to the person doing the work, have a website or process that is not working as well as it should, or need a focused digital solution rather than an enormous platform.

Then, after large negative space:
The goal is appropriate technology, not as much technology as possible.

If a straightforward website solves the problem, that is the right answer. If a small internal tool is enough, it does not need to become a software product. And if AI adds nothing useful, it does not need to be there.

Then:
Work directly with Dave.

Design decisions, technical decisions and communication stay connected instead of passing through layers of account management.

Services visual behaviour
Desktop chapter movement:
Websites: grounded left
Apps: deeper/right
Automation: broad return left
Engineering: diagonal
Fit: sparse/silent
Conversion: decisive

No:
- service cards;
- 3/4-column feature rows;
- service numbering;
- icons;
- photography.
Services motion
One route-specific coordinator.
One shared IntersectionObserver strategy.
Entrances:
- once only;
- unobserve targets after activation;
- disconnect when exhausted.
Fit remains almost/static.
Homepage motion remains unchanged.
/about/ — About
Status
STATIC IMPLEMENTED AND VISUALLY APPROVED. COMMIT STATUS UNKNOWN.
Expected files:
src/pages/about.astro
src/components/astro/AboutExperience.astro

The factual spine is:
- web experience around 2005–2007;
- career moves away from software, including construction;
- professional tattoo artist/studio owner ~2010–2021;
- return to Computer Science study from 2022;
- present Teesside Digital model built from client-facing judgement + technical study + direct accountability.    Pasted markdown
The About design explicitly rejects a CV/timeline, founder-card layout, tattoo gimmicks, inflated security positioning and "designer turned developer" template treatment.    Pasted markdown
Opening
About

Teesside Digital is a solo technical consultancy built around direct access to the person designing and building the work.

Based in Hartlepool, working across Teesside and the North East.

Origin
Quiet cue:
2005-2007

Copy:
Technology was part of the story before Teesside Digital existed.

Dave worked with web development around 2005-2007.

His career then moved away from software for a period, including construction, before eventually returning to technical work.

Do not imply continuous software experience since 2005.
Tattooing / craft
Cue:
2010-2021

Copy:
For around eleven years, the work was visual, client-facing and precise.

Dave worked professionally as a tattoo artist and studio owner from roughly 2010 to 2021.

The work meant listening carefully, understanding what someone was actually trying to achieve, making judgement calls and executing them precisely. It also meant being directly accountable for a finished result another person had to live with.

Running a studio added the other side of that responsibility: dealing with clients directly, managing expectations and standing behind the work.

Editorial fragments:
Understanding what someone is actually trying to achieve.

Precision and accountability matter when the result is permanent.

Running a client-facing business meant direct communication and real responsibility.

Computer Science
Cue:
2022-present

Approved copy:
From 2022, Dave returned formally to technical work through Computer Science study.

Current study spans Computer Science, software and web development, AI and security principles.

That study adds a stronger technical foundation to the same way of working: understand the problem, make considered decisions and build something that remains understandable afterwards.

Technical cues:
software / web development
AI
security principles

Do not imply:
- completed degree;
- professional cybersecurity certification;
- pentesting qualifications;
- compliance expertise;
- senior security architecture status.
Synthesis
Exact framing:
The career path was not linear.
The working principles are.

Design judgement

Years of client-facing visual work shape how problems are interpreted, discussed and turned into something clear.


Technical discipline

Computer Science study brings a stronger technical foundation to architecture, implementation and engineering decisions.


Direct accountability

The person discussing the project is also responsible for the design and technical decisions behind it.


Practicality

The result should suit the business and the people using it, rather than demonstrate how much technology can be added.

Direct relationship
Exact statement:
You work directly with Dave.

This is followed by substantial empty space.
Explanation must be materially lower/deeper:
There is no account-manager layer between the conversation and the work.

Context stays with the person designing and building the project, which means fewer handoffs and clearer accountability.

Design and technical decisions stay connected from the first conversation through implementation.

Do not compress into:
headline | paragraph

Conversion
Discuss your project
Free website review

Photography
About is intentionally photography-free.
Do not add:
- generated portrait of Dave;
- stock founder image;
- tattoo work;
- construction photo.
A real environmental portrait could be considered later but is not required.
Next About task
After static commit verification:
Implementation 7B — About motion.

Motion should be lighter than Services:
- opening: restrained title/orientation resolution;
- origin: one quiet structural reveal;
- tattoo scene: almost static;
- Computer Science: rule-led establishment;
- synthesis: selective diagonal reveals;
- direct relationship: almost still;
- conversion: established Advancing Rule.
Do not create a third motion language.
/contact/
Status
LEGACY — requires V2 redesign and functional rewrite.
Approved route job
One dedicated project enquiry task.
Global action label remains:
Discuss your project

Destination:
/contact/

Do not create a duplicate /discuss-your-project/ route.
Do not create a global modal/wizard.
Approved launch form direction
Required:
Name
Email address
Description of the need

Optional:
Business name
Website address

Optional free-text budget/spending-limit context may be useful, but no invented budget bands.
Deadline can be described in the message rather than adding another mandatory field.
Do not require:
- technical service selection;
- stack choice;
- account;
- password;
- payment info;
- file upload;
- booking slot.
Direct email should remain available.
Form states required
Implement honestly:
Ready
Validation issue
Sending
Accepted
Known rejection
Uncertain outcome

Success must only be shown after actual acceptance is known.
Do not claim Dave has read the message.
Preserve entered information through recoverable failures where feasible.
Do not clear success on a timer.
Historical code
Known component:
src/components/astro/ContactForm.astro

Historical hint:
ContactForm.astro around line 246
astro(4000): attributed script implicitly inline

Line number may now differ.
Legacy bug
Historical source showed success before network completion and did not reliably inspect rejection.
Treat this as a launch blocker for Contact.
/website-review/
Status
NOT BUILT — current global link is expected to be missing/broken.
Approved product
A free, manual, bounded website review performed by Dave.
It is not:
- automated scanner;
- instant score;
- penetration test;
- security audit;
- formal accessibility audit;
- SEO campaign;
- compliance certification.
No guaranteed turnaround.
Request journey
1. Explain it is free/manual/bounded.
2. Explain scope and exclusions before the form.
3. Request:
   - name;
   - email;
   - website URL;
   - optional concerns/business context.
4. Submit with honest states.
5. Only after technical acceptance, explain what happens next.
Approved receipt wording, conditional on actual acceptance:
Your review request has been received. Dave will review the website and email you the report.

Do not show that wording before receiver acceptance is actually known.
Possible review considerations
- first impression/trust;
- offer clarity;
- key public pages;
- mobile use;
- navigation;
- enquiry/contact;
- obvious accessibility issues;
- performance observations;
- obvious technical/security hygiene concerns;
- prioritised improvements.
Exclusions
No promise to:
- inspect every page;
- inspect backend/source code unless separately agreed;
- perform penetration testing;
- perform vulnerability assessment;
- provide WCAG certification;
- provide formal accessibility audit;
- provide comprehensive security review;
- assess compliance;
- run an SEO campaign/audit;
- guarantee business results;
- implement fixes.
If the offer is paused later, retain the route and show an honest paused state.
/privacy/
Status
Legacy / needs operational verification and rewrite.
Do not claim facts that have not been verified, particularly:
- only UK hosting;
- only Dave can access data;
- no third-party sharing;
- no international processing;
- retention periods.
Before writing final Privacy content, verify:
- Netlify form handling;
- email/mailbox provider;
- logs;
- analytics;
- hosting;
- processors;
- transfers;
- retention;
- deletion/request process.
/accessibility/
Status
Legacy / needs V2 cleanup.
Target direction:
- state accessibility target honestly;
- current target historically WCAG 2.2 AA;
- distinguish target from certification;
- state actual tested scope;
- known limitations;
- reporting route.
Do not claim:
fully accessible

unless genuinely justified, which is not currently established.
Historical 320px overflow from long raw URLs must be checked.
/terms/
Status
Legacy / needs review.
Terms should cover website use only unless actual commercial/project terms are separately established.
Do not imply website Terms are automatically the project contract.
Legal wording needs operational/legal verification.
Work routes
Status
Legacy routes exist, but Work is withheld from V2 navigation/home.
Do not add Work back to navigation unless evidence passes the gate.
North East Joinery
Can only be published as evidence after verifying:
- a real inspectable screen/behaviour;
- one meaningful design/engineering decision;
- current demonstration status;
- limitations;
- meaningful detail page substance.
Never call it a completed customer success if it is not.
QuoteFlow
Not enough implemented proof.
Keep out of current public portfolio.
SiteGuard
Remove from current public proof.
Do not use it to imply a security product/service capability.
6. Design system
Core concept
Structural Datum
The desktop SiteIndex is not just navigation; it is the stable architectural datum against which the rest of the page moves.
The design should feel closer to:
- architectural publication;
- infrastructure monograph;
- technical journal;
- bespoke editorial system;
than:
- agency landing page;
- SaaS template;
- standard portfolio theme.
The site should evoke engineering through structure, not fake engineering UI.    Pasted markdown(6)
Emotional tone
Target:
quietly formidable

Also:
- calm;
- serious;
- physical;
- confident;
- considered;
- atmospheric;
- competent.
Not:
- futuristic;
- macho industrial;
- nostalgic heritage;
- fashion luxury;
- overly playful.
Typeface
Instrument Sans only

Do not reintroduce Inter as the visible V2 typeface.
Typography ranges
Flagship:
Desktop: 88–104px
Mobile: 46–58px
Weight: 480–520
Line-height: 0.93–0.98
Tracking: approx -0.03em to -0.045em

Section display:
Desktop: 60–76px
Mobile: 40–48px

Section heading:
Desktop: 42–52px
Mobile: 32–38px

Lead:
Desktop: 20–22px
Mobile: 18–20px

Body:
16–18px

Do not shrink mobile body copy merely to shorten page screenshots.
Desktop grid
SiteIndex target:
~240px

Editorial field:
12 columns
24–28px indicative gutters

Use irregular spans.
Do not turn the grid into a repeating equal-column component system.
Mobile grid
4-column editorial grid
20–24px primary inset

No mobile card-container system.
Photography may bleed to edges when approved.
Text and controls stay safely inset.
Dark palette
Canvas       #1d252c
Surface      #242e36
Subtle       #2c3842
Primary      #dfe3e6
Muted        #b1c2d0
Identity     #5b7f9e
Action       #86acc8
Hover        #a0bfd6
Rule         #738b9b
Focus        #bfd8e9

Light palette
Canvas          #eceff0
Surface         #f3f5f6
Subtle          #e1e6e8
Primary         #1d2a34
Muted           #53636e
Identity        #5b7f9e
Action          #2f5977
Hover           #1f4059
Action label    #f3f5f6
Rule            #adb9bf
Focus           #244c6a
Control bg      #f3f5f6
Control border  #6b7e89

Light should feel like:
cool architectural paper

not generic white SaaS.
Rules
Generally:
1px

The SiteIndex datum is the strongest persistent rule.
Rules are structural, not decoration.
Do not add a rule to every block by habit.
Advancing Rule interaction
Core grammar:
text — rule → arrow

On hover/focus:
- text remains spatially fixed;
- rule subtly extends;
- arrow moves about 6–8px;
- action colour strengthens;
- no whole-link translation;
- no bounce;
- no reflow;
- immediate focus-visible.
Use transforms/pseudo-elements rather than layout width changes.
Responsive shell
Desktop:
TD identity
Services
About
Discuss your project
Free website review
Dark / Light

Work absent.
Mobile:
- compact visible nav;
- no hamburger;
- all key routes visible;
- touch targets practical;
- navigation may wrap naturally;
- do not hide enquiry action merely to force one-line layout.
Accessibility expectations
Every new route must survive:
- keyboard-only operation;
- visible focus;
- forced colours;
- JS disabled;
- reduced motion;
- 200% text;
- 320px narrow viewport;
- no horizontal document overflow.
DOM order must remain logical even when CSS grid places items irregularly.
7. Motion system
Core philosophy
Motion reinforces existing structure.
It must never be required to understand the page.
Default DOM/CSS state is the complete visible final state.
Only after motion enhancement successfully initializes may elements receive temporary pre-reveal states.
If JS fails:
full content remains visible

Tokens
MICRO:
180–240ms
cubic-bezier(0.2, 0.7, 0.2, 1)

STRUCTURAL:
360–440ms
cubic-bezier(0.22, 0.61, 0.36, 1)

SETTLE:
760–950ms
cubic-bezier(0.16, 1, 0.3, 1)

Architecture
Homepage:
src/scripts/home-motion.ts

Services:
src/scripts/services-motion.ts

Shared CSS:
src/styles/editorial-motion.css
src/styles/home-motion.css

No:
- GSAP;
- Framer Motion;
- smooth-scroll library;
- parallax engine;
- React animation island.
Use:
- transforms;
- opacity support;
- clipping/masking where restrained;
- IntersectionObserver;
- once-only events.
No continuous runtime scroll loop.
Reduced motion
For:
prefers-reduced-motion: reduce

Disable:
- image settle;
- viewport translation;
- entrance clip movement;
- entrance rule growth;
- entrance arrow travel.
Render final state immediately.
If preference changes dynamically while choreography is active, active animation should cancel/resolve safely to final state.
8. Deployment & infrastructure
Domain
teessidedigital.uk

Historical audit indicated:
www -> apex redirect

Verify current DNS and redirect behaviour.
Hosting
Repository contains/contained:
netlify.toml

Historical Netlify config included:
build command: npm run build
publish: dist
dev port: 3000
apex-domain redirect
404 handling
security/cache headers

Live HTML historically showed Netlify form injection on Contact.
Therefore Netlify is the strong current hosting assumption, but:
Netlify dashboard/account settings remain UNKNOWN — needs verification.

DNS provider
UNKNOWN — needs verification.

CI/CD
Historical audit found:
no tracked CI workflow

Do not assume GitHub Actions exist.
Netlify auto-deploy linkage may exist, but has not been verified.
Run:
ls -la .github/workflows
git remote -v

and inspect Netlify project settings.
Preview URLs
UNKNOWN — needs verification.

Serverless functions
No currently confirmed custom serverless API/functions are required by completed V2 routes.
Historical planning proposed Netlify Functions for a scanner/forms, but the automated scanner direction was rejected.
Check repository for:
netlify/functions
src/pages/api
src/actions

before assuming none exist.
Database
No confirmed database implementation.
Supabase was an early recommendation, not current project truth.
Authentication
None planned for launch.
Payments
None planned for launch.
Analytics
UNKNOWN — needs verification.

Fathom was an early proposal, not confirmed implementation.
Security headers
Historical live checks saw:
- HSTS;
- nosniff;
- frame protection;
- referrer/permissions headers;
- immutable caching for generated assets.
Historical check did not find a CSP.
Recheck current deployed response headers before launch.
Canonical/trailing slash issue
Historical config:
trailingSlash: 'never'

Historical live Netlify behaviour:
/contact -> /contact/

This mismatch has not been conclusively resolved.
Before launch, reconcile:
- canonical URL generation;
- actual host redirects;
- sitemap URLs;
- internal links;
- retired-route redirects.
9. Decisions & rationale
Why Astro
Astro was retained because the site is primarily static marketing/content with small progressive-enhancement needs.
Benefits:
- static HTML by default;
- minimal JavaScript;
- strong performance baseline;
- easy responsive image processing;
- optional client scripting only where necessary;
- simpler solo maintenance than a full SPA/app framework.
Do not migrate to Next.js for prestige or framework fashion.
Why static-first
The V2 site should be usable with:
JavaScript disabled

Motion is enhancement.
Navigation is visible without JS.
Primary content is not hydration-dependent.
This is deliberate.
Why no hamburger
The launch navigation set is small enough to remain visible.
A hamburger was rejected because it would hide the most important destinations unnecessarily and would weaken the signature compact shell.
Do not reintroduce one without real responsive evidence that the visible shell no longer works.
Why no top-level Cybersecurity service
The public capability/evidence does not justify broad specialist security consultancy positioning.
Security is an engineering standard.
Do not advertise:
- penetration testing;
- incident response;
- breach response;
- compliance consultancy;
- ISO assurance;
- enterprise security architecture;
- continuous monitoring.
unless operating capability/evidence materially changes and is explicitly approved.
Why one Services page
One substantive Services page:
- supports people who do not know which technical category they need;
- avoids thin/repetitive standalone pages;
- gives one source of truth;
- allows direct fragment links;
- keeps navigation compact.
The approved experience architecture explicitly chooses one substantive Services document with three directly linkable sections.    experience-architecture(1)
Why Work is withheld
Proof must be real.
One good inspectable project is better than three fake/demo cards.
Do not sacrifice truthfulness to make the site look larger.
Why generated homepage imagery is accepted
The generated Transporter Bridge sunset hero matched the approved cinematic art direction substantially better than the original real photograph.
It is treated as:
generated atmospheric brand imagery

not factual/documentary photography.
A repository provenance record distinguishes that fact.
The second coastal image was similarly generated from Hartlepool coastal references and serves as brand atmosphere, not geographic evidence.
Why About has no portrait
The About route succeeds through narrative and composition.
No suitable real portrait was required.
Generated imagery must never pretend to depict Dave.
A real environmental portrait can be considered later only as an optional enhancement.
Why motion is restrained
Motion is not the product.
The site already works statically.
Motion should:
- reinforce hierarchy;
- support structural rules;
- create subtle atmosphere;
- help scene handoffs.
It should not:
- delay content;
- hijack scroll;
- showcase an animation library;
- animate every paragraph;
- turn the site into a studio-demo reel.
10. Archive / abandoned ideas
Do not reintroduce these unless Dave explicitly reopens them.
V1 design language
Rejected:
- centred generic hero;
- blurred gradient blobs;
- dot grids;
- generic tech cards;
- large card grids;
- generic feature sections;
- glowing AI/security imagery;
- bouncing scroll indicators;
- predictable section stacks.
Generic agency patterns
Rejected:
- three equal service cards;
- 2x2 icon-value grid;
- bento layout;
- SaaS hero;
- centre-aligned startup hero;
- giant CTA button rows;
- matching primary/secondary filled buttons.
Fake technical decoration
Explicitly rejected:
WEB / TOOLS / AUTOMATION
01 / 02 / 03 service numbering
SIMPLE / USEFUL / DEPENDABLE
SCROLL TO EXPLORE
fake coordinates
fake diagnostics
fake terminals
fake dashboards
HUD graphics
meaningless technical metadata

The site should evoke engineering through precision, not imitate engineering software.
Hero directions
Rejected:
- generic content | rectangular photo hero;
- visible stepped mask cutting through bridge;
- destructive geometric aperture;
- generic visible feather;
- blur/glow/grain/bloom overlays.
Approved:
- Atmospheric Tonal Integration.
Old real bridge photograph
Superseded.
Do not revert to it.
Automated Health Check
Rejected/removed from Home.
Do not rebuild an automated website score.
Website Review is a manual service.
Mobile hamburger
Rejected.
Heavy motion
Rejected:
- scroll-jacking;
- smooth-scroll runtime;
- aggressive parallax;
- pointer tracking;
- custom cursor;
- magnetic buttons;
- particles;
- universal fade-up;
- letter-by-letter animation;
- large zoom;
- loading screen;
- route transition spectacle;
- looping decoration.
Top-level Cybersecurity
Rejected.
Separate launch service pages
Rejected.
Current detail routes are legacy migration debt, not approved V2 information architecture.
Pricing page / pricing cards
Not part of approved launch architecture.
Pricing may be discussed in scope; no public package grid is approved.
Testimonials
Do not publish until real.
An empty testimonials.ts existed historically and should eventually be removed if unused.
Blog
Not part of launch.
Sector/town SEO-page factory
Rejected.
QuoteFlow/SiteGuard as fake scale
Rejected for launch proof.
"Ink to code" founder storytelling
Rejected.
Also reject:
- "every pixel is permanent";
- tattoo icons;
- tattoo aesthetic;
- résumé timeline;
- qualification wall;
- "designer turned developer" cliché.
Early infrastructure recommendations that are NOT current truth
Do not assume the following were implemented simply because they appeared in an old greenfield recommendation:
- Supabase;
- Resend;
- React Email;
- Fathom;
- Sentry;
- GitHub Actions;
- Netlify Edge Functions;
- Tailwind 4.
Verify before introducing any of them.
11. Known issues, bugs, and blockers
P0/P1 launch blockers
1. About static commit state unknown
Immediately verify.
Expected last confirmed HEAD:
e2867ad04392d135f70df4dfaf0c916d2223c8d0

Expected possible dirty files:
M src/pages/about.astro
?? src/components/astro/AboutExperience.astro

or equivalent modified/untracked status.
2. /website-review/ missing
Global site links already point there.
Build route before launch or explicitly change product decision with Dave.
Do not leave the link broken.
3. Contact receiver/state handling needs rewrite
Do not launch with false success indication.
Actual Netlify acceptance and mailbox delivery need verification.
4. Work legacy routes conflict with V2 evidence gate
Navigation hides Work, but old routes may still be directly reachable/indexable.
Migration/publication decision needed.
5. Legacy service routes conflict with approved information architecture
Old:
/services/web-development
/services/ai-automation
/services/cybersecurity

need consolidation/retirement review.
Do not blindly 301 cybersecurity to an unrelated service.
Dependency/security maintenance
Historical audit found vulnerable dependency entries including Astro, Sharp and esbuild.
The assessment was nuanced: several advisories had limited reachability in this static configuration, but remediation still requires review.
Do not run:
npm audit fix --force

blindly.
A future compatibility task should consider:
- supported Astro upgrade;
- compatible React integration if still needed;
- Sharp version;
- esbuild;
- Tailwind integration compatibility.
Historical discussion suggested evaluating Astro 7+, but this was not implemented and should not be mixed casually into an active route-design task.
Tooling debt
Historically:
format:check -> ~52 existing differences

Do not format the repo incidentally.
Astro hints
Historical non-blocking hints:
src/components/astro/ContactForm.astro
attributed script implicitly inline

src/layouts/BaseLayout.astro
JSON-LD script implicitly inline

Reported line numbers were around:
ContactForm.astro:246
BaseLayout.astro:135

Current lines may differ.
Latest route implementations repeatedly reported:
Astro check: 0 errors, 0 warnings, 2 existing hints

SEO/schema historical issues
Verify whether still present:
- Organisation schema logo referencing nonexistent /images/logo.svg;
- actual logos were under /images/logo/;
- schema LinkedIn identity while LinkedIn was not actually set up;
- titles receiving Teesside Digital suffix twice;
- generic social-image metadata on case-study pages;
- 404 inheriting index/follow;
- canonical slash mismatch.
Accessibility overflow
Historical Accessibility page at 320px overflowed due to long raw reference URLs.
Verify.
No real-device certification
Most visual and interaction checks were local Edge/browser automation.
Not yet equivalent to:
- physical iOS Safari test;
- physical Android Chrome test;
- screen reader certification;
- complete cross-browser QA.
No verified production analytics
Analytics state unknown.
No verified production form delivery
Live Contact HTML historically registered with Netlify, but actual mailbox delivery was not fully verified.
No CSP historically observed
Recheck before launch.
Node runtime not deliberately pinned
Local Node 24 was used during audit/testing.
Production Netlify version unknown.
12. TODOs & next steps
Priority 0 — verify handover state
Run:
git branch --show-current
git status --short
git rev-parse HEAD
git log --oneline --decorate -12
git diff

Then determine whether About static is:
- already committed;
- still dirty and awaiting approved commit;
- unexpectedly changed.
Do not proceed if unrelated working-tree changes are present.
Priority 1 — close Implementation 7 static
If About is uncommitted but matches the visually approved implementation:
Run:
npm run check
npm run type-check
npm run build
git diff --check

Confirm:
- 15 routes;
- no new JS;
- no new hydration;
- no new dependency;
- Home unchanged;
- Services unchanged;
- 320/390/1440 responsive;
- Dark/Light;
- keyboard/focus;
- forced colours;
- JS disabled;
- 200% text;
- no overflow;
- logical DOM order.
Approved commit message:
feat: build V2.1 about experience

Do not push unless Dave explicitly authorises it.
Priority 2 — Implementation 7B About motion
Reuse existing V2.1 motion vocabulary.
Do not redesign static layout.
Suggested mapping:
Present
- restrained About clip/reveal;
- orientation statement resolves subtly;
- no shell animation.
Origin
- one quiet rule/structural reveal;
- avoid turning date into animated milestone.
Tattooing
Almost static.
Potentially only the major statement resolves.
Do not independently animate every narrative fragment.
Computer Science
- restrained chapter clip;
- technical rules establish;
- no code/AI gimmick.
Synthesis
Selective once-only reveals following:
Design judgement
Technical discipline
Direct accountability
Practicality

Do not hard-code a theatrical 1-2-3-4 sequence.
Direct relationship
Almost no motion.
You work directly with Dave. should remain calm.
The negative space is the effect.
Conversion
Use existing Advancing Rule.
Requirements
- one observer strategy;
- no dependency;
- no hydration;
- no continuous scroll;
- static final state by default;
- reduced motion immediate;
- JS failure safe;
- Home/Services motion unchanged.
Motion review before commit.
Priority 3 — Contact V2
Design and implement /contact/.
Do not turn it into another marketing landing page.
It is a utility/task route.
Requirements:
- visible form quickly;
- clear who receives it;
- direct email alternative;
- minimal useful fields;
- privacy context near submit;
- honest sending/accepted/rejected/uncertain states;
- no response-time promise unless operationally confirmed.
Need real Netlify receiver testing.
Priority 4 — Website Review
Add:
/website-review/

Manual bounded offer.
Verify actual operational receiver before launch.
Do not recreate automated Health Check.
Priority 5 — Utility/legal routes
Review/rewrite:
/privacy/
/accessibility/
/terms/
/404

Fix 320px overflow if still present.
Verify operational facts rather than copying generic boilerplate.
Priority 6 — route migration cleanup
Review each legacy route:
/services/web-development
/services/ai-automation
/services/cybersecurity
/work
/work/northeast-joinery
/work/quoteflow
/work/siteguard

For each, record:
- current deployed URL;
- current response;
- actual inbound traffic if known;
- content equivalence;
- final canonical;
- sitemap status;
- redirect/404/410 decision;
- useful recovery path.
Do not catch-all redirect everything to Home.
Priority 7 — Work evidence gate
Decide whether North East Joinery qualifies.
If not:
- continue withholding Work;
- remove legacy Work discovery/public indexing as appropriate.
If yes:
- build evidence-first Work route;
- preserve demonstration status;
- show real implementation;
- show limitations.
Priority 8 — SEO / schema
Audit:
src/lib/seo.ts
BaseLayout head/schema
sitemap
canonical URLs
OG images
404 robots
organisation logo
social identities

Remove unverified social identities.
Priority 9 — dependencies/tooling
After route work stabilises:
- current npm audit;
- supported Astro migration plan;
- Node runtime pin;
- review whether React packages are now unused;
- lockfile/reproducibility check;
- CI decision.
Do not bundle dependency-major migrations into visual route work without a separate compatibility checkpoint.
Priority 10 — final studio/launch audit
Before push/deploy:
- full-page visual audit;
- real-device mobile;
- keyboard;
- screen reader smoke test;
- reduced motion;
- JS disabled;
- forced colours;
- 200% text;
- 320px;
- short landscape;
- Chrome/Edge/Firefox/Safari;
- form delivery;
- 404;
- redirects;
- sitemap;
- robots;
- canonical URLs;
- headers;
- performance;
- Core Web Vitals/Lighthouse under recorded conditions;
- analytics consent/privacy implications;
- content truth audit.
Do not declare launch-ready while known critical route/form/migration issues remain.
13. Handover notes for Claude Code
Read first
In this order:
HANDOVER.md
git status / git log / current diff
docs/v2/phase-0-decisions.md
docs/v2/content-system.md
docs/v2/experience-architecture.md
locked V2.1 visual grammar if present in repo
current Home source
current Services source
current About source
current motion CSS/scripts
BaseLayout / SiteIndex / ThemeControl / Footer

The core content and experience model is already approved. Do not reopen it merely because another design is possible.
Before editing any route
1. Read current source.
2. Check latest commit and dirty tree.
3. Identify whether the task is static design, motion, functional behaviour or migration.
4. Avoid touching unrelated routes.
5. Produce visual evidence before committing significant visual work.
6. Run checks.
7. Do not push.
Coding style / architectural conventions
Prefer:
- Astro components;
- semantic HTML;
- CSS grid/flex;
- custom properties;
- TypeScript for small progressive-enhancement scripts;
- native browser APIs;
- IntersectionObserver for once-only motion.
Avoid:
- React for static content;
- new animation libraries;
- large abstractions;
- componentising every text fragment;
- runtime layout work;
- client-side rendering of normal content.
Static-first rule
New content must render correctly before JavaScript.
Never write base CSS that leaves required content:
opacity: 0;
visibility: hidden;
clip-path: ... fully hidden;
transform: translate... offscreen;

waiting for JS.
Enhancement may temporarily apply such states only after successful activation.
Content conventions
Use British English.
Use ASCII punctuation in production copy unless source requires otherwise.
Use:
Teesside Digital

for business-level positioning.
Use:
I / Dave

for personal responsibility where appropriate.
Do not default to:
we
our team
our experts
contact us

Avoid generic AI/agency phrases:
transform your business
unlock growth
digital solutions
future-ready
cutting-edge
revolutionise
supercharge

Claim discipline
Never make a statement true merely because it sounds good.
Distinguish:
- proposed benefit;
- implemented behaviour;
- measured result;
- business outcome.
Never claim:
fully accessible
no vulnerabilities
secure by default
guaranteed performance
guaranteed savings
instant AI transformation
24/7 support
same-day response

without real evidence/operations.
Visual review process used successfully
The project has deliberately separated:
design
→ visual approval
→ implementation
→ browser screenshots
→ correction
→ commit
→ motion
→ motion review
→ commit

Do not combine static redesign and motion into one uncontrolled pass.
No speculative cleanup
When a route is approved:
- do not improve neighbouring components;
- do not refactor unrelated code;
- do not adjust global tokens for local convenience;
- do not fix unrelated legacy debt.
This was repeatedly enforced to protect approved results.
Testing pattern
Every route implementation has generally checked:
Astro check
TypeScript
production build
git diff --check
Dark
Light
1440
390
320
short viewport
200% text
keyboard
focus-visible
forced colours
JS disabled
no horizontal overflow
representative non-target routes

Motion adds:
fast scrolling
once-only entrances
reduced motion
dynamic reduced-motion change
injected coordinator failure
CLS
long tasks
homepage/services regression

Visual output
Before committing any major visual route, produce:
1440 Dark
1440 Light
390 Dark
390 Light

plus focused captures where composition matters.
Do not rely only on automated assertions.
Git discipline
All confirmed V2 implementation phases were committed locally and not pushed.
Preserve that workflow unless Dave explicitly asks to push.
Do not stage/commit unrelated files.
Always inspect full diff from the previous approved baseline, not only files modified in the last command.
14. Open questions for Dave
These items cannot be safely inferred and should be resolved when relevant.
Immediate
1. Was the approved About static implementation actually committed after the last review?
   - Claude should verify Git before asking, but if Git state is ambiguous this needs confirmation.
2. Is e2867ad04392d135f70df4dfaf0c916d2223c8d0 still the last confirmed baseline, or is there now a feat: build V2.1 about experience commit?
Repository / deployment
3. What is the canonical GitHub repository URL?
4. Which Netlify site/project is the production domain connected to?
5. What Node version is configured in Netlify production?
6. Is deployment auto-triggered from a branch, and if so which branch?
7. What is the intended final canonical URL policy:
   - trailing slash;
   - no trailing slash?
8. Which provider controls DNS for teessidedigital.uk?
Contact
9. Which mailbox/address should receive Contact form submissions?
10. What form submission method is intended at launch:
    - Netlify Forms;
    - function/API;
    - external provider?
11. Is any response-time expectation safe to publish? Current direction is no promised response deadline.
12. Is optional budget context wanted on the Contact form?
Website Review
13. Is the free manual website review definitely active at launch?
14. Which receiver/mailbox should receive review requests?
15. Is there a capacity limit or paused-state requirement at launch?
16. What actual report format will Dave send:
    - email body;
    - PDF;
    - document/link?
Do not build fake automated report generation to answer this question.
Legal/privacy
17. What providers actually process form submissions and email?
18. What retention period is intended for enquiries/review requests?
19. Is analytics currently installed or planned?
20. If analytics is planned, which provider?
21. Are there any non-UK processors/transfers that must be described?
Work / migration
22. Does North East Joinery currently meet the Work evidence gate?
23. Are there Search Console/analytics/backlink reasons to preserve old service-detail URLs through 301s?
24. Should old Work URLs return 404/410 while withheld, or remain private/unlinked temporarily?
This needs migration evidence; do not guess.
Founder/About
25. Is the current public wording deliberately generic:Computer Science study
    
    or should the formal current Open University degree title eventually be named?
Do not change the approved About copy without explicit approval.
26. Is a real environmental portrait of Dave desired later, or should About remain permanently image-free?
Launch
27. Is the objective to replace the current live V1 immediately after V2 completion, or run a preview/staging period first?
28. Is a full external accessibility/security review planned before public launch?
15. Exact files to provide if Claude Code does not have the repository
If the next coding assistant is not running inside the actual repository, provide the repo/zip rather than asking it to reconstruct source from this handover.
Minimum required files:
package.json
package-lock.json
astro.config.mjs
tailwind.config.mjs
tsconfig.json
netlify.toml
.env.example
.gitignore

src/layouts/BaseLayout.astro

src/components/astro/BrandIdentity.astro
src/components/astro/SiteIndex.astro
src/components/astro/ThemeControl.astro
src/components/astro/Footer.astro

src/pages/index.astro
src/components/astro/HomeOpening.astro
src/components/astro/AtmosphericHeroMedia.astro
src/components/astro/ServiceDirectory.astro
src/components/astro/HomeNarrative.astro
src/components/astro/RegionalImageRelease.astro
src/components/astro/HomeMotion.astro
src/scripts/home-motion.ts
src/styles/home-motion.css

src/pages/services/index.astro
src/components/astro/ServicesExperience.astro
src/components/astro/ServicesMotion.astro
src/scripts/services-motion.ts
src/styles/editorial-motion.css

src/pages/about.astro
src/components/astro/AboutExperience.astro

src/pages/contact.astro
src/components/astro/ContactForm.astro

src/pages/privacy.astro
src/pages/accessibility.astro
src/pages/terms.astro
src/pages/404.astro

src/pages/services/[slug].astro
src/pages/work/index.astro
src/pages/work/[slug].astro

src/config/constants.ts
src/data/services.ts
src/data/work.ts
src/data/legal.ts
src/data/testimonials.ts
src/lib/seo.ts
src/lib/validation.ts
src/lib/health-check.ts

src/assets/hero/tees-bridge-generated-hero.png
src/assets/hero/tees-bridge-generated-hero.source.md
src/assets/home/hartlepool-coastal-release.png
src/assets/home/hartlepool-coastal-release.source.md

Also provide, if present:
V2_MASTER_BRIEF.md
AGENTS.md
ARCHITECTURE.md
PLAN.md
docs/v2/*

Do not provide secrets.
16. Immediate pickup instruction
Claude Code should not start redesigning anything immediately.
First:
cd C:\Users\david\Desktop\Work\Me\teesside-digital

git branch --show-current
git status --short
git rev-parse HEAD
git log --oneline --decorate -12
git diff

Then:
If About static is still uncommitted
Verify that the only intended changes are:
src/pages/about.astro
src/components/astro/AboutExperience.astro

Run:
npm run check
npm run type-check
npm run build
git diff --check

If the implementation still matches the approved About screenshots and no unrelated change is present, finish the already-approved static commit:
feat: build V2.1 about experience

Do not push.
If About static is already committed
Begin planning Implementation 7B — About motion using the existing V2.1 motion system.
Do not create a new motion framework.
Do not redesign About.
Do not touch Home or Services.
After About motion is reviewed and committed, the next major route is Contact.