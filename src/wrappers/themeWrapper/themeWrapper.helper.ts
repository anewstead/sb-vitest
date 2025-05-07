import { allThemes, defaultTheme } from "@src/style/theme";

import type { ThemeName } from "@src/style/theme";

export const THEME_STORAGE_KEY = "app-theme";

export const getStoredTheme = (): ThemeName => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  return savedTheme && Object.keys(allThemes).includes(savedTheme)
    ? (savedTheme as ThemeName)
    : defaultTheme.name;
};

export const setStoredTheme = (theme: ThemeName): void => {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};
