import { getColorIndex } from "../../helpers";
import { BG_COLORS } from "../../utils/constants/bg-colors";

describe("getColorIndex", () => {
  it("should return a valid index for a given string", () => {
    const str = "test string";
    const index = getColorIndex(str);

    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(BG_COLORS.length);
  });

  it("should return the same index for the same string", () => {
    const str = "consistent string";
    const index1 = getColorIndex(str);
    const index2 = getColorIndex(str);

    expect(index1).toBe(index2);
  });

  it("should return different indices for different strings", () => {
    const str1 = "string one";
    const str2 = "string two";

    const index1 = getColorIndex(str1);
    const index2 = getColorIndex(str2);

    expect(index1).not.toBe(index2);
  });

  it("should handle an empty string correctly", () => {
    const str = "";
    const index = getColorIndex(str);

    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(BG_COLORS.length);
  });
});
