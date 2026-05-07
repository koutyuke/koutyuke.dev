import { AboutSection } from "../../../widgets/about";
import { ContactSection } from "../../../widgets/contact";
import { FooterSection } from "../../../widgets/footer";
import { FootprintsSection } from "../../../widgets/footprints";
import { HeroSection } from "../../../widgets/hero";
import { HomePageUI } from "./home-page.ui";

export const HomePage = () => {
  return (
    <HomePageUI
      slots={{
        HeroSection: <HeroSection />,
        AboutSection: <AboutSection />,
        FootprintsSection: <FootprintsSection />,
        ContactSection: <ContactSection />,
        FooterSection: <FooterSection />,
      }}
    />
  );
};
