import { useAtom, useAtomValue } from "jotai";
import { useEffect, useLayoutEffect } from "react";

import { resolvedThemeAtom, systemThemeAtom } from "../model/theme-atoms";

export const ThemeSync = () => {
  const resolvedTheme = useAtomValue(resolvedThemeAtom);
  const [, setSystemTheme] = useAtom(systemThemeAtom);

  // apply theme to DOM
  useLayoutEffect(() => {
    const root = document.documentElement;

    root.dataset["theme"] = resolvedTheme;
    root.classList.toggle("dark", resolvedTheme === "dark");
    root.classList.toggle("light", resolvedTheme === "light");
  }, [resolvedTheme]);

  // update system theme when OS theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      setSystemTheme(mediaQuery.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    handleChange();

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [setSystemTheme]);

  return null;
};
