import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Winner package prices. Edit these constants to update every card.
const REACH_ROUTE_PRICE = 495;
const KEEPSAKE_ROUTE_PRICE = 495;

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Winner Packages | The Entrepreneur Awards" },
      { name: "description", content: "Your 2026 Entrepreneur Award is yours. Choose how you take your recognition — spread the reach, or hold the keepsake." },
      { property: "og:title", content: "Winner Packages | The Entrepreneur Awards" },
      { property: "og:description", content: "Your 2026 Entrepreneur Award is yours. Choose how you take your recognition — spread the reach, or hold the keepsake." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});

interface Path {
  id: string;
  name: string;
  price: number;
  tagline: string;
  ctaLabel: string;
  items: string[];
  footer: string;
}

const paths: Path[] = [
  {
    id: "reach",
    name: "The Reach Route",
    price: REACH_ROUTE_PRICE,
    tagline: "Get your win seen.",
    ctaLabel: "Choose the Reach Route",
    items: [
      "Your recognition published at a permanent, verifiable link — proof others can check",
      "Your profile in the winners directory, optimized to surface when someone searches you",
      "Distribution of your win through our founder/press network",
    ],
    footer: "For the founder who wants their win working online, in front of people who don't know them yet.",
  },
  {
    id: "keepsake",
    name: "The Keepsake Route",
    price: KEEPSAKE_ROUTE_PRICE,
    tagline: "Hold your win.",
    ctaLabel: "Choose the Keepsake Route",
    items: [
      "A finely crafted, engraved award — a real piece for your desk or office, sent to you",
      "A framed certificate of your recognition",
      "Your winner badge and graphics, ready to display",
    ],
    footer: "For the founder who wants something real to mark the achievement.",
  },
];

function Price({ value }: { value: number }) {
  return (
    <span className="text-4xl font-bold tracking-tight text-foreground">
      ${value.toLocaleString()}
    </span>
  );
}

function PathCard({ path }: { path: Path }) {
  return (
    <Card className="relative flex flex-col border-border bg-card p-6 md:p-8">
      <div className="mb-4 text-center">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {path.name}
        </h3>
        <div className="mt-2 flex items-baseline justify-center gap-1">
          <Price value={path.price} />
        </div>
        <p className="mt-2 text-sm font-medium text-primary">
          {path.tagline}
        </p>
      </div>

      <div className="flex-1">
        <ul className="space-y-3">
          {path.items.map((item, index) => (
            <li
              key={`${path.id}-${index}`}
              className="flex items-start gap-3 text-sm text-foreground"
            >
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-primary/80"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
        {path.footer}
      </p>

      <div className="mt-6">
        <Button
          asChild
          className="w-full border-primary text-primary hover:bg-primary/5"
          variant="outline"
        >
          <Link to="/complete">{path.ctaLabel}</Link>
        </Button>
      </div>
    </Card>
  );
}

function FreeBenefitsSection() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-border bg-primary/[0.03] px-6 py-8 md:px-10 md:py-10">
        <h2 className="text-center text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Free with your win
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm text-muted-foreground">
          Your winner badge, shareable graphics, and your written write-up — yours to post and share today.
        </p>
      </div>
    </div>
  );
}

function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 to-transparent px-6 py-16 md:py-24">
          <div className="absolute inset-0 -z-10 flex items-start justify-center opacity-60">
            <div className="h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl md:h-[36rem] md:w-[36rem]" />
          </div>
          <div className="relative mx-auto max-w-6xl text-center">
            <Badge variant="outline" className="mb-4 font-medium">
              Winner Packages
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              You won. Now choose how you take it.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Your 2026 Entrepreneur Award is yours. Pick the path that fits how you want to use it — both carry the same recognition.
            </p>
          </div>
        </section>

        <section className="px-6 py-12 md:py-16">
          <FreeBenefitsSection />
        </section>

        <section className="px-6 pb-12 md:pb-20">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-6 md:grid-cols-2">
              {paths.map((path) => (
                <PathCard key={path.id} path={path} />
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-sm text-muted-foreground">
                Want both?{" "}
                <Link
                  to="/complete"
                  className="font-medium text-foreground underline-offset-2 hover:text-primary hover:underline"
                >
                  Take both paths →
                </Link>
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-border px-6 py-10">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-sm text-muted-foreground">
              Every winner is independently reviewed and selected.{" "}
              <Link
                to="/methodology"
                className="underline-offset-2 hover:text-foreground hover:underline"
              >
                Methodology
              </Link>
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
