// Browser-safe entry-form configuration: category values, per-category
// questions and the Stripe link for each number of paid categories.
export const PAID_CATEGORY_FEE = 129.9;

export type EntryCategory = {
  value: string;
  name: string;
  line: string;
  free: boolean;
  question?: { field: string; helper: string; limit?: string };
};

export const ENTRY_CATEGORIES: readonly EntryCategory[] = [
  { value: "entrepreneur-of-distinction", name: "Entrepreneur of Distinction", free: false, line: "Your business as a whole, judged within your industry." },
  { value: "high-growth-founder", name: "High-Growth Founder", free: false, line: "Strong growth over the last 12 months.", question: { field: "ea_answer_high_growth_founder", helper: "Your last 12 months against the 12 before, and what drove the change.", limit: "At least two years of trading." } },
  { value: "innovator", name: "Innovator", free: false, line: "A new product, service or approach already delivering results.", question: { field: "ea_answer_innovator", helper: "What is new, who uses it and what changed for them." } },
  { value: "turnaround-leader", name: "Turnaround Leader", free: false, line: "A struggling business brought back to stronger performance.", question: { field: "ea_answer_turnaround_leader", helper: "Where the business was, what you changed and where it is now." } },
  { value: "employer-of-choice", name: "Employer of Choice", free: false, line: "Strong staff retention and a positive workplace.", question: { field: "ea_answer_employer_of_choice", helper: "How many people work with you, how long they stay and why.", limit: "At least five employees." } },
  { value: "impact-leader", name: "Impact Leader", free: false, line: "Measurable benefits to communities, society or the environment.", question: { field: "ea_answer_impact_leader", helper: "Who benefits, how they benefit and how you measure it." } },
  { value: "emerging-founder", name: "Emerging Founder", free: true, line: "Began trading in the last three years, with paying customers.", question: { field: "ea_answer_emerging_founder", helper: "When you started, your first customers and what you have built since.", limit: "Your business began trading in the last three years and already has paying customers." } },
];

export const INDUSTRIES: ReadonlyArray<{ label: string; value: string }> = [
  { label: "Professional services", value: "professional_services" },
  { label: "Technology and software", value: "technology_software" },
  { label: "Finance and insurance", value: "finance_insurance" },
  { label: "Health and wellness", value: "health_wellness" },
  { label: "Retail and e-commerce", value: "retail_ecommerce" },
  { label: "Food and drink", value: "food_drink" },
  { label: "Property and construction", value: "property_construction" },
  { label: "Marketing and media", value: "marketing_media" },
  { label: "Education and coaching", value: "education_coaching" },
  { label: "Beauty and fashion", value: "beauty_fashion" },
  { label: "Travel and hospitality", value: "travel_hospitality" },
  { label: "Trades and local services", value: "trades_local_services" },
  { label: "Other", value: "other" },
];

export const PAYMENT_LINKS: Record<number, string> = {
  1: "https://payments.entrepreneurawards.co/b/dRmfZh70x0Z22MQeDG8so0n",
  2: "https://payments.entrepreneurawards.co/b/6oU5kDfx32367360MQ8so0o",
  3: "https://payments.entrepreneurawards.co/b/aFadR9acJ0Z2afi9jm8so0p",
  4: "https://payments.entrepreneurawards.co/b/dRm5kDckR6jm3QU1QU8so0q",
  5: "https://payments.entrepreneurawards.co/b/4gM7sL3OlbDG736eDG8so0r",
  6: "https://payments.entrepreneurawards.co/b/6oUaEX1Gd236cnqfHK8so0s",
};

/**
 * Profile addresses are typed as free text ("linkedin.com/in/name"), so the
 * form stores a full address: adds the scheme unless one is already present.
 */
export function normalizeProfileUrl(raw: string) {
  const value = raw.trim();
  if (!value) return "";
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

export function isCategoryValue(value: string | null | undefined): value is string {
  return !!value && ENTRY_CATEGORIES.some((c) => c.value === value);
}

/** Selected values in card order, ignoring unknown values. */
export function orderCategories(selected: readonly string[]): EntryCategory[] {
  return ENTRY_CATEGORIES.filter((c) => selected.includes(c.value));
}

export function paidCount(selected: readonly string[]) {
  return orderCategories(selected).filter((c) => !c.free).length;
}

export function hasFree(selected: readonly string[]) {
  return orderCategories(selected).some((c) => c.free);
}

/** Cents-safe total, as a two-decimal string ("389.70"). */
export function amountDue(paid: number) {
  return ((Math.round(PAID_CATEGORY_FEE * 100) * paid) / 100).toFixed(2);
}

export function paymentLinkFor(paid: number) {
  return PAYMENT_LINKS[paid] ?? "";
}

export function totalLine(selected: readonly string[]): string | null {
  const paid = paidCount(selected);
  const free = hasFree(selected);
  if (paid === 0 && !free) return null;
  if (paid === 0) return "Emerging Founder: free. Nothing to pay.";
  const noun = paid === 1 ? "category" : "categories";
  if (free) return `${paid} paid ${noun}: US$${amountDue(paid)}. Emerging Founder: free`;
  return `${paid} ${noun}: US$${amountDue(paid)}, paid once`;
}

export function submitLabel(selected: readonly string[], submitting: boolean) {
  if (submitting) return "Submitting...";
  return paidCount(selected) === 0 && hasFree(selected) ? "Submit my entry" : "Continue to payment";
}

export function hiddenEntryFields(selected: readonly string[]) {
  const paid = paidCount(selected);
  return {
    ea_paid_categories: String(paid),
    ea_amount_due: paid === 0 ? "0" : amountDue(paid),
    ea_entry_type: paid > 0 ? "paid" : "free_only",
    ea_payment_link: paymentLinkFor(paid),
  };
}

export const SAVED_ENTRY_KEY = "ea-entry";

export type SavedEntry = { firstName: string; email: string; categories: string[]; paidCount: number };

export function checkoutUrl(paid: number, email: string) {
  const link = paymentLinkFor(paid);
  if (!link) return "";
  return `${link}?prefilled_email=${encodeURIComponent(email)}`;
}
