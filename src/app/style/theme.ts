import { blueTheme } from "./themes/blueTheme";
import { greenTheme } from "./themes/greenTheme";
import { redTheme } from "./themes/redTheme";

import type { IThemeName } from "./theme.type";

export const allThemes = {
  blue: blueTheme,
  green: greenTheme,
  red: redTheme,
} as const;

export const defaultTheme = {
  name: "blue" as IThemeName,
  theme: blueTheme,
};
