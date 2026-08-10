import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SiteCTA } from "@/components/site-cta";
import { AWARD_YEAR } from "@/content/award";
import { FileText, ClipboardCheck, Users, Award, Lightbulb, LineChart, Trophy } from "lucide-react";

const DESCRIPTION =
  "How winners are chosen. Every entry is read against three published criteria: originality, traction, and a standout achievement, with a decision within five business days.";

export const Route = createFileRoute("/criteria")({
  head: () => ({
    meta: [
      { title: "Criteria — Entrepreneur Awards" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Criteria — Entrepreneur Awards" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CriteriaPage,
});

const steps = [
  {
    n: "01",
    icon: FileText,
    title: "Entry",
    body: "Founders enter their own story through the online form. There are no nominations and no gatekeepers. Every entry is read and scored by our founder-judges.",
  },
  {
    n: "02",
    icon: ClipboardCheck,
    title: "Screening",
    body: "Every entry is read in full and checked against baseline eligibility: a clear picture of who the founder is, what they built, and the outcomes they can point to. Incomplete entries are set aside.",
  },
  {
    n: "03",
    icon: Users,
    title: "Panel review",
    body: "The panel is made up of founders and operators. Each entry is scored against the same three criteria, independently, then discussed. There are no categories, so nothing is selected by default.",
  },
  {
    n: "04",
    icon: Award,
    title: "Decision",
    body: "A decision is returned within five business days, either way, with the reason. Most entries are not selected. Founders who are not selected are welcome to enter a later cycle.",
  },
];

const criteria = [
  {
    icon: Lightbulb,
    title: "Originality",
    body: "What the founder is building, why it matters, and what makes the approach their own. We look for judgment and clarity of direction rather than novelty for its own sake.",
  },
  {
    icon: LineChart,
    title: "Traction",
    body: "Meaningful progress against the founder's own objectives. That may be revenue, customers, adoption, or measurable outcomes for the people the business serves.",
  },
  {
    icon: Trophy,
    title: "A standout achievement",
    body: "One thing the founder did that a reasonable person would call hard. Built through a setback, solved under constraint, or delivered when the odds said otherwise.",
  },
];

function CriteriaPage() {
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
              Criteria
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
              How winners are <span className="text-primary">chosen</span>
            </h1>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                Entrepreneur Awards is an independent award for founders. Every entry in the {AWARD_YEAR} cycle is read
                against the same three published criteria, in the same order, so each founder is assessed on the work
                rather than the application.
              </p>
              <p>
                There is one award and one standard. Most entries are not selected, and every founder receives a
                decision within five business days, with the reason.
              </p>
            </div>
          </div>
        </section>

        {/* Criteria */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mx-auto max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">The standard</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">Three published criteria</h2>
              <p className="mt-3 text-muted-foreground">
                Each is weighted equally, and each is read in the context of the founder's stage and industry.
              </p>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {criteria.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    className="rounded-2xl border border-border bg-background p-6 transition-colors hover:border-primary/40"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold tracking-tight">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                  </div>
                );
              })}
            </div>

            <p className="mx-auto mt-12 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Scoring is rubric-based so founders across different sectors, stages, and geographies are compared on a
              common scale. Context still matters, and the panel discusses every shortlisted entry before a decision is
              made.
            </p>
          </div>
        </section>

        {/* Review process */}
        <section className="border-t border-border bg-secondary/30 py-24 md:py-32">
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">The process</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">From entry to decision</h2>
            <p className="mt-3 text-muted-foreground">Four stages, applied the same way to every entry.</p>

            <ol className="relative mt-14 space-y-12">
              <div
                aria-hidden
                className="absolute left-6 top-2 bottom-2 hidden w-px md:block"
                style={{
                  background:
                    "linear-gradient(to bottom, color-mix(in oklab, var(--color-primary) 40%, transparent), color-mix(in oklab, var(--color-primary) 5%, transparent))",
                }}
              />
              {steps.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.n} className="relative md:pl-20">
                    <div className="absolute left-0 top-0 hidden h-12 w-12 items-center justify-center rounded-full border border-border bg-background shadow-sm md:flex">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium uppercase tracking-widest text-primary">
                        Step {parseInt(s.n)} of {steps.length}
                      </span>
                      <span className="h-px flex-1 bg-border" />
                    </div>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight">{s.title}</h3>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">{s.body}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>


        <SiteCTA
          eyebrow="Read against the same three criteria"
          heading="Put your story forward."
          subheading="One entry, one standard, and a decision within five business days."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
