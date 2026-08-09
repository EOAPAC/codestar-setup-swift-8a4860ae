import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { FileText, ClipboardCheck, ListChecks, Users, Award, Compass, LineChart, Shield, Network } from "lucide-react";

export const Route = createFileRoute("/criteria")({
  head: () => ({
    meta: [
      { title: "Criteria | Entrepreneur Awards" },
      { name: "description", content: "How winners are chosen. Our review panel evaluates every entry against the same criteria: vision, traction, resilience, and influence." },
      { property: "og:title", content: "Criteria | Entrepreneur Awards" },
      { property: "og:description", content: "How winners are chosen. Our review panel evaluates every entry against the same criteria: vision, traction, resilience, and influence." },
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
    title: "Submission",
    body: "Founders enter their own story through our online form. There are no nomination gatekeepers. Anyone building a business can put their name forward, at any stage, in any industry. Entries include the founder's background, the business they lead, and the milestones that matter to them.",
  },
  {
    n: "02",
    icon: ClipboardCheck,
    title: "Initial screening",
    body: "Every entry is read by our team and checked against baseline eligibility. We look for a clear picture of who the founder is, what they've built, and the outcomes they can point to. Incomplete entries are set aside; complete entries advance to the review panel.",
  },
  {
    n: "03",
    icon: ListChecks,
    title: "Shortlisting",
    body: "Screened entries are scored against a consistent rubric covering vision, traction, resilience, and influence. Shortlisted founders may be asked for additional context, such as customer references, milestone data, or supporting materials that add depth to the story on file.",
  },
  {
    n: "04",
    icon: Users,
    title: "Panel evaluation",
    body: "The review panel is composed of operators and founders who read shortlisted entries in full. Each criterion is scored independently, then discussed. The goal is a considered read of the founder in context, not a checklist of surface metrics.",
  },
  {
    n: "05",
    icon: Award,
    title: "Winner selection",
    body: "Final selections are made based on panel scores and discussion. Winners are notified directly with next steps. Founders who are not selected in the current cycle receive a note on the outcome and are welcome to enter again in future cycles.",
  },
];

const criteria = [
  {
    icon: Compass,
    title: "Vision",
    body: "The clarity of what the founder is building, why it matters, and where it's heading. We consider originality of thought and the ability to articulate a direction others can follow.",
  },
  {
    icon: LineChart,
    title: "Traction",
    body: "Meaningful progress against the founder's own objectives. This may include revenue, customers, adoption, or measurable outcomes for the people the business serves.",
  },
  {
    icon: Shield,
    title: "Resilience",
    body: "How the founder has navigated difficulty, setbacks, or pivots. We look for evidence of learning, judgment under pressure, and the ability to continue building through hard periods.",
  },
  {
    icon: Network,
    title: "Influence",
    body: "The wider effect of the founder's work on their industry, community, or the people around them. This includes mentorship, contribution, and the ripple beyond direct business results.",
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
              Methodology
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
              How Winners Are Chosen
            </h1>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                Entrepreneur Awards honors founders for the businesses they build and the judgment they show along the way. Every entry is reviewed against the same set of criteria, in the same order, so each founder is assessed on their own merits.
              </p>
              <p>
                Entries are evaluated on the substance of the business and the outcomes the founder can demonstrate. This page outlines the stages of our review process, from submission through to final selection, and the criteria the panel applies at each step.
              </p>
            </div>
          </div>
        </section>

        {/* Review process */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              The review process
            </h2>
            <p className="mt-3 text-muted-foreground">
              Five stages, applied consistently to every entry.
            </p>

            <ol className="relative mt-14 space-y-12">
              {/* connecting line */}
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
                        Step {parseInt(s.n)} of 5
                      </span>
                      <span className="h-px flex-1 bg-border" />
                    </div>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                      {s.body}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Criteria */}
        <section className="border-t border-border bg-secondary/30 py-24 md:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Evaluation criteria
              </h2>
              <p className="mt-3 text-muted-foreground">
                The panel scores four dimensions. Each is weighted equally, and each is considered in the context of the founder's stage and industry.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {criteria.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    className="group rounded-2xl border border-border bg-background p-6 transition-colors hover:border-primary/40"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold tracking-tight">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {c.body}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="mx-auto mt-12 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Scoring is intentionally rubric-based so that founders across different sectors, stages, and geographies can be compared on a common scale. Context still matters, and the panel discusses each shortlisted entry before final selections are made.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
