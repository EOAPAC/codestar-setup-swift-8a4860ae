import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { insights } from "@/data/insights";

const BASE = "https://entrepreneurawards.co";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const article = insights.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { seoTitle, metaDescription } = loaderData.article;
    const url = `${BASE}/insights/${params.slug}`;
    return {
      meta: [
        { title: seoTitle },
        { name: "description", content: metaDescription },
        { property: "og:title", content: seoTitle },
        { property: "og:description", content: metaDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: InsightArticlePage,
  errorComponent: ArticleUnavailable,
  notFoundComponent: ArticleNotFound,
});

function ArticleShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-6 pt-16 pb-24 md:pt-24">{children}</main>
      <SiteFooter />
    </div>
  );
}

function BackLink() {
  return (
    <Link
      to="/insights"
      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to Insights
    </Link>
  );
}

function ArticleNotFound() {
  return (
    <ArticleShell>
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">Article not found</h1>
      <p className="mt-3 text-muted-foreground">This piece does not exist or has been moved.</p>
      <div className="mt-8">
        <BackLink />
      </div>
    </ArticleShell>
  );
}

function ArticleUnavailable() {
  return (
    <ArticleShell>
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        This page did not load
      </h1>
      <div className="mt-8">
        <BackLink />
      </div>
    </ArticleShell>
  );
}

function InsightArticlePage() {
  const { article } = Route.useLoaderData();

  return (
    <ArticleShell>
      <BackLink />

      <article className="mt-10">
        <h1 className="max-w-[22ch] text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl md:leading-[1.15]">
          {article.title}
        </h1>

        <ul className="mt-6 flex flex-wrap gap-2">
          {article.tags.map((tag: string) => (
            <li
              key={tag}
              className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>

        <hr className="mt-8 border-border" />

        <div className="mx-auto mt-10 max-w-[68ch]">
          <ReactMarkdown
            components={{
              h3: ({ children }) => (
                <h2 className="mt-12 text-2xl font-semibold tracking-tight text-foreground">
                  {children}
                </h2>
              ),
              p: ({ children }) => (
                <p className="mt-6 text-[1.0625rem] leading-8 text-foreground/85">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="mt-6 list-disc space-y-2 pl-6 text-[1.0625rem] leading-8 text-foreground/85">
                  {children}
                </ul>
              ),
              a: ({ children, href }) => (
                <a href={href} className="text-primary underline underline-offset-4">
                  {children}
                </a>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-foreground">{children}</strong>
              ),
            }}
          >
            {article.body}
          </ReactMarkdown>
        </div>
      </article>

      <hr className="mt-16 border-border" />
      <div className="mt-8">
        <BackLink />
      </div>
    </ArticleShell>
  );
}
