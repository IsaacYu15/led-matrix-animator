export interface NavSection {
  name: string;
  href: string;
}

export const NavSections: NavSection[] = [
  { name: "Home", href: "/dashboard" },
  { name: "Modules", href: "/dashboard/modules" },
  { name: "Layout", href: "/dashboard/layout" },
  { name: "Animator", href: "/state-machine" },
];
