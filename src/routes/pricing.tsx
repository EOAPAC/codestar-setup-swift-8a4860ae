import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Sparkles, Star, Check, Copy } from "lucide-react";

const BRAND_BLUE = "#1978E5";

import linkedinBannerAsset from "@/assets/ea-winner-social-Linkedin_Post.png.asset.json";
import igPostAsset from "@/assets/ea-winner-social-IG_Post.png.asset.json";
import igStoryAsset from "@/assets/ea-winner-social-IG_story.png.asset.json";
import emailSigAsset from "@/assets/ea-winner-emailsig-full-600x200.png.asset.json";

const freeAssets = [
  {
    title: "LinkedIn banner",
    meta: "1200 x 630 PNG",
    src: linkedinBannerAsset.url,
    alt: "Entrepreneur Awards 2026 winner LinkedIn banner graphic",
    frame: "aspect-[1200/630]",
  },
  {
    title: "Square social post",
    meta: "1080 x 1080 PNG",
    src: igPostAsset.url,
    alt: "Entrepreneur Awards 2026 winner square social post graphic",
    frame: "aspect-square",
  },
  {
    title: "Story graphic",
    meta: "1080 x 1920 PNG",
    src: igStoryAsset.url,
    alt: "Entrepreneur Awards 2026 winner vertical story graphic",
    frame: "aspect-[1080/1920]",
  },
  {
    title: "Email signature",
    meta: "600 x 200 PNG",
    src: emailSigAsset.url,
    alt: "Entrepreneur Awards 2026 winner email signature strip",
    frame: "aspect-[600/200]",
  },
] as const;

function FreeAssetTile({ asset }: { asset: (typeof freeAssets)[number] }) {
  return (
    <figure className="flex h-full flex-col">
      <div className="grid flex-1 place-items-center rounded-xl border border-border bg-background p-4 shadow-sm">
        <div className={`w-full ${asset.frame} max-h-56`}>
          <img
            src={asset.src}
            alt={asset.alt}
            loading="lazy"
            className="h-full w-full rounded-md object-contain"
          />
        </div>
      </div>
      <figcaption className="mt-3 text-center">
        <span className="block text-sm font-medium text-foreground">{asset.title}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground">{asset.meta}</span>
      </figcaption>
    </figure>
  );
}

const IG_HANDLE = "@entrepreneurawards.co";
const LINKEDIN_HANDLE = "Entrepreneur Awards";

const captions = [
  {
    platform: "Instagram",
    tag: IG_HANDLE,
    text: `Named a 2026 Entrepreneur Award winner by ${IG_HANDLE}.\n\nThank you to everyone who has backed this business, our team, our customers, and the people who said yes early. This one is shared.\n\n#EntrepreneurAwards #2026Winner`,
  },
  {
    platform: "LinkedIn",
    tag: LINKEDIN_HANDLE,
    text: `I am proud to share that I have been named a 2026 ${LINKEDIN_HANDLE} winner.\n\nThis recognition reflects the work of a team that shows up every day, and the customers who trusted us to do it. Grateful for both.\n\nThank you to ${LINKEDIN_HANDLE} for the recognition. On to the next chapter.`,
  },
  {
    platform: "Story or short post",
    tag: IG_HANDLE,
    text: `2026 Entrepreneur Award winner. Grateful. ${IG_HANDLE}`,
  },
] as const;

function CaptionCard({ caption }: { caption: (typeof captions)[number] }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(caption.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Card className="flex h-full flex-col gap-4 p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-foreground">{caption.platform}</span>
        <span className="text-xs text-muted-foreground">Tag {caption.tag}</span>
      </div>
      <p className="flex-1 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
        {caption.text}
      </p>
      <Button variant="outline" size="sm" className="self-start" onClick={copy}>
        {copied ? (
          <>
            <Check className="h-4 w-4" aria-hidden />
            Copied
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" aria-hidden />
            Copy caption
          </>
        )}
      </Button>
    </Card>
  );
}



// Prices — edit these to update the page.
const WINNERS_FEATURE_PRICE = 595;

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "The Winner's Feature | Entrepreneur Awards" },
      { name: "description", content: "Your 2026 Entrepreneur Award is yours. The Winner's Feature turns your win into a professionally written, published story about you and your business." },
      { property: "og:title", content: "The Winner's Feature | Entrepreneur Awards" },
      { property: "og:description", content: "Your 2026 Entrepreneur Award is yours. The Winner's Feature turns your win into a professionally written, published story about you and your business." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});

const stages = [
  {
    number: 1,
    title: "We write your story properly",
    body: "Your entry form gave us the outline. Before we write, we'll ask you a handful of questions, the decisions, the near-misses, the parts there wasn't room for. Ten minutes on your side. It's the difference between a summary and a story worth reading.",
    body2: null as string | null,
  },
  {
    number: 2,
    title: "We publish it permanently",
    body: "You read it first and tell us what to change. Nothing goes live until you're happy. Then it sits at a permanent link on The Entrepreneur Awards.",
    body2: "When someone searches your name, this is what they find. Not your own site making claims about you.",
  },
  {
    number: 3,
    title: "We send the winner's box",
    body: "Once your feature is live.",
    body2: null as string | null,
  },
];

const winnersBox = [
  { lead: "The engraved desk piece", rest: "marking the year you were recognized" },
  {
    lead: "A printed edition of your feature",
    rest: "a proper offprint, the way publications send authors their own pages",
  },
  { lead: "Your 2026 winner certificate", rest: null as string | null },
  { lead: "A card carrying the link to your feature", rest: null as string | null },
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

function PricingPage() {

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
                  Now let's tell it properly.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Your recognition is already yours. This is how it becomes something people find when they look you up.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ALREADY YOURS */}
        <section className="border-t border-border bg-secondary/30 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
                  Already yours, free
                </p>
                <p className="mt-4 text-lg leading-relaxed text-foreground md:text-xl">
                  Your winner badge, your shareable graphics, and your award citation — the formal words that accompany your win. In your inbox, ready to use today.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {freeAssets.map((a) => (
                  <li key={a.title}>
                    <FreeAssetTile asset={a} />
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-14">
                <div className="mx-auto max-w-2xl text-center">
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
                    Ready to post captions
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    Copy one, pair it with a graphic, and tag {IG_HANDLE} so we can share your win.
                  </p>
                </div>
                <ul className="mt-8 grid gap-5 md:grid-cols-3">
                  {captions.map((c) => (
                    <li key={c.platform}>
                      <CaptionCard caption={c} />
                    </li>
                  ))}
                </ul>
              </div>
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
                          By Entrepreneur Awards Editorial · 6 min read
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

                  {/* Right — stages */}
                  <div className="flex flex-col justify-between p-8 md:p-12">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-semibold tracking-tight text-foreground">
                          ${WINNERS_FEATURE_PRICE.toLocaleString()}
                        </span>
                        <span className="text-sm text-muted-foreground">one-time</span>
                      </div>
                      <p className="mt-3 text-base leading-relaxed text-foreground">
                        A full feature about you, written and published. Plus the winner's box.
                      </p>

                      <ol className="mt-8 space-y-5">
                        {stages.map(({ number, title, body, body2 }) => (
                          <li key={number} className="flex items-start gap-4">
                            <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary ring-1 ring-primary/20">
                              {number}
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-foreground">{title}</p>
                              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
                              {body2 ? (
                                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body2}</p>
                              ) : null}
                              {number === 3 ? (
                                <ul className="mt-4 space-y-2.5 rounded-lg border border-border p-4">
                                  {winnersBox.map((item) => (
                                    <li key={item.lead} className="text-sm leading-relaxed text-muted-foreground">
                                      <span className="font-semibold text-foreground">{item.lead}</span>
                                      {item.rest ? ` — ${item.rest}` : null}
                                    </li>
                                  ))}
                                </ul>
                              ) : null}
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </Card>
            </Reveal>
          </div>
        </section>

        {/* TOTAL */}
        <section className="border-t border-border bg-secondary/30 px-6 py-24">
          <div className="mx-auto max-w-4xl">
            {/* Total + CTA */}
            <Reveal>
              <div className="rounded-2xl border border-primary/20 bg-card p-6 shadow-[0_20px_60px_-30px_rgba(25,120,229,0.4)] md:p-8">
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Your total
                    </p>
                    <div className="mt-2 flex items-baseline gap-3">
                      <span className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                        ${WINNERS_FEATURE_PRICE.toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground">one-time</span>
                    </div>
                  </div>

                  <div className="w-full md:w-auto">
                    {/* @ts-expect-error - Stripe web component */}
                    <stripe-buy-button
                      buy-button-id="buy_btn_1TxdN0Gd5RmL1wBx7bYpYfn0"
                      publishable-key="pk_live_51PODhuGd5RmL1wBxaPSXB1yj8gkb96lf7T1sN4GIFOdql1w0I3nNAA9eDnwN1mMT5h4W8KuRqtrNELJCjWxz8hGS00QV17YBf4"
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-2 border-t border-border pt-6 text-center text-xs text-muted-foreground md:text-left">
                  <p>
                    Nothing publishes until you've read it. Your badge, graphics and citation stay yours whether you take this or not.
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

