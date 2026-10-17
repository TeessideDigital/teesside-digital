/** The "Background" timeline on About, oldest first. Shown while
 * SITE.aboutBackgroundConfirmed is true. Approved by Dave, 17 October 2026. */
export interface BackgroundEntry {
  when: string;
  title: string;
  text: string;
}

export const background: BackgroundEntry[] = [
  { when: "2005-2007", title: "Early web development", text: "Where it started: building my first websites." },
  { when: "2007-2010", title: "Construction", text: "Hands-on work to real deadlines, budgets and safety standards." },
  {
    when: "2010-2021",
    title: "Ran my own tattoo studio",
    text: "Eleven years of turning clients' ideas into work with my name on it, and running a small business day to day.",
  },
  {
    when: "Alongside",
    title: "Building and taking software apart",
    text: "Mods, plugins and tools, and working out how other people's software worked under the bonnet.",
  },
  {
    when: "2022-now",
    title: "Studying at The Open University",
    text: "Working towards a BSc (Honours) Computer Science with Artificial Intelligence.",
  },
  {
    when: "2026",
    title: "Founded Teesside Digital",
    text: "Set up in Hartlepool to give local businesses a straight-talking developer on their doorstep.",
  },
  { when: "Now", title: "Building QuoteFlow", text: "My own quoting tool for trades, built alongside client work." },
];
