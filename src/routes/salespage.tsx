import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

import { AWARD_YEAR } from "@/content/award";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import {
  SPECIMEN_BYLINE,
  SPECIMEN_HEADLINE,
  SPECIMEN_OPENING_PARAGRAPHS,
  SPECIMEN_BUSINESS_TOKEN,
  splitOnBusinessToken,
} from "@/content/specimen";

import portraitAsset from "@/assets/ea-winner-award-portrait.jpg.asset.json";

export const Route = createFileRoute("/salespage")({
  head: () => ({
    meta: [
      { title: `The Winner's Feature — ${AWARD_YEAR} Entrepreneur Awards` },
      {
        name: "description",
        content: `We write the story of your ${AWARD_YEAR} Entrepreneur Award win and publish it in USA Today, the Associated Press, Business Insider and Fortune.`,
      },
      { property: "og:title", content: `The Winner's Feature — ${AWARD_YEAR} Entrepreneur Awards` },
      {
        property: "og:description",
        content: `We write the story of your ${AWARD_YEAR} Entrepreneur Award win and publish it in four national publications.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SalesPage,
});

// ------------------------------------------------------------------ tokens
const INK = "#0F172A";
const BODY = "#52606D";
const MUTED = "#6B7785";
const BRAND = "#1978E5";
const BRAND_DARK = "#1565C4";
const LINE = "#E5E9F0";
const TINT = "#F7F9FC";

const PRICE = 1595;
const PUBLICATIONS = 4;
/** Derived so the per-publication line stays true if either number changes. */
const PER_PUBLICATION = Math.round(PRICE / PUBLICATIONS / 50) * 50;

const STRIPE_PAYMENT_LINK = "https://payments.entrepreneurawards.co/b/28E9ATesZ6jm2MQ8fi8so0k";
/** A real, published winner feature. */
const REAL_WINNER_PATH = "/winners/$slug" as const;
const REAL_WINNER_SLUG = "adam-pisk";

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1978E5]";

const BIZ = "[Your Business]";

// ------------------------------------------------------------------ offer rows
/**
 * Standalone catalogue rates. We do not publish separate rates for these items,
 * so every line is honestly "Included" and the discount rows are omitted —
 * see the rule against manufactured savings. Give a row a numeric `value` and
 * the totals below appear automatically.
 */
type OfferRow = { lead: string; rest?: string; value: number | null };

const OFFER_ROWS: OfferRow[] = [
  { lead: "Press release", rest: " in USA Today", value: null },
  { lead: "Press release", rest: " on the Associated Press", value: null },
  { lead: "Press release", rest: " in Business Insider", value: null },
  { lead: "Press release", rest: " in Fortune", value: null },
  { lead: "Story", rest: " written by our editorial team", value: null },
  { lead: "Your winner page", rest: " on entrepreneurawards.co", value: null },
  { lead: "Engraved award", rest: " and printed certificate", value: null },
];

const PRICED_TOTAL = OFFER_ROWS.reduce((sum, r) => sum + (r.value ?? 0), 0);
const SHOW_SAVING = PRICED_TOTAL > PRICE;
const SAVING = PRICED_TOTAL - PRICE;

// ------------------------------------------------------------------ search mock
const SEARCH_RESULTS = [
  {
    domain: "usatoday.com",
    headline: `${BIZ} named a ${AWARD_YEAR} Entrepreneur Awards winner`,
    snippet: `The ${AWARD_YEAR} Entrepreneur Awards have named ${BIZ} among this year's winners, recognising…`,
  },
  {
    domain: "apnews.com",
    headline: `${AWARD_YEAR} Entrepreneur Awards names ${BIZ} a winner`,
    snippet: `${BIZ} has been recognised in the ${AWARD_YEAR} Entrepreneur Awards, an independent award for founders…`,
  },
  {
    domain: "businessinsider.com",
    headline: `How ${BIZ} won a ${AWARD_YEAR} Entrepreneur Award`,
    snippet: `Judged against a published rubric, ${BIZ} was selected from this year's entries for…`,
  },
  {
    domain: "fortune.com",
    headline: `${BIZ} recognised in the ${AWARD_YEAR} Entrepreneur Awards`,
    snippet: "The award recognises founders whose businesses have demonstrated…",
  },
  {
    domain: "entrepreneurawards.co",
    headline: `${AWARD_YEAR} Winner Feature — ${BIZ}`,
    snippet: "The full winner's feature, including the judges' rubric and the founder's own account of…",
  },
];

// ------------------------------------------------------------------ pieces
function OrderButton({
  id,
  className = "",
  variant = "brand",
}: {
  id?: string;
  className?: string;
  variant?: "brand" | "light";
}) {
  const light = variant === "light";
  return (
    <a
      id={id}
      href={STRIPE_PAYMENT_LINK}
      className={`inline-flex items-center justify-center transition-colors ${focusRing} ${className}`}
      style={{
        minHeight: "52px",
        padding: "0 36px",
        borderRadius: "8px",
        backgroundColor: light ? "#FFFFFF" : BRAND,
        color: light ? INK : "#FFFFFF",
        fontSize: "15.5px",
        fontWeight: 600,
      }}
      onMouseEnter={(e) => {
        if (!light) e.currentTarget.style.backgroundColor = BRAND_DARK;
      }}
      onMouseLeave={(e) => {
        if (!light) e.currentTarget.style.backgroundColor = BRAND;
      }}
    >
      Order the Winner&rsquo;s Feature
    </a>
  );
}

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
  return splitOnBusinessToken(text).map((part, i, all) => (
    <span key={i}>
      {part}
      {i < all.length - 1 ? <SpecimenSlot /> : null}
    </span>
  ));
}

/** Browser-frame mockup of the published winner page — carried over unchanged. */
function BrowserMockup() {
  return (
    <div className="flex h-full flex-col overflow-hidden" style={{ backgroundColor: "#fff" }}>
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ borderBottom: `1px solid ${LINE}`, backgroundColor: TINT }}
      >
        <span className="flex gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className="block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#E2E6ED" }} />
          ))}
        </span>
        <span
          className="ml-1 flex-1 truncate rounded-md px-2.5 py-1"
          style={{ backgroundColor: "#fff", border: `1px solid ${LINE}`, fontSize: "11px", color: MUTED }}
        >
          entrepreneurawards.co/winners/your-business
        </span>
      </div>

      <div className="relative flex-1 px-5 pb-6 pt-5" style={{ minHeight: 0, overflow: "hidden" }}>
        <p
          style={{
            fontSize: "10px",
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
          style={{ height: "110px", background: "linear-gradient(to bottom, rgba(255,255,255,0), #fff 85%)" }}
        />
      </div>
    </div>
  );
}

function SearchMockup() {
  return (
    <div
      role="img"
      aria-label="Illustrative search results page showing articles about your business on usatoday.com, apnews.com, businessinsider.com, fortune.com and entrepreneurawards.co"
      className="overflow-hidden"
      style={{
        backgroundColor: "#FFFFFF",
        border: `1px solid ${LINE}`,
        borderRadius: "10px",
        boxShadow: "0 1px 3px rgba(15,23,42,0.06)",
      }}
    >
      <div style={{ backgroundColor: TINT, borderBottom: `1px solid ${LINE}`, padding: "12px" }}>
        <div
          className="flex items-center gap-2"
          style={{
            backgroundColor: "#FFFFFF",
            border: `1px solid ${LINE}`,
            borderRadius: "18px",
            padding: "8px 14px",
          }}
        >
          <Search aria-hidden size={14} style={{ color: MUTED, flexShrink: 0 }} />
          <span style={{ fontSize: "12.5px", color: INK }}>{BIZ}</span>
        </div>
      </div>

      <div>
        {SEARCH_RESULTS.map((r, i) => (
          <div
            key={r.domain}
            style={{
              padding: "16px",
              borderBottom: i < SEARCH_RESULTS.length - 1 ? `1px solid ${LINE}` : undefined,
            }}
          >
            <p style={{ fontSize: "11px", color: MUTED }}>{r.domain}</p>
            <p style={{ marginTop: "3px", fontSize: "14px", fontWeight: 500, lineHeight: 1.3, color: BRAND }}>
              {r.headline}
            </p>
            <p
              className="truncate"
              style={{ marginTop: "4px", fontSize: "12px", lineHeight: 1.45, color: BODY }}
            >
              {r.snippet}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const VALUE_CARDS = [
  {
    title: "Something to point to",
    body: "When someone looks you up before a call, an article in USA Today answers the question they were about to ask. Put the links on your site, in your email signature, in your deck.",
  },
  {
    title: "You don\u2019t write a word",
    body: "Our editorial team writes the piece. Your draft arrives within five working days, and nothing is published until you approve it.",
  },
  {
    title: "It runs on a date, not a maybe",
    body: "These are paid placements. We write the piece and the publication runs it, which is why we can give you a date instead of pitching editors and hoping.",
  },
];

const STEPS = ["We write it", "You approve it", "It goes live"];

const QUESTIONS = [
  {
    q: "Is this a paid placement?",
    a: "Yes. We pay the publication to run the piece, which is why we can tell you it will be published and when. We would rather say that here than have you find out afterwards.",
  },
  {
    q: "Who writes the article?",
    a: "Our editorial team. Beyond a short form about your business, you don\u2019t have to write or brief anything.",
  },
  {
    q: "What if I don\u2019t like the draft?",
    a: "Tell us what to change and we\u2019ll change it. Nothing is published until you approve it.",
  },
  {
    q: "What can I do with the articles afterwards?",
    a: "Each one has a permanent link. Send them to clients, add them to your site, include them in your deck or your pitch.",
  },
  {
    q: "Is there anything recurring?",
    a: `No. One payment of ${money(PRICE)}, and that\u2019s the whole cost.`,
  },
  {
    q: "Do I have to order this to keep my award?",
    a: "No. Your engraved award, printed certificate and the free winner files are yours either way. This is for winners who want the story published as well.",
  },
];

// ------------------------------------------------------------------ page
function SalesPage() {
  const heroButtonRef = useRef<HTMLDivElement | null>(null);
  const priceSectionRef = useRef<HTMLElement | null>(null);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const state = { heroOut: false, priceVisible: false };
    const sync = () => setShowBar(state.heroOut && !state.priceVisible);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        state.heroOut = !entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    const priceObserver = new IntersectionObserver(
      ([entry]) => {
        state.priceVisible = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );

    if (heroButtonRef.current) heroObserver.observe(heroButtonRef.current);
    if (priceSectionRef.current) priceObserver.observe(priceSectionRef.current);
    return () => {
      heroObserver.disconnect();
      priceObserver.disconnect();
    };
  }, []);

  return (
    <div style={{ backgroundColor: "#FFFFFF", color: BODY }}>
      <SiteNav />

      <main>
        {/* 1. HERO */}
        <section style={{ backgroundColor: "#FFFFFF", paddingTop: "64px", paddingBottom: "56px" }}>
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-left">
              <p
                style={{
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: MUTED,
                }}
              >
                {AWARD_YEAR} Entrepreneur Awards &middot; The Winner&rsquo;s Feature
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
                We write the story of your award win and publish it in USA Today, the Associated
                Press, Business Insider and Fortune.
              </p>

              <div
                className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 lg:justify-start"
                style={{ marginTop: "28px" }}
              >
                <span style={{ fontSize: "34px", fontWeight: 700, color: INK, letterSpacing: "-0.02em" }}>
                  {money(PRICE)}
                </span>
                <span style={{ fontSize: "13px", color: MUTED }}>one payment &middot; nothing recurring</span>
              </div>

              <div ref={heroButtonRef} style={{ marginTop: "20px" }}>
                <OrderButton className="w-full sm:w-auto" />
              </div>

              <p style={{ marginTop: "12px", fontSize: "12.5px", color: MUTED }}>
                You approve every word before anything is published.
              </p>
            </div>

            <div>
              <p
                style={{
                  marginBottom: "10px",
                  fontSize: "10.5px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.13em",
                  color: MUTED,
                }}
              >
                What people find when they look you up
              </p>
              <SearchMockup />
              <p style={{ marginTop: "12px", fontSize: "11.5px", color: MUTED }}>
                Illustrative. Your headlines are written for your business and approved by you.
              </p>
            </div>
          </div>
        </section>

        {/* 2. OFFER BOX */}
        <section style={{ backgroundColor: TINT, paddingTop: "64px", paddingBottom: "64px" }}>
          <div className="mx-auto max-w-6xl px-6">
            <h2
              className="text-center"
              style={{ fontSize: "24px", fontWeight: 700, color: INK, letterSpacing: "-0.01em" }}
            >
              <span className="md:hidden">Everything in the Winner&rsquo;s Feature</span>
              <span className="hidden md:inline" style={{ fontSize: "28px" }}>
                Everything in the Winner&rsquo;s Feature
              </span>
            </h2>

            <div
              className="mx-auto overflow-hidden"
              style={{
                marginTop: "28px",
                maxWidth: "620px",
                backgroundColor: "#FFFFFF",
                border: `1px solid ${LINE}`,
                borderRadius: "10px",
                boxShadow: "0 1px 3px rgba(15,23,42,0.06)",
              }}
            >
              <ul style={{ padding: "0 20px" }}>
                {OFFER_ROWS.map((row, i) => (
                  <li
                    key={row.lead + row.rest}
                    className="flex items-baseline justify-between gap-4"
                    style={{
                      paddingTop: "14px",
                      paddingBottom: "14px",
                      borderTop: i === 0 ? undefined : `1px solid ${LINE}`,
                    }}
                  >
                    <span style={{ fontSize: "14.5px", color: BODY }}>
                      <span style={{ fontWeight: 600, color: INK }}>{row.lead}</span>
                      {row.rest}
                    </span>
                    <span
                      style={{
                        fontSize: "14.5px",
                        color: INK,
                        fontVariantNumeric: "tabular-nums",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.value === null ? "Included" : money(row.value)}
                    </span>
                  </li>
                ))}
              </ul>

              {SHOW_SAVING ? (
                <div
                  className="flex items-baseline justify-between gap-4"
                  style={{ padding: "16px 20px", backgroundColor: TINT, borderTop: `1px solid ${LINE}` }}
                >
                  <span
                    style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.1em", color: MUTED }}
                  >
                    Bought separately
                  </span>
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: MUTED,
                      textDecoration: "line-through",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {money(PRICED_TOTAL)}
                  </span>
                </div>
              ) : null}

              <div
                className="flex items-baseline justify-between gap-4"
                style={{ padding: "20px", backgroundColor: "#FFFFFF", borderTop: `1px solid ${LINE}` }}
              >
                <span
                  style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.1em", color: MUTED }}
                >
                  Your price today
                </span>
                <span
                  style={{
                    fontSize: "34px",
                    fontWeight: 700,
                    color: INK,
                    letterSpacing: "-0.02em",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {money(PRICE)}
                </span>
              </div>

              {SHOW_SAVING ? (
                <p
                  className="text-center"
                  style={{
                    backgroundColor: BRAND,
                    color: "#FFFFFF",
                    fontSize: "14px",
                    fontWeight: 600,
                    padding: "12px",
                  }}
                >
                  You save {money(SAVING)}
                </p>
              ) : null}
            </div>

            <div className="text-center" style={{ marginTop: "20px" }}>
              <OrderButton className="w-full sm:w-auto" />
            </div>
          </div>
        </section>

        {/* 3. WHY IT MATTERS */}
        <section style={{ backgroundColor: "#FFFFFF", paddingTop: "56px", paddingBottom: "56px" }}>
          <div className="mx-auto max-w-6xl px-6">
            <h2
              className="text-center"
              style={{ fontSize: "26px", fontWeight: 700, color: INK, letterSpacing: "-0.01em" }}
            >
              What it actually does for you
            </h2>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3" style={{ gap: "20px" }}>
              {VALUE_CARDS.map((card) => (
                <div
                  key={card.title}
                  style={{
                    backgroundColor: "#FFFFFF",
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

        {/* 4. WHAT ARRIVES */}
        <section style={{ backgroundColor: TINT, paddingTop: "56px", paddingBottom: "56px" }}>
          <div className="mx-auto max-w-6xl px-6">
            <h2
              className="text-center"
              style={{ fontSize: "26px", fontWeight: 700, color: INK, letterSpacing: "-0.01em" }}
            >
              What arrives
            </h2>

            <div
              className="mx-auto mt-8 grid max-w-4xl grid-cols-1 sm:grid-cols-2"
              style={{ gap: "20px" }}
            >
              <div>
                <p
                  className="text-center"
                  style={{
                    marginBottom: "12px",
                    fontSize: "10px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.13em",
                    color: MUTED,
                  }}
                >
                  Your winner page
                </p>
                <div
                  className="aspect-[4/3] w-full overflow-hidden"
                  style={{ border: `1px solid ${LINE}`, borderRadius: "6px" }}
                >
                  <BrowserMockup />
                </div>
              </div>
              <div>
                <p
                  className="text-center"
                  style={{
                    marginBottom: "12px",
                    fontSize: "10px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.13em",
                    color: MUTED,
                  }}
                >
                  The engraved award
                </p>
                <img
                  src={portraitAsset.url}
                  alt="Founder holding an engraved Entrepreneur Award trophy"
                  width={1264}
                  height={848}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full"
                  style={{
                    objectFit: "cover",
                    objectPosition: "50% 35%",
                    border: `1px solid ${LINE}`,
                    borderRadius: "6px",
                  }}
                />
              </div>
            </div>

            <div className="text-center" style={{ marginTop: "24px" }}>
              <Link
                to={REAL_WINNER_PATH}
                params={{ slug: REAL_WINNER_SLUG }}
                className={`inline-block rounded-sm ${focusRing}`}
                style={{
                  fontSize: "13.5px",
                  fontWeight: 600,
                  color: BRAND,
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                See a real winner&rsquo;s feature &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* 5. HOW IT WORKS */}
        <section style={{ backgroundColor: "#FFFFFF", paddingTop: "48px", paddingBottom: "48px" }}>
          <div className="mx-auto max-w-6xl px-6">
            <h2
              className="text-center"
              style={{ fontSize: "26px", fontWeight: 700, color: INK, letterSpacing: "-0.01em" }}
            >
              How it works
            </h2>

            <ol className="mt-8 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-6">
              {STEPS.map((step, i) => (
                <li key={step} className="flex items-center gap-4">
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="flex items-center justify-center"
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "9999px",
                        backgroundColor: BRAND,
                        color: "#FFFFFF",
                        fontSize: "11px",
                        fontWeight: 700,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ fontSize: "14.5px", fontWeight: 600, color: INK }}>{step}</span>
                  </span>
                  {i < STEPS.length - 1 ? (
                    <span aria-hidden className="hidden sm:block" style={{ color: LINE, fontSize: "18px" }}>
                      &rarr;
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>

            <p
              className="mx-auto text-center"
              style={{ marginTop: "24px", maxWidth: "54ch", fontSize: "13.5px", color: MUTED }}
            >
              Your draft arrives within five working days. It goes live three days after you approve it.
            </p>
          </div>
        </section>

        {/* 6. QUESTIONS */}
        <section style={{ backgroundColor: TINT, paddingTop: "56px", paddingBottom: "56px" }}>
          <div className="mx-auto max-w-6xl px-6">
            <h2
              className="text-center"
              style={{ fontSize: "26px", fontWeight: 700, color: INK, letterSpacing: "-0.01em" }}
            >
              Questions
            </h2>

            <div className="mx-auto" style={{ marginTop: "24px", maxWidth: "680px" }}>
              {QUESTIONS.map((item, i) => (
                <div
                  key={item.q}
                  style={{
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    borderTop: i === 0 ? undefined : `1px solid ${LINE}`,
                  }}
                >
                  <h3 style={{ fontSize: "15.5px", fontWeight: 600, color: INK }}>{item.q}</h3>
                  <p style={{ marginTop: "8px", fontSize: "14.5px", lineHeight: 1.65, color: BODY }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. PRICE AND CTA */}
        <section
          ref={priceSectionRef}
          style={{ backgroundColor: "#FFFFFF", paddingTop: "56px", paddingBottom: "56px" }}
        >
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="sr-only">Order the Winner&rsquo;s Feature</h2>
            <div
              className="mx-auto overflow-hidden text-center"
              style={{
                maxWidth: "440px",
                backgroundColor: "#FFFFFF",
                border: `1px solid ${LINE}`,
                borderRadius: "10px",
                boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
                borderTop: `3px solid ${BRAND}`,
              }}
            >
              <div style={{ padding: "36px 28px" }}>
                <p
                  style={{
                    fontSize: "10.5px",
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
                  style={{ marginTop: "10px", fontWeight: 700, letterSpacing: "-1.2px", color: INK, lineHeight: 1 }}
                >
                  {money(PRICE)}
                </p>
                <p style={{ marginTop: "10px", fontSize: "12.5px", color: MUTED }}>
                  About {money(PER_PUBLICATION)} a publication. One payment, nothing recurring.
                </p>

                <div style={{ marginTop: "24px" }}>
                  <OrderButton className="w-full" />
                </div>

                <p style={{ marginTop: "16px", fontSize: "12.5px", fontWeight: 500, color: BODY }}>
                  Nothing goes live until you approve every word.
                </p>
                <p
                  style={{
                    marginTop: "12px",
                    fontSize: "10.5px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: MUTED,
                  }}
                >
                  Secure checkout by Stripe
                </p>
              </div>

              <p
                style={{
                  backgroundColor: TINT,
                  borderTop: `1px solid ${LINE}`,
                  padding: "14px 20px",
                  fontSize: "12.5px",
                  color: MUTED,
                }}
              >
                Your award, certificate and the free winner files are yours either way.
              </p>
            </div>
          </div>
        </section>

        {/* 8. CLOSING */}
        <section
          className="text-center"
          style={{ backgroundColor: INK, paddingTop: "56px", paddingBottom: "56px" }}
        >
          <div className="mx-auto max-w-6xl px-6">
            <h2
              className="mx-auto text-[24px] md:text-[30px]"
              style={{ fontWeight: 700, color: "#FFFFFF", maxWidth: "24ch", lineHeight: 1.15 }}
            >
              You&rsquo;ve already won. This is the part people see.
            </h2>
            <div style={{ marginTop: "28px" }}>
              <OrderButton variant="light" className="w-full sm:w-auto" />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      {/* 9. MOBILE STICKY BAR */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-4 md:hidden"
        style={{
          backgroundColor: "#FFFFFF",
          borderTop: `1px solid ${LINE}`,
          boxShadow: "0 -2px 10px rgba(15,23,42,0.06)",
          padding: "12px",
          paddingBottom: "calc(12px + env(safe-area-inset-bottom))",
          transform: showBar ? "translateY(0)" : "translateY(120%)",
          transition: "transform 200ms ease",
          pointerEvents: showBar ? "auto" : "none",
        }}
        aria-hidden={!showBar}
      >
        <div>
          <p style={{ fontSize: "16px", fontWeight: 700, color: INK }}>{money(PRICE)}</p>
          <p style={{ fontSize: "11px", color: MUTED }}>one payment</p>
        </div>
        <a
          href={STRIPE_PAYMENT_LINK}
          tabIndex={showBar ? 0 : -1}
          className={`inline-flex items-center justify-center px-6 ${focusRing}`}
          style={{
            height: "44px",
            borderRadius: "8px",
            backgroundColor: BRAND,
            color: "#FFFFFF",
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
