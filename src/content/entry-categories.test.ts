import { describe, expect, it } from "bun:test";
import { amountDue, checkoutUrl, hiddenEntryFields, isCategoryValue, PAYMENT_LINKS, submitLabel, totalLine } from "./entry-categories";

describe("entry categories", () => {
  it("totals paid categories at US$129.90 each", () => {
    expect(amountDue(3)).toBe("389.70");
    expect(amountDue(6)).toBe("779.40");
  });
  it("shows the paid-only total line", () => {
    expect(totalLine(["innovator", "impact-leader", "turnaround-leader"])).toBe("3 categories: US$389.70, paid once");
  });
  it("shows paid plus free total line", () => {
    expect(totalLine(["innovator", "impact-leader", "turnaround-leader", "emerging-founder"])).toBe("3 paid categories: US$389.70. Emerging Founder: free");
  });
  it("shows free-only line and hides when nothing ticked", () => {
    expect(totalLine(["emerging-founder"])).toBe("Emerging Founder: free. Nothing to pay.");
    expect(totalLine([])).toBeNull();
  });
  it("free-only sends no payment link and zero due", () => {
    expect(hiddenEntryFields(["emerging-founder"])).toEqual({ ea_paid_categories: "0", ea_amount_due: "0", ea_entry_type: "free_only", ea_payment_link: "" });
    expect(submitLabel(["emerging-founder"], false)).toBe("Submit my entry");
  });
  it("two paid plus free uses the 2-category link with email", () => {
    const f = hiddenEntryFields(["innovator", "emerging-founder", "impact-leader"]);
    expect(f.ea_amount_due).toBe("259.80");
    expect(f.ea_payment_link).toBe(PAYMENT_LINKS[2]);
    expect(checkoutUrl(2, "a+b@x.co")).toBe(`${PAYMENT_LINKS[2]}?prefilled_email=a%2Bb%40x.co`);
    expect(submitLabel(["innovator"], false)).toBe("Continue to payment");
  });
  it("ignores unknown pre-selected categories", () => {
    expect(isCategoryValue("innovator")).toBe(true);
    expect(isCategoryValue("best-ever")).toBe(false);
  });
});
