import { footprints } from "../../../entities/footprint";
import { FootprintsSectionUI } from "./footprints-section.ui";

export function FootprintsSection() {
  return <FootprintsSectionUI footprints={footprints} />;
}
