// @vitest-environment happy-dom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vite-plus/test";

import { HeroSectionUI } from "./hero-section.ui";

afterEach(() => {
  cleanup();
});

test("keeps visible scroll link text in its accessible name", () => {
  render(<HeroSectionUI />);

  expect(screen.getByRole("link", { name: "scroll down to about section" })).not.toBeNull();
});
