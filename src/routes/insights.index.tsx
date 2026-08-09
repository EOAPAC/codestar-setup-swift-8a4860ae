import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { insights } from "@/data/insights";

const STANDFIRST =
  "Arguments on founder credibility, independent recognition, and how buyers judge a business before anyone picks up the phone.";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "Insights | Entrepreneur Awards" },
      { name: "description", content: STANDFIRST },
      { property: "og:title", content: "Insights | Entrepreneur Awards" },
      { property: "og:description", content: STANDFIRST },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://entrepreneurawards.co/insights" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://entrepreneurawards.co/insights" }],
  }),
  component: InsightsIndexPage,
});

function InsightsIndexPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-4xl px-6 pt-20 pb-24 md:pt-28">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Insights
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {STANDFIRST}
        </p>

        <div className="mt-14 flex flex-col">
          {insights.map((article, i) => (
            <Link
              key={article.slug}
              to="/insights/$slug"
              params={{ slug: article.slug }}
              className="group grid grid-cols-[auto_1fr] gap-x-6 border-t border-border py-8 transition-colors last:border-b hover:bg-secondary/40 md:gap-x-10"
            >
              <span className="pt-1 text-sm tabular-nums text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary md:text-2xl">
                  {article.title}
                </h2>
                <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
                  {article.metaDescription}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>

      </main>
      <SiteFooter />
    </div>
  );
}
