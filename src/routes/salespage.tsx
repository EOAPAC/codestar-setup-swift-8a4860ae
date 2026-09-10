import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

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
        content:
          "We write one story about your business and place it in USA Today, the Associated Press, Business Insider and Fortune, then send you the links.",
      },
      { property: "og:title", content: `The Winner's Feature — ${AWARD_YEAR} Entrepreneur Awards` },
      {
        property: "og:description",
        content:
          "We write one story about your business and place it in USA Today, the Associated Press, Business Insider and Fortune, then send you the links.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SalesPage,
});

// ------------------------------------------------------------- tokens
const INK = "#0F172A";
const BODY = "#52606D";
const MUTED = "#6B7785";
const BRAND = "#1978E5";
const BRAND_DARK = "#1565C4";
const LINE = "#E5E9F0";
const TINT = "#F7F9FC";

const FEATURE_PRICE = 1595;
const FEATURE_PUBLICATIONS = 4;
/** Derived so the "about $X a publication" line stays true if either changes. */
const PER_PUBLICATION = Math.round(FEATURE_PRICE / FEATURE_PUBLICATIONS / 50) * 50;
const formatPrice = (n: number) => `$${n.toLocaleString()}`;

const STRIPE_PAYMENT_LINK = "https://payments.entrepreneurawards.co/b/28E9ATesZ6jm2MQ8fi8so0k";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1978E5]";

const articleCards = [
  {
    domain: "usatoday.com",
    name: "USA Today",
    headline: "[Your Business] named a 2026 Entrepreneur Awards winner",
    category: "National daily",
    lastBar: "58%",
  },
  {
    domain: "apnews.com",
    name: "Associated Press",
    headline: "2026 Entrepreneur Awards names [Your Business] a winner",
    category: "Global newswire",
    lastBar: "71%",
  },
  {
    domain: "businessinsider.com",
    name: "Business Insider",
    headline: "How [Your Business] won a 2026 Entrepreneur Award",
    category: "Business & tech",
    lastBar: "46%",
  },
  {
    domain: "fortune.com",
    name: "Fortune",
    headline: "[Your Business] recognised in the 2026 Entrepreneur Awards",
    category: "Business",
    lastBar: "66%",
  },
];

const whyCards = [
  {
    title: "Something to point to",
    body: "When someone looks you up before a call, an article in USA Today answers the question they were about to ask. Put the links on your site, in your email signature, in your deck.",
  },
  {
    title: "You don't write a word",
    body: "Our editorial team writes the piece. Your draft arrives within five working days, and nothing is published until you approve it.",
  },
  {
    title: "It runs on a date, not a maybe",
    body: "These are paid placements. We write the piece and the publication runs it, which is why we can give you a date instead of pitching editors and hoping.",
  },
];

const checklist = [
  {
    lead: "Your story in four publications",
    rest: " — USA Today, the Associated Press, Business Insider and Fortune",
  },
  {
    lead: "A permanent link to every article",
    rest: ", to send to a client or add to your own site",
  },
  { lead: "A full article on your winner page", rest: " at entrepreneurawards.co" },
  {
    lead: "The engraved award and a printed certificate",
    rest: ", posted to you with your name and award year",
  },
  { lead: "Your approval on every word", rest: " before anything is published" },
];

const steps = ["We write it", "You approve it", "It goes live"];

const questions = [
  {
    q: "Is this a paid placement?",
    a: "Yes. We pay the publication to run the piece, which is why we can tell you it will be published and when. We would rather say that here than have you find out afterwards.",
  },
  {
    q: "Who writes the article?",
    a: "Our editorial team. Beyond a short form about your business, you don't have to write or brief anything.",
  },
  {
    q: "What if I don't like the draft?",
    a: "Tell us what to change and we'll change it. Nothing is published until you approve it.",
  },
  {
    q: "What can I do with the articles afterwards?",
    a: "Each one has a permanent link. Send them to clients, add them to your site, include them in your deck or your pitch.",
  },
  {
    q: "Is there anything recurring?",
    a: `No. One payment of ${formatPrice(FEATURE_PRICE)}, and that's the whole cost.`,
  },
  {
    q: "Do I have to order this to keep my award?",
    a: "No. Your engraved award, printed certificate and the free winner files are yours either way. This is for winners who want the story published as well.",
  },
];

// ------------------------------------------------------------- pieces

function Tick() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      style={{ marginTop: "5px", flexShrink: 0 }}
    >
      <path
        d="M2.5 8.5 6 12l7.5-8"
        stroke={BRAND}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OrderButton({
  label = "Order the Winner's Feature",
  variant = "brand",
  full = false,
  minHeight = "52px",
  event,
}: {
  label?: string;
  variant?: "brand" | "light";
  full?: boolean;
  minHeight?: string;
  event?: string;
}) {
  const light = variant === "light";
  return (
    <a
      href={STRIPE_PAYMENT_LINK}
      data-event={event}
      className={`inline-flex items-center justify-center ${full ? "w-full" : "w-full sm:w-auto"} ${focusRing}`}
      style={{
        minHeight,
        padding: "0 36px",
        borderRadius: "8px",
        backgroundColor: light ? "#fff" : BRAND,
        color: light ? INK : "#fff",
        fontSize: "15.5px",
        fontWeight: 600,
        transition: "background-color 150ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = light ? "#EDF2F9" : BRAND_DARK;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = light ? "#fff" : BRAND;
      }}
    >
      {label}
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
  const parts = splitOnBusinessToken(text);
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 ? <SpecimenSlot /> : null}
    </span>
  ));
}

/** Browser-frame mockup of the published winner page. */
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
          <p
            key={i}
            style={{ marginTop: "12px", fontSize: "12.5px", lineHeight: 1.7, color: BODY }}
          >
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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-center text-[22px] md:text-[26px]"
      style={{ fontWeight: 700, letterSpacing: "-0.01em", color: INK }}
    >
      {children}
    </h2>
  );
}

// ------------------------------------------------------------- page

function SalesPage() {
  const heroCtaRef = useRef<HTMLDivElement | null>(null);
  const priceRef = useRef<HTMLDivElement | null>(null);
  const [stickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const hero = heroCtaRef.current?.getBoundingClientRect();
      const price = priceRef.current?.getBoundingClientRect();
      const heroGone = hero ? hero.bottom < 0 : false;
      const priceOnScreen = price ? price.top < window.innerHeight && price.bottom > 0 : false;
      setStickyVisible(heroGone && !priceOnScreen);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ color: BODY }}>
      <SiteNav />

      <main>
        {/* 1 — Hero */}
        <section className="bg-white px-6 py-12 md:py-[72px] md:pb-16">
          <div className="mx-auto max-w-3xl text-center">
            <p
              style={{
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: MUTED,
              }}
            >
              The Winner&rsquo;s Feature · {AWARD_YEAR} Entrepreneur Awards
            </p>
            <h1
              className="mx-auto"
              style={{
                marginTop: "16px",
                maxWidth: "22ch",
                fontSize: "clamp(30px, 4.6vw, 46px)",
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: INK,
              }}
            >
              Get published in four national publications.
            </h1>
            <p
              className="mx-auto text-[16px] md:text-[17.5px]"
              style={{ marginTop: "18px", maxWidth: "56ch", lineHeight: 1.6, color: BODY }}
            >
              You won the award. This is how the rest of the world hears about it. We write one
              story about your business and place it in USA Today, the Associated Press, Business
              Insider and Fortune, then send you the links.
            </p>

            <div ref={heroCtaRef} style={{ marginTop: "28px" }}>
              <OrderButton
                label={`Order the Winner's Feature — ${formatPrice(FEATURE_PRICE)}`}
                event="salespage-hero-order"
              />
              <p style={{ marginTop: "12px", fontSize: "12.5px", color: MUTED }}>
                One payment. You approve every word before anything is published.
              </p>
              <p style={{ marginTop: "20px" }}>
                <Link
                  to="/winners/$slug"
                  params={{ slug: "adam-pisk" }}
                  className={`inline-flex items-center ${focusRing}`}
                  style={{ fontSize: "14.5px", fontWeight: 500, color: BRAND }}
                >
                  See a real winner&rsquo;s feature →
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* 2 — Where your story runs */}
        <section className="px-6 py-16" style={{ backgroundColor: TINT }}>
          <div className="mx-auto max-w-4xl">
            <SectionHeading>Where your story runs</SectionHeading>
            <p
              className="mx-auto text-center"
              style={{ marginTop: "12px", maxWidth: "60ch", fontSize: "14.5px", color: BODY }}
            >
              One story, four publications. Written to each publication&rsquo;s format, running
              under your business name, each with a permanent link.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4" style={{ marginTop: "24px", gap: "16px" }}>
              {articleCards.map((card) => (
                <article
                  key={card.name}
                  className="flex flex-col overflow-hidden bg-white text-left"
                  style={{ border: `1px solid ${LINE}`, borderRadius: "8px" }}
                >
                  <div
                    className="flex items-center gap-1.5"
                    style={{
                      padding: "8px 12px",
                      backgroundColor: TINT,
                      borderBottom: `1px solid ${LINE}`,
                    }}
                  >
                    <span className="flex shrink-0 gap-1" aria-hidden>
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="block rounded-full"
                          style={{ width: "4px", height: "4px", backgroundColor: "#D3D8E0" }}
                        />
                      ))}
                    </span>
                    <span className="ml-1 truncate" style={{ fontSize: "9.5px", color: MUTED }}>
                      {card.domain}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col" style={{ padding: "12px" }}>
                    {/* Wordmark slot — a masthead <img> can replace this span later. */}
                    <span
                      style={{
                        fontSize: "13.5px",
                        fontWeight: 700,
                        letterSpacing: "-0.2px",
                        color: INK,
                      }}
                    >
                      {card.name}
                    </span>
                    <div style={{ marginTop: "10px", borderTop: `1px solid ${LINE}` }} />
                    <h3
                      style={{
                        marginTop: "10px",
                        fontSize: "11.5px",
                        fontWeight: 600,
                        lineHeight: 1.35,
                        color: INK,
                      }}
                    >
                      {card.headline}
                    </h3>
                    <div aria-hidden style={{ marginTop: "12px" }}>
                      {["100%", "100%", "88%", card.lastBar].map((w, i) => (
                        <div
                          key={i}
                          style={{
                            width: w,
                            height: "4px",
                            borderRadius: "2px",
                            backgroundColor: "#EDEFF3",
                            marginTop: i === 0 ? 0 : "5px",
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <p
                    className="text-center"
                    style={{
                      borderTop: `1px solid ${LINE}`,
                      padding: "10px",
                      fontSize: "9.5px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: MUTED,
                    }}
                  >
                    {card.category}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3 — Why it's worth doing */}
        <section className="bg-white px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <SectionHeading>What it actually does for you</SectionHeading>
            <div
              className="grid grid-cols-1 md:grid-cols-3"
              style={{ marginTop: "28px", gap: "20px" }}
            >
              {whyCards.map((card) => (
                <div
                  key={card.title}
                  className="bg-white text-left"
                  style={{ border: `1px solid ${LINE}`, borderRadius: "8px", padding: "24px" }}
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

        {/* 4 — What you get */}
        <section className="px-6 py-16" style={{ backgroundColor: TINT }}>
          <div className="mx-auto max-w-4xl">
            <SectionHeading>What you get</SectionHeading>

            <div
              className="grid grid-cols-1 sm:grid-cols-2"
              style={{ marginTop: "28px", gap: "20px" }}
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

            <ul className="mx-auto text-left" style={{ marginTop: "40px", maxWidth: "640px" }}>
              {checklist.map((item) => (
                <li
                  key={item.lead}
                  className="flex gap-3"
                  style={{ marginTop: "14px", fontSize: "14.5px", lineHeight: 1.6 }}
                >
                  <Tick />
                  <span style={{ color: BODY }}>
                    <strong style={{ color: INK, fontWeight: 600 }}>{item.lead}</strong>
                    {item.rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5 — How it works */}
        <section className="bg-white px-6 py-14">
          <div className="mx-auto max-w-3xl">
            <SectionHeading>How it works</SectionHeading>

            <div
              className="flex flex-col items-center justify-center sm:flex-row"
              style={{ marginTop: "28px", gap: "16px" }}
            >
              {steps.map((step, i) => (
                <div key={step} className="flex items-center" style={{ gap: "16px" }}>
                  <div className="flex items-center" style={{ gap: "10px" }}>
                    <span
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: "24px",
                        height: "24px",
                        backgroundColor: BRAND,
                        color: "#fff",
                        fontSize: "11px",
                        fontWeight: 700,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ fontSize: "14.5px", fontWeight: 600, color: INK }}>{step}</span>
                  </div>
                  {i < steps.length - 1 ? (
                    <span
                      aria-hidden
                      className="hidden sm:block"
                      style={{ width: "28px", height: "1px", backgroundColor: LINE }}
                    />
                  ) : null}
                </div>
              ))}
            </div>

            <p
              className="mx-auto text-center"
              style={{ marginTop: "24px", maxWidth: "54ch", fontSize: "13.5px", color: MUTED }}
            >
              Your draft arrives within five working days. It goes live three days after you
              approve it.
            </p>
          </div>
        </section>

        {/* 6 — Questions */}
        <section className="px-6 py-16" style={{ backgroundColor: TINT }}>
          <div className="mx-auto max-w-[680px]">
            <SectionHeading>Questions</SectionHeading>
            <dl style={{ marginTop: "20px" }}>
              {questions.map((item, i) => (
                <div
                  key={item.q}
                  style={{
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    borderTop: i === 0 ? "none" : `1px solid ${LINE}`,
                  }}
                >
                  <dt style={{ fontSize: "15.5px", fontWeight: 600, color: INK }}>{item.q}</dt>
                  <dd
                    style={{
                      marginTop: "8px",
                      fontSize: "14.5px",
                      lineHeight: 1.65,
                      color: BODY,
                    }}
                  >
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 7 — Price and CTA */}
        <section className="bg-white px-6 py-16">
          <div
            ref={priceRef}
            className="mx-auto overflow-hidden bg-white"
            style={{
              maxWidth: "440px",
              border: `1px solid ${LINE}`,
              borderTop: `3px solid ${BRAND}`,
              borderRadius: "10px",
              boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
            }}
          >
            <div className="text-center" style={{ padding: "36px 28px" }}>
              <p
                style={{
                  fontSize: "10.5px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: MUTED,
                }}
              >
                Four publications · One story
              </p>
              <p
                className="text-[44px] md:text-[48px]"
                style={{
                  marginTop: "10px",
                  fontWeight: 700,
                  letterSpacing: "-1.2px",
                  lineHeight: 1.05,
                  color: INK,
                }}
              >
                {formatPrice(FEATURE_PRICE)}
              </p>
              <p style={{ marginTop: "8px", fontSize: "12.5px", color: MUTED }}>
                About {formatPrice(PER_PUBLICATION)} a publication. One payment, nothing recurring.
              </p>
              <div style={{ marginTop: "24px" }}>
                <OrderButton full event="salespage-price-order" />
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
              className="text-center"
              style={{
                backgroundColor: TINT,
                borderTop: `1px solid ${LINE}`,
                padding: "14px 20px",
                fontSize: "12.5px",
                lineHeight: 1.6,
                color: MUTED,
              }}
            >
              Your award, certificate and the free winner files are yours either way.
            </p>
          </div>
        </section>

        {/* 8 — Closing line */}
        <section className="px-6 py-14 text-center" style={{ backgroundColor: INK }}>
          <div className="mx-auto max-w-2xl">
            <h2
              className="mx-auto text-[24px] md:text-[30px]"
              style={{ maxWidth: "24ch", fontWeight: 700, lineHeight: 1.2, color: "#fff" }}
            >
              You&rsquo;ve already won. This is the part people see.
            </h2>
            <div style={{ marginTop: "28px" }}>
              <OrderButton variant="light" event="salespage-closing-order" />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      {/* 9 — Mobile sticky bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 md:hidden"
        style={{
          backgroundColor: "#fff",
          borderTop: `1px solid ${LINE}`,
          boxShadow: "0 -2px 10px rgba(15, 23, 42, 0.06)",
          padding: "12px",
          paddingBottom: "calc(12px + env(safe-area-inset-bottom))",
          transform: stickyVisible ? "translateY(0)" : "translateY(120%)",
          transition: "transform 200ms ease",
          pointerEvents: stickyVisible ? "auto" : "none",
        }}
        aria-hidden={!stickyVisible}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="text-left">
            <p style={{ fontSize: "16px", fontWeight: 700, color: INK }}>
              {formatPrice(FEATURE_PRICE)}
            </p>
            <p style={{ fontSize: "11px", color: MUTED }}>one payment</p>
          </div>
          <a
            href={STRIPE_PAYMENT_LINK}
            data-event="salespage-sticky-order"
            tabIndex={stickyVisible ? 0 : -1}
            className={`inline-flex items-center justify-center ${focusRing}`}
            style={{
              height: "44px",
              padding: "0 20px",
              borderRadius: "8px",
              backgroundColor: BRAND,
              color: "#fff",
              fontSize: "14.5px",
              fontWeight: 600,
            }}
          >
            Order now
          </a>
        </div>
      </div>
    </div>
  );
}
