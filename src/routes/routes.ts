import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    async lazy() {
      const { Home } = await import("@src/pages/home/Home");
      return { Component: Home };
    },
  },
]);
