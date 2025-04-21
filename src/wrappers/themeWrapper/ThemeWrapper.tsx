import React from "react";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import { theme } from "@src/style/theme";

import type { PropsWithChildren } from "react";

export type IThemeBaseProps = PropsWithChildren;

// https://mui.com/material-ui/guides/interoperability/#css-injection-order
const muiCache = createCache({
  key: "mui",
  prepend: true,
});

export const ThemeWrapper = ({ children }: IThemeBaseProps) => {
  return (
    <CacheProvider value={muiCache}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  );
};
