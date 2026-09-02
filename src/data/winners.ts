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
  {
    slug: "adam-pisk",
    name: "Adam Pisk",
    company: "BruntWork",
    companyUrl: "https://www.bruntwork.com/",
    category: "Remote Workforce Leadership",
    year: AWARD_YEAR,
    reference: "EA-2026-0519",
    featureUrl: "/features/adam-pisk",
    summary: [
      "Adam Pisk has been awarded a 2026 Entrepreneur Award for Remote Workforce Leadership for his work as Director of BruntWork, an outsourcing business that recruits, vets, and manages remote staff for small and mid-sized businesses across several continents.",
    ],
  },
  {
    slug: "ashton-bishop",
    name: "Ashton Bishop",
    company: "Step Change",
    companyUrl: "https://www.stepchange.com/",
    category: "Value Communication™",
    year: AWARD_YEAR,
    reference: "EA-2026-0520",
    featureUrl: "/features/ashton-bishop",
    summary: [
      "Ashton Bishop, founder and chief executive of the Sydney consultancy Step Change, has received a 2026 Entrepreneur Award for work on how companies communicate commercial value. The award centers on the Value Gap Audit, a free diagnostic launched in July 2026 that scores a company's website, its competitor set, and one marketing document in about two minutes.",
    ],
  },
];
