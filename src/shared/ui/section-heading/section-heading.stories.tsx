import type { Meta, StoryObj } from "@storybook/react-vite";

import { SectionHeading } from "./section-heading";

const meta = {
  component: SectionHeading,
  title: "Shared/SectionHeading",
} satisfies Meta<typeof SectionHeading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Start: Story = {
  args: {
    eyebrow: "わたしのことを、簡単に",
    id: "storybook-section-heading",
    title: "A little about me",
  },
};

export const Center: Story = {
  args: {
    align: "center",
    eyebrow: "気軽にのぞいたり、声をかけたり",
    id: "storybook-centered-section-heading",
    title: "Say Hello!",
  },
};
