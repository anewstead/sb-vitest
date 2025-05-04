/* istanbul ignore file */
import { blueGrey, green, grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// Base theme configuration
const baseThemeOptions = {
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

// Blue theme
export const blueTheme = createTheme({
  ...baseThemeOptions,
  colorSchemes: {
    light: {
      palette: {
        background: {
          paper: blueGrey[50],
          default: grey[300],
        },
        primary: {
          main: blueGrey[500],
          light: blueGrey[300],
          dark: blueGrey[700],
        },
        secondary: {
          main: blueGrey[200],
          light: blueGrey[100],
          dark: blueGrey[400],
        },
      },
    },
    dark: {
      palette: {
        background: {
          paper: blueGrey[800],
          default: grey[800],
        },
        primary: {
          main: blueGrey[500],
          light: blueGrey[300],
          dark: blueGrey[700],
        },
        secondary: {
          main: blueGrey[200],
          light: blueGrey[100],
          dark: blueGrey[400],
        },
      },
    },
  },
});

// Green theme
export const greenTheme = createTheme({
  ...baseThemeOptions,
  colorSchemes: {
    light: {
      palette: {
        background: {
          paper: green[50],
          default: green[100],
        },
        primary: {
          main: green[500],
          light: green[300],
          dark: green[700],
        },
        secondary: {
          main: green[200],
          light: green[100],
          dark: green[400],
        },
      },
    },
    dark: {
      palette: {
        background: {
          paper: green[800],
          default: grey[800],
        },
        primary: {
          main: green[500],
          light: green[300],
          dark: green[700],
        },
        secondary: {
          main: green[200],
          light: green[100],
          dark: green[400],
        },
      },
    },
  },
});
