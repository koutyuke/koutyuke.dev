import type { LucideIcon } from "lucide-react";
import { Footprints, Hand, House, User } from "lucide-react";

export type NavigationItem = {
  href: `#${string}`;
  icon: LucideIcon;
  label: string;
  note: string;
};

export const portfolioNavigationItems = [
  { href: "#top", icon: House, label: "ホーム", note: "Home" },
  { href: "#about", icon: User, label: "私について", note: "About me" },
  { href: "#footprints", icon: Footprints, label: "人生の足跡", note: "Footprint" },
  { href: "#contact", icon: Hand, label: "つながり", note: "Contact" },
] as const satisfies readonly NavigationItem[];

export const externalNavigationLinks = {
  blog: "https://blog.koutyuke.dev",
  design: "https://www.figma.com/design/oRDua7ZeisW6ooQ6IujYpR/koutyuke.dev---design?m=dev",
  sourceCode: "https://github.com/koutyuke/koutyuke.dev",
  twitter: "https://x.com/koutyuke0808",
} as const;
