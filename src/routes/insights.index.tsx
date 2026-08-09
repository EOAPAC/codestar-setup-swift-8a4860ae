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

        <div className="mt-14 flex flex-col gap-4">
          {insights.map((article) => (
            <Link
              key={article.slug}
              to="/insights/$slug"
              params={{ slug: article.slug }}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40 md:p-8"
            >
              <h2 className="text-xl font-semibold tracking-tight text-foreground group-hover:text-primary md:text-2xl">
                {article.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {article.metaDescription}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
