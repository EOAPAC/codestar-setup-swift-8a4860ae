import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ENTRY_FEES, totalRequiredEntryFees } from "./entry-fees";

describe("Required award fees", () => {
  it("does not charge a separate shortlist fee", () => {
    assert.equal(ENTRY_FEES.shortlist, 0);
  });

  it("requires only the entry fee", () => {
    assert.equal(totalRequiredEntryFees(), ENTRY_FEES.entry);
    assert.ok(totalRequiredEntryFees() > 0);
  });
});