import { useAtom } from "jotai";
import { useAtomValue } from "jotai";

import { resolvedThemeAtom, themeModeAtom } from "./theme-atoms";

export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeModeAtom);
  const resolvedTheme = useAtomValue(resolvedThemeAtom);

  return { resolvedTheme, setTheme, theme };
};
