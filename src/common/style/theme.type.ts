import type { allThemes } from "./theme";

export type IThemeName = keyof typeof allThemes;

export type IThemeMode = "light" | "dark" | "system";
