import { renderHook, waitFor } from "@testing-library/react";

import { useCounter } from "./useCounter";

describe("useCounter", () => {
  it("should initialize with the default value", () => {
    const { result } = renderHook(() => {
      return useCounter();
    });
    expect(result.current.count).toBe(0);
  });

  it("should increment the count", async () => {
    const { result } = renderHook(() => {
      return useCounter();
    });
    await waitFor(() => {
      result.current.increment();
    });
    await waitFor(() => {
      expect(result.current.count).toBe(1);
    });
  });

  it("should decrement the count", async () => {
    const { result } = renderHook(() => {
      return useCounter(5);
    });
    await waitFor(() => {
      result.current.decrement();
    });
    await waitFor(() => {
      expect(result.current.count).toBe(4);
    });
  });
});
