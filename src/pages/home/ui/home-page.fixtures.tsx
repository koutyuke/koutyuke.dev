import type { ComponentProps } from "react";

import type { HomePageUI } from "./home-page.ui";

type HomePageUISlots = ComponentProps<typeof HomePageUI>["slots"];

type MockSectionProps = {
  label: string;
  minHeight?: string;
};

function MockSection({ label, minHeight = "min-h-64" }: MockSectionProps) {
  return (
    <section
      className={`${minHeight} grid place-items-center border-0 border-y border-slate-5/33 bg-slate-2 px-6 text-sm font-medium text-slate-11`}
    >
      {label}
    </section>
  );
}

export const mockHomePageSlots = {
  HeroSection: <MockSection label="HeroSection slot" minHeight="min-h-screen" />,
  AboutSection: <MockSection label="AboutSection slot" />,
  FootprintsSection: <MockSection label="FootprintsSection slot" />,
  ContactSection: <MockSection label="ContactSection slot" />,
  FooterSection: <MockSection label="FooterSection slot" minHeight="min-h-24" />,
} satisfies HomePageUISlots;
