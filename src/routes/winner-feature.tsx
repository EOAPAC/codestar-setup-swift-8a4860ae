import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { FileText, Link, Newspaper, ShieldCheck, Trophy } from "lucide-react";

import { AWARD_YEAR } from "@/content/award";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { WINNERS } from "@/data/winners";
import snippetAdamAsset from "@/assets/snippet-usatoday-adam-pisk.webp.asset.json";
import snippetNimishaAsset from "@/assets/snippet-ap-nimisha-nailor.webp.asset.json";
import snippetGabrielAsset from "@/assets/snippet-bi-gabriel-sabadin.webp.asset.json";
import snippetAshtonAsset from "@/assets/snippet-usatoday-ashton-bishop.webp.asset.json";
import { FEATURES, type Feature, type FeatureBlock } from "@/data/features";
import { sanitizeBusiness } from "@/lib/winner-feature-business";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import eaMark84Asset from "@/assets/ea-mark-84.png.asset.json";
import apUserLogoAsset from "@/assets/associated-press-ap-user.png.asset.json";
import apStackedLogoAsset from "@/assets/associated-press-logo-stacked.png.asset.json";


export const Route = createFileRoute("/winner-feature")({
  validateSearch: (search: Record<string, unknown>) => ({
    business: typeof search.business === "string" ? search.business : undefined,
  }),
  head: () => ({
    meta: [
      { title: `The Winner's Feature | ${AWARD_YEAR} Entrepreneur Awards` },
      {
        name: "description",
        content: `We write a Feature article about your ${AWARD_YEAR} Entrepreneur Awards win, publish it on the winners page and place a press release in USA Today, the Associated Press and Business Insider.`,
      },
      { name: "twitter:description", content: `We write a Feature article about your ${AWARD_YEAR} Entrepreneur Awards win, publish it on the winners page and place a press release in USA Today, the Associated Press and Business Insider.` },
      { property: "og:title", content: `The Winner's Feature | ${AWARD_YEAR} Entrepreneur Awards` },
      {
        property: "og:description",
        content: `Your Feature article on the Entrepreneur Awards winners page, plus a press release in three national publications.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
    links: [
      { rel: "preload", as: "image", href: "/usa-today-logo.svg" },
      { rel: "preload", as: "image", href: apStackedLogoAsset.url },
      { rel: "preload", as: "image", href: "/business-insider-logo-270.webp" },
    ],
  }),
  component: WinnerFeatureV2Page,
});

/* ----------------------------------------------------------------- tokens */
const INK = "#0F172A";
const BODY = "#52606D";
const MUTED = "#6B7785";
const BRAND = "#1668C7";
const BRAND_DARK = "#1056A7";
const LINE = "#E5E9F0";
const TINT = "#F7F9FC";

/* Every price on this page derives from these three constants. */
const BASE_PRICE = 997;
const AWARD_PRICE = 197;
const money = (n: number) => `$${n.toLocaleString()}`;

/* Stripe Payment Link for the Winner's Feature. */
const BASE_LINK = "https://payments.entrepreneurawards.co/b/eVqcN51Gd9vy2MQ5368so0m";

const REAL_FEATURE = FEATURES.find((feature) => feature.winnerSlug === "adam-pisk");

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1668C7]";

/* ------------------------------------------------------------ nav (v2) */
function WinnerFeatureV2Nav() {
  return (
    <SiteNav
      markSrc={eaMark84Asset.url}
      hideCTA
      hideLinks
      containerClassName="max-w-[1360px]"
      compactCta={{
        href: BASE_LINK,
        label: `Order · ${money(BASE_PRICE)}`,
        target: "_self",
        className: "bg-[#1668C7] text-white hover:bg-[#1056A7] focus-visible:ring-[#1668C7]",
      }}
    />
  );
}

/* ------------------------------------------------------------- primitives */
function BrandButton({
  href,
  children,
  className = "",
  style,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center transition-colors ${focusRing} ${className}`}
      style={{
        backgroundColor: BRAND,
        color: "#fff",
        fontSize: "15.5px",
        fontWeight: 600,
        borderRadius: "8px",
        minHeight: "52px",
        padding: "0 36px",
        ...style,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND_DARK)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND)}
    >
      {children}
    </a>
  );
}

/* ------------------------------------------------------------ logo bar */
function LogoBar() {
  const dividerClass = "mx-2 min-[380px]:mx-3 h-[26px] w-px shrink-0 sm:mx-6 sm:h-8";
  return (
    <div
      style={{
        borderTop: `1px solid ${LINE}`,
        borderBottom: `1px solid ${LINE}`,
        padding: "16px 0",
      }}
    >
      <p
        className="text-center"
        style={{
          fontSize: "12px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: MUTED,
        }}
      >
        PUBLISHED IN
      </p>
      <div className="mt-[14px] grid grid-cols-[1fr_auto_1fr] items-center">
        <div className="flex items-center justify-self-end">
          <img
            src="/usa-today-logo.svg"
            alt="USA Today"
            width={600}
            height={90}
            loading="eager"
            fetchPriority="high"
            className="h-[15px] w-auto min-[380px]:h-[17px] sm:h-[22px]"
            style={{ display: "block", objectFit: "contain" }}
          />
          <span aria-hidden className={dividerClass} style={{ backgroundColor: LINE }} />
        </div>
        <div className="flex items-center justify-self-center">
          <img
            src={apStackedLogoAsset.url}
            alt="Associated Press"
            width={500}
            height={228}
            loading="eager"
            fetchPriority="high"
            className="h-[36px] w-auto sm:h-[42px]"
            style={{ display: "block", objectFit: "contain" }}
          />
        </div>
        <div className="flex items-center justify-self-start">
          <span aria-hidden className={dividerClass} style={{ backgroundColor: LINE }} />
          <img
            src="/business-insider-logo-270.webp"
            alt="Business Insider"
            width={968}
            height={330}
            loading="eager"
            fetchPriority="high"
            className="h-[24px] w-auto sm:h-[30px]"
            style={{ display: "block", objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
}


function ArticleBlock({ block }: { block: FeatureBlock }) {
  if (block.type === "h2") {
    return <h2 className="mb-4 mt-11 text-[22px] font-bold text-foreground">{block.text}</h2>;
  }
  if (block.type === "quote") {
    return (
      <blockquote className="my-9 border-l-[3px] border-primary pl-[22px]">
        <p className="text-[19px] italic leading-[1.6] text-foreground">{block.text}</p>
        <p className="mt-3 text-[15px] text-muted-foreground">{block.attribution}</p>
      </blockquote>
    );
  }
  return (
    <p className="mb-[22px] text-[17px] leading-[1.75] text-foreground md:text-lg">
      {block.segments ? block.segments.map((segment, index) => segment.type === "link" ? (
        <a key={index} href={segment.href} target={segment.external ? "_blank" : undefined} rel={segment.external ? "nofollow noopener" : undefined} className="text-primary underline underline-offset-2">{segment.text}</a>
      ) : <span key={index}>{segment.text}</span>) : block.text}
    </p>
  );
}

function FeaturePortrait({ feature }: { feature: Feature }) {
  if (!feature.portrait) return null;
  return (
    <figure className="mb-11">
      <img src={feature.portrait} alt={feature.portraitCaption ?? ""} width={900} height={600} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover object-center" />
      {feature.portraitCaption ? <figcaption className="mt-3 text-[13px] leading-[1.5] text-muted-foreground">{feature.portraitCaption}</figcaption> : null}
    </figure>
  );
}

function RealFeaturePreview() {
  const feature = REAL_FEATURE;
  if (!feature) return null;
  return (
    <Dialog>
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        {feature.portrait ? (
          <img src={feature.portrait} alt={feature.portraitCaption ?? ""} width={640} height={360} loading="lazy" decoding="async" className="aspect-[3/2] w-full rounded-t-lg object-cover object-top" />
        ) : null}
        <div className="p-4">
          <p className="text-[16px] font-bold leading-[1.3] text-foreground">{feature.headline}</p>
          <DialogTrigger asChild><Button variant="outline" className="mt-3 min-h-11 w-full">Read the full Feature article</Button></DialogTrigger>
        </div>
      </div>
          <DialogContent className="h-dvh max-h-dvh max-w-none overflow-y-auto p-0 [&>button]:fixed [&>button]:right-4 [&>button]:top-4 [&>button]:z-10 [&>button]:grid [&>button]:h-11 [&>button]:w-11 [&>button]:place-items-center [&>button]:bg-background [&>button]:opacity-100 sm:h-auto sm:max-h-[90dvh] sm:max-w-[820px]">
            <article className="mx-auto w-full max-w-[720px] px-6 pb-12 pt-16 md:pt-[72px]">
              <DialogTitle className="mb-3.5 text-[28px] font-bold leading-[1.2] text-foreground md:text-[40px]">{feature.headline}</DialogTitle>
              <DialogDescription className="mb-8 text-[17px] font-semibold leading-[1.4] text-muted-foreground md:text-[19px]">{feature.subheadline}</DialogDescription>
              <hr className="mb-10 border-border" />
              <FeaturePortrait feature={feature} />
              {feature.body.map((block, index) => <ArticleBlock key={index} block={block} />)}
              {feature.awardImage ? <figure className="mb-12 mt-14"><img src={feature.awardImage} alt={`The ${AWARD_YEAR} Entrepreneur Awards engraved crystal award`} width={1152} height={648} loading="lazy" className="aspect-video w-full object-cover" /><figcaption className="mt-3 text-[13px] text-muted-foreground">The {AWARD_YEAR} Entrepreneur Awards engraved crystal award.</figcaption></figure> : null}
              <h2 className="mb-4 mt-11 text-[22px] font-bold text-foreground">Additional Information</h2>
              <dl className="border-y border-border py-2">
                {[["Industry", feature.info.industry], ["Location", feature.info.location], ["What They Do", feature.info.whatTheyDo], ["Website", feature.info.website]].map(([label, value]) => <div key={label} className="flex flex-col gap-1 py-2 sm:flex-row"><dt className="shrink-0 text-xs uppercase text-muted-foreground sm:w-40">{label}</dt><dd className="text-base leading-[1.6] text-foreground">{label === "Website" ? <a href={feature.info.websiteUrl} target="_blank" rel="nofollow noopener" className="underline underline-offset-2">{value}</a> : value}</dd></div>)}
              </dl>
              <div className="mt-10 text-center"><BrandButton href={BASE_LINK} className="w-full sm:w-auto">Order the Winner&rsquo;s Feature</BrandButton></div>
            </article>
          </DialogContent>
    </Dialog>
  );
}

const whyCards = [
  {
    title: "Something to point to",
    body: "When someone looks you up before a call, a national publication answers the question they were about to ask. Put the links on your site, in your email signature, on LinkedIn or in your deck.",
  },
  {
    title: "It runs on a date, not a maybe",
    body: "These are paid press releases. We write it and the publication runs it, which is why we can give you a date instead of pitching editors and hoping.",
  },
];

const questions = [
  {
    q: "Do I need to write anything?",
    a: "No. Our editorial team writes everything. We'll ask you a few quick questions about your business, and that's it.",
  },
  {
    q: "What if I don't like the draft?",
    a: "Tell us what to change and we'll change it. Nothing is published until you approve it.",
  },
  {
    q: "Is there anything recurring?",
    a: `No. One payment of ${money(BASE_PRICE)}. The engraved award is the only optional extra.`,
  },
  {
    q: "Do you need my address?",
    a: "Only if you add the engraved award. We'll email you for it after checkout.",
  },
  {
    q: "Can you place the press release in other publications?",
    a: "Yes. We can place it in other titles. Pricing varies by publication, so email us and we'll tell you what's available.",
  },
  {
    q: "Do I have to order this to keep my award?",
    a: "No. Your digital certificate and winner badge are yours either way. This is for winners who want their Feature article published as well.",
  },
];

const steps = ["We write it", "You approve it", "It goes live"];

const getItems = [
  { title: "Your Feature article", body: "Written by our editorial team and published on the Entrepreneur Awards winners page.", Icon: FileText },
  { title: "Your press release in all three publications", body: "Announcing your win, with a link back to your Feature article.", Icon: Newspaper },
  { title: "A link to each one", body: "Yours to share with clients, on your website or on LinkedIn.", Icon: Link },
  { title: "Your approval on every word", body: "Nothing goes live until you've signed off on the draft.", Icon: ShieldCheck },
];

const winnerBySlug = (slug: string) => {
  const winner = WINNERS.find((w) => w.slug === slug);
  if (!winner) throw new Error(`Missing winner data for ${slug}`);
  return winner;
};

/* Real press releases for 2026 winners. Names and companies come from the
 * shared winner records so they never drift from the /winners pages. */
const SNIPPETS = [
  { slug: "adam-pisk", publication: "USA Today", favicon: 0, src: snippetAdamAsset.url },
  { slug: "nimisha-nailor", publication: "Associated Press", favicon: 1, src: snippetNimishaAsset.url },
  { slug: "gabriel-sabadin", publication: "Business Insider", favicon: 2, src: snippetGabrielAsset.url },
  { slug: "ashton-bishop", publication: "USA Today", favicon: 0, src: snippetAshtonAsset.url },
].map((s) => ({ ...s, winner: winnerBySlug(s.slug) }));

function PublishedSnippets() {
  return (
    <section style={{ backgroundColor: TINT, paddingTop: "56px", paddingBottom: "56px" }}>
      <div className="mx-auto max-w-[928px] px-6">
        <h2 className="text-center" style={{ fontSize: "24px", fontWeight: 700, color: INK }}>
          Already published for {AWARD_YEAR} winners
        </h2>
        <p className="mx-auto mt-3 max-w-[56ch] text-center" style={{ fontSize: "15px", lineHeight: 1.55, color: BODY }}>
          Real press releases for this year&rsquo;s winners.
        </p>
        {/* Mobile: sideways swipe row with the same 24px page margin; desktop: 2 × 2 grid */}
        <ul className="ea-hide-scrollbar -mx-6 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 scroll-pl-6 scroll-pr-6 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 md:scroll-pl-0 md:scroll-pr-0">
          {SNIPPETS.map((item) => {
            const alt = `${item.publication} press release for ${item.winner.name}`;
            const icon = FAVICONS[item.favicon];
            return (
              <li key={item.slug} className="flex w-[85vw] shrink-0 snap-start md:w-auto">
                <div className="flex w-full flex-col overflow-hidden bg-white" style={{ borderRadius: "12px", border: `1px solid ${LINE}` }}>
                  <img
                    src={item.src}
                    alt={alt}
                    width={800}
                    height={500}
                    loading="eager"
                    decoding="async"
                    className="block w-full object-cover object-top"
                    style={{ aspectRatio: "16 / 10", borderBottom: `1px solid ${LINE}` }}
                  />
                  <div className="flex flex-1 flex-col gap-1.5" style={{ padding: "16px" }}>
                    <p className="flex items-center gap-2" style={{ fontSize: "13px" }}>
                      <img src={icon.src} alt="" width={20} height={20} className="h-5 w-5 object-contain" />
                      <span style={{ fontWeight: 600, color: INK }}>{item.publication}</span>
                      <span style={{ color: MUTED }}>· Press release</span>
                    </p>
                    <p style={{ fontSize: "15px" }}>
                      <span style={{ fontWeight: 600, color: INK }}>{item.winner.name}</span>
                      <span style={{ color: MUTED }}> · {item.winner.company}</span>
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

const FAVICONS = [
  { src: "/usa-today-favicon.png", alt: "USA Today" },
  { src: apUserLogoAsset.url, alt: "The Associated Press" },
  { src: "/business-insider-favicon.png", alt: "Business Insider" },
];

/* --------------------------------------------------------------- sticky bar */
function useStickyBar(heroRef: React.RefObject<HTMLElement | null>, priceRef: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    const price = priceRef.current;
    if (!hero || !price) return;

    const state = { heroGone: false, priceVisible: false };
    const update = () => setVisible(state.heroGone && !state.priceVisible);

    const heroObserver = new IntersectionObserver(
      ([e]) => {
        state.heroGone = !e.isIntersecting && e.boundingClientRect.top < 0;
        update();
      },
      { threshold: 0 },
    );
    const priceObserver = new IntersectionObserver(
      ([e]) => {
        state.priceVisible = e.isIntersecting;
        update();
      },
      { threshold: 0 },
    );

    heroObserver.observe(hero);
    priceObserver.observe(price);
    return () => {
      heroObserver.disconnect();
      priceObserver.disconnect();
    };
  }, [heroRef, priceRef]);

  return visible;
}

/* --------------------------------------------------------------------- page */
function WinnerFeatureV2Page() {
  const { business: rawBusiness } = Route.useSearch();
  const business = sanitizeBusiness(rawBusiness);

  const heroCtaRef = useRef<HTMLDivElement>(null);
  const priceRailRef = useRef<HTMLDivElement>(null);
  const stickyVisible = useStickyBar(heroCtaRef, priceRailRef);

  return (
    <div className="min-h-screen pb-20 md:pb-0" style={{ backgroundColor: "#fff", color: BODY }}>
      <WinnerFeatureV2Nav />

      <main>
        {/* 1. HERO */}
        <section style={{ paddingTop: "64px", paddingBottom: "56px" }}>
          <div className="mx-auto max-w-[728px] px-6 text-center">
            <p style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.16em", color: MUTED }}>
              {business ? `For ${business}, a ${AWARD_YEAR} Entrepreneur Awards winner` : `For ${AWARD_YEAR} Entrepreneur Awards winners`}
            </p>

            <h1
              className="mx-auto"
              style={{
                marginTop: "18px",
                fontSize: "clamp(30px, 3.6vw, 44px)",
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: INK,
                maxWidth: "24ch",
              }}
            >
              Your win, published in USA Today, the Associated Press and Business Insider.
            </h1>

            <p
              className="mx-auto"
              style={{
                marginTop: "18px",
                fontSize: "16.5px",
                lineHeight: 1.55,
                color: BODY,
                maxWidth: "50ch",
              }}
            >
              We write an article about your win for the Entrepreneur Awards winners page and place a press release about it in all three.
            </p>

            <div style={{ marginTop: "24px", marginBottom: "24px" }}>
              <LogoBar />
            </div>

            <p style={{ fontSize: "15px", color: BODY }}>
              <span style={{ fontWeight: 700, color: INK }}>{money(BASE_PRICE)}</span>
              {" · one payment"}
            </p>

            <div ref={heroCtaRef} style={{ marginTop: "20px" }}>
              <BrandButton href={BASE_LINK} className="w-full sm:w-auto">
                Order the Winner&rsquo;s Feature
              </BrandButton>
            </div>

            <p style={{ marginTop: "14px", fontSize: "12.5px", color: MUTED }}>
              You approve every word before anything is published.
            </p>
          </div>
        </section>

        <PublishedSnippets />

        {/* HOW IT WORKS */}
        <section style={{ paddingTop: "56px", paddingBottom: "56px" }}>
          <div className="mx-auto max-w-[928px] px-6">
            <h2 className="text-center" style={{ fontSize: "24px", fontWeight: 700, color: INK }}>How it works</h2>
            <ol className="mx-auto mt-8 flex w-fit flex-col md:w-full md:flex-row md:items-start">
              {steps.map((step, index) => (
                <li key={step} className="flex flex-row md:flex-1 md:flex-col md:items-center">
                  <div className="flex flex-col items-center md:w-full md:flex-row">
                    <span aria-hidden className={`hidden h-px flex-1 md:block ${index === 0 ? "md:invisible" : ""}`} style={{ backgroundColor: "#D8E0EC" }} />
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white" style={{ backgroundColor: BRAND, fontSize: "13px", fontWeight: 700 }}>{index + 1}</span>
                    <span aria-hidden className={`hidden h-px flex-1 md:block ${index === steps.length - 1 ? "md:invisible" : ""}`} style={{ backgroundColor: "#D8E0EC" }} />
                    {index < steps.length - 1 ? <span aria-hidden className="h-7 w-px md:hidden" style={{ backgroundColor: "#D8E0EC" }} /> : null}
                  </div>
                  <span className="ml-4 mt-1.5 md:ml-0 md:mt-3" style={{ fontSize: "16px", fontWeight: 700, color: INK }}>{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-7 text-center" style={{ fontSize: "14.5px", lineHeight: 1.55, color: BODY }}>
              Your draft arrives within five working days. It goes live three days after you approve it.
            </p>
          </div>
        </section>

        {/* WHAT IT DOES FOR YOU */}
        <section style={{ backgroundColor: TINT, paddingTop: "56px", paddingBottom: "56px" }}>
          <div className="mx-auto max-w-[928px] px-6">
            <h2 className="text-center" style={{ fontSize: "24px", fontWeight: 700, color: INK }}>What it does for you</h2>
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ marginTop: "28px", gap: "20px" }}>
              {whyCards.map((card) => (
                <div key={card.title} style={{ backgroundColor: "#fff", border: `1px solid ${LINE}`, borderRadius: "8px", padding: "24px" }}>
                  <h3 style={{ fontSize: "16.5px", fontWeight: 600, color: INK }}>{card.title}</h3>
                  <p style={{ marginTop: "10px", fontSize: "14.5px", lineHeight: 1.6, color: BODY }}>{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT YOU GET */}
        <section style={{ paddingTop: "56px", paddingBottom: "56px" }}>
          <div className="mx-auto max-w-[928px] px-6">
            <h2 className="text-center" style={{ fontSize: "24px", fontWeight: 700, color: INK }}>What you get</h2>
            <div
              className="mx-auto"
              style={{
                marginTop: "28px",
                maxWidth: "880px",
                backgroundColor: "#fff",
                border: "1px solid #E4E9F2",
                borderRadius: "18px",
                overflow: "hidden",
                boxShadow: "0 1px 2px rgba(16,27,45,.04), 0 14px 34px rgba(16,27,45,.07)",
              }}
            >
              <div className="flex flex-col items-start gap-2 px-5 py-[18px] sm:flex-row sm:items-center sm:justify-between sm:gap-3 md:px-8" style={{ borderBottom: "1px solid #EEF1F7" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#55616F", whiteSpace: "nowrap" }}>The Winner&rsquo;s Feature</span>
                <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#14508F", backgroundColor: "#EAF2FD", padding: "6px 12px", borderRadius: "999px", whiteSpace: "nowrap" }}>Digital delivery</span>
              </div>
              <div className="grid grid-cols-1 gap-8 px-5 py-7 md:grid-cols-[3fr_2fr] md:gap-10 md:p-8">
                <div className="flex flex-col gap-6">
                  {getItems.map(({ title, body, Icon }, index) => (
                    <div key={title} className="flex items-start gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center" style={{ backgroundColor: "#EAF2FD", borderRadius: "10px" }}>
                        <Icon aria-hidden size={20} color={BRAND} />
                      </span>
                      <div>
                        <h3 style={{ fontSize: "16px", fontWeight: 700, color: INK }}>{title}</h3>
                        <p style={{ marginTop: "4px", fontSize: "14.5px", lineHeight: 1.55, color: BODY }}>{body}</p>
                        {index === 1 ? (
                          <div className="mt-3 flex items-center gap-2.5">
                            {FAVICONS.map((f) => (
                              <img key={f.alt} src={f.src} alt={f.alt} width={20} height={20} loading="eager" decoding="async" className="h-5 w-5 object-contain" style={{ borderRadius: "4px" }} />
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#55616F" }}>A real winner&rsquo;s Feature article</p>
                  <div className="mt-3"><RealFeaturePreview /></div>
                </div>
              </div>
              <div
                ref={priceRailRef}
                className="flex flex-col gap-5 px-5 py-[22px] md:flex-row md:items-center md:justify-between md:px-8"
                style={{ backgroundColor: "#101B2D" }}
              >
                <div>
                  <p style={{ fontSize: "40px", fontWeight: 800, letterSpacing: "-0.02em", color: "#FFFFFF", lineHeight: 1 }}>
                    {money(BASE_PRICE)}
                  </p>
                  <p style={{ marginTop: "8px", fontSize: "13.5px", color: "#AFBCD0" }}>One payment for everything above</p>
                </div>
                <div className="md:text-right">
                  <BrandButton href={BASE_LINK} className="w-full md:w-auto" style={{ minHeight: "52px", borderRadius: "10px", padding: "0 26px", fontWeight: 700 }}>
                    Order the Winner&rsquo;s Feature
                  </BrandButton>
                  <p className="mt-2 text-center md:text-right" style={{ fontSize: "13px", color: "#AFBCD0" }}>Secure checkout by Stripe</p>
                </div>
              </div>

              <div
                className="flex flex-wrap items-center gap-x-4 px-5 py-4 md:flex-nowrap md:px-8"
                style={{ backgroundColor: "#F2F5FA", borderTop: "1px solid #E4E9F2" }}
              >
                <div
                  className="order-1 flex h-[58px] w-[58px] shrink-0 items-center justify-center"
                  style={{ borderRadius: "9px", backgroundColor: "#E7ECF4", border: "1px solid #DCE3EE" }}
                  aria-label="The engraved 2026 Entrepreneur Award"
                >
                  <Trophy size={28} color="#55616F" strokeWidth={1.75} />
                </div>
                <span
                  className="order-3 mt-3 w-full shrink-0 whitespace-nowrap text-left md:mt-0 md:w-auto"
                  style={{ fontSize: "13.5px", fontWeight: 700, color: "#55616F" }}
                >
                  Add for {money(AWARD_PRICE)} at checkout
                </span>
                <p
                  className="order-2 min-w-0 flex-1"
                  style={{ fontSize: "13.5px", lineHeight: 1.5, color: "#55616F" }}
                >
                  <strong style={{ color: "#0B1220", fontWeight: 700 }}>Optional: the engraved award.</strong>{" "}
                  Your name and award year on crystal, plus a printed certificate, posted to you.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* 5. QUESTIONS */}
        <section style={{ backgroundColor: TINT, paddingTop: "56px", paddingBottom: "56px" }}>
          <div className="mx-auto px-6" style={{ maxWidth: "728px" }}>
            <h2 className="text-center" style={{ fontSize: "24px", fontWeight: 700, color: INK }}>
              Questions
            </h2>
            <div style={{ marginTop: "24px" }}>
              <Accordion type="multiple" className="w-full">
                {questions.map((item, i) => (
                  <AccordionItem
                    key={item.q}
                    value={`q-${i}`}
                    className="border-b-0"
                    style={{
                      borderTop: i === 0 ? undefined : `1px solid ${LINE}`,
                    }}
                  >
                    <AccordionTrigger
                      className="hover:no-underline py-5 text-left [&>svg]:text-[#6B7785]"
                      style={{
                        fontSize: "15.5px",
                        fontWeight: 600,
                        color: INK,
                        paddingTop: "20px",
                        paddingBottom: "20px",
                      }}
                    >
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent
                      className="pb-5 pt-0"
                      style={{ fontSize: "14.5px", lineHeight: 1.65, color: BODY }}
                    >
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* 6. CLOSING */}
        <section
          className="text-center"
          style={{ backgroundColor: INK, paddingTop: "56px", paddingBottom: "56px" }}
        >
          <div className="mx-auto max-w-3xl px-6">
            <h2
              className="mx-auto text-2xl md:text-[30px]"
              style={{ fontWeight: 700, color: "#fff", maxWidth: "24ch", lineHeight: 1.2 }}
            >
              You&rsquo;ve already won. This is the part people see.
            </h2>
            <div style={{ marginTop: "24px" }}>
              <a
                href={BASE_LINK}
                className={`inline-flex w-full items-center justify-center sm:w-auto ${focusRing}`}
                style={{
                  backgroundColor: "#fff",
                  color: INK,
                  fontSize: "15.5px",
                  fontWeight: 600,
                  borderRadius: "8px",
                  minHeight: "52px",
                  padding: "0 36px",
                }}
              >
                Order the Winner&rsquo;s Feature
              </a>
            </div>
            <p
              style={{ marginTop: "16px", fontSize: "13px", color: "#AFBCD0" }}
            >
              Secure checkout by Stripe
            </p>
          </div>
        </section>
      </main>

      <SiteFooter statementClassName="text-[13px]" />

      {/* 7. MOBILE STICKY BAR */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between md:hidden"
        style={{
          backgroundColor: "#fff",
          borderTop: `1px solid ${LINE}`,
          boxShadow: "0 -2px 10px rgba(15,23,42,0.06)",
          padding: "12px",
          paddingBottom: "calc(12px + env(safe-area-inset-bottom))",
          transform: stickyVisible ? "translateY(0)" : "translateY(120%)",
          transition: "transform 180ms ease",
        }}
        aria-hidden={!stickyVisible}
      >
        <div>
          <p style={{ fontSize: "16px", fontWeight: 700, color: INK }}>{money(BASE_PRICE)}</p>
        </div>
        <a
          href={BASE_LINK}
          tabIndex={stickyVisible ? 0 : -1}
          className={`inline-flex items-center justify-center ${focusRing}`}
          style={{
            backgroundColor: BRAND,
            color: "#fff",
            minHeight: "48px",
            borderRadius: "8px",
            padding: "0 22px",
            fontSize: "14.5px",
            fontWeight: 600,
          }}
        >
          Order now
        </a>
      </div>
    </div>
  );
}
