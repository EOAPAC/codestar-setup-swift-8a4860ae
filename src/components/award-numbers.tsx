import { AWARD_NUMBERS } from "@/lib/award-numbers";

/** Static figures: no icons, labels above or count-up animation. */
export function AwardNumbers() {
  return (
    <section aria-label="The award in numbers" className="border-t border-border py-16 md:py-20">
      <div className="mx-auto max-w-[1120px] px-6">
        <h2 className="text-4xl md:text-5xl">The award in numbers.</h2>
        <dl className="mt-10 grid grid-cols-2 md:grid-cols-4">
          {AWARD_NUMBERS.map((stat) => (
            <div key={stat.label} className="award-number flex flex-col px-0 py-6 md:px-6 md:py-0 md:first:pl-0">
              <dt className="order-2 mt-2 text-base text-muted-foreground">{stat.label}</dt>
              <dd className="text-5xl font-extrabold tracking-[-0.02em] tabular-nums md:text-6xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
