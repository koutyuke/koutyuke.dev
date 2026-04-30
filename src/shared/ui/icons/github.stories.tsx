import type { Meta, StoryObj } from "@storybook/react-vite";

import { GithubIcon } from "./github";

const meta = {
  component: GithubIcon,
  title: "Components/Icons/GithubIcon",
} satisfies Meta<typeof GithubIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "size-12 text-slate-12",
  },
};
