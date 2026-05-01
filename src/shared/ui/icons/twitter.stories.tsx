import type { Meta, StoryObj } from "@storybook/react-vite";

import { TwitterIcon } from "./twitter";

const meta = {
  component: TwitterIcon,
  title: "Shared/Icons/TwitterIcon",
} satisfies Meta<typeof TwitterIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "size-12 text-slate-12",
  },
};
