import "the-new-css-reset/css/reset.css";
import "../src/styles/global.css";

import type { Preview } from "@storybook/react-vite";

import { ThemeSync } from "../src/features/theme/theme-sync";

const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        <ThemeSync />
        <Story />
      </>
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
