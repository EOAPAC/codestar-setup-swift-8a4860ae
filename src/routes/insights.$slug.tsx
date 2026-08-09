import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { insights } from "@/data/insights";

const BASE = "https://entrepreneurawards.co";

const WORDS_PER_MINUTE = 220;

function readingMinutes(body: string) {
  return Math.max(1, Math.round(body.trim().split(/\s+/).length / WORDS_PER_MINUTE));
}

function sectionHeadings(body: string) {
  return Array.from(body.matchAll(/^###\s+(.+)$/gm)).map((m) => m[1].trim());
}

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const index = insights.findIndex((a) => a.slug === params.slug);
    if (index === -1) throw notFound();
    return {
      article: insights[index],
      next: insights[(index + 1) % insights.length],
    };
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
      <main className="pb-24">{children}</main>
      <SiteFooter />
    </div>
  );
}

function BackLink() {
  return (
    <Link
      to="/insights"
      className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to Insights
    </Link>
  );
}

function ArticleNotFound() {
  return (
    <ArticleShell>
      <div className="mx-auto max-w-3xl px-6 pt-20">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Article not found</h1>
        <p className="mt-3 text-muted-foreground">This piece does not exist or has been moved.</p>
        <div className="mt-8">
          <BackLink />
        </div>
      </div>
    </ArticleShell>
  );
}

function ArticleUnavailable() {
  return (
    <ArticleShell>
      <div className="mx-auto max-w-3xl px-6 pt-20">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          This page did not load
        </h1>
        <div className="mt-8">
          <BackLink />
        </div>
      </div>
    </ArticleShell>
  );
}

/** Thin progress rule that tracks how far through the article the reader is. */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent" aria-hidden="true">
      <div
        className="h-full origin-left bg-primary transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

function InsightArticlePage() {
  const { article, next } = Route.useLoaderData();
  const minutes = readingMinutes(article.body);
  const headings = sectionHeadings(article.body);


  return (
    <ArticleShell>
      <ReadingProgress />

      <header className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 0%, var(--color-primary) 0%, transparent 55%), radial-gradient(circle at 85% 20%, var(--color-primary) 0%, transparent 45%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "88px 100%",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 pt-12 pb-14 md:pt-16 md:pb-16">
          <BackLink />

          <p className="mt-10 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            Insights
            <span className="h-px w-8 bg-primary/40" />
            <span className="text-muted-foreground tracking-[0.14em]">{minutes} min read</span>
          </p>

          <h1 className="mt-5 max-w-[24ch] text-3xl font-semibold leading-tight tracking-tight text-balance text-foreground md:text-[2.75rem] md:leading-[1.1]">
            {article.title}
          </h1>

          <p className="mt-6 max-w-[60ch] border-l-2 border-primary pl-5 text-lg leading-relaxed text-muted-foreground">
            {article.metaDescription}
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {article.tags.map((tag: string) => (
              <li
                key={tag}
                className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6">
        <div className="lg:grid lg:grid-cols-[1fr_minmax(0,68ch)_1fr] lg:gap-10">
          {headings.length > 0 ? (
            <nav
              aria-label="In this article"
              className="hidden lg:block"
            >
              <div className="sticky top-24 pt-16 pr-4">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  In this article
                </p>
                <ol className="mt-4 space-y-3">
                  {headings.map((heading, i) => (
                    <li key={heading} className="flex gap-3 text-sm leading-snug">
                      <span className="tabular-nums text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <a
                        href={`#section-${i + 1}`}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>
          ) : (
            <div className="hidden lg:block" />
          )}

          <article className="pt-14 md:pt-16">
            <ReactMarkdown
              components={{
                h3: ({ children }) => {
                  sectionIndex += 1;
                  const n = sectionIndex;
                  return (
                    <h2
                      id={`section-${n}`}
                      className="mt-14 scroll-mt-24 border-t border-border pt-8 text-2xl font-semibold tracking-tight text-foreground md:text-[1.75rem]"
                    >
                      <span className="mb-3 block text-xs font-medium tabular-nums tracking-[0.18em] text-primary">
                        {String(n).padStart(2, "0")}
                      </span>
                      {children}
                    </h2>
                  );
                },
                p: ({ children }) => (
                  <p className="mt-6 text-[1.0625rem] leading-8 text-foreground/85 first:mt-0 first:text-[1.15rem] first:leading-9 first:text-foreground">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="mt-6 space-y-3 pl-1 text-[1.0625rem] leading-8 text-foreground/85 [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.9em] [&>li]:before:h-1.5 [&>li]:before:w-1.5 [&>li]:before:rounded-full [&>li]:before:bg-primary">
                    {children}
                  </ul>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="my-10 border-l-2 border-primary pl-6 text-xl leading-relaxed text-foreground">
                    {children}
                  </blockquote>
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

            <div className="mt-16 rounded-2xl border border-border bg-card p-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                Read next
              </p>
              <Link
                to="/insights/$slug"
                params={{ slug: next.slug }}
                className="group mt-4 block"
              >
                <h2 className="text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary md:text-2xl">
                  {next.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {next.metaDescription}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-primary">
                  Read the piece
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>

            <div className="mt-10">
              <BackLink />
            </div>
          </article>

          <div className="hidden lg:block" />
        </div>
      </div>
    </ArticleShell>
  );
}
