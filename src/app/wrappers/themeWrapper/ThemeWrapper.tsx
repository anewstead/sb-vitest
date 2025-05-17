import React, { useEffect, useState } from "react";

import { CssBaseline } from "@mui/material";
import GlobalStyles from "@mui/material/GlobalStyles";
import {
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

import { allThemes, defaultTheme } from "@src/common/style/theme";

import { getStoredTheme, setStoredTheme } from "./themeWrapper.helper";
import { ThemeWrapperContext } from "./ThemeWrapperContext";

import "@src/common/style/root.css";

import type { IThemeBaseProps } from "./themeWrapper.type";
import type { Theme } from "@mui/material/styles";
import type { IThemeName } from "@src/common/style/theme.type";

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
      <StyledEngineProvider enableCssLayer injectFirst>
        <MuiThemeProvider theme={theme} noSsr>
          <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </StyledEngineProvider>
    </ThemeWrapperContext.Provider>
  );
};
