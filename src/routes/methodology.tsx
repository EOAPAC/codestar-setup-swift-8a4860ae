import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SiteCTA } from "@/components/site-cta";
import { Compass, TrendingUp, Mountain, Sparkles, FileText, ScanLine, ListChecks, Users, Trophy, Quote, ShieldCheck, Scale, EyeOff } from "lucide-react";

export const Route = createFileRoute("/methodology")({
  head: () => ({
    meta: [
      { title: "Methodology — The Entrepreneur Awards" },
      { name: "description", content: "How winners are chosen: our review panel evaluates every entry against the same criteria — vision, traction, resilience, and influence." },
      { property: "og:title", content: "Methodology — The Entrepreneur Awards" },
      { property: "og:description", content: "How winners are chosen: our review panel evaluates every entry against the same criteria — vision, traction, resilience, and influence." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MethodologyPage,
});

const steps = [
  { n: "1", icon: FileText, title: "Submit your story", desc: "Share who you are, what you're building, and the journey behind it. Takes about 10 minutes." },
  { n: "2", icon: ScanLine, title: "Initial screening", desc: "Every entry is read and checked for completeness and eligibility." },
  { n: "3", icon: ListChecks, title: "Shortlisting", desc: "Entries that meet the bar advance to the review panel for deeper consideration." },
  { n: "4", icon: Users, title: "Panel evaluation", desc: "Our panel scores shortlisted founders against consistent criteria." },
  { n: "5", icon: Trophy, title: "Winner selection", desc: "Standout founders are selected and notified with next steps." },
];

const principles = [
  { icon: Scale, title: "One rubric for everyone", desc: "The same criteria, in the same order, for every founder we read." },
  { icon: EyeOff, title: "Story over surface", desc: "Marketing polish isn't scored. Substance, decisions, and outcomes are." },
  { icon: ShieldCheck, title: "Founder-led panel", desc: "Reviewed by operators who've built companies — not agencies or press." },
];

const criteria = [
  { icon: Compass, title: "Vision & leadership", desc: "The clarity of what you're building and the way you lead others toward it." },
  { icon: TrendingUp, title: "Traction & impact", desc: "Meaningful progress — customers, revenue, growth, or outcomes for the people you serve." },
  { icon: Mountain, title: "Resilience & journey", desc: "How you've navigated hard moments and what you've learned along the way." },
  { icon: Sparkles, title: "Influence & contribution", desc: "The wider effect of your work — on your industry, community, or the founders behind you." },
];

function MethodologyPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteNav />
      <main>
        <section className="relative overflow-hidden border-b border-border">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/12),transparent_70%)]"
          />
          <div className="relative mx-auto max-w-3xl px-6 pt-24 pb-16 text-center md:pt-32 md:pb-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Methodology
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
              How <span className="text-primary">Winners</span> Are Chosen
            </h1>
            <div className="mx-auto mt-8 max-w-2xl space-y-5 text-left text-lg leading-relaxed text-muted-foreground md:text-xl">
              <p>
                Recognition here reflects what you've built — not marketing budget, not the size of your network. Every founder is read on the same page.
              </p>
              <p>
                Every entry is reviewed by our panel against the same criteria. We evaluate the person behind the business: your vision, your traction, and the journey that got you here.
              </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-background/60 backdrop-blur">
              <div className="px-4 py-5">
                <p className="text-2xl font-semibold tracking-tight md:text-3xl">100%</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">Human-reviewed</p>
              </div>
              <div className="px-4 py-5">
                <p className="text-2xl font-semibold tracking-tight md:text-3xl">4</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">Scoring criteria</p>
              </div>
              <div className="px-4 py-5">
                <p className="text-2xl font-semibold tracking-tight md:text-3xl">14 days</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">To a decision</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">The process</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Five steps, one standard.
              </h2>
            </div>
            <ol className="relative mt-16 space-y-6">
              <span
                aria-hidden
                className="absolute left-6 top-6 bottom-6 hidden w-px bg-gradient-to-b from-primary/40 via-border to-transparent md:block"
              />
              {steps.map((s) => (
                <li key={s.n} className="relative">
                  <Card className="flex items-start gap-6 p-6 md:p-8">
                    <div className="relative flex-shrink-0">
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-lg font-semibold text-primary-foreground shadow-sm ring-4 ring-background">
                        {s.n}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <s.icon className="h-4 w-4 text-primary" />
                        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                          Step {s.n} of 5
                        </p>
                      </div>
                      <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
                      <p className="mt-1 text-muted-foreground">{s.desc}</p>
                    </div>
                  </Card>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-border bg-secondary/30 py-24 md:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">What we look for</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Four dimensions the panel scores.
              </h2>
            </div>
            <div className="mt-16 grid gap-6 md:grid-cols-2">
              {criteria.map((c) => (
                <Card key={c.title} className="group relative flex flex-col overflow-hidden p-8 transition-colors hover:border-primary/40">
                  <span
                    aria-hidden
                    className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 transition-transform group-hover:scale-125"
                  />
                  <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <h3 className="relative mt-5 text-lg font-semibold">{c.title}</h3>
                  <p className="relative mt-2 text-muted-foreground">{c.desc}</p>
                </Card>
              ))}
            </div>

            <figure className="relative mx-auto mt-20 max-w-3xl">
              <Quote className="absolute -top-4 left-0 h-10 w-10 text-primary/20" aria-hidden />
              <blockquote className="pl-12 text-xl font-medium leading-relaxed tracking-tight text-foreground md:text-2xl">
                "We're looking for founders who've made hard calls and can show what came of them. Not the loudest voice — the clearest one."
              </blockquote>
              <figcaption className="mt-4 pl-12 text-sm text-muted-foreground">
                — Review panel note, 2025 cycle
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">Our principles</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Why founders trust the read.
              </h2>
            </div>
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {principles.map((p) => (
                <div
                  key={p.title}
                  className="flex flex-col rounded-2xl border border-border bg-background p-6 md:p-8"
                >
                  <p.icon className="h-5 w-5 text-primary" />
                  <h3 className="mt-4 text-base font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SiteCTA
          eyebrow="Ready to be considered"
          heading="Put your story in front of the panel."
          subheading="Free to put your story forward. Reviewed by founders, not marketers."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
