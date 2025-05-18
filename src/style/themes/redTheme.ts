import { blueGrey, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

import { baseThemeOptions } from "./base";

export const redTheme = createTheme({
  ...baseThemeOptions,
  colorSchemes: {
    light: {
      palette: {
        background: {
          paper: red[50],
          default: blueGrey[50],
        },
        primary: {
          main: red[700],
          light: red[600],
          dark: red[800],
        },
        secondary: {
          main: red[300],
          light: red[200],
          dark: red[400],
        },
      },
    },
    dark: {
      palette: {
        background: {
          paper: red[900],
          default: blueGrey[900],
        },
        primary: {
          main: red[700],
          light: red[600],
          dark: red[800],
        },
        secondary: {
          main: red[300],
          light: red[200],
          dark: red[400],
        },
      },
    },
  },
});
