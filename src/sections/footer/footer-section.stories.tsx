import type { Meta, StoryObj } from "@storybook/react-vite";

import { FooterSection } from "./footer-section";

const meta = {
  component: FooterSection,
  parameters: {
    layout: "fullscreen",
  },
  title: "Sections/FooterSection",
} satisfies Meta<typeof FooterSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
