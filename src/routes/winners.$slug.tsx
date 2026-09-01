import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { WINNERS, type Winner } from "@/data/winners";
import { FEATURES } from "@/data/features";
import sealAsset from "@/assets/ea-winner-seal-full-1200.png.asset.json";

const SITE_URL = "https://entrepreneurawards.co";
const SEAL_OG_URL = `${SITE_URL}/ea-winner-seal-og-1200x630.png`;

function truncate(str: string, max: number) {
  if (str.length <= max) return str;
  return str.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}

function bareDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
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
            identifier: winner.reference,
            worksFor: {
              "@type": "Organization",
              name: winner.company,
              url: winner.companyUrl,
            },
          }),
        },
      ],
    };
  },
  component: WinnerPage,
});

function RecordDetails({ winner }: { winner: Winner }) {
  return (
    <dl className="space-y-4 sm:space-y-3.5">
      <div className="flex flex-col gap-1 sm:grid sm:grid-cols-[160px_1fr] sm:gap-x-6">
        <dt className="text-[12px] uppercase tracking-[0.08em] text-[#8892a0]">Record</dt>
        <dd className="font-mono text-[15px] tracking-[0.02em] text-[#20262e]">
          {winner.reference}
        </dd>
      </div>
      <div className="flex flex-col gap-1 sm:grid sm:grid-cols-[160px_1fr] sm:gap-x-6">
        <dt className="text-[12px] uppercase tracking-[0.08em] text-[#8892a0]">Award year</dt>
        <dd className="text-[15px] text-[#20262e]">{winner.year}</dd>
      </div>
      <div className="flex flex-col gap-1 sm:grid sm:grid-cols-[160px_1fr] sm:gap-x-6">
        <dt className="text-[12px] uppercase tracking-[0.08em] text-[#8892a0]">Category</dt>
        <dd className="text-[15px] text-[#20262e]">{winner.category}</dd>
      </div>
      <div className="flex flex-col gap-1 sm:grid sm:grid-cols-[160px_1fr] sm:gap-x-6">
        <dt className="text-[12px] uppercase tracking-[0.08em] text-[#8892a0]">Issued by</dt>
        <dd className="text-[15px] text-[#20262e]">Entrepreneur Awards</dd>
      </div>
      {winner.companyUrl && (
        <div className="flex flex-col gap-1 sm:grid sm:grid-cols-[160px_1fr] sm:gap-x-6">
          <dt className="text-[12px] uppercase tracking-[0.08em] text-[#8892a0]">Website</dt>
          <dd className="text-[15px] text-[#20262e]">
            <a
              href={winner.companyUrl}
              target="_blank"
              rel="nofollow noopener"
              className="text-[#5a6572] underline decoration-[#5a6572]/40 underline-offset-2 hover:decoration-[#5a6572]"
            >
              {bareDomain(winner.companyUrl)}
            </a>
          </dd>
        </div>
      )}
      <div className="flex flex-col gap-1 sm:grid sm:grid-cols-[160px_1fr] sm:gap-x-6">
        <dt className="text-[12px] uppercase tracking-[0.08em] text-[#8892a0]">Status</dt>
        <dd className="text-[15px] text-[#20262e]">Permanent record</dd>
      </div>
    </dl>
  );
}

function WinnerPage() {
  const { winner } = Route.useLoaderData();
  const feature = FEATURES.find((f) => f.winnerSlug === winner.slug);


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

        <hr className="mt-8 mb-7 border-0 border-t border-[#e2e8f0]" />
        <RecordDetails winner={winner} />
        <hr className="mt-8 mb-7 border-0 border-t border-[#e2e8f0]" />

        {feature && (
          <article className="mt-14">
            <h2 className="text-[22px] font-bold tracking-[-0.015em] text-[#12161c]">
              The feature
            </h2>
            <h3 className="mt-6 text-[20px] font-semibold leading-[1.3] text-[#5a6572]">
              {feature.subheadline}
            </h3>

            {feature.portrait && (
              <figure className="mt-9">
                <img
                  src={feature.portrait}
                  alt={feature.portraitCaption || ""}
                  width={900}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover object-center"
                  style={{ aspectRatio: "3 / 2" }}
                />
                {feature.portraitCaption ? (
                  <figcaption className="mt-3 text-[13px] leading-[1.5] text-[#5a6572]">
                    {feature.portraitCaption}
                  </figcaption>
                ) : null}
              </figure>
            )}

            <div className="mt-9">
              {feature.body.map((block, i) => {
                if (block.type === "h2") {
                  return (
                    <h3
                      key={i}
                      className="mb-4 mt-11 text-[20px] font-bold tracking-[-0.015em] text-[#12161c]"
                    >
                      {block.text}
                    </h3>
                  );
                }
                if (block.type === "quote") {
                  return (
                    <blockquote
                      key={i}
                      className="my-9 border-l-[3px] border-[#1978E5] pl-[22px]"
                    >
                      <p className="text-[18px] italic leading-[1.6] text-[#12161c]">
                        {block.text}
                      </p>
                      <p className="mt-3 text-[14px] not-italic text-[#5a6572]">
                        &emsp;{block.attribution}
                      </p>
                    </blockquote>
                  );
                }
                return (
                  <p
                    key={i}
                    className="mb-[22px] text-[17px] leading-[1.75] text-[#20262e]"
                  >
                    {block.text}
                  </p>
                );
              })}
            </div>

            {feature.awardImage && (
              <figure className="mt-12">
                <img
                  src={feature.awardImage}
                  alt="The 2026 Entrepreneur Awards engraved crystal award"
                  width={1152}
                  height={648}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover object-center"
                  style={{ aspectRatio: "16 / 9" }}
                />
                <figcaption className="mt-3 text-[13px] leading-[1.5] text-[#5a6572]">
                  The 2026 Entrepreneur Awards engraved crystal award.
                </figcaption>
              </figure>
            )}

            <section className="mt-12">
              <h3 className="mb-4 text-[20px] font-bold tracking-[-0.015em] text-[#12161c]">
                Additional information
              </h3>
              <dl className="border-y border-[#e2e8f0] py-2">
                <div className="flex flex-col gap-1 py-2 sm:grid sm:grid-cols-[160px_1fr] sm:gap-x-6">
                  <dt className="text-[12px] uppercase tracking-[0.08em] text-[#8892a0] sm:pt-1">
                    Industry
                  </dt>
                  <dd className="text-[15px] leading-[1.6] text-[#20262e]">
                    {feature.info.industry}
                  </dd>
                </div>
                <div className="flex flex-col gap-1 py-2 sm:grid sm:grid-cols-[160px_1fr] sm:gap-x-6">
                  <dt className="text-[12px] uppercase tracking-[0.08em] text-[#8892a0] sm:pt-1">
                    Location
                  </dt>
                  <dd className="text-[15px] leading-[1.6] text-[#20262e]">
                    {feature.info.location}
                  </dd>
                </div>
                <div className="flex flex-col gap-1 py-2 sm:grid sm:grid-cols-[160px_1fr] sm:gap-x-6">
                  <dt className="text-[12px] uppercase tracking-[0.08em] text-[#8892a0] sm:pt-1">
                    What they do
                  </dt>
                  <dd className="text-[15px] leading-[1.6] text-[#20262e]">
                    {feature.info.whatTheyDo}
                  </dd>
                </div>
                <div className="flex flex-col gap-1 py-2 sm:grid sm:grid-cols-[160px_1fr] sm:gap-x-6">
                  <dt className="text-[12px] uppercase tracking-[0.08em] text-[#8892a0] sm:pt-1">
                    Website
                  </dt>
                  <dd className="text-[15px] leading-[1.6] text-[#20262e]">
                    <a
                      href={feature.info.websiteUrl}
                      target="_blank"
                      rel="nofollow noopener"
                      className="text-[#5a6572] underline decoration-1 underline-offset-2"
                    >
                      {feature.info.website}
                    </a>
                  </dd>
                </div>
              </dl>
            </section>
          </article>
        )}

        <hr className="my-10 border-0 border-t border-[#e2e8f0]" />

        <div className="text-[14px] leading-[1.7] text-[#5a6572]">
          <h2 className="text-[12px] uppercase tracking-[0.08em] text-[#8892a0]">
            About this record
          </h2>
          <p className="mt-[10px]">
            This entry confirms that {winner.name} was selected as a winner of the {winner.year}{" "}
            Entrepreneur Awards under the criteria published on this site. It records that
            selection and nothing further. It is not an endorsement of the company&apos;s products,
            services, financial position or conduct, and it does not constitute advice of any kind.
          </p>
          <p className="mt-4">
            Entries are permanent. Once published, a record is not removed or altered except to
            correct a factual error.
          </p>
          <p className="mt-4">
            Enquiries and corrections:{" "}
            <a
              href="mailto:records@entrepreneurawards.co"
              className="text-[#1978E5] hover:underline"
            >
              records@entrepreneurawards.co
            </a>
          </p>
          <p className="mt-4">
            <Link to="/criteria" className="text-[#1978E5] hover:underline">
              Selection criteria
            </Link>
            <span className="mx-2 text-[#8892a0]">·</span>
            <Link to="/how-it-works" className="text-[#1978E5] hover:underline">
              How entry works
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
