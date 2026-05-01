import type { Meta, StoryObj } from "@storybook/react-vite";

import { mockHomePageSlots } from "./home-page.fixtures";
import { HomePageUI } from "./home-page.ui";

const meta = {
  component: HomePageUI,
  parameters: {
    layout: "fullscreen",
  },
  title: "Pages/HomePage",
} satisfies Meta<typeof HomePageUI>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    slots: mockHomePageSlots,
  },
};
