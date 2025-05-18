import { homeActions } from "@src/state/home/slice";

import {
  handleChangeText,
  handleCreateAccount,
  handleLogin,
  handleLogout,
} from "./home.helper";

describe("home.helper", () => {
  it("handleLogin should return login message", () => {
    expect(handleLogin()).toBe("handleLogin called");
  });

  it("handleLogout should return logout message", () => {
    expect(handleLogout()).toBe("handleLogout called");
  });

  it("handleCreateAccount should return create account message", () => {
    expect(handleCreateAccount()).toBe("handleCreateAccount called");
  });

  it("handleChangeText should dispatch SET_EXAMPLE_TEXT action with random number", () => {
    const mockDispatch = vi.fn();
    handleChangeText(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    const action = mockDispatch.mock.calls[0][0] as ReturnType<
      typeof homeActions.SET_EXAMPLE_TEXT
    >;
    expect(action.type).toBe(homeActions.SET_EXAMPLE_TEXT.type);
    expect(action.payload).toMatch(/New text with random number: \d+/);
  });
});
