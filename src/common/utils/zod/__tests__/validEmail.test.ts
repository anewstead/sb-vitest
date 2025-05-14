import { describe, expect, it } from "vitest";

import { validEmail } from "../validEmail";

describe("validEmail", () => {
  it("should validate a correct email address", () => {
    const result = validEmail.safeParse("test@example.com");
    expect(result.success).toBe(true);
  });

  it("should reject an empty email", () => {
    const result = validEmail.safeParse("");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Email is required");
    }
  });

  it("should reject an email without @ symbol", () => {
    const result = validEmail.safeParse("testexample.com");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Email must include an '@' symbol"
      );
    }
  });

  it("should reject an email without domain after @", () => {
    const result = validEmail.safeParse("test@");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Email must include a domain after '@'"
      );
    }
  });

  it("should reject an email with invalid format", () => {
    const result = validEmail.safeParse("test@example");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Please enter a valid email address"
      );
    }
  });

  it("should reject an email with spaces", () => {
    const result = validEmail.safeParse("test @example.com");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Please enter a valid email address"
      );
    }
  });

  it("should validate an email with subdomain", () => {
    const result = validEmail.safeParse("test@sub.example.com");
    expect(result.success).toBe(true);
  });
});
