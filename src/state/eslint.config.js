/**
 * Redux Toolkit allows mutating logic for state in reducers via Immer library.
 * so we allow no-param-reassign specifically for state property in this folder
 */

export default {
  rules: {
    "no-param-reassign": [
      "error",
      {
        ignorePropertyModificationsFor: ["state"],
        props: true,
      },
    ],
  },
};
