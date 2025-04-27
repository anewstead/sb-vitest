import { setupStore } from "@src/state/store";

import { homeReducer, homeActions } from "./slice";

import type { AppState } from "@src/state/store";

test("example text changes redux state", () => {
  const store = setupStore({ home: homeReducer });
  const preText = (store.getState() as AppState).home.example;

  const newText = "new example text";
  store.dispatch(homeActions.SET_EXAMPLE_TEXT(newText));

  const postText = (store.getState() as AppState).home.example;

  expect(postText).not.toBe(preText);
  expect(postText).toBe(newText);
});
