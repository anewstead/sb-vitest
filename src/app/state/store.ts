/**
 * Based on:\
 * https://redux.js.org/usage/writing-tests#example-app-code
 */

import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import { homeReducer } from "./home/slice";

import type { Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";

/**
 * Combine slices into a single reducer\
 * Add other reducers here
 */
const appReducer = combineSlices({
  home: homeReducer,
});

/**
 * SetupStore() creates and return a store\
 * NOTE. this is only exported in case needed for testing so can create
 * targetted locally scoped store, if a reducer is not passed or intentionally
 * set undefined then the default appReducer is used, this allows tests to
 * override default to just the reducer(s) that are being tested\
 * E.g.
 *
 * - SetupStore() = defaults\
 * - SetupStore(myReducer) = reducer as rootReducer\
 * - SetupStore({my: myReducer}) = reducer as named slice\
 * - SetupStore(undefined, {}) = default reducer, empty preloadedState
 */
export const setupStore = (
  reducer?: Reducer | ReducersMapObject,
  preloadedState?: IAppState
) => {
  return configureStore({
    reducer: reducer ?? appReducer,
    preloadedState,
  });
};

/**
 * This is THE store at runtime
 */
export const store = setupStore();

/**
 * Infer types `AppStore` `AppState` and `AppDispatch`\
 * NOTE. types not in own file and exported directly from here\
 * As we do not want to export the appReducer
 */
export type IAppState = ReturnType<typeof appReducer>;
export type IAppStore = ReturnType<typeof setupStore>;
export type IAppDispatch = typeof store.dispatch;

/**
 * Typed hooks.\
 * Use throughout app instead of `useDispatch` and `useSelector`
 */
export const useAppDispatch: () => IAppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<IAppState> = useSelector;
