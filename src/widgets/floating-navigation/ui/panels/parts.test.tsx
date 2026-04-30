// @vitest-environment happy-dom

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vite-plus/test";
import type { FormEvent } from "react";

import { PanelItem } from "./parts";

afterEach(() => {
  cleanup();
});

test("renders button panel items as non-submit buttons by default", async () => {
  const user = userEvent.setup();
  const handleSubmit = vi.fn((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  });

  render(
    <form onSubmit={handleSubmit}>
      <PanelItem as="button">Theme</PanelItem>
    </form>,
  );

  await user.click(screen.getByRole("button", { name: "Theme" }));

  expect(handleSubmit).not.toHaveBeenCalled();
});
