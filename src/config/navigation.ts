export interface NavigationItem {
  label: string;
  href: string;
}

// Temporary fail-closed shell state. Implementation 9 must replace this with
// the approved evidence gate. A demonstration's 'live' status is not approval.
const workPublication: { state: "withheld" | "approved" } = {
  state: "withheld",
};

export const primaryNavigation: NavigationItem[] = [
  { label: "Services", href: "/services/" },
  ...(workPublication.state === "approved"
    ? [{ label: "Work", href: "/work/" }]
    : []),
  { label: "About", href: "/about/" },
];
export const projectEnquiry = {
  label: "Discuss your project",
  href: "/contact/",
};
// Intentional development 404 until the approved Website Review phase.
export const websiteReview = {
  label: "Free website review",
  href: "/website-review/",
};
export const legalNavigation: NavigationItem[] = [
  { label: "Privacy policy", href: "/privacy/" },
  { label: "Accessibility", href: "/accessibility/" },
  { label: "Terms", href: "/terms/" },
];

export function isCurrentPage(pathname: string, href: string): boolean {
  const normalise = (path: string) => path.replace(/\/+$/, "") || "/";
  return normalise(pathname) === normalise(href);
}
