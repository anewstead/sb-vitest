import { act } from "react";

import { renderHook } from "vitest-browser-react";

import { useCounter } from "./useCounter";

/*
act() currently cause a warning in the console, 
the test do run and do pass (its all JS afterall)
but the warning is misleading and annoying.
-
stderr | ...test reference
The current testing environment is not configured to support act(...)
-
not sure on fix, waiting on:
https://github.com/vitest-dev/vitest-browser-react/issues/14
 */

describe("useCounter", () => {
  it("should initialize with the default value", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it("should increment the count", () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });

  it("should decrement the count", () => {
    const { result } = renderHook(() => useCounter(5));
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(4);
  });
});
