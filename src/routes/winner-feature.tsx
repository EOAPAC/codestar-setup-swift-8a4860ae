import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Check, Search, Trophy } from "lucide-react";

import { AWARD_YEAR } from "@/content/award";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  SPECIMEN_BYLINE,
  SPECIMEN_HEADLINE,
  SPECIMEN_OPENING_PARAGRAPHS,
  SPECIMEN_BUSINESS_TOKEN,
  splitOnBusinessToken,
} from "@/content/specimen";

import apUserLogoAsset from "@/assets/associated-press-ap-user.png.asset.json";

const PUBLISHERS = ["USA Today", "The Associated Press", "Business Insider"] as const;
type PublisherName = (typeof PUBLISHERS)[number];
type PublisherLogoVariant = "hero" | "card" | "serp";

const PUBLISHER_ASSETS: Record<
  PublisherName,
  {
    alt: string;
    wordmark: { src: string; width: number; height: number };
    icon: { src: string; width: number; height: number };
  }
> = {
  "USA Today": {
    alt: "USA Today",
    wordmark: { src: "/usa-today-logo.svg", width: 600, height: 90 },
    icon: { src: "/usa-today-favicon.png", width: 96, height: 96 },
  },
  "The Associated Press": {
    alt: "The Associated Press",
    wordmark: { src: apUserLogoAsset.url, width: 542, height: 552 },
    icon: { src: apUserLogoAsset.url, width: 542, height: 552 },
  },
  "Business Insider": {
    alt: "Business Insider",
    wordmark: { src: "/business-insider-logo.png", width: 1152, height: 576 },
    icon: { src: "/business-insider-favicon.png", width: 96, height: 96 },
  },
};

const PUBLISHER_LOGO_HEIGHTS: Record<PublisherLogoVariant, Record<PublisherName, number>> = {
  hero: { "USA Today": 20, "The Associated Press": 32, "Business Insider": 22 },
  card: { "USA Today": 18, "The Associated Press": 28, "Business Insider": 20 },
  serp: { "USA Today": 20, "The Associated Press": 20, "Business Insider": 20 },
};

const PUBLISHER_DIVIDER_HEIGHTS: Record<PublisherLogoVariant, number> = {
  hero: 34,
  card: 30,
  serp: 22,
};

function WinnerFeatureNav() {
  return (
    <SiteNav
      hideCTA
      mobileMenu
      containerClassName="max-w-[1360px]"
      compactCta={{
        href: BASE_LINK,
        label: `Order — ${money(BASE_PRICE)}`,
        className: "bg-[#1668C7] text-white hover:bg-[#1056A7] focus-visible:ring-[#1668C7]",
      }}
    />
  );
}

export const Route = createFileRoute("/winner-feature")({
  head: () => ({
    meta: [
      { title: `The Winner's Feature — ${AWARD_YEAR} Entrepreneur Awards` },
      {
        name: "description",
        content: `We write the story of your ${AWARD_YEAR} Entrepreneur Awards win, publish it on the winners page and announce it in USA Today, the Associated Press and Business Insider.`,
      },
      { property: "og:title", content: `The Winner's Feature — ${AWARD_YEAR} Entrepreneur Awards` },
      {
        property: "og:description",
        content: `One story: your Feature on the Entrepreneur Awards winners page, announced in three national publications.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
    links: PUBLISHERS.map((name) => ({
      rel: "preload",
      as: "image",
      href: PUBLISHER_ASSETS[name].wordmark.src,
    })),
  }),
  component: WinnerFeaturePage,
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
const BASE_LINK = "https://payments.entrepreneurawards.co/b/00wbJ1acJ6jm3QUfHK8so0j";

const BASE_PUBLICATIONS = "USA Today, the Associated Press and Business Insider";
const REAL_FEATURE_SLUG = "adam-pisk";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1668C7]";

/* ------------------------------------------------------------- primitives */
function SpecimenSlot() {
  return (
    <span
      style={{
        backgroundColor: `${BRAND}14`,
        color: BRAND,
        borderRadius: "4px",
        padding: "0 4px",
        whiteSpace: "nowrap",
      }}
    >
      {SPECIMEN_BUSINESS_TOKEN}
    </span>
  );
}

function withSlots(text: string) {
  const parts = splitOnBusinessToken(text);
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 ? <SpecimenSlot /> : null}
    </span>
  ));
}

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
      target="_blank"
      rel="noopener noreferrer"
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

function FeatureLink({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/winners/$slug"
      params={{ slug: REAL_FEATURE_SLUG }}
      className={`inline-flex items-center ${focusRing} ${className}`}
      style={{ color: BRAND, fontSize: "14px", fontWeight: 500, minHeight: "44px", padding: "8px 0" }}
    >
      See a real winner&rsquo;s feature &rarr;
    </Link>
  );
}

/* --------------------------------------------------- search result mockup */
type Result = { name: string; domain: string; headline: string; snippet: string };

const heroResults: Result[] = [
  {
    name: "USA Today",
    domain: "usatoday.com",
    headline: `[Your Business] named a ${AWARD_YEAR} Entrepreneur Awards winner`,
    snippet: `The ${AWARD_YEAR} Entrepreneur Awards have named [Your Business] among this year's winners, recognising…`,
  },
  {
    name: "The Associated Press",
    domain: "apnews.com",
    headline: `${AWARD_YEAR} Entrepreneur Awards names [Your Business] a winner`,
    snippet: `[Your Business] has been recognised in the ${AWARD_YEAR} Entrepreneur Awards, an independent award for founders…`,
  },
  {
    name: "Business Insider",
    domain: "businessinsider.com",
    headline: `How [Your Business] won a ${AWARD_YEAR} Entrepreneur Award`,
    snippet: `Judged against a published rubric, [Your Business] was selected from this year's entries for…`,
  },
  {
    name: "Entrepreneur Awards",
    domain: "entrepreneurawards.co",
    headline: `${AWARD_YEAR} Winner Feature — [Your Business]`,
    snippet:
      "Before the award, the constraint everyone told them to fix turned out to be the reason customers stayed…",
  },
];

function PublisherLogos({
  size,
  publications = PUBLISHERS,
  priority = false,
  className = "",
}: {
  size: PublisherLogoVariant;
  publications?: readonly PublisherName[];
  priority?: boolean;
  className?: string;
}) {
  const isSerp = size === "serp";
  const multiple = publications.length > 1;
  const gapClass = size === "card" ? "gap-0" : "gap-0";

  return (
    <span className={`flex flex-nowrap items-center justify-center ${gapClass} ${className}`}>
      {publications.map((name, index) => {
        const asset = isSerp ? PUBLISHER_ASSETS[name].icon : PUBLISHER_ASSETS[name].wordmark;
        const height = PUBLISHER_LOGO_HEIGHTS[size][name];
        const containerStyle = {
          "--publisher-divider-height": `${PUBLISHER_DIVIDER_HEIGHTS[size]}px`,
          height: `${height}px`,
          width: isSerp ? "20px" : undefined,
          borderColor: "#E4E9F2",
          borderRadius: isSerp ? "4px" : undefined,
          overflow: isSerp ? "hidden" : undefined,
        } as React.CSSProperties & { "--publisher-divider-height": string };
        return (
          <span
            key={`${size}-${name}`}
            className={`relative flex shrink-0 items-center justify-center ${multiple && index > 0 ? "ml-4 pl-4 before:absolute before:left-0 before:top-1/2 before:h-[var(--publisher-divider-height)] before:w-px before:-translate-y-1/2 before:bg-[#E4E9F2] before:content-[''] md:ml-[26px] md:pl-[26px]" : ""}`}
            style={containerStyle}
          >
            <img
              src={asset.src}
              alt={isSerp ? "" : PUBLISHER_ASSETS[name].alt}
              width={asset.width}
              height={asset.height}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : undefined}
              decoding={priority ? undefined : "async"}
              style={{
                display: "block",
                height: "100%",
                width: isSerp ? "100%" : "auto",
                objectFit: isSerp ? "contain" : "contain",
              }}
            />
          </span>
        );
      })}
    </span>
  );
}

function HeroPublicationStrip() {
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
      <div style={{ marginTop: "14px" }}>
        <PublisherLogos size="hero" priority />
      </div>
    </div>
  );
}

function CardPublicationStrip() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 px-5 py-5 md:flex-row md:gap-[26px] md:px-[34px] md:py-[21px]"
      style={{
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid #EEF1F7",
      }}
    >
      <p
        className="shrink-0"
        style={{
          fontSize: "11px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: "#55616F",
        }}
      >
        Published in
      </p>
      <PublisherLogos size="card" />
    </div>
  );
}

function SearchResult({ result }: { result: Result }) {
  const publisherName = PUBLISHERS.find((name) => name === result.name);
  return (
    <div>
      <div className="flex items-center gap-2">
        {publisherName ? <PublisherLogos size="serp" publications={[publisherName]} /> : null}
        <p style={{ fontSize: "12px", fontWeight: 600, color: INK }}>
          {result.name}
          <span style={{ fontSize: "11px", fontWeight: 400, color: MUTED }}>
            {" · "}{result.domain}
          </span>
        </p>
      </div>
      <p
        style={{
          marginTop: "3px",
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: 1.3,
          color: BRAND,
        }}
      >
        {withSlots(result.headline)}
      </p>
      <p
        className="truncate"
        style={{ marginTop: "4px", fontSize: "12px", lineHeight: 1.45, color: BODY }}
      >
        {result.snippet}
      </p>
    </div>
  );
}

function SearchMockup() {
  return (
    <div
      role="img"
      aria-label="Illustration of a search results page showing three news announcements of an Entrepreneur Awards win and the winner's feature on entrepreneurawards.co"
      style={{
        backgroundColor: "#fff",
        border: `1px solid ${LINE}`,
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(15,23,42,0.06)",
      }}
    >
      <div style={{ backgroundColor: TINT, borderBottom: `1px solid ${LINE}`, padding: "12px" }}>
        <div
          className="flex items-center gap-2"
          style={{
            backgroundColor: "#fff",
            border: `1px solid ${LINE}`,
            borderRadius: "18px",
            padding: "8px 14px",
          }}
        >
          <Search aria-hidden size={13} color={MUTED} />
          <span style={{ fontSize: "12.5px", color: INK }}>{SPECIMEN_BUSINESS_TOKEN}</span>
        </div>
      </div>
      {heroResults.map((r, i) => (
        <div
          key={r.domain}
          style={{ padding: "16px", borderTop: i === 0 ? undefined : `1px solid ${LINE}` }}
        >
          <SearchResult result={r} />
        </div>
      ))}
    </div>
  );
}

/* ----------------------------------------------------- winner page mockup */
function BrowserMockup() {
  return (
    <div className="flex h-full flex-col overflow-hidden" style={{ backgroundColor: "#fff" }}>
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ borderBottom: `1px solid ${LINE}`, backgroundColor: TINT }}
      >
        <span className="flex gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: "#E2E6ED" }}
            />
          ))}
        </span>
        <span
          className="ml-1 flex-1 truncate rounded-md px-2.5 py-1"
          style={{
            backgroundColor: "#fff",
            border: `1px solid ${LINE}`,
            fontSize: "11px",
            color: MUTED,
          }}
        >
          entrepreneurawards.co/winners/your-business
        </span>
      </div>
      <div className="relative flex-1 px-5 pb-6 pt-5" style={{ minHeight: 0, overflow: "hidden" }}>
        <p
          style={{
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: BRAND,
          }}
        >
          {AWARD_YEAR} Winner Feature
        </p>
        <h3
          style={{
            marginTop: "10px",
            fontSize: "19px",
            lineHeight: 1.25,
            fontWeight: 600,
            letterSpacing: "-0.015em",
            color: INK,
          }}
        >
          {withSlots(SPECIMEN_HEADLINE)}
        </h3>
        <p style={{ marginTop: "10px", fontSize: "11px", color: MUTED }}>{SPECIMEN_BYLINE}</p>
        {[SPECIMEN_OPENING_PARAGRAPHS[0], SPECIMEN_OPENING_PARAGRAPHS[2]].map((p, i) => (
          <p key={i} style={{ marginTop: "12px", fontSize: "12.5px", lineHeight: 1.7, color: BODY }}>
            {withSlots(p)}
          </p>
        ))}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{
            height: "110px",
            background: "linear-gradient(to bottom, rgba(255,255,255,0), #fff 85%)",
          }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- page content */
const includedRows: { lead: string; rest: string }[] = [
  {
    lead: "Your Feature",
    rest: ", written by our editorial team and published on the Entrepreneur Awards winners page",
  },
  {
    lead: "A press release",
    rest: " announcing your win, placed in three national publications, each linking back to your Feature",
  },
  {
    lead: "A permanent link",
    rest: " to every placement, to send to a client or add to your site",
  },
  { lead: "Your approval", rest: " on every word before anything is published" },
];

const whyCards = [
  {
    title: "Something to point to",
    body: "When someone looks you up before a call, a national article answers the question they were about to ask. Put the links on your site, in your email signature, in your deck.",
  },
  {
    title: "You don't write a word",
    body: "Our editorial team writes both the Feature and the release. Your draft arrives within five working days, and nothing is published until you approve it.",
  },
  {
    title: "It runs on a date, not a maybe",
    body: "These are paid placements. We write the piece and the publication runs it, which is why we can give you a date instead of pitching editors and hoping.",
  },
];

const questions = [
  {
    q: "Why does the same release appear in every publication?",
    a: "Because that is what a press release is — one announcement, distributed. Your Feature on the Entrepreneur Awards site is the long version, written for you alone, and every release links back to it.",
  },
  {
    q: "Can you place the release in other publications?",
    a: "Yes. We can place in other titles, including Fortune. Pricing varies by publication, so email us and we'll tell you what's available.",
  },
  {
    q: "Do you need my address?",
    a: "Yes. Checkout asks for one because the engraved award is offered there as an optional extra. If you don't add it, nothing is posted to you and everything arrives by email.",
  },
  {
    q: "Who writes it?",
    a: "Our editorial team. Beyond a short form about your business, you don't have to write or brief anything.",
  },
  {
    q: "What if I don't like the draft?",
    a: "Tell us what to change and we'll change it. Nothing is published until you approve it.",
  },
  {
    q: "What can I do with the articles afterwards?",
    a: "Each placement has a permanent link. Send them to clients, add them to your site, include them in your deck or your pitch.",
  },
  {
    q: "Is there anything recurring?",
    a: `No. One payment of ${money(BASE_PRICE)}, and that's the whole cost unless you choose an upgrade.`,
  },
  {
    q: "Do I have to order this to keep my award?",
    a: "No. Your digital certificate and winner badge are yours either way. This is for winners who want the story published as well.",
  },
];

const steps = ["We write it", "You approve it", "It goes live"];

const microLabel = {
  fontSize: "12px",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.13em",
  color: MUTED,
};

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
function WinnerFeaturePage() {
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const priceCardRef = useRef<HTMLDivElement>(null);
  const stickyVisible = useStickyBar(heroCtaRef, priceCardRef);

  return (
    <div className="min-h-screen pb-20 md:pb-0" style={{ backgroundColor: "#fff", color: BODY }}>
      <WinnerFeatureNav />

      <main>
        {/* 1. HERO */}
        <section style={{ paddingTop: "64px", paddingBottom: "56px" }}>
          <div className="mx-auto grid max-w-[1360px] grid-cols-1 items-start gap-12 px-6 lg:grid-cols-12 lg:gap-16">
            <div className="text-center lg:col-span-5 lg:text-left">
              <p className="flex items-center justify-center lg:justify-start" style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.16em", color: MUTED }}>
                <span>Entrepreneur Awards &middot; The Winner&rsquo;s Feature</span>
              </p>

              <h1
                className="mx-auto lg:mx-0"
                style={{
                  marginTop: "18px",
                  fontSize: "clamp(30px, 3.6vw, 44px)",
                  fontWeight: 700,
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: INK,
                  maxWidth: "20ch",
                }}
              >
                Give people something to find when they look you up.
              </h1>

              <p
                className="mx-auto lg:mx-0"
                style={{
                  marginTop: "18px",
                  fontSize: "16.5px",
                  lineHeight: 1.55,
                  color: BODY,
                  maxWidth: "46ch",
                }}
              >
                We write the story of your win, publish it on the Entrepreneur Awards winners page,
                and announce it in three national publications.
              </p>

              <div
                className="mx-auto lg:mx-0"
                style={{ marginTop: "24px", marginBottom: "24px", maxWidth: "46ch" }}
              >
                <HeroPublicationStrip />
              </div>

              <div
                className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 lg:justify-start"
              >
                <span style={{ fontSize: "34px", fontWeight: 700, color: INK }}>
                  {money(BASE_PRICE)}
                </span>
                <span style={{ fontSize: "13px", color: MUTED }}>
                  one payment &middot; nothing recurring
                </span>
              </div>

              <div ref={heroCtaRef} style={{ marginTop: "20px" }}>
                <BrandButton href={BASE_LINK} className="w-full sm:w-auto">
                  Order the Winner&rsquo;s Feature
                </BrandButton>
              </div>

              <p style={{ marginTop: "14px", fontSize: "12.5px", color: MUTED }}>
                You approve every word before anything is published.
              </p>

              <div style={{ marginTop: "20px" }}>
                <FeatureLink />
              </div>
            </div>

            <div className="lg:col-span-7">
              <p style={{ ...microLabel, marginBottom: "12px" }}>
                What people find when they look you up
              </p>
              <SearchMockup />
            </div>
          </div>
        </section>

        {/* 2. THE OFFER */}
        <section style={{ backgroundColor: TINT, paddingTop: "64px", paddingBottom: "64px" }}>
          <div className="mx-auto max-w-6xl px-6">
            <h2
              className="text-center"
              style={{ fontSize: "24px", fontWeight: 700, color: INK }}
            >
              <span className="md:hidden">What you get for {money(BASE_PRICE)}</span>
              <span className="hidden md:inline" style={{ fontSize: "28px" }}>
                What you get for {money(BASE_PRICE)}
              </span>
            </h2>

            <div
              className="mx-auto"
              style={{
                marginTop: "28px",
                maxWidth: "1024px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #E4E9F2",
                borderRadius: "18px",
                overflow: "hidden",
                boxShadow: "0 1px 2px rgba(16,27,45,.04), 0 14px 34px rgba(16,27,45,.07)",
              }}
            >
              <div
                className="flex items-center justify-between"
                style={{ borderBottom: "1px solid #EEF1F7", padding: "22px 34px" }}
              >
                <span
                  style={{
                    fontSize: "11.5px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "#55616F",
                  }}
                >
                  The Winner&rsquo;s Feature
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#14508F",
                    backgroundColor: "#EAF2FD",
                    padding: "6px 12px",
                    borderRadius: "999px",
                  }}
                >
                  Digital delivery
                </span>
              </div>

              <div className="grid grid-cols-1 gap-[28px] px-5 py-7 md:grid-cols-12 md:gap-[34px] md:px-[34px] md:pb-7 md:pt-[30px]">
                <div className="flex flex-col gap-[19px] md:col-span-7">
                  {includedRows.map((row) => (
                    <div key={row.lead} className="flex items-start gap-[13px]">
                      <Check aria-hidden size={19} strokeWidth={2.6} color="#1668C7" style={{ marginTop: "3px", flexShrink: 0 }} />
                      <p style={{ fontSize: "15.5px", lineHeight: 1.55, color: "#414B59" }}>
                        <strong style={{ fontWeight: 700, color: "#0B1220" }}>{row.lead}</strong>
                        {row.rest}
                      </p>
                    </div>
                  ))}
                </div>

                <aside
                  className="md:col-span-5"
                  style={{ backgroundColor: "#F7F9FC", border: "1px solid #E7ECF4", borderRadius: "13px", padding: "22px" }}
                >
                  <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#55616F" }}>
                    Timeline
                  </p>
                  <ol className="mt-4 flex items-start justify-between md:flex-col md:items-stretch md:justify-start">
                    {steps.map((step, index) => {
                      const mobileLabel = ["We write it", "Approve", "Live"][index];
                      return (
                        <li key={step} className="relative flex min-w-0 flex-1 flex-col items-center md:flex-none md:items-start">
                          <div className="flex w-full items-center md:w-auto">
                            {index > 0 ? <span aria-hidden className="h-px flex-1 bg-[#D8E0EC] md:hidden" /> : null}
                            <span className="grid h-[23px] w-[23px] shrink-0 place-items-center rounded-full bg-[#1668C7] text-white" style={{ fontSize: "11.5px", fontWeight: 700 }}>
                              {index + 1}
                            </span>
                            {index < steps.length - 1 ? <span aria-hidden className="h-px flex-1 bg-[#D8E0EC] md:hidden" /> : null}
                          </div>
                          <span className="mt-2 text-center md:absolute md:left-9 md:top-0 md:mt-0 md:text-left" style={{ fontSize: "14.5px", fontWeight: 600, color: "#0B1220" }}>
                            <span className="md:hidden">{mobileLabel}</span>
                            <span className="hidden md:inline">{step}</span>
                          </span>
                          {index < steps.length - 1 ? <span aria-hidden className="ml-[11px] hidden h-[22px] w-px bg-[#D8E0EC] md:block" /> : null}
                        </li>
                      );
                    })}
                  </ol>
                  <p style={{ marginTop: "18px", fontSize: "13px", lineHeight: 1.5, color: "#55616F" }}>
                    Your draft arrives within five working days. It goes live three days after you approve it.
                  </p>
                </aside>
              </div>

              <CardPublicationStrip />

              <div
                className="flex flex-col gap-5 px-5 py-[22px] md:flex-row md:items-center md:justify-between md:px-[34px]"
                style={{ backgroundColor: "#101B2D" }}
              >
                <div className="flex items-baseline gap-3 md:block">
                  <p style={{ fontSize: "40px", fontWeight: 800, letterSpacing: "-0.02em", color: "#FFFFFF", lineHeight: 1 }}>
                    {money(BASE_PRICE)}
                  </p>
                  <p className="md:mt-2" style={{ fontSize: "13.5px", color: "#AFBCD0" }}>
                    One payment. Nothing recurring.
                  </p>
                </div>
                <div className="md:text-right">
                  <BrandButton href={BASE_LINK} className="w-full md:w-auto" style={{ minHeight: "52px", borderRadius: "10px", padding: "0 26px", fontWeight: 700 }}>
                    Order the Winner&rsquo;s Feature — {money(BASE_PRICE)}
                  </BrandButton>
                  <p style={{ marginTop: "9px", fontSize: "12.5px", color: "#AFBCD0" }}>
                    Nothing goes live until you approve every word.
                  </p>
                </div>
              </div>

              <div
                className="flex flex-wrap items-center gap-x-4 px-[18px] py-4 md:flex-nowrap md:px-[34px]"
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
                  className="order-2 ml-auto shrink-0 whitespace-nowrap md:order-3 md:ml-0"
                  style={{ fontSize: "13.5px", fontWeight: 700, color: "#55616F" }}
                >
                  Add for {money(AWARD_PRICE)} at checkout
                </span>
                <p
                  className="order-3 mt-3 w-full md:order-2 md:mt-0 md:w-auto md:flex-1"
                  style={{ margin: undefined, fontSize: "13.5px", lineHeight: 1.5, color: "#55616F" }}
                >
                  <strong style={{ color: "#0B1220", fontWeight: 700 }}>Optional: the engraved award.</strong>{" "}
                  Your name and award year on crystal, plus a printed certificate. Posted to you — the only part we need an address for.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* 3. WHY IT MATTERS */}
        <section style={{ paddingTop: "56px", paddingBottom: "56px" }}>
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-center" style={{ fontSize: "24px", fontWeight: 700, color: INK }}>
              What it actually does for you
            </h2>
            <div
              className="grid grid-cols-1 md:grid-cols-3"
              style={{ marginTop: "28px", gap: "20px" }}
            >
              {whyCards.map((card) => (
                <div
                  key={card.title}
                  style={{
                    backgroundColor: "#fff",
                    border: `1px solid ${LINE}`,
                    borderRadius: "8px",
                    padding: "24px",
                  }}
                >
                  <h3 style={{ fontSize: "16.5px", fontWeight: 600, color: INK }}>{card.title}</h3>
                  <p style={{ marginTop: "10px", fontSize: "14.5px", lineHeight: 1.6, color: BODY }}>
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. QUESTIONS */}
        <section style={{ backgroundColor: TINT, paddingTop: "56px", paddingBottom: "56px" }}>
          <div className="mx-auto px-6" style={{ maxWidth: "680px" }}>
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

        {/* 7. PRICE AND CTA */}
        <section style={{ paddingTop: "56px", paddingBottom: "56px" }}>
          <div className="mx-auto px-6" style={{ maxWidth: "440px" }}>
            <div
              ref={priceCardRef}
              style={{
                backgroundColor: "#fff",
                border: `1px solid ${LINE}`,
                borderTop: `3px solid ${BRAND}`,
                borderRadius: "10px",
                boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
                overflow: "hidden",
              }}
            >
              <div className="text-center" style={{ padding: "36px 28px" }}>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: MUTED,
                  }}
                >
                  The Winner&rsquo;s Feature
                </p>
                <p
                  className="text-[44px] md:text-[48px]"
                  style={{
                    marginTop: "10px",
                    fontWeight: 700,
                    letterSpacing: "-1.2px",
                    color: INK,
                    lineHeight: 1.05,
                  }}
                >
                  {money(BASE_PRICE)}
                </p>
                <p style={{ marginTop: "10px", fontSize: "12.5px", color: MUTED }}>
                  Three publications and your Feature. One payment, nothing recurring.
                </p>

                <div style={{ marginTop: "24px" }}>
                  <BrandButton href={BASE_LINK} className="w-full" style={{ padding: "0 20px" }}>
                    Order the Winner&rsquo;s Feature
                  </BrandButton>
                </div>

                <p style={{ marginTop: "16px", fontSize: "12.5px", fontWeight: 500, color: BODY }}>
                  Nothing goes live until you approve every word.
                </p>
                <p
                  style={{
                    marginTop: "12px",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: MUTED,
                  }}
                >
                  Secure checkout by Stripe
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. CLOSING */}
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
            <div style={{ marginTop: "28px" }}>
              <a
                href={BASE_LINK}
                target="_blank"
                rel="noopener noreferrer"
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
          </div>
        </section>
      </main>

      <SiteFooter statementClassName="text-[13px]" />

      {/* 9. MOBILE STICKY BAR */}
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
          <p style={{ fontSize: "11px", color: MUTED }}>one payment</p>
        </div>
        <a
          href={BASE_LINK}
          target="_blank"
          rel="noopener noreferrer"
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
