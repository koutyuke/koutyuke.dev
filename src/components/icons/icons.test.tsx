// @vitest-environment happy-dom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vite-plus/test";

import { GithubIcon } from "./github";

afterEach(() => {
  cleanup();
});

test("maps Lucide-style props onto custom SVG icons", () => {
  render(<GithubIcon aria-label="GitHub" absoluteStrokeWidth color="red" size={48} />);

  const icon = screen.getByLabelText("GitHub");

  expect(icon.getAttribute("width")).toBe("48");
  expect(icon.getAttribute("height")).toBe("48");
  expect(icon.getAttribute("stroke")).toBe("red");
  expect(icon.getAttribute("stroke-width")).toBe("1");
});
