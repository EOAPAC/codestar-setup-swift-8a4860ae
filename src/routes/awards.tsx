import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Globe, Lightbulb, RotateCcw, Sprout, TrendingUp, Users } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { WinnerSeal } from "@/components/winner-seal";
import { MOCK_AWARDS, MOCK_PRICES, mockAwardPrice, type MockAward } from "@/content/awards-mock";
import markAsset from "@/assets/ea-mark-84.png.asset.json";
import adamAsset from "@/assets/adam-pisk.jpg.asset.json";
import awardAsset from "@/assets/feature-award.jpg.asset.json";
import awardsCss from "../awards.css?url";

const TITLE = "Awards and entry fees | Entrepreneur Awards";
const DESCRIPTION = "Entrepreneur of the Year is free to enter. Six achievement awards from $129.90. See every award, what winners get and the 2027 deadlines.";

export const Route = createFileRoute("/awards")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "stylesheet", href: awardsCss }],
  }),
  component: AwardsPage,
});

const ICONS = { sprout: Sprout, growth: TrendingUp, idea: Lightbulb, turnaround: RotateCcw, team: Users, globe: Globe };
const money = (value: number) => `$${value.toFixed(value % 1 ? 2 : 0)}`;
const isMain = (award: MockAward) => award.slug === "entrepreneur-of-the-year";
const jumps = [ ["prices", "Prices"], ["win", "What you win"], ["about", "About each award"], ["extras", "Optional extras"], ["fee-questions", "Questions about fees"] ] as const;
const dates = [
  ["31 January 2027", "Early prices end. Achievement awards go from $129.90 to $159.90."],
  ["15 May 2027", "Last day to enter Entrepreneur of the Year for free."],
  ["31 May 2027", "Entries close. From 16 May every award carries a $55 late fee."],
  ["Five business days", "From your entry to our decision, whether you're selected or not."],
];
const industries = ["Professional services", "Technology and software", "Finance and insurance", "Health and wellness", "Retail and e-commerce", "Food and drink", "Property and construction", "Marketing and media", "Education and coaching", "Beauty and fashion", "Travel and hospitality", "Trades and local services", "Something else? Choose Other."];
const checklist = [
  'Your award title. For example "Growth Founder of the Year 2027", yours to keep using.',
  "A digital certificate", "A winner badge for your website", "A LinkedIn banner", "A square social post and a story graphic", "An email signature",
  "The written record of your assessment. What the panel found against each criterion.",
];
const questions = [
  ["What do I pay if I only enter Entrepreneur of the Year?", "Nothing, if you enter by 15 May 2027. From 16 to 31 May there is a $55 late fee."],
  ["Which price do I pay?", "The price on the day you submit your entry. Add your awards before 31 January to pay $129.90 each."],
  ["Is the fee refunded if I'm not selected?", "No. The fee pays for the assessment, which happens either way, and you'll get the reason with our decision. You can enter again next year."],
  ["Does paying for more awards improve my chances?", "Paying doesn't change how an entry is judged. Each award is assessed on its own, on the same three criteria, and most entries are not selected."],
  ["Are there any other costs?", "No. The winner files are free with every award. The Winner's Feature and the Award Package are optional and only offered after you win."],
];

function AwardIcon({ award }: { award: MockAward }) {
  if (award.icon === "logo") return <span className="award-icon"><img src={markAsset.url} alt="" width={28} height={28} /></span>;
  const Icon = ICONS[award.icon];
  return <span className="award-icon"><Icon aria-hidden="true" /></span>;
}

function EntryLink({ award, button = false }: { award: MockAward; button?: boolean }) {
  const link = <Link to="/" {...(isMain(award) ? {} : { search: { award: award.slug } })} hash="submit" className={button ? undefined : "awards-action-link"}>
    {isMain(award) ? "Enter for free" : "Add this award"}{!button && <ArrowRight size={16} aria-hidden="true" />}
  </Link>;
  return button ? <Button asChild variant="outline" className="awards-action text-primary">{link}</Button> : link;
}

function FreeEntryButton() {
  return <Button asChild className="awards-action min-h-11 px-6"><Link to="/" hash="submit">Enter for free<ArrowRight aria-hidden="true" /></Link></Button>;
}

function AwardFacts({ award }: { award: MockAward }) {
  return <dl className="award-facts">
    {"who" in award && <div><dt>Who can enter</dt><dd>{award.who}</dd></div>}
    <div><dt>Tell us about</dt><dd>{award.tell}</dd></div>
    <div><dt>Your title if you win</dt><dd>{award.title}</dd></div>
  </dl>;
}

function AwardDetail({ award }: { award: MockAward }) {
  return <article className="award-detail" id={award.slug}>
    <div className="award-detail-head">
      <AwardIcon award={award} /><h3>{award.name}</h3>
      <div className="award-detail-price"><strong className={isMain(award) ? "award-free" : undefined}>{isMain(award) ? "Free" : money(MOCK_PRICES.early)}</strong><small>{isMain(award) ? "until 15 May, then $55" : "until 31 January"}</small></div>
    </div>
    <p className="award-detail-description">{"detail" in award ? award.detail : award.description}</p>
    <AwardFacts award={award} />
    {isMain(award) && <div className="award-industries"><strong>Industries</strong><ul>{industries.map((industry) => <li key={industry}>{industry}</li>)}</ul></div>}
    <div className="mt-auto pt-3"><EntryLink award={award} button={isMain(award)} /></div>
  </article>;
}

function WinnerSamples() {
  return <div className="awards-samples">
    <figure><div className="sample-banner"><WinnerSeal size={120} showYear={false} /><div><strong>Entrepreneur of the Year 2027</strong><p>Entrepreneur Awards winner · entrepreneurawards.co</p></div></div><figcaption>LinkedIn banner</figcaption></figure>
    <div className="sample-grid">
      <figure><div className="sample-square"><WinnerSeal size={100} showYear={false} /><strong>Growth Founder of the Year 2027</strong></div><figcaption>Square post</figcaption></figure>
      <figure><div className="sample-story"><img src={markAsset.url} alt="" /><strong>Winner 2027</strong></div><figcaption>Story</figcaption></figure>
      <figure><div className="sample-certificate"><img src={markAsset.url} alt="" /><p>Entrepreneur Awards certifies</p><strong>Entrepreneur of the Year 2027</strong><span className="sample-signature" /></div><figcaption>Certificate</figcaption></figure>
      <figure><div className="sample-badge"><WinnerSeal size={100} /></div><figcaption>Website badge</figcaption></figure>
    </div>
    <p className="awards-note">Samples. Yours carry your own award title.</p>
  </div>;
}

function AwardsPage() {
  const mainAward = MOCK_AWARDS[0];
  return <div className="awards-page min-h-screen antialiased">
    <SiteNav mobileMenu />
    <main>
      <section className="awards-top awards-container">
        <div className="text-center"><h1>What you can win, and what it costs</h1>
          <p className="awards-intro">Entrepreneur of the Year is free to enter. You can add any of six achievement awards for $129.90 each until 31 January 2027. Every award is judged on the same <Link to="/criteria" className="awards-inline-link">three criteria</Link>.</p>
        </div>
        <div className="awards-dates">{dates.map(([date, text]) => <div className="awards-date" key={date}><strong>{date}</strong><p>{text}</p></div>)}</div>
        <nav aria-label="On this page" className="awards-jumps"><span>On this page:</span>{jumps.map(([id, label]) => <Link key={id} to="/awards" hash={id}>{label}</Link>)}</nav>
      </section>

      <section className="awards-section awards-container" id="prices">
        <h2 className="awards-heading">Every award and its price</h2>
        <div className="awards-callout"><strong>Every entry includes Entrepreneur of the Year for free.</strong><p>Add any achievement award to it if you want a more specific title, for the one result you most want people to remember. Not sure which? Pick the award that matches your strongest result.</p></div>
        <div className="awards-table-wrap"><table className="awards-table">
          <thead><tr><th scope="col">Award</th><th scope="col">Early (now)<span>until 31 January</span></th><th scope="col">Standard<span>1 February to 15 May</span></th><th scope="col">Late<span>16 to 31 May</span></th><th scope="col"><span className="sr-only">Enter an award</span></th></tr></thead>
          <tbody>{MOCK_AWARDS.map((award) => <tr key={award.slug}>
            <td><div className="award-row-title"><AwardIcon award={award} /><div><Link to="/awards" hash={award.slug}>{award.name}</Link><p>{award.description}</p></div></div></td>
            {(["early", "standard", "late"] as const).map((period) => <td key={period}>{mockAwardPrice(award.slug, period) === 0 ? <span className="award-free">Free</span> : <span className="font-medium">{money(mockAwardPrice(award.slug, period))}{isMain(award) ? " late fee" : ""}</span>}</td>)}
            <td><EntryLink award={award} button /></td>
          </tr>)}</tbody>
        </table></div>
        <div className="awards-mobile-prices">{MOCK_AWARDS.map((award) => <article className="awards-mobile-price" key={award.slug}>
          <div className="award-row-title"><AwardIcon award={award} /><div><Link to="/awards" hash={award.slug}>{award.name}</Link><p>{award.description}</p></div></div>
          <p>{isMain(award) ? <strong><span className="award-free">Free</span> until 15 May, then $55</strong> : <><strong>{money(MOCK_PRICES.early)} until 31 January</strong><small>{money(MOCK_PRICES.standard)} from 1 February. {money(MOCK_PRICES.late)} from 16 May.</small></>}</p>
          <EntryLink award={award} />
        </article>)}</div>
        <p className="awards-note">Prices are in US dollars, per award, paid once. Late prices include the $55 late fee. You pay when you submit your entry.</p>
      </section>

      <section className="awards-section awards-band" id="win"><div className="awards-container">
        <div className="awards-heading"><h2>What you win</h2><p className="awards-sub">Every award, free or paid, comes with the same winner files, made with your award title on them. Yours to download and keep, at no extra cost.</p></div>
        <div className="awards-win-grid"><WinnerSamples /><ul className="awards-checklist">{checklist.map((item) => <li key={item}><Check aria-hidden="true" /><span>{item}</span></li>)}</ul></div>
      </div></section>

      <section className="awards-section awards-container" id="about">
        <div className="awards-heading"><h2>About each award</h2><p className="awards-sub">What each award is for, and what to tell us when you enter.</p></div>
        {mainAward && <AwardDetail award={mainAward} />}
        <div className="awards-about-grid">{MOCK_AWARDS.slice(1).map((award) => <AwardDetail key={award.slug} award={award} />)}</div>
      </section>

      <section className="awards-section awards-container" id="extras">
        <div className="awards-heading"><h2>Optional extras, after you win</h2><p className="awards-sub">Offered once you've won. You don't need either one to use your award.</p></div>
        <div className="awards-extras-grid">
          <article className="awards-extra"><img src={adamAsset.url} alt="Adam Pisk, Entrepreneur Awards winner" loading="lazy" /><div className="awards-extra-copy"><div className="awards-extra-heading"><h3>The Winner's Feature</h3><strong>{money(MOCK_PRICES.feature)}</strong></div><p>A Feature written by our editorial team on the winners page, plus a press release in USA Today, the Associated Press and Business Insider, each linking back to it.</p><Link to="/winners/$slug" params={{ slug: "adam-pisk" }} className="awards-action-link">Read Adam Pisk's Feature<ArrowRight size={16} aria-hidden="true" /></Link></div></article>
          <article className="awards-extra"><img src={awardAsset.url} alt="Engraved Entrepreneur Awards crystal award" loading="lazy" /><div className="awards-extra-copy"><div className="awards-extra-heading"><h3>The Award Package</h3><strong>{money(MOCK_PRICES.physicalAward)}</strong></div><p>The engraved crystal award with your name and award title, plus a printed certificate ready to frame. Posted worldwide.</p></div></article>
        </div>
      </section>

      <section className="awards-section awards-band" id="fee-questions"><div className="awards-container">
        <h2 className="awards-heading">Questions about fees</h2>
        <div className="awards-questions">{questions.map(([question, answer]) => <div className="awards-question" key={question}><h3>{question}</h3><p>{answer}</p></div>)}</div>
        <div className="mt-6"><Link to="/faq" className="awards-action-link">More questions on the FAQ page<ArrowRight size={16} aria-hidden="true" /></Link></div>
      </div></section>

      <section className="awards-section awards-container"><div className="awards-callout awards-closing"><div><h2>Start with the free award</h2><p>Enter Entrepreneur of the Year in about five minutes, and add any achievement award in the same form. You hear back within five business days.</p></div><FreeEntryButton /></div></section>
    </main>
    <SiteFooter />
  </div>;
}