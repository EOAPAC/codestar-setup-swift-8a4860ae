import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { WINNERS } from "@/data/winners";
import heroTrophyAsset from "@/assets/hero-trophy.jpg.asset.json";

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

      <section className="relative h-[220px] w-full overflow-hidden bg-[#0b0d10] sm:h-[260px] lg:h-[340px]">
        <img
          src={heroTrophyAsset.url}
          alt="The 2026 Entrepreneur Awards engraved crystal award"
          className="absolute inset-0 h-full w-full object-cover object-right"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(11,13,16,0.92), rgba(11,13,16,0.55) 55%, transparent)",
          }}
        />
        <div className="relative mx-auto flex h-full max-w-[1120px] items-center px-5">
          <div>
            <h1 className="text-[30px] font-bold tracking-[-0.02em] text-white lg:text-[44px]">
              Entrepreneur Awards Winners
            </h1>
            <p className="mt-[10px] text-[16px] text-white/70">
              Published records of Entrepreneur Awards winners.
            </p>
          </div>
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
