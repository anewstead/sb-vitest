/* istanbul ignore file */
import { blueGrey, grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  cssVariables: {
    cssVarPrefix: "dc",
    colorSchemeSelector: ".dc-%s",
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          paper: blueGrey[50],
          default: grey[300],
        },
      },
    },
    dark: {
      palette: {
        background: {
          paper: blueGrey[800],
          default: grey[800],
        },
      },
    },
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
});
