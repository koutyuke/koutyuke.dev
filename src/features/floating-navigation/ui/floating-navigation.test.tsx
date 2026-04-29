// @vitest-environment happy-dom

import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "jotai";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";

import { storageKey } from "../../../lib/constants";
import { FloatingNavigation } from "./floating-navigation";

beforeEach(() => {
  localStorage.clear();

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

afterEach(() => {
  cleanup();
  localStorage.clear();
});

function renderFloatingNavigation() {
  return render(
    <Provider>
      <FloatingNavigation />
    </Provider>,
  );
}

test("opens from a compact floating button into a menu panel", async () => {
  const user = userEvent.setup();

  renderFloatingNavigation();

  const trigger = screen.getByRole("button", { name: "Open navigation" });
  expect(trigger.getAttribute("aria-expanded")).toBe("false");

  await user.click(trigger);

  expect(screen.getByRole("dialog", { name: "Navigation menu" })).not.toBeNull();
  expect(screen.getByRole("button", { name: "Theme" })).not.toBeNull();
});

test("opens the theme panel and reports selected theme", async () => {
  const user = userEvent.setup();

  renderFloatingNavigation();

  await user.click(screen.getByRole("button", { name: "Open navigation" }));
  await user.click(screen.getByRole("button", { name: "Theme" }));
  await user.click(screen.getByRole("button", { name: "Dark" }));

  expect(localStorage.getItem(storageKey.theme)).toBe(JSON.stringify("dark"));
});

test("closes the panel with Escape", async () => {
  const user = userEvent.setup();

  renderFloatingNavigation();

  await user.click(screen.getByRole("button", { name: "Open navigation" }));
  await user.keyboard("{Escape}");

  await waitFor(() => {
    expect(screen.queryByRole("dialog", { name: "Navigation menu" })).toBeNull();
  });
});
