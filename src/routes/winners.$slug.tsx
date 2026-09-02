import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { FEATURES, type Feature } from "@/data/features";

function getFeatureByWinner(slug: string): Feature | undefined {
  return FEATURES.find((f) => f.winnerSlug === slug);
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + "…";
}

export const Route = createFileRoute("/winners/$slug")({
  loader: async ({ params }) => {
    const feature = getFeatureByWinner(params.slug);
    if (!feature) throw notFound();
    return { feature };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex, nofollow" }] };
    }
    const { feature } = loaderData;
    const description = truncate(feature.subheadline, 155);
    return {
      meta: [
        { title: feature.headline },
        { name: "description", content: description },
        { property: "og:title", content: feature.headline },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "robots", content: "noindex, nofollow" },
      ],
    };
  },
  component: WinnerPage,
});

function WinnerPage() {
  const { feature } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-white font-sans text-[#12161c]">
      <SiteNav />
      <main className="mx-auto max-w-[720px] px-6 pt-[72px] pb-24">
        <h1 className="mb-3.5 text-[28px] font-bold leading-[1.2] tracking-[-0.025em] text-[#12161c] md:text-[40px]">
          {feature.headline}
        </h1>
        <h2 className="mb-8 text-[17px] font-semibold leading-[1.4] text-[#5a6572] md:text-[19px]">
          {feature.subheadline}
        </h2>

        <hr className="mb-10 border-0 border-t border-[#e2e8f0]" />

        {feature.portrait && (
          <figure className="mb-11">
            <img
              src={feature.portrait}
              alt={feature.portraitCaption || ""}
              width={900}
              height={600}
              loading="lazy"
              decoding="async"
              className="w-full object-cover object-center"
              style={{ aspectRatio: feature.portraitAspect ?? "3 / 2" }}
            />
            {feature.portraitCaption ? (
              <figcaption className="mt-3 text-[13px] leading-[1.5] text-[#5a6572]">
                {feature.portraitCaption}
              </figcaption>
            ) : null}
          </figure>
        )}

        <div>
          {feature.body.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2
                  key={i}
                  className="mb-4 mt-11 text-[22px] font-bold tracking-[-0.015em] text-[#12161c]"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "quote") {
              return (
                <blockquote
                  key={i}
                  className="my-9 border-l-[3px] border-[#1978E5] pl-[22px]"
                >
                  <p className="text-[19px] italic leading-[1.6] text-[#12161c]">{block.text}</p>
                  <p className="mt-3 text-[15px] not-italic text-[#5a6572]">
                    &emsp;{block.attribution}
                  </p>
                </blockquote>
              );
            }
            if ("segments" in block && Array.isArray(block.segments)) {
              return (
                <p
                  key={i}
                  className="mb-[22px] text-[17px] leading-[1.75] text-[#20262e] md:text-[18px]"
                >
                  {block.segments.map((segment, j) =>
                    segment.type === "link" ? (
                      <a
                        key={j}
                        href={segment.href}
                        target={segment.external ? "_blank" : undefined}
                        rel={segment.external ? "nofollow noopener" : undefined}
                        className="text-[#1978E5] underline decoration-1 underline-offset-2"
                      >
                        {segment.text}
                      </a>
                    ) : (
                      <span key={j}>{segment.text}</span>
                    )
                  )}
                </p>
              );
            }
            return (
              <p
                key={i}
                className="mb-[22px] text-[17px] leading-[1.75] text-[#20262e] md:text-[18px]"
              >
                {block.text}
              </p>
            );
          })}
        </div>

        {feature.awardImage && (
          <figure className="mt-14 mb-12">
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

        <section className={feature.awardImage ? "mt-0" : "mt-14"}>
          <h2 className="mb-4 mt-11 text-[22px] font-bold tracking-[-0.015em] text-[#12161c]">
            Additional Information
          </h2>
          <dl className="border-y border-[#e2e8f0] py-2 max-sm:py-[9px]">
            <InfoRow label="Industry" value={feature.info.industry} />
            <InfoRow label="Location" value={feature.info.location} />
            <InfoRow label="What They Do" value={feature.info.whatTheyDo} />
            <div className="flex flex-col gap-1 py-2 max-sm:py-[9px] sm:flex-row">
              <dt className="w-full shrink-0 text-[12px] uppercase tracking-[0.08em] text-[#8892a0] sm:w-[160px] sm:pt-1">
                Website
              </dt>
              <dd className="text-[16px] leading-[1.6] text-[#20262e]">
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

        <p className="mt-10 text-[15px]">
          <Link to="/winners" className="text-[#1978E5]">
            View all winners →
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 py-2 max-sm:py-[9px] sm:flex-row">
      <dt className="w-full shrink-0 text-[12px] uppercase tracking-[0.08em] text-[#8892a0] sm:w-[160px] sm:pt-1">
        {label}
      </dt>
      <dd className="text-[16px] leading-[1.6] text-[#20262e]">{value}</dd>
    </div>
  );
}
