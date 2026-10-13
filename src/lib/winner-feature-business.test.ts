import { describe, it as test } from "node:test";
import assert from "node:assert/strict";
import { fillBusiness, sanitizeBusiness } from "./winner-feature-business";

describe("Winner's Feature business personalization", () => {
  test("trims the business name and removes angle brackets", () => {
    assert.equal(sanitizeBusiness("  <Acme Inc>  "), "Acme Inc");
  });
  test("caps business names at 60 characters", () => {
    assert.equal(sanitizeBusiness("A".repeat(75)), "A".repeat(60));
  });
  test("keeps the fallback for an absent or empty name", () => {
    assert.equal(sanitizeBusiness(undefined), undefined);
    assert.equal(sanitizeBusiness(" <> "), undefined);
  });
  test("replaces both result placeholders as plain text", () => {
    assert.equal(fillBusiness("[Your Business] and ‹Your Business›", "Acme Inc"), "Acme Inc and Acme Inc");
  });
});