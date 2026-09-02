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
    slug: "andy-funk",
    name: "Andy Funk",
    company: "Ho'omau Endurance Co.",
    companyUrl: "https://hoomau.co/",
    category: "Leadership",
    year: AWARD_YEAR,
    reference: "EA-2026-0518",
    featureUrl: "/features/andy-funk",
    summary: [
      "Andy Funk has been recognized with a 2026 Entrepreneur Award in Leadership. Funk founded Ho'omau Endurance Co., which brings training camps, performance testing, coaching, ultra racing, and a member community under one roof, and created Vegas In 24, an ultra race with four long-distance routes finishing at the Welcome to Las Vegas sign under a fixed 24-hour cutoff.",
    ],
  },
];
