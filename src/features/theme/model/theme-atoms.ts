import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

import { storageKey } from "../../../shared/lib";
import { getSystemTheme, resolveTheme, type ResolvedTheme, type ThemeMode } from "../lib/theme";

const themeStorage = createJSONStorage<ThemeMode>(() => localStorage);

export const themeModeAtom = atomWithStorage<ThemeMode>(storageKey.theme, "system", themeStorage, {
  getOnInit: true,
});

export const systemThemeAtom = atom<ResolvedTheme>(getSystemTheme());

export const resolvedThemeAtom = atom((get) =>
  resolveTheme(get(themeModeAtom), get(systemThemeAtom)),
);
