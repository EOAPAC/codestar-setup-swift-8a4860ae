import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties } from "react";
import { Star } from "lucide-react";

import { AWARD_YEAR } from "@/content/award";
import { winnerKitFiles } from "@/content/winner-kit";
import {
  SPECIMEN_BYLINE,
  SPECIMEN_HEADLINE,
  SPECIMEN_OPENING_PARAGRAPHS,
  SPECIMEN_BUSINESS_TOKEN,
  splitOnBusinessToken,
} from "@/content/specimen";

import markAsset from "@/assets/ea-mark.png.asset.json";
import portraitAsset from "@/assets/ea-winner-award-portrait.jpg.asset.json";

export const Route = createFileRoute("/pricingv2")({
  head: () => ({
    meta: [
      { title: `Pricing — ${AWARD_YEAR} Entrepreneur Award` },
      {
        name: "description",
        content: `Download your ${AWARD_YEAR} Entrepreneur Award winner graphics and see The Winner's Feature.`,
      },
      { property: "og:title", content: `Pricing — ${AWARD_YEAR} Entrepreneur Award` },
      {
        property: "og:description",
        content: `Download your ${AWARD_YEAR} Entrepreneur Award winner graphics and see The Winner's Feature.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WinnerOptionsPage,
});

// ------------------------------------------------------------- tokens
const INK = "#0F172A";
const BODY = "#52606D";
const MUTED = "#6B7785";
const BLUE = "#1978E5";
const LINE = "#E5E9F0";
const TINT = "#F7F9FC";
const GOLD = "#B4903C";

const FEATURE_PRICE = 1595;
const formatPrice = (n: number) => `$${n.toLocaleString()}`;

const STRIPE_BUY_BUTTON_SCRIPT = "https://js.stripe.com/v3/buy-button.js";
const STRIPE_BUY_BUTTON_ID = "buy_btn_1U8nvNGd5RmL1wBxiBeEk4sC";
const STRIPE_PUBLISHABLE_KEY =
  "pk_live_51PODhuGd5RmL1wBxaPSXB1yj8gkb96lf7T1sN4GIFOdql1w0I3nNAA9eDnwN1mMT5h4W8KuRqtrNELJCjWxz8hGS00QV17YBf4";
/**
 * Paste a Stripe Payment Link here to swap the embedded buy button for our own
 * navy button. While empty, the embed carries the price on its own so $1,595
 * never appears twice.
 */
const STRIPE_PAYMENT_LINK = "";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1978E5]";

const processChips = ["We write it", "You approve it", "It goes live"];

const v2WhatYouGet = [
  {
    lead: "Your story in four publications",
    rest: " — USA Today, the Associated Press, Business Insider and Fortune",
  },
  {
    lead: "A full article on your winner page",
    rest: " at entrepreneurawards.co, with a permanent link",
  },
  { lead: "The engraved award", rest: " carrying your name and your award year" },
  { lead: "A printed certificate", rest: ", ready to frame" },
  { lead: "Your approval on every word", rest: " before anything is published" },
];

const publications = [
  { name: "USA Today", descriptor: "National daily" },
  { name: "Associated Press", descriptor: "Global newswire" },
  { name: "Business Insider", descriptor: "Business & tech" },
  { name: "Fortune", descriptor: "Business" },
];

/** Inline tick used by the "what's included" list. */
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
      <path d="M2.5 8.5 6 12l7.5-8" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}


// ---------------------------------------------------------------- pieces

function Container({
  children,
  className,
  narrow,
}: {
  children: React.ReactNode;
  className?: string;
  narrow?: number;
}) {
  return (
    <div
      className={`mx-auto w-full px-6 ${className ?? ""}`}
      style={{ maxWidth: narrow ? `${narrow}px` : "1120px" }}
    >
      {children}
    </div>
  );
}

function Confetti() {
  const dots = Array.from({ length: 24 });
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden"
    >
      {dots.map((_, i) => {
        const left = (i * 41) % 100;
        const delay = (i % 8) * 0.5;
        const duration = 5 + (i % 6);
        const size = 4 + (i % 5);
        const colors = [BLUE, "#60a5fa", "#93c5fd", "#dbeafe", "#facc15", "#ffffff"];
        const color = colors[i % colors.length];
        const rotate = (i * 37) % 360;
        const drift = (i % 3) - 1;
        return (
          <span
            key={i}
            className="absolute block rounded-[1px] opacity-80"
            style={
              {
                left: `${left}%`,
                top: "-10%",
                width: `${size}px`,
                height: `${size * 1.6}px`,
                backgroundColor: color,
                transform: `rotate(${rotate}deg)`,
                animation: `ea-confetti-fall ${duration}s linear ${delay}s infinite`,
                "--ea-drift": `${drift * 40}px`,
              } as CSSProperties
            }
          />
        );
      })}
      <style>{`
        @keyframes ea-confetti-fall {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          8% { opacity: 0.95; }
          100% { transform: translateY(320px) translateX(var(--ea-drift, 0px)) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/** Inline slot standing in for the winner's business name in the specimen. */
function SpecimenSlot() {
  return (
    <span
      style={{
        backgroundColor: `${BLUE}14`,
        color: BLUE,
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

/** Browser-frame mockup of the published article. */
function BrowserMockup() {
  return (
    <div
      className="flex h-full flex-col overflow-hidden"
      style={{ backgroundColor: "#fff" }}
    >
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ borderBottom: `1px solid ${LINE}`, backgroundColor: TINT }}
      >
        <span className="flex gap-1.5" aria-hidden>
          {["#E2E6ED", "#E2E6ED", "#E2E6ED"].map((c, i) => (
            <span
              key={i}
              className="block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: c }}
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

      <div
        className="relative flex-1 px-5 pb-6 pt-5"
        style={{ minHeight: 0, overflow: "hidden" }}
      >
        <p
          style={{
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: BLUE,
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

/** Browser-frame mockup of the press release as published on USA Today. */
function PressMockup() {
  return (
    <div
      className="flex h-full flex-col overflow-hidden"
      style={{ backgroundColor: "#fff" }}
    >
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
          usatoday.com
        </span>
      </div>

      <div
        className="relative flex-1 px-5 pb-6 pt-5"
        style={{ minHeight: 0, overflow: "hidden" }}
      >
        <img
          src="/usa-today-logo.svg"
          alt="USA Today"
          width={160}
          height={24}
          loading="lazy"
          decoding="async"
          style={{ height: "20px", width: "auto" }}
        />
        <div style={{ marginTop: "14px", borderTop: `1px solid ${LINE}` }} />
        <h3
          style={{
            marginTop: "14px",
            fontSize: "17px",
            lineHeight: 1.3,
            fontWeight: 600,
            letterSpacing: "-0.015em",
            color: INK,
          }}
        >
          {withSlots(`${SPECIMEN_BUSINESS_TOKEN} Named a Winner of the ${AWARD_YEAR} Entrepreneur Awards`)}
        </h3>
        <p style={{ marginTop: "10px", fontSize: "11px", color: MUTED }}>
          NEW YORK — Entrepreneur Awards
        </p>
        {[
          `${SPECIMEN_BUSINESS_TOKEN} has been named a winner of the ${AWARD_YEAR} Entrepreneur Awards, an annual program recognizing owner-led businesses for measurable operating results.`,
          "The award is given on the basis of a documented outcome, its consistency over time, and the founder's direct role in producing it.",
        ].map((p, i) => (
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




function useStickyVisible() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const footer = document.getElementById("page-footer");
      const anchor = document.getElementById("feature");
      const footerIn = footer ? footer.getBoundingClientRect().top < window.innerHeight : false;
      const started = anchor ? anchor.getBoundingClientRect().top < window.innerHeight * 0.5 : false;
      setVisible(started && !footerIn);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return visible;
}

// ---------------------------------------------------------------- page

function WinnerOptionsPage() {
  const stickyVisible = useStickyVisible();

  useEffect(() => {
    if (document.querySelector(`script[src="${STRIPE_BUY_BUTTON_SCRIPT}"]`)) {
      return;
    }
    const script = document.createElement("script");
    script.src = STRIPE_BUY_BUTTON_SCRIPT;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      data-event="pricing-page-view"
      className="min-h-screen font-sans antialiased"
      style={{ backgroundColor: "#fff", color: BODY }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) { .ea-sticky { transition: none !important; } }
      `}</style>

      {/* Header */}
      <header style={{ borderBottom: `1px solid ${LINE}`, backgroundColor: "#fff" }}>
        <Container className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className={`flex items-center gap-2 rounded-sm ${focusRing}`}
            style={{ fontSize: "0.875rem", fontWeight: 600, color: INK }}
          >
            <img
              src={markAsset.url}
              alt="Entrepreneur Awards mark"
              className="h-7 w-7 shrink-0 object-contain"
            />
            Entrepreneur Awards
          </Link>
          <span style={{ fontSize: "0.875rem", color: MUTED }}>Winner downloads</span>
        </Container>
      </header>

      <main style={{ paddingBottom: "88px" }}>
        {/* 1 — Hero */}
        <section
          className="relative flex items-center overflow-hidden"
          style={{ minHeight: "380px" }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div
              className="absolute left-1/2 top-[-14rem] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full blur-3xl"
              style={{ backgroundColor: `${BLUE}26` }}
            />
          </div>
          <Confetti />

          <Container narrow={760} className="py-14 text-center">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ backgroundColor: BLUE, color: "#fff" }}
            >
              <Star className="h-3.5 w-3.5 fill-current" aria-hidden />
              {AWARD_YEAR} Entrepreneur Award
            </span>
            <h1
              style={{
                marginTop: "22px",
                fontSize: "clamp(3rem, 8vw, 5rem)",
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                color: INK,
              }}
            >
              You won.
            </h1>
            <p style={{ marginTop: "18px", fontSize: "1.0625rem", color: BODY }}>
              Congratulations on your {AWARD_YEAR} Entrepreneur Award. Everything that comes with it is below.
            </p>
          </Container>
        </section>

        {/* 2 — Downloads */}
        <section id="downloads" style={{ backgroundColor: TINT, padding: "56px 0" }}>
          <Container>
            <div className="text-center">
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: INK,
                }}
              >
                Your award, ready to use.
              </h2>
              <p style={{ marginTop: "6px", fontSize: "0.8125rem", color: MUTED }}>
                Download them, then add them to your website, your LinkedIn profile and your email signature. They're yours to keep, at no further cost.
              </p>
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {winnerKitFiles.map((file) => (
                <li key={file.id} className="flex">
                  <a
                    href={file.url}
                    download={file.filename}
                    data-event="asset-download"
                    className={`flex w-full flex-col rounded-xl bg-white p-3 transition-shadow hover:shadow-[0_4px_16px_rgba(15,23,42,0.08)] ${focusRing}`}
                    style={{ border: `1px solid ${LINE}` }}
                  >
                    <div
                      className="flex items-center justify-center overflow-hidden rounded-lg"
                      style={{ height: "140px", backgroundColor: TINT }}
                    >
                      <img
                        src={file.url}
                        alt={file.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full"
                        style={{ objectFit: file.fit }}
                      />
                    </div>
                    <div className="mt-3 flex flex-1 flex-col">
                      <span
                        style={{ fontSize: "0.9375rem", fontWeight: 500, color: INK }}
                      >
                        {file.name}
                      </span>
                      <span
                        className="mt-0.5"
                        style={{ fontSize: "0.75rem", fontWeight: 400, color: MUTED, lineHeight: 1.4 }}
                      >
                        {file.description}
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col items-center">
              <a
                href="/api/public/winner-kit/zip"
                download
                data-event="asset-download"
                className={`inline-flex items-center justify-center rounded-lg text-white transition-colors hover:bg-[#1568D0] ${focusRing}`}
                style={{
                  height: "52px",
                  padding: "0 28px",
                  backgroundColor: BLUE,
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
              >
                Download everything
              </a>
              <p
                style={{
                  marginTop: "56px",
                  marginBottom: "64px",
                  fontSize: "18px",
                  fontWeight: 500,
                  color: BODY,
                }}
              >
                That&rsquo;s everything you can post yourself.
              </p>
            </div>
          </Container>
        </section>

        {/* 3 — The Winner's Feature */}
        <section id="feature" className="py-14 md:py-20">
          <Container>
            {/* Header */}
            <div className="text-center">
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: MUTED,
                }}
              >
                The Winner&rsquo;s Feature
              </p>
              <h2
                className="mx-auto"
                style={{
                  marginTop: "12px",
                  fontSize: "clamp(28px, 4.4vw, 40px)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  maxWidth: "22ch",
                  color: INK,
                }}
              >
                Get published in four national publications.
              </h2>
              <p
                className="mx-auto text-[15.5px] md:text-[16.5px]"
                style={{ marginTop: "16px", lineHeight: 1.6, maxWidth: "52ch", color: BODY }}
              >
                We write one story about your win and place it in all four, plus a full article on
                your winner page and the engraved award, posted to you.
              </p>
            </div>

            {/* Where your story runs — four article cards */}
            <p
              className="text-center"
              style={{
                marginTop: "44px",
                fontSize: "10.5px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: MUTED,
              }}
            >
              Where your story runs
            </p>

            <div
              className="mx-auto grid max-w-4xl grid-cols-2 sm:grid-cols-4"
              style={{ marginTop: "20px", gap: "16px" }}
            >
              {articleCards.map((card) => (
                <article
                  key={card.name}
                  className="flex flex-col overflow-hidden bg-white text-left"
                  style={{ border: `1px solid ${LINE}`, borderRadius: "3px" }}
                >
                  {/* Browser chrome */}
                  <div
                    className="flex items-center gap-1.5"
                    style={{
                      padding: "8px 12px",
                      backgroundColor: PAGE,
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
                    <span
                      className="ml-1 truncate"
                      style={{ fontSize: "9.5px", color: MUTED }}
                    >
                      {card.domain}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col" style={{ padding: "12px" }}>
                    {/* Wordmark slot — a masthead <img> can replace this span later. */}
                    <span style={{ fontSize: "13.5px", fontWeight: 700, letterSpacing: "-0.2px", color: INK }}>
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

                  {/* Footer */}
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

            <p
              className="mx-auto text-center"
              style={{ marginTop: "16px", maxWidth: "60ch", fontSize: "12.5px", color: MUTED }}
            >
              The same story, written to each publication&rsquo;s format and running under your
              business name.
            </p>

            {/* Winner page + award, 2-up */}
            <div
              className="mx-auto grid max-w-4xl grid-cols-1 sm:grid-cols-2"
              style={{ marginTop: "48px", gap: "20px" }}
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
                  style={{ border: `1px solid ${LINE}`, borderRadius: "2px" }}
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
                    borderRadius: "2px",
                  }}
                />
              </div>
            </div>


            <div className="text-center" style={{ marginTop: "24px" }}>
              <Link
                to="/winners/specimen"
                data-event="feature-format-view"
                className={`inline-block rounded-sm ${focusRing}`}
                style={{
                  fontSize: "13.5px",
                  fontWeight: 600,
                  color: INK,
                  textDecoration: "underline",
                  textDecorationThickness: "2px",
                  textUnderlineOffset: "4px",
                }}
              >
                See a real winner&rsquo;s feature →
              </Link>
            </div>

            {/* What's included */}
            <div style={{ marginTop: "48px", borderTop: `1px solid ${LINE}`, paddingTop: "36px" }}>
              <p
                className="text-center"
                style={{
                  fontSize: "10.5px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: MUTED,
                }}
              >
                What&rsquo;s included
              </p>
              <ul className="mx-auto max-w-xl" style={{ marginTop: "20px" }}>
                {v2WhatYouGet.map((item) => (
                  <li
                    key={item.lead}
                    className="flex items-start gap-3 text-left"
                    style={{ marginBottom: "14px" }}
                  >
                    <Tick />
                    <span style={{ fontSize: "14.5px", lineHeight: 1.6, color: BODY }}>
                      <strong style={{ fontWeight: 600, color: INK }}>{item.lead}</strong>
                      {item.rest}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How it works */}
            <div style={{ marginTop: "48px", borderTop: `1px solid ${LINE}`, paddingTop: "36px" }}>
              <ol className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                {processChips.map((chip, i) => (
                  <li key={chip} className="flex items-center gap-3">
                    <span className="flex items-center gap-2.5">
                      <span
                        className="flex shrink-0 items-center justify-center rounded-full"
                        style={{
                          width: "22px",
                          height: "22px",
                          backgroundColor: INK,
                          color: "#fff",
                          fontSize: "10.5px",
                          fontWeight: 600,
                        }}
                      >
                        {i + 1}
                      </span>
                      <span style={{ fontSize: "14px", fontWeight: 600, color: INK }}>{chip}</span>
                    </span>
                    {i < processChips.length - 1 ? (
                      <span
                        aria-hidden
                        className="hidden sm:inline-flex"
                        style={{ color: LINE, marginLeft: "8px", marginRight: "8px" }}
                      >
                        <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
                          <path
                            d="M0 5h15M11.5 1.5 15 5l-3.5 3.5"
                            stroke={MUTED}
                            strokeOpacity="0.5"
                            strokeWidth="1.2"
                          />
                        </svg>
                      </span>
                    ) : null}
                  </li>
                ))}
              </ol>
              <p
                className="mx-auto text-center"
                style={{
                  marginTop: "20px",
                  maxWidth: "54ch",
                  fontSize: "13.5px",
                  lineHeight: 1.6,
                  color: MUTED,
                }}
              >
                Your draft arrives within five working days. It goes live three days after you
                approve it.
              </p>
            </div>

            {/* Price */}
            <div
              className="mx-auto max-w-md overflow-hidden bg-white"
              style={{
                marginTop: "48px",
                border: `1px solid ${INK}`,
                borderRadius: "3px",
                borderTop: `3px solid ${GOLD}`,
              }}
            >
              <div className="text-center" style={{ padding: "32px 24px" }}>
                <p
                  style={{
                    fontSize: "10.5px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: MUTED,
                  }}
                >
                  4 Publications · One story
                </p>
                {STRIPE_PAYMENT_LINK ? (
                  <>
                    <p
                      className="text-[42px] md:text-[46px]"
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
                      One payment. Nothing recurring.
                    </p>
                    <a
                      href={STRIPE_PAYMENT_LINK}
                      data-event="feature-order-click"
                      className={`flex w-full items-center justify-center rounded-sm text-white transition-opacity hover:opacity-90 ${focusRing}`}
                      style={{
                        marginTop: "24px",
                        minHeight: "44px",
                        backgroundColor: INK,
                        fontSize: "15px",
                        fontWeight: 600,
                      }}
                    >
                      Order the Winner&rsquo;s Feature
                    </a>
                  </>
                ) : (
                  <>
                    <p style={{ marginTop: "10px", fontSize: "12.5px", color: MUTED }}>
                      One payment. Nothing recurring.
                    </p>
                    <div data-event="feature-order-click" style={{ marginTop: "24px" }}>
                      {/* @ts-expect-error - Stripe web component */}
                      <stripe-buy-button
                        buy-button-id={STRIPE_BUY_BUTTON_ID}
                        publishable-key={STRIPE_PUBLISHABLE_KEY}
                        style={{ display: "block" }}
                      />
                    </div>
                  </>
                )}
                <p
                  style={{
                    marginTop: "14px",
                    fontSize: "11px",
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
                Nothing goes live until you approve every word. Your award and the free files are
                yours either way.
              </p>
            </div>
          </Container>
        </section>

      </main>

      {/* 4 — Sticky bar */}
      <div
        className="ea-sticky fixed inset-x-0 bottom-0 z-40"
        style={{
          height: "64px",
          backgroundColor: "#fff",
          borderTop: `1px solid ${LINE}`,
          boxShadow: "0 -2px 10px rgba(15,23,42,0.06)",
          transform: stickyVisible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 200ms ease-out",
          pointerEvents: stickyVisible ? "auto" : "none",
        }}
        aria-hidden={!stickyVisible}
      >
        <Container className="flex h-16 items-center justify-between gap-4">
          <span style={{ fontSize: "0.9375rem", color: INK }}>
            <strong style={{ fontWeight: 600 }}>The Winner&rsquo;s Feature</strong>
            <span style={{ color: MUTED }}> · {formatPrice(FEATURE_PRICE)}</span>
          </span>
          <div data-event="feature-order-click">
            {/* @ts-expect-error - Stripe web component */}
            <stripe-buy-button
              buy-button-id={STRIPE_BUY_BUTTON_ID}
              publishable-key={STRIPE_PUBLISHABLE_KEY}
              style={{ display: "block", minWidth: "180px" }}
            />
          </div>
        </Container>
      </div>

      {/* Footer */}
      <footer id="page-footer" style={{ borderTop: `1px solid ${LINE}`, padding: "40px 0" }}>
        <Container className="flex flex-col items-center gap-4">
          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: INK }}>
            Entrepreneur Awards
          </span>
          <nav
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
            style={{ fontSize: "0.75rem", color: MUTED }}
          >
            <Link to="/terms-and-conditions" className={`hover:text-[#0F172A] ${focusRing}`}>
              Terms
            </Link>
            <a href="/#contact" className={`hover:text-[#0F172A] ${focusRing}`}>
              Contact
            </a>
          </nav>
          <p style={{ fontSize: "0.75rem", color: MUTED }}>
            Entrepreneur Awards. All rights reserved.
          </p>
        </Container>
      </footer>
    </div>
  );
}
