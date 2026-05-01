import type { Meta, StoryObj } from "@storybook/react-vite";

import { TagList } from "./tag-list";
import { mockManyTags, mockPrimaryTags } from "./tag-list.fixtures";

const meta = {
  component: TagList,
  title: "Shared/TagList",
} satisfies Meta<typeof TagList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    tags: mockPrimaryTags,
  },
};

export const ManyTags: Story = {
  args: {
    tags: mockManyTags,
  },
};
