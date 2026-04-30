import { AboutSection } from "../../../widgets/about";
import { ContactSection } from "../../../widgets/contact";
import { FooterSection } from "../../../widgets/footer";
import { FootprintsSection } from "../../../widgets/footprints";
import { HeroSection } from "../../../widgets/hero";

export function HomePage() {
  return (
    <>
      <main>
        <HeroSection />
        <AboutSection />
        <FootprintsSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  );
}
