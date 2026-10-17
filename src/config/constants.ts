/**
 * Site-wide facts and switches. Every value that is still to be confirmed by
 * Dave lives here or in src/data/, with a safe default: empty strings and
 * false flags hide the content that depends on them, so nothing unconfirmed
 * reaches the live site. CONTENT-TBC.md lists each one.
 */

export const SITE = {
  title: "Teesside Digital",
  description:
    "Websites, apps and software for businesses across Teesside, designed and built by one person in Hartlepool.",
  url: import.meta.env.PROD
    ? "https://teessidedigital.uk"
    : "http://localhost:3000",
  language: "en-GB",
  author: "Dave",
  email: "dave@teessidedigital.uk",
  // The dedicated business line, written as it should be read, with spaces.
  // Leave it empty until that line exists: while it is empty, every phone
  // pill and call button is left out.
  phone: "",
  // The hero availability badge, for example "Taking on new projects for
  // November". Empty hides the badge.
  availability: "Taking on new projects",
  // The Home H1. The last word is shown in lime.
  headline: "Software that fits how your business works.",
  // A real photograph of Dave, as a path under public/, for example
  // "/images/dave.jpg", and its description. While src is empty, the photo
  // slots show a designed panel with the mark instead.
  portrait: { src: "", alt: "" },
  // The opening paragraph on About.
  introAbout:
    "I run Teesside Digital from Hartlepool. I design, build and look after websites, apps and software for businesses across Teesside, and you deal with me from the first chat to long after launch.",
  // Working hours shown on Contact, for example "Monday to Friday, 9am to
  // 5pm". Empty hides the row.
  hours: "",
  // The reply-time promise, completing "I'll reply ...". Rendered as a
  // sentence on the Contact lede and the Home contact section. Empty leaves
  // it out.
  replyTime: "within two working days",
  // Care plan detail added to step 4 of "How I work", as a full sentence.
  // Empty uses the base sentence only.
  carePlan:
    "Care plans start from £30 a month and cover hosting, security updates, backups, uptime checks and small changes when you need them.",
  // True once Dave has confirmed that clients own what he builds. While false,
  // the "Yours" fact is hidden and the FAQ answer is softened.
  ownershipConfirmed: true,
  // True once Dave has approved the Background timeline on About
  // (entries in src/data/background.ts).
  aboutBackgroundConfirmed: true,
  // "Tools I use" on About. An empty list hides the section.
  tools: [
    "Python",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "HTML and CSS",
    "Tailwind CSS",
    "Astro",
    "SQL",
    "APIs",
    "Git",
    "Netlify",
    "Playwright",
    "Claude",
    "ChatGPT",
    "Other AI models",
  ] as string[],
};

/** A tel: link for a phone number written with spaces. */
export function telephoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** The reply-time sentence, or nothing while SITE.replyTime is empty. */
export const replySentence = SITE.replyTime ? `I'll reply ${SITE.replyTime}.` : "";
