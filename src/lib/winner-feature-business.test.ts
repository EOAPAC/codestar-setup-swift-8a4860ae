import { describe, expect, test } from "bun:test";
import { fillBusiness, sanitizeBusiness } from "./winner-feature-business";

describe("Winner's Feature business personalization", () => {
  test("trims the business name and removes angle brackets", () => {
    expect(sanitizeBusiness("  <Acme Inc>  ")).toBe("Acme Inc");
  });
  test("caps business names at 60 characters", () => {
    expect(sanitizeBusiness("A".repeat(75))).toBe("A".repeat(60));
  });
  test("keeps the fallback for an absent or empty name", () => {
    expect(sanitizeBusiness(undefined)).toBeUndefined();
    expect(sanitizeBusiness(" <> ")).toBeUndefined();
  });
  test("replaces both result placeholders as plain text", () => {
    expect(fillBusiness("[Your Business] and ‹Your Business›", "Acme Inc")).toBe("Acme Inc and Acme Inc");
  });
});