import { blue, blueGrey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

import { baseThemeOptions } from "./base";

export const blueTheme = createTheme({
  ...baseThemeOptions,
  colorSchemes: {
    light: {
      palette: {
        background: {
          paper: blue[50],
          default: blueGrey[50],
        },
        primary: {
          main: blue[700],
          light: blue[600],
          dark: blue[800],
        },
        secondary: {
          main: blue[300],
          light: blue[200],
          dark: blue[400],
        },
      },
    },
    dark: {
      palette: {
        background: {
          paper: blue[900],
          default: blueGrey[900],
        },
        primary: {
          main: blue[700],
          light: blue[600],
          dark: blue[800],
        },
        secondary: {
          main: blue[300],
          light: blue[200],
          dark: blue[400],
        },
      },
    },
  },
});
