import type { Meta, StoryObj } from "@storybook/react-vite";

import { techStacks } from "../../../entities/profile";
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
    techStacks,
  },
};
