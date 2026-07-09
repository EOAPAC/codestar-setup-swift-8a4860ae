import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, Share2, Calendar, Mail, Trophy, User, TrendingUp } from "lucide-react";

const thankYouSearchSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  company: z.string().optional(),
});

export const Route = createFileRoute("/thank-you")({
  validateSearch: thankYouSearchSchema,
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
  const search = Route.useSearch();
  const founderName = search.name?.trim() || "Founder";
  const companyName = search.company?.trim();
  const referenceId = search.id?.slice(0, 8) ?? "";

  const today = new Date();
  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  const reviewBy = new Date(today);
  reviewBy.setDate(today.getDate() + 3);

  const replyBy = new Date(today);
  replyBy.setDate(today.getDate() + 14);

  const steps = [
    {
      icon: Check,
      label: "Entry received",
      date: `Today — ${formatDate(today)}`,
      description: "Your story is saved and assigned to a founder-judge.",
      status: "done" as const,
    },
    {
      icon: Calendar,
      label: "Review complete",
      date: `Within 3 days — by ${formatDate(reviewBy)}`,
      description: "Every entry is read by a founder who has built a company.",
      status: "next" as const,
    },
    {
      icon: Mail,
      label: "You get a reply",
      date: `Within 14 days — by ${formatDate(replyBy)}`,
      description: "Shortlisted founders choose their Digital, Signature, or Headline win.",
      status: "pending" as const,
    },
    {
      icon: Trophy,
      label: "Winners go live",
      date: "After you confirm your tier",
      description: "You receive your badge, trophy, press kit, and founder story feature.",
      status: "pending" as const,
    },
  ];

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
            Thank you{founderName !== "Founder" ? `, ${founderName}` : ""}.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {companyName
              ? `We've received your entry for ${companyName}.`
              : "We've received your entry."}{" "}
            Our founder-judges will reply with next steps within 14 days.
          </p>

          {referenceId && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm text-muted-foreground">
              <User className="h-4 w-4 text-primary" />
              <span>
                Reference ID: <span className="font-medium text-foreground">{referenceId}</span>
              </span>
            </div>
          )}

          <div className="mt-10 rounded-2xl border border-border bg-secondary/30 p-6 text-left md:p-8">
            <h2 className="text-center text-lg font-semibold">What happens next</h2>
            <p className="mt-1 text-center text-sm text-muted-foreground">
              Here's the timeline from today to your result.
            </p>

            <div className="mt-8 space-y-6">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const isDone = step.status === "done";
                const isNext = step.status === "next";
                return (
                  <div key={step.label} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          isDone
                            ? "bg-primary text-primary-foreground"
                            : isNext
                            ? "border-2 border-primary bg-background text-primary"
                            : "border border-border bg-background text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      {i < steps.length - 1 && (
                        <div className="mt-2 h-full min-h-[2rem] w-px bg-border" />
                      )}
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className={`text-sm font-semibold ${isDone ? "text-primary" : ""}`}>
                          {step.label}
                        </p>
                        {isDone && (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            Done
                          </span>
                        )}
                        {isNext && (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            Next
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs font-medium text-muted-foreground">{step.date}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                );
              })}
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
              <Link to="/" hash="outcomes" className="inline-flex items-center">
                <TrendingUp className="mr-2 h-4 w-4" />
                See winner outcomes
              </Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Want more proof?{" "}
            <Link to="/" hash="testimonials" className="text-primary underline underline-offset-4">
              Read what past winners say
            </Link>
            .
          </p>

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
