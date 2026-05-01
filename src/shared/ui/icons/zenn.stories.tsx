import type { Meta, StoryObj } from "@storybook/react-vite";

import { ZennIcon } from "./zenn";

const meta = {
  component: ZennIcon,
  title: "Shared/Icons/ZennIcon",
} satisfies Meta<typeof ZennIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "size-12 text-slate-12",
  },
};
