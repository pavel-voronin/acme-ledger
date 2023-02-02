import { it, describe, expect, assert } from "vitest";
import { isCuid } from "../src/helpers.js";

describe(`isCuid`, () => {
  const correctStr = "cldmt86vb0023356kz6cc10p0";
  const incorrectStr = "incorrect";

  it("checks if string has CUID format", () => {
    expect(isCuid(correctStr)).toBeTruthy();
  });

  describe(`Format:`, () => {
    it("length is 25", () => {
      assert(correctStr.length === 25);
      expect(isCuid(correctStr)).toBeTruthy();

      assert(incorrectStr.length !== 25);
      expect(isCuid(incorrectStr)).toBeFalsy();
    });

    it("starts from `c`", () => {
      assert(correctStr[0] === "c");
      expect(isCuid(correctStr)).toBeTruthy();

      assert(incorrectStr[0] !== "c");
      expect(isCuid(incorrectStr)).toBeFalsy();
    });
  });
});
