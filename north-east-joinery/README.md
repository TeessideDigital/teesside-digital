# North East Joinery (demo project)

A demonstration website for a fictional joinery business, built by Teesside
Digital to showcase design and build quality. It is not a real business and
every page says so.

Read `PROJECT_BRIEF.md` in full before making changes -- it carries the
business identity, design system, honesty rules and known bug patterns.

## Location

This project currently lives as a self-contained Astro site inside the
`teesside-digital` repository. It shares no code, configuration or build with
the parent site; `npm` commands run from this directory. It can be moved to
its own repository by copying this directory wholesale.

## Commands

```
npm install
npm run dev
npm run build
npm run preview
```

## Stack

Astro 5 (static output), Tailwind CSS 3.4.1 (pinned), Netlify (planned).
React 18 will be added as an island when the Quote Request form is built;
nothing on the current pages needs client-side JavaScript.
