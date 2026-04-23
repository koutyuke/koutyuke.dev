import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";

import { resolvedThemeAtom, systemThemeAtom, themeModeAtom } from "./theme-atoms";
import { applyResolvedTheme, getSystemTheme } from "./theme";

export function ThemeSync() {
  const resolvedTheme = useAtomValue(resolvedThemeAtom);
  const theme = useAtomValue(themeModeAtom);
  const [, setSystemTheme] = useAtom(systemThemeAtom);

  useEffect(() => {
    applyResolvedTheme(resolvedTheme);
  }, [resolvedTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (theme === "system") {
        setSystemTheme(getSystemTheme());
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [setSystemTheme, theme]);

  return null;
}
