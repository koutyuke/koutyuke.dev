import type { Meta, StoryObj } from "@storybook/react-vite";

import { ContactSection } from "./contact-section";

const meta = {
  component: ContactSection,
  parameters: {
    layout: "fullscreen",
  },
  title: "Sections/ContactSection",
} satisfies Meta<typeof ContactSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
