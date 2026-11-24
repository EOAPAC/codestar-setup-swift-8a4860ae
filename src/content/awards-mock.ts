// Presentation data only; these values must not configure entry or checkout.
export const MOCK_PRICES = {
  early: 129.9,
  standard: 159.9,
  lateFee: 55,
  late: 214.9,
  feature: 997,
  physicalAward: 197,
} as const;

export const MOCK_DATES = {
  earlyEnds: "2027-01-31",
  freeEnds: "2027-05-15",
  lateStarts: "2027-05-16",
  entriesClose: "2027-05-31",
  decisionBusinessDays: 5,
} as const;

export const MOCK_ELIGIBILITY = { startupEarliestYear: 2024, growthTradingYears: 2, employerEmployees: 5 } as const;

export const MOCK_AWARDS = [
  {
    slug: "entrepreneur-of-the-year", name: "Entrepreneur of the Year", icon: "logo",
    description: "For founders making a distinctive contribution in their industry through the business they've built.",
    tell: "What you built, the traction it has and one standout achievement.",
    title: "Entrepreneur of the Year 2027, followed by your industry",
  },
  {
    slug: "startup-founder", name: "Startup Founder of the Year", icon: "sprout",
    description: "For founders of businesses that began trading in 2024 or later and already have paying customers.",
    who: "Founders whose business started trading in 2024 or later and already has paying customers.",
    tell: "When you started, your first customers and what you have built since.",
    title: "Startup Founder of the Year 2027",
  },
  {
    slug: "growth-founder", name: "Growth Founder of the Year", icon: "growth",
    description: "For founders with at least two years of trading and measurable growth over the last 12 months.",
    who: "Founders with at least two years of trading, so there is a full year to compare.",
    tell: "Your last 12 months against the 12 before, and what drove the change.",
    title: "Growth Founder of the Year 2027",
  },
  {
    slug: "innovator", name: "Innovator of the Year", icon: "idea",
    description: "For founders whose new product, service or approach is already delivering results.",
    tell: "What is new, who uses it and what changed for them.", title: "Innovator of the Year 2027",
  },
  {
    slug: "turnaround", name: "Turnaround of the Year", icon: "turnaround",
    description: "For founders who have led a struggling business back to stronger performance.",
    tell: "Where the business was, what you changed and where it is now.", title: "Turnaround of the Year 2027",
  },
  {
    slug: "employer", name: "Employer of the Year", icon: "team",
    description: "For founders with at least five employees who can demonstrate strong staff retention and a positive workplace.",
    who: "Founders with at least five employees.",
    tell: "How many people work with you, how long they stay and why.", title: "Employer of the Year 2027",
  },
  {
    slug: "impact-founder", name: "Impact Founder of the Year", icon: "globe",
    description: "For founders delivering measurable benefits to communities, society or the environment.",
    tell: "Who benefits, how they benefit and how you measure it.", title: "Impact Founder of the Year 2027",
  },
] as const;

export type MockAward = (typeof MOCK_AWARDS)[number];
export function mockAwardPrice(slug: string, period: "early" | "standard" | "late") {
  if (slug === "entrepreneur-of-the-year") return period === "late" ? MOCK_PRICES.lateFee : 0;
  return MOCK_PRICES[period];
}