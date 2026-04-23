import { expect, test } from "vite-plus/test";

import { resolveTheme } from "./theme";

test("resolves explicit light and dark theme modes", () => {
  expect(resolveTheme("light")).toBe("light");
  expect(resolveTheme("dark")).toBe("dark");
});

test("resolves system theme from the provided system value", () => {
  expect(resolveTheme("system", "dark")).toBe("dark");
  expect(resolveTheme("system", "light")).toBe("light");
});
