import type { StorybookConfig } from "@storybook/react-vite";

const ignoredWatchPaths = [".*/**", "**/dist/**", "**/storybook-static/**", "/nix/store/**"];

const storybookConfig: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(viteConfig) {
    const { mergeConfig } = await import("vite");

    return mergeConfig(viteConfig, {
      server: {
        watch: {
          followSymlinks: false,
          ignored: ignoredWatchPaths,
        },
      },
    });
  },
};

export default storybookConfig;
