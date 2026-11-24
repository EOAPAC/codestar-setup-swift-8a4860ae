import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { appendLine, classifyPurchase, classifyRefund, extraLine, hasRefundLine, refundLine, verifyStripeSignature } from "./stripe-webhook.server";

async function sign(secret: string, t: number, body: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const s = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${t}.${body}`));
  return [...new Uint8Array(s)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

describe("stripe webhook", () => {
  it("accepts a valid signature and rejects wrong, missing or stale ones", async () => {
    const now = 1_800_000_000, body = '{"id":"evt_1"}';
    const v1 = await sign("whsec_test", now, body);
    assert.equal(await verifyStripeSignature(body, `t=${now},v1=${v1}`, "whsec_test", now), true);
    assert.equal(await verifyStripeSignature(body, `t=${now},v1=${v1}`, "whsec_other", now), false);
    assert.equal(await verifyStripeSignature(body, null, "whsec_test", now), false);
    assert.equal(await verifyStripeSignature(body, `t=${now},v1=${v1}`, "whsec_test", now + 301), false);
  });
  it("maps payment links", () => {
    assert.deepEqual(classifyPurchase("plink_1UfNqGGd5RmL1wBxZZysa5ZC", 38970), { kind: "entry", categories: 3 });
    assert.deepEqual(classifyPurchase("plink_1UGm5lGd5RmL1wBxwFxBc45A", 119400), { kind: "extra", label: "Winner's Feature + Award Package" });
    assert.deepEqual(classifyPurchase("plink_1UGm5lGd5RmL1wBxwFxBc45A", 99700), { kind: "extra", label: "Winner's Feature" });
    assert.equal(classifyPurchase("plink_other", 1000), null);
  });
  it("classifies refunds by amount", () => {
    assert.equal(classifyRefund(25980), "entry");
    assert.equal(classifyRefund(19700), "extra");
    assert.equal(classifyRefund(5000), "unknown");
  });
  it("formats log lines", () => {
    assert.equal(extraLine(1_800_000_000, "Award Package", 19700, "cs_1"), "2027-01-15: Award Package, US$197, cs_1");
    const r = refundLine(1_800_000_000, 6495, 12990, "entry", false, "ch_1");
    assert.equal(r, "2027-01-15: US$64.95 refunded of US$129.90, entry, partial, ch_1");
    assert.equal(hasRefundLine(appendLine("", r), 6495, "ch_1"), true);
    assert.equal(hasRefundLine(r, 12990, "ch_1"), false);
  });
});
