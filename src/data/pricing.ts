/**
 * Price guide figures. These are the reference design's placeholder numbers.
 * While `confirmed` is false the whole price guide, its nav and menu links and
 * the FAQ's mention of it stay off the site. Set it to true only once Dave has
 * replaced or approved every figure.
 */

export type ProjectType = "web" | "app" | "auto" | "soft";
export type Range = readonly [number, number];

export const pricing = {
  confirmed: false,
  types: [
    { value: "web", label: "Website", noun: "website", need: "website" },
    { value: "app", label: "Web or mobile app", noun: "web or mobile app", need: "app" },
    { value: "auto", label: "Automation", noun: "automation", need: "automation" },
    { value: "soft", label: "Bespoke software", noun: "bespoke software", need: "software" },
  ] as const,
  sizes: ["Small", "Medium", "Large"] as const,
  // Small, medium and large, in pounds.
  ranges: {
    web: [[800, 1500], [1500, 3000], [3000, 6000]],
    app: [[4000, 8000], [8000, 15000], [15000, 30000]],
    auto: [[400, 900], [900, 2500], [2500, 6000]],
    soft: [[2500, 5000], [5000, 12000], [12000, 25000]],
  } as Record<ProjectType, readonly Range[]>,
  extras: [
    { value: "book", label: "Online booking", item: "Online booking", add: [400, 900] as Range },
    { value: "pay", label: "Take payments", item: "Taking payments", add: [300, 700] as Range },
    { value: "acc", label: "Connect to accounts", item: "Connected to your accounts", add: [400, 1000] as Range },
  ],
  carePerMonth: 30,
};

/** Budget answers in the enquiry form. Labels are sent as written. */
export const budgetBands = [
  "Under £1k",
  "£1k–3k",
  "£3k–10k",
  "£10k+",
  "Not sure",
] as const;

export function formatPounds(value: number): string {
  return `£${Math.round(value).toLocaleString("en-GB")}`;
}
