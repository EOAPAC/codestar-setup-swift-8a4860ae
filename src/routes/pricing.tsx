import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  PenLine,
  Link2,
  Users,
  Award,
  BadgeCheck,
  Sparkles,
  Star,
  Check,
  Clock,
  Zap,
} from "lucide-react";

const BRAND_BLUE = "#1978E5";

// Prices — edit these to update the page.
const WINNERS_FEATURE_PRICE = 495;
const PRIORITY_UPGRADE_PRICE = 95;

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "The Winner's Feature | The Entrepreneur Awards" },
      { name: "description", content: "Your 2026 Entrepreneur Award is yours. The Winner's Feature turns your win into a professionally written, published story about you and your business." },
      { property: "og:title", content: "The Winner's Feature | The Entrepreneur Awards" },
      { property: "og:description", content: "Your 2026 Entrepreneur Award is yours. The Winner's Feature turns your win into a professionally written, published story about you and your business." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});

const deliverables = [
  {
    icon: PenLine,
    title: "Your story, told well",
    body: "A professionally written feature about you and what you've built, authored by our editorial team. You'll review it before anything goes live.",
  },
  {
    icon: Link2,
    title: "Published at a permanent link",
    body: "Your feature lives on The Entrepreneur Awards site at a link you can send to clients, investors, and press, for as long as you want it there.",
  },
  {
    icon: Users,
    title: "Shared beyond your own audience",
    body: "We put your feature in front of people who don't already follow you, through our founder network.",
  },
  {
    icon: BadgeCheck,
    title: "An 'as featured' mark",
    body: "For your website, your deck, your profiles. The small signal that says someone else thought your work was worth writing about.",
  },
  {
    icon: Award,
    title: "A piece to mark it",
    body: "An engraved keepsake, sent to you, marking the year you were recognized.",
  },
];

// Confetti
function Confetti() {
  const dots = Array.from({ length: 24 });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden">
      {dots.map((_, i) => {
        const left = (i * 41) % 100;
        const delay = (i % 8) * 0.5;
        const duration = 5 + (i % 6);
        const size = 4 + (i % 5);
        const colors = [BRAND_BLUE, "#60a5fa", "#93c5fd", "#dbeafe", "#facc15", "#ffffff"];
        const color = colors[i % colors.length];
        const rotate = (i * 37) % 360;
        const drift = (i % 3) - 1;
        return (
          <span
            key={i}
            className="absolute block rounded-[1px] opacity-80"
            style={{
              left: `${left}%`,
              top: "-10%",
              width: `${size}px`,
              height: `${size * 1.6}px`,
              backgroundColor: color,
              transform: `rotate(${rotate}deg)`,
              animation: `ea-confetti-fall ${duration}s linear ${delay}s infinite`,
              "--ea-drift": `${drift * 40}px`,
            } as React.CSSProperties}
          />
        );
      })}
      <style>{`
        @keyframes ea-confetti-fall {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          8% { opacity: 0.95; }
          100% { transform: translateY(460px) translateX(var(--ea-drift, 0px)) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// Fade-in on scroll
function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {children}
    </div>
  );
}

type Timing = "standard" | "priority";

function PricingPage() {
  const [timing, setTiming] = useState<Timing>("standard");
  const total = WINNERS_FEATURE_PRICE + (timing === "priority" ? PRIORITY_UPGRADE_PRICE : 0);

  useEffect(() => {
    const SRC = "https://js.stripe.com/v3/buy-button.js";
    if (document.querySelector(`script[src="${SRC}"]`)) return;
    const s = document.createElement("script");
    s.src = SRC;
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden px-6 pt-20 pb-20 md:pt-32 md:pb-28">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-[-10rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_color-mix(in_oklab,var(--color-primary)_10%,transparent),_transparent_60%)]" />
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
                backgroundSize: "22px 22px",
                color: "var(--color-foreground)",
              }}
            />
          </div>

          <Confetti />

          <div className="relative mx-auto max-w-4xl text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow-lg shadow-primary/20">
                <Star className="h-3.5 w-3.5 fill-current" />
                2026 Entrepreneur Award
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-8 text-4xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-7xl">
                You won.
                <br />
                <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                  Now let's tell the story properly.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Your recognition is already yours. What follows is how we turn it into something people read, share, and remember. A professionally written feature about you and your business, published and put in front of an audience beyond your own.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ALREADY YOURS */}
        <section className="border-t border-border bg-secondary/30 px-6 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
                Already yours, free
              </p>
              <p className="mt-4 text-lg leading-relaxed text-foreground md:text-xl">
                Your winner badge, shareable graphics, and write-up. In your inbox, ready to post today.
              </p>
            </Reveal>
          </div>
        </section>

        {/* THE OFFER */}
        <section className="relative overflow-hidden px-6 py-24 md:py-32">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-3xl" />
          </div>

          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div className="mb-12 text-center">
                <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-primary">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                  The Winner's Feature
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  One story, written and published for you.
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
                  Done for you, start to finish.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <Card className="relative overflow-hidden border-primary/20 bg-card p-0 shadow-[0_30px_80px_-30px_rgba(25,120,229,0.35)]">
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent" />

                <div className="grid gap-0 lg:grid-cols-[1.05fr_1fr]">
                  {/* Left — preview */}
                  <div className="relative border-b border-border bg-gradient-to-br from-secondary/60 to-background p-8 md:p-12 lg:border-b-0 lg:border-r">
                    <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                      Preview · what gets published
                    </p>

                    <div className="relative rounded-lg border border-border bg-background shadow-xl">
                      <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-muted" />
                        <span className="h-2.5 w-2.5 rounded-full bg-muted" />
                        <span className="h-2.5 w-2.5 rounded-full bg-muted" />
                        <div className="ml-3 flex-1 truncate rounded-md bg-muted/60 px-3 py-1 text-[11px] text-muted-foreground">
                          entrepreneurawards.co/winners/your-feature
                        </div>
                      </div>

                      <div className="p-6 md:p-8">
                        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-primary">
                          <Award className="h-3 w-3" aria-hidden /> 2026 Winner Feature
                        </div>
                        <h3 className="text-xl font-semibold leading-tight tracking-tight text-foreground md:text-2xl">
                          How [Your Name] built something worth recognizing.
                        </h3>
                        <p className="mt-2 text-xs text-muted-foreground">
                          By The Entrepreneur Awards Editorial · 6 min read
                        </p>

                        <div className="mt-5 h-28 rounded-md bg-gradient-to-br from-primary/25 via-primary/10 to-secondary" />

                        <div className="mt-5 space-y-2.5">
                          <div className="h-2 w-full rounded bg-muted" />
                          <div className="h-2 w-[96%] rounded bg-muted" />
                          <div className="h-2 w-[88%] rounded bg-muted" />
                          <div className="h-2 w-[70%] rounded bg-muted" />
                        </div>

                        <div className="mt-5 border-l-2 border-primary/60 pl-3">
                          <div className="h-2 w-[80%] rounded bg-muted" />
                          <div className="mt-2 h-2 w-[55%] rounded bg-muted" />
                        </div>

                        <div className="mt-6 space-y-2.5">
                          <div className="h-2 w-full rounded bg-muted" />
                          <div className="h-2 w-[92%] rounded bg-muted" />
                          <div className="h-2 w-[60%] rounded bg-muted" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right — bundle */}
                  <div className="flex flex-col justify-between p-8 md:p-12">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-semibold tracking-tight text-foreground">
                          ${WINNERS_FEATURE_PRICE.toLocaleString()}
                        </span>
                        <span className="text-sm text-muted-foreground">one-time</span>
                      </div>
                      <p className="mt-3 text-base leading-relaxed text-foreground">
                        One story, written and published for you. Done for you, start to finish.
                      </p>

                      <ul className="mt-8 space-y-5">
                        {deliverables.map(({ icon: Icon, title, body }) => (
                          <li key={title} className="flex items-start gap-4">
                            <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
                              <Icon className="h-4 w-4" aria-hidden />
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-foreground">{title}</p>
                              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </Reveal>
          </div>
        </section>

        {/* CONFIGURATION — choose when it lands */}
        <section className="border-t border-border bg-secondary/30 px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  Choose when it lands
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
                  Every feature includes everything above. The one thing you decide is how soon.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div
                role="radiogroup"
                aria-label="Publication timing"
                className="grid gap-4 md:grid-cols-2"
              >
                <TimingOption
                  selected={timing === "standard"}
                  onSelect={() => setTiming("standard")}
                  icon={Clock}
                  name="Standard"
                  description="Your feature is published within four weeks, alongside the next group of 2026 winners."
                  addOn={null}
                />
                <TimingOption
                  selected={timing === "priority"}
                  onSelect={() => setTiming("priority")}
                  icon={Zap}
                  name="Priority"
                  description="Your feature moves to the front of the queue and is published within one week."
                  addOn={`+$${PRIORITY_UPGRADE_PRICE}`}
                />
              </div>
            </Reveal>

            {/* Total + CTA */}
            <Reveal delay={160}>
              <div className="mt-10 rounded-2xl border border-primary/20 bg-card p-6 shadow-[0_20px_60px_-30px_rgba(25,120,229,0.4)] md:p-8">
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Your total
                    </p>
                    <div className="mt-2 flex items-baseline gap-3">
                      <span className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                        ${total.toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {timing === "priority" ? "Feature + Priority" : "Feature"}
                      </span>
                    </div>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="group w-full transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transform-none md:w-auto"
                  >
                    <Link to="/complete">

                      Claim your feature
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                </div>

                <div className="mt-6 space-y-2 border-t border-border pt-6 text-center text-xs text-muted-foreground md:text-left">
                  <p>
                    Your feature is written, reviewed with you, and published. The keepsake ships after publication.
                  </p>
                  <p>
                    Every winner is independently reviewed and selected.{" "}
                    <Link to="/methodology" className="text-primary underline-offset-4 hover:underline">
                      Our methodology
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function TimingOption({
  selected,
  onSelect,
  icon: Icon,
  name,
  description,
  addOn,
}: {
  selected: boolean;
  onSelect: () => void;
  icon: typeof Clock;
  name: string;
  description: string;
  addOn: string | null;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`group relative flex h-full flex-col items-start rounded-2xl border p-6 text-left transition-all duration-200 md:p-7 ${
        selected
          ? "border-primary bg-card shadow-[0_20px_50px_-30px_rgba(25,120,229,0.5)] ring-2 ring-primary/40"
          : "border-border bg-card hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
      } motion-reduce:transform-none`}
    >
      <div className="flex w-full items-center justify-between">
        <span
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 transition-colors ${
            selected
              ? "bg-primary text-primary-foreground ring-primary"
              : "bg-primary/10 text-primary ring-primary/20"
          }`}
        >
          <Icon className="h-4 w-4" aria-hidden />
        </span>

        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
            selected ? "border-primary bg-primary" : "border-border"
          }`}
        >
          {selected && <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />}
        </span>
      </div>

      <div className="mt-5 flex w-full items-baseline justify-between gap-3">
        <p className="text-lg font-semibold text-foreground">{name}</p>
        {addOn ? (
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
            {addOn}
          </span>
        ) : (
          <span className="text-xs text-muted-foreground">Included</span>
        )}
      </div>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </button>
  );
}
