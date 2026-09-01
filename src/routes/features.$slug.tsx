import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { FEATURES, type Feature } from "@/data/features";

function getFeature(slug: string): Feature | undefined {
  return FEATURES.find((f) => f.slug === slug);
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + "…";
}

export const Route = createFileRoute("/features/$slug")({
  loader: async ({ params }) => {
    const feature = getFeature(params.slug);
    if (!feature) throw notFound();
    return { feature };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex, nofollow" }] };
    }
    const { feature } = loaderData;
    const description = truncate(feature.standfirst, 155);
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
  component: FeaturePage,
});

function FeaturePage() {
  const { feature } = Route.useLoaderData();

  return (
    <main className="mx-auto max-w-[720px] px-6 pt-[72px] pb-24">
      <p className="mb-5 text-xs font-bold uppercase tracking-[0.09em] text-[#1978E5]">
        {feature.kicker}
      </p>
      <h1 className="mb-5 text-[30px] font-bold leading-[1.15] tracking-[-0.025em] text-[#12161c] md:text-[44px]">
        {feature.headline}
      </h1>
      <p className="mb-8 text-[17px] font-medium leading-[1.5] text-[#5a6572] md:text-xl">
        {feature.standfirst}
      </p>

      <hr className="mb-10 border-0 border-t border-[#e2e8f0]" />

      <div className="max-w-[680px]">
        {feature.body.map((block, i) => {
          if (block.type === "h2") {
            return (
              <h2
                key={i}
                className="mb-4 mt-11 text-2xl font-bold tracking-[-0.015em] text-[#12161c]"
              >
                {block.text}
              </h2>
            );
          }
          if (block.type === "quote") {
            return (
              <blockquote
                key={i}
                className="my-10 border-l-[3px] border-[#1978E5] pl-6 text-xl font-medium italic leading-[1.45] text-[#12161c] md:text-2xl"
              >
                {block.text}
              </blockquote>
            );
          }
          return (
            <p
              key={i}
              className="mb-6 text-[17px] leading-[1.75] text-[#20262e] md:text-[19px]"
            >
              {block.text}
            </p>
          );
        })}
      </div>

      <hr className="mb-6 mt-10 border-0 border-t border-[#e2e8f0]" />
      <p className="text-[15px] text-[#5a6572]">{feature.footnote}</p>
      <p className="mt-2 text-[15px]">
        <Link
          to="/winners/$slug"
          params={{ slug: feature.winnerSlug }}
          className="text-[#1978E5]"
        >
          View the award record →
        </Link>
      </p>
    </main>
  );
}
