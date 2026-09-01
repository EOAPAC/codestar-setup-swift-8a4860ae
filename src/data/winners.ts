import { AWARD_YEAR } from "@/content/award";

export type Winner = {
  slug: string;
  name: string;
  company: string;
  companyUrl: string;
  category: string;
  year: number;
  summary: string[];
  reference: string;
  criteriaVersion?: string;
  featureUrl?: string;
};

export const WINNERS: Winner[] = [
  {
    slug: "jeremy-levitt",
    name: "Jeremy Levitt",
    company: "Regent Bridge",
    companyUrl: "https://www.regentbridge.com",
    category: "Mergers and Acquisitions Advisory",
    year: AWARD_YEAR,
    reference: "EA-2026-0417",
    featureUrl: "/features/jeremy-levitt",
    summary: [
      "Jeremy Levitt has been recognized with a 2026 Entrepreneur Award in Mergers and Acquisitions Advisory. Levitt founded Regent Bridge, which connects owners of businesses valued at five million dollars and above with mergers and acquisitions professionals working internationally. Owners meeting that threshold can request an assessment of the business at no charge before any engagement begins.",
    ],
  },
];
