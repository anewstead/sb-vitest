/* eslint-disable react/display-name */
/**
 * React/display-name is disabled because lint see jsx and thinks its a react
 * component but it is not, it is a storybook decorator function
 */

import React from "react";

import { Provider } from "react-redux";

import { setupStore } from "@src/state/store";

import type { Reducer } from "@reduxjs/toolkit";
import type { Decorator } from "@storybook/react";

/**
 * Redux store decorator for Storybook stories
 *
 * @example
 *   ```tsx
 *   // Single reducer
 *   const base: Story = {
 *     decorators: [withStore({ home: homeReducer })],
 *   };
 *
 *   // Multiple reducers
 *   const base: Story = {
 *     decorators: [withStore({
 *       home: homeReducer,
 *       auth: authReducer,
 *       settings: settingsReducer
 *     })],
 *   };
 *   ```;
 */
export const withStore = (reducers: Record<string, Reducer>): Decorator => {
  return (Story) => {
    return <Provider store={setupStore(reducers)}>{Story()}</Provider>;
  };
};
