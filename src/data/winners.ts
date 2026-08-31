import { AWARD_YEAR } from "@/content/award";

export type Winner = {
  slug: string;
  name: string;
  company: string;
  category: string;
  year: number;
  summary: string[];
  featureUrl?: string;
};

export const WINNERS: Winner[] = [
  {
    slug: "jason-norton",
    name: "Jason Norton",
    company: "Loca-Nation",
    category: "Independent Music Platform Innovation",
    year: AWARD_YEAR,
    summary: [
      "Jason Norton has been recognized with a 2026 Entrepreneur Award in Independent Music Platform Innovation. Norton founded Loca-Nation, a United Kingdom chart platform built exclusively for unsigned and independent artists, where listener votes rather than label promotion determine position. The platform runs on three account types, each with a distinct role: artists upload music to be discovered, listeners vote for the music they want to hear, and music industry professionals use the resulting rankings to scout talent.",
      "Voting feeds the official Loca-Nation Top 100. Around the chart Norton built the working tools an independent act would otherwise assemble separately, including a sync library that places music into computer games, television and film, electronic press kit tools, and a generator for digital and physical posters carrying QR codes. Electronic entertainment boards, a knowledge hub and artist forums complete the platform.",
      "Restricting eligibility to independent and unsigned artists is the decision the platform rests on, and it keeps new releases from competing for attention with major-label catalogues.",
    ],
  },
];
