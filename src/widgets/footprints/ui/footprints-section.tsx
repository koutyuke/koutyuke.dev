import { footprints } from "../../../entities/footprint";
import { FootprintsSectionUI } from "./footprints-section.ui";

export const FootprintsSection = () => {
  return <FootprintsSectionUI footprints={footprints} />;
};
