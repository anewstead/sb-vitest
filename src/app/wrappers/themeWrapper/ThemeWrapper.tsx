import React, { useEffect, useState } from "react";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import { allThemes, defaultTheme } from "@src/app/style/theme";

import { getStoredTheme, setStoredTheme } from "./themeWrapper.helper";
import { ThemeWrapperContext } from "./ThemeWrapperContext";

import type { IThemeBaseProps } from "./themeWrapper.type";
import type { Theme } from "@mui/material/styles";
import type { IThemeName } from "@src/app/style/theme.type";

// https://mui.com/material-ui/guides/interoperability/#css-injection-order
const muiCache = createCache({
  key: "mui",
  prepend: true,
});

export const ThemeWrapper = (props: IThemeBaseProps) => {
  const { children, initialTheme = defaultTheme.name } = props;

  let setInitialTheme = initialTheme;
  if (typeof initialTheme === "string") {
    if (!(initialTheme in allThemes)) {
      console.warn(
        `Invalid theme: "${initialTheme}". Using default: "${defaultTheme.name}".`
      );
      setInitialTheme = allThemes[defaultTheme.name];
    } else {
      setInitialTheme = allThemes[initialTheme];
    }
  }

  const [theme, setTheme] = useState<Theme>(setInitialTheme as Theme);

  const [currentTheme, setCurrentTheme] = useState<IThemeName>(getStoredTheme);

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
