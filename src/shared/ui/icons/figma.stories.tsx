import type { Meta, StoryObj } from "@storybook/react-vite";

import { FigmaIcon } from "./figma";

const meta = {
  component: FigmaIcon,
  title: "Shared/Icons/FigmaIcon",
} satisfies Meta<typeof FigmaIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "size-12 text-slate-12",
  },
};
