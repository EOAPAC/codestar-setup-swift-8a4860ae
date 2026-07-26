import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import {
  LAST_UPDATED,
  TERMS_INTRO,
  TERMS_SECTIONS,
  type TermsSection,
} from "@/content/terms";

// Render **bold** and [text](/path) inline. Router Link for internal /paths.
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex =
    /\*\*(.+?)\*\*|\[([^\]]+)\]\((\/[^)]+)\)|\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1] !== undefined) {
      nodes.push(
        <strong key={key++} className="font-semibold text-foreground">
          {match[1]}
        </strong>,
      );
    } else if (match[2] !== undefined && match[3] !== undefined) {
      nodes.push(
        <Link
          key={key++}
          to={match[3]}
          className="text-primary underline underline-offset-4 hover:opacity-80"
        >
          {match[2]}
        </Link>,
      );
    } else if (match[4] !== undefined && match[5] !== undefined) {
      nodes.push(
        <a
          key={key++}
          href={match[5]}
          className="text-primary underline underline-offset-4 hover:opacity-80"
        >
          {match[4]}
        </a>,
      );
    }
    last = regex.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function Clause({ text }: { text: string }) {
  if (text.startsWith("EDITORIAL NOTE")) {
    return (
      <blockquote className="my-6 rounded-md border-l-4 border-primary bg-secondary/60 px-5 py-4 text-sm text-muted-foreground">
        <span className="mr-2 rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary">
          Editorial note
        </span>
        {renderInline(text.replace(/^EDITORIAL NOTE\s*—\s*/, ""))}
      </blockquote>
    );
  }
  return (
    <p className="leading-relaxed text-foreground/90">{renderInline(text)}</p>
  );
}

function TableOfContents({
  sections,
  activeId,
}: {
  sections: TermsSection[];
  activeId: string;
}) {
  return (
    <nav aria-label="Table of contents">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </p>
      <ol className="space-y-2 text-sm">
        {sections.map((s) => {
          const active = s.id === activeId;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={
                  active
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }
              >
                {s.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default function TermsAndConditions() {
  const [activeId, setActiveId] = useState<string>(TERMS_SECTIONS[0]?.id ?? "");

  useEffect(() => {
    const headings = TERMS_SECTIONS.map((s) =>
      document.getElementById(s.id),
    ).filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased [scroll-behavior:smooth]">
      <SiteNav />

      <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-12">
          <article className="mx-auto w-full max-w-3xl">
            <header className="mb-10">
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Terms and Conditions
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">
                Last updated: {LAST_UPDATED}
              </p>
            </header>

            <div className="space-y-4 text-base text-foreground/90 leading-relaxed">
              {TERMS_INTRO.map((p, i) => (
                <p key={i}>{renderInline(p)}</p>
              ))}
            </div>

            <details className="mt-10 rounded-md border border-border p-4 lg:hidden">
              <summary className="cursor-pointer text-sm font-medium">
                On this page
              </summary>
              <div className="mt-4">
                <TableOfContents
                  sections={TERMS_SECTIONS}
                  activeId={activeId}
                />
              </div>
            </details>

            <div className="mt-12 space-y-12">
              {TERMS_SECTIONS.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 border-t border-border/70 pt-10 first:border-t-0 first:pt-0"
                >
                  <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                    {section.title}
                  </h2>
                  <div className="space-y-4 text-base">
                    {section.body.map((clause, i) => (
                      <Clause key={i} text={clause} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents sections={TERMS_SECTIONS} activeId={activeId} />
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
