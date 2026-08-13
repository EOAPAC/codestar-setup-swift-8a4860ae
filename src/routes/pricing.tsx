import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

import { Button } from "@/components/ui/button";
import { Award, Sparkles, Star, Check, Copy } from "lucide-react";

const BRAND_BLUE = "#1978E5";

import linkedinBannerAsset from "@/assets/ea-winner-social-Linkedin_Post.png.asset.json";
import igPostAsset from "@/assets/ea-winner-social-IG_Post.png.asset.json";
import igStoryAsset from "@/assets/ea-winner-social-IG_story.png.asset.json";
import emailSigAsset from "@/assets/ea-winner-emailsig-full-600x200.png.asset.json";
import winnerSealAsset from "@/assets/winner-seal.png.asset.json";

type FreeAsset = {
  title: string;
  meta: string;
  src: string;
  alt: string;
  frame: string;
  caption?: string;
};

const freeAssets: FreeAsset[] = [
  {
    title: "Winner seal",
    meta: "1080 x 1080 PNG",
    src: winnerSealAsset.url,
    alt: "Entrepreneur Awards 2026 winner seal badge",
    frame: "aspect-square",
    caption: "Honored to be named a 2026 Entrepreneur Award winner. #EntrepreneurAwards #2026Winner",
  },
  {
    title: "LinkedIn banner",
    meta: "1200 x 630 PNG",
    src: linkedinBannerAsset.url,
    alt: "Entrepreneur Awards 2026 winner LinkedIn banner graphic",
    frame: "aspect-[1200/630]",
    caption:
      "I am proud to share that I have been named a 2026 Entrepreneur Awards winner.\n\nThis recognition reflects the work of a team that shows up every day, and the customers who trusted us to do it. Grateful for both.\n\nThank you to Entrepreneur Awards for the recognition. On to the next chapter.",
  },
  {
    title: "Square social post",
    meta: "1080 x 1080 PNG",
    src: igPostAsset.url,
    alt: "Entrepreneur Awards 2026 winner square social post graphic",
    frame: "aspect-square",
    caption:
      "Named a 2026 Entrepreneur Award winner by @entrepreneurawards.co.\n\nThank you to everyone who has backed this business, our team, our customers, and the people who said yes early. This one is shared.\n\n#EntrepreneurAwards #2026Winner",
  },
  {
    title: "Story graphic",
    meta: "1080 x 1920 PNG",
    src: igStoryAsset.url,
    alt: "Entrepreneur Awards 2026 winner vertical story graphic",
    frame: "aspect-[1080/1920]",
    caption: "2026 Entrepreneur Award winner. Grateful. @entrepreneurawards.co",
  },
  {
    title: "Email signature",
    meta: "600 x 200 PNG",
    src: emailSigAsset.url,
    alt: "Entrepreneur Awards 2026 winner email signature strip",
    frame: "aspect-[600/200]",
  },
];

function FreeAssetTile({ asset }: { asset: (typeof freeAssets)[number] }) {
  const [copied, setCopied] = useState(false);

  async function copyCaption() {
    if (!asset.caption) return;
    try {
      await navigator.clipboard.writeText(asset.caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <figure className="flex h-full flex-col">
      <div className="h-56 w-full rounded-xl border border-border bg-background p-4 shadow-sm">
        <div className="flex h-full w-full items-center justify-center">
          <img
            src={asset.src}
            alt={asset.alt}
            loading="lazy"
            className="max-h-full max-w-full min-h-0 rounded-md object-contain"
          />
        </div>
      </div>
      <figcaption className="mt-3 text-center">
        <span className="block text-sm font-medium text-foreground">{asset.title}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground">{asset.meta}</span>
      </figcaption>
      <div className="mt-4 flex flex-col gap-2">
        <a
          href={asset.src}
          download
          className="inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Download
        </a>
        {asset.caption ? (
          <Button
            variant="outline"
            size="sm"
            className="w-full border-primary text-primary hover:bg-primary/10"
            onClick={copyCaption}
          >
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
        ) : null}
      </div>
    </figure>
  );
}

const IG_HANDLE = "@entrepreneurawards.co";
const LINKEDIN_HANDLE = "Entrepreneur Awards";

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

const featureStages = [
  {
    number: 1,
    title: "We write it",
    body: "We start from your entry — you've already told us the story. If we need anything else, it's a couple of questions, not a form.",
  },
  {
    number: 2,
    title: "You read it",
    body: "You see the whole thing before anyone else does. Nothing goes live until you say so.",
  },
  {
    number: 3,
    title: "It goes live",
    body: "Published at your permanent link, and the box ships.",
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

function PricingPage() {
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
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                Your award email carries your citation — the short, formal statement of what was assessed and why your entry was selected. Those words are yours, free and permanent. What follows is the long version.
              </p>
            </Reveal>
          </div>
        </section>

        {/* THE OFFER */}
        <section className="relative overflow-hidden px-6 py-24 pb-32 md:py-32 md:pb-40">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-3xl" />
          </div>

          <Reveal>
            <div className="mb-16 text-center md:mb-20">
              <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-primary">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                The Winner's Feature
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                A page with your name on it, at a permanent link.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
                Somebody looks you up. Right now they find a badge. This is the page they find instead — your story, written out properly, at a link that doesn't expire. Put it in a bio, a proposal, an email signature, or the reply to "so what do you actually do?"
              </p>
            </div>
          </Reveal>

          {/* PREVIEW — full width */}
          <Reveal delay={80}>
            <div className="mx-auto w-full max-w-[1100px]">
              <div className="relative overflow-hidden rounded-lg border border-border bg-background shadow-xl">
                <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-muted" />
                  <span className="h-2.5 w-2.5 rounded-full bg-muted" />
                  <span className="h-2.5 w-2.5 rounded-full bg-muted" />
                  <div className="ml-3 flex-1 truncate rounded-md bg-muted/60 px-3 py-1 text-[11px] text-muted-foreground">
                    entrepreneurawards.co/winners/your-feature
                  </div>
                </div>

                <div className="p-6 md:p-10">
                  <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-primary">
                    <Award className="h-3 w-3" aria-hidden /> 2026 Winner Feature
                  </div>
                  <h3 className="max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl">
                    How [Your Name] built something worth recognizing.
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground">
                    By Entrepreneur Awards Editorial · 6 min read
                  </p>

                  <div className="mt-6 grid gap-8 md:grid-cols-[1.1fr_1fr]">
                    <div className="h-40 rounded-md bg-gradient-to-br from-primary/25 via-primary/10 to-secondary md:h-56" />

                    <div>
                      <div className="space-y-2.5">
                        <div className="h-2 w-full rounded bg-muted" />
                        <div className="h-2 w-[96%] rounded bg-muted" />
                        <div className="h-2 w-[88%] rounded bg-muted" />
                        <div className="h-2 w-[70%] rounded bg-muted" />
                      </div>

                      <div className="mt-5 border-l-2 border-primary/60 pl-3">
                        <div className="h-2 w-[80%] rounded bg-muted" />
                        <div className="mt-2 h-2 w-[55%] rounded bg-muted" />
                      </div>

                      <div className="mt-5 space-y-2.5">
                        <div className="h-2 w-full rounded bg-muted" />
                        <div className="h-2 w-[92%] rounded bg-muted" />
                        <div className="h-2 w-[60%] rounded bg-muted" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* OFFER BLOCK */}
          <div className="mx-auto mt-20 w-full max-w-[900px] md:mt-24">
            <Reveal>
              <div className="text-center">
                <p className="font-mono text-base tracking-wide text-muted-foreground">
                  entrepreneurawards.co/winners/your-feature
                </p>
                <p className="mt-2 text-[0.8125rem] text-muted-foreground">
                  Your name, your business. Permanent.
                </p>

                <div className="mt-8 flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-semibold tracking-tight text-foreground">
                    ${WINNERS_FEATURE_PRICE.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">one-time</span>
                </div>
                <p className="mt-3 text-[17px] font-medium text-foreground">A badge says you won. This says why.</p>
              </div>
            </Reveal>

            {/* THREE STEPS */}
            <Reveal delay={80}>
              <ol className="mt-14 grid items-start gap-6 md:grid-cols-[1fr_1px_1fr_1px_1fr] md:gap-10">
                {featureStages.map(({ number, title, body }, index) => [
                  <li key={number} className="text-left">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[14px] font-medium text-primary-foreground">
                      {number}
                    </span>
                    <p className="mt-4 text-sm font-semibold text-foreground">{title}</p>
                    <div className="mt-3 text-sm leading-[1.7] text-muted-foreground">{body}</div>
                  </li>,
                  index < featureStages.length - 1 && (
                    <li
                      key={`divider-${number}`}
                      className="h-px w-full bg-border md:h-auto md:w-px md:self-stretch"
                      aria-hidden
                    />
                  ),
                ])}
              </ol>
            </Reveal>

            {/* THE BOX */}
            <Reveal delay={100}>
              <div className="mt-16 rounded-lg border border-border p-6 md:p-8">
                <p className="text-sm leading-[1.7] text-muted-foreground">
                  One box arrives: the engraved award with your name and the year, a printed edition of your feature, your 2026 certificate, and a card with the link on it.
                </p>
              </div>
            </Reveal>

            {/* CTA */}
            <Reveal delay={120}>
              <div className="mt-10 text-center">
                <a
                  href="https://payments.entrepreneurawards.co/b/7sY8wPbgN236evy2UY8so0i"
                  target="_blank"
                  rel="noreferrer"
                  className="mx-auto inline-flex h-11 w-full max-w-[320px] items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Start my feature
                </a>

                <p className="mt-4 text-[0.875rem] text-muted-foreground">
                  Nothing publishes until you've read it.
                </p>

                <div className="mt-4 text-[13px] text-muted-foreground">
                  <p>
                    Every winner is independently reviewed and selected.{" "}
                    <Link to="/criteria" className="text-primary underline-offset-4 hover:underline">
                      Our criteria
                    </Link>
                    .
                  </p>
                </div>
              </div>
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
                  Yours to keep, free and permanent. Download what you need and post it today.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                {freeAssets.map((a) => (
                  <li key={a.title}>
                    <FreeAssetTile asset={a} />
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-10 text-center text-sm text-muted-foreground">
                Tag {IG_HANDLE} when you post.
              </p>
            </Reveal>

          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
