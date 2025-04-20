import { initialize as mswInitialize, mswLoader } from "msw-storybook-addon";

import type { Preview } from "@storybook/react";

// https://github.com/mswjs/msw-storybook-addon#configuring-msw
mswInitialize({
  onUnhandledRequest: "bypass",
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  // a11y setting may be required
  // (it was added during an auto upgrade adding the addon-test)
  // a11y: {
  //   // 'todo' - show a11y violations in the test UI only
  //   // 'error' - fail CI on a11y violations
  //   // 'off' - skip a11y checks entirely
  //   test: "todo",
  // },
  loaders: [mswLoader],
  tags: ["autodocs"],
};

export default preview;
