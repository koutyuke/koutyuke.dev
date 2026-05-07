import type { ReactNode } from "react";

type HomePageUIProps = {
  slots: {
    AboutSection: ReactNode;
    ContactSection: ReactNode;
    FooterSection: ReactNode;
    FootprintsSection: ReactNode;
    HeroSection: ReactNode;
  };
};

export const HomePageUI = ({
  slots: { AboutSection, ContactSection, FooterSection, FootprintsSection, HeroSection },
}: HomePageUIProps) => {
  return (
    <>
      <main>
        {HeroSection}
        {AboutSection}
        {FootprintsSection}
        {ContactSection}
      </main>
      {FooterSection}
    </>
  );
};
