import type { Meta, StoryObj } from "@storybook/react-vite";

import { FootprintsSection } from "./footprints-section";

const meta = {
  component: FootprintsSection,
  parameters: {
    layout: "fullscreen",
  },
  title: "Sections/FootprintsSection",
} satisfies Meta<typeof FootprintsSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
