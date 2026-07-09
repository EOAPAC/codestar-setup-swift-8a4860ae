import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, Share2, Calendar } from "lucide-react";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank You — Entry Received | The Entrepreneur Awards" },
      { name: "description", content: "Your entry has been received. Our founder-judges will review your story and reply within 14 days." },
      { property: "og:title", content: "Thank You — Entry Received | The Entrepreneur Awards" },
      { property: "og:description", content: "Your entry has been received. Our founder-judges will review your story and reply within 14 days." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground">
              E
            </span>
            The Entrepreneur Awards
          </Link>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center px-6 py-24 text-center md:py-32">
        <div className="mx-auto max-w-2xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Check className="h-8 w-8 text-primary" />
          </div>

          <p className="mt-6 text-sm font-medium uppercase tracking-widest text-primary">Entry received</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Thank you for entering.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Our founder-judges will read your story and reply within 14 days.
            In the meantime, here's what happens next.
          </p>

          <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <Calendar className="h-5 w-5 text-primary" />
              <p className="mt-3 text-sm font-medium">Judging in 14 days</p>
              <p className="mt-1 text-xs text-muted-foreground">Every entry is reviewed by a founder who has built a company.</p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <Share2 className="h-5 w-5 text-primary" />
              <p className="mt-3 text-sm font-medium">Shortlist announced</p>
              <p className="mt-1 text-xs text-muted-foreground">If shortlisted, you'll choose a Digital, Signature, or Headline win.</p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <Check className="h-5 w-5 text-primary" />
              <p className="mt-3 text-sm font-medium">Winners go live</p>
              <p className="mt-1 text-xs text-muted-foreground">Winners get a badge, trophy, press coverage, and a founder story.</p>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to the awards
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                Share on LinkedIn
              </a>
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Questions?{" "}
            <a href="mailto:hello@entrepreneurawards.co" className="text-primary underline underline-offset-4">
              hello@entrepreneurawards.co
            </a>
          </p>
        </div>
      </main>

      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center text-xs text-muted-foreground">
            © 2026 The Entrepreneur Awards. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
