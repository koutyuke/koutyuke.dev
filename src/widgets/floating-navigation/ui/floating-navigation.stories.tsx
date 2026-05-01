import { fn } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { FloatingNavigationUI } from "./floating-navigation.ui";

const meta = {
  component: FloatingNavigationUI,
  parameters: {
    layout: "fullscreen",
  },
  title: "Widgets/FloatingNavigation",
} satisfies Meta<typeof FloatingNavigationUI>;

export default meta;

type Story = StoryObj<typeof meta>;

const actions = {
  onThemeChange: fn(),
};

export const Closed: Story = {
  args: {
    actions,
    initialView: "closed",
    theme: "system",
  },
};

export const Menu: Story = {
  args: {
    actions,
    initialView: "menu",
    theme: "system",
  },
};

export const About: Story = {
  args: {
    actions,
    initialView: "about",
    theme: "system",
  },
};

export const Theme: Story = {
  args: {
    actions,
    initialView: "theme",
    theme: "system",
  },
};
