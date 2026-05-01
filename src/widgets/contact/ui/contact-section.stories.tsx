import type { Meta, StoryObj } from "@storybook/react-vite";

import { ContactSectionUI } from "./contact-section.ui";

const meta = {
  component: ContactSectionUI,
  parameters: {
    layout: "fullscreen",
  },
  title: "Widgets/ContactSection",
} satisfies Meta<typeof ContactSectionUI>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
