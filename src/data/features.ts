import portraitAsset from "@/assets/jeremy-portrait.jpg.asset.json";
import awardAsset from "@/assets/feature-award.jpg.asset.json";

export type FeatureBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string; attribution: string };

export type Feature = {
  slug: string;
  winnerSlug: string;
  headline: string;
  subheadline: string;
  body: FeatureBlock[];
  info: { industry: string; location: string; whatTheyDo: string; website: string; websiteUrl: string };
  portrait?: string;
  portraitCaption?: string;
  awardImage?: string;
};

export const FEATURES: Feature[] = [
  {
    slug: "jeremy-levitt",
    winnerSlug: "jeremy-levitt",
    headline: "Jeremy Levitt Recognized With a 2026 Entrepreneur Award",
    subheadline: "Jeremy Levitt Receives a 2026 Entrepreneur Award in Mergers and Acquisitions Advisory",
    body: [
      { type: 'p', text: "Jeremy Levitt has been recognized with a 2026 Entrepreneur Award for his work in mergers and acquisitions advisory, building Regent Bridge into a matching layer between business owners and the advisers qualified to represent them. The award acknowledges a founder who identified a structural imbalance in how private businesses are sold and built an operating model to correct it, rather than a service that profits from the imbalance itself." },
      { type: 'p', text: "Levitt founded and leads Regent Bridge, which connects owners of businesses valued at five million dollars and above with mergers and acquisitions professionals working internationally. Owners meeting that threshold can request an assessment of the business at no charge before any engagement begins. [SAMPLE] The platform maintains a network of 340 advisers across 22 countries, and has assessed more than 1,100 businesses with a median value of $12 million. The model addresses a specific problem: most owners sell a business once, and negotiate against buyers and advisers who transact continuously." },
      { type: 'h2', text: "Originality" },
      { type: 'p', text: "Regent Bridge's distinguishing decision is what it declines to do. The platform does not represent owners, does not take a position in transactions, and does not accept advisers on the basis of stated specialism. [SAMPLE] Network admission is filtered on completed transactions in the owner's sector, region and size band, which excludes a substantial share of applicants who describe themselves as generalists." },
      { type: 'p', text: "That filter is the product. Directories of advisers already exist in volume, and their weakness is that every entry claims coverage of every sector. Levitt built the business around verification instead, accepting slower growth in exchange for introductions that hold up. [SAMPLE] Owners typically receive three introductions rather than one, a deliberate structure intended to restore comparison to a decision most owners make without any." },
      { type: 'h2', text: "Traction" },
      { type: 'p', text: "[SAMPLE] Of the 1,100 owners assessed, approximately one third were advised to prepare and return rather than proceed immediately, an outcome that generates no revenue for the platform and reflects the assessment operating as diagnosis rather than acquisition." },
      { type: 'p', text: "[SAMPLE] Three sectors — industrial services, healthcare services and specialist manufacturing — account for more than half of all introductions, indicating depth in defined verticals rather than thin coverage across many. The commercial model reinforces this: [SAMPLE] fees are earned only on introductions that convert to a mandate, aligning the platform's return with the quality of the match rather than the volume of them." },
      { type: 'h2', text: "A Standout Achievement" },
      { type: 'p', text: "Building a marketplace where one side transacts once is a structural difficulty rather than a marketing one. Advisers return; owners do not. Levitt's response was to remove cost entirely from the point at which owners are least informed and most exposed, funding the business from the adviser side of the transaction." },
      { type: 'p', text: "[SAMPLE] The result is a platform that has assessed over a thousand businesses without charging any of them for the assessment, while maintaining a network filtered tightly enough that a third of adviser applications are declined. Holding both of those positions at once, at this scale, is the achievement the award recognizes." },
      { type: 'h2', text: "How the Entry Was Assessed" },
      { type: 'p', text: "Entries to the Entrepreneur Awards are read against three published criteria, each weighted equally: Originality, Traction, and a Standout Achievement. Each is assessed in the context of the founder's stage and industry, so that businesses of different sizes and sectors are compared on a common basis rather than on absolute scale." },
      { type: 'p', text: "Levitt's entry was judged strongest on Originality, where the decision to filter advisers on completed transactions rather than claimed expertise represents a defensible position that competitors have declined to take, and on the Standout Achievement criterion, where the funding structure resolves a problem most marketplaces in this category have not." },
      { type: 'h2', text: "Final Words" },
      { type: 'p', text: "Jeremy Levitt's 2026 Entrepreneur Award is made in the category of Mergers and Acquisitions Advisory, a designation that fits the record. He identified a moment where information is unevenly distributed, built infrastructure to redistribute it, and declined the revenue available from leaving it as it was." },
      { type: 'quote', text: "Levitt built the filter first and the business second, which is the harder order. Regent Bridge earns its position by turning owners away when the answer is to wait, and that discipline is what makes the introductions worth something when they come.", attribution: "Alexandra Dalton, a spokesperson for the Entrepreneur Awards" }
    ],
    info: {
      industry: "Mergers and Acquisitions Advisory",
      location: "[SAMPLE] London, United Kingdom",
      whatTheyDo: "Jeremy Levitt is the founder of Regent Bridge, a platform connecting owners of businesses valued at five million dollars and above with mergers and acquisitions professionals working internationally. Owners meeting that threshold receive a free assessment covering sector, revenue band, ownership structure and objective, and are matched to advisers filtered on completed transactions in their sector, region and size band. [SAMPLE] The network spans 340 advisers across 22 countries.",
      website: "regentbridge.com",
      websiteUrl: "https://www.regentbridge.com"
    },
    portrait: portraitAsset.url,
    portraitCaption: "Jeremy Levitt, founder of Regent Bridge",
    awardImage: awardAsset.url
  }
];
