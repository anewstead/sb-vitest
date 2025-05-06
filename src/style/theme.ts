import { blueTheme } from "./themes/blueTheme";
import { greenTheme } from "./themes/greenTheme";
import { redTheme } from "./themes/redTheme";

export const allThemes = {
  blue: blueTheme,
  green: greenTheme,
  red: redTheme,
} as const;

export type ThemeName = keyof typeof allThemes;

export type ThemeMode = "light" | "dark" | "system";

export const defaultTheme = {
  name: "blue" as ThemeName,
  theme: blueTheme,
};
