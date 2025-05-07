/* v8 ignore start */
import React from "react";

import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    index: true,
    async lazy() {
      const { Home } = await import("@src/pages/home/Home");
      return { Component: Home };
    },
    HydrateFallback: () => {
      return React.createElement("div", null, "Loading...");
    },
  },
]);
