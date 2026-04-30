import type { Meta, StoryObj } from "@storybook/react-vite";

import { HeroSectionUI } from "./hero-section.ui";

const meta = {
  component: HeroSectionUI,
  parameters: {
    layout: "fullscreen",
  },
  title: "Widgets/HeroSection",
} satisfies Meta<typeof HeroSectionUI>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
