// oxlint-disable-next-line import/no-unassigned-import -- global style の副作用 import
import "../src/app/styles/global.css";

import React from "react";
import type { Preview } from "@storybook/react-vite";

import { ThemeSync } from "../src/features/theme";

const preview: Preview = {
  decorators: [
    (Story) => (
      <React.Fragment>
        <ThemeSync />
        <Story />
      </React.Fragment>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
