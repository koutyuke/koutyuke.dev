import type { Meta, StoryObj } from "@storybook/react-vite";

import { footprints } from "../../../entities/footprint";
import { FootprintsSectionUI } from "./footprints-section.ui";

const meta = {
  component: FootprintsSectionUI,
  parameters: {
    layout: "fullscreen",
  },
  title: "Widgets/FootprintsSection",
} satisfies Meta<typeof FootprintsSectionUI>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    footprints,
  },
};
