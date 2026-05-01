import type { Meta, StoryObj } from "@storybook/react-vite";

import { mockTechStacks } from "./about-section.fixtures";
import { AboutSectionUI } from "./about-section.ui";

const meta = {
  component: AboutSectionUI,
  parameters: {
    layout: "fullscreen",
  },
  title: "Widgets/AboutSection",
} satisfies Meta<typeof AboutSectionUI>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    techStacks: mockTechStacks,
  },
};
