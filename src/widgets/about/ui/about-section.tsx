import { techStacks } from "../../../entities/profile";
import { AboutSectionUI } from "./about-section.ui";

export const AboutSection = () => {
  return <AboutSectionUI techStacks={techStacks} />;
};
