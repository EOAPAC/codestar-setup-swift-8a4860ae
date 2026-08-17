import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Download } from "lucide-react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AWARD_YEAR } from "@/content/award";
import {
  SPECIMEN_BUSINESS_TOKEN,
  SPECIMEN_BYLINE,
  SPECIMEN_HEADLINE,
  SPECIMEN_OPENING_PARAGRAPHS,
  splitOnBusinessToken,
} from "@/content/specimen";

import markAsset from "@/assets/ea-mark.png.asset.json";
import commemorativeAsset from "@/assets/nano-banana-pro.jpg.asset.json";

export const Route = createFileRoute("/winner-options-v2")({
  head: () => ({
    meta: [
      { title: "Your Winner Materials | Entrepreneur Awards" },
      {
        name: "description",
        content:
          "Download your winner seal and graphics, and see the two optional additions available to Entrepreneur Award winners.",
      },
      { property: "og:title", content: "Your Winner Materials | Entrepreneur Awards" },
      {
        property: "og:description",
        content:
          "Download your winner seal and graphics, and see the two optional additions available to Entrepreneur Award winners.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WinnerOptionsV2Page,
});

// ------------------------------------------------------------- tokens
const INK = "#0F172A";
const BODY = "#52606D";
const MUTED = "#6B7785";
const BLUE = "#1978E5";
const LINE = "#E5E9F0";
const TINT = "#F7F9FC";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1978E5]";

const COMMEMORATIVE_PRICE = 195;
const FEATURE_PRICE = 595;
const formatPrice = (n: number) => `$${n.toLocaleString()}`;

// ---------------------------------------------------------------- data

const materials = [
  {
    id: "seal",
    title: "Winner seal",
    use: "for your website, email signature and media kit",
    fileType: "PNG",
  },
  { id: "banner", title: "LinkedIn banner", use: "for the top of your profile", fileType: "PNG" },
  {
    id: "square",
    title: "Square social post",
    use: "for announcing your award",
    fileType: "PNG",
  },
  {
    id: "story",
    title: "Story graphic",
    use: "for Instagram or LinkedIn stories",
    fileType: "PNG",
  },
  {
    id: "signature",
    title: "Email signature graphic",
    use: "a small version for everyday emails",
    fileType: "PNG",
  },
];

const featureIncludes = [
  "A full written feature about your business",
  "Your review before we publish anything",
  "A permanent link at entrepreneurawards.co, with no renewal fee",
];

const commemorativeIncludes = [
  "An engraved award plaque with your name, your award year and your award statement",
  "A printed certificate, ready to frame",
];

const linkUses = [
  {
    label: "Your email signature",
    body: "One line under your name, on every email you send.",
  },
  {
    label: "A proposal or pitch deck",
    body: "A third-party page instead of describing yourself.",
  },
  {
    label: "Your LinkedIn featured section",
    body: "Pinned to the top of your profile.",
  },
  {
    label: "An investor or board update",
    body: "Something written by someone other than you.",
  },
  {
    label: "A speaker or contributor bio",
    body: "The link organisers and editors ask for.",
  },
  {
    label: 'The "what do you do?" reply',
    body: "One URL that answers it properly.",
  },
];

const processSteps = [
  { number: "1", title: "You order", body: "Nothing else is needed from you yet." },
  { number: "2", title: "We write it", body: "Your draft reaches you within 5 business days." },
  { number: "3", title: "You review", body: "Correct anything factual and approve it." },
  {
    number: "4",
    title: "It goes live",
    body: "Published within 3 business days of your approval.",
  },
];

const faqs = [
  {
    q: "Do I need to buy anything to keep my award?",
    a: "No. Your award, your seal, your graphics and your award statement are included and are yours permanently. The two options on this page are additions, not requirements.",
  },
  {
    q: "Can I use the winner seal on my website and marketing?",
    a: "Yes. Use it on your site, your email signature, your media kit, proposals and social media, for as long as you like.",
  },
  {
    q: "What's the difference between my award statement and the Winner's Feature?",
    a: "Your award statement is a short paragraph explaining why you were recognised. The Winner's Feature is a full article about your business, published at its own permanent link you can share.",
  },
  {
    q: "Do I get to see the feature before it's published?",
    a: "Yes. You receive the full draft, you can correct anything factual, and nothing goes live until you approve it.",
  },
  {
    q: "Does the feature link ever expire?",
    a: "No. It stays at the same address with no renewal fee.",
  },
  {
    q: "How long does the commemorative award take to arrive?",
    a: "It's made to order after you purchase. Production and shipping times are confirmed in your order email.",
  },
];

const AWARD_STATEMENT_SPECIMEN = `The ${AWARD_YEAR} Entrepreneur Award recognizes ${SPECIMEN_BUSINESS_TOKEN} for building a service operation that grew without adding headcount, evidenced by client retention sustained across three consecutive years and a documented reduction in delivery time following the redesign of its intake process. Assessed on the measurable outcome, its consistency over time, and the founder's direct role in producing it.`;

// ------------------------------------------------------------ primitives

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

function Section({
  children,
  id,
  tint,
  className,
}: {
  children: React.ReactNode;
  id?: string;
  tint?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`ea2-pad ${className ?? ""}`}
      style={{ backgroundColor: tint ? TINT : "#fff", scrollMarginTop: "24px" }}
    >
      {children}
    </section>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "clamp(1.625rem, 2.4vw, 2.125rem)",
        fontWeight: 600,
        lineHeight: 1.15,
        letterSpacing: "-0.015em",
        color: INK,
        maxWidth: "760px",
      }}
    >
      {children}
    </h2>
  );
}

function Body({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={className}
      style={{ fontSize: "1rem", lineHeight: 1.65, color: BODY, maxWidth: "660px" }}
    >
      {children}
    </p>
  );
}

function Small({
  children,
  className,
  center,
}: {
  children: React.ReactNode;
  className?: string;
  center?: boolean;
}) {
  return (
    <p
      className={className}
      style={{
        fontSize: "0.8125rem",
        lineHeight: 1.55,
        color: MUTED,
        maxWidth: "660px",
        textAlign: center ? "center" : undefined,
      }}
    >
      {children}
    </p>
  );
}

function DotList({ items }: { items: string[] }) {
  return (
    <ul style={{ display: "grid", gap: "10px" }}>
      {items.map((item) => (
        <li
          key={item}
          style={{
            display: "flex",
            gap: "12px",
            fontSize: "0.9375rem",
            lineHeight: 1.55,
            color: BODY,
          }}
        >
          <span
            aria-hidden
            style={{
              marginTop: "0.6em",
              flex: "0 0 auto",
              width: "5px",
              height: "5px",
              borderRadius: "9999px",
              backgroundColor: BLUE,
              opacity: 0.5,
            }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function FilledButton({
  children,
  onClick,
  event,
}: {
  children: React.ReactNode;
  onClick: () => void;
  event: string;
}) {
  return (
    <button
      type="button"
      data-event={event}
      onClick={onClick}
      className={`w-full rounded-lg text-white transition-colors hover:bg-[#1568D0] sm:w-auto ${focusRing}`}
      style={{
        minHeight: "48px",
        padding: "0 24px",
        backgroundColor: BLUE,
        fontSize: "0.9375rem",
        fontWeight: 500,
      }}
    >
      {children}
    </button>
  );
}

function OutlineButton({
  children,
  onClick,
  event,
}: {
  children: React.ReactNode;
  onClick: () => void;
  event: string;
}) {
  return (
    <button
      type="button"
      data-event={event}
      onClick={onClick}
      className={`w-full rounded-lg bg-white transition-colors hover:bg-[#1978E5]/[0.08] sm:w-auto ${focusRing}`}
      style={{
        minHeight: "48px",
        padding: "0 24px",
        border: `1px solid ${BLUE}`,
        color: BLUE,
        fontSize: "0.9375rem",
        fontWeight: 500,
      }}
    >
      {children}
    </button>
  );
}

function PriceLine({ amount }: { amount: number }) {
  return (
    <div>
      <p style={{ fontSize: "1.5rem", fontWeight: 600, color: INK, letterSpacing: "-0.01em" }}>
        {formatPrice(amount)}
      </p>
      <p style={{ fontSize: "0.8125rem", color: MUTED, marginTop: "2px" }}>One-time payment</p>
    </div>
  );
}

function SpecimenSlot() {
  return (
    <span
      style={{
        backgroundColor: "rgba(25,120,229,0.10)",
        borderRadius: "4px",
        padding: "0 2px",
      }}
    >
      {SPECIMEN_BUSINESS_TOKEN}
    </span>
  );
}

function withSpecimenSlot(text: string) {
  return splitOnBusinessToken(text).map((part, i) => (
    <span key={i}>
      {i > 0 ? <SpecimenSlot /> : null}
      {part}
    </span>
  ));
}

/** Realistic browser frame showing the published feature. */
function FeatureMockup() {
  return (
    <div className="w-full">
      <div
        className="overflow-hidden"
        style={{
          borderRadius: "14px",
          border: `1px solid ${LINE}`,
          backgroundColor: "#fff",
          boxShadow: "0 18px 40px -28px rgba(15,23,42,0.35)",
        }}
      >
        <div
          className="flex items-center gap-3"
          style={{
            height: "40px",
            backgroundColor: TINT,
            borderBottom: `1px solid ${LINE}`,
            padding: "0 14px",
          }}
        >
          <span className="flex shrink-0 items-center gap-[6px]" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "999px",
                  backgroundColor: LINE,
                }}
              />
            ))}
          </span>
          <span
            className="flex min-w-0 flex-1 items-center"
            style={{
              height: "26px",
              borderRadius: "6px",
              backgroundColor: "#fff",
              border: `1px solid ${LINE}`,
              padding: "0 10px",
            }}
          >
            <span
              className="ea2-url truncate"
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: "0.6875rem",
                color: MUTED,
              }}
            >
              entrepreneurawards.co/winners/
              <span style={{ color: BLUE }}>your-business</span>
            </span>
          </span>
        </div>

        <div className="ea2-article" style={{ padding: "clamp(20px, 4vw, 44px)" }}>
          <p
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: BLUE,
            }}
          >
            {AWARD_YEAR} Winner Feature
          </p>
          <h3
            style={{
              marginTop: "14px",
              fontSize: "clamp(1.375rem, 2.6vw, 2rem)",
              fontWeight: 600,
              lineHeight: 1.18,
              letterSpacing: "-0.02em",
              color: INK,
              maxWidth: "640px",
            }}
          >
            {withSpecimenSlot(SPECIMEN_HEADLINE)}
          </h3>
          <p style={{ marginTop: "12px", fontSize: "0.875rem", color: MUTED }}>{SPECIMEN_BYLINE}</p>
          <div style={{ marginTop: "24px", display: "grid", gap: "18px", maxWidth: "640px" }}>
            {SPECIMEN_OPENING_PARAGRAPHS.slice(0, 2).map((text) => (
              <p key={text} style={{ fontSize: "1rem", lineHeight: 1.7, color: "#1a1a1a" }}>
                {withSpecimenSlot(text)}
              </p>
            ))}
          </div>
        </div>
      </div>
      <Small className="mt-3">Example feature. Not a real recipient.</Small>
    </div>
  );
}

// ---------------------------------------------------------------- page

function WinnerOptionsV2Page() {
  useEffect(() => {
    document.body.setAttribute("data-page-event", "pricing-page-view");
    return () => document.body.removeAttribute("data-page-event");
  }, []);

  const handleDownload = () => toast("Your download will be available here.");
  const handleSelect = () => toast("This selection page will be connected shortly.");

  return (
    <div
      data-event="pricing-page-view"
      className="min-h-screen font-sans antialiased"
      style={{ backgroundColor: "#fff", color: BODY }}
    >
      <style>{`
        .ea2-pad { padding-top: 56px; padding-bottom: 56px; }
        @media (min-width: 768px) { .ea2-pad { padding-top: 88px; padding-bottom: 88px; } }
        @media (min-width: 1024px) { .ea2-pad { padding-top: 112px; padding-bottom: 112px; } }
        .ea2-hero { padding-top: 48px; padding-bottom: 32px; }
        @media (min-width: 768px) { .ea2-hero { padding-top: 72px; padding-bottom: 40px; } }
        @media (max-width: 639px) { .ea2-url { white-space: normal; word-break: break-word; } }
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
          <span style={{ fontSize: "0.875rem", color: MUTED }}>Winner Materials</span>
        </Container>
      </header>

      <main>
        {/* 1. Hero */}
        <section className="ea2-hero relative overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div
              className="absolute left-1/2 top-[-16rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full blur-3xl"
              style={{ backgroundColor: `${BLUE}1F` }}
            />
          </div>
          <Container narrow={780} className="text-center">
            <p
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: BLUE,
              }}
            >
              {AWARD_YEAR} Entrepreneur Awards Winner
            </p>
            <h1
              style={{
                marginTop: "16px",
                fontSize: "clamp(2rem, 4.4vw, 3rem)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: INK,
              }}
            >
              Congratulations — your {AWARD_YEAR} Entrepreneur Award is confirmed.
            </h1>
            <p
              className="mx-auto"
              style={{
                marginTop: "20px",
                fontSize: "1.0625rem",
                lineHeight: 1.65,
                color: BODY,
                maxWidth: "620px",
              }}
            >
              Your winner seal, graphics and award statement are included with your award and are
              yours to keep. Download them below.
            </p>
            <p
              className="mx-auto"
              style={{
                marginTop: "12px",
                fontSize: "1rem",
                lineHeight: 1.65,
                color: MUTED,
                maxWidth: "620px",
              }}
            >
              You'll also find two optional additions: a published feature about your business, and
              a physical award for your desk or wall.
            </p>
          </Container>
        </section>

        {/* 2. Winner materials */}
        <section id="materials" className="pb-14 pt-6 md:pb-20 md:pt-10" style={{ scrollMarginTop: "24px" }}>
          <Container narrow={820}>
            <SectionHeading>Your winner materials</SectionHeading>
            <Body className="mt-3">
              Included with your award. Download them now and use them however you like.
            </Body>

            <ul
              className="mt-8 grid gap-px overflow-hidden"
              style={{ border: `1px solid ${LINE}`, borderRadius: "12px", backgroundColor: LINE }}
            >
              {materials.map((m) => (
                <li
                  key={m.id}
                  className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 bg-white px-5 py-4"
                >
                  <span style={{ fontSize: "0.9375rem", color: INK, fontWeight: 500 }}>
                    {m.title}{" "}
                    <span style={{ fontWeight: 400, color: MUTED }}>&mdash; {m.use}</span>
                  </span>
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      color: MUTED,
                      border: `1px solid ${LINE}`,
                      borderRadius: "6px",
                      padding: "2px 8px",
                    }}
                  >
                    {m.fileType}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <button
                type="button"
                data-event="asset-download"
                onClick={handleDownload}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-lg text-white transition-colors hover:bg-[#1568D0] sm:w-auto ${focusRing}`}
                style={{
                  minHeight: "48px",
                  padding: "0 24px",
                  backgroundColor: BLUE,
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                }}
              >
                <Download aria-hidden style={{ width: "16px", height: "16px" }} />
                Download your winner materials
              </button>
              <Small className="mt-3">
                Your award statement and certificate were sent in your award email.
              </Small>
              <Small className="mt-5" >
                Everything on this page above the paid options is included with your award and does
                not expire.
              </Small>
            </div>
          </Container>
        </section>

        {/* 3. Award statement */}
        <Section tint>
          <Container narrow={820}>
            <SectionHeading>Your award statement</SectionHeading>
            <Body className="mt-3">
              This is the short, official write-up of why your business was recognised. It was sent
              in your award email and is yours to use in proposals, on your site, or anywhere you
              share the award.
            </Body>

            <div
              className="mt-8"
              style={{
                backgroundColor: "#fff",
                border: `1px solid ${LINE}`,
                borderLeft: `3px solid ${BLUE}`,
                borderRadius: "10px",
                padding: "24px",
              }}
            >
              <p style={{ fontSize: "1rem", lineHeight: 1.75, color: INK, maxWidth: "640px" }}>
                {withSpecimenSlot(AWARD_STATEMENT_SPECIMEN)}
              </p>
            </div>
            <Small className="mt-3">Example wording. Yours is in your award email.</Small>
          </Container>
        </section>

        {/* 4. Winner's Feature */}
        <Section id="feature">
          <Container>
            <SectionHeading>
              A published feature about your business &mdash; {formatPrice(FEATURE_PRICE)}
            </SectionHeading>
            <Body className="mt-3">
              Your award statement is a paragraph. The Winner's Feature is a full article about your
              business, written by our editorial team and published at a permanent link you can send
              to anyone.
            </Body>

            <div className="mt-10">
              <FeatureMockup />
              <Link
                to="/winners/specimen"
                data-event="feature-format-view"
                className={`mt-4 inline-block rounded-sm ${focusRing}`}
                style={{ fontSize: "0.9375rem", color: BLUE, fontWeight: 500 }}
              >
                Read a full example &rarr;
              </Link>
            </div>

            <div className="mt-14">
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: INK,
                  letterSpacing: "-0.01em",
                }}
              >
                Where winners use their link
              </h3>
              <div className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                {linkUses.map((u) => (
                  <div key={u.label}>
                    <p style={{ fontSize: "0.9375rem", fontWeight: 500, color: INK }}>{u.label}</p>
                    <p style={{ fontSize: "0.875rem", lineHeight: 1.55, color: MUTED, marginTop: "4px" }}>
                      {u.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="mt-14"
              style={{
                border: `1px solid ${LINE}`,
                borderRadius: "12px",
                padding: "clamp(20px, 3vw, 32px)",
              }}
            >
              <h3
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: MUTED,
                }}
              >
                What's included
              </h3>
              <div className="mt-4">
                <DotList items={featureIncludes} />
              </div>
              <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <PriceLine amount={FEATURE_PRICE} />
                <FilledButton event="feature-order-click" onClick={handleSelect}>
                  Get your Winner's Feature
                </FilledButton>
              </div>
              <p style={{ marginTop: "16px", fontSize: "0.8125rem", color: MUTED }}>
                Nothing is published until you approve it &middot; Permanent link, no renewal fee
                &middot; Secure checkout
              </p>
            </div>
          </Container>
        </Section>

        {/* 5. How it works */}
        <Section tint>
          <Container>
            <SectionHeading>How it works</SectionHeading>
            <ol className="mt-8 grid gap-8 md:grid-cols-4">
              {processSteps.map((s) => (
                <li key={s.number}>
                  <span
                    className="inline-flex items-center justify-center"
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "999px",
                      backgroundColor: "#fff",
                      border: `1px solid ${LINE}`,
                      color: BLUE,
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                    }}
                  >
                    {s.number}
                  </span>
                  <p style={{ marginTop: "12px", fontSize: "1rem", fontWeight: 600, color: INK }}>
                    {s.title}
                  </p>
                  <p style={{ marginTop: "6px", fontSize: "0.9375rem", lineHeight: 1.55, color: BODY }}>
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>
            <Small className="mt-8">The review is the only part that needs your time.</Small>
          </Container>
        </Section>

        {/* 6. Commemorative award */}
        <Section id="commemorative">
          <Container>
            <div className="grid items-center gap-10 md:grid-cols-2">
              <img
                src={commemorativeAsset.url}
                alt="Engraved glass award plaque"
                loading="lazy"
                className="aspect-[3/2] w-full rounded-xl object-cover object-center max-sm:aspect-[4/3]"
              />
              <div>
                <SectionHeading>
                  A physical award for your desk or wall &mdash; {formatPrice(COMMEMORATIVE_PRICE)}
                </SectionHeading>
                <Body className="mt-3">
                  A designed physical version of your award, made to order and shipped to you.
                </Body>
                <h3
                  className="mt-7"
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: MUTED,
                  }}
                >
                  What's included
                </h3>
                <div className="mt-4">
                  <DotList items={commemorativeIncludes} />
                </div>
                <div className="mt-7">
                  <PriceLine amount={COMMEMORATIVE_PRICE} />
                </div>
                <div className="mt-5">
                  <OutlineButton event="commemorative-select-click" onClick={handleSelect}>
                    Order your commemorative award
                  </OutlineButton>
                </div>
                <p style={{ marginTop: "14px", fontSize: "0.8125rem", color: MUTED }}>
                  Made to order and shipped worldwide &middot; Secure checkout
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* 7. Questions */}
        <Section tint>
          <Container narrow={820}>
            <SectionHeading>Questions</SectionHeading>
            <Accordion type="single" collapsible className="mt-6 w-full">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`item-${i}`}
                  className="border-b-0"
                  style={{ borderTop: i === 0 ? "none" : `1px solid ${LINE}` }}
                >
                  <AccordionTrigger
                    className={`py-5 text-left hover:no-underline ${focusRing}`}
                    style={{ fontSize: "1rem", fontWeight: 500, color: INK }}
                  >
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p
                      style={{
                        fontSize: "0.9375rem",
                        lineHeight: 1.65,
                        color: BODY,
                        maxWidth: "640px",
                        paddingBottom: "8px",
                      }}
                    >
                      {f.a}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Container>
        </Section>

        {/* 8. Closing */}
        <Section>
          <Container narrow={820}>
            <SectionHeading>Ready when you are.</SectionHeading>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <FilledButton event="feature-order-click" onClick={handleSelect}>
                Get your Winner's Feature &mdash; {formatPrice(FEATURE_PRICE)}
              </FilledButton>
              <OutlineButton event="commemorative-select-click" onClick={handleSelect}>
                Order your commemorative award &mdash; {formatPrice(COMMEMORATIVE_PRICE)}
              </OutlineButton>
            </div>
            <p className="mt-6" style={{ fontSize: "0.875rem", color: MUTED }}>
              Just here for your free materials?{" "}
              <a href="#materials" className={`rounded-sm ${focusRing}`} style={{ color: BLUE }}>
                Download them &rarr;
              </a>
            </p>
          </Container>
        </Section>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${LINE}`, padding: "40px 0" }}>
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
