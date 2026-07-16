import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SiteCTA } from "@/components/site-cta";
import { HelpCircle, Mail, ArrowRight, Sparkles } from "lucide-react";

const topics = [
  { label: "Getting started", target: "q1" },
  { label: "Eligibility", target: "q2" },
  { label: "How to enter", target: "q4" },
  { label: "Judging", target: "q5" },
  { label: "Winners", target: "q7" },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — The Entrepreneur Awards" },
      { name: "description", content: "Answers about entering the Entrepreneur Awards: eligibility, how it works, judging criteria, and what winners receive." },
      { property: "og:title", content: "FAQ — The Entrepreneur Awards" },
      { property: "og:description", content: "Answers about entering the Entrepreneur Awards: eligibility, how it works, judging criteria, and what winners receive." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FAQPage,
});

function FAQPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteNav />
      <main>
        <section className="border-b border-border">
          <div className="mx-auto max-w-3xl px-6 pt-24 pb-16 text-center md:pt-32 md:pb-20">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">FAQ</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Everything you need to know before putting your story forward.
            </p>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-3xl px-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="q1">
                <AccordionTrigger className="text-left text-base font-medium">
                  What are the Entrepreneur Awards?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  A recognition program for founders and entrepreneurs, celebrating the people building standout businesses and the stories behind them.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q2">
                <AccordionTrigger className="text-left text-base font-medium">
                  Who can enter?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Any founder or entrepreneur can enter their own story. No nomination needed — you put yourself forward.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q3">
                <AccordionTrigger className="text-left text-base font-medium">
                  Is it free to enter?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes — it's free to put your story forward. A fee applies for our panel to review and score your submission in full, and standout founders are selected for complimentary consideration.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q4">
                <AccordionTrigger className="text-left text-base font-medium">
                  How do I enter?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Complete the online entry form with your details and your story. Takes about 10 minutes.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q5">
                <AccordionTrigger className="text-left text-base font-medium">
                  What are the judging criteria?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Entries are assessed on vision, traction, resilience, and influence. See our{" "}
                  <Link to="/methodology" className="font-medium text-primary hover:underline">
                    Methodology
                  </Link>{" "}
                  for the full breakdown.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q6">
                <AccordionTrigger className="text-left text-base font-medium">
                  How are winners chosen?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Every entry is screened, shortlisted, and evaluated by our review panel against consistent criteria.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q7">
                <AccordionTrigger className="text-left text-base font-medium">
                  What do winners receive?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Winners receive an official Entrepreneur Awards badge and certificate, a winner profile, and assets to share their recognition. Full details are confirmed with selected winners.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q8">
                <AccordionTrigger className="text-left text-base font-medium">
                  Is there a deadline?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Entries are reviewed on a rolling basis. Enter early to be considered in the current cycle.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q9">
                <AccordionTrigger className="text-left text-base font-medium">
                  How can I get in touch?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Reach us anytime through our{" "}
                  <a href="/#contact" className="font-medium text-primary hover:underline">
                    contact page
                  </a>
                  . We reply within one business day.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <SiteCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
