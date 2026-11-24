import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe, Lightbulb, RotateCcw, Sprout, TrendingUp, Users } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { HeroSampleStack } from "@/components/hero-sample";
import { MOCK_AWARDS, MOCK_PRICES, mockAwardPrice, type MockAward } from "@/content/awards-mock";
import markAsset from "@/assets/ea-mark-84.png.asset.json";
import adamAsset from "@/assets/adam-pisk.jpg.asset.json";
import awardAsset from "@/assets/feature-award.jpg.asset.json";
import awardsCss from "../awards.css?url";

const TITLE = "Award categories and entry fees | Entrepreneur Awards";
const DESCRIPTION = "Entrepreneur of the Year is free to enter. Six achievement categories from US$129.90. See every category, what winners get and the 2027 deadlines.";

export const Route = createFileRoute("/categories")({
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
const jumps = [["categories", "Categories and fees"], ["win", "What you win"], ["about", "About each category"], ["extras", "Optional extras"], ["questions", "Questions about fees"]] as const;
const dates = [
  ["31 January 2027", "Early prices end. Achievement categories go from $129.90 to $159.90."],
  ["15 May 2027", "Last day to enter Entrepreneur of the Year for free."],
  ["31 May 2027", "Entries close. From 16 May every category carries a $55 late fee."],
  ["Five business days", "From your application to a decision on each category."],
];
const industries = ["Professional services", "Technology and software", "Finance and insurance", "Health and wellness", "Retail and e-commerce", "Food and drink", "Property and construction", "Marketing and media", "Education and coaching", "Beauty and fashion", "Travel and hospitality", "Trades and local services", "Something else? Choose Other."];
const questions = [
  ["What do I pay if I only enter Entrepreneur of the Year?", "Nothing until 15 May 2027. From 16 to 31 May there is a $55 late fee."],
  ["Which price do I pay?", "The price on the day you submit your application. Enter additional categories before 31 January to pay $129.90 each."],
  ["Does entering more categories improve my chances?", "No. Each category is judged separately, and paying doesn't change how an entry is assessed."],
  ["Can I win more than one category?", "Yes. Each category is judged separately, so you can be selected in more than one."],
];

function AwardIcon({ award }: { award: MockAward }) {
  if (award.icon === "logo") return <span className="award-icon"><img src={markAsset.url} alt="" width={28} height={28} /></span>;
  const Icon = ICONS[award.icon];
  return <span className="award-icon"><Icon aria-hidden="true" /></span>;
}

function EntryLink({ award, button = false }: { award: MockAward; button?: boolean }) {
  const link = <Link to="/" {...(isMain(award) ? {} : { search: { category: award.slug } })} hash="submit" className={button ? undefined : "awards-action-link"}>
    {isMain(award) ? "Enter for free" : "Enter this category"}{!button && <ArrowRight size={16} aria-hidden="true" />}
  </Link>;
  return button ? <Button asChild variant="outline" className="awards-action text-primary">{link}</Button> : link;
}

function FreeEntryButton() {
  return <Button asChild className="awards-action min-h-11 px-6"><Link to="/" hash="submit">Enter for free<ArrowRight aria-hidden="true" /></Link></Button>;
}

function AwardFacts({ award }: { award: MockAward }) {
  return <dl className="award-facts">
    
    <div><dt>Tell us about</dt><dd>{award.tell}</dd></div>
    <div><dt>Your title if selected</dt><dd>{award.title}</dd></div>
  </dl>;
}

function AwardDetail({ award }: { award: MockAward }) {
  return <article className="award-detail" id={award.slug}>
    <div className="award-detail-head">
      <AwardIcon award={award} /><h3>{award.name}</h3>
      <div className="award-detail-price"><strong className={isMain(award) ? "award-free" : undefined}>{isMain(award) ? "Free" : money(MOCK_PRICES.early)}</strong><small>{isMain(award) ? "until 15 May, then $55" : "until 31 January"}</small></div>
    </div>
    <p className="award-detail-description">{award.description}</p>
    <AwardFacts award={award} />
    {isMain(award) && <div className="award-industries"><strong>Industries</strong><ul>{industries.map((industry) => <li key={industry}>{industry}</li>)}</ul></div>}
    <div className="mt-auto pt-3"><EntryLink award={award} button={isMain(award)} /></div>
  </article>;
}

type WinnerSample = { file: string; alt: string; caption: string; wide?: boolean; shadow?: boolean };

const WINNER_SAMPLES: WinnerSample[] = [
  { file: "01-linkedin-banner.webp", alt: "Sample LinkedIn banner for Entrepreneur of the Year 2027", caption: "LinkedIn banner", wide: true },
  { file: "02-square-post.webp", alt: "Sample square post for Growth Founder of the Year 2027", caption: "Square post" },
  { file: "03-story.webp", alt: "Sample story for Innovator of the Year 2027", caption: "Story" },
  { file: "04-certificate.webp", alt: "Sample certificate for Employer of the Year 2027", caption: "Certificate" },
  { file: "05-website-badge.webp", alt: "Entrepreneur Awards winner badge", caption: "Website badge", shadow: false },
  { file: "06-email-signature.webp", alt: "Sample email signature for Startup Founder of the Year 2027", caption: "Email signature" },
  { file: "07-written-assessment.webp", alt: "Sample assessment record for Turnaround of the Year 2027", caption: "Written assessment" },
];

function WinnerSamples() {
  return <><div className="awards-samples">{WINNER_SAMPLES.map(({ file, alt, caption, wide, shadow = true }) => <figure key={file} className={wide ? "sample-wide" : undefined}><div className="sample-stage"><img src={`/winner-samples/${file}`} alt={alt} loading="lazy" decoding="async" className={shadow ? undefined : "awards-sample-flat"} /></div><figcaption>{caption}</figcaption></figure>)}</div></>;
}

function AwardsPage() {
  const mainAward = MOCK_AWARDS[0];
  return <div className="awards-page min-h-screen antialiased">
    <SiteNav mobileMenu />
    <main>
      <section className="awards-top awards-container">
        <div className="awards-hero-grid"><div><h1>Find the award that fits what you've built</h1>
          <p className="awards-intro">Entrepreneur of the Year is free to enter. You can also enter any of six achievement categories, for US$129.90 each until 31 January 2027. Each category is judged separately, on the same <Link to="/criteria" className="awards-inline-link">three criteria</Link>.</p>
          <div className="awards-hero-actions"><FreeEntryButton /><Link to="/categories" hash="categories" className="awards-action-link">Compare the awards<ArrowRight size={16} aria-hidden="true" /></Link></div>
        </div><HeroSampleStack /></div>
        <nav aria-label="On this page" className="awards-jumps"><span>On this page:</span>{jumps.map(([id, label]) => <Link key={id} to="/categories" hash={id}>{label}</Link>)}</nav>
      </section>

      <section className="awards-section awards-container" id="categories">
        <h2 className="awards-heading">Award categories and entry fees</h2>
        <div className="awards-table-wrap"><table className="awards-table">
          <thead><tr><th scope="col">Category</th><th scope="col">Early (now)<span>until 31 January</span></th><th scope="col">Standard<span>1 February to 15 May</span></th><th scope="col">Late<span>16 to 31 May</span></th><th scope="col"><span className="sr-only">Enter a category</span></th></tr></thead>
          <tbody>{MOCK_AWARDS.map((award) => <tr key={award.slug}>
            <td><div className="award-row-title"><AwardIcon award={award} /><div><Link to="/categories" hash={award.slug}>{award.name}</Link><p>{award.description}</p></div></div></td>
            {(["early", "standard", "late"] as const).map((period) => <td key={period}>{mockAwardPrice(award.slug, period) === 0 ? <span className="award-free">Free</span> : <span className="font-medium">{money(mockAwardPrice(award.slug, period))}{isMain(award) ? " late fee" : ""}</span>}</td>)}
            <td><EntryLink award={award} button /></td>
          </tr>)}</tbody>
        </table></div>
        <div className="awards-mobile-prices">{MOCK_AWARDS.map((award) => <article className="awards-mobile-price" key={award.slug}>
          <div className="award-row-title"><AwardIcon award={award} /><div><Link to="/categories" hash={award.slug}>{award.name}</Link><p>{award.description}</p></div></div>
          <p>{isMain(award) ? <strong><span className="award-free">Free</span> until 15 May, then $55</strong> : <><strong>{money(MOCK_PRICES.early)} until 31 January</strong><small>{money(MOCK_PRICES.standard)} from 1 February. {money(MOCK_PRICES.late)} from 16 May.</small></>}</p>
          <EntryLink award={award} />
        </article>)}</div>
        <p className="awards-price-summary"><strong>Choose your categories in one entry form. Each one is judged separately, and you can win more than one.</strong></p>
        <p className="awards-note">Prices are in US dollars, per category, paid once when you submit your application. Late prices include the $55 late fee.</p>
        <h3 className="awards-key-title">Key dates</h3><div className="awards-dates">{dates.map(([date, text]) => <div className="awards-date" key={date}><strong>{date}</strong><p>{text}</p></div>)}</div>
      </section>

      <section className="awards-section awards-band" id="win"><div className="awards-container">
        <div className="awards-heading"><h2>What you win</h2><p className="awards-sub">Every category comes with the same winner files, with your category title on them.</p></div>
        <WinnerSamples />
      </div></section>

      <section className="awards-section awards-container" id="about">
        <div className="awards-heading"><h2>About each category</h2><p className="awards-sub">What each category recognises, and what to tell us when you enter. Not sure which to choose? Pick the one that matches your strongest result.</p></div>
        {mainAward && <AwardDetail award={mainAward} />}
        <div className="awards-about-grid">{MOCK_AWARDS.slice(1).map((award) => <AwardDetail key={award.slug} award={award} />)}</div>
      </section>

      <section className="awards-section awards-container" id="extras">
        <div className="awards-heading"><h2>Optional ways to celebrate your win</h2><p className="awards-sub">Your winner materials are already included. If you'd like a physical award or a published feature about your business, these are available separately after selection.</p></div>
        <div className="awards-extras-grid">
          <article className="awards-extra"><img src={adamAsset.url} alt="Adam Pisk, Entrepreneur Awards winner" loading="lazy" /><div className="awards-extra-copy"><div className="awards-extra-heading"><h3>The Winner's Feature</h3><strong>{money(MOCK_PRICES.feature)}</strong></div><p>A Feature about your business, written by our editorial team and published on the Entrepreneur Awards winners page. It comes with a paid press release about your win on USA Today, the Associated Press and Business Insider, each linking back to the Feature. The press release is a paid placement, not independent news coverage.</p><Link to="/winners/$slug" params={{ slug: "adam-pisk" }} className="awards-action-link">Read Adam Pisk's Feature<ArrowRight size={16} aria-hidden="true" /></Link></div></article>
          <article className="awards-extra"><img src={awardAsset.url} alt="Engraved Entrepreneur Awards crystal award" loading="lazy" /><div className="awards-extra-copy"><div className="awards-extra-heading"><h3>The Award Package</h3><strong>{money(MOCK_PRICES.physicalAward)}</strong></div><p>The engraved crystal award with your name and category title, plus a printed certificate ready to frame. Posted worldwide.</p></div></article>
        </div>
      </section>

      <section className="awards-section awards-band" id="questions"><div className="awards-container">
        <h2 className="awards-heading">Questions about fees</h2>
        <div className="awards-questions">{questions.map(([question, answer]) => <div className="awards-question" key={question}><h3>{question}</h3><p>{answer}</p></div>)}</div>
        <div className="mt-6"><Link to="/faq" className="awards-action-link">More questions about fees<ArrowRight size={16} aria-hidden="true" /></Link></div>
      </div></section>

      <section className="awards-section awards-container"><div className="awards-callout awards-closing"><div><h2>Start with the free award</h2><p>Enter Entrepreneur of the Year and add any achievement category in the same form.</p></div><FreeEntryButton /></div></section>
    </main>
    <SiteFooter />
  </div>;
}