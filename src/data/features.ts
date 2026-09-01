import portraitAsset from "@/assets/jeremy-portrait.jpg.asset.json";

export type FeatureBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string };

export type Feature = {
  slug: string;
  winnerSlug: string;
  kicker: string;
  headline: string;
  standfirst: string;
  body: FeatureBlock[];
  footnote: string;
  portrait?: string;
  portraitCaption?: string;
  awardImage?: string;
};

export const FEATURES: Feature[] = [
  {
    slug: "jeremy-levitt",
    winnerSlug: "jeremy-levitt",
    kicker: "2026 Entrepreneur Award · Mergers and Acquisitions Advisory",
    headline: "The founder who found out most owners only ever talk to one buyer",
    standfirst: "Jeremy Levitt built Regent Bridge after watching business owners sell to the first person who made an offer. His answer was a matching layer between owners and the advisers who actually specialise in their sector.",
    portrait: portraitAsset.url,
    portraitCaption: "Jeremy Levitt, founder of Regent Bridge",
    awardImage: awardAsset.url,
    body: [
      { type: 'p', text: "Most people sell a business once. They spend twenty years building something, and then, at the moment it matters most, they are asked to negotiate against people who do this every week." },
      { type: 'p', text: "Jeremy Levitt saw the imbalance from the adviser's side. \"You'd get a call from an owner who'd already agreed a number,\" he says. \"Not a bad number. Just the only number anyone had offered them.\"" },
      { type: 'p', text: "Regent Bridge exists to widen that moment. Owners of businesses valued at five million dollars and above come to the platform for a free assessment. What they get back is not a valuation in the usual sense but a read on who should be at the table: which advisers have closed in their sector, in their region, at their size, and which of them are actively working with buyers now." },
      { type: 'h2', text: "What the assessment actually does" },
      { type: 'p', text: "The intake is deliberately short. Sector, revenue band, ownership structure, and what the owner wants the sale to achieve — a full exit, a partial release, a succession. [SAMPLE] Regent Bridge reports that around 40 percent of owners who complete it discover their objective is achievable without a full sale, which changes the shape of the conversation before an adviser is ever introduced." },
      { type: 'p', text: "From there the platform matches against a network of [SAMPLE] 340 mergers and acquisitions professionals across 22 countries, filtered on completed transactions rather than stated specialisms. Levitt is blunt about why that distinction matters." },
      { type: 'quote', text: "Every adviser says they cover your sector. Far fewer have closed in it. We only count the ones who have." },
      { type: 'p', text: "An owner typically receives three introductions. Not a shortlist to work through, and not a single recommendation — three, because [SAMPLE] the platform's own data shows owners who speak to at least three advisers before appointing one report materially better terms than those who appoint the first they meet." },
      { type: 'h2', text: "Building for a transaction that happens once" },
      { type: 'p', text: "The hard part of a marketplace is the side that only shows up once. Advisers are repeat users; owners are not. Levitt's answer was to make the platform free at the point where owners are most cautious and most under-informed, and to charge nothing for the assessment at all." },
      { type: 'p', text: "[SAMPLE] Regent Bridge takes a fee only on completed introductions that convert to a mandate, which means the incentive is to introduce well rather than often. It also means the assessment can be genuinely honest about the cases where the answer is to wait." },
      { type: 'p', text: "\"An owner who isn't ready is not a lost customer,\" Levitt says. \"They're a customer in eighteen months who trusts you.\"" },
      { type: 'p', text: "That patience shows up in the operating numbers. [SAMPLE] Of the 1,100 owners assessed to date, roughly a third were advised to prepare and return rather than proceed. The median business value across the assessed set sits at [SAMPLE] $12 million." },
      { type: 'h2', text: "What comes next" },
      { type: 'p', text: "The constraint on a business like this is not demand. It is adviser quality, and quality does not scale by adding names to a list." },
      { type: 'p', text: "Levitt's stated priority is depth in the sectors where Regent Bridge is already strong, rather than breadth across every industry at once. [SAMPLE] Three sector verticals — industrial services, healthcare services and specialist manufacturing — account for over half of introductions, and the near-term plan is to make those three unarguable before opening more." },
      { type: 'p', text: "There is a version of this business that grows faster by loosening who gets into the network. Levitt has been explicit that it is not the one he is building." },
      { type: 'p', text: "\"The whole product is the filter,\" he says. \"Take the filter away and you've just built another directory.\"" }
    ],
    footnote: "Jeremy Levitt has been recognised with a 2026 Entrepreneur Award in Mergers and Acquisitions Advisory."
  }
];
