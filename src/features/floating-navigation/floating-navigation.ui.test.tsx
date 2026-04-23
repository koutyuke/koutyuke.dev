// @vitest-environment happy-dom

import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vite-plus/test";

import { portfolioNavigationItems } from "../../content/navigation";
import { socialLinks } from "../../content/profile";
import { FloatingNavigationUi } from "./floating-navigation.ui";

afterEach(() => cleanup());

test("opens from a compact floating button into a menu panel", async () => {
  const user = userEvent.setup();

  render(
    <FloatingNavigationUi
      navigationItems={portfolioNavigationItems}
      resolvedTheme="light"
      socialLinks={socialLinks}
      theme="system"
      onThemeChange={vi.fn()}
    />,
  );

  const trigger = screen.getByRole("button", { name: "ナビゲーションを開く" });
  expect(trigger.getAttribute("aria-expanded")).toBe("false");

  await user.click(trigger);

  expect(screen.getByRole("dialog", { name: "サイトナビゲーション" })).not.toBeNull();
  expect(trigger.getAttribute("aria-expanded")).toBe("true");
  expect(screen.getByRole("button", { name: "Theme" })).not.toBeNull();
});

test("opens the theme panel and reports selected theme", async () => {
  const user = userEvent.setup();
  const onThemeChange = vi.fn();

  render(
    <FloatingNavigationUi
      navigationItems={portfolioNavigationItems}
      resolvedTheme="light"
      socialLinks={socialLinks}
      theme="system"
      onThemeChange={onThemeChange}
    />,
  );

  await user.click(screen.getByRole("button", { name: "ナビゲーションを開く" }));
  await user.click(screen.getByRole("button", { name: "Theme" }));
  await user.click(screen.getByRole("button", { name: "Dark" }));

  expect(onThemeChange).toHaveBeenCalledWith("dark");
});

test("closes the panel with Escape", async () => {
  const user = userEvent.setup();

  render(
    <FloatingNavigationUi
      navigationItems={portfolioNavigationItems}
      resolvedTheme="light"
      socialLinks={socialLinks}
      theme="system"
      onThemeChange={vi.fn()}
    />,
  );

  await user.click(screen.getByRole("button", { name: "ナビゲーションを開く" }));
  await user.keyboard("{Escape}");

  await waitFor(() => {
    expect(screen.queryByRole("dialog", { name: "サイトナビゲーション" })).toBeNull();
  });
});
