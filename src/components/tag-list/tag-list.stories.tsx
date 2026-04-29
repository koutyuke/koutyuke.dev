import type { Meta, StoryObj } from "@storybook/react-vite";

import { techStacks } from "../../content/profile";
import { TagList } from "./tag-list";

const meta = {
  component: TagList,
  title: "Components/TagList",
} satisfies Meta<typeof TagList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    tags: techStacks.primary,
  },
};

export const ManyTags: Story = {
  args: {
    tags: [...techStacks.primary, ...techStacks.exploring],
  },
};
