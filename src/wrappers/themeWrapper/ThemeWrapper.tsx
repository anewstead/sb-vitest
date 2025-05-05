import React, { useEffect, useState } from "react";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import { allThemes, defaultTheme } from "@src/style/theme";

import { getStoredTheme, setStoredTheme } from "./themeWrapper.helper";
import { ThemeWrapperContext } from "./ThemeWrapperContext";

import type { Theme } from "@mui/material/styles";
import type { ThemeName } from "@src/style/theme";
import type { PropsWithChildren } from "react";

export type IThemeBaseProps = PropsWithChildren & {
  initialTheme?: Theme;
};

// https://mui.com/material-ui/guides/interoperability/#css-injection-order
const muiCache = createCache({
  key: "mui",
  prepend: true,
});

export const ThemeWrapper = (props: IThemeBaseProps) => {
  const { children, initialTheme = defaultTheme.theme } = props;
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(getStoredTheme);

  useEffect(() => {
    setTheme(allThemes[currentTheme]);
    setStoredTheme(currentTheme);
  }, [currentTheme]);

  return (
    <ThemeWrapperContext.Provider value={{ currentTheme, setCurrentTheme }}>
      <CacheProvider value={muiCache}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </CacheProvider>
    </ThemeWrapperContext.Provider>
  );
};
