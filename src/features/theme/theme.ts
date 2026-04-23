export type ResolvedTheme = "light" | "dark";
export type ThemeMode = "system" | ResolvedTheme;

export const storageKey = "theme";

function isThemeMode(value: string | null): value is ThemeMode {
  return value === "system" || value === "light" || value === "dark";
}

export function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function resolveTheme(
  theme: ThemeMode,
  systemTheme: ResolvedTheme = getSystemTheme(),
): ResolvedTheme {
  return theme === "system" ? systemTheme : theme;
}

export function getStoredTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "system";
  }

  const storedTheme = window.localStorage.getItem(storageKey);

  return isThemeMode(storedTheme) ? storedTheme : "system";
}

export function applyResolvedTheme(resolvedTheme: ResolvedTheme): ResolvedTheme {
  const root = document.documentElement;

  root.dataset["theme"] = resolvedTheme;
  root.classList.toggle("dark", resolvedTheme === "dark");
  root.classList.toggle("light", resolvedTheme === "light");

  return resolvedTheme;
}

export function applyTheme(theme: ThemeMode): ResolvedTheme {
  const resolvedTheme = resolveTheme(theme);

  applyResolvedTheme(resolvedTheme);
  window.localStorage.setItem(storageKey, theme);

  return resolvedTheme;
}

export function getInitialThemeState() {
  const theme = getStoredTheme();

  return {
    resolvedTheme: resolveTheme(theme),
    theme,
  };
}

export function applyStoredTheme() {
  return applyTheme(getStoredTheme());
}
