import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, type CSSProperties } from "react";
import { Download, Star } from "lucide-react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import markAsset from "@/assets/ea-mark.png.asset.json";
import sealAsset from "@/assets/ea-winner-seal-full-1200.png.asset.json";
import linkedinAsset from "@/assets/ea-winner-social-Linkedin_Post-2.png.asset.json";
import squareAsset from "@/assets/ea-winner-social-IG_Post-2.png.asset.json";
import storyAsset from "@/assets/ea-winner-social-IG_story-2.png.asset.json";
import signatureAsset from "@/assets/ea-winner-emailsig-full-600x200-2.png.asset.json";

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
  /** width / height of the asset itself, used to size the thumbnail */
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
    alt: "Entrepreneur Awards 2026 winner seal",
  },
  {
    id: "banner",
    title: "LinkedIn banner",
    fileType: "PNG",
    ratio: 1200 / 630,
    src: linkedinAsset.url,
    alt: "Entrepreneur Awards 2026 winner LinkedIn banner",
  },
  {
    id: "square",
    title: "Square social post",
    fileType: "PNG",
    ratio: 1,
    src: squareAsset.url,
    alt: "Entrepreneur Awards 2026 winner square social post",
  },
  {
    id: "story",
    title: "Story graphic",
    fileType: "PNG",
    ratio: 9 / 16,
    src: storyAsset.url,
    alt: "Entrepreneur Awards 2026 winner story graphic",
  },
  {
    id: "signature",
    title: "Email signature",
    fileType: "PNG",
    ratio: 3,
    src: signatureAsset.url,
    alt: "Entrepreneur Awards 2026 winner email signature",
  },
];


const commemorativeIncludes = [
  "Engraved recognition object carrying your name, your award year and the wording of your award statement",
  "Printed presentation certificate of your Entrepreneur Award, prepared for framing or display",
];

const commemorativeIncludesDetailed = [
  "Engraved recognition object carrying your name, your award year and the wording of your award statement",
  "Printed presentation certificate of your Entrepreneur Award, prepared for framing or display",
];

const featureIncludes = [
  "A full written feature about your business",
  "Your review before publication",
  "Publication at a permanent Entrepreneur Awards address",
];

const processSteps = [
  { number: "01", title: "Order", body: "Choose the Winner's Feature." },
  {
    number: "02",
    title: "Review",
    body: "We prepare the feature from your entry and your award statement, then share it for your review and factual corrections.",
  },
  {
    number: "03",
    title: "Publish and present",
    body: "After approval, the feature is published at its permanent address and the link is yours to use.",
  },
];

const faqs = [
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
    a: "Yes. They are separate, so either can be chosen on its own, or both together. The Commemorative Edition is a physical record; the Winner's Feature is a published one. Neither is a level of the other, and neither changes the award you were given.",
  },
  {
    q: "What is the difference between my award statement and the feature?",
    a: "Your award statement is the short, formal wording explaining why your entry was selected. The feature is a fuller, optional piece about the business behind that recognition.",
  },
  {
    q: "Will I review the feature before it is published?",
    a: "Yes. The feature is shared with you for review and factual corrections before publication.",
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

/** A browser frame previewing the published feature format. */
function FeatureAddress({ scale = 1 }: { scale?: number }) {
  const s = (n: number) => `${Math.round(n * scale)}px`;
  const barH = scale > 1 ? 4 : 3;
  const topBars = [100, 94, 88, 97, 72];
  const bottomBars = [100, 91, 84];

  const Bar = ({ w }: { w: number }) => (
    <span
      style={{
        display: "block",
        width: `${w}%`,
        height: `${barH}px`,
        borderRadius: "2px",
        backgroundColor: "#EDF0F4",
      }}
    />
  );

  return (
    <div className="w-full">
      <p
        style={{
          fontSize: "0.6875rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: BLUE,
          marginBottom: "10px",
        }}
      >
        Preview &middot; What gets published
      </p>

      <div
        role="img"
        aria-label="Preview of a published Winner's Feature page at entrepreneurawards.co/winners/your-business"
        className="w-full overflow-hidden"
        style={{
          aspectRatio: "16 / 10",
          borderRadius: "12px",
          border: `1px solid ${LINE}`,
          backgroundColor: "#fff",
        }}
      >
        {/* chrome bar */}
        <div
          className="flex items-center"
          style={{
            height: s(32),
            backgroundColor: TINT,
            borderBottom: `1px solid ${LINE}`,
            paddingLeft: s(14),
            paddingRight: s(14),
            gap: s(10),
          }}
        >
          <span className="flex shrink-0 items-center" style={{ gap: s(6) }}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: s(7),
                  height: s(7),
                  borderRadius: "999px",
                  backgroundColor: LINE,
                }}
              />
            ))}
          </span>
          <span
            className="flex min-w-0 flex-1 items-center"
            style={{
              height: s(24),
              borderRadius: "6px",
              backgroundColor: "#fff",
              border: `1px solid ${LINE}`,
              paddingLeft: s(12),
              paddingRight: s(8),
            }}
          >
            <span
              className="feature-preview-url"
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: scale > 1 ? "0.8125rem" : "0.6875rem",
                color: MUTED,
                lineHeight: 1.2,
              }}
            >
              entrepreneurawards.co/winners/<wbr />
              <span style={{ color: BLUE }}>your-business</span>
            </span>
          </span>
        </div>

        {/* page area */}
        <div style={{ padding: s(20) }}>
          <span
            className="inline-flex items-center"
            style={{
              backgroundColor: "#EAF2FD",
              borderRadius: "999px",
              padding: `${s(5)} ${s(10)}`,
            }}
          >
            <svg
              width={s(9)}
              height={s(9)}
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden
              style={{ marginRight: s(6) }}
            >
              <path d="M6 0.5 L7.6 4 L11.5 4.5 L8.6 7.1 L9.4 11 L6 9.1 L2.6 11 L3.4 7.1 L0.5 4.5 L4.4 4 Z" fill={BLUE} />
            </svg>
            <span
              style={{
                fontSize: scale > 1 ? "0.75rem" : "0.5625rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: BLUE,
                lineHeight: 1.2,
              }}
            >
              2026 Winner Feature
            </span>
          </span>

          <h4
            style={{
              marginTop: s(12),
              fontSize: scale > 1 ? "1.5rem" : "1.0625rem",
              fontWeight: 600,
              lineHeight: 1.25,
              color: INK,
              maxWidth: "22ch",
            }}
          >
            How your business built something worth recognising.
          </h4>

          <p
            style={{
              marginTop: s(6),
              fontSize: scale > 1 ? "0.75rem" : "0.625rem",
              color: MUTED,
            }}
          >
            By Entrepreneur Awards Editorial
          </p>

          <div
            className="feature-preview-split"
            style={{ marginTop: s(16), display: "flex", gap: "4%" }}
          >
            <div
              className="feature-preview-image"
              style={{
                width: "42%",
                aspectRatio: "4 / 3",
                borderRadius: "6px",
                backgroundColor: "#F0F3F7",
                flexShrink: 0,
              }}
            />
            <div
              className="feature-preview-bars"
              style={{ width: "54%", display: "flex", flexDirection: "column", gap: s(9) }}
            >
              {topBars.map((w, i) => (
                <Bar key={`t${i}`} w={w} />
              ))}
              <div style={{ display: "flex", alignItems: "stretch" }}>
                <span
                  style={{
                    display: "block",
                    width: "2px",
                    borderRadius: "1px",
                    backgroundColor: BLUE,
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    marginLeft: s(10),
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: s(9),
                  }}
                >
                  <Bar w={86} />
                  <Bar w={64} />
                </div>
              </div>
              {bottomBars.map((w, i) => (
                <Bar key={`b${i}`} w={w} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <p
        style={{
          marginTop: "12px",
          fontSize: "0.75rem",
          color: MUTED,
          textAlign: "center",
        }}
      >
        Format preview. Not a real recipient.
      </p>
    </div>
  );
}



// ---------------------------------------------------------------- confetti

function Confetti() {
  const dots = Array.from({ length: 24 });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden">
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
            style={{
              left: `${left}%`,
              top: "-10%",
              width: `${size}px`,
              height: `${size * 1.6}px`,
              backgroundColor: color,
              transform: `rotate(${rotate}deg)`,
              animation: `ea-confetti-fall ${duration}s linear ${delay}s infinite`,
              "--ea-drift": `${drift * 40}px`,
            } as CSSProperties}
          />
        );
      })}
      <style>{`
        @keyframes ea-confetti-fall {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          8% { opacity: 0.95; }
          100% { transform: translateY(460px) translateX(var(--ea-drift, 0px)) rotate(720deg); opacity: 0; }
        }
      `}</style>
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

  // Price constants — single source of truth for every price on the page.
  const COMMEMORATIVE_PRICE = 195;
  const FEATURE_PRICE = 595;
  const BOTH_PRICE = 750;
  const formatPrice = (n: number) => `$${n.toLocaleString()}`;
  const bothComparePrice = COMMEMORATIVE_PRICE + FEATURE_PRICE;

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
        .feature-preview-url {
          white-space: nowrap;
        }
        @media (max-width: 639px) {
          .feature-preview-url {
            white-space: normal;
            word-break: break-word;
          }
          .feature-preview-split {
            flex-direction: column;
          }
          .feature-preview-image,
          .feature-preview-bars {
            width: 100% !important;
          }
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

      <main>
        {/* Hero — celebratory, with confetti and blue glow */}
        <Section hero className="relative overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div
              className="absolute left-1/2 top-[-10rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full blur-3xl"
              style={{ backgroundColor: `${BLUE}26` }}
            />
            <div
              className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2"
              style={{
                background: `radial-gradient(ellipse_at_top, ${BLUE}1A, transparent 60%)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
                backgroundSize: "22px 22px",
                color: INK,
              }}
            />
          </div>

          <Confetti />

          <Container narrow={768}>
            <div className="mx-auto flex flex-col items-center text-center" style={{ maxWidth: "720px" }}>
              <span
                className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] shadow-lg"
                style={{ borderColor: `${BLUE}4D`, backgroundColor: BLUE, color: "#fff" }}
              >
                <Star className="h-3.5 w-3.5 fill-current" aria-hidden />
                2026 Entrepreneur Award
              </span>
              <Eyebrow style={{ marginTop: "24px" }}>Entrepreneur Awards</Eyebrow>
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
                Your certificate is sent with that email. Your winner seal and graphics are
                available below.
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
              Your award statement was included in your award email. Your selection and winner
              materials remain unchanged whether or not you choose an edition below.
            </Small>
          </Container>
        </Section>

        {/* Transition — tinted, centred, narrow */}
        <Section tint>
          <Container narrow={720}>
            <div className="flex flex-col items-center text-center">
              <Eyebrow>From here</Eyebrow>
              <SectionHeading className="mt-4">
                Two things the award can become.
              </SectionHeading>
              <p
                className="mt-5"
                style={{ fontSize: "1rem", lineHeight: 1.6, color: BODY, maxWidth: "640px" }}
              >
                Your seal, your graphics and your award statement are yours permanently, to use wherever you
                like. Beyond those, the award can take two other forms — one you can hold, and one you can send
                to anyone who asks what you do.
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
          <SectionHeading>One you can hold. One you can send.</SectionHeading>
            <Body className="mt-4">
              Both begin from the same award. The difference is what it becomes.
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
                  present in the room.
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
                  <p
                    style={{
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
                <FeatureAddress />
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
                  reviewed by you, and published at a permanent Entrepreneur Awards address you can share with
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
                    {formatPrice(FEATURE_PRICE)}
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

            {/* Both bar */}
            <div
              className="grid gap-6 md:grid-cols-2"
              style={{
                marginTop: "32px",
                backgroundColor: TINT,
                border: `1px solid ${LINE}`,
                borderRadius: "12px",
                padding: "28px",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: BLUE,
                  }}
                >
                  Both, together
                </p>
                <p
                  className="mt-2"
                  style={{ fontSize: "1rem", lineHeight: 1.55, color: INK }}
                >
                  One in the room, one at an address. Take both and the award exists in both places.
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end">
                <div className="flex items-center gap-3">
                  <span
                    aria-label="Combined price if chosen separately"
                    style={{ fontSize: "1rem", color: MUTED, textDecoration: "line-through" }}
                  >
                    {formatPrice(bothComparePrice)}
                  </span>
                  <span
                    aria-label="Price for both together"
                    style={{ fontSize: "1.5rem", fontWeight: 600, color: INK }}
                  >
                    {formatPrice(BOTH_PRICE)}
                  </span>
                </div>
                <div className="mt-4 w-full md:max-w-[320px]">
                  <SecondaryButton event="both-select-click" onClick={handleSelect}>
                    Take both
                  </SecondaryButton>
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
                <p style={{ marginTop: "6px", fontSize: "0.75rem", color: MUTED }}>One-time payment</p>
                <div style={{ marginTop: "20px" }}>
                  <FilledButton event="commemorative-select-click" onClick={handleSelect}>
                    Order the Commemorative Edition
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
              We prepare a fuller feature from the material in your entry and your award statement, share it
              with you for review, and publish it at a permanent Entrepreneur Awards address.
            </Body>

            <div className="mt-14 grid gap-10 md:grid-cols-12 md:items-center">
              <div className="md:order-2 md:col-span-6 md:col-start-7">
                <FeatureAddress scale={1.6} />
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
                    Order the Winner's Feature
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
