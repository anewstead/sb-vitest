import { allThemes } from "@src/style/theme";

import type { ThemeName } from "@src/style/theme";

// get theme from url, set by sb-addon-theme withThemeFromJSXProvider
export const getThemeFromUrl = (): ThemeName | null => {
  const urlParams = new URLSearchParams(window.location.search);
  const globals = urlParams.get("globals");
  if (!globals) return null;

  const themeMatch = /theme:(\w+)/.exec(globals);
  if (!themeMatch) return null;

  const themeName = themeMatch[1] as ThemeName;
  return Object.keys(allThemes).includes(themeName) ? themeName : null;
};
