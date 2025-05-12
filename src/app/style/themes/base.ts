/**
 * Base theme configuration, applies to all themes
 */
export const baseThemeOptions = {
  cssVariables: {
    cssVarPrefix: "dc",
    colorSchemeSelector: ".dc-%s",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "html, body, #root, .sb-story, #storybook-root": {
          height: "100%",
        },
        a: {
          color: "inherit",
        },
      },
    },
  },
} as const;

// html/body classes for light/dark uses cssVarPrefix
export const LIGHT_CLASS = "dc-light";
export const DARK_CLASS = "dc-dark";
