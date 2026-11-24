import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Lock, FileCheck } from "lucide-react";
import { SAVED_ENTRY_KEY, amountDue, checkoutUrl, orderCategories, paidCount, type SavedEntry } from "@/content/entry-categories";

export const Route = createFileRoute("/complete")({
  head: () => ({
    meta: [
      { title: "Complete Your Entry | Entrepreneur Awards" },
      {
        name: "description",
        content:
          "Pay for your paid categories to complete your entry for the 2026 Entrepreneur Awards.",
      },
      { name: "twitter:description", content: "Pay for your paid categories to complete your entry for the 2026 Entrepreneur Awards." },
      {
        property: "og:title",
        content: "Complete Your Entry | Entrepreneur Awards",
      },
      {
        property: "og:description",
        content:
          "Pay for your paid categories to complete your entry for the 2026 Entrepreneur Awards.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CompletePage,
});

function readSavedEntry(): SavedEntry | null {
  try {
    const raw = sessionStorage.getItem(SAVED_ENTRY_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SavedEntry>;
    if (typeof parsed.email !== "string" || !Array.isArray(parsed.categories)) return null;
    const categories = parsed.categories.filter((c): c is string => typeof c === "string");
    return { firstName: String(parsed.firstName ?? ""), email: parsed.email, categories, paidCount: paidCount(categories) };
  } catch {
    return null;
  }
}

function CompletePage() {
  // Storage is browser-only, so read after hydration.
  const [entry, setEntry] = useState<SavedEntry | null | undefined>(undefined);
  useEffect(() => setEntry(readSavedEntry()), []);

  const missing = entry === null || (entry !== undefined && entry.paidCount === 0);
  const ordered = entry ? orderCategories(entry.categories) : [];
  const total = entry ? amountDue(entry.paidCount) : "";

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteNav />

      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Complete your entry
          </h1>
          {missing ? (
            <>
              <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
                We couldn't find your entry in this browser. Use the payment link in your email, or start your entry again.
              </p>
              <Button asChild size="lg" className="mt-8">
                <a href="/#submit">Start your entry</a>
              </Button>
            </>
          ) : (
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
              Your form has been received. Pay for your paid categories below to complete your entry.
            </p>
          )}
        </div>

        {!missing && (
          <>
            <div className="mt-10 rounded-2xl border border-border bg-secondary/30 p-6 text-sm leading-relaxed text-muted-foreground md:p-8">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <FileCheck className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-medium text-foreground">What the fee covers</p>
                  <p className="mt-1">
                    The fee for each category covers review and administration. There is no separate shortlist fee. Every completed entry is assessed against the three published criteria, with a decision within five business days. Payment does not guarantee selection.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-10">
              {entry ? (
                <>
                  <ul className="divide-y divide-border">
                    {ordered.map((c) => (
                      <li key={c.value} className="flex items-baseline justify-between gap-4 py-3 text-base">
                        <span>{c.name}</span>
                        <span className="font-medium">{c.free ? "Free" : "US$129.90"}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 border-t border-border pt-4 text-right text-lg font-semibold">Total: US${total}</p>
                  <Button asChild size="lg" className="mt-6 w-full">
                    <a href={checkoutUrl(entry.paidCount, entry.email)}>Pay US${total}</a>
                  </Button>
                </>
              ) : (
                <div className="h-40" aria-hidden="true" />
              )}
            </div>

            <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="h-3 w-3" />
              Secure payment. You'll receive confirmation once your entry is complete.
            </p>
          </>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
