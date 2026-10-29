import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { AWARD_NUMBERS } from "./award-numbers";

describe("Award statistics", () => {
  it("uses five business days to a decision", () => assert.equal(AWARD_NUMBERS[0].value, "5"));
  it("uses 250 clients served", () => assert.equal(AWARD_NUMBERS[1].value, "250"));
  it("uses 13 countries", () => assert.equal(AWARD_NUMBERS[2].value, "13"));
  it("writes awards presented as 389+", () => assert.equal(AWARD_NUMBERS[3].value, "389+"));
});
