import { multiply } from "./multiply";

describe("multiply", () => {
  it("should multiply two positive numbers correctly", () => {
    expect(multiply(2, 3)).toBe(6);
  });

  it("should multiply a positive and negative number correctly", () => {
    expect(multiply(2, -3)).toBe(-6);
  });

  it("should multiply two negative numbers correctly", () => {
    expect(multiply(-2, -3)).toBe(6);
  });

  it("should handle zero correctly", () => {
    expect(multiply(0, 5)).toBe(0);
    expect(multiply(5, 0)).toBe(0);
    expect(multiply(0, 0)).toBe(0);
  });

  it("should handle decimal numbers correctly", () => {
    expect(multiply(2.5, 2)).toBe(5);
    expect(multiply(0.1, 0.1)).toBeCloseTo(0.01);
  });
});
