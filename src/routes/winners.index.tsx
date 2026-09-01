import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { WINNERS } from "@/data/winners";

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
  const winners = [...WINNERS].sort((a, b) => b.year - a.year);

  return (
    <div className="min-h-screen bg-white font-sans text-[#12161c]">
      <SiteNav />
      <main className="mx-auto max-w-[720px] px-5 py-16 md:py-20">
        <h1 className="text-[30px] font-bold tracking-[-0.02em] md:text-[40px]">
          Entrepreneur Awards Winners
        </h1>

        <ul className="mt-10">
          {winners.map((winner) => (
            <li key={winner.slug} className="border-b border-[#e2e8f0] py-6 first:border-t">
              <Link
                to="/winners/$slug"
                params={{ slug: winner.slug }}
                className="text-[20px] font-medium text-[#12161c] hover:text-[#1978E5]"
              >
                {winner.name}
              </Link>
              <p className="mt-1 text-[14px] text-[#5a6572]">
                {winner.company} · {winner.category} · {winner.year}
              </p>
              <p className="mt-1 font-mono text-[12px] text-[#8892a0]">
                {winner.reference}
              </p>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
