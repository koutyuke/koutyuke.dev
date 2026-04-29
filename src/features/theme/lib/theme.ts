export type ResolvedTheme = "light" | "dark";
export type ThemeMode = "system" | ResolvedTheme;

export function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function resolveTheme(theme: ThemeMode, systemTheme: ResolvedTheme): ResolvedTheme {
  return theme === "system" ? systemTheme : theme;
}
