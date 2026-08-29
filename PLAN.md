\# TEESSIDE DIGITAL — PROJECT MASTER PLAN



\## PROJECT OVERVIEW



Teesside Digital is a solo-operated technology consultancy based in Hartlepool. The website is the first portfolio piece.



\*\*URL:\*\* teessidedigital.uk

\*\*Founder:\*\* Dave (Computer Science student, former tattoo artist, former construction worker)

\*\*Positioning:\*\* "Precision engineering for small businesses" — direct access to the developer, security-conscious, technical but human.



\---



\## NON-NEGOTIABLE RULES



\- \*\*Language:\*\* British English (colour, organise, centre, licence/practice)

\- \*\*Punctuation:\*\* Standard ASCII only. No em dashes (—), no Unicode ellipsis (…), no fancy quotes.

\- \*\*Tone:\*\* Confident, direct, honest, approachable. No corporate waffle. No buzzwords ("bespoke", "cutting-edge", "leveraging synergy").

\- \*\*Accessibility:\*\* WCAG 2.2 AA target. Semantic HTML, labelled forms, keyboard nav, visible focus, reduced-motion support.

\- \*\*Security:\*\* No fake claims. Health check is NOT a full security audit. Label demo projects clearly.



\---



\## DESIGN SYSTEM



\### Colours

| Name | Hex | Usage |

|------|-----|-------|

| Background | `#0a0a0a` | Main page background |

| Surface | `#161616` | Cards, sections |

| Surface Raised | `#222222` | Hovers, dropdowns |

| Text Primary | `#f0f0f0` | Headings, body |

| Text Secondary | `#9a9a9a` | Subtext, metadata |

| Accent | `#5b7f9e` | Buttons, links, key UI |

| Accent Hover | `#6e93b5` | Button hovers |

| Border | `#333333` | Dividers, borders |

| Status Success | `#4caf50` | Health check "Pass" |

| Status Warning | `#f5a623` | Health check "Warning" |

| Status Error | `#e74c3c` | Health check "Fail" |



\### Typography

\- \*\*Primary Font:\*\* Inter (weights 400, 500, 600, 700)

\- \*\*Fallback:\*\* system-ui, sans-serif

\- \*\*Headings:\*\* h1=3rem/700, h2=2.25rem/600, h3=1.5rem/600, h4=1.25rem/500

\- \*\*Body:\*\* 1rem/400



\### Spacing

\- Container max width: 6xl (72rem)

\- Section padding: py-16 (4rem) desktop, py-12 (3rem) mobile

\- Card padding: md:p-8 (2rem)



\### Borders

\- Radius: default 0.375rem, lg 0.5rem

\- Width: 1px

\- Colour: `#333333`



\---



\## SITE STRUCTURE



\### Pages (MVP)

1\. \*\*Home\*\* (`/`) — 11 sections: Hero, Positioning Strip, Problem, What We Do, Health Check, Why Solo, Process, Recent Work, About Dave, Final CTA, Footer

2\. \*\*About\*\* (`/about`) — Dave's story

3\. \*\*Contact\*\* (`/contact`) — Netlify form + direct email

4\. \*\*Services\*\* (`/services`) — Overview + 3 sub-pages:

&#x20;  - `/services/web-development`

&#x20;  - `/services/ai-automation`

&#x20;  - `/services/cybersecurity`

5\. \*\*Work\*\* (`/work`) — Portfolio grid

6\. \*\*Work Detail\*\* (`/work/\[slug]`) — Dynamic case study pages



\### Header Navigation

\*\*Desktop:\*\* Logo | Services | Work | About | Contact | \[Get a Free Website Review (button)]

\*\*Mobile:\*\* Logo | \[Menu hamburger]



\### Footer

Logo | Quick links | Contact | © 2026 Teesside Digital | Privacy Policy | Accessibility Statement | Terms



\---



\## HEALTH CHECK TOOL



\*\*Location:\*\* Homepage, immediately after "What We Do" section.

\*\*Implementation:\*\* React island (Astro Islands) — client-side only.

\*\*Scope:\*\*

\- URL validation

\- Fetches the target website from the browser (CORS permitting)

\- Analyses: title, headings, images, links, security headers (basic), mixed content

\- Displays: overall score + 4 category scores (Performance, Accessibility, Security, SEO)

\- Shows top issues with priority labels

\- CTA: "Get My Free Website Review" (captures lead)



\*\*Security:\*\* No server-side requests. Browser CORS prevents SSRF. The tool does NOT pretend to be a full security audit.



\---



\## DEMO PROJECTS (Build after site launch)



1\. \*\*North East Joinery\*\* — Premium local business website (5-7 pages)

2\. \*\*QuoteFlow\*\* — AI workflow app (form + AI + output)

3\. \*\*SiteGuard\*\* — Security dashboard (mock data + UI)



\---



\## TECH STACK



| Layer | Technology |

|-------|------------|

| Framework | Astro 5 |

| Styling | Tailwind CSS 4 |

| UI Islands | React 18 (for Health Check only) |

| Hosting | Netlify |

| Forms | Netlify Forms |

| Email | Gmail SMTP (via Netlify) |

| Analytics | None at launch (server logs) |

| Version Control | GitHub |



\---



\## COMPONENT ARCHITECTURE



