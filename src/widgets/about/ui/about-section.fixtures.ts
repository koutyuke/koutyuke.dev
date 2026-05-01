import type { ComponentProps } from "react";

import type { AboutSectionUI } from "./about-section.ui";

type AboutSectionUITechStacks = ComponentProps<typeof AboutSectionUI>["techStacks"];

export const mockTechStacks = {
  exploring: ["Rust", "Nix", "Design Systems"],
  primary: ["TypeScript", "React", "Tailwind CSS", "Storybook"],
} satisfies AboutSectionUITechStacks;
