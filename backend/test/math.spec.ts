import { describe, it, expect } from "vitest";

function add(a, b) {
  return a + b;
}

describe("function add", () => {
  it("must add two numbers correctly", () => {
    expect(add(2, 3)).toBe(5);
  });
});
