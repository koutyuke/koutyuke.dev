import type { Meta, StoryObj } from "@storybook/react-vite";

import { socialLinks } from "../../content/profile";
import { SocialLinks } from "./social-links";

const meta = {
  component: SocialLinks,
  title: "Components/SocialLinks",
} satisfies Meta<typeof SocialLinks>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithLabels: Story = {
  args: {
    links: socialLinks,
  },
};

export const IconsOnly: Story = {
  args: {
    links: socialLinks,
    showLabel: false,
  },
};
