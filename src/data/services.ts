/**
 * The eight services, as shown on Home ("What I build") and on /services/.
 *
 * Typical time and price guide are the reference design's placeholder values.
 * While a service's `confirmed` is false, its meta row hides the time, shows
 * "Price on request" and keeps the tools. Set `confirmed` to true only once
 * Dave has approved that service's figures.
 */

export type Illustration =
  | "web"
  | "app"
  | "soft"
  | "auto"
  | "ai"
  | "int"
  | "sec"
  | "care";

export interface Service {
  /** Anchor on /services/. */
  id: string;
  /** Short key used for the Home tabs and the illustration. */
  key: Illustration;
  name: string;
  /** Lower-case name for "Talk to me about ..." links. */
  linkName: string;
  /** Home panel description. */
  summary: string;
  /** Home panel "Good for" chips. */
  goodForShort: string[];
  /** /services/ pitch. */
  pitch: string;
  /** "What you get". An item marked ownership shows only once ownership is confirmed. */
  whatYouGet: { text: string; ownership?: boolean }[];
  goodFor: string[];
  time: string;
  price: string;
  tools: string;
  confirmed: boolean;
}

export const services: Service[] = [
  {
    id: "websites",
    key: "web",
    name: "Websites",
    linkName: "websites",
    summary:
      "A site that looks right, loads fast and makes it easy for customers to get in touch.",
    goodForShort: ["New businesses", "Outdated sites", "Sites you can't update yourself"],
    pitch:
      "A website that looks right, loads fast and makes it easy for customers to get in touch, on any screen.",
    whatYouGet: [
      { text: "A design made for your business, not a template" },
      { text: "Pages written in plain English" },
      { text: "Works properly on phones" },
      { text: "Contact forms that reach you" },
      { text: "Set up so Google can find you" },
      { text: "Help to update it yourself, if you want" },
    ],
    goodFor: [
      "New businesses",
      "Sites that look dated",
      "Sites you can't update",
      "Sites that don't bring in enquiries",
    ],
    time: "2 to 6 weeks",
    price: "From £800",
    tools: "Astro, modern HTML and CSS, Netlify hosting",
    confirmed: false,
  },
  {
    id: "apps",
    key: "app",
    name: "Web and mobile apps",
    linkName: "web and mobile apps",
    summary: "Apps your customers or staff use every day, on a phone or a computer.",
    goodForShort: ["Bookings", "Customer accounts", "Staff out on jobs"],
    pitch:
      "Apps your customers or staff use every day, on a phone, a tablet or a computer.",
    whatYouGet: [
      { text: "Customer accounts and logins" },
      { text: "Bookings and scheduling" },
      { text: "Tools for staff out on jobs" },
      { text: "Works on iPhone, Android and the web" },
      { text: "Notifications and updates" },
    ],
    goodFor: [
      "Booking-heavy businesses",
      "Teams working on the road",
      "Businesses with repeat customers",
    ],
    time: "6 to 16 weeks",
    price: "From £4,000",
    tools: "Progressive web apps, TypeScript, cloud databases",
    confirmed: false,
  },
  {
    id: "software",
    key: "soft",
    name: "Bespoke software",
    linkName: "bespoke software",
    summary:
      "Tools built around how you already work, instead of bending your business to fit off-the-shelf software.",
    goodForShort: ["Replacing spreadsheets", "Job tracking", "Stock and orders"],
    pitch:
      "Tools built around how you already work, instead of bending your business to fit off-the-shelf software.",
    whatYouGet: [
      { text: "Replaces messy spreadsheets" },
      { text: "Job, stock or order tracking" },
      { text: "Dashboards that show what matters" },
      { text: "Built to grow with you" },
      { text: "You own it", ownership: true },
    ],
    goodFor: [
      "Businesses outgrowing spreadsheets",
      "Unusual processes",
      "Paying for software you only half use",
    ],
    time: "4 to 12 weeks",
    price: "From £2,500",
    tools: "Python, TypeScript, SQL databases",
    confirmed: false,
  },
  {
    id: "automation",
    key: "auto",
    name: "Automation",
    linkName: "automation",
    summary:
      "The repetitive jobs handled for you, so you can get on with the work that pays.",
    goodForShort: ["Payment reminders", "Weekly reports", "Copying data between systems"],
    pitch:
      "The repetitive jobs handled for you, so you can get on with the work that pays.",
    whatYouGet: [
      { text: "Payment and appointment reminders" },
      { text: "Reports that build themselves" },
      { text: "Data copied between systems for you" },
      { text: "Invoices and paperwork generated automatically" },
    ],
    goodFor: [
      "Admin-heavy businesses",
      "Anyone typing the same thing twice",
      "Small teams short on time",
    ],
    time: "1 to 4 weeks",
    price: "From £400",
    tools: "Python, APIs, scheduled jobs",
    confirmed: false,
  },
  {
    id: "ai",
    key: "ai",
    name: "AI tools",
    linkName: "AI tools",
    summary:
      "Practical AI used where it actually saves time, and left out where it doesn't.",
    goodForShort: ["Answering common questions", "Sorting emails", "Summarising documents"],
    pitch:
      "Practical AI used where it actually saves time, and left out where it doesn't.",
    whatYouGet: [
      { text: "An honest look at where AI would help" },
      { text: "Answering common customer questions" },
      { text: "Sorting and drafting replies to emails" },
      { text: "Summarising documents and notes" },
      { text: "Your data handled carefully" },
    ],
    goodFor: ["Busy inboxes", "Repetitive questions", "Lots of documents"],
    time: "2 to 6 weeks",
    price: "Price on request",
    tools: "Leading AI models, connected to your tools",
    confirmed: false,
  },
  {
    id: "integrations",
    key: "int",
    name: "Integrations",
    linkName: "integrations",
    summary: "Get the systems you already pay for talking to each other.",
    goodForShort: ["Website to accounts", "Forms to your customer list", "Stock to your shop"],
    pitch: "Get the systems you already pay for talking to each other.",
    whatYouGet: [
      { text: "Website forms straight into your customer list" },
      { text: "Online shop linked to stock" },
      { text: "Bookings into your calendar" },
      { text: "Sales into your accounts software" },
    ],
    goodFor: [
      "Businesses using several separate tools",
      "Double data entry",
      "Things falling through the cracks",
    ],
    time: "1 to 4 weeks",
    price: "Price on request",
    tools: "APIs, webhooks, secure connections",
    confirmed: false,
  },
  {
    id: "security",
    key: "sec",
    name: "Security reviews",
    linkName: "security reviews",
    summary: "A plain-English check of where you're exposed and what to fix first.",
    goodForShort: ["Before a launch", "After a scare", "Peace of mind"],
    pitch: "A plain-English check of where you're exposed and what to fix first.",
    whatYouGet: [
      { text: "A review of your website and public setup" },
      { text: "Common risks checked" },
      { text: "A clear report with priorities" },
      { text: "Help fixing what matters" },
    ],
    goodFor: ["Before a launch", "After a scare", "Peace of mind"],
    time: "1 to 2 weeks",
    price: "Price on request",
    tools: "Industry checklists, careful manual review",
    confirmed: false,
  },
  {
    id: "care",
    key: "care",
    name: "Support and care",
    linkName: "support and care",
    summary: "Updates, fixes and hosting looked after, so everything keeps working.",
    goodForShort: ["After launch", "Existing sites", "Monthly care plan"],
    pitch: "Updates, fixes and hosting looked after, so everything keeps working.",
    whatYouGet: [
      { text: "Hosting and backups" },
      { text: "Security updates" },
      { text: "Small changes when you need them" },
      { text: "Someone to call when something breaks" },
    ],
    goodFor: [
      "After launch",
      "Existing sites with no one looking after them",
      "Peace of mind",
    ],
    time: "Ongoing",
    price: "From £30 a month",
    tools: "Monitoring, backups, updates",
    confirmed: false,
  },
];
