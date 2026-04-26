import type { Meta, StoryObj } from "@storybook/react-vite";

import { KoutyukeIcon } from "./koutyuke";

const meta = {
  component: KoutyukeIcon,
  title: "Components/Icons/KoutyukeIcon",
} satisfies Meta<typeof KoutyukeIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "size-24 text-slate-12",
  },
};
