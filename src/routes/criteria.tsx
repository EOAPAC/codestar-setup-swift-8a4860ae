import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SiteCTA } from "@/components/site-cta";
import winnersHeroAsset from "@/assets/winners-hero-trophy.jpg.asset.json";
import { AWARD_YEAR } from "@/content/award";
import { FileText, ClipboardCheck, Users, Award, Lightbulb, LineChart, Trophy } from "lucide-react";

const DESCRIPTION =
  "How winners are chosen. Every entry is read against three published criteria: originality, traction, and a standout achievement, with a decision within five business days.";

export const Route = createFileRoute("/criteria")({
  head: () => ({
    meta: [
      { title: "Criteria | Entrepreneur Awards" },
      { name: "description", content: DESCRIPTION },
      { name: "twitter:description", content: DESCRIPTION },
      { property: "og:title", content: "Criteria | Entrepreneur Awards" },
      { name: "twitter:title", content: "Criteria | Entrepreneur Awards" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: winnersHeroAsset.url },
      { name: "twitter:image", content: winnersHeroAsset.url },
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
    body: "What the founder is building, why it matters, and what makes the approach their own. We look for judgment and clarity of direction.",
  },
  {
    icon: LineChart,
    title: "Traction",
    body: "Meaningful progress against the founder's own objectives. That may be revenue, customers, adoption, or measurable outcomes for the people the business serves.",
  },
  {
    icon: Trophy,
    title: "A standout achievement",
    body: "One thing the founder did that a reasonable person would call hard. For example, recovering from a setback or delivering under tight constraints.",
  },
];

function CriteriaPage() {
  return (
    <div className="criteria-colour-restored min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteNav />
      <main>
        {/* Hero */}
        <section className="restored-page-header">
          <img src={winnersHeroAsset.url} alt="" aria-hidden="true" className="restored-page-header-image" />
          <div className="restored-page-header-shade" aria-hidden="true" />
          <div className="restored-page-header-content">
            <div className="restored-page-header-copy">
            <h1 className="text-[26px] font-semibold leading-tight text-header-foreground lg:text-[38px]">
              How winners are <span>chosen</span>
            </h1>
            <div className="mt-3 space-y-3 text-[15px] leading-normal text-header-subtitle">
              <p>Every {AWARD_YEAR} entry is read against the same three published criteria, in the same order.</p>
            </div>
            </div>
          </div>
        </section>

        {/* Criteria */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mx-auto max-w-3xl">
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">Three published criteria</h2>
              <p className="mt-3 text-muted-foreground">
                There is one award and one standard. Each criterion is weighted equally and read in the context of the founder's stage and industry.
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
                      <span className="text-xs font-medium text-primary">
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
          eyebrow=""
          heading="Enter the 2026 Awards."
          subheading="One entry, one standard, and a decision within five business days."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
