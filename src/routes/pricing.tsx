import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Award } from "lucide-react";
import { cn } from "@/lib/utils";

// Placeholder prices. Edit these constants to update every card.
const TIER_1_PRICE = 245;
const TIER_2_PRICE = 495;
const TIER_3_PRICE = 895;

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Winner Packages | The Entrepreneur Awards" },
      { name: "description", content: "Choose your Winner Package. Turn your Entrepreneur Awards recognition into visibility, credibility, and momentum." },
      { property: "og:title", content: "Winner Packages | The Entrepreneur Awards" },
      { property: "og:description", content: "Choose your Winner Package. Turn your Entrepreneur Awards recognition into visibility, credibility, and momentum." },
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
  hook: string;
  featured?: boolean;
  ctaLabel: string;
  items: string[];
  plusNote?: string;
}

const tiers: Tier[] = [
  {
    id: "recognized",
    name: "Recognized",
    price: TIER_1_PRICE,
    hook: "The essentials to share your win.",
    ctaLabel: "Claim Recognized",
    items: [
      "Official winner badge & seal",
      "Digital certificate",
      "Your profile in the Winners Directory with a shareable link",
      "Email-signature badge",
      "Ready-to-post announcement graphic + copy",
    ],
  },
  {
    id: "featured",
    name: "Featured",
    price: TIER_2_PRICE,
    hook: "Press, story, and a plaque you can hold.",
    featured: true,
    ctaLabel: "Claim Featured",
    plusNote: "Everything in Recognized, plus:",
    items: [
      "A published founder-story write-up on our site",
      "A press release announcing your win, distributed to business outlets",
      "An engraved plaque, shipped to you",
    ],
  },
  {
    id: "headline",
    name: "Headline",
    price: TIER_3_PRICE,
    hook: "Maximum visibility for a major milestone.",
    ctaLabel: "Claim Headline",
    plusNote: "Everything in Featured, plus:",
    items: [
      "Multi-outlet press distribution",
      "An \"as seen in\" media banner for your site",
      "A premium crystal trophy, shipped to you",
    ],
  },
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
          ? "border-primary ring-2 ring-primary/15 bg-primary/[0.03]"
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
        <p className="mt-2 text-sm text-muted-foreground">{tier.hook}</p>
      </div>

      <div className="flex-1">
        {tier.plusNote && (
          <p className="mb-3 text-sm font-medium text-foreground">{tier.plusNote}</p>
        )}
        <ul className="space-y-3">
          {tier.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-foreground">
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

      <div className="mt-8">
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
        <section className="border-b border-border bg-gradient-to-b from-primary/5 to-transparent px-6 py-16 md:py-24">
          <div className="mx-auto max-w-6xl text-center">
            <Badge variant="outline" className="mb-4 font-medium">
              <Award className="mr-1.5 h-3.5 w-3.5 text-primary" aria-hidden="true" />
              For Winners
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Winner Packages
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Choose how you put your win to work. Physical items are included, not add-ons.
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

            <p className="mt-8 text-center text-xs text-muted-foreground">
              Prices are placeholder values. Final package details will be confirmed with selected entrants.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
