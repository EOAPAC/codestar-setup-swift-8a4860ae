import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Check } from "lucide-react";

// ------------------------------------------------------------------
// Easy-edit constants — tweak these without hunting through the file.
// ------------------------------------------------------------------
const HUBSPOT_PAYMENT_SRC =
  "https://payments-na1.hubspot.com/payments/gVsrMxrxsqyJTX?referrer=PAYMENT_LINK_EMBED&layout=embed-full";
const HUBSPOT_EMBED_SCRIPT =
  "https://static.hsappstatic.net/payments-embed/ex/PaymentsEmbedCode.js";
const PRICE = "$129";
const PRICE_WAS = "$169";
const SAVINGS = "Save $40";
const RESULT_DAYS = "14 business days";
// ------------------------------------------------------------------

export const Route = createFileRoute("/complete")({
  head: () => ({
    meta: [
      { title: "Complete Your Entry — The Entrepreneur Awards" },
      {
        name: "description",
        content:
          "You're almost done. Secure your application to join recognised founders reviewed by our judging panel.",
      },
      { property: "og:title", content: "Complete Your Entry — The Entrepreneur Awards" },
      {
        property: "og:description",
        content:
          "You're almost done. Secure your application to join recognised founders reviewed by our judging panel.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CompletePage,
});

function CompletePage() {
  useEffect(() => {
    const existing = document.querySelector(
      `script[src="${HUBSPOT_EMBED_SCRIPT}"]`
    );
    if (existing) {
      // Re-run init on SPA navigation if HubSpot exposes it
      const w = window as unknown as { hbspt?: { payments?: { create?: () => void } } };
      w.hbspt?.payments?.create?.();
      return;
    }
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.src = HUBSPOT_EMBED_SCRIPT;
    s.async = true;
    document.body.appendChild(s);
  }, []);

  const perks = [
    "Evaluated by our judging panel",
    "Detailed scoring with written feedback",
    "A place among recognised founders",
    "Global exposure and shareable proof",
    "Boosted credibility and trust",
  ];

  const faqs = [
    {
      q: "When will I get results?",
      a: `Within ${RESULT_DAYS} of submission.`,
    },
    {
      q: "What if I don't win?",
      a: "You still receive detailed scoring and written feedback from our judges.",
    },
    {
      q: "Can I get a refund?",
      a: "Yes — refundable within 48 hours if evaluation hasn't begun. Once scoring starts, the fee is non-refundable.",
    },
  ];

  const testimonials = [
    {
      quote:
        "[EA testimonial — replace with real] The judging feedback was the most useful outside perspective we've had on the business this year.",
      attribution: "[EA winner — replace with real]",
    },
    {
      quote:
        "[EA testimonial — replace with real] Winning gave us a credibility bump we felt immediately in sales conversations.",
      attribution: "[EA winner — replace with real]",
    },
    {
      quote:
        "[EA testimonial — replace with real] A serious, founder-run process. Worth every minute of the application.",
      attribution: "[EA winner — replace with real]",
    },
  ];

  return (
    <div className="ea-complete min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteNav />

      <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        {/* Top band */}
        <section className="ea-complete__top text-center">
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Complete Your Entry — You're Almost Done
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Secure your application to join recognised founders.
          </p>

          <div className="mx-auto mt-8 max-w-2xl">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
              <span className="inline-flex items-center gap-1.5 text-primary">
                <Check className="h-4 w-4" />
                Application Submitted
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="font-medium">Step 2 of 2 — Payment</span>
            </div>
            <div
              className="ea-complete__progress mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary"
              role="progressbar"
              aria-valuenow={90}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div className="h-full rounded-full bg-primary" style={{ width: "90%" }} />
            </div>
          </div>
        </section>

        {/* Two columns */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* LEFT — payment embed (HubSpot's own summary + card fields) */}
          <div className="ea-complete__left space-y-6 order-1">
            <Card className="ea-complete__cta p-6 md:p-8">
              <div
                className="payments-iframe-container ea-complete__embed w-full"
                data-src={HUBSPOT_PAYMENT_SRC}
              />

              <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <a href="#terms" className="hover:text-foreground underline underline-offset-4">
                  Terms
                </a>
                <a href="#cancellation" className="hover:text-foreground underline underline-offset-4">
                  Cancellation policy
                </a>
                <a href="#refund" className="hover:text-foreground underline underline-offset-4">
                  Refund policy
                </a>
              </div>
            </Card>
          </div>

          {/* RIGHT — What You Get, testimonials, FAQ */}
          <div className="ea-complete__right space-y-6 order-2">
            <Card className="ea-complete__perks p-6 md:p-8">
              <h2 className="text-xl font-semibold">What You Get</h2>
              <ul className="mt-5 space-y-3">
                {perks.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm">{p}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <div className="ea-complete__testimonials space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                What founders say
              </h3>
              {testimonials.map((t, i) => (
                <Card key={i} className="p-5">
                  <p className="text-sm italic text-foreground">"{t.quote}"</p>
                  <p className="mt-3 text-xs font-medium text-muted-foreground">
                    — {t.attribution}
                  </p>
                </Card>
              ))}
            </div>

            <div className="ea-complete__faq">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Frequently asked
              </h3>
              <Accordion type="single" collapsible className="mt-2">
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-left text-sm font-medium">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </main>


      <SiteFooter />
    </div>
  );
}
