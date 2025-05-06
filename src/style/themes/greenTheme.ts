import { blueGrey, green } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

import { baseThemeOptions } from "./base";

export const greenTheme = createTheme({
  ...baseThemeOptions,
  colorSchemes: {
    light: {
      palette: {
        background: {
          paper: green[50],
          default: blueGrey[50],
        },
        primary: {
          main: green[700],
          light: green[600],
          dark: green[800],
        },
        secondary: {
          main: green[300],
          light: green[200],
          dark: green[400],
        },
      },
    },
    dark: {
      palette: {
        background: {
          paper: green[900],
          default: blueGrey[900],
        },
        primary: {
          main: green[700],
          light: green[600],
          dark: green[800],
        },
        secondary: {
          main: green[300],
          light: green[200],
          dark: green[400],
        },
      },
    },
  },
});
