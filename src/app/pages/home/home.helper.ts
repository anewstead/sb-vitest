import { homeActions } from "@src/app/state/home/slice";

import type { IAppDispatch } from "@src/app/state/store";

export const handleLogin = () => {
  return "handleLogin called";
};

export const handleLogout = () => {
  return "handleLogout called";
};

export const handleCreateAccount = () => {
  return "handleCreateAccount called";
};

export const handleChangeText = (dispatch: IAppDispatch) => {
  const randomNum = Math.floor(Math.random() * 1000);
  dispatch(
    homeActions.SET_EXAMPLE_TEXT(
      `New text with random number: ${randomNum.toString()}`
    )
  );
};
