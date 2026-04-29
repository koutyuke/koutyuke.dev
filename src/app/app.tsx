import { FloatingNavigation } from "../features/floating-navigation";
import { AboutSection } from "../sections/about/about-section";
import { ContactSection } from "../sections/contact/contact-section";
import { FooterSection } from "../sections/footer/footer-section";
import { FootprintsSection } from "../sections/footprints/footprints-section";
import { HeroSection } from "../sections/hero/hero-section";

export function App() {
  return (
    <>
      <main>
        <HeroSection />
        <AboutSection />
        <FootprintsSection />
        <ContactSection />
      </main>
      <FooterSection />
      <FloatingNavigation />
    </>
  );
}
