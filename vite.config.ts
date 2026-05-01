import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

const checkIgnorePatterns = [
  ".*/**",
  "!.github/**",
  "!.storybook/**",
  "!.vscode/**",
  "**/dist/**",
  "**/storybook-static/**",
];

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      ignored: [/(^|[/\\])\../, "**/dist/**", "**/storybook-static/**"],
    },
  },
  staged: {
    "*.{ts,tsx,js,jsx,json,css,html,md}": "vp check --fix types/staged-env.d.ts",
    "*.css": "vp run css:lint:fix",
  },
  fmt: {
    ignorePatterns: checkIgnorePatterns,
    insertFinalNewline: true,
    printWidth: 100,
    proseWrap: "preserve",
    semi: true,
    singleQuote: false,
    sortImports: {
      internalPattern: ["@/", "~/", "src/"],
      newlinesBetween: false,
      groups: [
        ["side_effect_style", "side_effect", "style"],
        { newlinesBetween: true },
        "value-builtin",
        "type-builtin",
        { newlinesBetween: true },
        "value-external",
        "type-external",
        { newlinesBetween: true },
        ["value-internal", "value-parent", "value-sibling", "value-index"],
        ["type-internal", "type-parent", "type-sibling", "type-index"],
        "unknown",
      ],
    },
    sortPackageJson: {
      sortScripts: true,
    },
    sortTailwindcss: {
      stylesheet: "./src/app/styles/global.css",
      functions: ["clsx", "cn"],
      preserveWhitespace: false,
    },
    tabWidth: 2,
    trailingComma: "all",
    useTabs: false,
  },
  lint: {
    env: {
      browser: true,
      es2024: true,
    },
    plugins: ["typescript", "react", "import", "unicorn"],
    ignorePatterns: checkIgnorePatterns,
    categories: {
      correctness: "error",
      suspicious: "warn",
      pedantic: "off",
    },
    rules: {
      eqeqeq: "error",
      "no-console": "warn",
      "no-debugger": "error",
      "react/react-in-jsx-scope": "off",
      "react/jsx-no-useless-fragment": "warn",
      "react/self-closing-comp": "warn",
    },
    options: {
      typeAware: true,
      typeCheck: true,
      denyWarnings: true,
    },
  },
  test: {
    exclude: [
      "**/.*/**",
      "!**/.github/**",
      "!**/.storybook/**",
      "!**/.vscode/**",
      "**/dist/**",
      "**/storybook-static/**",
      "**/node_modules/**",
    ],
  },
});
