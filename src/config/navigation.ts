import { pricing } from "../data/pricing";

export interface NavigationItem {
  label: string;
  href: string;
  /** A small mono note after the label in the menu, such as "FREE". */
  note?: string;
}

const HOME = "/";

export function isCurrentPage(pathname: string, href: string): boolean {
  const normalise = (path: string) => path.replace(/\/+$/, "") || "/";
  return normalise(pathname) === normalise(href);
}

/** A Home section link: a same-page anchor on Home, "/#id" everywhere else. */
export function homeSection(pathname: string, id: string): string {
  return isCurrentPage(pathname, HOME) ? `#${id}` : `/#${id}`;
}

/** The centre links of the floating nav. */
export function primaryNavigation(pathname: string): NavigationItem[] {
  return [
    { label: "Services", href: "/services/" },
    { label: "Work", href: homeSection(pathname, "work") },
    ...(pricing.confirmed
      ? [{ label: "Prices", href: homeSection(pathname, "prices") }]
      : []),
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/" },
  ];
}

/** The large links in the menu drawer. */
export function menuNavigation(pathname: string): NavigationItem[] {
  return [
    { label: "Home", href: HOME },
    { label: "Services", href: "/services/" },
    { label: "Work", href: homeSection(pathname, "work") },
    { label: "Live demo", href: homeSection(pathname, "demo") },
    ...(pricing.confirmed
      ? [{ label: "Price guide", href: homeSection(pathname, "prices") }]
      : []),
    { label: "About", href: "/about/" },
    { label: "Website review", href: "/website-review/", note: "FREE" },
    { label: "Contact", href: "/contact/" },
  ];
}

export const footerServices: NavigationItem[] = [
  { label: "Websites", href: "/services/#websites" },
  { label: "Apps", href: "/services/#apps" },
  { label: "Bespoke software", href: "/services/#software" },
  { label: "Automation and AI", href: "/services/#automation" },
  { label: "Security reviews", href: "/services/#security" },
  { label: "Free website review", href: "/website-review/" },
];

export const areas = [
  "Hartlepool",
  "Stockton-on-Tees",
  "Middlesbrough",
  "Darlington",
  "Redcar and Billingham",
];

export const legalNavigation: NavigationItem[] = [
  { label: "Privacy", href: "/privacy/" },
  { label: "Terms", href: "/terms/" },
  { label: "Accessibility", href: "/accessibility/" },
];

export const projectEnquiry = { label: "Start a project", href: "/contact/" };
export const websiteReview = { label: "Free website review", href: "/website-review/" };
