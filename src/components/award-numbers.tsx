import { AWARD_NUMBERS } from "@/lib/award-numbers";

export function AwardNumbers() {
  return (
    <section aria-label="The award in numbers" className="editorial-section home-numbers">
      <div className="editorial-container">
        <dl className="award-numbers-grid">
          {AWARD_NUMBERS.map((stat) => (
            <div key={stat.label} className="award-number">
              <dt>{stat.label}</dt>
              <dd>{stat.value}{stat.suffix}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
