import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      ignored: [
        "**/.direnv/**",
        "**/.playwright-mcp/**",
        "**/.serena/**",
        "**/.tmp/**",
        "**/.vite-hooks/**",
        "**/dist/**",
        "**/storybook-static/**",
      ],
    },
  },
  staged: {
    "*.{ts,tsx,js,jsx,json,css,html,md}": "vp check --fix",
    "*.css": "vp run css:lint:fix",
  },
  fmt: {
    ignorePatterns: [
      ".direnv/**",
      ".playwright-mcp/**",
      ".serena/**",
      ".tmp/**",
      ".vite-hooks/**",
      "dist/**",
      "storybook-static/**",
    ],
    printWidth: 100,
    semi: true,
    singleQuote: false,
    trailingComma: "all",
  },
  lint: {
    ignorePatterns: [
      ".direnv/**",
      ".playwright-mcp/**",
      ".serena/**",
      ".tmp/**",
      ".vite-hooks/**",
      "dist/**",
      "storybook-static/**",
    ],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  test: {
    exclude: [
      "**/.direnv/**",
      "**/.playwright-mcp/**",
      "**/.serena/**",
      "**/.tmp/**",
      "**/.vite-hooks/**",
      "**/dist/**",
      "**/storybook-static/**",
      "**/node_modules/**",
    ],
  },
});
