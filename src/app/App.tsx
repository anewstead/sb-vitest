import React, { StrictMode } from "react";

import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router";

import { router } from "@src/routes/routes";
import { store } from "@src/state/store";
import { ThemeWrapper } from "@src/wrappers/themeWrapper/ThemeWrapper";

/**
 * React.StrictMode intentionally double-invokes some functions in dev mode to
 * help detect issues, notably the render function is called twice, see:
 * https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects
 */
export const App = () => {
  return (
    <StrictMode>
      <ReduxProvider store={store}>
        <ThemeWrapper>
          <RouterProvider router={router} />
        </ThemeWrapper>
      </ReduxProvider>
    </StrictMode>
  );
};
