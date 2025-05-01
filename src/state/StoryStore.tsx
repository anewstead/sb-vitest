/* 
eslint-disable react/display-name 
disabled because linter sees jsx and thinks its a react component 
but it is not really, its a storybook decorator function
*/

import React from "react";

import { Provider } from "react-redux";

import { setupStore } from "@src/state/store";

import type { Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import type { AppState } from "@src/state/store";
import type { Decorator } from "@storybook/react";

/**
 * Redux store decorator for Storybook stories\
 * Basically a wrapper for Redux Provider & setupStore
 *
 * @example
 *   ```tsx
 *   // Single reducer
 *   decorators: [withStore({ home: homeReducer })],
 *
 *   // Multiple reducers
 *   decorators: [withStore({
 *     home: homeReducer,
 *     auth: authReducer
 *   })],
 *
 *   // With preloaded state
 *   decorators: [withStore(
 *     { home: homeReducer },
 *     { home: { example: "preloaded text" } }
 *   )],
 *   ```;
 *
 * @param reducer - Required reducer or reducers map object.\
 *   Explicitly provided to ensure tests only setup the reducers they need,\
 *   Rather than overhead of using the entire default application store.
 * @param preloadedState - Optional preloaded state.\
 *   Optional but most likely key to setup the state needed for the story.\
 *   If not provided then the default initial state is used.
 */
export const withStore = (
  reducer: Reducer | ReducersMapObject,
  preloadedState?: AppState
): Decorator => {
  return (Story) => {
    return (
      <Provider store={setupStore(reducer, preloadedState)}>{Story()}</Provider>
    );
  };
};
