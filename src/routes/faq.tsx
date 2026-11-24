import { useState } from "react";
import winnersHeroAsset from "@/assets/winners-hero-trophy.jpg.asset.json";
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
import { ENTRY_FEE_LABEL } from "@/content/entry-fees";

import { Mail, ArrowRight, Sparkles } from "lucide-react";

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
      { title: "FAQ | Entrepreneur Awards" },
      { name: "description", content: "Answers about entering the Entrepreneur Awards: eligibility, how it works, judging criteria, and what winners receive." },
      { name: "twitter:description", content: "Answers about entering the Entrepreneur Awards: eligibility, how it works, judging criteria, and what winners receive." },
      { property: "og:title", content: "FAQ | Entrepreneur Awards" },
      { property: "og:description", content: "Answers about entering the Entrepreneur Awards: eligibility, how it works, judging criteria, and what winners receive." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: winnersHeroAsset.url },
      { name: "twitter:image", content: winnersHeroAsset.url },
    ],
  }),
  component: FAQPage,
});

function FAQPage() {
  const [selectedTopic, setSelectedTopic] = useState("q1");
  return (
    <div className="faq-colour-restored min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteNav />
      <main>
        <section className="restored-page-header">
          <img src={winnersHeroAsset.url} alt="" aria-hidden="true" className="restored-page-header-image" />
          <div className="restored-page-header-shade" aria-hidden="true" />
          <div className="restored-page-header-content">
            <div className="restored-page-header-copy">
            <h1 className=" text-[26px] font-semibold leading-tight text-header-foreground lg:text-[38px]">
              Frequently Asked <span>Questions</span>
            </h1>
            <p className="mt-3 text-[15px] leading-normal text-header-subtitle">
              Common questions about entering, judging and what winners receive.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {topics.map((t) => (
                <Button
                  key={t.target}
                  asChild
                  variant="outline"
                  className={`faq-header-topic ${selectedTopic === t.target ? "faq-header-topic-selected" : ""}`}
                >
                  <a href={`#${t.target}`} onClick={() => setSelectedTopic(t.target)} aria-current={selectedTopic === t.target ? "true" : undefined}>
                    {t.label}
                  </a>
                </Button>
              ))}
            </div>
            </div>
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
                    A recognition programme for founders and entrepreneurs, with award categories for the business as a whole and for specific achievements. See all categories on the <Link to="/categories" className="font-medium text-primary hover:underline">Categories page</Link>.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q-cost" id="q-cost" className="scroll-mt-24">
                  <AccordionTrigger className="text-left text-base font-medium">
                    What does it cost in total?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    US${ENTRY_FEE_LABEL} for each category you enter, paid once when you submit. Emerging Founder is free for businesses in their first three years. There is no separate shortlist fee. Later offers are optional and are not required to win. The winner badge, graphics and award statement are included at no extra cost and remain yours permanently.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q2" id="q2" className="scroll-mt-24">

                  <AccordionTrigger className="text-left text-base font-medium">
                    Who can enter?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Any founder or entrepreneur can enter. Some categories have their own requirements, such as years of trading or team size, listed on the Categories page. Emerging Founder is for businesses that began trading in the last three years and already have paying customers.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q3" id="q3" className="scroll-mt-24">
                  <AccordionTrigger className="text-left text-base font-medium">
                    Is there a cost to enter?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, US${ENTRY_FEE_LABEL} for each paid category, paid once after you submit the form. Emerging Founder is free. Fees cover review and administration, and there is no separate shortlist fee. A fee does not purchase an award, and entering does not guarantee selection.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q4" id="q4" className="scroll-mt-24">
                  <AccordionTrigger className="text-left text-base font-medium">
                    How do I enter?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Choose your categories and complete the online entry form with your details and your story. Then pay for any paid categories on the next page.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q-multiple" id="q-multiple" className="scroll-mt-24">
                  <AccordionTrigger className="text-left text-base font-medium">
                    Can I enter more than one category?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, in the same form. Each category is judged on its own, and you can be selected in more than one.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q-which" id="q-which" className="scroll-mt-24">
                  <AccordionTrigger className="text-left text-base font-medium">
                    Which category should I choose?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Choose Entrepreneur of Distinction for the business as a whole. If one achievement stands out, choose the category that recognises it. See the <Link to="/categories" className="font-medium text-primary hover:underline">Categories page</Link>.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q5" id="q5" className="scroll-mt-24">
                  <AccordionTrigger className="text-left text-base font-medium">
                    What are the judging criteria?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Every category is judged on the same three criteria: originality, traction and a standout achievement. See our <Link to="/criteria" className="font-medium text-primary hover:underline">Criteria page</Link> for the full breakdown.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q6" id="q6" className="scroll-mt-24">
                  <AccordionTrigger className="text-left text-base font-medium">
                    How are winners chosen?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Every entry is screened, then assessed by our review panel in each category entered, against the same criteria.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q7" id="q7" className="scroll-mt-24">
                  <AccordionTrigger className="text-left text-base font-medium">
                    What do winners receive?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Your winner seal, your badge, graphics for LinkedIn, social and your email signature, and the written record of your assessment, made with the title you won. They come at no extra cost and are permanently yours.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q-feature" id="q-feature" className="scroll-mt-24">
                  <AccordionTrigger className="text-left text-base font-medium">
                    What is the Winner&rsquo;s Feature?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    An optional extra for winners. Our editorial team writes a Feature about your business and publishes it as your winner page on entrepreneurawards.co. It comes with a paid press release about your win on USA Today, the Associated Press and Business Insider, each linking back to the Feature. US$997, and nothing is published until you&rsquo;ve approved every word. The engraved crystal award and a printed certificate are available separately as the US$197 Award Package.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q8" id="q8" className="scroll-mt-24">
                  <AccordionTrigger className="text-left text-base font-medium">
                    Is there a deadline?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    No. Entries are open all year, and each entry is judged as it comes in.
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

        <SiteCTA eyebrow="" heading="Start your entry." subheading="Every entry is read by founders and operators." />
      </main>
      <SiteFooter />
    </div>
  );
}
