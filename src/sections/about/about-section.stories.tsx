import type { Meta, StoryObj } from "@storybook/react-vite";

import { AboutSection } from "./about-section";

const meta = {
  component: AboutSection,
  parameters: {
    layout: "fullscreen",
  },
  title: "Sections/AboutSection",
} satisfies Meta<typeof AboutSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
