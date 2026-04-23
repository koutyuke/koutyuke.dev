import { useAtom } from "jotai";
import { useAtomValue } from "jotai";

import { resolvedThemeAtom, themeModeAtom } from "./theme-atoms";

export function useTheme() {
  const [theme, setTheme] = useAtom(themeModeAtom);
  const resolvedTheme = useAtomValue(resolvedThemeAtom);

  return { resolvedTheme, setTheme, theme };
}
