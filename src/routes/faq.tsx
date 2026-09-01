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
import { SiteFigure } from "@/components/site-figure";

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
      { title: "FAQ — Entrepreneur Awards" },
      { name: "description", content: "Answers about entering the Entrepreneur Awards: eligibility, how it works, judging criteria, and what winners receive." },
      { property: "og:title", content: "FAQ — Entrepreneur Awards" },
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
        <section className="relative overflow-hidden border-b border-border">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/12),transparent_70%)]"
          />
          <div className="relative mx-auto max-w-3xl px-6 pt-24 pb-16 text-center md:pt-32 md:pb-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
              <HelpCircle className="h-3.5 w-3.5 text-primary" />
              FAQ
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
              Frequently Asked <span className="text-primary">Questions</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Everything you need to know before putting your story forward.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {topics.map((t) => (
                <a
                  key={t.target}
                  href={`#${t.target}`}
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {t.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="pt-16 md:pt-20">
          <div className="mx-auto max-w-3xl px-6">
            <SiteFigure
              src="/images/ea-award-detail.webp"
              alt="Close detail of the 2026 Entrepreneur Award, showing the winner seal etched into the crystal."
              ratio="21 / 9"
            />
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-6">
            <Card className="px-4 py-2 md:px-6 md:py-4">

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="q1" id="q1" className="scroll-mt-24">
                  <AccordionTrigger className="text-left text-base font-medium">
                    What are the Entrepreneur Awards?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    A recognition program for founders and entrepreneurs, celebrating the people building standout businesses and the stories behind them.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q-cost" id="q-cost" className="scroll-mt-24">
                  <AccordionTrigger className="text-left text-base font-medium">
                    What does it cost in total?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    $129.90 to enter, which is the only compulsory cost. Winners are offered one optional extra, a written feature about the business, at $595. Selection is never conditional on purchasing it, and the winner badge, graphics and award statement &mdash; the short, formal lines explaining what was assessed and why the entry was selected &mdash; are provided free and permanently.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q2" id="q2" className="scroll-mt-24">

                  <AccordionTrigger className="text-left text-base font-medium">
                    Who can enter?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Any founder or entrepreneur can enter their own story. No nomination needed. You put yourself forward.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q3" id="q3" className="scroll-mt-24">
                  <AccordionTrigger className="text-left text-base font-medium">
                    Is there a cost to enter?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes. A one-time entry fee applies when you submit. It covers the review and administration of your entry. Every entry is read and scored by our founder-judges. The fee does not purchase an award, and entering does not guarantee selection.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q4" id="q4" className="scroll-mt-24">
                  <AccordionTrigger className="text-left text-base font-medium">
                    How do I enter?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Complete the online entry form with your details and your story. Takes about 10 minutes.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q5" id="q5" className="scroll-mt-24">
                  <AccordionTrigger className="text-left text-base font-medium">
                    What are the judging criteria?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Entries are assessed on vision, traction, resilience, and influence. See our{" "}
                    <Link to="/criteria" className="font-medium text-primary hover:underline">
                      Criteria
                    </Link>{" "}
                    for the full breakdown.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q6" id="q6" className="scroll-mt-24">
                  <AccordionTrigger className="text-left text-base font-medium">
                    How are winners chosen?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Every entry is screened, shortlisted, and evaluated by our review panel against consistent criteria.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q7" id="q7" className="scroll-mt-24">
                  <AccordionTrigger className="text-left text-base font-medium">
                    What do winners receive?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Your winner seal, your badge, four sized graphics for LinkedIn, social and email signature, and the written record of your assessment. Everything arrives by email, at no charge, and is permanently yours.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q-feature" id="q-feature" className="scroll-mt-24">
                  <AccordionTrigger className="text-left text-base font-medium">
                    What is the Winner&rsquo;s Feature?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    An optional commission available to winners. Our editors write a full article about your business and publish it as your winner page on entrepreneurawards.co, at a permanent address. A press release announcing your win is carried on USA Today, and an engraved award and printed certificate are included. $1,595, and nothing is published until you have approved every word.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q8" id="q8" className="scroll-mt-24">
                  <AccordionTrigger className="text-left text-base font-medium">
                    Is there a deadline?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Entries are reviewed on a rolling basis. Enter early to be considered in the current cycle.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q9" id="q9" className="scroll-mt-24 border-b-0">
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
            </Card>

            <Card className="mt-10 flex flex-col items-start gap-6 border-primary/20 bg-primary/5 p-8 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">Still have a question?</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Our team usually replies within one business day.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline">
                  <a href="mailto:hello@entrepreneurawards.co">
                    <Mail className="mr-2 h-4 w-4" /> Email us
                  </a>
                </Button>
                <Button asChild>
                  <a href="/#submit">
                    Start Your Entry <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </section>

        <SiteCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
