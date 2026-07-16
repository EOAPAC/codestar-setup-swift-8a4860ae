import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function SiteCTA({
  eyebrow = "Ready when you are",
  heading = "Put your story forward.",
  subheading = "Free to enter. Reviewed by founders, not marketers.",
}: {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
}) {
  return (
    <section className="border-t border-border bg-secondary/30 py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">{eyebrow}</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">{heading}</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{subheading}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="min-w-48">
            <a href="/#submit">
              Start Your Entry <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <a href="/#tiers">See what winners receive</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
