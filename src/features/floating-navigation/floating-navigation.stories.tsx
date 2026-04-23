import type { Meta, StoryObj } from "@storybook/react-vite";

import { portfolioNavigationItems } from "../../content/navigation";
import { socialLinks } from "../../content/profile";
import { FloatingNavigationUi } from "./floating-navigation.ui";

const meta = {
  args: {
    navigationItems: portfolioNavigationItems,
    resolvedTheme: "light",
    socialLinks,
    theme: "system",
  },
  component: FloatingNavigationUi,
  parameters: {
    layout: "fullscreen",
  },
  title: "Features/FloatingNavigation",
} satisfies Meta<typeof FloatingNavigationUi>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    onThemeChange: () => undefined,
  },
  render: (args) => (
    <div className="min-h-128 bg-slate-1">
      <FloatingNavigationUi {...args} />
    </div>
  ),
};
