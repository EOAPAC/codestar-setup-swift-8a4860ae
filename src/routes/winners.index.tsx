import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { WINNERS } from "@/data/winners";
import winnersHeroAsset from "@/assets/winners-hero-banner-dark.jpg.asset.json";

const TINTS = ["#EEF4FE", "#F1F6FB", "#EFF3F9", "#F4F7FC"];

function slugToTint(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % TINTS.length;
  return TINTS[index];
}

function firstSentence(text: string): string {
  const match = text.match(/^.*?[.!?](?:\s|$)/);
  return match ? match[0].trim() : text;
}

export const Route = createFileRoute("/winners/")({
  head: () => ({
    meta: [
      { title: "Entrepreneur Awards Winners" },
      {
        name: "description",
        content:
          "The permanent record of Entrepreneur Awards winners — founders recognised on the strength of what they have built.",
      },
      { property: "og:title", content: "Entrepreneur Awards Winners" },
      {
        property: "og:description",
        content:
          "The permanent record of Entrepreneur Awards winners — founders recognised on the strength of what they have built.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://entrepreneurawards.co/winners" },
    ],
    links: [{ rel: "canonical", href: "https://entrepreneurawards.co/winners" }],
  }),
  component: WinnersIndexPage,
});

function WinnersIndexPage() {
  const winners = [...WINNERS].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="min-h-screen bg-white font-sans text-[#12161c]">
      <SiteNav />

      <section
        role="img"
        aria-label="The 2026 Entrepreneur Awards engraved crystal award"
        className="winners-hero h-[240px] md:h-[320px] lg:h-[400px]"
        style={{
          position: "relative",
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          backgroundImage: `url('${winnersHeroAsset.url}')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#000",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 32%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0) 72%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: 1120,
            margin: "0 auto",
            padding: "0 20px",
          }}
        >
          <h1
            style={{
              maxWidth: 460,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              margin: 0,
            }}
            className="text-[26px] lg:text-[38px]"
          >
            Entrepreneur Awards Winners
          </h1>
          <p
            style={{
              maxWidth: 460,
              fontSize: 15,
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.65)",
              margin: "10px 0 0",
            }}
          >
            Published records of Entrepreneur Awards winners.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1120px] px-5 pt-14 pb-16 md:pb-20">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {winners.map((winner) => (
            <li key={winner.slug} className="flex">
              <Link
                to="/winners/$slug"
                params={{ slug: winner.slug }}
                className="group flex w-full flex-col overflow-hidden rounded-lg border border-[#e2e8f0] bg-white transition-colors duration-150 hover:border-[#cbd5e1]"
              >
                <div
                  className="flex h-10 items-center justify-between px-[18px]"
                  style={{ backgroundColor: slugToTint(winner.slug) }}
                >
                  <span className="font-mono text-[11px] tracking-[0.05em] text-[#1978E5]">
                    {winner.reference}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.05em] text-[#1978E5]/60">
                    {winner.year}
                  </span>
                </div>

                <div className="flex flex-grow flex-col p-[22px]">
                  <h2 className="text-[20px] font-semibold tracking-[-0.01em] text-[#12161c]">
                    {winner.name}
                  </h2>
                  <p className="mt-1 truncate text-[14px] text-[#5a6572]">
                    {winner.company}
                  </p>
                  <p className="mt-4 line-clamp-3 flex-grow text-[14px] leading-[1.55] text-[#20262e]">
                    {firstSentence(winner.summary[0])}
                  </p>

                  <div className="mt-auto pt-6">
                    <div className="border-t border-[#e2e8f0]" />
                    <p className="mt-3 truncate text-[11px] uppercase tracking-[0.08em] text-[#8892a0]">
                      {winner.category}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
