import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties } from "react";
import { Check, Star } from "lucide-react";

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

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: `The Winner's Feature | Entrepreneur Awards` },
      {
        name: "description",
        content: `Download your ${AWARD_YEAR} Entrepreneur Award winner graphics and see The Winner's Feature.`,
      },
      { property: "og:title", content: `The Winner's Feature | Entrepreneur Awards` },
      {
        property: "og:description",
        content: `Download your ${AWARD_YEAR} Entrepreneur Award winner graphics and see The Winner's Feature.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});

// ------------------------------------------------------------- tokens
const INK = "#0F172A";
const BODY = "#52606D";
const MUTED = "#6B7785";
const BLUE = "#1978E5";
const LINE = "#E5E9F0";
const TINT = "#F7F9FC";

const FEATURE_PRICE = 595;
const formatPrice = (n: number) => `$${n.toLocaleString()}`;

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1978E5]";

const processChips = ["We write both", "You approve both", "It goes live"];

const whatYouGet = [
  "A full article about your business, written by our editors",
  "Published at a permanent entrepreneurawards.co address that stays up for good",
  "A press release about your win, written for you and published on USA Today",
  "An engraved award carrying your name and your award year",
  "A printed certificate, ready to frame",
];

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
      className="overflow-hidden rounded-xl"
      style={{ border: `1px solid ${LINE}`, backgroundColor: "#fff" }}
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

      <div className="relative px-5 pb-6 pt-5" style={{ height: "300px", overflow: "hidden" }}>
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
      className="overflow-hidden rounded-xl"
      style={{ border: `1px solid ${LINE}`, backgroundColor: "#fff" }}
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

      <div className="relative px-5 pb-6 pt-5" style={{ height: "300px", overflow: "hidden" }}>
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

function PricingPage() {
  const stickyVisible = useStickyVisible();

  const buyFeature = () => {
    window.location.href = "/complete";
  };

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
        <section id="feature" style={{ padding: "48px 0 64px" }}>
          <Container>
            <div className="text-center">
              <p
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: BLUE,
                }}
              >
                The Winner&rsquo;s Feature
              </p>
              <h2
                style={{
                  marginTop: "10px",
                  fontSize: "clamp(1.75rem, 3.4vw, 2.5rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  color: INK,
                }}
              >
                Get your business written about in USA Today.
              </h2>
              <p style={{ marginTop: "14px", fontSize: "0.9375rem", color: BODY }}>
                A full article about your business on our site, a press release published on USA Today, and an engraved award posted to you.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              <figure className="flex h-full flex-col">
                <PressMockup />
                <figcaption
                  className="mt-3 text-center"
                  style={{ fontSize: "0.8125rem", color: MUTED }}
                >
                  Published on USA Today.
                </figcaption>
              </figure>

              <figure className="flex h-full flex-col">
                <Link
                  to="/winners/specimen"
                  data-event="feature-format-view"
                  className={`block rounded-xl ${focusRing}`}
                >
                  <BrowserMockup />
                </Link>
                <figcaption
                  className="mt-3 text-center"
                  style={{ fontSize: "0.8125rem", color: BLUE }}
                >
                  <Link
                    to="/winners/specimen"
                    className={`rounded-sm underline underline-offset-4 ${focusRing}`}
                  >
                    See a real example →
                  </Link>
                </figcaption>
              </figure>

              <figure className="flex h-full flex-col">
                <div
                  className="flex-1 overflow-hidden rounded-xl"
                  style={{ border: `1px solid ${LINE}` }}
                >
                  <img
                    src={portraitAsset.url}
                    alt="Founder holding an engraved Entrepreneur Award"
                    width={1264}
                    height={848}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full"
                    style={{ objectFit: "cover", objectPosition: "50% 35%" }}
                  />
                </div>
                <figcaption
                  className="mt-3 text-center"
                  style={{ fontSize: "0.8125rem", color: MUTED }}
                >
                  The engraved award, posted to you.
                </figcaption>
              </figure>
            </div>

            {/* What you get */}
            <ul className="mx-auto mt-10 grid max-w-[680px] gap-3">
              {whatYouGet.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: BLUE }} aria-hidden />
                  <span style={{ fontSize: "0.9375rem", color: BODY }}>{item}</span>
                </li>
              ))}
            </ul>

            {/* Process chips */}
            <ol className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
              {processChips.map((chip, i) => (
                <li key={chip} className="flex items-center gap-3">
                  <span
                    className="rounded-full px-3.5 py-1.5"
                    style={{
                      border: `1px solid ${LINE}`,
                      backgroundColor: TINT,
                      fontSize: "0.8125rem",
                      color: INK,
                    }}
                  >
                    {chip}
                  </span>
                  {i < processChips.length - 1 ? (
                    <span aria-hidden style={{ color: MUTED, fontSize: "0.875rem" }}>
                      →
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>

            <p className="mt-5 text-center" style={{ fontSize: "0.9375rem", color: BODY }}>
              You'll have your article draft within five working days, and it goes live three days after you approve it.
            </p>

            <div className="mt-8 flex flex-col items-center">
              <p
                style={{
                  fontSize: "clamp(2.25rem, 5vw, 3rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: INK,
                }}
              >
                {formatPrice(FEATURE_PRICE)}
              </p>
              <button
                type="button"
                onClick={buyFeature}
                data-event="feature-order-click"
                className={`mt-5 inline-flex items-center justify-center rounded-lg text-white transition-colors hover:bg-[#1568D0] ${focusRing}`}
                style={{
                  height: "52px",
                  padding: "0 28px",
                  backgroundColor: BLUE,
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
              >
                Get my feature
              </button>
              <p style={{ marginTop: "12px", fontSize: "0.8125rem", color: MUTED }}>
                Nothing goes live until you approve every word.
              </p>
              <p style={{ marginTop: "6px", fontSize: "0.8125rem", color: MUTED }}>
                Your award and the files above are yours either way.
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
          <button
            type="button"
            onClick={buyFeature}
            data-event="feature-order-click"
            className={`rounded-lg text-white transition-colors hover:bg-[#1568D0] ${focusRing}`}
            style={{
              height: "40px",
              padding: "0 18px",
              backgroundColor: BLUE,
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
          >
            Get my feature
          </button>
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
