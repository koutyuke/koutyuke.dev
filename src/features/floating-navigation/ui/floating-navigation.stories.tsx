import type { Meta, StoryObj } from "@storybook/react-vite";

import { FloatingNavigation } from "./floating-navigation";

const meta = {
  component: FloatingNavigation,
  parameters: {
    layout: "fullscreen",
  },
  title: "Features/FloatingNavigation",
} satisfies Meta<typeof FloatingNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  render: () => (
    <div className="min-h-128 bg-slate-1">
      <FloatingNavigation />
    </div>
  ),
};
