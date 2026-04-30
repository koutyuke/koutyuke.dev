import { techStacks } from "../../../entities/profile";
import { AboutSectionUI } from "./about-section.ui";

export function AboutSection() {
  return <AboutSectionUI techStacks={techStacks} />;
}
