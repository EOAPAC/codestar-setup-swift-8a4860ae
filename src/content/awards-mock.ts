// Presentation data only; never configure the live entry form or checkout from this module.
export const MOCK_PRICES = { category: 129.9, feature: 997, physicalAward: 197 } as const;
export const MOCK_ELIGIBILITY = { emergingTradingYears: 3, growthTradingYears: 2, growthMeasurementMonths: 12, employerEmployees: 5 } as const;
export const MOCK_ENTRY_RULES = { openAllYear: true, recurring: false, separateJudging: true, multipleCategories: true } as const;
export const MOCK_AWARDS = [
  { slug: "entrepreneur-of-distinction", name: "Entrepreneur of Distinction", icon: "logo", price: MOCK_PRICES.category,
    description: "For founders whose business stands out in its industry: an original idea, real traction and one result worth pointing to.",
    tell: "What you built, the traction it has and one standout achievement." },
  { slug: "high-growth-founder", name: "High-Growth Founder", icon: "growth", price: MOCK_PRICES.category,
    description: "For founders with at least two years of trading and strong growth over the last 12 months, with the figures to show it.",
    tell: "Your last 12 months against the 12 before, and what drove the change." },
  { slug: "innovator", name: "Innovator", icon: "idea", price: MOCK_PRICES.category,
    description: "For founders whose new product, service or approach is already delivering results.",
    tell: "What is new, who uses it and what changed for them." },
  { slug: "turnaround-leader", name: "Turnaround Leader", icon: "turnaround", price: MOCK_PRICES.category,
    description: "For founders who have led a struggling business back to stronger performance.",
    tell: "Where the business was, what you changed and where it is now." },
  { slug: "employer-of-choice", name: "Employer of Choice", icon: "team", price: MOCK_PRICES.category,
    description: "For founders with at least five employees who can show strong staff retention and a positive workplace.",
    tell: "How many people work with you, how long they stay and why." },
  { slug: "impact-leader", name: "Impact Leader", icon: "globe", price: MOCK_PRICES.category,
    description: "For founders delivering measurable benefits to communities, society or the environment.",
    tell: "Who benefits, how they benefit and how you measure it." },
  { slug: "emerging-founder", name: "Emerging Founder", icon: "sprout", price: 0,
    description: "For founders whose business began trading in the last three years and already has paying customers.",
    tell: "When you started, your first customers and what you have built since." },
].map((award) => ({ ...award, title: `Named a 2027 ${award.name} by the Entrepreneur Awards` }));
export type MockAward = (typeof MOCK_AWARDS)[number];
export function mockAwardPrice(slug: string) { return MOCK_AWARDS.find((award) => award.slug === slug)?.price; }
export const HERO_SOURCES = [
  "square-entrepreneur-of-distinction", "square-high-growth-founder", "square-innovator",
  "square-turnaround-leader", "square-employer-of-choice", "square-impact-leader",
].map((name) => `/winner-samples/hero/${name}.webp`);
export const EMERGING_SAMPLE = "/winner-samples/hero/square-emerging-founder.webp";
