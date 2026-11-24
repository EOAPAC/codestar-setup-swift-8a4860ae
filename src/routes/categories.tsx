import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe, Lightbulb, RotateCcw, Sprout, TrendingUp, Users, type LucideIcon } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { HeroSampleStack } from "@/components/hero-sample";
import { MOCK_AWARDS, MOCK_PRICES, EMERGING_SAMPLE, type MockAward } from "@/content/awards-mock";
import markAsset from "@/assets/ea-mark-84.png.asset.json";
import adamAsset from "@/assets/adam-pisk.jpg.asset.json";
import awardAsset from "@/assets/feature-award.jpg.asset.json";
import awardsCss from "../awards.css?url";

const TITLE = "Award categories | Entrepreneur Awards";
const DESCRIPTION = "Award categories for founders, from Entrepreneur of Distinction to Innovator and Impact Leader. US$129.90 per category, open all year, and free for early-stage founders.";
export const Route = createFileRoute("/categories")({
  head: () => ({ meta: [
    { title: TITLE }, { name: "description", content: DESCRIPTION },
    { property: "og:title", content: TITLE }, { property: "og:description", content: DESCRIPTION },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: TITLE }, { name: "twitter:description", content: DESCRIPTION },
  ], links: [{ rel: "stylesheet", href: awardsCss }] }),
  component: CategoriesPage,
});
const ICONS: Record<string, LucideIcon> = { sprout: Sprout, growth: TrendingUp, idea: Lightbulb, turnaround: RotateCcw, team: Users, globe: Globe };
const JUMPS = [["categories", "Categories"], ["win", "What you win"], ["extras", "Optional extras"], ["questions", "Questions about fees"]] as const;
const INDUSTRIES = ["Professional services", "Technology and software", "Finance and insurance", "Health and wellness", "Retail and e-commerce", "Food and drink", "Property and construction", "Marketing and media", "Education and coaching", "Beauty and fashion", "Travel and hospitality", "Trades and local services", "Something else? Choose Other."];
const QUESTIONS = [
  ["How much does a category cost?", "US$129.90 per category, paid once when you submit your entry. Nothing is recurring."],
  ["Why is Emerging Founder free?", "Early-stage founders often have the least to spend on awards. It's judged on the same criteria as every other category, and winners get the same files."],
  ["Is there a deadline?", "No. Entries are open all year, and each entry is judged as it comes in."],
  ["Can I enter Emerging Founder and a paid category?", "Yes, in the same form. You only pay for the paid categories."],
  ["Does entering more categories improve my chances?", "Paying doesn't change how an entry is judged. Each category is assessed on its own."],
  ["Can I win more than one category?", "Yes. Each category is judged separately, so you can be selected in more than one."],
];
const SAMPLES = [
  { file: "01-linkedin-banner.webp", caption: "LinkedIn banner", alt: "Sample LinkedIn banner for a High-Growth Founder", wide: true },
  { file: "02-square-post.webp", caption: "Square post", alt: "Sample square post for an Innovator" },
  { file: "03-story.webp", caption: "Story", alt: "Sample story for a Turnaround Leader" },
  { file: "04-certificate.webp", caption: "Certificate", alt: "Sample certificate for an Entrepreneur of Distinction" },
  { file: "05-website-badge.webp", caption: "Website badge", alt: "Entrepreneur Awards winner badge", flat: true },
  { file: "06-email-signature.webp", caption: "Email signature", alt: "Sample email signature for an Employer of Choice" },
  { file: "07-written-assessment.webp", caption: "Written assessment", alt: "Sample assessment record for an Impact Leader" },
];
function AwardIcon({ award }: { award: MockAward }) {
  if (award.icon === "logo") return <span className="award-icon award-icon-main"><img src={markAsset.url} alt="" width={28} height={28} /></span>;
  const Icon = ICONS[award.icon];
  return <span className="award-icon">{Icon && <Icon aria-hidden="true" />}</span>;
}
function EntryButton({ award }: { award?: MockAward }) {
  return <Button asChild className="awards-action" variant={award && award.price > 0 ? "outline" : "default"}>
    <Link to="/" {...(award ? { search: { category: award.slug } } : {})} hash="submit">{award ? (award.price === 0 ? "Enter for free" : "Enter this category") : "Start your entry"}<ArrowRight aria-hidden="true" /></Link>
  </Button>;
}
function AwardFacts({ award }: { award: MockAward }) {
  return <><p className="award-tell"><strong>Tell us about:</strong> {award.tell}</p><p className="award-selected"><span>If selected:</span> <strong>{award.title}</strong></p></>;
}
function CategoryCard({ award }: { award: MockAward }) {
  return <article className="award-detail" id={award.slug}>
    <div className="award-card-top"><AwardIcon award={award} /><strong>US${award.price.toFixed(2)}</strong></div>
    <h3>{award.name}</h3><p className="award-description">{award.description}</p><AwardFacts award={award} />
    <Link to="/" search={{ category: award.slug }} hash="submit" className="awards-action-link award-entry-link">Enter this category<ArrowRight size={16} aria-hidden="true" /></Link>
  </article>;
}
function MainAward({ award }: { award: MockAward }) {
  return <article className="award-main" id={award.slug}><div>
    <div className="award-main-head"><AwardIcon award={award} /><h3>{award.name}</h3><strong>US${award.price.toFixed(2)}</strong></div>
    <p className="award-main-intro">Our main award, judged with your industry taken into account.</p>
    <p className="award-description">{award.description}</p><AwardFacts award={award} /><EntryButton award={award} />
  </div><div className="award-industries"><strong>Choose your industry when you enter</strong><ul>{INDUSTRIES.map((industry) => <li key={industry}>{industry}</li>)}</ul></div></article>;
}
function CategoriesPage() {
  const main = MOCK_AWARDS.find((award) => award.slug === "entrepreneur-of-distinction");
  const emerging = MOCK_AWARDS.find((award) => award.slug === "emerging-founder");
  return <div className="awards-page min-h-screen antialiased">
    <SiteNav mobileMenu />
    <main>
      <section className="awards-top awards-container">
        <div className="awards-hero-grid"><div><h1>Find the award that fits what you've built</h1>
          <p className="awards-intro">One main award for what you've built, and five for a specific achievement, from growth to innovation. Every category is judged separately, on the same <Link to="/criteria" className="awards-inline-link">three criteria</Link>.</p>
          <p className="awards-hero-price"><strong>US$129.90 per category. Entries are open all year.</strong></p>
          <div className="awards-hero-actions"><EntryButton /><Link to="/categories" hash="categories" className="awards-action-link">Compare the categories<ArrowRight size={16} aria-hidden="true" /></Link></div>
        </div><HeroSampleStack /></div>
        <nav aria-label="On this page" className="awards-jumps"><span>On this page:</span>{JUMPS.map(([id, label]) => <Link key={id} to="/categories" hash={id}>{label}</Link>)}</nav>
      </section>
      <section className="awards-section awards-band" id="categories"><div className="awards-container">
        <div className="awards-heading"><h2>Award categories</h2><p className="awards-sub">US$129.90 per category. Choose as many as fit, in one entry form, and each one is judged on its own.</p></div>
        {main && <MainAward award={main} />}
        <div className="awards-category-grid">{MOCK_AWARDS.filter((award) => award.slug !== "entrepreneur-of-distinction" && award.price > 0).map((award) => <CategoryCard key={award.slug} award={award} />)}
          <article className="award-helper"><h3>Not sure which fits?</h3><p>Pick the category that matches your strongest result. You can enter more than one in the same form.</p><Link to="/" hash="submit" className="awards-action-link">Start your entry<ArrowRight size={16} aria-hidden="true" /></Link></article>
        </div><p className="awards-note">Prices are in US dollars, per category, paid once when you submit your entry.</p>
      </div></section>
      <section className="awards-section awards-container" id="win"><div className="awards-heading"><h2>What you win</h2><p className="awards-sub">Every category comes with the same winner files, with your title on them.</p></div>
        <div className="awards-samples">{SAMPLES.map((sample) => <figure key={sample.file} className={sample.wide ? "sample-wide" : undefined}><div className="sample-stage"><img src={`/winner-samples/${sample.file}`} alt={sample.alt} loading="lazy" decoding="async" className={sample.flat ? "awards-sample-flat" : undefined} /></div><figcaption>{sample.caption}</figcaption></figure>)}</div>
        <p className="awards-note">Samples. Yours carry the title you won.</p>
      </section>
      <section className="awards-section awards-container" id="extras"><div className="awards-heading"><h2>Optional ways to celebrate your win</h2><p className="awards-sub">Your winner files are already included. If you'd like a physical award or a published feature about your business, these are available separately after selection.</p></div>
        <div className="awards-extras-grid">
          <article className="awards-extra"><img src={adamAsset.url} alt="Adam Pisk, Entrepreneur Awards winner" loading="lazy" /><div className="awards-extra-copy"><div className="awards-extra-heading"><h3>The Winner's Feature</h3><strong>${MOCK_PRICES.feature}</strong></div><p>A Feature about your business, written by our editorial team and published on the Entrepreneur Awards winners page. It comes with a paid press release about your win on USA Today, the Associated Press and Business Insider, each linking back to the Feature. The press release is a paid placement, not independent news coverage.</p><Link to="/winners/$slug" params={{ slug: "adam-pisk" }} className="awards-action-link">Read Adam Pisk's Feature<ArrowRight size={16} aria-hidden="true" /></Link></div></article>
          <article className="awards-extra"><img src={awardAsset.url} alt="Engraved Entrepreneur Awards crystal award" loading="lazy" /><div className="awards-extra-copy"><div className="awards-extra-heading"><h3>The Award Package</h3><strong>${MOCK_PRICES.physicalAward}</strong></div><p>The engraved crystal award with your name and title, plus a printed certificate ready to frame. Posted worldwide.</p></div></article>
        </div>
      </section>
      <section className="awards-section awards-container" id="free"><div className="awards-heading"><h2>Free for early-stage founders</h2></div>
        {emerging && <article className="award-emerging"><img className="award-emerging-image" src={EMERGING_SAMPLE} alt="Sample square post for an Emerging Founder" loading="lazy" /><div>
          <div className="award-main-head"><AwardIcon award={emerging} /><h3>Emerging Founder</h3><strong className="award-free">Free</strong></div><p className="award-description">{emerging.description}</p>
          <p className="award-description">Same criteria, same judging and the same winner files as every other category. The only difference is who can enter.</p><AwardFacts award={emerging} /><EntryButton award={emerging} />
        </div></article>}
      </section>
      <section className="awards-section awards-band" id="questions"><div className="awards-container"><h2 className="awards-heading">Questions about fees</h2><div className="awards-questions">{QUESTIONS.map(([question, answer]) => <div className="awards-question" key={question}><h3>{question}</h3><p>{answer}</p></div>)}</div><Link to="/faq" className="awards-action-link awards-more-questions">More questions about fees<ArrowRight size={16} aria-hidden="true" /></Link></div></section>
      <section className="awards-section awards-container"><div className="awards-closing"><div><h2>Start your entry</h2><p>Choose your categories in one entry form.</p></div><EntryButton /></div></section>
    </main><SiteFooter />
  </div>;
}
