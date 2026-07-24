import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import {
  BadgeCheck,
  Check,
  CreditCard,
  CalendarDays,
  Award,
  Sparkles,
  ShieldCheck,
  Lock,
  Pen,
  Truck,
} from "lucide-react";

// ------------------------------------------------------------------
// Easy-edit constants — tweak these without hunting through the file.
// IMPORTANT: update HUBSPOT_PAYMENT_SRC to the Winner's Feature payment.
// ------------------------------------------------------------------
const HUBSPOT_PAYMENT_SRC =
  "https://payments-na1.hubspot.com/payments/gVsrMxrxsqyJTX?referrer=PAYMENT_LINK_EMBED&layout=embed-full";
const HUBSPOT_EMBED_SCRIPT =
  "https://static.hsappstatic.net/payments-embed/ex/PaymentsEmbedCode.js";
const PRICE = "$495";
const RESULT_DAYS = "14 business days";
// ------------------------------------------------------------------

export const Route = createFileRoute("/complete")({
  head: () => ({
    meta: [
      { title: "Claim Your Winner's Feature | The Entrepreneur Awards" },
      {
        name: "description",
        content:
          "Your win is confirmed. Claim your Winner's Feature to turn your recognition into a published story, distribution, and a keepsake award.",
      },
      { property: "og:title", content: "Claim Your Winner's Feature | The Entrepreneur Awards" },
      {
        property: "og:description",
        content:
          "Your win is confirmed. Claim your Winner's Feature to turn your recognition into a published story, distribution, and a keepsake award.",
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
    "A professionally written feature about you and your business",
    "Published on The Entrepreneur Awards site at a permanent link",
    "Distribution through our founder and press network",
    "An \"as featured\" media strip for your website and profiles",
    "A finely crafted, engraved keepsake award sent to you",
  ];

  const timeline = [
    {
      icon: CreditCard,
      title: "Claim your feature",
      body: "Complete the one-time payment. This confirms your feature and starts the editorial process.",
    },
    {
      icon: Pen,
      title: "Editorial interview",
      body: "Our editorial team schedules a short interview to capture your story.",
    },
    {
      icon: CalendarDays,
      title: "Review and publish",
      body: `We write, edit, and publish your feature. Review takes ${RESULT_DAYS}.`,
    },
    {
      icon: Truck,
      title: "Keepsake shipped",
      body: "Your engraved keepsake award is made and sent to you with your certificate.",
    },
  ];

  const faqs = [
    {
      q: "When will my feature be published?",
      a: `Within ${RESULT_DAYS} of claiming your feature.`,
    },
    {
      q: "What if I want changes to the story?",
      a: "You get one round of revisions before publication to make sure it reads the way you want.",
    },
    {
      q: "Can I get a refund?",
      a: "Yes — refundable within 48 hours if editorial work hasn't begun. Once writing starts, the feature is non-refundable.",
    },
  ];

  const testimonials = [
    {
      quote:
        "The feature gave us a credibility bump we felt immediately in sales conversations.",
      attribution: "2025 EA winner",
    },
    {
      quote:
        "Having a real link to send to investors and clients changed how we talked about the award.",
      attribution: "2024 EA winner",
    },
    {
      quote:
        "The keepsake sits on my desk as a daily reminder of what we built.",
      attribution: "2025 EA winner",
    },
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteNav />

      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/[0.08] to-background px-6 pb-10 pt-14 md:pb-16 md:pt-20">
        <div className="absolute -left-20 -top-20 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl md:h-[36rem] md:w-[36rem]" />
        <div className="absolute -right-20 top-40 h-[20rem] w-[20rem] rounded-full bg-primary/10 blur-3xl md:h-[28rem] md:w-[28rem]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-primary/10 ring-1 ring-primary/20 md:h-24 md:w-24">
            <BadgeCheck className="h-10 w-10 text-primary md:h-12 md:w-12" aria-hidden="true" />
          </div>
          <Badge
            variant="outline"
            className="mb-4 inline-flex items-center gap-1.5 font-medium"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            Winner's Feature
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Claim your Winner's Feature
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
            Your 2026 Entrepreneur Award is yours. Complete the one-time feature to publish your story, distribute it, and receive your engraved keepsake.
          </p>

          <div className="mx-auto mt-8 max-w-xl">
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="inline-flex items-center gap-1.5 font-medium text-primary">
                <Check className="h-4 w-4" />
                Win confirmed
              </span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground" />
              <span className="font-medium">Claim your feature</span>
            </div>
            <div
              className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary"
              role="progressbar"
              aria-valuenow={75}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div className="h-full rounded-full bg-primary" style={{ width: "75%" }} />
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Card className="relative overflow-hidden border-primary/10 p-6 md:p-8">
              <div className="absolute left-0 right-0 top-0 h-1 bg-primary/20" />
              <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">The Winner's Feature</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    One-time feature and keepsake package.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-foreground">{PRICE}</span>
                  <Badge variant="secondary" className="text-xs font-medium">
                    One-time
                  </Badge>
                </div>
              </div>

              <div
                className="payments-iframe-container ea-complete__embed w-full"
                data-src={HUBSPOT_PAYMENT_SRC}
              />

              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  Encrypted by HubSpot
                </span>
                <a href="#terms" className="underline underline-offset-4 hover:text-foreground">
                  Terms
                </a>
                <a href="#cancellation" className="underline underline-offset-4 hover:text-foreground">
                  Cancellation
                </a>
                <a href="#refund" className="underline underline-offset-4 hover:text-foreground">
                  Refund policy
                </a>
              </div>
            </Card>

            <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Your payment is protected</p>
                <p className="text-xs text-muted-foreground">
                  Refundable within 48 hours before editorial work begins. No hidden fees.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6 md:p-8">
              <h2 className="text-xl font-semibold">What happens next</h2>
              <div className="mt-5 space-y-6">
                {timeline.map((step, i) => {
                  const Icon = step.icon;
                  const isLast = i === timeline.length - 1;
                  return (
                    <div key={step.title} className="relative flex gap-4">
                      {!isLast && (
                        <div className="absolute left-5 top-10 h-[calc(100%+1.5rem)] w-px bg-border" />
                      )}
                      <div className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary ring-4 ring-background">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold">{step.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6 md:p-8">
              <h2 className="text-xl font-semibold">What's included</h2>
              <ul className="mt-5 space-y-3">
                {perks.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm">{p}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <div className="space-y-4">
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

            <div>
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
