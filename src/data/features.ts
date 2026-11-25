import portraitAsset from "@/assets/jeremy-portrait.jpg.asset.json";
import adamPiskPortraitAsset from "@/assets/adam-pisk.jpg.asset.json";
import ashtonBishopPortraitAsset from "@/assets/ashton-bishop.jpg.asset.json";
import gabrielSabadinPortraitAsset from "@/assets/gabriel-sabadin.jpg.asset.json";
import nimishaNailorPortraitAsset from "@/assets/nimisha-nailor.webp.asset.json";
import chrisPoulterPortraitAsset from "@/assets/chris-poulter.jpg.asset.json";
import kennethKellyPortraitAsset from "@/assets/kenneth-kelly.jpg.asset.json";
import sandeepHodkasiaPortraitAsset from "@/assets/sandeep-hodkasia.jpg.asset.json";
import amyTaylorKabbazPortraitAsset from "@/assets/amy-taylor-kabbaz.jpg.asset.json";
import cliffordGrossPortraitAsset from "@/assets/clifford-gross.jpg.asset.json";
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
      { type: 'p', text: "[SAMPLE] Three sectors (industrial services, healthcare services and specialist manufacturing) account for more than half of all introductions, indicating depth in defined verticals rather than thin coverage across many. The commercial model reinforces this: [SAMPLE] fees are earned only on introductions that convert to a mandate, aligning the platform's return with the quality of the match rather than the volume of them." },
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
    slug: "adam-pisk",
    winnerSlug: "adam-pisk",
    headline: "Adam Pisk Wins A 2026 Entrepreneur Award for Remote Workforce Leadership",
    subheadline: "The recognition focuses on individual leadership, acknowledging Pisk's role in directing an international remote staffing operation.",
    body: [
      { type: 'p', text: "The award program is designed to recognize individual leadership. Under Pisk's direction, BruntWork expanded its operations by offering management oversight alongside standard staffing services for distributed teams." },
      { type: 'h2', text: "The Leadership Journey" },
      { type: 'p', text: "The award acknowledges Pisk's foundational background in the sector. Pisk initially worked in manufacturing in Australia, where local talent shortages led him to begin recruiting internationally." },
      { type: 'p', text: "He used this experience to structure a remote workforce model intended for smaller businesses. Instead of focusing solely on recruitment, Pisk implemented operational models that include the ongoing administration of remote staff." },
      { type: 'quote', text: "We need to be valuable to both our clients and to the staff,", attribution: "Adam Pisk said" },
      { type: 'h2', text: "The Judge's Final Words" },
      { type: 'quote', text: "Adam Pisk's selection for a 2026 Entrepreneur Award reflects more than growth figures. It reflects two decades of working with distributed teams before scaling a business around them. The company executed under real operational pressure, utilizing a model that removes the management burden rather than moving the cost. In a field crowded with intermediaries, this one carries the responsibility it sells,", attribution: "the judging panel noted" },
      { type: 'h2', text: "About the Entrepreneur Awards" },
      { type: 'p', text: "The Entrepreneur Awards program recognizes individual leaders. In this case, the award acknowledges Pisk's role as Director in leading a remote staffing business that handles recruitment, vetting, and daily oversight for clients." }
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
  },
  {
    slug: "ashton-bishop",
    winnerSlug: "ashton-bishop",
    headline: "Ashton Bishop Wins A 2026 Entrepreneur Award For Value Communication™",
    subheadline: "Ashton Bishop, founder and chief executive of the Sydney consultancy Step Change, has received a 2026 Entrepreneur Award for work on how companies communicate commercial value.",
    body: [
      { type: 'p', text: "Ashton Bishop, founder and chief executive of the Sydney consultancy Step Change, has received a 2026 Entrepreneur Award for work on how companies communicate commercial value. The award centers on the Value Gap Audit, a free diagnostic the firm launched in July 2026 that scores a company's website, its competitor set, and one marketing document in about two minutes." },
      { type: 'p', text: "The award recognizes the founder, not the company. Grit Daily reported on August 31, 2026 that roughly 290 Australian businesses had used the audit since launch. Step Change's published client list includes Commonwealth Bank and Sony Pictures." },
      { type: 'h2', text: "Why The Win Matters" },
      { type: 'p', text: "Step Change argues that weak sales performance often reflects a communication problem rather than a weak offer, and that the gap surfaces in websites, proposals, and sales material before a buyer speaks to anyone. The judges pointed to the decision to publish a measurable diagnostic at no charge, and to frame it as an assessment rather than a pitch." },
      { type: 'quote', text: "Most value propositions do not break. They leak,", attribution: "Bishop wrote in July 2026" },
      { type: 'h2', text: "Market Context" },
      { type: 'p', text: "Research cited around the launch describes a buying environment that rewards clarity early. Gartner reported in December 2020 that 64 percent of more than 1,100 business buyers surveyed could not tell one company's digital experience from another's. Forrester's 2025 Buyers' Journey Survey found that 68 percent of B2B buyers begin a purchase with a front-runner in mind, and that the front-runner wins 80 percent of the time. A Gartner survey of 646 B2B buyers, conducted in August and September 2025 and released in March 2026, found 67 percent preferred a rep-free experience and 45 percent had used AI during a recent purchase." },
      { type: 'p', text: "Those findings point to evaluation happening before a sales conversation begins. The judges treated the audit as a response to that shift, testing whether a company's message holds up when nobody is present to explain it." },
      { type: 'quote', text: "It's about seeing where your value gaps are,", attribution: "Bishop said" },
      { type: 'h2', text: "The Judges Final Words" },
      { type: 'quote', text: `The panel looked for a defined problem, a measurable response, and restraint in how the results were described," Alexandra Dalton said. "This entry set out a common weakness, put a number on it, and left the findings to speak. In a year when buyers decide more before contacting a supplier, that is useful work.`, attribution: "Alexandra Dalton, a spokesperson for the Entrepreneur Awards" }
    ],
    info: {
      industry: "Value Communication™",
      location: "Sydney, Australia",
      whatTheyDo: "Ashton Bishop is founder and chief executive of Step Change, a Sydney consultancy that helps companies diagnose and close gaps in how they communicate commercial value. Its Value Gap Audit scores a company's website, competitor set and one marketing document in about two minutes.",
      website: "stepchange.com",
      websiteUrl: "https://www.stepchange.com/"
    },
    portrait: ashtonBishopPortraitAsset.url,
    portraitCaption: "Ashton Bishop, founder and chief executive of Step Change",
    awardImage: awardAsset.url
  },
  {
    slug: "gabriel-sabadin",
    winnerSlug: "gabriel-sabadin",
    headline: "Gabriel Sabadin Wins A 2026 Entrepreneur Award For Child Safety Technology™",
    subheadline: "Sabadin, founder and chief executive of Swedish company Tuteliq, won for building detection software that flags online harm against children while it is happening.",
    body: [
      { type: 'p', text: "Gabriel Sabadin, founder and chief executive of Tuteliq, has won a 2026 Entrepreneur Award for building detection software that flags online harm against children while it is happening. The company sells a child safety API that reads text, voice, image, and video across 27 languages, scoring for grooming, coercive control, exploitation, bullying, fraud, and radicalization as a conversation unfolds." },
      { type: 'p', text: "The award recognizes the founder, not the company. Tuteliq was founded in Sweden in 2024, and in July 2026 joined the Internet Watch Foundation as a member, adding the IWF's URL List and Image Hash List, which hold digital fingerprints of known child sexual abuse material, to its detection pipeline." },
      { type: 'h2', text: "Why The Win Matters" },
      { type: 'p', text: "Most moderation systems classify one message at a time and act after harmful material has already been shared. Tuteliq scores conversations as they develop, tracking shifts in power, trust-building sequences, and escalation patterns that single-message classifiers tend to miss. Sabadin, a computer scientist with a doctorate and more than 25 years in software engineering and machine learning, is the named inventor on the patent-pending pipeline behind it. The judges pointed to the decision to build the detection science alongside a criminologist rather than treat the problem as generic classification." },
      { type: 'quote', text: "The difference is that authentication protects your system. Child safety protects your users,", attribution: "Sabadin wrote in a post for developers" },
      { type: 'h2', text: "Market Context" },
      { type: 'p', text: "The scale of the problem sharpened through 2026. The Internet Watch Foundation assessed 6,310 AI-generated images meeting the legal definition of child sexual abuse in the first six months of the year, against 4,512 across all of 2025, a 40 percent rise in half the time. Girls appeared in 98 percent of the first-half images, and children aged seven to 13 accounted for 79 percent of them, up from 70 percent a year earlier. Regulation has moved in parallel, with the EU Digital Services Act, the UK Online Safety Act, and the Australian Online Safety Act placing duties on platforms that serve young users." },
      { type: 'quote', text: "Every day at the IWF, our analysts see the horrific results of online grooming and sexual exploitation. We don't want any more children to slip through the gaps and Tuteliq can help make that a reality.", attribution: "Kerry Smith, chief executive of the Internet Watch Foundation, said in July" },
      { type: 'h2', text: "The Judges Final Words" },
      { type: 'quote', text: "The panel looked for a defined problem and a response that can be checked. This entry built its detection science with a criminologist, wired an independent body's data into its own pipeline, and kept its technical claims specific enough to test. In a category where good intentions are common, that is the harder path.", attribution: "Alexandra Dalton, a spokesperson for the Entrepreneur Awards" },
      { type: 'h2', text: "About The Entrepreneur Awards" },
      { type: 'p', text: "The Entrepreneur Awards recognizes the founder rather than the company. Here the award acknowledges Sabadin's work in moving child safety detection from after-the-fact review to something a platform can act on while a conversation is still running." }
    ],
    info: {
      industry: "Child Safety Technology™",
      location: "Sweden",
      whatTheyDo: "Gabriel Sabadin is founder and chief executive of Tuteliq, which supplies a real-time child safety API that detects grooming, coercive control, exploitation, bullying, fraud, and radicalization across text, voice, image, and video in 27 languages.",
      website: "tuteliq.ai",
      websiteUrl: "https://tuteliq.ai"
    },
    portrait: gabrielSabadinPortraitAsset.url,
    portraitCaption: "Gabriel Sabadin, Founder and CEO of Tuteliq",
    awardImage: awardAsset.url
  },
  {
    slug: "nimisha-nailor",
    winnerSlug: "nimisha-nailor",
    headline: "Nimisha Nailor Wins A 2026 Entrepreneur Award For Specialist Nutrition™",
    subheadline: "Nimisha Nailor, founder of the UK brand Kultra, has won a 2026 Entrepreneur Award for building a goat whey protein business aimed at people who cannot tolerate conventional cow whey powders. The product is sold direct to consumers in four markets.",
    body: [
      { type: 'p', text: "Nimisha Nailor, founder of the British nutrition brand Kultra, has won a 2026 Entrepreneur Award for building a protein supplement business around an ingredient the mainstream market had largely left alone. Kultra sells a goat whey protein powder made from three ingredients, goat whey concentrate, natural vanilla and stevia leaf, and ships to customers in the United Kingdom, Ireland, Canada and the United States." },
      { type: 'p', text: "Nailor started the business after what the company describes as years of searching without success for a goat whey protein she could use daily, having dealt with chronic inflammation and polycystic ovary syndrome. The company trades as Kultra Wellness Ltd and is registered in England and Wales." },
      { type: 'h2', text: "Why The Win Matters" },
      { type: 'p', text: "Nearly all retail protein powder is made from cow whey, a by-product of industrial cheesemaking that is cheap, plentiful and sold at volume. Goat whey is none of those things. Kultra sources from grass-fed European goats on small Dutch farms, which constrains supply and raises cost, and the product retails at £69.99 for 30 servings, or £59.49 on a monthly subscription, against mass-market powders sold for a fraction of that." },
      { type: 'p', text: "The judges pointed to the decision to build on the harder supply chain rather than reformulate an existing one. Each serving provides 26 grams of protein, including 5.5 grams of branched-chain amino acids, and the company says every batch is tested for heavy metals and that its manufacturing is NSF GMP registered." },
      { type: 'h2', text: "Market Context" },
      { type: 'p', text: "The category is growing quickly. Grand View Research values the global protein supplements market at $31.9 billion in 2026 and projects $63.2 billion by 2033, a compound annual growth rate of 10.3 percent. Animal-based sources, whey among them, accounted for 59.9 percent of the market in 2025. The same research describes female consumers as a growing segment, a group the mass market has historically addressed last." },
      { type: 'p', text: "Against that backdrop, the judges treated Kultra as a bet on a specific, underserved buyer rather than on category growth generally: the customer who wants a conventional protein powder and has found that conventional protein powder does not agree with them." },
      { type: 'h2', text: "The Judges Final Words" },
      { type: 'quote', text: "The panel looked for a founder who had identified a real gap and accepted the cost of filling it properly. This entry did not take the cheap ingredient and market it harder. It took the difficult one, kept the formulation to three ingredients, and priced accordingly. That is a commercial decision with consequences, and she made it deliberately.", attribution: "Alexandra Dalton, a spokesperson for the Entrepreneur Awards" },
      { type: 'h2', text: "About the Entrepreneur Awards" },
      { type: 'p', text: "The Entrepreneur Awards is a recognition program for individual business founders." }
    ],
    info: {
      industry: "Specialist Nutrition™",
      location: "United Kingdom",
      whatTheyDo: "Nimisha Nailor is founder of Kultra, a British nutrition brand selling goat whey protein powder made from goat whey concentrate, natural vanilla and stevia leaf to consumers in the United Kingdom, Ireland, Canada and the United States.",
      website: "kultra.co.uk",
      websiteUrl: "https://kultra.co.uk/"
    },
    portrait: nimishaNailorPortraitAsset.url,
    portraitCaption: "Nimisha Nailor, founder of Kultra",
    portraitAspect: "240 / 210",
    awardImage: awardAsset.url
  }
,
  {
    slug: "chris-poulter",
    winnerSlug: "chris-poulter",
    headline: "Chris Poulter Wins A 2026 Entrepreneur Award For Intelligence Technology\u2122",
    subheadline: "Poulter, founder of the Australian company OSINT Combine, won for building open-source intelligence software and training used by government agencies and law enforcement in more than 25 countries.",
    body: [
      { type: 'p', text: "Chris Poulter, founder of OSINT Combine, has won a 2026 Entrepreneur Award for building open-source intelligence capability for government agencies, law enforcement and corporate security teams. The company pairs its own investigation platform, NexusXplore, with practitioner-led training, and says it supports customers in more than 25 countries from staff based in Australia, the United States, the United Kingdom and Europe." },
      { type: 'p', text: "The award recognizes the founder, not the company. Poulter founded OSINT Combine in 2018, drawing on his operational experience in the Australian Defence Force, and started with training and tradecraft before the company began building NexusXplore in 2020. It placed permanent staff in the United States in 2022, expanded into Europe in 2023, and in November 2025 merged with Kaseware, an investigative case management company based in Denver." },
      { type: 'h2', text: "Why The Win Matters" },
      { type: 'p', text: "Open-source intelligence is the work of collecting and analyzing publicly and commercially available information to support investigations and decisions. The tools matter, but so does the analyst's judgment about where to look and what a result means. OSINT Combine was built around both, selling its software alongside courses in the tradecraft behind it. The company also gives capability, training and operational support to selected NGOs working against human trafficking, and to victim identification work against child sexual exploitation. The judges pointed to the decision to keep training and software together instead of selling the platform on its own." },
      { type: 'quote', text: "The direct involvement in cases reminds us of the importance of OSINT for good,", attribution: "Poulter told State of OSINT, describing his team's counter-trafficking work" },
      { type: 'h2', text: "Market Context" },
      { type: 'p', text: "The problem these teams work on is growing. The United Nations Office on Drugs and Crime's 2024 Global Report on Trafficking in Persons, which covers 156 countries, recorded a 25 percent rise in detected trafficking victims in 2022 compared with 2019. Detected child victims rose 31 percent and made up 38 percent of all victims detected. In 2022, people of at least 162 nationalities were trafficked to 128 destination countries, although most victims were trafficked within their own national borders." },
      { type: 'p', text: "Those are the cases that were found. Finding more of them depends on investigators who can locate and connect information quickly, much of it public. The judges saw Poulter's insistence on training analysts, as well as equipping them, as a direct answer to that need." },
      { type: 'h2', text: "The Judges Final Words" },
      { type: 'quote', text: "The panel looked for a founder who built for the people doing the work. This entry paired its software with the training to use it well, carried that model from Australia to the United States and Europe, and put the same capability behind groups working on trafficking and child exploitation cases. That is capability built to last.", attribution: "Alexandra Dalton, a spokesperson for the Entrepreneur Awards" },
      { type: 'h2', text: "About The Entrepreneur Awards" },
      { type: 'p', text: "The Entrepreneur Awards recognizes the founder rather than the company. Here the award acknowledges Poulter's work in turning military intelligence experience into software and training that analysts across government, law enforcement and industry can use." }
    ],
    info: {
      industry: "Intelligence Technology\u2122",
      location: "Australia",
      whatTheyDo: "Chris Poulter is founder of OSINT Combine, which provides open-source intelligence software, including its NexusXplore platform, and practitioner-led training to government agencies, law enforcement and corporate security teams in more than 25 countries.",
      website: "osintcombine.com",
      websiteUrl: "https://www.osintcombine.com"
    },
    portrait: chrisPoulterPortraitAsset.url,
    portraitCaption: "Chris Poulter, founder of OSINT Combine",
    awardImage: awardAsset.url
  },
  {
    slug: "kenneth-kelly",
    winnerSlug: "kenneth-kelly",
    headline: "Kenneth Kelly Wins A 2026 Entrepreneur Award For Government Technology Services\u2122",
    subheadline: "Kelly, co-founder and chief executive of Maryland company Strativia, won for building a business that started with commercial clients into a federal contractor with 378 employees.",
    body: [
      { type: 'p', text: "Kenneth Kelly, co-founder, president and chief executive of Strativia, has won a 2026 Entrepreneur Award for building a technology and professional services company that now works directly for federal agencies. Strativia, headquartered in Largo, Maryland, provides management, technology, consulting, logistics and engineering services, and lists the US Army, Navy and Air Force, the Department of Energy, the Department of Homeland Security and the National Institute of Standards and Technology among its customers." },
      { type: 'p', text: "The award recognizes the founder, not the company. Kelly launched Strativia in June 2007 after 12 years in corporate software roles, including at Micros Systems, now part of Oracle. Washington Technology's 2024 Fast 50 list reported Strativia's revenue at $33.2 million in 2023, up from $19.9 million in 2019, with 378 employees." },
      { type: 'h2', text: "Why The Win Matters" },
      { type: 'p', text: "Federal agencies buy from companies with a record of past work, which a new company does not have. Kelly built that record in stages. Strativia worked for commercial clients from 2007, moved into state and local government work from 2010, and began pursuing federal customers in 2013, first as a subcontractor to established prime contractors so it could build the past performance needed to bid in its own name. By 2016 federal work made up the larger share of its revenue. In 2019 it won what was then its largest contract, a five-year agreement worth $75 million to provide scientific, technical and engineering support to research programs at the National Institute of Standards and Technology." },
      { type: 'p', text: "The judges also noted where the company chose to stay. Strativia was one of the first graduates of the Prince George's County Economic Development Corporation's small business incubator, by Kelly's account won its first contract from the county, and kept its headquarters there as it grew." },
      { type: 'quote', text: "We just put our heads down and did the work,", attribution: "Kelly told Black Enterprise in 2019" },
      { type: 'h2', text: "Market Context" },
      { type: 'p', text: "Small businesses compete for a large share of federal spending. The US Small Business Administration's scorecard for fiscal year 2025, released in June 2026, shows agencies awarded nearly 28 percent of prime federal contract dollars, about $179 billion, to small businesses, above the statutory goal of 23 percent. Counting subcontracts as well, small businesses received nearly $273 billion." },
      { type: 'p', text: "Winning prime contracts in that market takes registrations, certifications and a performance history before the first bid. Strativia was appraised at Level 3 of the Capability Maturity Model Integration, a widely used benchmark for process maturity, in 2019. The judges treated its route from subcontractor to prime contractor as the slower and more durable way into federal work." },
      { type: 'h2', text: "The Judges Final Words" },
      { type: 'quote', text: "The panel looked for growth that was earned in order. This entry built commercial references first, then state and local work, then federal subcontracts, and only then went after prime contracts in its own name. It kept its headquarters in the county that gave it an early chance. That is a founder building something meant to stay.", attribution: "Alexandra Dalton, a spokesperson for the Entrepreneur Awards" },
      { type: 'h2', text: "About The Entrepreneur Awards" },
      { type: 'p', text: "The Entrepreneur Awards recognizes the founder rather than the company. Here the award acknowledges Kelly's work over nearly two decades in taking Strativia from commercial projects to direct contracts with federal agencies." }
    ],
    info: {
      industry: "Government Technology Services\u2122",
      location: "Largo, Maryland, United States",
      whatTheyDo: "Kenneth Kelly is co-founder, president and chief executive of Strativia, a Largo, Maryland company providing management, technology, consulting, logistics and engineering services to federal agencies including the US Army, Navy and Air Force, the Department of Energy and the Department of Homeland Security.",
      website: "strativia.com",
      websiteUrl: "https://www.strativia.com/"
    },
    portrait: kennethKellyPortraitAsset.url,
    portraitCaption: "Kenneth Kelly, president and chief executive of Strativia",
    awardImage: awardAsset.url
  },
  {
    slug: "sandeep-hodkasia",
    winnerSlug: "sandeep-hodkasia",
    headline: "Sandeep Hodkasia Wins A 2026 Entrepreneur Award For Cybersecurity\u2122",
    subheadline: "Hodkasia, founder and chief executive of Singapore-based AppSecure, won for building a self-funded security testing firm on the same methods that led him to a privacy flaw in Meta AI.",
    body: [
      { type: 'p', text: "Sandeep Hodkasia, founder and chief executive of AppSecure, has won a 2026 Entrepreneur Award for building a security testing company on the hands-on methods he first used as a bug bounty hunter. AppSecure runs penetration tests, red team exercises and continuous testing for technology companies, and says it has secured more than 450 companies." },
      { type: 'p', text: "The award recognizes the founder, not the company. Hodkasia, who comes from the town of Bhadra in Rajasthan, founded AppSecure in May 2016 during the first year of his computer science degree, registering it in Singapore to work with international clients. The company has funded itself from revenue since it started, and its clients have included the investment platform Groww, SBI General Insurance, Truecaller and MyGate." },
      { type: 'h2', text: "Why The Win Matters" },
      { type: 'p', text: "Hodkasia's own research is the clearest evidence of the approach. On December 26, 2024, he privately reported a flaw in Meta AI that let a logged-in user view other people's prompts and AI-generated responses by changing a number the system assigned to each edited prompt. Meta fixed it on January 24, 2025, said it found no evidence of abuse, and paid him a $10,000 bug bounty, as TechCrunch reported in July 2025. In 2022 he reported a flaw in WeWork India's visitor check-in system that exposed visitors' personal information, which the company fixed after TechCrunch contacted it." },
      { type: 'p', text: "The judges pointed to the habit behind both findings: testing how a system actually behaves when someone pushes on it, instead of relying on automated scanners alone." },
      { type: 'quote', text: "My vision was clear: build a one-stop shop for real-world threat simulation,", attribution: "Hodkasia told Startup Pedia in 2025" },
      { type: 'h2', text: "Market Context" },
      { type: 'p', text: "The cost of missing a flaw keeps rising. IBM's 2026 Cost of a Data Breach Report, published in July and based on breaches at 602 organizations, put the global average cost of a breach at $4.99 million. One in four malicious breaches was AI-enabled, a 56 percent increase on the previous year, and those breaches cost $6 million on average. More than 20 percent of organizations reported a breach targeting AI models or applications, most commonly through compromised APIs, applications or plug-ins, or through cloud misconfigurations." },
      { type: 'quote', text: "AI is making attacks faster and cheaper, while breaches keep getting more expensive,", attribution: "Suja Viswesan, vice president of IBM Security Software, said in July" },
      { type: 'p', text: "The Meta AI finding belongs to that last group: a missing access check in the system around an AI product, not a fault in the model itself. The judges treated it as an example of the testing the market now needs." },
      { type: 'h2', text: "The Judges Final Words" },
      { type: 'quote', text: "The panel looked for a founder whose claims could be checked. This entry's best evidence is public: a disclosed flaw in Meta's AI assistant, a confirmed fix and a paid bounty. Building a ten-year business on that kind of work, without outside investment, takes discipline.", attribution: "Alexandra Dalton, a spokesperson for the Entrepreneur Awards" },
      { type: 'h2', text: "About The Entrepreneur Awards" },
      { type: 'p', text: "The Entrepreneur Awards recognizes the founder rather than the company. Here the award acknowledges Hodkasia's work in turning individual vulnerability research into a security firm with clients across Asia-Pacific, the United States, the United Kingdom and India." }
    ],
    info: {
      industry: "Cybersecurity\u2122",
      location: "Singapore",
      whatTheyDo: "Sandeep Hodkasia is founder and chief executive of AppSecure, a Singapore-headquartered security testing firm that provides penetration testing, red teaming and continuous testing to technology companies.",
      website: "appsecure.security",
      websiteUrl: "https://www.appsecure.security"
    },
    portrait: sandeepHodkasiaPortraitAsset.url,
    portraitCaption: "Sandeep Hodkasia, founder and CEO of AppSecure",
    awardImage: awardAsset.url
  },
  {
    slug: "amy-taylor-kabbaz",
    winnerSlug: "amy-taylor-kabbaz",
    headline: "Amy Taylor-Kabbaz Wins A 2026 Entrepreneur Award For Maternal Health Education\u2122",
    subheadline: "Taylor-Kabbaz, an Australian author and former ABC journalist, won for building an education business around matrescence, the transition to motherhood, and helping bring the subject to the screen.",
    body: [
      { type: 'p', text: "Amy Taylor-Kabbaz, founder of Mama Rising, has won a 2026 Entrepreneur Award for building an education business around matrescence, the psychological and social transition a woman goes through as she becomes a mother. Her work spans a book, a podcast, a training program for coaches and, in 2026, a feature documentary." },
      { type: 'p', text: "The award recognizes the founder, not the company. Taylor-Kabbaz spent more than a decade covering news and current affairs for the Australian Broadcasting Corporation before making motherhood her subject. Her book, Mama Rising, was published by Hay House in 2019, the year she launched what she describes as the world's first matrescence coaching training. The film's producers say that program has now trained more than 350 coaches across 29 countries. Her podcast, The Happy Mama Movement, has passed 300,000 downloads, and in 2023 she set up the Global Matrescence Foundation." },
      { type: 'h2', text: "Why The Win Matters" },
      { type: 'p', text: "Matrescence is not a new idea. The anthropologist Dana Raphael coined the term in the 1970s, and the clinical psychologist Aur\u00e9lie Athan of Columbia University later described it as a developmental stage comparable to adolescence. What has been missing is a way to bring that research to the people who support new mothers. Taylor-Kabbaz has built it in stages: her own writing and broadcasting first, then the training program, then advice to employers including Google and LinkedIn on supporting mothers at work. Most recently she was an executive producer and writer of Matrescence, a documentary directed by Claire Tonti and Libby Chow that launched in August 2026." },
      { type: 'p', text: "The judges pointed to the decision to train others instead of keeping the work tied to one person." },
      { type: 'quote', text: "What happens to a woman when she becomes a mother?", attribution: "the question Taylor-Kabbaz says she has spent more than a decade trying to answer" },
      { type: 'h2', text: "Market Context" },
      { type: 'p', text: "The health stakes are well documented. The World Health Organization estimates that about 10 percent of pregnant women and 13 percent of women who have just given birth experience a mental disorder, mainly depression. In developing countries the figures are higher, at 15.6 percent during pregnancy and 19.8 percent after childbirth. WHO also notes that maternal mental disorders are treatable, and that effective help can be delivered by well-trained providers who are not mental health specialists." },
      { type: 'p', text: "That last point is where Taylor-Kabbaz's model fits. A matrescence coach is not a clinician, but a wider circle of people who understand the transition can give mothers words for what they are going through. The judges saw the coach training as the part of her work most likely to reach mothers who will never read a book or watch a film." },
      { type: 'h2', text: "The Judges Final Words" },
      { type: 'quote', text: "The panel looked for someone who took a neglected idea and built the structures to carry it. This entry began with one woman's question and turned it into a book, a podcast and a training program, and has now helped put it on screen. Each step made the work depend less on her, which is how an idea outlasts its founder.", attribution: "Alexandra Dalton, a spokesperson for the Entrepreneur Awards" },
      { type: 'h2', text: "About The Entrepreneur Awards" },
      { type: 'p', text: "The Entrepreneur Awards recognizes the founder rather than the company. Here the award acknowledges Taylor-Kabbaz's work in moving matrescence out of academic research and into the hands of the coaches, employers and families who support new mothers." }
    ],
    info: {
      industry: "Maternal Health Education\u2122",
      location: "Australia",
      whatTheyDo: "Amy Taylor-Kabbaz is founder of Mama Rising, which trains matrescence coaches and facilitators worldwide, and author of the book Mama Rising. She hosts The Happy Mama Movement podcast and was an executive producer and writer of the 2026 documentary Matrescence.",
      website: "mamarising.net",
      websiteUrl: "https://mamarising.net"
    },
    portrait: amyTaylorKabbazPortraitAsset.url,
    portraitCaption: "Amy Taylor-Kabbaz, founder of Mama Rising",
    awardImage: awardAsset.url
  },
  {
    slug: "clifford-gross",
    winnerSlug: "clifford-gross",
    headline: "Clifford Gross Wins A 2026 Entrepreneur Award For Technology Transfer\u2122",
    subheadline: "Gross, chief executive of London-listed Tekcapital, won for a career spent turning university research into companies, including portfolio businesses taken to public listings in London and New York.",
    body: [
      { type: 'p', text: "Dr. Clifford Gross, chief executive of Tekcapital plc, has won a 2026 Entrepreneur Award for building a business that invests in discoveries made at universities and turns them into operating companies. Tekcapital is quoted on the AIM market of the London Stock Exchange under the ticker TEK, and its portfolio companies have included smart eyewear maker Innovative Eyewear and low-sodium salt producer MicroSalt." },
      { type: 'p', text: "The award recognizes the founder, not the company. Gross founded Tekcapital after building Biomechanics Corp. and UTEK Corporation, and co-founded ventures including HumanCAD, MicroSalt, GenIP and Guident. He holds a doctorate from New York University and an executive MBA from Oxford, is a Fellow of the National Academy of Inventors, and is a named inventor on more than 50 issued or pending patents, according to a CFI.co profile published in November 2025. His earlier ergonomic work included the DEWALT cordless drill for Black & Decker and the Parachute Chair for Knoll." },
      { type: 'h2', text: "Why The Win Matters" },
      { type: 'p', text: "Tekcapital's model is to identify university discoveries, manage the intellectual property, shape a company around each one and guide it toward a listing or sale. Two results are on the public record. Innovative Eyewear, the company behind the Lucyd smart eyewear brand, completed a US$7.35 million initial public offering on Nasdaq in August 2022. MicroSalt, which makes salt crystals about one hundred times smaller than typical table salt so food tastes salty with roughly half the sodium, was admitted to AIM on February 1, 2024, after raising about \u00a33.14 million, with Tekcapital holding 77.24 percent at listing." },
      { type: 'p', text: "The judges pointed to the fact that the same process has been carried through to a public listing more than once, in two different markets." },
      { type: 'quote', text: "MicroSalt has established a new category of full-flavour, low sodium salt,", attribution: "Gross said when MicroSalt listed in February 2024" },
      { type: 'h2', text: "Market Context" },
      { type: 'p', text: "The UK, where Tekcapital is headquartered, has become Europe's largest source of university spinout value. The Royal Academy of Engineering's Spotlight on Spinouts 2026 report found that UK university spinouts have nearly tripled in value since 2020, to \u00a349 billion, and that some 2,000 spinouts created since 2010 have generated 27,000 jobs." },
      { type: 'quote', text: "We're still too slow getting ideas out of the lab and into the market,", attribution: "Ana Avaliani, director of enterprise at the Royal Academy of Engineering, said" },
      { type: 'p', text: "That gap between research and market is where Tekcapital works. The judges treated Gross's record as evidence that the commercial work after a discovery can be run as a repeatable process." },
      { type: 'h2', text: "The Judges Final Words" },
      { type: 'quote', text: "The panel looked for a founder whose results are on the public record. This entry's evidence sits in stock exchange announcements: companies formed, money raised and shares listed. Turning laboratory work into businesses is slow and uncertain, and doing it in public, under disclosure rules, leaves little room to overstate.", attribution: "Alexandra Dalton, a spokesperson for the Entrepreneur Awards" },
      { type: 'h2', text: "About The Entrepreneur Awards" },
      { type: 'p', text: "The Entrepreneur Awards recognizes the founder rather than the company. Here the award acknowledges Gross's work over more than 25 years as an academic, inventor and founder in moving research out of universities and into the market." }
    ],
    info: {
      industry: "Technology Transfer\u2122",
      location: "United Kingdom",
      whatTheyDo: "Dr. Clifford Gross is chief executive of Tekcapital plc, an intellectual property investment group quoted on AIM that invests in university-developed discoveries and builds them into companies, including MicroSalt and Innovative Eyewear.",
      website: "tekcapital.com",
      websiteUrl: "https://www.tekcapital.com"
    },
    portrait: cliffordGrossPortraitAsset.url,
    portraitCaption: "Dr. Clifford Gross, chief executive of Tekcapital",
    awardImage: awardAsset.url
  }
];
