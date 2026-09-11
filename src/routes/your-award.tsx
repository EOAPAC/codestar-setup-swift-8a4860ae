import { createFileRoute, Link } from "@tanstack/react-router";
import { Download } from "lucide-react";

import { AWARD_YEAR } from "@/content/award";
import { winnerKitFiles } from "@/content/winner-kit";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/your-award")({
  head: () => ({
    meta: [
      { title: `Your ${AWARD_YEAR} Entrepreneur Award` },
      {
        name: "description",
        content: `Download your ${AWARD_YEAR} Entrepreneur Award winner badge, banner, social graphics and email signature.`,
      },
      { property: "og:title", content: `Your ${AWARD_YEAR} Entrepreneur Award` },
      {
        property: "og:description",
        content: `Download your ${AWARD_YEAR} Entrepreneur Award winner badge, banner, social graphics and email signature.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: YourAwardPage,
});

const INK = "#0F172A";
const BODY = "#52606D";
const MUTED = "#6B7785";
const BRAND = "#1978E5";
const LINE = "#E5E9F0";
const TINT = "#F7F9FC";

const dimensionsById: Record<string, string> = {
  seal: "PNG · 1200 × 1200 px",
  banner: "PNG · 1200 × 627 px",
  square: "PNG · 1080 × 1080 px",
  story: "PNG · 1080 × 1920 px",
  signature: "PNG · 600 × 200 px",
};

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

function YourAwardPage() {
  return (
    <div
      className="min-h-screen font-sans antialiased"
      style={{ backgroundColor: "#fff", color: BODY }}
    >
      <SiteNav />
      <main>
        <Header />
        <Downloads />
        <Closing />
      </main>
      <SiteFooter />
    </div>
  );
}

function Header() {
  const seal = winnerKitFiles.find((file) => file.id === "seal");

  return (
    <section style={{ backgroundColor: INK }}>
      <Container narrow={760} className="pt-14 pb-12 text-center md:pt-[72px] md:pb-16">
        {seal && (
          <div
            className="mx-auto mb-7 flex w-[108px] items-center justify-center rounded-full bg-white md:w-[140px]"
            style={{ aspectRatio: "1 / 1" }}
          >
            <img
              src={seal.url}
              alt="the 2026 Entrepreneur Awards winner badge"
              className="object-contain"
              style={{ width: "70%", height: "70%" }}
            />
          </div>
        )}
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          {AWARD_YEAR} Entrepreneur Award
        </p>
        <h1
          className="mt-5"
          style={{
            fontSize: "clamp(36px, 5.5vw, 56px)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#fff",
          }}
        >
          You won.
        </h1>
        <p
          className="mx-auto mt-5"
          style={{
            maxWidth: "52ch",
            fontSize: "16.5px",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.75)",
          }}
        >
          Congratulations on your {AWARD_YEAR} Entrepreneur Award. Everything that comes
          with it is on this page, free to use and yours to keep.
        </p>
      </Container>
    </section>
  );
}

function Downloads() {
  return (
    <section style={{ backgroundColor: TINT, padding: "56px 0" }}>
      <Container>
        <div className="text-center">
          <h2
            style={{
              fontSize: "clamp(24px, 3vw, 28px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: INK,
            }}
          >
            Your award, ready to use.
          </h2>
          <p
            className="mx-auto mt-3"
            style={{
              maxWidth: "60ch",
              fontSize: "14.5px",
              lineHeight: 1.6,
              color: BODY,
            }}
          >
            Download them, then add them to your website, your LinkedIn profile and your
            email signature. They&apos;re yours to keep, at no further cost.
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center">
          <a
            href="/api/public/winner-kit/zip"
            download
            className="inline-flex items-center justify-center rounded-lg text-white transition-colors hover:opacity-95"
            style={{
              minHeight: "52px",
              padding: "0 32px",
              backgroundColor: BRAND,
              fontSize: "15.5px",
              fontWeight: 600,
            }}
          >
            Download everything
          </a>
        </div>

        <ul className="mt-8 flex flex-wrap justify-center gap-5">
          {winnerKitFiles.map((file) => (
            <li key={file.id} className="w-full sm:basis-[300px] sm:max-w-[340px]">
              <article
                className="flex w-full flex-col overflow-hidden"
                style={{
                  backgroundColor: "#fff",
                  border: `1px solid ${LINE}`,
                  borderRadius: "8px",
                  boxShadow: "0 1px 2px rgba(15, 23, 42, 0.05)",
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "150px",
                    padding: "20px",
                    backgroundColor: "#fff",
                    borderBottom: `1px solid ${LINE}`,
                  }}
                >
                  <img
                    src={file.url}
                    alt={file.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full"
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3
                    style={{
                      fontSize: "15.5px",
                      fontWeight: 600,
                      color: INK,
                    }}
                  >
                    {file.name}
                  </h3>
                  <p
                    className="mt-1.5"
                    style={{
                      fontSize: "13.5px",
                      lineHeight: 1.5,
                      color: BODY,
                    }}
                  >
                    {file.description}
                  </p>
                  {dimensionsById[file.id] && (
                    <p
                      className="mt-2.5"
                      style={{
                        fontSize: "11.5px",
                        color: MUTED,
                      }}
                    >
                      {dimensionsById[file.id]}
                    </p>
                  )}
                  <div className="mt-auto pt-4">
                    <a
                      href={file.url}
                      download={file.filename}
                      className="inline-flex items-center gap-1.5 transition-colors hover:underline"
                      style={{
                        minHeight: "44px",
                        fontSize: "13.5px",
                        fontWeight: 600,
                        color: BRAND,
                      }}
                    >
                      <Download className="h-3.5 w-3.5" aria-hidden />
                      Download {file.name.toLowerCase()}
                    </a>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function Closing() {
  return (
    <section className="bg-white py-12">
      <Container narrow={720} className="text-center">
        <p style={{ fontSize: "14.5px", color: BODY }}>
          That&apos;s everything you can post yourself.
        </p>
        <p
          className="mx-auto mt-2.5"
          style={{
            maxWidth: "56ch",
            fontSize: "13.5px",
            color: MUTED,
          }}
        >
          If you&apos;d like the story behind the award written up and published as well,
          that&apos;s the Winner&apos;s Feature.
        </p>
        <div className="mt-3.5">
          <Link
            to="/salespage"
            className="inline-flex items-center gap-1 transition-colors hover:underline"
            style={{
              fontSize: "13.5px",
              fontWeight: 600,
              color: BRAND,
            }}
          >
            See the Winner&apos;s Feature →
          </Link>
        </div>
      </Container>
    </section>
  );
}
