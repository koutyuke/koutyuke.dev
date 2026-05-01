import type { Meta, StoryObj } from "@storybook/react-vite";

import { SocialLinks } from "./social-links";

const meta = {
  component: SocialLinks,
  title: "Entities/Profile/SocialLinks",
} satisfies Meta<typeof SocialLinks>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithLabels: Story = {
  args: {
    showLabel: true,
  },
};

export const IconsOnly: Story = {
  args: {
    showLabel: false,
  },
};
