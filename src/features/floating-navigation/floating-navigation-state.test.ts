import { describe, expect, test } from "vite-plus/test";

import {
  getBackPanel,
  getNextPanel,
  type FloatingNavigationPanel,
} from "./floating-navigation-state";

describe("floating navigation state", () => {
  test.each([
    ["closed", "menu"],
    ["menu", "closed"],
    ["about", "menu"],
    ["theme", "menu"],
  ] satisfies Array<[FloatingNavigationPanel, FloatingNavigationPanel]>)(
    "returns %s -> %s for back action",
    (currentPanel, expectedPanel) => {
      expect(getBackPanel(currentPanel)).toBe(expectedPanel);
    },
  );

  test.each([
    ["closed", "toggle", "menu"],
    ["menu", "toggle", "closed"],
    ["menu", "about", "about"],
    ["menu", "theme", "theme"],
    ["about", "theme", "theme"],
  ] satisfies Array<
    [FloatingNavigationPanel, Parameters<typeof getNextPanel>[1], FloatingNavigationPanel]
  >)("moves from %s with %s to %s", (currentPanel, action, expectedPanel) => {
    expect(getNextPanel(currentPanel, action)).toBe(expectedPanel);
  });
});
