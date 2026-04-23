import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

import {
  getSystemTheme,
  resolveTheme,
  storageKey,
  type ResolvedTheme,
  type ThemeMode,
} from "./theme";

const themeStorage = createJSONStorage<ThemeMode>(() => localStorage);

export const themeModeAtom = atomWithStorage<ThemeMode>(storageKey, "system", themeStorage, {
  getOnInit: true,
});

export const systemThemeAtom = atom<ResolvedTheme>(getSystemTheme());

export const resolvedThemeAtom = atom((get) =>
  resolveTheme(get(themeModeAtom), get(systemThemeAtom)),
);
