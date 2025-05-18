/**
 * Base theme configuration, applies to all themes
 */
export const baseThemeOptions = {
  cssVariables: {
    colorSchemeSelector: "class",
  },
} as const;

// html/body classes for light/dark (to allow if cssVarPrefix)
export const LIGHT_CLASS = "light";
export const DARK_CLASS = "dark";
