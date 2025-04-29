import { homeActions } from "@src/state/home/slice";

import type { AppDispatch } from "@src/state/store";

export const handleLogin = () => {
  //  login logic
  // console.log("Login clicked");
};

export const handleLogout = () => {
  // logout logic
  // console.log("Logout clicked");
};

export const handleCreateAccount = () => {
  // create account logic
  // console.log("Create account clicked");
};

export const handleChangeText = (dispatch: AppDispatch) => {
  const randomNum = Math.floor(Math.random() * 1000);
  dispatch(
    homeActions.SET_EXAMPLE_TEXT(
      `New text with random number: ${randomNum.toString()}`
    )
  );
};
