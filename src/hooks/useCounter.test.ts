import { act } from "react";

import { waitFor } from "@storybook/test";
import { renderHook } from "vitest-browser-react";

import { useCounter } from "./useCounter";

/**
 * ## Act() currently cause a warning in the console, \
 * The test do run and do pass (its all JS afterall) \
 * But the warning is misleading and annoying. \
 *
 * ## stderr | ...test reference \
 * The current testing environment is not configured to support act(...) \
 *
 * Not sure on fix, waiting on:\
 * https://github.com/vitest-dev/vitest-browser-react/issues/14
 */

describe("useCounter", () => {
  it("should initialize with the default value", () => {
    const { result } = renderHook(() => {
      return useCounter();
    });
    expect(result.current.count).toBe(0);
  });

  it("should increment the count", () => {
    const { result } = renderHook(() => {
      return useCounter();
    });
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });

  it("should decrement the count", async () => {
    const { result } = renderHook(() => {
      return useCounter(5);
    });

    result.current.decrement();

    await waitFor(() => {
      expect(result.current.count).toBe(4);
    });
  });
});
