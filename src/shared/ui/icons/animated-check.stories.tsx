import type { Meta, StoryObj } from "@storybook/react-vite";

import { AnimatedCheckIcon } from "./animated-check";

const meta = {
  component: AnimatedCheckIcon,
  title: "Shared/Icons/AnimatedCheckIcon",
} satisfies Meta<typeof AnimatedCheckIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "size-12 text-slate-12",
  },
};
