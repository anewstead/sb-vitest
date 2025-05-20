/* v8 ignore start */

import React, { StrictMode } from "react";

import { I18nextProvider } from "react-i18next";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router";

import { getI18n } from "@src/i18n/i18n";
import { store } from "@src/state/store";
import { ThemeWrapper } from "@src/wrappers/themeWrapper/ThemeWrapper";

import { router } from "./routes/routes";

/**
 * React.StrictMode intentionally double-invokes some functions in dev mode to
 * help detect issues, notably the render function is called twice, see:
 * https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects
 */
export const App = () => {
  return (
    <StrictMode>
      <I18nextProvider i18n={getI18n()}>
        <ReduxProvider store={store}>
          <ThemeWrapper>
            <RouterProvider router={router} />
          </ThemeWrapper>
        </ReduxProvider>
      </I18nextProvider>
    </StrictMode>
  );
};
