import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./state";

import type { PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "home",
  initialState,
  reducers: {
    SET_EXAMPLE_TEXT: (state, action: PayloadAction<string>) => {
      state.example = action.payload;
    },
  },
});

export const homeActions = slice.actions;
export const homeReducer = slice.reducer;
export const homeSelectors = slice.selectors;
