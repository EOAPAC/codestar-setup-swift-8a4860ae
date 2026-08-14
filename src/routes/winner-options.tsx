import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  Check,
  ChevronDown,
  Download,
  FileText,
  Handshake,
  Linkedin,
  Mail,
  MessageCircle,
  Mic,
  Star,
} from "lucide-react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AWARD_YEAR } from "@/content/award";

import markAsset from "@/assets/ea-mark.png.asset.json";
import sealAsset from "@/assets/ea-winner-seal-full-1200.png.asset.json";
import linkedinAsset from "@/assets/ea-winner-social-Linkedin_Post-2.png.asset.json";
import squareAsset from "@/assets/ea-winner-social-IG_Post-2.png.asset.json";
import storyAsset from "@/assets/ea-winner-social-IG_story-2.png.asset.json";
import signatureAsset from "@/assets/ea-winner-emailsig-full-600x200-2.png.asset.json";
import commemorativeAsset from "@/assets/commemorative-edition.jpg.asset.json";

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
const INK = "#0F172A";
const BODY = "#52606D";
const MUTED = "#6B7785";
const BLUE = "#1978E5";
const LINE = "#E5E9F0";
const TINT = "#F7F9FC";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1978E5]";

// Price constants — single source of truth for every price on the page.
const COMMEMORATIVE_PRICE = 195;
const FEATURE_PRICE = 595;
const formatPrice = (n: number) => `$${n.toLocaleString()}`;

// ---------------------------------------------------------------- data

type Material = {
  id: string;
  title: string;
  fileType: string;
  ratio: number;
  src: string;
  alt: string;
};

const materials: Material[] = [
  {
    id: "seal",
    title: "Winner seal",
    fileType: "PNG",
    ratio: 1,
    src: sealAsset.url,
    alt: `Entrepreneur Awards ${AWARD_YEAR} winner seal`,
  },
  {
    id: "banner",
    title: "LinkedIn banner",
    fileType: "PNG",
    ratio: 1200 / 630,
    src: linkedinAsset.url,
    alt: `Entrepreneur Awards ${AWARD_YEAR} winner LinkedIn banner`,
  },
  {
    id: "square",
    title: "Square social post",
    fileType: "PNG",
    ratio: 1,
    src: squareAsset.url,
    alt: `Entrepreneur Awards ${AWARD_YEAR} winner square social post`,
  },
  {
    id: "story",
    title: "Story graphic",
    fileType: "PNG",
    ratio: 9 / 16,
    src: storyAsset.url,
    alt: `Entrepreneur Awards ${AWARD_YEAR} winner story graphic`,
  },
  {
    id: "signature",
    title: "Email signature",
    fileType: "PNG",
    ratio: 3,
    src: signatureAsset.url,
    alt: `Entrepreneur Awards ${AWARD_YEAR} winner email signature`,
  },
];

const commemorativeIncludes = [
  "Engraved recognition object carrying your name, your award year and the wording of your award statement",
  "Printed presentation certificate of your Entrepreneur Award, prepared for framing or display",
];

const featureIncludes = [
  "A full written feature about your business",
  "Your review before publication",
  "Publication at a permanent Entrepreneur Awards address",
];

const processSteps = [
  {
    number: "01",
    title: "Order",
    body: "Choose the Winner's Feature. Nothing else is needed from you yet.",
  },
  {
    number: "02",
    title: "We write it",
    body: "We prepare the feature from your entry and your award statement. Your draft reaches you within 5 business days.",
  },
  {
    number: "03",
    title: "You review",
    body: "You read it, correct anything factual, and approve. Nothing is published without that approval.",
  },
  {
    number: "04",
    title: "Published",
    body: "Live at its permanent address within 3 business days of your approval. The link is yours from that moment.",
  },
];

const linkUses = [
  {
    icon: Mail,
    label: "Your email signature",
    body: "One line under your name, for every email you send.",
  },
  {
    icon: FileText,
    label: "A proposal or pitch deck",
    body: "A third-party page you can point to instead of describing yourself.",
  },
  {
    icon: Linkedin,
    label: "Your LinkedIn featured section",
    body: "Pinned to the top of your profile, permanently.",
  },
  {
    icon: Handshake,
    label: "An investor or board update",
    body: "Something written by someone other than you.",
  },
  {
    icon: Mic,
    label: "A speaker or contributor bio",
    body: "The link organizers and editors ask for.",
  },
  {
    icon: MessageCircle,
    label: 'The "so what do you do?" reply',
    body: "One URL that answers it properly.",
  },
];

const faqs = [
  {
    q: "What is the difference between my award statement and the feature?",
    a: "Your award statement is the short, formal wording explaining why your entry was selected. The feature is a fuller, optional piece about the business behind that recognition.",
  },
  {
    q: "Will I review the feature before it is published?",
    a: "Yes. The feature is shared with you for review and factual corrections before publication.",
  },
  {
    q: "Do I need to choose an edition to keep my Entrepreneur Award?",
    a: "No. Your selection, award statement, certificate, seal and winner graphics are included with your award and remain yours permanently.",
  },
  {
    q: "What is the difference between the Commemorative Edition and the Winner's Feature?",
    a: "The Commemorative Edition is the physical record — an engraved object and a printed certificate. The Winner's Feature is the published one — a written feature about your business at a permanent address. They are separate. Neither includes the other.",
  },
  {
    q: "Can I choose both?",
    a: "Yes. They are separate, so either can be chosen on its own, or both together. Neither is a level of the other, and neither changes the award you were given.",
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

export const AWARD_STATEMENT_SPECIMEN = `The ${AWARD_YEAR} Entrepreneur Award recognizes ‹Your Business› for building a service operation that grew without adding headcount, evidenced by client retention sustained across three consecutive years and a documented reduction in delivery time following the redesign of its intake process. Assessed on the measurable outcome, its consistency over time, and the founder's direct role in producing it.`;

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

function Section({
  children,
  tint,
  id,
  hero,
  className,
}: {
  children: React.ReactNode;
  tint?: boolean;
  id?: string;
  hero?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`${hero ? "ea-hero-pad" : "ea-section-pad"} ${className ?? ""}`}
      style={{ backgroundColor: tint ? TINT : "#FFFFFF", scrollMarginTop: "24px" }}
    >
      {children}
    </section>
  );
}

function Eyebrow({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p
      style={{
        fontSize: "0.6875rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        color: BLUE,
        ...style,
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

function FilledButton({
  children,
  onClick,
  event,
  full,
}: {
  children: React.ReactNode;
  onClick: () => void;
  event: string;
  full?: boolean;
}) {
  return (
    <button
      type="button"
      data-event={event}
      onClick={onClick}
      className={`rounded-lg text-white transition-colors hover:bg-[#1568D0] ${
        full ? "w-full" : "w-full sm:w-auto"
      } ${focusRing}`}
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

/** Three-item reassurance row under a primary button. */
function Reassurance({ items }: { items: string[] }) {
  return (
    <ul
      className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center"
      style={{ fontSize: "0.8125rem", color: MUTED }}
    >
      {items.map((item, i) => (
        <li key={item} className="flex items-center gap-2">
          {i > 0 && (
            <span
              aria-hidden
              className="hidden sm:block"
              style={{ width: "1px", height: "12px", backgroundColor: LINE, marginRight: "4px" }}
            />
          )}
          <Check aria-hidden style={{ width: "13px", height: "13px", color: BLUE }} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Thumbnail of the actual asset, drawn in its own aspect ratio. */
function AssetThumb({ ratio, src, alt }: { ratio: number; src: string; alt: string }) {
  const height = 44;
  return (
    <span
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-[6px]"
      style={{
        height: `${height}px`,
        width: `${Math.round(height * ratio)}px`,
        border: `1.5px solid ${BLUE}59`,
        backgroundColor: TINT,
      }}
    >
      <img src={src} alt={alt} loading="lazy" className="h-full w-full object-contain" />
    </span>
  );
}

function CommemorativeVisual() {
  return (
    <div
      className="w-full overflow-hidden rounded-xl bg-[#F7F9FC]"
      style={{ aspectRatio: "4 / 3", border: `1px solid ${LINE}` }}
    >
      <img
        src={commemorativeAsset.url}
        alt="Engraved glass recognition object from the Commemorative Edition"
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

/** Simple visual placeholder for the Winner's Feature — no browser frame. */
function FeatureVisual() {
  return (
    <div
      className="w-full overflow-hidden rounded-xl bg-[#F7F9FC]"
      style={{ aspectRatio: "4 / 3", border: `1px solid ${LINE}` }}
    >
      <div className="flex h-full flex-col items-center justify-center p-6 text-center">
        <span
          className="inline-flex items-center rounded-full px-3 py-1"
          style={{ backgroundColor: "#EAF2FD", color: BLUE, fontSize: "0.75rem", fontWeight: 600 }}
        >
          {AWARD_YEAR} Winner Feature
        </span>
        <p
          className="mt-4"
          style={{ fontSize: "1.0625rem", fontWeight: 600, lineHeight: 1.35, color: INK }}
        >
          A permanent written feature about your business
        </p>
        <p
          className="mt-2"
          style={{ fontSize: "0.8125rem", color: MUTED, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
        >
          entrepreneurawards.co/winners/<span style={{ color: BLUE }}>your-business</span>
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- confetti

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
          100% { transform: translateY(360px) translateX(var(--ea-drift, 0px)) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------- sticky bar

function useStickyCtaVisible() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      if (window.innerHeight < 480) {
        setVisible(false);
        return;
      }
      const comparison = document.getElementById("offer-cards");
      const footer = document.getElementById("page-footer");
      const finalCta = document.getElementById("final-cta");
      const pastComparison = comparison
        ? comparison.getBoundingClientRect().bottom < window.innerHeight * 0.9
        : false;
      const blockers = [footer, finalCta].filter(Boolean) as HTMLElement[];
      const blocked = blockers.some((el) => el.getBoundingClientRect().top < window.innerHeight);
      setVisible(pastComparison && !blocked);
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
  const stickyVisible = useStickyCtaVisible();
  const mainRef = useRef<HTMLElement>(null);

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
        .ea-section-pad { padding-top: 56px; padding-bottom: 56px; }
        .ea-hero-pad { padding-top: 48px; padding-bottom: 40px; }
        @media (min-width: 768px) {
          .ea-section-pad { padding-top: 80px; padding-bottom: 80px; }
          .ea-hero-pad { padding-top: 64px; padding-bottom: 48px; }
        }
        @media (min-width: 1024px) {
          .ea-section-pad { padding-top: 104px; padding-bottom: 104px; }
          .ea-hero-pad { padding-top: 80px; padding-bottom: 56px; }
        }
        .ea-rule-behind::before {
          content: "";
          position: absolute;
          left: 0; right: 0; top: 22px;
          height: 1px;
          background: ${LINE};
        }
        @media (max-width: 767px) { .ea-rule-behind::before { display: none; } }
        .feature-preview-url { white-space: nowrap; }
        @media (max-width: 639px) {
          .feature-preview-url { white-space: normal; word-break: break-word; }
          .feature-preview-split { flex-direction: column; }
          .feature-preview-image,
          .feature-preview-bars { width: 100% !important; }
        }
        @keyframes ea-chevron-loop {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        .ea-chevron { animation: ea-chevron-loop 2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ea-chevron { animation: none; }
          .ea-sticky { transition: none !important; }
        }
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

      <main ref={mainRef} style={{ paddingBottom: stickyVisible ? "0" : undefined }}>
        {/* Hero */}
        <Section hero className="relative overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div
              className="absolute left-1/2 top-[-14rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full blur-3xl"
              style={{ backgroundColor: `${BLUE}26` }}
            />
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
                backgroundSize: "22px 22px",
                color: INK,
              }}
            />
          </div>

          <Confetti />

          <Container narrow={768}>
            <div
              className="mx-auto flex flex-col items-center text-center"
              style={{ maxWidth: "720px" }}
            >
              <span
                className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ borderColor: `${BLUE}4D`, backgroundColor: BLUE, color: "#fff" }}
              >
                <Star className="h-3.5 w-3.5 fill-current" aria-hidden />
                {AWARD_YEAR} Entrepreneur Award
              </span>
              <h1
                style={{
                  marginTop: "20px",
                  fontSize: "clamp(2.25rem, 4.2vw, 3.25rem)",
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
                  marginTop: "16px",
                  fontSize: "1.0625rem",
                  lineHeight: 1.6,
                  color: BODY,
                  maxWidth: "600px",
                }}
              >
                Your award statement and certificate are in your award email. Your winner seal and
                graphics are below, and they are yours permanently.
              </p>

              <a
                href="#offer"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("offer");
                }}
                className={`mt-8 inline-flex flex-col items-center gap-1 rounded-md px-3 py-2 ${focusRing}`}
                style={{ color: BLUE }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                  }}
                >
                  Two ways to take it further
                </span>
                <ChevronDown className="ea-chevron h-4 w-4" aria-hidden />
              </a>
            </div>
          </Container>
        </Section>

        {/* Slim downloads pointer */}
        <Container>
          <div
            className="flex items-center gap-3 rounded-xl"
            style={{ border: `1px solid ${LINE}`, padding: "14px 18px" }}
          >
            <Download aria-hidden style={{ width: "16px", height: "16px", color: BLUE }} />
            <p style={{ fontSize: "0.9375rem", lineHeight: 1.5, color: BODY }}>
              Your winner seal and graphics are ready.{" "}
              <a
                href="#winner-materials"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("winner-materials");
                }}
                className={`rounded-sm underline underline-offset-2 ${focusRing}`}
                style={{ color: BLUE }}
              >
                Download the full kit
              </a>{" "}
              further down this page.
            </p>
          </div>
        </Container>

        {/* Section intro */}
        <Section id="offer" tint>
          <Container narrow={760}>
            <div className="flex flex-col items-center text-center">
              <Eyebrow>From here</Eyebrow>
              <SectionHeading className="mt-4">Two things the award can become.</SectionHeading>
              <p
                className="mt-5"
                style={{ fontSize: "1rem", lineHeight: 1.6, color: BODY, maxWidth: "640px" }}
              >
                Your seal, your graphics and your award statement are yours permanently, whatever
                you decide here. Neither of the following changes the award you were given.
              </p>
            </div>
          </Container>
        </Section>

        {/* Statement vs Feature */}
        <Section>
          <Container>
            <SectionHeading>What you already have, and what the Feature adds</SectionHeading>

            <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-2">
              <div className="flex flex-col">
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: MUTED,
                  }}
                >
                  Your award statement &middot; Included
                </p>
                <div
                  className="mt-3 rounded-xl"
                  style={{ border: `1px solid ${LINE}`, padding: "24px", backgroundColor: "#fff" }}
                >
                  <p style={{ fontSize: "16px", lineHeight: 1.65, color: "#1a1a1a" }}>
                    {AWARD_STATEMENT_SPECIMEN}
                  </p>
                </div>
                <p className="mt-3" style={{ fontSize: "0.8125rem", color: MUTED }}>
                  Specimen wording. Yours is in your award email.
                </p>
              </div>

              <div className="flex flex-col">
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: BLUE,
                  }}
                >
                  The Winner&rsquo;s Feature &middot; {formatPrice(FEATURE_PRICE)}
                </p>
                <div className="mt-3 rounded-xl" style={{ border: `1px solid ${LINE}`, padding: "24px", backgroundColor: "#fff" }}>
                  <p style={{ fontSize: "16px", lineHeight: 1.65, color: "#1a1a1a" }}>
                    A full written feature about your business, published at a permanent Entrepreneur Awards address. Sent to you for review before it goes live.
                  </p>
                  <a
                    href="/winners/specimen"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-event="feature-format-view"
                    className={`mt-4 inline-flex items-center gap-1 rounded-sm underline underline-offset-4 ${focusRing}`}
                    style={{ color: BLUE, fontSize: "0.9375rem", fontWeight: 500 }}
                  >
                    Read a full example &rarr;
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col items-center text-center">
              <p style={{ fontSize: "15px", lineHeight: 1.6, color: BODY, maxWidth: "640px" }}>
                You already have the one on the left. The Feature is the one on the right,
                published at a permanent address you can send to anyone who asks what you do.
              </p>
              <a
                href="/winners/specimen"
                target="_blank"
                rel="noopener noreferrer"
                data-event="feature-format-view"
                className={`mt-4 inline-flex items-center gap-1 rounded-sm underline underline-offset-4 ${focusRing}`}
                style={{ color: BLUE, fontSize: "0.9375rem", fontWeight: 500 }}
              >
                Read a full example &rarr;
              </a>
            </div>
          </Container>
        </Section>

        {/* Two-card comparison */}
        <Section id="offer-cards">
          <Container>
            <SectionHeading>One you can send. One you can hold.</SectionHeading>
            <Body className="mt-4">
              Both begin from the same award. The difference is what it becomes.
            </Body>

            <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[1.15fr_1fr]">
              {/* Winner's Feature */}
              <div
                className="flex h-full flex-col rounded-2xl bg-white"
                style={{
                  border: `1px solid ${BLUE}`,
                  padding: "32px",
                  boxShadow: "0 2px 10px rgba(25,120,229,0.08)",
                }}
              >
                <FeatureVisual />
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
                <p style={{ marginTop: "12px", fontSize: "1rem", lineHeight: 1.6, color: BODY }}>
                  A written feature about your business, prepared from your entry and your award
                  statement, reviewed by you, and published at a permanent Entrepreneur Awards
                  address you can share with anyone.
                </p>
                <div style={{ marginTop: "28px", height: "1px", backgroundColor: LINE }} />
                <div style={{ marginTop: "20px" }}>
                  <SubLabel>Included</SubLabel>
                </div>
                <div style={{ marginTop: "12px" }}>
                  <DotList items={featureIncludes} />
                </div>
                <div className="mt-auto" style={{ paddingTop: "24px" }}>
                  <p
                    style={{ fontSize: "1.75rem", fontWeight: 600, color: INK, lineHeight: 1.1 }}
                  >
                    {formatPrice(FEATURE_PRICE)}
                  </p>
                  <p style={{ marginTop: "6px", fontSize: "0.75rem", color: MUTED }}>
                    One-time payment
                  </p>
                  <div style={{ marginTop: "20px" }}>
                    <FilledButton full event="feature-order-click" onClick={handleSelect}>
                      Start my feature
                    </FilledButton>
                  </div>
                  <Reassurance
                    items={[
                      "Nothing is published until you approve it",
                      "Permanent address, no renewal fee",
                      "Secure checkout",
                    ]}
                  />
                </div>
              </div>

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
                <p style={{ marginTop: "12px", fontSize: "1rem", lineHeight: 1.6, color: BODY }}>
                  A designed physical edition of your award, made for a desk, a wall or a shelf —
                  so it is present in the room.
                </p>
                <div style={{ marginTop: "28px", height: "1px", backgroundColor: LINE }} />
                <div style={{ marginTop: "20px" }}>
                  <SubLabel>Included</SubLabel>
                </div>
                <div style={{ marginTop: "12px" }}>
                  <DotList items={commemorativeIncludes} />
                </div>
                <div className="mt-auto" style={{ paddingTop: "24px" }}>
                  <p
                    style={{ fontSize: "1.75rem", fontWeight: 600, color: INK, lineHeight: 1.1 }}
                  >
                    {formatPrice(COMMEMORATIVE_PRICE)}
                  </p>
                  <p style={{ marginTop: "6px", fontSize: "0.75rem", color: MUTED }}>
                    One-time payment
                  </p>
                  <div style={{ marginTop: "20px" }}>
                    <FilledButton full event="commemorative-select-click" onClick={handleSelect}>
                      Order the Commemorative Edition
                    </FilledButton>
                  </div>
                  <Reassurance
                    items={[
                      "Made to order and shipped to you",
                      "Your selection is already confirmed",
                      "Secure checkout",
                    ]}
                  />
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Detail: Winner's Feature */}
        <Section id="winners-feature" tint>
          <Container>
            <Eyebrow>The Winner&rsquo;s Feature</Eyebrow>
            <SectionHeading className="mt-4">
              A feature that gives the recognition a permanent home.
            </SectionHeading>
            <Body className="mt-5">
              We prepare a fuller feature from the material in your entry and your award statement,
              share it with you for review, and publish it at a permanent Entrepreneur Awards
              address.
            </Body>

            <div className="mt-14 grid gap-10 md:grid-cols-12 md:items-center">
              <div className="md:order-2 md:col-span-6 md:col-start-7">
                <FeatureVisual />
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
                  {formatPrice(FEATURE_PRICE)}
                </p>
                <p style={{ marginTop: "6px", fontSize: "0.75rem", color: MUTED }}>
                  One-time payment
                </p>
                <div style={{ marginTop: "20px" }}>
                  <FilledButton event="feature-order-click" onClick={handleSelect}>
                    Start my feature
                  </FilledButton>
                </div>
                <Reassurance
                  items={[
                    "Nothing is published until you approve it",
                    "Permanent address, no renewal fee",
                    "Secure checkout",
                  ]}
                />
              </div>
            </div>
          </Container>
        </Section>

        {/* Where the link goes */}
        <Section>
          <Container>
            <SubLabel as="h3">What you do with it</SubLabel>
            <SectionHeading className="mt-4">
              One link, wherever the question comes up.
            </SectionHeading>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {linkUses.map(({ icon: Icon, label, body }) => (
                <li
                  key={label}
                  className="rounded-xl"
                  style={{ border: `1px solid ${LINE}`, padding: "20px" }}
                >
                  <Icon aria-hidden style={{ width: "18px", height: "18px", color: BLUE }} />
                  <p
                    style={{
                      marginTop: "12px",
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      color: INK,
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      marginTop: "6px",
                      fontSize: "0.875rem",
                      lineHeight: 1.55,
                      color: MUTED,
                    }}
                  >
                    {body}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>

        {/* Detail: Commemorative Edition */}
        <Section id="commemorative-edition" tint>
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
                  <DotList items={commemorativeIncludes} />
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
                <p
                  style={{
                    marginTop: "32px",
                    fontSize: "1.75rem",
                    fontWeight: 600,
                    color: INK,
                    lineHeight: 1.1,
                  }}
                >
                  {formatPrice(COMMEMORATIVE_PRICE)}
                </p>
                <p style={{ marginTop: "6px", fontSize: "0.75rem", color: MUTED }}>
                  One-time payment
                </p>
                <div style={{ marginTop: "20px" }}>
                  <FilledButton event="commemorative-select-click" onClick={handleSelect}>
                    Order the Commemorative Edition
                  </FilledButton>
                </div>
                <Reassurance
                  items={[
                    "Made to order and shipped to you",
                    "Your selection is already confirmed",
                    "Secure checkout",
                  ]}
                />
              </div>
            </div>
          </Container>
        </Section>

        {/* Process */}
        <Section>
          <Container>
            <Eyebrow>The process</Eyebrow>
            <SectionHeading className="mt-4">From selection to published feature</SectionHeading>
            <ol className="ea-rule-behind relative mt-12 grid gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
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
            <p
              className="mt-12 text-center"
              style={{ fontSize: "14px", color: MUTED }}
            >
              The review is the only part that needs your time.
            </p>
          </Container>
        </Section>

        {/* Included materials — relocated */}
        <Section id="winner-materials" tint>
          <Container>
            <SectionHeading>Your included winner materials</SectionHeading>
            <Body className="mt-4">
              These materials are included with your selection and remain yours permanently.
            </Body>

            <div
              className="mt-10 overflow-hidden rounded-xl bg-white"
              style={{ border: `1px solid ${LINE}` }}
            >
              <ul className="grid grid-cols-1 min-[900px]:grid-flow-col min-[900px]:grid-cols-2 min-[900px]:grid-rows-3">
                {materials.map((m, i) => {
                  const lastInColumn = i === 2 || i === materials.length - 1;
                  return (
                    <li
                      key={m.id}
                      className={`flex items-center gap-4 ${
                        i < materials.length - 1 ? "border-b" : ""
                      } ${i < 3 ? "min-[900px]:border-r" : ""} ${
                        lastInColumn ? "min-[900px]:border-b-0" : ""
                      }`}
                      style={{ height: "72px", padding: "0 20px", borderColor: LINE }}
                    >
                      <AssetThumb ratio={m.ratio} src={m.src} alt={m.alt} />
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
              Your award statement and certificate were included in your award email. Your
              selection and winner materials remain unchanged whether or not you choose an edition
              above.
            </Small>
          </Container>
        </Section>

        {/* FAQ */}
        <Section>
          <Container narrow={720}>
            <SectionHeading>Questions about your award</SectionHeading>
            <Accordion
              type="multiple"
              defaultValue={["q0", "q1"]}
              className="mt-10 w-full"
            >
              {faqs.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`q${i}`}
                  className="border-b"
                  style={{ borderColor: LINE }}
                >
                  <AccordionTrigger
                    className="text-left hover:no-underline [&>svg]:size-4 [&>svg]:text-[#6B7785]"
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

        {/* Final CTA */}
        <Section id="final-cta" tint>
          <Container narrow={640}>
            <div className="flex flex-col items-center text-center">
              <SectionHeading>Ready when you are.</SectionHeading>
              <p
                className="mt-4"
                style={{ fontSize: "1.75rem", fontWeight: 600, color: INK, lineHeight: 1.1 }}
              >
                {formatPrice(FEATURE_PRICE)}
              </p>
              <div className="mt-6 w-full sm:w-auto">
                <FilledButton event="feature-order-click" onClick={handleSelect}>
                  Start my feature
                </FilledButton>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      {/* Sticky CTA bar */}
      <div
        className="ea-sticky fixed inset-x-0 bottom-0 z-40 max-[479px]:hidden"
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
          <div className="flex min-w-0 items-baseline gap-3">
            <span style={{ fontSize: "15px", fontWeight: 600, color: INK }}>
              The Winner&rsquo;s Feature
            </span>
            <span style={{ fontSize: "15px", color: MUTED }}>{formatPrice(FEATURE_PRICE)}</span>
            <span className="hidden truncate sm:inline" style={{ fontSize: "13px", color: MUTED }}>
              Published at a permanent address.
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <button
              type="button"
              data-event="commemorative-select-click"
              onClick={handleSelect}
              className={`hidden rounded-sm underline underline-offset-4 sm:inline ${focusRing}`}
              style={{ fontSize: "13px", color: MUTED }}
            >
              Commemorative Edition {formatPrice(COMMEMORATIVE_PRICE)}
            </button>
            <button
              type="button"
              data-event="feature-order-click"
              onClick={handleSelect}
              className={`rounded-lg text-white transition-colors hover:bg-[#1568D0] ${focusRing}`}
              style={{
                height: "40px",
                padding: "0 18px",
                backgroundColor: BLUE,
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              Start my feature
            </button>
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
