import { SocialLinks } from "../../../entities/profile";
import { ContactSectionUI } from "./contact-section.ui";

export function ContactSection() {
  return <ContactSectionUI slots={{ SocialLinks: <SocialLinks /> }} />;
}
