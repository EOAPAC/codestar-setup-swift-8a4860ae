import { Button } from "@/components/ui/button";

export function SiteCTA({
  heading = "Put your story forward.",
  subheading = "Reviewed by founders, not marketers.",
}: {
  /** Kept for existing callers; eyebrow labels are no longer shown. */
  eyebrow?: string;
  heading?: string;
  subheading?: string;
}) {
  return (
    <section className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-[1120px] px-6">
        <h2 className="text-4xl font-extrabold tracking-[-0.02em] md:text-5xl">{heading}</h2>
        <p className="mt-5 max-w-[680px] text-muted-foreground">{subheading}</p>
        <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
          <Button asChild size="lg">
            <a href="/#submit">Start your entry</a>
          </Button>
          <a href="/#tiers" className="inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4">
            See what winners receive
          </a>
        </div>
      </div>
    </section>
  );
}
