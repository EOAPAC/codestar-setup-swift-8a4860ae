import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { MOCK_AWARDS, MOCK_DATES, MOCK_ELIGIBILITY, MOCK_PRICES, mockAwardPrice } from "./awards-mock";

describe("Awards page mock rules, isolated from live checkout", () => {
  it("shows the main award free in early and standard periods", () => {
    assert.equal(mockAwardPrice("entrepreneur-of-the-year", "early"), 0);
    assert.equal(mockAwardPrice("entrepreneur-of-the-year", "standard"), 0);
  });
  it("shows a $55 late fee for the main award", () => {
    assert.equal(mockAwardPrice("entrepreneur-of-the-year", "late"), 55);
  });
  it("shows all six achievement awards at $129.90 early", () => {
    const achievements = MOCK_AWARDS.filter((award) => award.slug !== "entrepreneur-of-the-year");
    assert.equal(achievements.length, 6);
    for (const award of achievements) assert.equal(mockAwardPrice(award.slug, "early"), 129.9);
  });
  it("shows achievement awards at $159.90 standard", () => {
    assert.equal(mockAwardPrice("startup-founder", "standard"), 159.9);
  });
  it("includes the $55 late fee in the $214.90 achievement price", () => {
    assert.equal(mockAwardPrice("growth-founder", "late"), 214.9);
    assert.equal(MOCK_PRICES.standard + MOCK_PRICES.lateFee, MOCK_PRICES.late);
  });
  it("ends early prices on 31 January 2027", () => assert.equal(MOCK_DATES.earlyEnds, "2027-01-31"));
  it("ends free entry on 15 May 2027", () => assert.equal(MOCK_DATES.freeEnds, "2027-05-15"));
  it("starts late fees on 16 May 2027", () => assert.equal(MOCK_DATES.lateStarts, "2027-05-16"));
  it("closes entries on 31 May 2027", () => assert.equal(MOCK_DATES.entriesClose, "2027-05-31"));
  it("states a five-business-day decision", () => assert.equal(MOCK_DATES.decisionBusinessDays, 5));
  it("sets startup eligibility to trading from 2024", () => assert.equal(MOCK_ELIGIBILITY.startupEarliestYear, 2024));
  it("sets growth eligibility to at least two trading years", () => assert.equal(MOCK_ELIGIBILITY.growthTradingYears, 2));
  it("sets employer eligibility to at least five employees", () => assert.equal(MOCK_ELIGIBILITY.employerEmployees, 5));
  it("shows the optional Feature at $997", () => assert.equal(MOCK_PRICES.feature, 997));
  it("shows the optional physical award at $197", () => assert.equal(MOCK_PRICES.physicalAward, 197));
});