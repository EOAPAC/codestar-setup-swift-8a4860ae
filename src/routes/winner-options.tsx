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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import markAsset from "@/assets/ea-mark.png.asset.json";

export const Route = createFileRoute("/winner-options")({
  head: () => ({
    meta: [
      { title: "Your Winner Materials | Entrepreneur Awards" },
      {
        name: "description",
        content:
          "Your award statement, certificate and winner materials, plus two optional ways to preserve your Entrepreneur Award recognition.",
      },
      { property: "og:title", content: "Your Winner Materials | Entrepreneur Awards" },
      {
        property: "og:description",
        content:
          "Your award statement, certificate and winner materials, plus two optional ways to preserve your Entrepreneur Award recognition.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WinnerOptionsPage,
});

// ------------------------------------------------------------- tokens
// Exact values from the design pass. Kept local to this page.
const INK = "#0F172A";
const BODY = "#52606D";
const MUTED = "#7A8794";
const BLUE = "#1978E5";
const LINE = "#E6EAF0";
const TINT = "#F7F9FC";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1978E5]";

// ---------------------------------------------------------------- data

type Material = {
  id: string;
  title: string;
  fileType: string;
  /** width / height of the asset itself, used to draw the outline thumbnail */
  ratio: number;
};

const materials: Material[] = [
  { id: "certificate", title: "Digital winner certificate", fileType: "PDF", ratio: 1 / 1.414 },
  { id: "seal", title: "Winner seal", fileType: "PNG", ratio: 1 },
  { id: "banner", title: "LinkedIn banner", fileType: "PNG", ratio: 1200 / 630 },
  { id: "square", title: "Square social post", fileType: "PNG", ratio: 1 },
  { id: "story", title: "Story graphic", fileType: "PNG", ratio: 9 / 16 },
  { id: "signature", title: "Email signature", fileType: "PNG", ratio: 3 },
];

const commemorativeIncludes = [
  "Engraved recognition object with your name and award year",
  "Printed presentation certificate carrying your award statement",
];

const commemorativeIncludesDetailed = [
  "Engraved recognition object personalised with your name and award year",
  "Printed presentation certificate carrying your award statement",
];

const featureIncludes = [
  "A full written feature about your business",
  "Your review before publication",
  "Publication at a permanent Entrepreneur Awards address",
  "A printed edition of your feature, with the address printed on it",
];

const processSteps = [
  { number: "01", title: "Order", body: "Choose the Winner's Feature." },
  {
    number: "02",
    title: "Review",
    body: "We prepare the feature from your entry and your award statement, then send it for your review and factual corrections.",
  },
  {
    number: "03",
    title: "Publish and present",
    body: "After approval, the feature is published at its permanent address and your printed edition is prepared.",
  },
];

const faqs = [
  {
    q: "Do I need to choose an edition to keep my Entrepreneur Award?",
    a: "No. Your selection, award statement, certificate, seal and winner graphics are included with your award and remain yours permanently.",
  },
  {
    q: "What is the difference between the Commemorative Edition and the Winner's Feature?",
    a: "The Commemorative Edition is the physical record — an engraved object and a printed certificate. The Winner's Feature is the published one — a written feature about your business at a permanent address, with a printed edition of it. They are separate. Neither includes the other.",
  },
  {
    q: "Can I choose both?",
    a: "Yes. They are separate, so either can be chosen on its own or both together. Neither is a level of the other, and neither changes the award you were given.",
  },
  {
    q: "What is the difference between my award statement and the feature?",
    a: "Your award statement is the short, formal wording explaining why your entry was selected. The feature is a fuller, optional piece about the business behind that recognition.",
  },
  {
    q: "Will I review the feature before it is published?",
    a: "Yes. The feature is sent to you for review and factual corrections before publication.",
  },
  {
    q: "Where will the feature be published?",
    a: "It will be published at a permanent Entrepreneur Awards URL in the format entrepreneurawards.co/winners/[name].",
  },
  {
    q: "Does choosing an edition change my award?",
    a: "No. Each edition is separate from the award itself. Your Entrepreneur Award remains exactly the same whether you choose an edition or not.",
  },
];

// ------------------------------------------------------------ utilities

function scrollToId(id: string) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
}

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
      className={`mx-auto w-full px-6 max-md:px-10 ${className ?? ""}`}
      style={{ maxWidth: narrow ? `${narrow}px` : "1120px" }}
    >
      {children}
    </div>
  );
}

/** Section padding: 128 / 88 / 64 with a hero override. */
function Section({
  children,
  tint,
  id,
  hero,
}: {
  children: React.ReactNode;
  tint?: boolean;
  id?: string;
  hero?: boolean;
}) {
  return (
    <section
      id={id}
      className={hero ? "ea-hero-pad" : "ea-section-pad"}
      style={{ backgroundColor: tint ? TINT : "#FFFFFF", scrollMarginTop: "24px" }}
    >
      {children}
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: "0.6875rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        color: BLUE,
      }}
    >
      {children}
    </p>
  );
}

function SectionHeading({
  children,
  className,
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h2" | "h3";
}) {
  return (
    <Tag
      className={className}
      style={{
        fontSize: "clamp(1.75rem, 2.6vw, 2.375rem)",
        fontWeight: 600,
        lineHeight: 1.15,
        letterSpacing: "-0.015em",
        color: INK,
        maxWidth: "720px",
      }}
    >
      {children}
    </Tag>
  );
}

function SubLabel({ children, as: Tag = "h4" }: { children: React.ReactNode; as?: "h3" | "h4" }) {
  return (
    <Tag
      style={{
        fontSize: "0.75rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        color: MUTED,
      }}
    >
      {children}
    </Tag>
  );
}

function Body({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={className}
      style={{ fontSize: "1rem", lineHeight: 1.6, color: BODY, maxWidth: "640px" }}
    >
      {children}
    </p>
  );
}

function Small({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={className}
      style={{ fontSize: "0.875rem", lineHeight: 1.55, color: MUTED, maxWidth: "640px" }}
    >
      {children}
    </p>
  );
}

function DotList({ items }: { items: string[] }) {
  return (
    <ul style={{ display: "grid", gap: "8px" }}>
      {items.map((item) => (
        <li
          key={item}
          style={{
            display: "flex",
            gap: "12px",
            fontSize: "0.9375rem",
            lineHeight: 1.5,
            color: BODY,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              marginTop: "0.55em",
              flex: "0 0 auto",
              width: "5px",
              height: "5px",
              borderRadius: "9999px",
              backgroundColor: BLUE,
              opacity: 0.4,
            }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function GhostDownload({ id, onClick }: { id: string; onClick: () => void }) {
  return (
    <button
      type="button"
      data-event="asset-download"
      data-asset={id}
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-2 rounded-lg bg-transparent transition-colors hover:bg-[#F7F9FC] ${focusRing}`}
      style={{
        height: "32px",
        padding: "0 12px",
        border: `1px solid ${LINE}`,
        fontSize: "0.8125rem",
        color: BODY,
      }}
    >
      <Download style={{ width: "14px", height: "14px" }} aria-hidden="true" />
      Download
    </button>
  );
}

function SecondaryButton({
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
      className={`w-full rounded-lg bg-transparent transition-colors hover:bg-[#1978E5]/[0.06] ${focusRing}`}
      style={{
        height: "44px",
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
        height: "48px",
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

/** Outline thumbnail drawn in the asset's own aspect ratio. */
function AssetThumb({ ratio }: { ratio: number }) {
  const height = 44;
  return (
    <span
      aria-hidden="true"
      className="block shrink-0 rounded-[6px]"
      style={{
        height: `${height}px`,
        width: `${Math.round(height * ratio)}px`,
        border: `1.5px solid ${BLUE}59`,
        backgroundColor: TINT,
      }}
    />
  );
}

/** Abstract composition standing in for the physical edition. */
function CommemorativeVisual() {
  return (
    <div
      role="img"
      aria-label="Composition representing the Commemorative Edition contents"
      className="w-full overflow-hidden rounded-xl"
      style={{ aspectRatio: "4 / 3", border: `1px solid ${LINE}`, backgroundColor: TINT }}
    >
      <div className="flex h-full w-full items-end justify-center gap-[4%] px-[8%] pb-[10%]">
        {/* engraved recognition object */}
        <div className="flex h-[62%] w-[16%] flex-col items-center justify-end gap-1">
          <div
            className="w-full flex-1 rounded-t-[3px]"
            style={{ border: `1.5px solid ${BLUE}59`, backgroundColor: "#fff" }}
          />
          <div
            className="h-[8%] w-[125%] rounded-[2px]"
            style={{ border: `1.5px solid ${BLUE}59`, backgroundColor: "#fff", minHeight: "6px" }}
          />
        </div>
        {/* printed certificate */}
        <div
          className="flex h-[80%] w-[22%] flex-col gap-[6px] rounded-[4px] p-[8px]"
          style={{ border: `1.5px solid ${BLUE}59`, backgroundColor: "#fff" }}
        >
          <span className="h-[4px] w-2/3 rounded-full" style={{ backgroundColor: LINE }} />
          <span className="h-[4px] w-full rounded-full" style={{ backgroundColor: LINE }} />
          <span className="h-[4px] w-5/6 rounded-full" style={{ backgroundColor: LINE }} />
          <span
            className="mt-auto h-[4px] w-1/2 rounded-full"
            style={{ backgroundColor: LINE }}
          />
        </div>
        {/* citation card */}
        <div
          className="flex h-[52%] w-[20%] flex-col gap-[6px] rounded-[4px] p-[8px]"
          style={{ border: `1.5px solid ${BLUE}59`, backgroundColor: "#fff" }}
        >
          <span className="h-[4px] w-1/2 rounded-full" style={{ backgroundColor: LINE }} />
          <span className="h-[4px] w-full rounded-full" style={{ backgroundColor: LINE }} />
          <span className="h-[4px] w-3/4 rounded-full" style={{ backgroundColor: LINE }} />
        </div>
        {/* presentation card */}
        <div
          className="flex h-[34%] w-[18%] flex-col gap-[6px] rounded-[4px] p-[8px]"
          style={{ border: `1.5px solid ${BLUE}59`, backgroundColor: "#fff" }}
        >
          <span className="h-[4px] w-2/3 rounded-full" style={{ backgroundColor: LINE }} />
          <span className="h-[4px] w-1/2 rounded-full" style={{ backgroundColor: LINE }} />
        </div>
      </div>
    </div>
  );
}

/** Miniature browser frame containing the published feature layout. */
function FeatureSpecimen({ bodyBars = 7 }: { bodyBars?: number }) {
  return (
    <div
      role="img"
      aria-label="Browser frame showing the layout of a published feature page"
      className="w-full overflow-hidden rounded-xl"
      style={{ border: `1px solid ${LINE}`, backgroundColor: "#fff" }}
    >
      {/* browser bar */}
      <div
        className="relative flex items-center px-3"
        style={{ height: "28px", borderBottom: `1px solid ${LINE}`, backgroundColor: TINT }}
      >
        <span className="flex gap-[6px]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block rounded-full"
              style={{ width: "8px", height: "8px", backgroundColor: LINE }}
            />
          ))}
        </span>
        <span
          className="absolute left-1/2 -translate-x-1/2 font-mono"
          style={{ fontSize: "0.6875rem", color: MUTED }}
        >
          entrepreneurawards.co/winners/[name]
        </span>
      </div>
      {/* specimen page */}
      <div
        className="flex flex-col gap-[10px] px-[7%] py-[6%]"
        style={{ aspectRatio: "16 / 10" }}
      >
        <div className="flex items-center justify-between">
          <span style={{ fontSize: "0.625rem", fontWeight: 600, color: INK }}>
            Entrepreneur Awards
          </span>
          <span className="h-[4px] w-[52px] rounded-full" style={{ backgroundColor: LINE }} />
        </div>
        <div className="flex flex-col gap-[6px] pt-[2%]">
          <span className="h-[10px] w-[88%] rounded-[3px]" style={{ backgroundColor: LINE }} />
          <span className="h-[10px] w-[70%] rounded-[3px]" style={{ backgroundColor: LINE }} />
          <span className="h-[10px] w-[44%] rounded-[3px]" style={{ backgroundColor: LINE }} />
        </div>
        <div
          className="w-full min-h-0 flex-1 rounded-[6px]"
          style={{ border: `1.5px solid ${BLUE}59` }}
        />
        <div className="flex flex-col gap-[6px]">
          {Array.from({ length: bodyBars }).map((_, i) => (
            <span
              key={i}
              className="rounded-full"
              style={{
                height: "4px",
                width: i === bodyBars - 1 ? "58%" : i % 3 === 1 ? "92%" : "100%",
                backgroundColor: LINE,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- page

function WinnerOptionsPage() {
  useEffect(() => {
    // analytics-ready page view marker
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
        .ea-section-pad { padding-top: 64px; padding-bottom: 64px; }
        .ea-hero-pad { padding-top: 64px; padding-bottom: 64px; }
        @media (min-width: 768px) {
          .ea-section-pad { padding-top: 88px; padding-bottom: 88px; }
          .ea-hero-pad { padding-top: 104px; padding-bottom: 88px; }
        }
        @media (min-width: 1024px) {
          .ea-section-pad { padding-top: 128px; padding-bottom: 128px; }
          .ea-hero-pad { padding-top: 160px; padding-bottom: 128px; }
        }
        .ea-rule-behind::before {
          content: "";
          position: absolute;
          left: 0; right: 0; top: 22px;
          height: 1px;
          background: ${LINE};
        }
        @media (max-width: 767px) { .ea-rule-behind::before { display: none; } }
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
        {/* Hero — white, centred, very generous */}
        <Section hero>
          <Container narrow={768}>
            <div className="mx-auto flex flex-col items-center text-center" style={{ maxWidth: "720px" }}>
              <span aria-hidden="true" style={{ marginBottom: "40px" }}>
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                  <circle cx="36" cy="36" r="35" stroke={BLUE} strokeOpacity="0.3" />
                  <circle cx="36" cy="36" r="20" stroke={BLUE} strokeOpacity="0.55" />
                  <circle cx="36" cy="36" r="6" fill={BLUE} />
                </svg>
              </span>
              <Eyebrow>Entrepreneur Awards</Eyebrow>
              <h1
                style={{
                  marginTop: "24px",
                  fontSize: "clamp(2.75rem, 5vw, 4rem)",
                  fontWeight: 600,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  color: INK,
                }}
              >
                Your selection is confirmed.
              </h1>
              <p
                style={{
                  marginTop: "20px",
                  fontSize: "1.125rem",
                  lineHeight: 1.6,
                  color: MUTED,
                  maxWidth: "640px",
                }}
              >
                Your award statement &mdash; the short, formal lines explaining what was
                assessed and why your entry was selected &mdash; is included in your award email.
                Your certificate, winner seal and graphics are available below.
              </p>
            </div>
          </Container>
        </Section>

        {/* Included materials — white, compact list, left aligned */}
        <Section>
          <Container>
            <SectionHeading>Your included winner materials</SectionHeading>
            <Body className="mt-4">
              These materials are included with your selection and remain yours permanently.
            </Body>

            <div
              className="mt-10 overflow-hidden rounded-xl"
              style={{ border: `1px solid ${LINE}` }}
            >
              <ul className="grid grid-cols-1 min-[900px]:grid-flow-col min-[900px]:grid-cols-2 min-[900px]:grid-rows-3">
                {materials.map((m, i) => {
                  const lastInColumn = i === 2 || i === 5;
                  return (
                    <li
                      key={m.id}
                      className={`flex items-center gap-4 ${i < 5 ? "border-b" : ""} ${
                        i < 3 ? "min-[900px]:border-r" : ""
                      } ${lastInColumn ? "min-[900px]:border-b-0" : ""}`}
                      style={{ height: "72px", padding: "0 20px", borderColor: LINE }}
                    >
                      <AssetThumb ratio={m.ratio} />
                      <span
                        style={{ fontSize: "0.9375rem", fontWeight: 500, color: INK }}
                        className="truncate"
                      >
                        {m.title}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: MUTED }}>{m.fileType}</span>
                      <span className="ml-auto">
                        <GhostDownload id={m.id} onClick={handleDownload} />
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <Small className="mt-6">
              Your award statement was included in your award email. Your selection and winner
              materials remain unchanged whether or not you choose an optional edition below.
            </Small>
          </Container>
        </Section>

        {/* Transition — tinted, centred, narrow */}
        <Section tint>
          <Container narrow={720}>
            <div className="flex flex-col items-center text-center">
              <Eyebrow>From here</Eyebrow>
              <SectionHeading className="mt-4">
                Right now, all of it lives on a screen.
              </SectionHeading>
              <p
                className="mt-5"
                style={{ fontSize: "1rem", lineHeight: 1.6, color: BODY, maxWidth: "640px" }}
              >
                Your seal, your graphics and your award statement are yours permanently. They are also, all of
                them, digital — a folder on your computer and a few lines in your inbox. There are two ways to
                change that. One puts the award somewhere you can see it. The other puts it somewhere other
                people can find it.
              </p>
              <p
                className="mt-4"
                style={{ fontSize: "0.875rem", lineHeight: 1.55, color: MUTED }}
              >
                Neither changes the award you were given.
              </p>
            </div>
          </Container>
        </Section>

        {/* Comparison — white, two columns */}
        <Section>
          <Container>
            <SectionHeading>Two ways to take it off the screen</SectionHeading>
            <Body className="mt-4">
              Both begin from the same award. The difference is where it ends up.
            </Body>

            <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-2">
              {/* Commemorative Edition */}
              <div
                className="flex h-full flex-col rounded-2xl bg-white"
                style={{ border: `1px solid ${LINE}`, padding: "32px" }}
              >
                <CommemorativeVisual />
                <div style={{ marginTop: "24px" }}>
                  <Eyebrow>Commemorative Edition</Eyebrow>
                </div>
                <h3
                  style={{
                    marginTop: "12px",
                    fontSize: "1.375rem",
                    fontWeight: 600,
                    lineHeight: 1.25,
                    color: INK,
                  }}
                >
                  Somewhere you can see it.
                </h3>
                <p
                  style={{ marginTop: "12px", fontSize: "1rem", lineHeight: 1.6, color: BODY }}
                >
                  A designed physical edition of your award, made for a desk, a wall or a shelf — so it is
                  present in the room rather than filed on a drive.
                </p>
                <div style={{ marginTop: "28px", height: "1px", backgroundColor: LINE }} />
                <div style={{ marginTop: "20px" }}>
                  <SubLabel>Included</SubLabel>
                </div>
                <div style={{ marginTop: "12px" }}>
                  <DotList items={commemorativeIncludes} />
                </div>
                <p
                  style={{
                    marginTop: "24px",
                    fontSize: "0.875rem",
                    lineHeight: 1.55,
                    color: MUTED,
                  }}
                >
                  The award you already have, in a form you can hand to someone.
                </p>
                <div className="mt-auto" style={{ paddingTop: "24px" }}>
                  <p style={{ fontSize: "0.75rem", color: MUTED }}>One-time payment</p>
                  <div style={{ marginTop: "20px" }}>
                    <SecondaryButton
                      event="commemorative-explore"
                      onClick={() => scrollToId("commemorative-edition")}
                    >
                      Explore the Commemorative Edition
                    </SecondaryButton>
                  </div>
                </div>
              </div>

              {/* Winner's Feature */}
              <div
                className="flex h-full flex-col rounded-2xl bg-white"
                style={{ border: `1px solid ${LINE}`, padding: "32px" }}
              >
                <FeatureSpecimen bodyBars={6} />
                <div style={{ marginTop: "24px" }}>
                  <Eyebrow>The Winner&rsquo;s Feature</Eyebrow>
                </div>
                <h3
                  style={{
                    marginTop: "12px",
                    fontSize: "1.375rem",
                    fontWeight: 600,
                    lineHeight: 1.25,
                    color: INK,
                  }}
                >
                  Somewhere people can find it.
                </h3>
                <p
                  style={{ marginTop: "12px", fontSize: "1rem", lineHeight: 1.6, color: BODY }}
                >
                  A written feature about your business, prepared from your entry and your award statement,
                  reviewed by you, and published at a permanent Entrepreneur Awards address you can send to
                  anyone.
                </p>
                <div style={{ marginTop: "28px", height: "1px", backgroundColor: LINE }} />
                <div style={{ marginTop: "20px" }}>
                  <SubLabel>Included</SubLabel>
                </div>
                <div style={{ marginTop: "12px" }}>
                  <DotList items={featureIncludes} />
                </div>
                <p
                  style={{
                    marginTop: "24px",
                    fontSize: "0.875rem",
                    lineHeight: 1.55,
                    color: MUTED,
                  }}
                >
                  An address you can point people to, for as long as you need it.
                </p>
                <div className="mt-auto" style={{ paddingTop: "24px" }}>
                  <p style={{ fontSize: "1.75rem", fontWeight: 600, color: INK, lineHeight: 1.1 }}>
                    $595
                  </p>
                  <p style={{ marginTop: "6px", fontSize: "0.75rem", color: MUTED }}>
                    One-time payment
                  </p>
                  <div style={{ marginTop: "20px" }}>
                    <SecondaryButton
                      event="feature-explore"
                      onClick={() => scrollToId("winners-feature")}
                    >
                      Explore the Winner&rsquo;s Feature
                    </SecondaryButton>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Detail: Commemorative Edition — white, visual left */}
        <Section id="commemorative-edition">
          <Container>
            <Eyebrow>Commemorative Edition</Eyebrow>
            <SectionHeading className="mt-4">
              A physical way to keep the recognition present.
            </SectionHeading>
            <Body className="mt-5">
              The Commemorative Edition brings your Entrepreneur Award together as a designed
              physical presentation for your workspace, home or team.
            </Body>

            <div className="mt-14 grid gap-10 md:grid-cols-12 md:items-center">
              <div className="md:col-span-6">
                <CommemorativeVisual />
              </div>
              <div className="md:col-span-5 md:col-start-8">
                <SubLabel as="h3">What it includes</SubLabel>
                <div style={{ marginTop: "20px" }}>
                  <DotList items={commemorativeIncludesDetailed} />
                </div>
                <p
                  style={{
                    marginTop: "28px",
                    fontSize: "0.875rem",
                    lineHeight: 1.55,
                    color: MUTED,
                  }}
                >
                  Your digital certificate, winner seal and winner graphics remain included with
                  your selection.
                </p>
                <p style={{ marginTop: "32px", fontSize: "0.75rem", color: MUTED }}>
                  One-time payment
                </p>
                <div style={{ marginTop: "20px" }}>
                  <FilledButton event="commemorative-select-click" onClick={handleSelect}>
                    Select the Commemorative Edition
                  </FilledButton>
                </div>
                <p style={{ marginTop: "12px", fontSize: "0.8125rem", color: MUTED }}>
                  Optional. Your selection remains unchanged.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* Detail: Winner's Feature — tinted, visual right */}
        <Section id="winners-feature" tint>
          <Container>
            <Eyebrow>The Winner&rsquo;s Feature</Eyebrow>
            <SectionHeading className="mt-4">
              A feature that gives the recognition a permanent home.
            </SectionHeading>
            <Body className="mt-5">
              We prepare a fuller feature from the material in your entry and your award
              statement, send
              it to you for review, publish it at a permanent Entrepreneur Awards URL, and prepare
              a physical commemorative edition.
            </Body>

            <div className="mt-14 grid gap-10 md:grid-cols-12 md:items-center">
              <div className="md:order-2 md:col-span-6 md:col-start-7">
                <FeatureSpecimen bodyBars={8} />
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      data-event="feature-format-view"
                      className={`rounded-sm ${focusRing}`}
                      style={{
                        marginTop: "16px",
                        color: BLUE,
                        fontSize: "0.875rem",
                        textDecoration: "underline",
                        textDecorationColor: `${BLUE}80`,
                        textUnderlineOffset: "3px",
                      }}
                    >
                      View the feature format
                    </button>
                  </DialogTrigger>
                  <DialogContent
                    className="max-h-[85vh] overflow-y-auto rounded-2xl bg-white sm:max-w-[880px]"
                    style={{ padding: "40px", borderColor: LINE }}
                  >
                    <DialogHeader>
                      <DialogTitle style={{ color: INK }}>Feature format specimen</DialogTitle>
                    </DialogHeader>
                    <div style={{ marginTop: "8px" }}>
                      <FeatureSpecimen bodyBars={8} />
                    </div>
                    <p
                      className="text-center"
                      style={{ fontSize: "0.8125rem", color: MUTED, marginTop: "16px" }}
                    >
                      This specimen shows the format and presentation of a Winner&rsquo;s Feature.
                      It is not presented as a real award winner.
                    </p>
                    <DialogClose asChild>
                      <button
                        type="button"
                        className={`mx-auto rounded-lg bg-transparent transition-colors hover:bg-[#F7F9FC] ${focusRing}`}
                        style={{
                          marginTop: "16px",
                          height: "40px",
                          padding: "0 20px",
                          border: `1px solid ${LINE}`,
                          fontSize: "0.875rem",
                          color: BODY,
                        }}
                      >
                        Close
                      </button>
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="md:order-1 md:col-span-5">
                <SubLabel as="h3">What it includes</SubLabel>
                <div style={{ marginTop: "20px" }}>
                  <DotList items={featureIncludes} />
                </div>
                <p
                  style={{
                    marginTop: "28px",
                    fontSize: "0.875rem",
                    lineHeight: 1.55,
                    color: MUTED,
                  }}
                >
                  Your selection and included winner materials remain yours whether or not you
                  choose the Winner&rsquo;s Feature.
                </p>
                <p
                  style={{
                    marginTop: "32px",
                    fontSize: "1.75rem",
                    fontWeight: 600,
                    color: INK,
                    lineHeight: 1.1,
                  }}
                >
                  $595
                </p>
                <p style={{ marginTop: "6px", fontSize: "0.75rem", color: MUTED }}>
                  One-time payment
                </p>
                <div style={{ marginTop: "20px" }}>
                  <FilledButton event="feature-order-click" onClick={handleSelect}>
                    Order the Winner&rsquo;s Feature
                  </FilledButton>
                </div>
                <p style={{ marginTop: "12px", fontSize: "0.8125rem", color: MUTED }}>
                  Optional. Your selection remains unchanged.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* Process — white, three-step row */}
        <Section>
          <Container>
            <Eyebrow>The process</Eyebrow>
            <SectionHeading className="mt-4">From selection to published feature</SectionHeading>
            <ol className="ea-rule-behind relative mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
              {processSteps.map((step) => (
                <li key={step.number}>
                  <span
                    className="inline-block bg-white"
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: 600,
                      lineHeight: 1,
                      color: BLUE,
                      opacity: 0.22,
                      padding: "0 24px",
                      marginLeft: "-24px",
                    }}
                  >
                    {step.number}
                  </span>
                  <h3
                    style={{
                      marginTop: "20px",
                      fontSize: "1.0625rem",
                      fontWeight: 600,
                      color: INK,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      marginTop: "8px",
                      fontSize: "0.9375rem",
                      lineHeight: 1.55,
                      color: MUTED,
                    }}
                  >
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </Container>
        </Section>

        {/* FAQ — white, single column, centred */}
        <Section>
          <Container narrow={720}>
            <SectionHeading>Questions about your award</SectionHeading>
            <Accordion type="single" collapsible className="mt-10 w-full">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`q${i}`}
                  className="border-b"
                  style={{ borderColor: LINE }}
                >
                  <AccordionTrigger
                    className="text-left hover:no-underline [&>svg]:size-4 [&>svg]:text-[#7A8794]"
                    style={{
                      paddingTop: "24px",
                      paddingBottom: "24px",
                      fontSize: "1.0625rem",
                      fontWeight: 500,
                      color: INK,
                    }}
                  >
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent
                    style={{
                      paddingTop: "8px",
                      paddingBottom: "24px",
                      fontSize: "0.9375rem",
                      lineHeight: 1.65,
                      color: MUTED,
                    }}
                  >
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
