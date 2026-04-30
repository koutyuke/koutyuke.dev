import { SocialLinks } from "../../../entities/profile";
import { HeroSectionUI } from "./hero-section.ui";

export function HeroSection() {
  return (
    <HeroSectionUI
      slots={{ SocialLinks: <SocialLinks className="justify-start" showLabel={false} /> }}
    />
  );
}
