import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";

import { resolvedThemeAtom, systemThemeAtom } from "../model/theme-atoms";

export function ThemeSync() {
  const resolvedTheme = useAtomValue(resolvedThemeAtom);
  const [, setSystemTheme] = useAtom(systemThemeAtom);

  // apply theme to DOM
  useEffect(() => {
    const root = document.documentElement;

    root.dataset["theme"] = resolvedTheme;
    root.classList.toggle("dark", resolvedTheme === "dark");
    root.classList.toggle("light", resolvedTheme === "light");
  }, [resolvedTheme]);

  // update system theme when OS theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      const systemTheme =
        typeof window !== "undefined"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : "light";

      setSystemTheme(systemTheme);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [setSystemTheme]);

  return null;
}
