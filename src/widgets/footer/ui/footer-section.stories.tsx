import type { Meta, StoryObj } from "@storybook/react-vite";

import { FooterSectionUI } from "./footer-section.ui";

const meta = {
  component: FooterSectionUI,
  parameters: {
    layout: "fullscreen",
  },
  title: "Widgets/FooterSection",
} satisfies Meta<typeof FooterSectionUI>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
