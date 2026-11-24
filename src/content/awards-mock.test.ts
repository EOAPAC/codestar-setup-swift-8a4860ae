import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { MOCK_AWARDS, MOCK_ELIGIBILITY, MOCK_ENTRY_RULES, MOCK_PRICES, HERO_SOURCES, EMERGING_SAMPLE, mockAwardPrice, mockEntryHref } from "./awards-mock";

describe("Categories visual mock, isolated from live checkout", () => {
  it("charges US$129.90 for the main award and five achievement awards", () => {
    const paid = MOCK_AWARDS.filter((award) => award.slug !== "emerging-founder");
    assert.equal(paid.length, 6);
    for (const award of paid) assert.equal(mockAwardPrice(award.slug), 129.9);
  });
  it("makes only Emerging Founder free", () => {
    assert.equal(mockAwardPrice("emerging-founder"), 0);
    assert.deepEqual(MOCK_AWARDS.filter((award) => award.price === 0).map((award) => award.slug), ["emerging-founder"]);
  });
  it("limits Emerging Founder eligibility to three trading years", () => assert.equal(MOCK_ELIGIBILITY.emergingTradingYears, 3));
  it("requires two years of trading for High-Growth Founder", () => assert.equal(MOCK_ELIGIBILITY.growthTradingYears, 2));
  it("measures growth over the last twelve months", () => assert.equal(MOCK_ELIGIBILITY.growthMeasurementMonths, 12));
  it("requires at least five employees for Employer of Choice", () => assert.equal(MOCK_ELIGIBILITY.employerEmployees, 5));
  it("keeps entries open all year", () => assert.equal(MOCK_ENTRY_RULES.openAllYear, true));
  it("has no recurring fee", () => assert.equal(MOCK_ENTRY_RULES.recurring, false));
  it("judges each category separately", () => assert.equal(MOCK_ENTRY_RULES.separateJudging, true));
  it("allows multiple categories", () => assert.equal(MOCK_ENTRY_RULES.multipleCategories, true));
  it("keeps the optional Feature at $997", () => assert.equal(MOCK_PRICES.feature, 997));
  it("keeps the optional physical award at $197", () => assert.equal(MOCK_PRICES.physicalAward, 197));
  it("links category entries to the existing homepage without integrating the form", () => {
    for (const award of MOCK_AWARDS) assert.equal(mockEntryHref(award.slug), `/?category=${award.slug}#submit`);
    assert.equal(mockEntryHref(), "/#submit");
  });
  it("cycles six hero images without the Emerging Founder image", () => {
    assert.equal(HERO_SOURCES.length, 6);
    assert.equal(HERO_SOURCES.some((src) => src === (EMERGING_SAMPLE as string)), false);
  });
});
