import { allThemes, defaultTheme } from "@src/common/style/theme";

import type { IThemeName } from "@src/common/style/theme.type";

export const THEME_STORAGE_KEY = "app-theme";

export const getStoredTheme = (): IThemeName => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  return savedTheme && Object.keys(allThemes).includes(savedTheme)
    ? (savedTheme as IThemeName)
    : defaultTheme.name;
};

export const setStoredTheme = (theme: IThemeName): void => {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};
