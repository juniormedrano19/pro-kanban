import { getInitials } from "../../helpers";


describe('getInitials', () => {
  it('should return a single initial for a single word name', () => {
    const name = "John";
    const initials = getInitials(name);
    expect(initials).toBe("J");
  });

  it('should return the first letter of the first two words for a full name', () => {
    const name = "John Doe";
    const initials = getInitials(name);
    expect(initials).toBe("JD");
  });

  it('should handle names with more than two words and return only the initials of the first two', () => {
    const name = "John Michael Doe";
    const initials = getInitials(name);
    expect(initials).toBe("JM");
  });

  it('should ignore extra spaces between words and return the correct initials', () => {
    const name = "  John    Doe   ";
    const initials = getInitials(name);
    expect(initials).toBe("JD");
  });

  it('should return an empty string for an empty input', () => {
    const name = "";
    const initials = getInitials(name);
    expect(initials).toBe("");
  });

  it('should return an initial for a name with a single character', () => {
    const name = "A";
    const initials = getInitials(name);
    expect(initials).toBe("A");
  });

  it('should return empty string for undefined or null input', () => {
    expect(getInitials(undefined as unknown as string)).toBe("");
    expect(getInitials(null as unknown as string)).toBe("");
  });
});
