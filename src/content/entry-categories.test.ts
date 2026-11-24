import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { amountDue, checkoutUrl, hiddenEntryFields, isCategoryValue, normalizeProfileUrl, PAYMENT_LINKS, submitLabel, totalLine } from "./entry-categories";

describe("entry categories", () => {
  it("totals paid categories at US$129.90 each", () => {
    assert.equal(amountDue(3), "389.70");
    assert.equal(amountDue(6), "779.40");
  });
  it("shows the paid-only total line", () => {
    assert.equal(totalLine(["innovator", "impact-leader", "turnaround-leader"]), "3 categories: US$389.70, paid once");
  });
  it("shows paid plus free total line", () => {
    assert.equal(totalLine(["innovator", "impact-leader", "turnaround-leader", "emerging-founder"]), "3 paid categories: US$389.70. Emerging Founder: free");
  });
  it("shows free-only line and hides when nothing ticked", () => {
    assert.equal(totalLine(["emerging-founder"]), "Emerging Founder: free. Nothing to pay.");
    assert.equal(totalLine([]), null);
  });
  it("free-only sends no payment link and zero due", () => {
    assert.deepEqual(hiddenEntryFields(["emerging-founder"]), { ea_paid_categories: "0", ea_amount_due: "0", ea_entry_type: "free_only", ea_payment_link: "", ea_categories_text: "Emerging Founder" });
    assert.equal(submitLabel(["emerging-founder"], false), "Submit my entry");
  });
  it("sends category names in card order, separated by a comma and a space", () => {
    assert.equal(hiddenEntryFields(["impact-leader", "innovator"]).ea_categories_text, "Innovator, Impact Leader");
    assert.equal(hiddenEntryFields(["emerging-founder", "innovator"]).ea_categories_text, "Innovator, Emerging Founder");
  });
  it("sends the total as US$ with two decimals only when something is paid", () => {
    assert.equal(hiddenEntryFields(["innovator"]).ea_amount_due_text, "US$129.90");
    assert.equal(hiddenEntryFields(["innovator", "impact-leader"]).ea_amount_due_text, "US$259.80");
    assert.equal("ea_amount_due_text" in hiddenEntryFields(["emerging-founder"]), false);
  });
  it("two paid plus free uses the 2-category link with email", () => {
    const f = hiddenEntryFields(["innovator", "emerging-founder", "impact-leader"]);
    assert.equal(f.ea_amount_due, "259.80");
    assert.equal(f.ea_payment_link, PAYMENT_LINKS[2]);
    assert.equal(checkoutUrl(2, "a+b@x.co"), `${PAYMENT_LINKS[2]}?prefilled_email=a%2Bb%40x.co`);
    assert.equal(submitLabel(["innovator"], false), "Continue to payment");
  });
  it("ignores unknown pre-selected categories", () => {
    assert.equal(isCategoryValue("innovator"), true);
    assert.equal(isCategoryValue("best-ever"), false);
  });
});

describe("profile url", () => {
  it("adds https:// to addresses typed without a scheme", () => {
    assert.equal(normalizeProfileUrl("linkedin.com/in/name"), "https://linkedin.com/in/name");
    assert.equal(normalizeProfileUrl("www.company.com"), "https://www.company.com");
  });
  it("keeps an address that already has a scheme", () => {
    assert.equal(normalizeProfileUrl("https://company.com/about"), "https://company.com/about");
    assert.equal(normalizeProfileUrl("http://company.com"), "http://company.com");
    assert.equal(normalizeProfileUrl("HTTPS://Company.com"), "HTTPS://Company.com");
  });
  it("trims surrounding space and returns empty for blank input", () => {
    assert.equal(normalizeProfileUrl("  company.com  "), "https://company.com");
    assert.equal(normalizeProfileUrl("   "), "");
  });
});
