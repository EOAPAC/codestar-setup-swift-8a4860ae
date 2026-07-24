import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";

// The Winner's Feature price. Edit this constant to update the page.
const WINNERS_FEATURE_PRICE = 495;

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "The Winner's Feature | The Entrepreneur Awards" },
      { name: "description", content: "Your 2026 Entrepreneur Award is yours. Turn your win into a published feature, distribution, and a keepsake award, all done for you." },
      { property: "og:title", content: "The Winner's Feature | The Entrepreneur Awards" },
      { property: "og:description", content: "Your 2026 Entrepreneur Award is yours. Turn your win into a published feature, distribution, and a keepsake award, all done for you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});

const features = [
  "A professionally written feature about you and your business, authored by our editorial team. Your story, told well.",
  "Published on The Entrepreneur Awards site at a permanent link you can send to anyone, including clients, investors, and press",
  "Shared through our founder network to put your win in front of people who don't know you yet",
  "An \"as featured\" media strip for your own website and profiles",
  "A finely crafted, engraved keepsake award to mark the achievement, sent to you",
];

function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 to-transparent px-6 py-16 md:py-24">
          <div className="absolute inset-0 -z-10 flex items-start justify-center opacity-60">
            <div className="h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl md:h-[36rem] md:w-[36rem]" />
          </div>
          <div className="relative mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-4 font-medium">
              Winner's Feature
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              You won. Let's make sure the world sees it.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Your recognition is yours. This is how you turn it into something people notice. A story worth reading, published where it counts, and a piece to mark what you built.
            </p>
          </div>
        </section>

        <section className="border-b border-border bg-secondary/30 px-6 py-12 md:py-14">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
              Already yours, free
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
              Your winner badge, shareable graphics, and write-up are yours to post today. The below is about taking it further.
            </p>
          </div>
        </section>

        <section className="px-6 py-12 md:py-20">
          <div className="mx-auto max-w-4xl">
            <Card className="relative overflow-hidden border-border bg-card p-8 md:p-12">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-primary/60" />
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-sm font-medium uppercase tracking-widest text-primary">
                  The Winner's Feature
                </p>
                <div className="mt-4 flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold tracking-tight text-foreground">
                    ${WINNERS_FEATURE_PRICE.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground">one-time</span>
                </div>
                <p className="mt-4 text-lg font-medium text-foreground">
                  Everything we do to turn your win into visibility and proof.
                </p>

                <ul className="mt-8 space-y-4 text-left">
                  {features.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-base text-foreground"
                    >
                      <Check
                        className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link to="/complete">
                      Claim your feature
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="border-t border-border px-6 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-muted-foreground">
              You built something worth recognizing. This makes sure the people who matter, the ones you want as clients, investors, and believers, actually see it.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
