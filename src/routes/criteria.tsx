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
    body: "Every entry is read as the founder's own account of what they built, and scored by our founder-judges against the same three criteria.",
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
        <section className="border-b border-border">
          <div className="mx-auto max-w-[1120px] px-6 pt-20 pb-16 md:pt-28 md:pb-20">
            <h1 className="text-5xl font-extrabold tracking-[-0.02em] md:text-6xl">How winners are chosen</h1>
            <div className="mt-8 max-w-[680px] space-y-5 text-xl leading-relaxed">
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

        <section className="border-b border-border py-20 md:py-28">
          <div className="mx-auto max-w-[1120px] px-6">
            <h2 className="text-4xl font-extrabold tracking-[-0.02em] md:text-5xl">Three published criteria</h2>
            <p className="mt-5 max-w-[680px] text-muted-foreground">
              Each is weighted equally, and each is read in the context of the founder's stage and industry.
            </p>
            <dl className="mt-12 divide-y divide-border border-y border-border">
              {criteria.map((c) => (
                <div key={c.title} className="grid gap-2 py-6 md:grid-cols-[280px_1fr] md:gap-10">
                  <dt className="text-xl font-bold">{c.title}</dt>
                  <dd className="max-w-[680px] text-muted-foreground">{c.body}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-10 max-w-[680px] text-muted-foreground">
              Scoring is rubric-based so founders across different sectors, stages, and geographies are compared on a
              common scale. Context still matters, and the panel discusses every shortlisted entry before a decision is
              made.
            </p>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-[1120px] px-6">
            <h2 className="text-4xl font-extrabold tracking-[-0.02em] md:text-5xl">From entry to decision</h2>
            <p className="mt-5 max-w-[680px] text-muted-foreground">Four stages, applied the same way to every entry.</p>
            <ol className="mt-12 max-w-[680px] space-y-8 border-l border-foreground pl-6">
              {steps.map((s) => (
                <li key={s.n} className="relative">
                  <span aria-hidden className="absolute top-2.5 -left-[29px] size-2.5 rounded-full bg-foreground" />
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-muted-foreground">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <SiteCTA
          heading="Put your story forward."
          subheading="One entry, one standard, and a decision within five business days."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
