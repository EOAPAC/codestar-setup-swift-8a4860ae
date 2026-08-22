import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Award } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AWARD_YEAR } from "@/content/award";
import markAsset from "@/assets/ea-mark.png.asset.json";

export const Route = createFileRoute("/pricing/aj")({
  head: () => ({
    meta: [
      { title: "Apply for an Entrepreneur Award — Entrepreneur Awards" },
      {
        name: "description",
        content: `Apply for your ${AWARD_YEAR} Entrepreneur Award. The Winner Package includes press coverage, an engraved trophy, certificate, winner page, and publicity kit.`,
      },
      { property: "og:title", content: "Apply for an Entrepreneur Award — Entrepreneur Awards" },
      {
        property: "og:description",
        content: `Apply for your ${AWARD_YEAR} Entrepreneur Award. The Winner Package includes press coverage, an engraved trophy, certificate, winner page, and publicity kit.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});



const includedItems = [
  {
    label: "Feature story",
    detail: "1 guaranteed feature story about your win — your choice of: a regional edition of Forbes, Fast Company, GQ, International Business Times, or MSN",
  },
  {
    label: "Press announcement",
    detail: "1 press announcement — your choice of: Business Insider, Fortune, USA Today, Associated Press, or Reuters",
  },
  {
    label: "Engraved crystal trophy",
    detail: "Shipped worldwide",
  },
  {
    label: "Letter confirming your win",
  },
  {
    label: "Digital winner's certificate",
  },
  {
    label: "Winner page on this site",
  },
];

const faqs = [
  {
    question: "Who nominated my business?",
    answer:
      "Most nominees are recommended to us by Baden Bower, a PR agency we work with, which provides a brief about each business it puts forward. Businesses can also enter directly.",
  },
  {
    question: "Do I have to pay to win?",
    answer:
      "No. Winning is decided by the judging panel before any payment. The Winner Package is how you claim and publicise the win: the title, trophy, press coverage, certificate, and publicity assets.",
  },
  {
    question: "How do I choose my publications?",
    answer:
      "At checkout you select one outlet from the feature story list and one from the press announcement list. Your confirmation email states your selections back to you.",
  },
  {
    question: "What happens if I don't claim?",
    answer:
      "Your result stands, but the trophy, certificate, winner page, and press coverage are only produced for claimed awards. The claim window for each cohort closes on the date in your notification email.",
  },
  {
    question: "When is my coverage published?",
    answer:
      "Within a few weeks of claiming. You approve the feature story draft before it goes live.",
  },
  {
    question: "Is the payment refundable?",
    answer:
      "If a publication included in your package is not published, that deliverable is refunded under the package terms.",
  },
];

function ApplyButton({ size = "lg" }: { size?: "default" | "lg" }) {
  return (
    <Button asChild size={size} className="min-w-56">
      <a href="/#submit" data-event="apply-award-click">
        Apply
      </a>
    </Button>
  );
}

function PageHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-sm text-sm font-semibold tracking-tight text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <img
            src={markAsset.url}
            alt="Entrepreneur Awards mark"
            className="h-7 w-7 shrink-0 object-contain"
          />
          Entrepreneur Awards
        </Link>
      </div>
    </header>
  );
}

function PageFooter() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-xs text-muted-foreground">
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <img
            src={markAsset.url}
            alt="Entrepreneur Awards mark"
            className="h-6 w-6 shrink-0 object-contain"
          />
          Entrepreneur Awards
        </Link>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link to="/terms-and-conditions" className="hover:text-foreground">
            Terms
          </Link>
          <a href="mailto:hello@entrepreneurawards.co" className="hover:text-foreground">
            Contact
          </a>
        </nav>
        <p>Entrepreneur Awards. All rights reserved.</p>
      </div>
    </footer>
  );
}

function PricingPage() {
  return (
    <div
      data-event="pricing-page-view"
      className="min-h-screen bg-background font-sans text-foreground antialiased"
    >
      <PageHeader />

      <main className="mx-auto max-w-3xl px-6">
        {/* Hero */}
        <section className="relative pt-16 pb-12 text-center md:pt-24 md:pb-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/12),transparent_70%)]"
          />
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
            <Award className="h-3.5 w-3.5 text-primary" />
            {AWARD_YEAR} Winner Claim
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
            Apply for an Entrepreneur Award
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Winners receive the official title, the trophy, published press coverage, and the
            publicity kit to put the win to work.
          </p>
          <div className="mt-10">
            <ApplyButton />
          </div>
        </section>

        {/* How winners are decided */}
        <section className="py-10 md:py-14">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">How winners are decided</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Nominations come to us with a brief on each business. Most nominees are recommended by
            Baden Bower, a PR agency we work with; businesses can also enter directly. Our judging
            panel reviews every nominee against the category criteria, and a minority are shortlisted.
            If you have received a shortlist or winner notification, your entry has already been
            through that review.
          </p>
        </section>

        {/* Winner Package */}
        <section className="py-10 md:py-14">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              The Winner Package
            </h2>
            <p className="text-2xl font-semibold text-primary">$1,250 USD</p>
          </div>
          <p className="mt-2 text-muted-foreground">One payment. Everything you need to claim the win.</p>

          <Card className="mt-8 overflow-hidden border-border">
            <ul className="divide-y divide-border">
              {includedItems.map((item, i) => (
                <li key={i} className="flex items-start gap-4 p-5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    {item.detail && (
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <p className="mt-5 text-sm text-muted-foreground">
            You select your feature story outlet and press announcement outlet at checkout.
          </p>
        </section>

        {/* FAQ */}
        <section className="py-10 md:py-14">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Questions about claiming</h2>
          <Card className="mt-8 px-2 md:px-4">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-b last:border-b-0">
                  <AccordionTrigger className="text-left text-base font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </section>

        {/* Bottom CTA */}
        <section className="py-12 text-center md:py-16">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Apply for an Entrepreneur Award
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            One payment of $1,250 USD. Select your publications at checkout.
          </p>
          <div className="mt-8">
            <ApplyButton />
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
}
