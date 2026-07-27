import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Lock, FileCheck } from "lucide-react";

// ------------------------------------------------------------------
// Easy-edit constants for the Stripe buy button embed.
// ------------------------------------------------------------------
const STRIPE_BUY_BUTTON_SCRIPT = "https://js.stripe.com/v3/buy-button.js";
const STRIPE_BUY_BUTTON_ID = "buy_btn_1TxtVgGd5RmL1wBxPu6OCfi6";
const STRIPE_PUBLISHABLE_KEY =
  "pk_live_51PODhuGd5RmL1wBxaPSXB1yj8gkb96lf7T1sN4GIFOdql1w0I3nNAA9eDnwN1mMT5h4W8KuRqtrNELJCjWxz8hGS00QV17YBf4";
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
  useEffect(() => {
    if (document.querySelector(`script[src="${STRIPE_BUY_BUTTON_SCRIPT}"]`)) {
      return;
    }
    const script = document.createElement("script");
    script.src = STRIPE_BUY_BUTTON_SCRIPT;
    script.async = true;
    document.body.appendChild(script);
  }, []);

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

        <div className="mt-8 flex justify-center rounded-2xl border border-border bg-card p-6 md:p-10">
          <stripe-buy-button
            buy-button-id={STRIPE_BUY_BUTTON_ID}
            publishable-key={STRIPE_PUBLISHABLE_KEY}
          />
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Lock className="h-3 w-3" />
          Secure payment. You'll receive confirmation once your entry is complete.
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
