import type { Meta, StoryObj } from "@storybook/react-vite";

import { AsteriskIcon } from "./asterisk";

const meta = {
  component: AsteriskIcon,
  title: "Components/Icons/AsteriskIcon",
} satisfies Meta<typeof AsteriskIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "size-12 text-slate-12",
  },
};
