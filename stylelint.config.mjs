export default {
  extends: ["stylelint-config-standard"],
  ignoreFiles: ["dist/**", ".tmp/**"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "theme",
          "custom-variant",
          "source",
          "utility",
          "variant",
          "plugin",
          "config",
        ],
      },
    ],
    "custom-property-pattern": null,
    "custom-property-empty-line-before": null,
    "import-notation": "string",
    "selector-class-pattern": null,
    "value-keyword-case": [
      "lower",
      {
        ignoreKeywords: ["optimizeLegibility"],
      },
    ],
  },
};
