/**
 * Base theme configuration, applies to all themes
 */
export const baseThemeOptions = {
  cssVariables: {
    colorSchemeSelector: "class",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "html, body, #root, .sb-story, #storybook-root": {
          // height 100% is important fix for:
          // - scroll on mobile
          // - relative position/height for child elements
          // - storybook items that are as if a body
          height: "100%",
        },
      },
    },
  },
} as const;

// html/body classes for light/dark (to allow if cssVarPrefix)
export const LIGHT_CLASS = "light";
export const DARK_CLASS = "dark";
