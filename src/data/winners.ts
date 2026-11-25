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
  {
    slug: "gabriel-sabadin",
    name: "Gabriel Sabadin",
    company: "Tuteliq",
    companyUrl: "https://tuteliq.ai",
    category: "Child Safety Technology™",
    year: AWARD_YEAR,
    reference: "EA-2026-0521",
    featureUrl: "/features/gabriel-sabadin",
    summary: [
      "Gabriel Sabadin has been awarded a 2026 Entrepreneur Award for Child Safety Technology™ for his work as founder and chief executive of Tuteliq, a Swedish company whose detection software flags online harm against children while it is happening.",
    ],
  },
  {
    slug: "nimisha-nailor",
    name: "Nimisha Nailor",
    company: "Kultra",
    companyUrl: "https://kultra.co.uk/",
    category: "Specialist Nutrition™",
    year: AWARD_YEAR,
    reference: "EA-2026-0522",
    featureUrl: "/features/nimisha-nailor",
    summary: [
      "Nimisha Nailor, founder of the UK brand Kultra, has won a 2026 Entrepreneur Award for building a goat whey protein business aimed at people who cannot tolerate conventional cow whey powders. The product is sold direct to consumers in four markets.",
    ],
  },
  {
    slug: "chris-poulter",
    name: "Chris Poulter",
    company: "OSINT Combine",
    companyUrl: "https://www.osintcombine.com",
    category: "Intelligence Technology\u2122",
    year: AWARD_YEAR,
    reference: "EA-2026-0523",
    featureUrl: "/features/chris-poulter",
    summary: [
      "Chris Poulter has been awarded a 2026 Entrepreneur Award for Intelligence Technology\u2122 for founding OSINT Combine, which builds open-source intelligence software and training for government agencies and law enforcement in more than 25 countries.",
    ],
  },
  {
    slug: "kenneth-kelly",
    name: "Kenneth Kelly",
    company: "Strativia",
    companyUrl: "https://www.strativia.com/",
    category: "Government Technology Services\u2122",
    year: AWARD_YEAR,
    reference: "EA-2026-0524",
    featureUrl: "/features/kenneth-kelly",
    summary: [
      "Kenneth Kelly has been awarded a 2026 Entrepreneur Award for Government Technology Services\u2122 for building Strativia, the Largo, Maryland company he co-founded in 2007, into a federal contractor with 378 employees.",
    ],
  },
  {
    slug: "sandeep-hodkasia",
    name: "Sandeep Hodkasia",
    company: "AppSecure",
    companyUrl: "https://www.appsecure.security",
    category: "Cybersecurity\u2122",
    year: AWARD_YEAR,
    reference: "EA-2026-0525",
    featureUrl: "/features/sandeep-hodkasia",
    summary: [
      "Sandeep Hodkasia has been awarded a 2026 Entrepreneur Award for Cybersecurity\u2122 for founding AppSecure, a self-funded security testing firm built on the bug-hunting work that led him to a privacy flaw in Meta AI.",
    ],
  },
  {
    slug: "amy-taylor-kabbaz",
    name: "Amy Taylor-Kabbaz",
    company: "Mama Rising",
    companyUrl: "https://mamarising.net",
    category: "Maternal Health Education\u2122",
    year: AWARD_YEAR,
    reference: "EA-2026-0526",
    featureUrl: "/features/amy-taylor-kabbaz",
    summary: [
      "Amy Taylor-Kabbaz has been awarded a 2026 Entrepreneur Award for Maternal Health Education\u2122 for building Mama Rising, which trains matrescence coaches in 29 countries, and for her work as an executive producer of the 2026 documentary Matrescence.",
    ],
  },
  {
    slug: "clifford-gross",
    name: "Clifford Gross",
    company: "Tekcapital",
    companyUrl: "https://www.tekcapital.com",
    category: "Technology Transfer\u2122",
    year: AWARD_YEAR,
    reference: "EA-2026-0527",
    featureUrl: "/features/clifford-gross",
    summary: [
      "Clifford Gross has been awarded a 2026 Entrepreneur Award for Technology Transfer\u2122 for his work as chief executive of Tekcapital, which turns university discoveries into companies and has taken portfolio businesses to public listings in London and New York.",
    ],
  },
];
