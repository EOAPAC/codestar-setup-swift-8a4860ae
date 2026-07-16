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
  { n: "1", title: "Submit your story", desc: "Share who you are, what you're building, and the journey behind it. Takes about 10 minutes." },
  { n: "2", title: "Initial screening", desc: "Every entry is read and checked for completeness and eligibility." },
  { n: "3", title: "Shortlisting", desc: "Entries that meet the bar advance to the review panel for deeper consideration." },
  { n: "4", title: "Panel evaluation", desc: "Our panel scores shortlisted founders against consistent criteria." },
  { n: "5", title: "Winner selection", desc: "Standout founders are selected and notified with next steps." },
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
        <section className="border-b border-border">
          <div className="mx-auto max-w-3xl px-6 pt-24 pb-16 text-center md:pt-32 md:pb-20">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">Methodology</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
              How Winners Are Chosen
            </h1>
            <div className="mx-auto mt-8 max-w-2xl space-y-5 text-left text-lg leading-relaxed text-muted-foreground md:text-xl">
              <p>
                Recognition here reflects what you've built — not marketing budget, not the size of your network. Every founder is read on the same page.
              </p>
              <p>
                Every entry is reviewed by our panel against the same criteria. We evaluate the person behind the business: your vision, your traction, and the journey that got you here.
              </p>
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
            <ol className="mt-16 space-y-6">
              {steps.map((s) => (
                <li key={s.n}>
                  <Card className="flex items-start gap-6 p-6 md:p-8">
                    <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
                      {s.n}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold">{s.title}</h3>
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
                <Card key={c.title} className="flex flex-col p-8">
                  <c.icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
                  <p className="mt-2 text-muted-foreground">{c.desc}</p>
                </Card>
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
