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
  ImageIcon,
  FileText,
  Sparkles,
  Star,
  Share2,
  LayoutTemplate,
} from "lucide-react";

const BRAND_BLUE = "#1978E5";

// The Winner's Feature price. Edit this constant to update the page.
const WINNERS_FEATURE_PRICE = 495;

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "The Winner's Feature | The Entrepreneur Awards" },
      { name: "description", content: "Your 2026 Entrepreneur Award is yours. Turn your win into a published feature, distribution, and a keepsake award, all done for you." },
      { property: "og:title", content: "The Winner's Feature | The Entrepreneur Awards" },
      { property: "og:description", content: "Your 2026 Entrepreneur Award is yours. Turn your win into a published feature, distribution, and a keepsake award, all done for you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});

const deliverables = [
  { icon: PenLine, title: "Your story, told well", body: "A professionally written feature by our editorial team." },
  { icon: Link2, title: "A permanent, sharable link", body: "Published on The Entrepreneur Awards site, yours to send anywhere." },
  { icon: Users, title: "Seen by new people", body: "Shared through our founder network beyond your existing audience." },
  { icon: ImageIcon, title: "An 'as featured' media strip", body: "For your own website, decks, and profiles." },
  { icon: Award, title: "An engraved keepsake award", body: "Finely crafted, sent to you to mark the achievement." },
];

// Confetti (same as winner-resources page)
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

function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />

      <main className="flex-1">
        {/* HERO — arrival */}
        <section className="relative overflow-hidden px-6 pt-20 pb-24 md:pt-32 md:pb-32">
          {/* Ambient background */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-[-10rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_color-mix(in_oklab,var(--color-primary)_10%,transparent),_transparent_60%)]" />
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
                backgroundSize: "22px 22px",
                color: "var(--color-foreground)",
              }}
            />
          </div>

          <Confetti />

          <div className="relative mx-auto max-w-4xl text-center">
            <Reveal>
              <span className="inline-flex animate-fade-in items-center gap-2 rounded-full border border-primary/30 bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20">
                <Star className="h-4 w-4 fill-current" />
                2026 Winner · Verified Entry
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-8 text-5xl font-semibold tracking-tight text-foreground md:text-7xl lg:text-8xl">
                Congratulations.
                <br />
                <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                  You won.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Your recognition is yours. Here's how to make the world see it.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ALREADY YOURS — simple text tiles */}
        <section className="border-t border-border bg-secondary/30 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div className="mb-12 text-center">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
                  Already yours
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  Free, and ready to share today
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
                  Your winner assets are in your inbox. What's below is about taking it further.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Reveal delay={0}>
                <FreeTile
                  icon={Award}
                  label="Winner badge"
                  description="Official seal for your website, email signature, and press kit."
                />
              </Reveal>
              <Reveal delay={80}>
                <FreeTile
                  icon={Share2}
                  label="Social graphics"
                  description="Square and story-sized posts for Instagram, LinkedIn, and X."
                />
              </Reveal>
              <Reveal delay={160}>
                <FreeTile
                  icon={LayoutTemplate}
                  label="LinkedIn banner"
                  description="Cover image sized for LinkedIn and website headers."
                />
              </Reveal>
            </div>

            <Reveal delay={200}>
              <p className="mx-auto mt-10 max-w-2xl text-center text-base leading-relaxed text-muted-foreground md:text-lg">
                These announce your win. The Winner's Feature below is how it gets discovered — a real story, published and shared, that keeps working long after the post.
              </p>
            </Reveal>
          </div>
        </section>

        {/* THE OFFER — the moment */}
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
                  Turn your win into a story people read.
                </h2>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <Card className="relative overflow-hidden border-primary/20 bg-card p-0 shadow-[0_30px_80px_-30px_rgba(25,120,229,0.35)]">
                {/* accent bar */}
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent" />

                <div className="grid gap-0 lg:grid-cols-[1.05fr_1fr]">
                  {/* Left — feature preview mockup */}
                  <div className="relative border-b border-border bg-gradient-to-br from-secondary/60 to-background p-8 md:p-12 lg:border-b-0 lg:border-r">
                    <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                      Preview · what gets published
                    </p>

                    <div className="relative rounded-lg border border-border bg-background shadow-xl">
                      {/* browser chrome */}
                      <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-muted" />
                        <span className="h-2.5 w-2.5 rounded-full bg-muted" />
                        <span className="h-2.5 w-2.5 rounded-full bg-muted" />
                        <div className="ml-3 flex-1 truncate rounded-md bg-muted/60 px-3 py-1 text-[11px] text-muted-foreground">
                          entrepreneurawards.co/winners/your-feature
                        </div>
                      </div>

                      {/* article */}
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

                        {/* faux hero image */}
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

                    <p className="mt-4 text-center text-xs text-muted-foreground">
                      A permanent link you can send to clients, investors, and press.
                    </p>
                  </div>

                  {/* Right — offer + deliverables + CTA */}
                  <div className="flex flex-col justify-between p-8 md:p-12">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-semibold tracking-tight text-foreground">
                          ${WINNERS_FEATURE_PRICE.toLocaleString()}
                        </span>
                        <span className="text-sm text-muted-foreground">one-time</span>
                      </div>
                      <p className="mt-3 text-base leading-relaxed text-foreground">
                        Everything we do to turn your win into visibility and proof. Done for you.
                      </p>

                      <ul className="mt-8 space-y-5">
                        {deliverables.map(({ icon: Icon, title, body }) => (
                          <li key={title} className="flex items-start gap-4">
                            <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
                              <Icon className="h-4 w-4" aria-hidden />
                            </span>
                            <div>
                              <p className="text-sm font-medium text-foreground">{title}</p>
                              <p className="mt-0.5 text-sm text-muted-foreground">{body}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-10">
                      <Button
                        asChild
                        size="lg"
                        className="group w-full transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transform-none"
                      >
                        <Link to="/complete">
                          Claim your feature
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </Button>
                      <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
                        <FileText className="h-3 w-3" aria-hidden />
                        Published within 2 weeks. Keepsake ships after publication.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function FreeTile({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transform-none">
      <div className="h-48 overflow-hidden">{children}</div>
      <div className="border-t border-border px-4 py-3">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">Free · yours to use</p>
      </div>
    </div>
  );
}
