import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { AWARD_NUMBERS, countAwardNumber } from "./award-numbers";

describe("Award statistics", () => {
  it("uses five business days to a decision", () => {
    assert.equal(AWARD_NUMBERS[0].value, 5);
  });
  it("uses 250 clients served", () => {
    assert.equal(AWARD_NUMBERS[1].value, 250);
  });
  it("uses 13 countries", () => {
    assert.equal(AWARD_NUMBERS[2].value, 13);
  });
  it("presents 389 awards with a leading plus sign", () => {
    assert.equal(`${AWARD_NUMBERS[3].value}${AWARD_NUMBERS[3].suffix}`, "389+");
  });
  it("counts up over 1200ms with an ease-out curve and a stagger delay", () => {
    assert.equal(countAwardNumber(250, 0), 0);
    assert.equal(countAwardNumber(250, 600), 219);
    assert.equal(countAwardNumber(250, 1200), 250);
    assert.equal(countAwardNumber(389, 100, 240), 0);
    assert.equal(countAwardNumber(389, 1440, 240), 389);
  });
});