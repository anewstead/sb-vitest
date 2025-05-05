import { blueTheme } from "./themes/blueTheme";
import { greenTheme } from "./themes/greenTheme";
import { redTheme } from "./themes/redTheme";

export const defaultTheme = blueTheme;

export const allThemes = {
  blue: blueTheme,
  green: greenTheme,
  red: redTheme,
} as const;

export type ThemeName = keyof typeof allThemes;
