import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Award, Quote } from "lucide-react";

export const Route = createFileRoute("/winners")({
  head: () => ({
    meta: [
      { title: "Past Winners | Entrepreneur Awards" },
      {
        name: "description",
        content:
          "Founders recognized by Entrepreneur Awards. A record of the operators, builders, and category leaders honored in previous cycles.",
      },
      { property: "og:title", content: "Past Winners | Entrepreneur Awards" },
      {
        property: "og:description",
        content:
          "Founders recognized by Entrepreneur Awards. A record of the operators, builders, and category leaders honored in previous cycles.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WinnersPage,
});

type Winner = {
  name: string;
  company: string;
  category: string;
  location: string;
  citation: string;
};

const cycles: { year: string; theme: string; winners: Winner[] }[] = [
  {
    year: "2025",
    theme: "Operators who built through a hard year.",
    winners: [
      {
        name: "Amara Osei",
        company: "Kindred Health",
        category: "Healthcare",
        location: "Toronto, CA",
        citation:
          "Recognized for scaling a community clinic model into three cities without diluting the standard of care that defined the first location.",
      },
      {
        name: "Daniel Reyes",
        company: "Fieldline Robotics",
        category: "Industrial",
        location: "Austin, US",
        citation:
          "Recognized for translating a decade of factory-floor engineering into a robotics platform now used by mid-market manufacturers across North America.",
      },
      {
        name: "Priya Menon",
        company: "Ledgerhouse",
        category: "Fintech",
        location: "Singapore",
        citation:
          "Recognized for building a bookkeeping platform that treats small businesses as the primary customer, not an afterthought.",
      },
      {
        name: "Sofia Lindqvist",
        company: "Norra Studio",
        category: "Design & Media",
        location: "Stockholm, SE",
        citation:
          "Recognized for a design practice whose work has become a reference point for a generation of independent studios across the Nordics.",
      },
    ],
  },
  {
    year: "2024",
    theme: "Founders who turned early conviction into durable businesses.",
    winners: [
      {
        name: "Marcus Hale",
        company: "Groundwork Coffee Co.",
        category: "Consumer",
        location: "Melbourne, AU",
        citation:
          "Recognized for a specialty roaster that grew into a national wholesale business without compromising sourcing standards.",
      },
      {
        name: "Yuki Tanaka",
        company: "Hako Software",
        category: "B2B Software",
        location: "Tokyo, JP",
        citation:
          "Recognized for a developer tools company that quietly became infrastructure for a generation of Japanese startups.",
      },
      {
        name: "Elena Bianchi",
        company: "Casa Verde",
        category: "Hospitality",
        location: "Milan, IT",
        citation:
          "Recognized for turning a single restaurant into a hospitality group that reinvests locally and trains its own leadership from within.",
      },
    ],
  },
];

function WinnersPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteNav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/18),transparent_70%)]"
          />
          <div className="relative mx-auto max-w-3xl px-6 pt-24 pb-16 text-center md:pt-32 md:pb-20">
            <span className="inline-flex items-center rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
              Past winners
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
              A record of the founders we've honored
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Each cycle, the review panel selects a group of founders whose
              work reflects the criteria we hold every entry to. This page is a
              record of the operators recognized in previous cycles, in their
              own categories, in their own words.
            </p>
          </div>
        </section>

        {/* Cycles */}
        {cycles.map((cycle, idx) => (
          <section
            key={cycle.year}
            className={
              idx % 2 === 0
                ? "py-20 md:py-28"
                : "border-t border-border bg-secondary/30 py-20 md:py-28"
            }
          >
            <div className="mx-auto max-w-5xl px-6">
              <div className="flex items-baseline justify-between gap-6 border-b border-border pb-6">
                <div>
                  <div className="text-xs font-medium uppercase tracking-widest text-primary">
                    Class of
                  </div>
                  <div className="mt-1 text-4xl font-semibold tracking-tight md:text-5xl">
                    {cycle.year}
                  </div>
                </div>
                <p className="max-w-md text-right text-sm leading-relaxed text-muted-foreground md:text-base">
                  {cycle.theme}
                </p>
              </div>

              <ul className="mt-10 grid gap-4 md:grid-cols-2">
                {cycle.winners.map((w) => (
                  <li
                    key={`${cycle.year}-${w.name}`}
                    className="group rounded-2xl border border-border bg-background p-6 transition-colors hover:border-primary/40"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold tracking-tight">
                          {w.name}
                        </h3>
                        <div className="mt-1 text-sm text-muted-foreground">
                          {w.company} · {w.location}
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-[11px] font-medium uppercase tracking-widest text-primary">
                        <Award className="h-3 w-3" />
                        {w.category}
                      </span>
                    </div>
                    <div className="mt-5 flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <Quote className="mt-0.5 h-4 w-4 flex-none text-primary/60" />
                      <p>{w.citation}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="border-t border-border py-24 md:py-32">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              The 2026 cycle is open
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Entries are read against the same criteria applied to every
              founder recognized before. If you're building something worth
              putting on the record, put your name forward.
            </p>
            <div className="mt-8">
              <a
                href="/#submit"
                className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Start your entry
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
