import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  staged: {
    "*.{ts,tsx,js,jsx,json,css,html,md}": "vp check --fix",
    "*.css": "vp run css:lint:fix",
  },
  fmt: {
    ignorePatterns: [".direnv/**", ".tmp/**", ".vite-hooks/**", "dist/**", "storybook-static/**"],
    printWidth: 100,
    semi: true,
    singleQuote: false,
    trailingComma: "all",
  },
  lint: {
    ignorePatterns: [".direnv/**", ".tmp/**", ".vite-hooks/**", "dist/**", "storybook-static/**"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
});
