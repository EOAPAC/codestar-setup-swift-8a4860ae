import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Award } from "lucide-react";
import { cn } from "@/lib/utils";

// Winner package prices. Edit these constants to update every card.
const RECOGNIZED_PRICE = 245;
const FEATURED_PRICE = 495;
const HEADLINE_PRICE = 895;

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Winner Packages | The Entrepreneur Awards" },
      { name: "description", content: "You've won. Now decide how far your recognition travels. Winner packages make your win verifiable, published, and seen." },
      { property: "og:title", content: "Winner Packages | The Entrepreneur Awards" },
      { property: "og:description", content: "You've won. Now decide how far your recognition travels. Winner packages make your win verifiable, published, and seen." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});

interface Tier {
  id: string;
  name: string;
  price: number;
  tagline: string;
  featured?: boolean;
  ctaLabel: string;
  items: string[];
  footer: string;
}

const tiers: Tier[] = [
  {
    id: "recognized",
    name: "Recognized",
    price: RECOGNIZED_PRICE,
    tagline: "Make it official.",
    ctaLabel: "Claim Recognized",
    items: [
      "A published, verifiable profile page for your win — a permanent link others can check",
      "Listed in the Winners Directory, findable when someone searches your name",
    ],
    footer: "For the founder who wants their win on the record and verifiable.",
  },
  {
    id: "featured",
    name: "Featured",
    price: FEATURED_PRICE,
    tagline: "Get it in the press.",
    featured: true,
    ctaLabel: "Claim Featured",
    items: [
      "Everything in Recognized, plus:",
      "Your story distributed through our press network to business and startup media",
      "Coverage packaged as proof you can send to prospects and investors",
      "An \"as seen in\" media strip for your website",
    ],
    footer: "For the founder who wants to be seen where it changes the conversation.",
  },
  {
    id: "headline",
    name: "Headline",
    price: HEADLINE_PRICE,
    tagline: "The full spotlight.",
    ctaLabel: "Claim Headline",
    items: [
      "Everything in Featured, plus:",
      "A flagship, long-form founder feature",
      "Our widest press-network distribution",
      "Priority placement in the Winners Directory",
    ],
    footer: "For the founder who wants their win working everywhere, for good.",
  },
];

const freeBenefits = [
  "Your official winner badge and shareable graphics",
  "Your written recognition (the write-up) — yours to keep and share",
  "Confirmation of your win",
];

function Price({ value }: { value: number }) {
  return (
    <span className="text-4xl font-bold tracking-tight text-foreground">
      ${value.toLocaleString()}
    </span>
  );
}

function PricingCard({ tier }: { tier: Tier }) {
  return (
    <Card
      className={cn(
        "relative flex flex-col p-6 md:p-8",
        tier.featured
          ? "border-primary bg-primary/[0.03] ring-2 ring-primary/15"
          : "border-border bg-card"
      )}
    >
      {tier.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground hover:bg-primary">
            <Award className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
            Most Popular
          </Badge>
        </div>
      )}

      <div className="mb-4 text-center">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {tier.name}
        </h3>
        <div className="mt-2 flex items-baseline justify-center gap-1">
          <Price value={tier.price} />
        </div>
        <p className={cn("mt-2 text-sm font-medium", tier.featured ? "text-primary" : "text-muted-foreground")}>
          {tier.tagline}
        </p>
      </div>

      <div className="flex-1">
        <ul className="space-y-3">
          {tier.items.map((item, index) => (
            <li key={`${tier.id}-${index}`} className="flex items-start gap-3 text-sm text-foreground">
              <Check
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0",
                  tier.featured ? "text-primary" : "text-primary/80"
                )}
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
        {tier.footer}
      </p>

      <div className="mt-6">
        <Button
          asChild
          className={cn(
            "w-full",
            tier.featured
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "border-primary text-primary hover:bg-primary/5"
          )}
          variant={tier.featured ? "default" : "outline"}
        >
          <Link to="/complete">{tier.ctaLabel}</Link>
        </Button>
      </div>
    </Card>
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
              You've won. Now decide how far it travels.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Your recognition is yours to share today. These options make it verifiable, published, and seen — where the people evaluating you will actually find it.
            </p>
          </div>
        </section>

        <section className="px-6 py-12 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-3">
              {tiers.map((tier) => (
                <PricingCard key={tier.id} tier={tier} />
              ))}
            </div>
            <p className="mt-10 text-center text-sm text-muted-foreground">
              Every winner keeps their badge, graphics, and write-up for free — these options are about how far you take them.
            </p>
          </div>
        </section>

        <section className="border-t border-border px-6 py-10">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-sm text-muted-foreground">
              Every winner is independently reviewed and selected.{" "}
              <Link to="/methodology" className="underline-offset-2 hover:text-foreground hover:underline">
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
