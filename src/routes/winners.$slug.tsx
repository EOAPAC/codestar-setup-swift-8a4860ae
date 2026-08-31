import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { WINNERS } from "@/data/winners";
import sealAsset from "@/assets/ea-winner-seal-full-1200.png.asset.json";

const SITE_URL = "https://entrepreneurawards.co";
const SEAL_OG_URL = `${SITE_URL}${sealAsset.url}`;

function truncate(str: string, max: number) {
  if (str.length <= max) return str;
  return str.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}

export const Route = createFileRoute("/winners/$slug")({
  loader: ({ params }) => {
    const winner = WINNERS.find((w) => w.slug === params.slug);
    if (!winner) throw notFound();
    return { winner };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Winner not found — Entrepreneur Awards" }, { name: "robots", content: "noindex" }],
      };
    }
    const { winner } = loaderData;
    const title = `${winner.name}, ${winner.company} — ${winner.year} Entrepreneur Award Winner`;
    const firstSentence = winner.summary[0].split(/(?<=\.)\s/)[0];
    const description = truncate(firstSentence, 155);
    const url = `${SITE_URL}/winners/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "profile" },
        { property: "og:url", content: url },
        { property: "og:image", content: SEAL_OG_URL },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: SEAL_OG_URL },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: winner.name,
            award: `${winner.year} Entrepreneur Award`,
          }),
        },
      ],
    };
  },
  component: WinnerPage,
});

function WinnerPage() {
  const { winner } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-white font-sans text-[#12161c]">
      <SiteNav />
      <main className="mx-auto max-w-[720px] px-5 py-16 md:py-20">
        <img
          src={sealAsset.url}
          alt={`${winner.year} Entrepreneur Award winner seal`}
          className="mb-10 h-[72px] w-[72px] object-contain"
        />

        <h1 className="text-[30px] font-bold tracking-[-0.02em] text-[#12161c] md:text-[40px]">
          {winner.name}
        </h1>
        <p className="mt-2 text-[15px] text-[#5a6572]">
          {winner.company} · {winner.category} · {winner.year}
        </p>

        <div className="mt-8 border-l-[3px] border-[#1978E5] pl-5">
          {winner.summary.map((paragraph, i) => (
            <p key={i} className="text-[17px] leading-[1.65] text-[#20262e] [&+&]:mt-5">
              {paragraph}
            </p>
          ))}
        </div>

        {winner.featureUrl && (
          <a
            href={winner.featureUrl}
            className="mt-6 inline-block text-[16px] text-[#1978E5] hover:underline"
          >
            Read the full feature →
          </a>
        )}

        <hr className="my-10 border-0 border-t border-[#e2e8f0]" />

        <div className="text-[14px] leading-relaxed text-[#5a6572]">
          <p>
            The Entrepreneur Awards recognises founders on the strength of what they have built.
            Entries are reviewed against published criteria, and selected winners receive the
            official winner badge, recognition materials and this permanent record.
          </p>
          <Link to="/how-it-works" className="mt-3 inline-block text-[#1978E5] hover:underline">
            How entry works →
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
