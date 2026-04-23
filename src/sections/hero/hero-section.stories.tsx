import type { Meta, StoryObj } from "@storybook/react-vite";

import { HeroSection } from "./hero-section";

const meta = {
  component: HeroSection,
  parameters: {
    layout: "fullscreen",
  },
  title: "Sections/HeroSection",
} satisfies Meta<typeof HeroSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
