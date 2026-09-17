import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Check, Search } from "lucide-react";

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
import portraitAsset from "@/assets/ea-winner-award-portrait.jpg.asset.json";

function SalesPageNav() {
  return (
    <SiteNav
      hideCTA
      mobileMenu
      compactCta={{
        href: BASE_LINK,
        label: `Order — ${money(BASE_PRICE)}`,
        className: "bg-[#1668C7] text-white hover:bg-[#1056A7] focus-visible:ring-[#1668C7]",
      }}
    />
  );
}

export const Route = createFileRoute("/pricingv2")({
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
  }),
  component: SalesPage,
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

/* Stripe Payment Links. Base collects email only; the award package collects an address. */
const BASE_LINK = "https://payments.entrepreneurawards.co/b/00wbJ1acJ6jm3QUfHK8so0j";
const AWARD_LINK = "https://payments.entrepreneurawards.co/b/14A28racJfTW1IM7be8so0l";

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
      className={`inline-block ${focusRing} ${className}`}
      style={{ color: BRAND, fontSize: "14px", fontWeight: 500 }}
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

const PUBLICATION_LOGOS: Record<string, { src: string; height: number; width: number; style?: React.CSSProperties }> = {
  "USA Today": { src: "/usa-today-logo.svg", height: 18, width: 112 },
  "The Associated Press": { src: "/associated-press-wordmark.svg", height: 24, width: 116 },
  "Business Insider": { src: "/business-insider-logo.png", height: 30, width: 76 },
};

function PublicationLogo({ name }: { name: string }) {
  const logo = PUBLICATION_LOGOS[name];
  if (!logo) return null;
  return (
    <span className="flex h-8 items-center justify-center" style={{ width: `${logo.width}px` }}>
      <img
        src={logo.src}
        alt={name}
        width={logo.width}
        height={logo.height}
        loading="lazy"
        decoding="async"
        style={{
          display: "block",
          maxHeight: `${logo.height}px`,
          width: "100%",
          objectFit: "contain",
          ...logo.style,
        }}
      />
    </span>
  );
}

function PublicationNames({ size = "hero", showLogos = false }: { size?: "hero" | "card"; showLogos?: boolean }) {
  const names = ["USA Today", "The Associated Press", "Business Insider"];
  const textStyle = size === "hero" ? { fontSize: "16px", lineHeight: 1.25 } : { fontSize: "15px", lineHeight: 1.25 };

  const Label = ({ name, index }: { name: string; index: number }) => (
    <span className={`flex min-h-11 items-center justify-center px-5 min-[900px]:min-h-8 ${index > 0 ? "min-[900px]:border-l" : ""}`} style={{ borderColor: LINE }}>
      {showLogos ? <PublicationLogo name={name} /> : (
        <span
          style={{
            ...textStyle,
            fontWeight: 600,
            color: INK,
            letterSpacing: "-0.01em",
          }}
        >
          {name}
        </span>
      )}
    </span>
  );

  return (
    <span className="grid grid-cols-1 place-items-center min-[900px]:grid-cols-3">
      {names.map((name, index) => <Label key={name} name={name} index={index} />)}
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
      <div style={{ marginTop: "10px" }}>
        <PublicationNames size="hero" showLogos />
      </div>
    </div>
  );
}

function CardPublicationStrip() {
  return (
    <div
      className="text-center"
      style={{
        backgroundColor: TINT,
        borderTop: `1px solid ${LINE}`,
        padding: "14px 0",
      }}
    >
      <p
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
      <div style={{ marginTop: "8px" }}>
        <PublicationNames size="card" showLogos />
      </div>
    </div>
  );
}

const SEARCH_LOGO_ONLY = new Set(["USA Today"]);
const SEARCH_LOGOS: Record<string, { src: string; height: number; width: number }> = {
  "USA Today": { src: "/usa-today-logo.svg", height: 14, width: 96 },
  "The Associated Press": { src: "/associated-press-logo.png", height: 24, width: 24 },
  "Business Insider": { src: "/business-insider-logo.png", height: 26, width: 52 },
};

function SearchResult({ result }: { result: Result }) {
  const logo = SEARCH_LOGOS[result.name];
  const showName = !SEARCH_LOGO_ONLY.has(result.name);
  return (
    <div>
      <div className="flex items-center gap-2">
        {logo ? (
          <img
            src={logo.src}
            alt=""
            width={logo.width}
            height={logo.height}
            loading="lazy"
            decoding="async"
            style={{
              display: "block",
              height: `${logo.height}px`,
              width: `${logo.width}px`,
              objectFit: "contain",
              flexShrink: 0,
            }}
          />
        ) : null}
        <p style={{ fontSize: "12px", fontWeight: 600, color: INK }}>
          {showName ? result.name : null}
          <span style={{ fontSize: "11px", fontWeight: 400, color: MUTED }}>
            {showName ? " · " : ""}{result.domain}
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
    q: "Is this a paid placement?",
    a: "Yes. We pay the publication to run the release, which is why we can tell you it will be published and when. We would rather say that here than have you find out afterwards.",
  },
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
function SalesPage() {
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const priceCardRef = useRef<HTMLDivElement>(null);
  const stickyVisible = useStickyBar(heroCtaRef, priceCardRef);

  return (
    <div className="min-h-screen pb-20 md:pb-0" style={{ backgroundColor: "#fff", color: BODY }}>
      <SalesPageNav />

      <main>
        {/* 1. HERO */}
        <section style={{ paddingTop: "64px", paddingBottom: "56px" }}>
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 px-6 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-left">
              <p className="flex items-center justify-center gap-3 lg:justify-start" style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.16em", color: MUTED }}>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full" style={{ border: `1px solid ${BRAND}`, color: BRAND, backgroundColor: TINT, fontWeight: 700, letterSpacing: "0.04em" }}>
                  {AWARD_YEAR}
                </span>
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

            <div>
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
                maxWidth: "620px",
                backgroundColor: INK,
                border: `1px solid ${LINE}`,
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 1px 3px rgba(15,23,42,0.06)",
              }}
            >
              <div
                className="flex items-center justify-between"
                  style={{ backgroundColor: INK, borderBottom: `1px solid ${BODY}`, padding: "14px" }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: LINE,
                  }}
                >
                  The Winner&rsquo;s Feature
                </span>
                <span
                  className="hidden sm:inline"
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: LINE,
                  }}
                >
                  Digital delivery
                </span>
              </div>

              {includedRows.map((row, i) => (
                <div
                  key={row.lead}
                  className="flex items-start gap-3"
                  style={{
                    padding: "14px 24px",
                    borderTop: i === 0 ? undefined : `1px solid ${BODY}`,
                  }}
                >
                  <Check aria-hidden size={15} color={BRAND} style={{ marginTop: "3px", flexShrink: 0 }} />
                  <p style={{ fontSize: "14.5px", lineHeight: 1.55, color: LINE }}>
                    <span style={{ fontWeight: 600, color: "#fff" }}>{row.lead}</span>
                    {row.rest}
                  </p>
                </div>
              ))}

              <CardPublicationStrip />

              <div
                className="text-center"
                style={{ backgroundColor: INK, borderTop: `1px solid ${BODY}`, padding: "20px 24px 24px" }}
              >
                <ol className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {steps.map((step, i) => (
                    <li key={step} className="flex items-center justify-center gap-2">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full" style={{ backgroundColor: BRAND, color: "#fff", fontSize: "12px", fontWeight: 700 }}>{i + 1}</span>
                      <span style={{ fontSize: "13.5px", fontWeight: 600, color: "#fff" }}>{step}</span>
                    </li>
                  ))}
                </ol>
                <p style={{ marginTop: "14px", fontSize: "13px", lineHeight: 1.55, color: LINE }}>
                  Your draft arrives within five working days. It goes live three days after you approve it.
                </p>
                <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: `1px solid ${BODY}` }}>
                  <p style={{ fontSize: "36px", fontWeight: 700, color: "#fff" }}>{money(BASE_PRICE)}</p>
                </div>
                <p style={{ marginTop: "6px", fontSize: "12.5px", color: LINE }}>
                  One payment. Nothing recurring.
                </p>
              </div>
            </div>

            <div className="text-center" style={{ marginTop: "20px" }}>
              <BrandButton href={BASE_LINK} className="w-full sm:w-auto">
                Order the Winner&rsquo;s Feature — {money(BASE_PRICE)}
              </BrandButton>
            </div>


            {/* Award package */}
            <div
              className="mx-auto"
              style={{
                marginTop: "32px",
                maxWidth: "620px",
                backgroundColor: "#fff",
                border: `1px solid ${LINE}`,
                borderRadius: "8px",
                padding: "20px",
              }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 style={{ fontSize: "15.5px", fontWeight: 600, color: INK }}>
                  The Award Package
                </h3>
                <span style={{ fontSize: "15.5px", fontWeight: 700, color: BRAND }}>
                  +{money(AWARD_PRICE)}
                </span>
              </div>
              <img
                src={portraitAsset.url}
                alt="A founder holding the engraved Entrepreneur Award"
                width={1264}
                height={848}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full"
                style={{
                  objectFit: "cover",
                  objectPosition: "50% 35%",
                  border: `1px solid ${LINE}`,
                  borderRadius: "6px",
                  marginTop: "14px",
                  marginBottom: "14px",
                }}
              />
              <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: BODY }}>
                The engraved award with your name and award year, plus a printed certificate ready
                to frame. Posted to you — this is the only part we need an address for.
              </p>
              <a
                href={AWARD_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex w-full items-center justify-center transition-colors hover:bg-[#F7F9FC] ${focusRing}`}
                style={{
                  marginTop: "16px",
                  minHeight: "46px",
                  borderRadius: "8px",
                  border: `1px solid ${BRAND}`,
                  backgroundColor: "#FFFFFF",
                  color: BRAND,
                  fontSize: "14.5px",
                  fontWeight: 600,
                }}
              >
                Add the engraved award — {money(AWARD_PRICE)}
              </a>
            </div>

            <p
              className="text-center"
              style={{ marginTop: "16px", fontSize: "12.5px", color: MUTED }}
            >
              Offered at checkout as an optional extra. Ships worldwide.
            </p>
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
              <Accordion type="multiple" defaultValue={["q-0"]} className="w-full">
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

              <div
                className="text-center"
                style={{
                  backgroundColor: TINT,
                  borderTop: `1px solid ${LINE}`,
                  padding: "14px 20px",
                  fontSize: "12.5px",
                  color: MUTED,
                }}
              >
                Want the engraved award as well?{" "}
                <a
                  href={AWARD_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={focusRing}
                  style={{ color: BRAND, fontWeight: 500 }}
                >
                  Add it for {money(AWARD_PRICE)}
                </a>
                .
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
