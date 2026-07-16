import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/methodology")({
  head: () => ({
    meta: [
      { title: "Methodology — The Entrepreneur Awards" },
      { name: "description", content: "How winners are chosen. Our review panel evaluates every entry against the same criteria: vision, traction, resilience, and influence." },
      { property: "og:title", content: "Methodology — The Entrepreneur Awards" },
      { property: "og:description", content: "How winners are chosen. Our review panel evaluates every entry against the same criteria: vision, traction, resilience, and influence." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MethodologyPage,
});

const steps = [
  {
    n: "01",
    title: "Submission",
    body: "Founders enter their own story through our online form. There are no nomination gatekeepers. Anyone building a business can put their name forward, at any stage, in any industry. Entries include the founder's background, the business they lead, and the milestones that matter to them.",
  },
  {
    n: "02",
    title: "Initial screening",
    body: "Every entry is read by our team and checked against baseline eligibility. We look for a clear picture of who the founder is, what they've built, and the outcomes they can point to. Incomplete entries are set aside; complete entries advance to the review panel.",
  },
  {
    n: "03",
    title: "Shortlisting",
    body: "Screened entries are scored against a consistent rubric covering vision, traction, resilience, and influence. Shortlisted founders may be asked for additional context, such as customer references, milestone data, or supporting materials that add depth to the story on file.",
  },
  {
    n: "04",
    title: "Panel evaluation",
    body: "The review panel is composed of operators and founders who read shortlisted entries in full. Each criterion is scored independently, then discussed. The goal is a considered read of the founder in context, not a checklist of surface metrics.",
  },
  {
    n: "05",
    title: "Winner selection",
    body: "Final selections are made based on panel scores and discussion. Winners are notified directly with next steps. Founders who are not selected in the current cycle receive a note on the outcome and are welcome to enter again in future cycles.",
  },
];

const criteria = [
  {
    title: "Vision",
    body: "The clarity of what the founder is building, why it matters, and where it's heading. We consider originality of thought and the ability to articulate a direction others can follow.",
  },
  {
    title: "Traction",
    body: "Meaningful progress against the founder's own objectives. This may include revenue, customers, adoption, or measurable outcomes for the people the business serves.",
  },
  {
    title: "Resilience",
    body: "How the founder has navigated difficulty, setbacks, or pivots. We look for evidence of learning, judgment under pressure, and the ability to continue building through hard periods.",
  },
  {
    title: "Influence",
    body: "The wider effect of the founder's work on their industry, community, or the people around them. This includes mentorship, contribution, and the ripple beyond direct business results.",
  },
];

function MethodologyPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteNav />
      <main>
        <section className="border-b border-border">
          <div className="mx-auto max-w-3xl px-6 pt-24 pb-16 md:pt-32 md:pb-20">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Methodology
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              How Winners Are Chosen
            </h1>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                The Entrepreneur Awards recognize founders based on what they've built and the way they've built it. Every entry is read by our review panel against the same set of criteria, in the same order, so that founders can be assessed on their own merits.
              </p>
              <p>
                Our process is designed to evaluate the person behind the business. Marketing polish is not scored. Substance, judgment, and outcomes are. This page describes the stages an entry moves through, from submission to selection, and the criteria the panel uses along the way.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              The review process
            </h2>
            <p className="mt-3 text-muted-foreground">
              Five stages, applied consistently to every entry.
            </p>

            <ol className="mt-14 space-y-14">
              {steps.map((s) => (
                <li key={s.n} className="border-t border-border pt-10">
                  <div className="flex items-baseline gap-4">
                    <span className="text-sm font-medium tracking-widest text-primary">
                      {s.n}
                    </span>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-border bg-secondary/30 py-24 md:py-32">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Evaluation criteria
            </h2>
            <p className="mt-3 text-muted-foreground">
              The panel scores four dimensions. Each is weighted equally, and each is considered in the context of the founder's stage and industry.
            </p>

            <div className="mt-12 divide-y divide-border border-y border-border">
              {criteria.map((c) => (
                <div key={c.title} className="grid gap-2 py-8 md:grid-cols-[200px_1fr] md:gap-10">
                  <h3 className="text-base font-semibold tracking-tight">
                    {c.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-12 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Scoring is intentionally rubric-based so that founders across different sectors, stages, and geographies can be compared on a common scale. Context still matters, and the panel discusses each shortlisted entry before final selections are made.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
