import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ArrowRight, Lock, FileCheck } from "lucide-react";

// ------------------------------------------------------------------
// Easy-edit constants. Update these to match the entry-fee payment.
// ------------------------------------------------------------------
const ENTRY_FEE_PRICE = "$99";
const HUBSPOT_ENTRY_PAYMENT_LINK =
  "https://payments.entrepreneurawards.co/entry-fee-placeholder";
// ------------------------------------------------------------------

export const Route = createFileRoute("/complete")({
  head: () => ({
    meta: [
      { title: "Complete Your Entry | The Entrepreneur Awards" },
      {
        name: "description",
        content:
          "A one-time entry fee completes your application for the 2026 Entrepreneur Awards.",
      },
      {
        property: "og:title",
        content: "Complete Your Entry | The Entrepreneur Awards",
      },
      {
        property: "og:description",
        content:
          "A one-time entry fee completes your application for the 2026 Entrepreneur Awards.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CompletePage,
});

function CompletePage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteNav />

      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            2026 Entry
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
            Complete your entry
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
            Your submission is ready. A one-time entry fee completes your
            application for the 2026 Entrepreneur Awards.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-secondary/30 p-6 text-sm leading-relaxed text-muted-foreground md:p-8">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <FileCheck className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-medium text-foreground">What the fee covers</p>
              <p className="mt-1">
                The entry fee covers the consideration of your application. All
                entries are reviewed, and winners are announced after the review
                period. Entering does not guarantee selection.
              </p>
            </div>
          </div>
        </div>

        <Card className="relative mt-8 overflow-hidden border-primary/10 p-6 md:p-8">
          <div className="absolute left-0 right-0 top-0 h-1 bg-primary/20" />
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                2026 Entrepreneur Awards - Entry
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                One-time application fee
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-foreground">
                {ENTRY_FEE_PRICE}
              </span>
              <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">
                One-time
              </span>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-8">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto"
            >
              <a
                href={HUBSPOT_ENTRY_PAYMENT_LINK}
                className="inline-flex items-center justify-center"
              >
                Complete entry
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </Card>

        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Lock className="h-3 w-3" />
          Secure payment. You'll receive confirmation once your entry is complete.
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
