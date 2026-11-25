import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { emptyTestProgress, restoreTestProgress, selectedTestCategories, testSummary, toggleTestCategory, validateTestStep } from "./test-entry";

describe("isolated visual entry rules", () => {
  it("starts with no categories and blocks category continuation", () => {
    const progress = emptyTestProgress();
    assert.deepEqual(progress.selected, []);
    assert.ok(validateTestStep(progress, 1)["categories"]);
    assert.equal(testSummary([]).note, "");
  });
  it("charges US$129.90 for one paid category", () => {
    const summary = testSummary(["growth"]);
    assert.equal(summary.amount, "US$129.90");
    assert.equal(summary.count, 1);
  });
  it("charges US$259.80 for two paid categories", () => {
    assert.equal(testSummary(["growth", "innovation"]).amount, "US$259.80");
    assert.equal(testSummary(["growth", "innovation"]).count, 2);
  });
  it("counts New Business but does not charge for it alongside a paid category", () => {
    assert.equal(testSummary(["growth", "new"]).count, 2);
    assert.equal(testSummary(["growth", "new"]).cents, 12990);
  });
  it("allows New Business alone without payment", () => {
    const summary = testSummary(["new"]);
    assert.equal(summary.amount, "Free");
    assert.equal(summary.cents, 0);
    assert.equal(summary.count, 1);
    assert.deepEqual(validateTestStep({ ...emptyTestProgress(), selected: ["new"] }, 1), {});
  });
  it("keeps questions in category row order", () => {
    assert.deepEqual(selectedTestCategories(["new", "impact", "innovation"]).map((category) => category.id), ["innovation", "impact", "new"]);
  });
  it("requires three shared answers and exactly one answer per selected category", () => {
    const progress = { ...emptyTestProgress(), selected: ["growth", "new"] as const, answers: { business: "Software", achievement: "Revenue doubled", exceptional: "New market", growth: "100 to 200" } };
    assert.deepEqual(Object.keys(validateTestStep({ ...progress, selected: [...progress.selected] }, 2)), ["new"]);
    assert.deepEqual(validateTestStep({ ...progress, selected: [...progress.selected], answers: { ...progress.answers, new: "Started in 2025" } }, 2), {});
  });
  it("retains an answer when a category is removed and added back", () => {
    const progress = { ...emptyTestProgress(), selected: ["growth"] as const, answers: { growth: "Revenue grew from 100 to 200" } };
    const removed = toggleTestCategory({ ...progress, selected: [...progress.selected] }, "growth");
    const added = toggleTestCategory(removed, "growth");
    assert.deepEqual(removed.selected, []);
    assert.equal(added.answers["growth"], "Revenue grew from 100 to 200");
  });
  it("requires the impact title choice when impact is selected", () => {
    const progress = { ...emptyTestProgress(), selected: ["impact"] as const, answers: { business: "A", achievement: "B", exceptional: "C", impact: "D" } };
    assert.ok(validateTestStep({ ...progress, selected: [...progress.selected] }, 2)["impactTitle"]);
    assert.deepEqual(validateTestStep({ ...progress, selected: [...progress.selected], impactTitle: "Environmental Impact Award" }, 2), {});
  });
  it("restores the reached step, details, choices and answers and recomputes fees", () => {
    const progress = { ...emptyTestProgress(), step: 3, selected: ["innovation", "new"], answers: { innovation: "A result" } };
    const restored = restoreTestProgress(JSON.stringify(progress));
    assert.equal(restored?.step, 3);
    assert.equal(restored?.answers["innovation"], "A result");
    assert.equal(testSummary(restored?.selected ?? []).amount, "US$129.90");
    assert.equal(restoreTestProgress("invalid"), null);
  });
  it("requires all details except company and accepts a scheme-free profile address", () => {
    assert.deepEqual(Object.keys(validateTestStep(emptyTestProgress(), 0)), ["firstName", "lastName", "email", "profile", "industry"]);
    assert.deepEqual(validateTestStep({ ...emptyTestProgress(), details: { firstName: "A", lastName: "B", email: "a@example.com", company: "", profile: "company.com", industry: "Other" } }, 0), {});
  });
});