import { sum } from "@src/example/funcs/sum";

describe("sum", () => {
  it("should add two positive numbers correctly", () => {
    expect(sum(1, 2)).toBe(3);
  });

  it("should add negative numbers correctly", () => {
    expect(sum(-1, -2)).toBe(-3);
  });

  it("should add zero correctly", () => {
    expect(sum(0, 5)).toBe(5);
    expect(sum(5, 0)).toBe(5);
  });
});
