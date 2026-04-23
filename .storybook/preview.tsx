import type {} from "./storybook-env";
import "../src/styles/global.css";

import React from "react";
import type { Preview } from "@storybook/react-vite";

import { ThemeSync } from "../src/features/theme/theme-sync";

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
