**Teesside Digital - technical and project handover**

Snapshot: 5 October 2026. Prepared for Claude Code from the accessible
repository, conversation, approved specifications and retained local
review evidence.

Repository: C:/Users/david/Desktop/Work/Me/teesside-digital.

Unless explicitly absolute, paths in this document are relative to that
repository root. This handover is a status record, not permission to
implement, commit, push or launch another phase. Unknown operational
facts are marked UNKNOWN - needs verification. No credentials are
included.

**1. Project summary**

**Business:** Teesside Digital, a solo technical consultancy run by
Dave, based in Hartlepool and working across Teesside and the North
East. Wider UK work is appropriate where the project fits.

**Approved proposition:** websites, business tools and practical
automation for small and owner-led businesses. The three core service
families are:

1.  Websites & Web Development.

2.  Apps & Digital Tools.

3.  Automation & AI.

Security, accessibility and performance are standards built into the
work. Cybersecurity is not an equal standalone marketing pillar in the
approved V2 positioning. Do not claim penetration testing, incident
response, certifications, formal compliance assurance or continuous
monitoring without actual capability and evidence.

**Initial customers:** small and owner-led businesses across sectors,
initially Teesside, then the wider North East. Prioritise manageable
projects that Dave can personally design, build and support. A narrower
trades-only recommendation appeared during the audit but was not the
final approved positioning.

**Website goals:** qualified project enquiries and credible explanation
of the services, working approach and founder background. The site
should itself demonstrate careful engineering and design.
Evidence/portfolio publication is conditional. This consultancy website
is not a shop, booking platform, membership service or paid AI
application.

**Conversion hierarchy:**

- Primary: Discuss your project, linking to /contact/.

- Secondary: Free website review, linking to /website-review/.

- Review is an initially free, bounded human review by Dave, with a
  structured report returned by email. It is not an automated scan,
  instant score, security assurance or promise of work/results.

**Current stage:** incremental V2.1 build on redesign/v2. Home and
Services have completed static and motion approval and local commits.
About has been built as a static experience and is uncommitted, awaiting
visual approval. Contact, Website Review, publication gating,
legal/operational verification and launch hardening remain unfinished. A
V1 production baseline exists; the currently deployed website/version
has not been independently verified during this handover.

**2. Tech stack & environment**

**Current implementation**

| **Area**                | **Verified state**                                                                   |
|-------------------------|--------------------------------------------------------------------------------------|
| Framework               | Astro 7.3.2, static output                                                           |
| Language                | Astro templates, TypeScript, CSS and small native JavaScript modules                 |
| Styling                 | Tailwind CSS 3.4.19 through PostCSS, plus global and component CSS                   |
| UI integration          | React 18.3.1 / React DOM 18.3.1 retained; @astrojs/react 6.0.5                       |
| Sitemap                 | @astrojs/sitemap 3.7.4                                                               |
| Images                  | Astro astro:assets / Picture, build-time Sharp service                               |
| Hosting configuration   | Netlify, static dist publish directory                                               |
| Package manager         | npm, committed package-lock.json                                                     |
| Local runtime inspected | Node v24.14.1, npm 11.11.0; .nvmrc specifies 24                                      |
| CMS                     | None implemented                                                                     |
| Database                | None implemented                                                                     |
| Authentication          | None implemented                                                                     |
| Payments                | None implemented                                                                     |
| Email                   | Contact intended for Netlify Forms; mailbox, notifications and delivery not verified |
| Analytics               | No active analytics integration verified                                             |
| Error tracking          | No active Sentry or equivalent integration verified                                  |
| Server/API              | No implemented API routes or serverless functions found                              |

Resolved development dependencies inspected in the lockfile:

| **Package**           | **Resolved version** |
|-----------------------|----------------------|
| @astrojs/check        | 0.9.9                |
| typescript            | 5.9.3                |
| postcss               | 8.5.26               |
| autoprefixer          | 10.5.4               |
| prettier              | 3.9.6                |
| prettier-plugin-astro | 0.14.1               |
| @types/node           | 20.19.43             |
| @types/react          | 18.3.31              |
| @types/react-dom      | 18.3.7               |

Astro, its React integration, Astro check, PostCSS, Autoprefixer and the
Prettier Astro plugin have exact declarations in package.json. Other
declarations include ranges; use the lockfile for reproducibility. The
package description still says Astro 5 and uses old positioning. That is
stale metadata, not the actual framework version.

**Local setup and checks**

Run in PowerShell:

Set-Location 'C:/Users/david/Desktop/Work/Me/teesside-digital'

git status

git branch --show-current

node --version

npm --version

npm ci

npm run dev

Astro is configured for port 3000. Read the actual server output: an
occupied port can change the URL. For a production preview:

npm run check

npm run type-check

npm run build

npm run preview

- check: astro check.

- type-check: astro sync && tsc --noEmit.

- build: astro build.

- lint: a compatibility alias to Astro diagnostics, explicitly not
  ESLint.

- format:check: repository-wide Prettier check using the Astro plugin
  and .gitignore.

- format: repository-wide write operation. Do not use it to erase
  unrelated V1 formatting debt during a scoped task.

No repository-owned automated browser test suite was found. Previous
browser QA scripts live in temporary directories and use a bundled
Playwright runtime rather than a new project dependency.

**Important configuration**

- astro.config.mjs: site: 'https://teessidedigital.uk', output:
  'static', compressHTML: true, trailingSlash: 'never'.

- React integration remains configured with experimentalReactChildren:
  true; React and React DOM are SSR externals.

- Sitemap currently includes rendered static routes automatically.

- Sharp entrypoint: astro/assets/services/sharp.

- Shiki theme: github-dark, wrapping disabled.

- Prefetch is configured with prefetchAll: true; assess its network cost
  during hardening rather than assuming it is free.

- Explicit Vite aliases mirror tsconfig.json: @, @components, @layouts,
  @lib, @config, @data, @styles.

- Tailwind 3 is wired through postcss.config.mjs. Do not restore the old
  Astro Tailwind integration or silently upgrade Tailwind.

**Environment variable names only**

.env.example contains SITE_URL and CONTACT_EMAIL. Current
configuration/constants also contain literal site/business values; do
not assume those example variables control the live implementation.

Commented future examples: SUPABASE_URL, SUPABASE_ANON_KEY,
RESEND_API_KEY, FATHOM_SITE_ID, SENTRY_DSN. These are historical
possibilities, not implemented integrations or instructions to install
them.

NODE_ENV is set by Netlify contexts. import.meta.env.PROD is an
Astro/Vite build flag. Current static functionality does not demonstrate
a requirement for secret application keys. Actual Netlify/dashboard
environment variables: UNKNOWN - needs verification. Never place private
API keys in client code or PUBLIC\_ variables.

The configured public contact address is dave@teessidedigital.uk; this
is a public business constant, not a secret. SITE.url in
src/config/constants.ts selects the production domain for production
builds and http://localhost:3000 otherwise. Check local-versus-built
canonical/schema output when testing; astro.config.mjs independently
specifies the production site URL.

**3. Repo & file map**

**Git identity**

- Local path: C:/Users/david/Desktop/Work/Me/teesside-digital.

- Remote: https://github.com/TeessideDigital/teesside-digital.git.

- Active branch: redesign/v2.

- HEAD: e2867ad04392d135f70df4dfaf0c916d2223c8d0.

- V1 is preserved by main and the v1.0 tag.

- At inspection, the branch was nine commits ahead of the local
  origin/redesign/v2 tracking ref. No fetch was performed; that is a
  local tracking comparison, not proof of the current remote server
  state.

**Documentation**

| **Path**                                 | **Purpose and authority**                                                                   |
|------------------------------------------|---------------------------------------------------------------------------------------------|
| AGENTS.md                                | Project and user conventions, phase boundaries, safety and validation                       |
| V2_MASTER_BRIEF.md                       | Original phase-based redesign brief                                                         |
| docs/v2/README.md                        | Index of V2 decisions/specifications                                                        |
| docs/v2/phase-0-audit.md                 | Current-site/business/engineering audit                                                     |
| docs/v2/phase-0-decisions.md             | Approved strategy after the audit                                                           |
| docs/v2/creative-direction-options.md    | Earlier creative territories and evaluation                                                 |
| docs/v2/creative-direction.md            | Direction decisions, later revised by approved V2.1 work                                    |
| docs/v2/content-system.md                | Approved positioning, voice, page purposes and content constraints                          |
| docs/v2/experience-architecture.md       | Page journeys, navigation, evidence and conversion architecture                             |
| docs/v2/hero-spec.md                     | Hero specification; later imagery/composition approvals supersede earlier details           |
| docs/v2/motion-system.md                 | Motion principles; current approved implementation is also authoritative                    |
| docs/v2/implementation-plan.md           | Approved sequencing/boundaries, risks, checks and deferred decisions                        |
| ARCHITECTURE.md, PLAN.md, root README.md | Engineering/V1 historical context; not all reflect the present V2.1 build                   |
| .claude/instructions.md                  | Existing Claude guidance; check for stale V1 assumptions                                    |
| HANDOVER.md                              | This verified transition snapshot, not a substitute for the relevant approved specification |

Important: implementation-plan numbering is historical. It labels
Contact as Implementation 7, while the latest actual conversation labels
the pending About build Implementation 7 after Services 6/6B. Follow the
latest explicit task and scope, not an old number alone. Its statement
that production implementation has not begun is an approval-time
snapshot, now outdated.

**Source map**

| **Path**                                                                                                                                    | **Role**                                                                                                      |
|---------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| src/layouts/BaseLayout.astro                                                                                                                | Shared document/head, SEO/schema, early theme initialisation, SiteIndex, main/skip link and footer            |
| src/config/navigation.ts                                                                                                                    | Services/About navigation, conditional shell Work entry, primary/secondary/legal links, current-page matching |
| src/config/constants.ts                                                                                                                     | Business/site constants and legacy feature flags; several claims/flags need later reconciliation              |
| src/pages/index.astro                                                                                                                       | Home composition and Home motion integration                                                                  |
| src/pages/services/index.astro                                                                                                              | Approved Services experience and Services motion                                                              |
| src/pages/about.astro                                                                                                                       | Pending static About integration, uncommitted                                                                 |
| src/pages/contact.astro                                                                                                                     | Remaining V1 Contact page                                                                                     |
| src/pages/services/\[slug\].astro                                                                                                           | Three remaining V1 detail pages from legacy service data                                                      |
| src/pages/work/index.astro, src/pages/work/\[slug\].astro                                                                                   | Remaining V1 public Work output; publication gating is unfinished                                             |
| src/pages/privacy.astro, accessibility.astro, terms.astro, 404.astro                                                                        | Legacy legal/error pages                                                                                      |
| src/components/astro/BrandIdentity.astro                                                                                                    | TD mark and live HTML Teesside Digital identity                                                               |
| src/components/astro/SiteIndex.astro                                                                                                        | Vertical desktop rail and visible compact navigation; one semantic navigation structure                       |
| src/components/astro/ThemeControl.astro                                                                                                     | Dark/Light radio controls                                                                                     |
| src/components/astro/Footer.astro                                                                                                           | Shared footer with optional editorial integration                                                             |
| src/components/astro/HomeOpening.astro                                                                                                      | Approved H1, proposition, hero, directory and accountability/CTA opening                                      |
| src/components/astro/AtmosphericHeroMedia.astro                                                                                             | Imported-image Picture pipeline, responsive crop and theme masks                                              |
| src/components/astro/ServiceDirectory.astro                                                                                                 | Open service links/rules/arrows in the opening                                                                |
| src/components/astro/HomeNarrative.astro                                                                                                    | Service expansion, Dave/accountability, engineering principles and final conversion                           |
| src/components/astro/RegionalImageRelease.astro                                                                                             | Decorative coastal release between narrative and final conversion                                             |
| src/components/astro/HomeMotion.astro, ServicesMotion.astro                                                                                 | Route-scoped motion integration                                                                               |
| src/components/astro/ServicesExperience.astro                                                                                               | Services orientation, service chapters, engineering/fit/AI boundaries and conversion                          |
| src/components/astro/AboutExperience.astro                                                                                                  | New static founder story, principles and direct-accountability composition; untracked                         |
| src/components/astro/ContactForm.astro                                                                                                      | Legacy Netlify-intended form and currently misleading submission success handling                             |
| src/components/astro/Hero.astro, Section.astro, Button.astro, Card.astro, ServiceCard.astro, ProjectCard.astro, TechnicalLabel.astro        | V1 components still retained for remaining routes; inspect consumers before removal                           |
| src/components/react/HealthCheck.tsx, HealthCheckForm.tsx                                                                                   | Old client-side Website Health Check source, no longer part of the new Home experience                        |
| src/lib/health-check.ts                                                                                                                     | Old browser-fetch/heuristic checker; not a trustworthy arbitrary-site audit                                   |
| src/lib/seo.ts                                                                                                                              | Page title/canonical helpers and organisation/local business/service/breadcrumb/article schema helpers        |
| src/lib/validation.ts                                                                                                                       | Existing validation helpers                                                                                   |
| src/data/services.ts, work.ts, legal.ts, testimonials.ts                                                                                    | Legacy business/content data; testimonials are empty, service/work/legal claims require reconciliation        |
| src/scripts/theme.js                                                                                                                        | Early theme choice and window.TeessideTheme API                                                               |
| src/scripts/home-motion.ts, services-motion.ts                                                                                              | Native finite route-specific motion coordinators                                                              |
| src/styles/tokens.css, globals.css                                                                                                          | Semantic palette/font/global foundation                                                                       |
| src/styles/editorial-motion.css                                                                                                             | Approved advancing-rule interaction and motion styles                                                         |
| src/styles/home-motion.css                                                                                                                  | Compatibility forwarder importing shared editorial motion CSS                                                 |
| src/assets/hero/tees-bridge-generated-hero.png, .source.md                                                                                  | Approved generated Home hero and internal provenance                                                          |
| src/assets/home/hartlepool-coastal-release.png, .source.md                                                                                  | Approved generated regional image and provenance                                                              |
| public/fonts/instrument-sans/                                                                                                               | Self-hosted variable font, OFL licence and source record                                                      |
| public/images/, favicon/social assets, public/robots.txt                                                                                    | Existing static assets, some V1; inspect references before cleanup                                            |
| astro.config.mjs, tailwind.config.mjs, postcss.config.mjs, tsconfig.json, netlify.toml, .nvmrc, .gitignore, package.json, package-lock.json | Build/runtime/tooling/deployment configuration                                                                |

node_modules/, .astro/, dist/, build/cache output and .netlify/ are
generated/ignored. Do not edit generated output as source or commit it.
There are no implemented CMS collections, API routes, authentication
modules, databases or payment modules to hand over.

**4. Current status**

**Approved local checkpoints**

| **Work**                                                       | **Commit**                               | **Status**                      |
|----------------------------------------------------------------|------------------------------------------|---------------------------------|
| Phase 0 decisions                                              | 01072d784cb60e4f1ca879d08791ada0c807ed58 | Approved                        |
| V2 documentation/implementation plan                           | d715cc9ec82e4ad42b4e0d893012a563658213de | Approved                        |
| Implementation 0/0A diagnostics and Astro 7 framework baseline | ef2a9ba7632e0dfdb696d651907442641bfa34e6 | Approved                        |
| Implementation 1 tokens/theme/Instrument Sans                  | 93eb2c66a0c8cc0f8ee26fb24b7dd770571f4905 | Approved                        |
| Implementation 2 shell/navigation                              | 7d955361bfc03122600af42029fe9fc8d44fd529 | Approved                        |
| Implementation 3 generated-hero editorial opening              | 0a1a71394a9ddd470ade0bc7abef160cd8bf47b5 | Approved                        |
| Implementation 4 complete static Home narrative                | 252ce30f5554b49f622d4a03547f4b5e35b2d93b | Approved                        |
| Implementation 5 Home motion                                   | a9a6f3b47afaff3b77e52be9f52c075414eab252 | Approved                        |
| Implementation 6 static Services                               | 0991b718ab1dc020f47aa680f87706d5ce5233d1 | Approved                        |
| Implementation 6B Services motion                              | e2867ad04392d135f70df4dfaf0c916d2223c8d0 | Approved, current HEAD          |
| Implementation 7 static About                                  | No commit                                | Built, awaiting visual approval |

**Exact working-tree handoff**

Before creating this handover:

M src/pages/about.astro

?? src/components/astro/AboutExperience.astro

This task adds HANDOVER.md as a further untracked file. No
implementation file was changed by the handover task. No commit, push,
dependency installation, configuration change or next phase was
performed.

The last implementation work was the isolated About static
build/refinement against the supplied Dark/Light desktop/mobile
references. It adds no About JavaScript, no hydration, no entrance
motion, no new dependency and no imagery. It retains the existing shell,
theme, footer and unrelated route geometry.

The user's subsequent resume was not visual approval. Do not commit the
pending About change, add About motion, or begin Contact work without
the next explicit instruction. Unsaved editor-buffer state cannot be
established from filesystem inspection: UNKNOWN - needs verification if
Dave has edits outside saved files.

**5. Pages, features, and content**

**Route inventory**

The last verified build emitted 15 pages. New navigation often uses
trailing slashes, although Astro currently configures trailingSlash:
'never'. The table identifies logical routes; final
slash/canonical/redirect behaviour needs deliberate migration
verification.

| **Route**                 | **Purpose, implementation and status**                                                                                                                                              | **Remaining action**                                                                                  |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| /                         | Approved V2.1 Home: BaseLayout, HomeOpening, AtmosphericHeroMedia, ServiceDirectory, HomeNarrative, RegionalImageRelease, HomeMotion; complete static narrative and approved motion | Preserve approved composition; cross-site hardening only in an authorised task                        |
| /services/                | Approved ServicesExperience + ServicesMotion, editorial footer; three service families, fit and sensible AI boundaries                                                              | Preserve static/motion approval; later resolve obsolete detail URLs                                   |
| /about/                   | Pending AboutExperience inside BaseLayout, editorial footer; complete static founder copy/layout                                                                                    | Dave's visual review, then explicit commit gate; motion is separate and not authorised                |
| /contact/                 | Legacy ContactForm and V1 page body inside current shell                                                                                                                            | Rebuild truthfully; actual receiver/acceptance/recovery and business facts must be verified           |
| /website-review/          | Planned manual review conversion route, currently absent; new CTAs intentionally lead to a development 404                                                                          | Implement approved human workflow, bounded scope and honest form states; verify receiver and delivery |
| /services/web-development | Legacy service detail from src/data/services.ts, V1 presentation                                                                                                                    | Decide migration response after consolidation; do not silently invent a redirect                      |
| /services/ai-automation   | Legacy AI service detail                                                                                                                                                            | Reconcile old claims and decide migration response                                                    |
| /services/cybersecurity   | Legacy standalone cybersecurity detail                                                                                                                                              | Remove broad capability claims through approved consolidation/migration work                          |
| /work/                    | Legacy Work index from src/data/work.ts; absent from new navigation but still generated                                                                                             | Hard publication gate must suppress normal public output when withheld                                |
| /work/northeast-joinery   | Legacy demonstration case study                                                                                                                                                     | May only publish after truthful evidence, status/disclosure review and Dave approval                  |
| /work/quoteflow           | Legacy demo case study                                                                                                                                                              | Withhold; no fabricated live AI or completed outcome                                                  |
| /work/siteguard           | Legacy demo case study                                                                                                                                                              | Excluded from approved launch evidence; migration response remains deferred                           |
| /privacy/                 | Legacy legal page/data                                                                                                                                                              | Verify actual processors, logging, retention, email/form handling and business facts                  |
| /accessibility/           | Legacy statement                                                                                                                                                                    | Match claims to actual testing and an honest contact route; no unsupported compliance assertion       |
| /terms/                   | Legacy terms                                                                                                                                                                        | Verify operating/legal facts and intended service conditions                                          |
| /404.html                 | Astro custom error page; Netlify missing-route response target                                                                                                                      | Verify final host behaviour and migration responses                                                   |

Work being hidden in src/config/navigation.ts is **not** the full
publication gate. Static Work pages and sitemap entries still exist. Do
not describe the whole repository as meeting the withheld-output
requirement yet.

**Approved homepage copy and structure**

H1 is fixed:

Websites, business tools and practical automation.

Supporting proposition is fixed:

For small and owner-led businesses that need a clearer website, a better
way to handle everyday tasks, or less repetitive work.

Opening service directory:

- Websites & Web Development: Clear information and routes to enquiry.

- Apps & Digital Tools: Quoting, booking and everyday tasks.

- Automation & AI: Connected systems and repetitive work.

Accountability/location cues:

- Based in Hartlepool / Working across Teesside and the North East.

- Work directly with Dave / I design and build your project.

Below the opening: open service expansion, direct-Dave statement,
engineering principles, substantial regional coastal image, final
conversion and editorial footer. Existing V1 Home sections were
superseded by the approved Implementation 4 narrative; do not restore
old card grids, automated Health Check or demo evidence sections.

Service expansion copy includes:

- Clear, fast websites built around what your business actually needs to
  do.

- Focused tools that replace awkward processes and make everyday work
  easier to manage.

- Practical automation for repetitive work, with AI used where it
  genuinely adds value.

Engineering framing: use the right technology for the job and build
important details in from the start. Principles: clear scope before
complexity; performance/accessibility within the build; sensible
security implementation; maintainability for the person living with the
system afterwards. Do not elevate these into unsupported certification
or formal audit claims.

**Founder chronology and pending About content**

Never collapse the history into continuous professional web-development
experience since 2005.

- Around 2005-2007: early web-development work.

- Career then moved away from software, including construction. Do not
  invent technical lessons, dates or credentials from that period.

- Roughly 2010-2021: professional tattoo artist and studio owner, around
  eleven years. Relevant connections are interpreting briefs, visual
  judgement, precision, client communication and direct accountability.

- From 2022: formal return to technical work through study. Ongoing
  Computer Science/AI study follows an earlier Cyber Security pathway.
  Do not present an unfinished degree as completed or invent
  professional security qualifications.

Approved background context in earlier content decisions includes Open
University BSc (Hons) Computer Science with AI and approximately two
years on a BSc (Hons) Cyber Security pathway. The latest About pass
deliberately uses broader, factual study wording. Do not insert degree
titles/institution into its copy merely because an older specification
contains them.

Pending About order:

1.  About; solo consultancy framing and Hartlepool location.

2.  2005-2007: Technology was part of the story before Teesside Digital
    existed. Early web work and departure from software.

3.  2010-2021: For around eleven years, the work was visual,
    client-facing and precise. Tattoo/studio narrative and three
    staggered fragments about understanding intent,
    precision/accountability and running a client-facing business.

4.  2022-present: From 2022, Dave returned formally to technical work
    through Computer Science study. Current study spans Computer
    Science, software/web development, AI and security principles. It
    adds technical foundation to understanding the problem and building
    something understandable afterwards.

5.  The career path was not linear. The working principles are. Four
    principles: Design judgement, Technical discipline, Direct
    accountability, Practicality.

6.  You work directly with Dave. No account-manager layer; context stays
    with the designer/builder; fewer handoffs; design and technical
    decisions stay connected.

7.  Primary project CTA, secondary review CTA and unchanged editorial
    footer.

The exact paragraphs and four principle definitions are in
src/components/astro/AboutExperience.astro. This is an editorial story,
not a conventional CV/year rail, credential wall, photo biography, card
grid or corporate team page.

**Forms and external behaviour**

Current Contact form is configured for Netlify-style HTML handling and a
honeypot. It has name, email and message validation, plus legacy
optional project/service fields. Current logic prevents native
submission, displays success and disables the submit button **before**
awaiting the POST. It catches fetch failures only in the console and
does not check HTTP acceptance. Therefore local markup/build success
does not demonstrate captured enquiries.

Source form attributes are name="contact" by default, method="POST",
data-netlify="true" and netlify-honeypot="bot-field". The source does
not explicitly include a hidden form-name input. Netlify processing may
inject it into deployed HTML; verify that actual HTML and the submitted
encoded payload rather than assuming the source alone proves correct
capture. Current fetch posts URL-encoded form data to /.

Future Contact and Website Review need distinct, truthful states: idle,
invalid, sending, accepted, rejected and uncertain. Preserve entered
values during failure, prevent duplicate submissions, provide accessible
status/error feedback and a useful recovery path. A successful network
response needs appropriate interpretation; it is not proof Dave received
an email.

Netlify-first is the current receiver recommendation, not final
operational verification. Do not add Resend/Supabase/server
infrastructure speculatively. Dave must verify Netlify detection,
submission storage, notifications, mailbox delivery, spam handling and
privacy/retention facts.

Website Review: required name, email and URL; optional context. Human
review should explain visible/accessible limitations and provide useful
observations without requiring a sale. No automated score, guaranteed
turnaround, exhaustive source/backend inspection, penetration test, WCAG
certificate, SEO campaign, fixes or promised outcomes.

The old browser Website Health Check is CORS-limited. A browser cannot
reliably inspect arbitrary cross-origin pages, server headers, all
accessibility conditions or security posture. Heuristics do not
establish absence of vulnerabilities. If any future feature fetches
user-supplied URLs server-side, SSRF defence is mandatory; never build a
naive proxy.

**Design system and responsive rules**

Foundations are locked: Instrument Sans; Dark by default with Light
option; semantic palette; vertical desktop SiteIndex; visible compact
navigation; approved content/CTA hierarchy; no Work navigation while
withheld.

| **Semantic colour** | **Dark RGB** | **Light RGB** |
|---------------------|--------------|---------------|
| Canvas              | 29 37 44     | 236 239 240   |
| Surface             | 36 46 54     | 243 245 246   |
| Subtle surface      | 44 56 66     | 225 230 232   |
| Main text           | 223 227 230  | 29 42 52      |
| Muted text          | 177 194 208  | 83 99 110     |
| Identity            | 91 127 158   | 91 127 158    |
| Action              | 134 172 200  | 47 89 119     |
| Action hover        | 160 191 214  | 31 64 89      |
| Rule                | 115 139 155  | 173 185 191   |
| Focus               | 191 216 233  | 36 76 106     |
| Error               | 255 168 160  | 161 46 43     |
| Success             | 159 205 175  | 40 101 65     |
| Warning             | 229 194 135  | 121 79 22     |
| Control             | 36 46 54     | 243 245 246   |
| Control border      | 126 147 164  | 107 126 137   |

Source: src/styles/tokens.css. RGB channels let Tailwind opacity
utilities share the semantic source. Do not scatter replacement hex
colours through later pages. --font-display aliases --font-body, not a
separate typeface.

Font: public/fonts/instrument-sans/instrument-sans-variable.woff2,
self-hosted, approximately 88,784 bytes, variable weight 400-700 and
width 75-100, with OFL/source files alongside it. Normal-width
Instrument Sans is used. The source record identifies upstream
Instrument/instrument-sans, commit
7fa22308a3d0c94ee2b3cd537a1196b65db34a3e. No runtime Google Fonts
request. Font display uses swap and the document preloads the font.

Global starting tokens: body 1rem, small 0.875rem, body line-height 1.5,
inline spacing 1rem, section spacing 3rem, reading measure 65ch, layout
maximum 72rem, rules 1px. Approved page-specific compositions
intentionally override starting metrics; do not force everything into
identical sections.

Desktop shell switches at 75rem to a 15rem rail. Smaller viewports use
visible compact navigation, without a hamburger. A single semantic
navigation avoids duplicate focus trees. Rail stickiness is conditional
on sufficient viewport height and content fit, using measured intrinsic
content and a ResizeObserver rather than assuming all screens are tall.

Theme persistence key: td:theme. Initialiser runs early in the document;
valid stored values are only dark/light. No automatic OS preference and
no System control. window.TeessideTheme.get() and .set('dark'\|'light')
are the shared API. Storage failure is caught; selection still works in
the current document. Theme changes disable transitions temporarily and
apply immediately. With JavaScript disabled, static Dark remains usable
and non-functional theme controls stay hidden. A no-JS Light screenshot
produced by test injection does not prove a no-JS theme switch.

Home is cinematic/editorial/image-led, with a soft integrated reading
fade, substantial bridge span/sunset/reflections and open rules/arrows.
Light uses a local misted reading area, not a wash over the entire
image. Mobile keeps readable text, a meaningful image, directory,
accountability and CTAs in the approved order.

About uses an inline-size container and an asymmetric 12-column grid
above 48rem of available container width. Narrow screens retain a single
logical reading order and staggered fragments. Base body is 16px
narrow/18px wide; section margins are 1.5rem/3rem. Major headings and
spacing differ from the tight supplied mock-ups to preserve actual
readability. Relationship heading and explanation occupy separate rows,
with approximately 96px narrow/144px wide separation. This prevents
overlap when text enlarges. Do not compress the approved implementation
into a screenshot-sized fixed canvas.

**Image assets and provenance**

**Current approved hero:**
src/assets/hero/tees-bridge-generated-hero.png.

- Supplied filename: ChatGPT Image Sep 15, 2026, 02_57_37 PM.png.

- Native 1672 x 941, 2,240,322 bytes.

- SHA-256:
  4661be40f6ffbec7bee4b6f1026a535042a5d4d28c490ee66a8fa14929678e0b.

- Generated illustrative visual supplied/approved by Dave, not
  documentary photography, completed-work evidence or an exact record of
  the scene.

- Internal provenance:
  src/assets/hero/tees-bridge-generated-hero.source.md.

- No photographic author, Wikimedia origin, Huw attribution or CC BY 2.0
  licence applies to it. Generation prompt/model/platform licence
  details are not independently verified.

- Supplied PNG retained unchanged. Decorative alt=""; do not add visible
  AI disclosure copy as an unsolicited visual change.

- Desktop crop 50% 100%; narrow crop 75% center, with theme-aware masks.

AtmosphericHeroMedia.astro accepts imported ImageMetadata, optional alt
and position. Width list is clamped/deduplicated to native width: this
source yields 480, 768, 1024, 1440 and 1672 candidates. AVIF/WebP plus
JPEG fallback; eager/high-priority/async decoding; intrinsic dimensions
and reserved geometry. The source cannot produce a genuine 2560px
candidate despite a general code comment about retaining one. Do not
upscale artificially. Preserve the approved source and crop unless Dave
authorises a new visual pass.

**Regional image:** src/assets/home/hartlepool-coastal-release.png,
provenance hartlepool-coastal-release.source.md; original ChatGPT Image
Sep 25, 2026, 12_31_42 PM.png, SHA-256
8a36cd5e33ace43468ad9a28390da032cd9f1678df2969f3830001c90b37517e. Also
generated atmospheric imagery, not documentary geography.
RegionalImageRelease.astro uses lazy Picture, AVIF/WebP/JPEG,
native-width-clamped responsive candidates, central desktop crop and 75%
horizontal narrow crop. A short top fade joins the canvas; decorative
empty alt and hidden in forced colours. Its source dimensions should be
read from image metadata if needed rather than inferred from the
reference display.

The superseded Middlesbrough_Transporter_Bridge.jpg and its provenance
were removed before the Implementation 3 commit: both were introduced
during that uncommitted work and no longer had production consumers. Do
not restore the earlier 960 x 638 real photograph or attach its licence
to the generated replacement.

**Motion and interaction**

Home and Services motion are approved. Do not refine timing/effects
merely while taking over.

- Native Web Animations API and IntersectionObserver; finite, once-only
  entrance effects and cancellation/fallback handling.

- No animation library, React hydration, continuous scroll loop,
  parallax, pinned storytelling or blanket fade-up pattern.

- Baseline content is readable without animation JavaScript. Motion is
  enhancement, not a hidden-content dependency.

- Reduced motion, forced colours, focus, visibility/lifecycle and print
  paths must preserve immediately usable final composition.

- Hash/deep-link entry must not obstruct native anchor positioning/focus
  or run inappropriate opening choreography.

- Shared advancing-rule interaction keeps text fixed, moves arrow by
  approximately 7px, and advances the rule by a bounded amount. Pointer
  hover applies only to an appropriate fine pointer; keyboard
  focus-visible remains explicit. Reduced motion/forced colours remove
  travel.

- Shared editorial motion uses 210ms micro, 400ms structural and 900ms
  settle categories. Earlier token/spec timings are not permission to
  overwrite the approved coordinator constants.

- Home desktop image settle is approximately 900ms, mobile 774ms; H1
  480ms with 100ms delay, copy 300ms with 280ms delay. Later scenes have
  individually authored grouping/timing.

- Services has one route coordinator, asymmetric service chapter
  treatments, bounded clip/rule cues, a quiet fit section and an
  always-readable AI suitability statement. No new imagery or library.

- About currently has no entrance coordinator. Adding one is a separate
  future task after static approval.

**SEO and discovery**

BaseLayout.astro and src/lib/seo.ts provide metadata, canonical links,
social metadata and JSON-LD. Sitemap/robots exist. This is a foundation,
not a completed SEO cleanup.

- Home passes a title already including the brand, while the helper adds
  it again: current duplication is Teesside Digital - Websites, business
  tools and practical automation \| Teesside Digital.

- Organisation/schema constants still carry legacy positioning and
  unverified facts/links.

- Schema logo references /images/logo.svg; the actual mark is under
  public/images/logo/teesside-digital-mark.svg. Verify/update through
  the SEO cleanup task.

- Automatic sitemap still exposes legacy Work/service routes.

- Robots allowing crawling is not preview access control;
  protect/index-control unpublished previews deliberately.

- Social preview assets and legal/accessibility claims need
  reconciliation with final content.

**6. Deployment & infrastructure**

Configured canonical domain: https://teessidedigital.uk. Netlify forces
https://www.teessidedigital.uk/\* to the apex with a 301 before its
catch-all custom 404 rule. force = true deliberately redirects even
requests matching a real file.

netlify.toml:

- Build: npm run build.

- Publish: dist.

- Dev command: npm run dev, port 3000.

- node_bundler = "esbuild"; no current serverless functions found.

- Missing-route rule: /\* to /404.html, HTTP 404. This is not an SPA
  fallback.

- HTML processing enabled for Netlify form detection.

- Production NODE_ENV=production; deploy-preview and branch-deploy
  NODE_ENV=development. Those settings alone do not prove how Astro
  production flags, preview indexing or form handling behave.

Declared security headers: X-Content-Type-Options: nosniff,
X-Frame-Options: SAMEORIGIN, X-XSS-Protection: 0, Referrer-Policy:
strict-origin-when-cross-origin, and permissions disabling
geolocation/microphone/camera/payment. CSP/HSTS are not declared in this
file. Provider-added headers are unknown; inspect actual deployment
before making conclusions about effective headers.

Cache declarations: one year immutable for /assets/\*, JS and CSS
patterns; one week for /images/\*; one hour for / and HTML patterns.
Astro emits hashed files under /\_astro/; confirm actual Netlify pattern
matching/headers instead of assuming the configured /assets/\* rule
covers them. Future CSP must accommodate deterministic emitted inline
theme/schema/form code through a deliberate policy, not simply break it.

Not independently verified in this task:

- Netlify site ID, account/plan, dashboard settings, Git-connected
  production branch or automatic deploy behaviour.

- Current deployed commit, production freshness, deploy-preview/branch
  URLs.

- DNS provider, records, certificate state and email/MX configuration.

- Form detection, stored submissions, spam settings, notifications and
  mailbox delivery.

- Actual response headers, cache behaviour and canonical/404 responses.

All are UNKNOWN - needs verification. No deployment, DNS change, push or
launch is authorised by this handover. No GitHub Actions CI workflow was
found in the inspected project files; do not assume one exists because
GitHub is the remote host.

**7. Decisions & rationale**

1.  **Keep Astro/static-first.** Mostly editorial content benefits from
    pre-rendered HTML and build-time images. Native enhancement avoids
    paying hydration/runtime costs for static content. Astro 7 was an
    approved security compatibility change, not a redesign framework
    migration.

2.  **Keep tooling reproducible.** Node 24, npm lockfile and explicit
    diagnostics were established before visual work. Implementation 0
    was tooling-only. Larger dependency remediation requires a separate
    reviewed scope.

3.  **Retain Tailwind 3/PostCSS and justified existing React support.**
    Neither wholesale React removal nor Tailwind major migration was
    approved. Unused-looking legacy components may still serve remaining
    V1 routes.

4.  **One coherent service proposition.** Websites, tools and automation
    address related business tasks. Security belongs in engineering
    standards; broad security consultancy claims exceed available proof.

5.  **Direct accountability.** This is Dave's solo consultancy. Avoid
    account managers, teams, agency scale and invented operational
    capacity.

6.  **Semantic Dark/Light.** One token system, self-hosted Instrument
    Sans and immediate theme changes keep visual consistency and
    reliable preference behaviour. Dark-first is deliberate, not
    OS-derived.

7.  **Structural SiteIndex.** The desktop rail is a deliberate
    navigation/composition datum. Compact navigation remains visible and
    accessible; no hamburger or duplicate mobile nav tree.

8.  **Static acceptance before motion.** Home and Services were approved
    statically, then motion was applied separately. About follows the
    same boundary. Never hide a weak layout with animation.

9.  **Generated atmospheric imagery.** Dave explicitly approved the
    bridge and coastal assets to support the cinematic editorial
    direction. Internal provenance is truthful; imagery is not portfolio
    evidence or documentary proof.

10. **Hard Work gate.** Demonstrations are not client outcomes. Evidence
    and truthful disclosure precede publication. Navigation hiding alone
    is insufficient.

11. **Human review instead of unreliable automated scanner.** A bounded
    manual review can produce useful observations without CORS-limited
    scoring or invented security assurance.

12. **Deferred migration responses.** Exact 301/404/410 behaviour for
    obsolete URLs needs a deliberate decision and deployed verification.
    A proposed src/pages/work/\[...path\].astro mechanism is a
    recommendation, not an immutable requirement; verify it against
    Astro 7 static output, or propose a simpler robust approach without
    weakening publication guarantees.

The final font, palette and generated hero were once deferred but are
now resolved and locked. Form receiver operations, Work launch status,
legacy responses, security headers and launch remain unresolved. Do not
read an earlier deferred list as permission to reopen resolved
approvals.

**8. Archive / abandoned ideas**

- V1 broad Web Engineering + AI/Automation + Cybersecurity proposition:
  replaced by the approved three practical service families.

- Repeated agency/SaaS cards, bento grids, fake terminals, meaningless
  code backgrounds, glowing blobs, glassmorphism, laptop mock-ups,
  decorative WebGL and generic reveal repetition: not the approved
  visual vocabulary.

- Earlier creative territory options and the first restrained right-hand
  hero image field: superseded by the approved V2.1 integrated image-led
  composition. Retain their documents as history, not new tasks.

- Real 960 x 638 bridge photograph and placeholder wording such as Image
  placeholder / Local photograph awaiting selection: superseded and
  removed from the approved opening. No artificial upscaling or invented
  photographic detail was approved.

- Old Header/Navigation/MobileMenu architecture: replaced by SiteIndex;
  do not reintroduce it.

- Old Home automated Health Check/demo project sections: superseded by
  the complete approved Home narrative.

- QuoteFlow and SiteGuard as launch portfolio evidence: not approved.
  North East Joinery is conditional, not automatically publishable
  because a demo URL exists.

- Supabase, Resend, Fathom, Sentry, client portal, payments and
  production AI calls: historical possibilities, not implemented scope.

- Continuous experience since 2005, completed academic credentials,
  fabricated metrics/testimonials and team language: explicitly rejected
  credibility shortcuts.

- React removal, route overhaul, broad dependency cleanup, major
  Tailwind upgrade and new animation libraries: not authorised as
  incidental cleanup.

**9. Known issues, bugs, and blockers**

| **Priority**           | **Issue and evidence**                                                                                                                                                          | **Reproduction / next handling**                                                                                                                                                                                                           |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CRITICAL before launch | Contact displays Message Sent before acceptance. src/components/astro/ContactForm.astro, approximately lines 301-319: success first, background fetch, no response-status check | Fill valid fields and block/fail the POST in a controlled local test; UI can still claim success. Build an honest acceptance/recovery flow in its approved phase; do not submit test messages to external recipients without authorisation |
| HIGH before launch     | Work withheld in navigation but /work and three case studies still render and enter sitemap                                                                                     | Build and inspect dist, sitemap and direct routes. Complete hard output/discovery gate; exact migration response remains deferred                                                                                                          |
| HIGH credibility       | Legacy case-study templates say completed while src/data/work.ts says in development; old demo/security claims exceed proof                                                     | Compare src/pages/work/\[slug\].astro with data. Do not publish or invent missing evidence                                                                                                                                                 |
| HIGH conversion        | /website-review/ does not exist despite approved secondary CTAs                                                                                                                 | Follow a review CTA locally: intentional development 404. Implement before launch, without converting it to an automated Health Check                                                                                                      |
| HIGH content           | Old /services/cybersecurity, legacy constants/schema and Contact copy conflict with approved solo/three-service positioning                                                     | Inspect legacy routes/data/constants. Resolve through consolidation, content and SEO work rather than accidental cleanup in About                                                                                                          |
| HIGH approval          | About static implementation awaits visual approval                                                                                                                              | Review retained desktop/mobile Dark/Light screenshots and actual route. resume is not approval                                                                                                                                             |
| HIGH operational       | Forms/legal/DNS/current deployed revision cannot be proven from source                                                                                                          | Verify actual Netlify/dashboard/mailbox and legal facts before launch                                                                                                                                                                      |
| MEDIUM SEO             | Duplicate Home brand title, incorrect schema logo path, legacy sitemap routes, unverified social/business facts                                                                 | Inspect built head/JSON-LD/sitemap. Correct in SEO/publication work                                                                                                                                                                        |
| MEDIUM configuration   | trailingSlash: 'never' versus slash-bearing new links/canonicals; cache patterns versus /\_astro/; preview indexing                                                             | Verify generated and deployed behaviour, then make reviewed decisions                                                                                                                                                                      |
| MEDIUM diagnostics     | Historical build warning about React integration/Vite deprecated esbuild/optimizeDeps behaviour                                                                                 | Retain warning context. Do not major-upgrade dependencies merely to remove warning text                                                                                                                                                    |
| LOW diagnostics        | Historical Astro hints for ContactForm.astro script define:vars around line 246 and JSON-LD script in BaseLayout.astro around line 182                                          | Not reported as errors; assess when those systems are scoped                                                                                                                                                                               |
| LOW debt               | Repository-wide V1 formatting and stale documentation/package description                                                                                                       | Do not run broad formatting or rewrite unrelated files during a focused phase                                                                                                                                                              |

**About text enlargement and CLS evidence**

Historical About verification recorded normal-page CLS of 0. At 200%
text, the harness deliberately enlarged computed font sizes after page
load. Its layout-shift totals were approximately 0.6762337279 at 390px
Dark and 0.5936146903 at 1440px Light. Those raw numbers must not be
omitted or represented as passing initial-load CLS.

They include the deliberate test-induced reflow, so they also do not by
themselves establish spontaneous initial-load instability. The retained
layout checks reported no overflow/overlap and adequate separation at
enlarged text. Before describing About as production-ready, review
genuine browser text enlargement and initial-load CLS separately; do not
dismiss the figures without understanding the harness. Targets remain
LCP \< 2.5s, CLS \< 0.1 and INP \< 200ms. Fresh Lighthouse/field
performance and real-device/screen-reader results were not established
in this handover.

**Tooling pitfalls**

- Historical Astro telemetry error: EPERM: operation not permitted,
  mkdir 'C:\\Users\\david\\AppData\\Roaming\\astro\\Config'. This can be
  a telemetry filesystem permission problem, not a source failure.
  Disable/reconfigure telemetry or obtain the appropriate permission; do
  not claim the application is broken without isolating it.

- Stale Astro/Tailwind dev-server state has previously made valid
  utilities appear missing. Check production output and restart an old
  server before rewriting correct source.

- A resized browser window is not proof of its content viewport. Measure
  window.innerWidth and innerHeight in responsive QA.

- Netlify local preview/HTML does not prove hosted form capture or email
  delivery.

- A no-JS screenshot with theme attributes injected by a harness is not
  a user-operable no-JS Light control.

**10. TODOs & next steps**

**Immediate task**

1.  Read this handover, AGENTS.md, current Git status/diff and the
    pending About source.

2.  Preserve both About changes. Do not reset, clean, restore, format
    broadly or assume the tree is disposable.

3.  Present/review the static About result and resolve Dave's requested
    corrections only if any are explicitly given.

4.  Obtain explicit static approval before its commit. No exact About
    commit message has yet been authorised in the accessible latest
    instructions; do not invent an approval record.

5.  About motion, Contact or another implementation phase requires a new
    explicit task. Handover is not that task.

**Remaining roadmap, subject to phase authorisation**

1.  About static approval/checkpoint, then separately scoped restrained
    motion if requested.

2.  Truthful Contact page and reliable form acceptance/recovery; verify
    receiver operations.

3.  Bounded manual Website Review page/form and delivery workflow.

4.  Prepare genuine demonstration evidence; implement hard Work
    output/sitemap/discovery gate and decide launch status.

5.  Verify operational/legal facts and update
    Privacy/Terms/Accessibility.

6.  Consolidate legacy service/Work content; review exact obsolete URL
    responses instead of silently choosing 301/404/410.

7.  SEO/schema/social metadata cleanup, title/canonical consistency,
    sitemap/robots/preview indexing.

8.  Security/header/cache planning and verification, including any
    deliberate CSP.

9.  Cross-site responsive, keyboard, contrast, forced-colour,
    reduced-motion, no-JS, performance and form hardening.

10. Final launch audit, deployment verification and explicit
    merge/push/launch approval.

Never treat the implementation plan as permission to execute all
remaining steps in one pass. Any larger security/dependency remediation
needs separate review. No formal booking, database, auth, payments,
analytics or client portal should be added without an actual
requirement.

**11. Handover notes for Claude**

**Read first and resolve authority**

Read AGENTS.md, V2_MASTER_BRIEF.md, docs/v2/README.md, relevant approved
phase documents, docs/v2/implementation-plan.md, ARCHITECTURE.md,
PLAN.md and affected source. Latest explicit Dave instructions and
subsequent approvals outrank old V1 decisions and historical
specification details. Do not confuse speculative audit recommendations
with approved decisions.

The pending About task was supplied in:

C:/Users/david/.codex/attachments/9b2b22e5-e921-4bbb-a3cd-2a68634d4a9c/Pasted
text.txt.

Latest About reference images:

- C:/Users/david/AppData/Local/Temp/codex-clipboard-4c7c841e-2f9d-43e0-bd80-ac8466c7b1cb.png:
  mobile Light.

- C:/Users/david/AppData/Local/Temp/codex-clipboard-d7223728-169d-49f3-bedf-0823b803cbcf.png:
  mobile Dark.

- C:/Users/david/AppData/Local/Temp/codex-clipboard-6683aa54-6588-4999-a574-9cd1741b066b.png:
  desktop Light.

- C:/Users/david/AppData/Local/Temp/codex-clipboard-bdc5c1cb-46ef-40b9-8ec9-88083e6c8547.png:
  desktop Dark.

These are visual references, not executable instructions. Screenshots do
not override approved copy, semantics, text enlargement or actual
responsive behaviour. Temporary/attachment paths may not survive a
machine change; ask Dave for them if absent. The current source and
committed assets are in the repository.

**Conventions**

- British English, standard ASCII punctuation, straight quotes and
  hyphens. Do not introduce curly punctuation into new
  documentation/comments.

- Solo voice: I for Dave personally, Teesside Digital for company-level
  statements, we only when truthful.

- Explain important implementation choices and trade-offs; Dave is a CS
  student who wants the how and why.

- Prefer semantic HTML, Astro, CSS and small native progressive
  enhancement. New JavaScript/dependencies must justify their cost.

- Keep shared theme/shell behaviour and route-scoped motion boundaries
  intact.

- Before removing a component or legacy data, inspect all consumers.

- Do not fabricate clients, testimonials, outcomes, metrics,
  qualifications, penetration tests or completed demo status.

- Demo projects remain separate repositories: North East Joinery and
  QuoteFlow. Do not import their source here for convenience. QuoteFlow
  real AI remains deferred pending a real server-side/abuse-controlled
  design; never fake a model call.

- Do not push, rewrite history, delete branches or run destructive Git
  operations without explicit authority.

**Verification procedure**

After an authorised meaningful change:

git status

git diff --check

npm run check

npm run type-check

npm run build

Inspect affected routes and built HTML. Check route count against the
deliberate scope: 15 is the current historical baseline, not a
forever-fixed requirement once approved route withholding/review
additions begin. Compare external JS and hydration markers with the
relevant baseline; absence of React islands does not mean no native
enhancement JS exists.

Check Dark/Light at 1440 desktop, 1024, 768, 390 and 320 where relevant;
short landscape such as 844 x 390 and 1440 x 390; 200% text; keyboard
focus/order; forced colours; reduced motion; JavaScript disabled;
overflow; browser console; image readiness/reserved sizing; CLS.
Preserve native anchor/hash behaviour and motion cancellation. Do not
fix unrelated V1 debt during a scoped check.

Distinguish verified static output from actual Netlify behaviour.
Receiver acceptance, submission storage, notifications and email
delivery each require their own evidence. Targets: WCAG 2.2 AA, LCP \<
2.5s, CLS \< 0.1, INP \< 200ms; intended Lighthouse Performance \>= 90,
Accessibility/Best Practices/SEO \>= 95. Do not imply these targets have
all been measured successfully.

**Historical local evidence, not fresh handover test runs**

No build, browser or performance suite was rerun to prepare this
document. The following are retained previous evidence and must be
refreshed after a source change.

- Services motion final gate: Astro check passed with 0 errors/0
  warnings and 2 hints; type-check passed; production build emitted 15
  pages. No new hydration, unchanged existing external JS bundle bytes,
  no reported horizontal overflow, and Home choreography preserved.
  Services coordinator was approximately 3,253 raw bytes / 1,477 gzip
  bytes in that review.

- Motion review reported zero sequence CLS and no sequence long tasks;
  one approximately 75ms startup task occurred before the coordinator in
  a short viewport. Do not call that a universal zero-long-task result.

- About verification: 13 cases, no listed browser errors/failures;
  Dark/Light desktop/mobile, 320px, tablet, landscape, focus, forced
  colours, no JS, enlarged text and unrelated Home/Services/Contact
  geometry regression checks. No new JS/hydration. See the separate
  enlarged-text CLS caveat above.

- Existing external bundle filenames in retained build comparisons
  included client.-9uqbdYw.js and page.Dwipeu-R.js; hashes may change in
  future authorised builds. Compare actual bytes/consumers, not a
  permanently hard-coded filename expectation.

Evidence roots:

| **Absolute path**                                                        | **Contents**                                                                                                                                                   |
|--------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| C:/Users/david/AppData/Local/Temp/td-implementation-5/share/             | Home motion contact sheets: 01-opening-dark.png, 02-opening-light.png, 03-desktop-scenes.png, 04-mobile-dark.png, 05-reduced-motion.png, 06-advancing-rule.png |
| C:/Users/david/AppData/Local/Temp/td-implementation-6b/                  | Services motion review/check artefacts; inspect actual filenames on disk                                                                                       |
| C:/Users/david/AppData/Local/Temp/td-implementation-7/index.html         | About review gallery                                                                                                                                           |
| C:/Users/david/AppData/Local/Temp/td-implementation-7/verify.cjs         | About browser verification harness                                                                                                                             |
| C:/Users/david/AppData/Local/Temp/td-implementation-7/regression.cjs     | Unrelated-route regression harness                                                                                                                             |
| C:/Users/david/AppData/Local/Temp/td-implementation-7/results.json       | Main About results                                                                                                                                             |
| C:/Users/david/AppData/Local/Temp/td-implementation-7/extra-results.json | Additional About results                                                                                                                                       |
| C:/Users/david/AppData/Local/Temp/td-implementation-7/baseline-dist/     | Retained baseline output for comparison                                                                                                                        |

About main screenshots include about-1440-dark.png,
about-1440-light.png, about-390-dark.png, about-390-light.png, plus
section views and edge-case variants. Use the gallery for the exact
available set.

Services motion evidence includes results.json, extra-results.json,
gate-results.json and commit-results.json under td-implementation-6b.
Earlier review roots also remain under
C:/Users/david/AppData/Local/Temp/: td-implementation-3-final-review,
td-implementation-4, td-implementation-4-commit-audit and
td-implementation-6. These are local evidence, not source or deployment
URLs. Use the explicit user Temp path: an assistant shell's Env: Temp
can point somewhere else.

Previous Windows browser automation used Edge through a bundled
Playwright runtime at
C:/Users/david/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright.
This is tooling from the assistant environment, not a declared
dependency or guaranteed installation in Claude's environment. Use
existing suitable tooling or ask before adding a project test dependency
solely to reproduce screenshots.

**Questions before changing anything**

Confirm the next authorised phase and whether About static is approved
or needs specific corrections. Do not ask Dave to reapprove already
locked palette/type/hero/shell/Services/Home decisions. Ask only where a
real missing decision blocks the requested work: receiver operations,
evidence publication, migration response, legal fact or launch
authority. Routine read-only inspection can continue without another
permission loop.

**12. Open questions for Dave**

1.  Is the current static About implementation approved, or what exact
    corrections are required? Has any review occurred outside the
    accessible conversation?

2.  After About approval, should the next explicit task be About motion
    or Contact/Website Review? Which task identifier and commit gate
    should Claude use?

3.  Is Netlify Forms the selected actual receiver, and who can verify
    dashboard detection, notifications, mailbox delivery, spam and
    retention?

4.  What are the verified business/legal details: trading identity,
    address publication preference, contact details, company/sole-trader
    status, VAT status where applicable, privacy processors and
    retention periods?

5.  What is the current Netlify site/production branch/deployed commit,
    and are there review URLs Claude should inspect? Which DNS/email
    providers are in use?

6.  Should Work remain withheld at launch? If North East Joinery is
    considered, what actual evidence/disclosure/status is approved?
    QuoteFlow/SiteGuard must not be inferred to qualify.

7.  What exact migration responses should obsolete service and Work URLs
    receive? This remains deliberately undecided.

8.  Can the generation/platform rights for the two supplied generated
    images be confirmed for commercial website use? The repository
    records generated provenance but does not invent licence terms.

9.  Are analytics needed at launch? If yes, choose the
    operational/privacy requirements before adding a provider.

10. Are the temporary review galleries/scripts/reference attachments to
    be preserved for Claude? If unavailable on the takeover machine,
    provide the About brief, four About reference images,
    td-implementation-7 gallery/results and any requested earlier motion
    evidence.

The actual repository was accessible. No source/configuration/asset
access gap prevented this handover. The unknowns are primarily
approvals, deployment/dashboard state, legal/operational facts and
third-party generation terms. Preserve the approved local work and the
pending About changes; continue only with Dave's next scoped
instruction.

http://localhost:3000/
