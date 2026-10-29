import { useEffect, useRef, useState } from "react";
import { Award, Clock, Globe, Users } from "lucide-react";
import { AWARD_NUMBERS, countAwardNumber } from "@/lib/award-numbers";

const ICONS = [Clock, Users, Globe, Award];
const STAGGER_MS = 80;

export function AwardNumbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let observer: IntersectionObserver | undefined;

    const configureAnimation = () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      if (motionPreference.matches || !("IntersectionObserver" in window)) {
        setElapsed(null);
        setVisible(true);
        return;
      }
      setElapsed(0);
      setVisible(false);
      observer = new IntersectionObserver(([entry]) => {
        if (!entry?.isIntersecting) return;
        observer?.disconnect();
        setVisible(true);
        const start = performance.now();
        const tick = (now: number) => {
          const time = now - start;
          setElapsed(time);
          if (time < 1200 + STAGGER_MS * (AWARD_NUMBERS.length - 1)) {
            frame = requestAnimationFrame(tick);
          }
        };
        frame = requestAnimationFrame(tick);
      }, { threshold: 0.2 });
      observer.observe(section);
    };

    configureAnimation();
    motionPreference.addEventListener("change", configureAnimation);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      motionPreference.removeEventListener("change", configureAnimation);
    };
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="award-numbers-heading" className="award-numbers-band bg-primary text-primary-foreground py-16 font-sans md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 id="award-numbers-heading" className="text-center text-[32px] font-semibold leading-tight text-primary-foreground">
          The award in numbers
        </h2>
        <dl className={`award-numbers-grid mt-10 grid grid-cols-2 md:grid-cols-4 ${visible ? "award-numbers-visible" : "award-numbers-waiting"}`}>
          {AWARD_NUMBERS.map((stat, index) => {
            const Icon = ICONS[index];
            return (
              <div key={stat.label} className="award-number flex flex-col items-center px-4 py-7 text-center md:py-2">
                <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground">
                  {Icon && <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />}
                </div>
                <dt className="order-2 mt-3 text-sm leading-relaxed text-primary-foreground">{stat.label}</dt>
                <dd className="text-4xl font-semibold tabular-nums text-primary-foreground md:text-5xl">
                  <span className="sr-only">{stat.prefix}{stat.value}</span>
                  <span aria-hidden="true">{stat.prefix}{elapsed === null ? stat.value : countAwardNumber(stat.value, elapsed, index * STAGGER_MS)}</span>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}