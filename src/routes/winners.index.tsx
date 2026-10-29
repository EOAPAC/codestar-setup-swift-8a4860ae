import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { WINNERS } from "@/data/winners";
import winnersHeroAsset from "@/assets/winners-hero-trophy.jpg.asset.json";

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
          "The permanent record of Entrepreneur Awards winners, founders recognised on the strength of what they have built.",
      },
      { property: "og:title", content: "Entrepreneur Awards Winners" },
      {
        property: "og:description",
        content:
          "The permanent record of Entrepreneur Awards winners, founders recognised on the strength of what they have built.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteNav />

      <section className="editorial-section"><div className="editorial-container"><h1>Entrepreneur Awards Winners</h1><p className="section-intro">Published records of Entrepreneur Awards winners.</p></div></section>

      <main className="mx-auto max-w-[1120px] px-5 pt-14 pb-16 md:pb-20">
        <ul className="winner-directory">
          {winners.map((winner) => <li key={winner.slug}>
            <Link to="/winners/$slug" params={{ slug: winner.slug }} className="winner-directory-entry">
              <div className="winner-reference"><span>{winner.reference}</span><span>{winner.year}</span></div>
              <div><h2>{winner.name}</h2><p className="winner-company">{winner.company}</p><p className="mt-4">{firstSentence(winner.summary[0])}</p><p className="winner-category">{winner.category}</p>{winner.featureUrl && <span className="text-primary underline">Includes the full feature article</span>}</div>
            </Link>
          </li>)}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
