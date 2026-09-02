import portraitAsset from "@/assets/jeremy-portrait.jpg.asset.json";
import andyFunkPortraitAsset from "@/assets/andy-funk.png.asset.json";
import adamPiskPortraitAsset from "@/assets/adam-pisk.jpg.asset.json";
import awardAsset from "@/assets/feature-award.jpg.asset.json";

export type FeatureSegment =
  | { type: 'text'; text: string }
  | { type: 'link'; text: string; href: string; external?: boolean };

export type FeatureBlock =
  | { type: 'p'; text: string; segments?: never }
  | { type: 'p'; segments: FeatureSegment[]; text?: never }
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
  portraitAspect?: string;
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
  },
  {
    slug: "andy-funk",
    winnerSlug: "andy-funk",
    headline: "Andy Funk Recognized With a 2026 Entrepreneur Award",
    subheadline: "Andy Funk Receives a 2026 Entrepreneur Award in Leadership",
    body: [
      { type: 'p', segments: [
        { type: 'text', text: "Andy Funk has been recognized with a 2026 Entrepreneur Award in Leadership as the founder of " },
        { type: 'link', text: "Ho'omau Endurance Co.", href: "https://hoomau.co/", external: true },
        { type: 'text', text: ", a young venture that has moved quickly to establish a distinct place in the endurance sector. The award centers on Funk's role in building a business that brings training camps, performance testing, racing, and community under one roof, while also advancing an event concept shaped by direct experience in ultra-distance sport." },
      ]},
      { type: 'p', text: "The recognition focuses on the founder rather than the company, and in this case the judges pointed to a model that links coaching, athlete services, and race creation in a way that is unusually integrated for a business founded in 2024. At the center of that assessment is Vegas In 24, an ultra race with four long-distance routes that finish at the Welcome to Las Vegas sign under a fixed 24-hour cutoff, together with the broader Ho'omau platform designed for swimmers, cyclists, runners, triathletes, and rowers." },
      { type: 'h2', text: "The Endurance Venture" },
      { type: 'p', text: "Ho'omau Endurance Co. was formed in Santa Monica and presents itself as a base for athletes who want a more connected structure for preparation and competition. Its work spans training camps in Tenerife and Nevada, performance testing, coaching, ultra racing, and a member community known as Club Ho'omau. Rather than treating those elements as separate offers, the business combines them into a single operating model. That structure mattered in the award decision because it addresses a familiar weakness in amateur endurance sport, where athletes often move between disconnected providers for coaching, diagnostics, events, and peer support." },
      { type: 'quote', text: "The point was to build one place for training, testing, racing, and community instead of a dozen services that never talk to each other.", attribution: "Andy Funk" },
      { type: 'h2', text: "Why the Achievement Stood Out" },
      { type: 'p', text: "The judges' attention settled on the combination of personal athletic accomplishment and practical event design. In April 2016, Funk completed the ride from Los Angeles to the Welcome to Las Vegas sign in 20 hours, 41 minutes and 25 seconds, a benchmark that the business says has not been surpassed on its own tracking. That effort later became the basis for Vegas In 24, which now offers routes from Phoenix, Los Angeles, San Diego, and Reno, each built around the same absolute time limit. Finishers across all four routes qualify for a Grand Slam prize, giving the series a clear long-range structure. The next start is scheduled for October 24, 2026, at Chase Field in Phoenix." },
      { type: 'p', text: "The wider market context also helps explain the significance of the award. IRONMAN reported more than 250,000 race registrations across its IRONMAN and IRONMAN 70.3 events in 2025, with participation among athletes under 30 up 35 percent year over year, while early 2026 demand showed dozens of races already sold out. Those figures point to continued appetite for demanding endurance formats and to a younger intake entering long-course competition. Against that backdrop, the judges identified Funk's work as notable because it offers a highly specific objective in a corner of the market where single-day ultra cycling remains relatively scarce. The panel also noted the discipline required to design routes that are measurable, supportable, and credible late into the final hours of an event." },
      { type: 'quote', text: "Single-day ultra racing is unforgiving to design. The finish is fixed, the clock is absolute, and every route has to be measured, marshalled, and survivable at hour 23.", attribution: "Andy Funk" },
      { type: 'h2', text: "The Judges' Final Words" },
      { type: 'quote', text: "Andy Funk's selection for a 2026 Entrepreneur Award reflects more than ambition. It reflects execution under pressure, a coherent endurance model, and a founder willing to test the same standards in competition that the business asks others to meet. In a field where many concepts remain broad, this one is concrete, measurable, and built around a demanding public benchmark.", attribution: "Alexandra Dalton, a spokesperson for the Entrepreneur Awards" }
    ],
    info: {
      industry: "Leadership",
      location: "Santa Monica, California",
      whatTheyDo: "Andy Funk is the founder of Ho'omau Endurance Co., a platform bringing training camps, performance testing, coaching, ultra racing, and a member community known as Club Ho'omau under one roof. He also created Vegas In 24, an ultra race with routes from Phoenix, Los Angeles, San Diego, and Reno finishing at the Welcome to Las Vegas sign under a fixed 24-hour cutoff.",
      website: "hoomau.co",
      websiteUrl: "https://hoomau.co/"
    },
    portrait: andyFunkPortraitAsset.url,
    portraitCaption: "Andy Funk, founder of Ho'omau Endurance Co.",
    portraitAspect: "800 / 199",
    awardImage: awardAsset.url
  },
  {
    slug: "adam-pisk",
    winnerSlug: "adam-pisk",
    headline: "Adam Pisk, Director of BruntWork, has been recognized with a 2026 Entrepreneur Award for Remote Workforce Leadership, according to a winner record published by the award program.",
    subheadline: "The recognition is for his work directing an outsourcing and staffing operation. The award centers on his role in leading a company that recruits, vets, and oversees remote staff for small and mid-sized businesses.",
    body: [
      { type: 'p', text: "The award program is designed to recognize individual leadership. Under Pisk's direction, BruntWork expanded its operations by offering management oversight alongside standard staffing services for distributed teams." },
      { type: 'h2', text: "The Leadership Journey" },
      { type: 'p', text: "The award acknowledges Pisk's foundational background in the sector. Pisk initially worked in manufacturing in Australia, where local talent shortages led him to begin recruiting internationally." },
      { type: 'p', text: "He used this experience to structure a remote workforce model intended for smaller businesses. Instead of focusing solely on recruitment, Pisk implemented operational models that include the ongoing administration of remote staff." },
      { type: 'quote', text: "We need to be valuable to both our clients and to the staff,", attribution: "Adam Pisk said" },
      { type: 'h2', text: "The Judge's Final Words" },
      { type: 'quote', text: "Adam Pisk's selection for a 2026 Entrepreneur Award reflects more than growth figures. It reflects two decades of working with distributed teams before scaling a business around them. The company executed under real operational pressure, utilizing a model that removes the management burden rather than moving the cost. In a field crowded with intermediaries, this one carries the responsibility it sells,", attribution: "the judging panel noted" },
      { type: 'h2', text: "About the Entrepreneur Awards" },
      { type: 'p', text: "The Entrepreneur Awards program recognizes individual leaders. In this case, the award acknowledges Pisk's role as Director in leading a remote staffing business that handles recruitment, vetting, and daily oversight for clients." },
      
    ],
    info: {
      industry: "Remote Workforce Leadership",
      location: "Singapore",
      whatTheyDo: "Adam Pisk is Director of BruntWork, an outsourcing business that recruits, vets, and manages remote staff for small and mid-sized businesses, operating across several continents.",
      website: "bruntwork.com",
      websiteUrl: "https://www.bruntwork.com/"
    },
    portrait: adamPiskPortraitAsset.url,
    portraitCaption: "Adam Pisk, Director of BruntWork",
    awardImage: awardAsset.url
  }
];
