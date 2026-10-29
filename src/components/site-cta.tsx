import { Button } from "@/components/ui/button";

export function SiteCTA({
  eyebrow = "Ready when you are",
  heading = "Put your story forward.",
  subheading = "Reviewed by founders, not marketers.",
}: {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
}) {
  return (
    <section className="border-t border-border bg-secondary/30 py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">{heading}</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{subheading}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="min-w-48">
            <a href="/#submit">
              Start Your Entry
            </a>
          </Button>
          <Button asChild size="lg" variant="link">
            <a href="/#tiers">See what winners receive</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
