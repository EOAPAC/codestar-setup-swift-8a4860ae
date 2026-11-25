// Display-only configuration for the disconnected /homepage-v2 form.
export const TEST_PROGRESS_KEY = "ea-visual-entry-test-v1";
export const TEST_CATEGORIES = [
  { id: "growth", name: "Business Growth", title: "Business Growth Award", cents: 12990, description: "Your business is measurably larger than it was a year ago. At least two years of trading, with figures for the last 12 months and the previous 12.", question: "Using the same measure for both periods, what grew, from what to what, and what did you do to drive that growth?" },
  { id: "innovation", name: "Innovation", title: "Innovation Award", cents: 12990, description: "Something you introduced works better than the alternative. It is already in use and has produced an observable result.", question: "What did people use or do before, what changed with your approach, and what result shows the difference?" },
  { id: "turnaround", name: "Business Turnaround", title: "Business Turnaround Award", cents: 12990, description: "You brought a struggling business back to stronger performance, and can show both the difficulty and the improvement.", question: "What showed the business was in trouble, what decision did you make, and what evidence shows it recovered?" },
  { id: "workplace", name: "Workplace", title: "Workplace Leadership Award", cents: 12990, description: "You made your business a better place to work and can show why people stay. At least five employees.", question: "What did you change for employees, and what do retention figures and employee feedback tell you about the result?" },
  { id: "impact", name: "Social or Environmental Impact", title: "Social Impact Award or Environmental Impact Award, your choice", cents: 12990, description: "Your business produced a measurable benefit for people, a community or the environment, and you can show what changed.", question: "Who or what benefited, what changed, and how did you measure it?" },
  { id: "new", name: "New Business", title: "New Business Achievement Award", cents: 0, description: "Your business started trading within the last three years and already has paying customers.", question: "When did you begin trading, and what have paying customers done that shows there is demand for what you offer?" },
] as const;
export type TestCategoryId = (typeof TEST_CATEGORIES)[number]["id"];
export const TEST_INDUSTRIES = ["Professional services", "Technology and software", "Finance and insurance", "Health and wellness", "Retail and e-commerce", "Food and drink", "Property and construction", "Marketing and media", "Education and coaching", "Beauty and fashion", "Travel and hospitality", "Trades and local services", "Other"] as const;
export const TEST_STEPS = ["About you", "Categories", "Your achievement", "Review and pay"] as const;
export const TEST_SHARED_QUESTIONS = [
  { id: "business", label: "What do you do?", help: "What you sell, who buys it and where you operate." },
  { id: "achievement", label: "What is your standout achievement?", help: "One result, with the figures behind it." },
  { id: "exceptional", label: "Why is it exceptional?", help: "What makes it hard to do, or rare in your field." },
] as const;
export type TestDetails = { firstName: string; lastName: string; email: string; company: string; profile: string; industry: string };
export type TestProgress = { step: number; details: TestDetails; selected: TestCategoryId[]; answers: Record<string, string>; impactTitle: string };
export function emptyTestProgress(): TestProgress {
  return { step: 0, details: { firstName: "", lastName: "", email: "", company: "", profile: "", industry: "" }, selected: [], answers: {}, impactTitle: "" };
}
export function selectedTestCategories(selected: readonly string[]) {
  return TEST_CATEGORIES.filter((category) => selected.includes(category.id));
}
export function testSummary(selected: readonly string[]) {
  const categories = selectedTestCategories(selected);
  const cents = categories.reduce((total, category) => total + category.cents, 0);
  return { categories, cents, count: categories.length, amount: cents ? `US$${(cents / 100).toFixed(2)}` : "Free", note: !categories.length ? "" : cents ? "Nothing to pay now. You'll review your total before submitting." : "No payment required." };
}
export function toggleTestCategory(progress: TestProgress, id: TestCategoryId): TestProgress {
  return { ...progress, selected: progress.selected.includes(id) ? progress.selected.filter((value) => value !== id) : [...progress.selected, id] };
}
export function validateTestStep(progress: TestProgress, step: number): Record<string, string> {
  const errors: Record<string, string> = {};
  if (step === 0) {
    const labels = { firstName: "your first name", lastName: "your last name", email: "your email address", profile: "your LinkedIn profile or website", industry: "your industry" };
    for (const [key, label] of Object.entries(labels)) {
      if (!progress.details[key as keyof TestDetails].trim()) errors[key] = `Enter ${label}.`;
    }
    if (progress.details.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(progress.details.email.trim())) errors["email"] = "Enter an email address such as name@company.com.";
    if (progress.details.profile.trim() && !/^[^\s]+\.[^\s]+$/.test(progress.details.profile.trim())) errors["profile"] = "Enter an address with a dot and no spaces, such as company.com.";
  }
  if (step === 1 && !testSummary(progress.selected).count) errors["categories"] = "Select a category to continue.";
  if (step === 2) {
    for (const question of TEST_SHARED_QUESTIONS) if (!progress.answers[question.id]?.trim()) errors[question.id] = "Add your answer to continue.";
    for (const category of selectedTestCategories(progress.selected)) if (!progress.answers[category.id]?.trim()) errors[category.id] = "Answer this category question to continue.";
    if (progress.selected.includes("impact") && !["Social Impact Award", "Environmental Impact Award"].includes(progress.impactTitle)) errors["impactTitle"] = "Choose the title that fits your result.";
  }
  return errors;
}
export function restoreTestProgress(raw: string): TestProgress | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const source = parsed as Record<string, unknown>;
    const progress = emptyTestProgress();
    if (!source["details"] || typeof source["details"] !== "object" || !Array.isArray(source["selected"])) return null;
    const details = source["details"] as Record<string, unknown>;
    for (const key of Object.keys(progress.details) as (keyof TestDetails)[]) if (typeof details[key] === "string") progress.details[key] = details[key];
    progress.selected = selectedTestCategories(source["selected"].filter((value): value is string => typeof value === "string")).map((category) => category.id);
    if (source["answers"] && typeof source["answers"] === "object") {
      for (const [key, value] of Object.entries(source["answers"])) if (typeof value === "string") progress.answers[key] = value;
    }
    if (typeof source["step"] === "number" && Number.isInteger(source["step"])) progress.step = Math.min(3, Math.max(0, source["step"]));
    if (["Social Impact Award", "Environmental Impact Award"].includes(String(source["impactTitle"]))) progress.impactTitle = String(source["impactTitle"]);
    return progress;
  } catch { return null; }
}