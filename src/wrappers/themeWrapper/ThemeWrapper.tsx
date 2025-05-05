import React from "react";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import { defaultTheme } from "@src/style/theme";

import type { Theme } from "@mui/material/styles";
import type { PropsWithChildren } from "react";

export type IThemeBaseProps = PropsWithChildren & {
  theme?: Theme;
};

// https://mui.com/material-ui/guides/interoperability/#css-injection-order
const muiCache = createCache({
  key: "mui",
  prepend: true,
});

export const ThemeWrapper = ({
  children,
  theme = defaultTheme,
}: IThemeBaseProps) => {
  return (
    <CacheProvider value={muiCache}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  );
};
