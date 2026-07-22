import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import {
  Award,
  Download,
  Link as LinkIcon,
  ArrowRight,
  Copy,
  Check,
  Linkedin,
  Twitter,
  Share2,
  PartyPopper,
  Timer,
} from "lucide-react";

export const Route = createFileRoute("/winner-resources/$token")({
  head: () => ({
    meta: [
      { title: "Your Winner Resources | The Entrepreneur Awards" },
      {
        name: "description",
        content:
          "Celebrate your 2026 Entrepreneur Award. Download your winner assets and make your recognition official with a verified, published profile.",
      },
      { property: "og:title", content: "Your Winner Resources | The Entrepreneur Awards" },
      {
        property: "og:description",
        content:
          "Celebrate your 2026 Entrepreneur Award. Download your winner assets and make your recognition official with a verified, published profile.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WinnerResourcesPage,
});

const BRAND_BLUE = "#1978E5";

const SHARE_URL = "https://www.entrepreneurawards.co";
const SHARE_CAPTION =
  "Honored to share that I've been named a 2026 Entrepreneur Award winner. Grateful for the recognition and for everyone who's been part of the journey. Learn more about the program: https://www.entrepreneurawards.co";

// ---------- Real winner asset images ----------
import badgeAsset from "@/assets/EA_Winner_Seal.png.asset.json";
import squareAsset from "@/assets/EA_Square_Social_Image.png.asset.json";
import storyAsset from "@/assets/EA_Portrait_Winner_Image.png.asset.json";
import bannerAsset from "@/assets/EA_Linkedin_Banner.png.asset.json";

const assets = [
  {
    title: "Winner badge & seal",
    description:
      "Official badge and seal for your website, email signature, and press kit.",
    image: badgeAsset.url,
    presentation: "seal" as const,
    filename: "EA-Winner-Badge-Seal.png",
  },
  {
    title: "Square social graphic",
    description:
      "Instagram, LinkedIn, and X post template designed with space to add your photo.",
    image: squareAsset.url,
    presentation: "square" as const,
    filename: "EA-Square-Social-Graphic.png",
  },
  {
    title: "Story / vertical graphic",
    description:
      "Stories and Reels format for sharing your win across mobile-first platforms.",
    image: storyAsset.url,
    presentation: "story" as const,
    filename: "EA-Story-Vertical-Graphic.png",
  },
  {
    title: "LinkedIn / website banner",
    description:
      "Cover image for LinkedIn and website headers, sized for professional profiles.",
    image: bannerAsset.url,
    presentation: "banner" as const,
    filename: "EA-LinkedIn-Website-Banner.png",
  },
];


const rungs = [
  {
    icon: LinkIcon,
    title: "Make it official",
    text: "your write-up published at a verifiable link, plus a certificate.",
  },
  {
    icon: Award,
    title: "Something to show for it",
    text: "a physical plaque and investor-ready materials.",
  },
  {
    icon: Share2,
    title: "Get it seen everywhere",
    text: "your story out through our press network.",
  },
];

const faqs = [
  {
    q: "Do I have to upgrade to use the assets?",
    a: "No. The assets above are yours to download and share, no upgrade required. The published profile is a separate, optional step for winners who want their recognition to be independently verifiable.",
  },
  {
    q: "What's on the published profile?",
    a: "A permanent page on entrepreneurawards.co with your name, company, category, a short profile, and your links. It's what someone lands on when they check whether your win is real.",
  },
  {
    q: "Can I edit it later?",
    a: "Yes. You can update your photo, bio, and links anytime after your profile is live.",
  },
  {
    q: "Who sees it?",
    a: "Anyone you send it to, plus anyone who finds it through search. Published profiles are indexed and easy to share on LinkedIn, in press kits, or in investor decks.",
  },
];

function generatePlaceholderDownload(filename: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="${BRAND_BLUE}"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, sans-serif" font-size="48" font-weight="600" fill="white">${filename}</text></svg>`;
  const blob = new Blob([svg], { type: "image/svg+xml" });
  return URL.createObjectURL(blob);
}

async function triggerDownload(filename: string, url?: string) {
  let href = url;
  let revoke = false;
  if (href) {
    try {
      const res = await fetch(href);
      const blob = await res.blob();
      href = URL.createObjectURL(blob);
      revoke = true;
    } catch {
      href = generatePlaceholderDownload(filename);
      revoke = true;
    }
  } else {
    href = generatePlaceholderDownload(filename);
    revoke = true;
  }
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  if (revoke) URL.revokeObjectURL(href);
}


// ---------- Confetti ----------
function Confetti() {
  const dots = Array.from({ length: 18 });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden">
      {dots.map((_, i) => {
        const left = (i * 53) % 100;
        const delay = (i % 6) * 0.6;
        const duration = 6 + (i % 5);
        const size = 4 + (i % 4);
        const colors = [BRAND_BLUE, "#93c5fd", "#dbeafe", "#facc15"];
        const color = colors[i % colors.length];
        const rotate = (i * 37) % 360;
        return (
          <span
            key={i}
            className="absolute block rounded-[1px] opacity-70"
            style={{
              left: `${left}%`,
              top: "-10%",
              width: `${size}px`,
              height: `${size * 1.6}px`,
              backgroundColor: color,
              transform: `rotate(${rotate}deg)`,
              animation: `ea-confetti-fall ${duration}s linear ${delay}s infinite`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes ea-confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.9; }
          100% { transform: translateY(420px) rotate(540deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function AssetPreview({ asset }: { asset: (typeof assets)[number] }) {
  const baseShadow = "shadow-xl shadow-primary/10 ring-1 ring-black/5";
  const img = (
    <img
      src={asset.image}
      alt={asset.title}
      loading="lazy"
      className="pointer-events-none h-full w-full select-none object-cover"
    />
  );

  if (asset.presentation === "seal") {
    return (
      <div
        className={`relative flex aspect-square h-40 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-4 transition-transform duration-300 group-hover:scale-[1.03] ${baseShadow}`}
      >
        <div className="relative h-full w-full overflow-hidden rounded-full">
          {img}
        </div>
      </div>
    );
  }

  if (asset.presentation === "square") {
    return (
      <div
        className={`relative aspect-square h-44 overflow-hidden rounded-2xl bg-background transition-transform duration-300 group-hover:scale-[1.03] ${baseShadow}`}
      >
        {img}
      </div>
    );
  }

  if (asset.presentation === "story") {
    return (
      <div className="relative h-[200px] w-[112px] shrink-0 overflow-hidden rounded-[1.75rem] border-[5px] border-background bg-background shadow-2xl shadow-primary/10 ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-[1.03]">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center pt-1.5">
          <div className="h-1.5 w-10 rounded-full bg-black/10" />
        </div>
        {img}
      </div>
    );
  }

  // banner
  return (
    <div className="w-full max-w-[92%] overflow-hidden rounded-xl bg-background shadow-2xl shadow-primary/10 ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-[1.02]">
      <div className="flex items-center gap-1.5 border-b border-border bg-secondary/60 px-3 py-2">
        <div className="h-2 w-2 rounded-full bg-red-400" />
        <div className="h-2 w-2 rounded-full bg-yellow-400" />
        <div className="h-2 w-2 rounded-full bg-green-400" />
      </div>
      <div className="relative aspect-[1920/520] w-full overflow-hidden">{img}</div>
    </div>
  );
}

function WinnerResourcesPage() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copyCaption = async (idx: number) => {
    try {
      await navigator.clipboard.writeText(SHARE_CAPTION);
      setCopiedIdx(idx);
      toast.success("Caption copied. Paste it wherever you share your win.");
      setTimeout(() => setCopiedIdx((v) => (v === idx ? null : v)), 2200);
    } catch {
      toast.error("Couldn't copy. Please try again.");
    }
  };

  const downloadAll = () => {
    assets.forEach((a, i) => setTimeout(() => triggerDownload(a.filename, a.image), i * 250));
    toast.success("Downloading all four assets.");
  };


  const shareLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SHARE_URL)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };
  const shareX = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_CAPTION)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      toast.success("Link copied.");
    } catch {
      toast.error("Couldn't copy the link.");
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteNav />
      <main>
        {/* ============ Hero ============ */}
        <section className="relative overflow-hidden border-b border-border">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,theme(colors.primary/22),transparent_70%)]"
          />
          <Confetti />
          <div className="relative mx-auto max-w-3xl px-6 pt-24 pb-20 text-center md:pt-32 md:pb-24">
            <span className="inline-flex animate-fade-in items-center gap-2 rounded-full border border-primary bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-sm">
              <PartyPopper className="h-3.5 w-3.5" />
              2026 Winner · Verified Entry
            </span>
            <h1 className="mt-6 animate-fade-in text-5xl font-semibold tracking-tight md:text-6xl">
              Congratulations.
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                You made it.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl animate-fade-in text-lg leading-relaxed text-muted-foreground">
              You've been named a 2026 Entrepreneur Award winner. Your assets are ready, and one more step turns your win into something the world can verify.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1">
                <Check className="h-3.5 w-3.5 text-primary" /> Assets ready to download
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1">
                <Check className="h-3.5 w-3.5 text-primary" /> Your recognition is live
              </span>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Your win is yours to share today. You can also make it verifiable — more on that below.
            </p>
          </div>
        </section>

        {/* ============ At a glance strip ============ */}
        <section className="border-b border-border bg-secondary/30">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-px overflow-hidden bg-border sm:grid-cols-2">
            {[
              { icon: Award, label: "4 assets ready to share" },
              { icon: Timer, label: "Under 2 minutes to post" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex items-center justify-center gap-3 bg-background px-6 py-5 text-sm">
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground/85">{s.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============ Download assets ============ */}
        <section className="py-24 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="text-sm font-medium uppercase tracking-widest text-primary">
                  Your assets
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                  Share your win with confidence.
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Download the set, or grab just what you need. Each asset is designed with space to add your name or photo.
                </p>
              </div>
              <Button onClick={downloadAll} size="lg" variant="outline" className="shrink-0">
                <Download className="mr-2 h-4 w-4" />
                Download all
              </Button>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {assets.map((asset, idx) => {
                return (
                  <Card
                    key={asset.title}
                    className="group flex flex-col overflow-hidden border-border transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/[0.02]">
                      <div className="flex h-full w-full items-center justify-center p-5">
                        <AssetPreview asset={asset} />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-base font-semibold tracking-tight">{asset.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {asset.description}
                      </p>
                      <div className="mt-5 flex flex-col gap-2">
                        <Button size="sm" className="w-full" onClick={() => triggerDownload(asset.filename, asset.image)}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-xs text-muted-foreground hover:text-foreground"
                          onClick={() => copyCaption(idx)}
                        >
                          {copiedIdx === idx ? (
                            <>
                              <Check className="mr-2 h-3.5 w-3.5 text-primary" /> Caption copied
                            </>
                          ) : (
                            <>
                              <Copy className="mr-2 h-3.5 w-3.5" /> Copy share caption
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Designed with space to add your name or photo. Files download as high-resolution PNGs.
            </p>

            <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
              Sharing your win is a great start. The next step is making it something others can verify ↓
            </p>
          </div>
        </section>

        {/* ============ Share in one tap ============ */}
        <section className="border-y border-border bg-secondary/40 py-14">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center md:flex-row md:justify-between md:text-left">
            <div className="max-w-md">
              <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-primary">
                <Share2 className="h-3.5 w-3.5" /> Share in one tap
              </div>
              <p className="mt-2 text-lg font-medium text-foreground/90">
                Announce your win where it matters.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                We've written the caption. You just click.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button variant="outline" onClick={shareLinkedIn}>
                <Linkedin className="mr-2 h-4 w-4 text-primary" /> Share on LinkedIn
              </Button>
              <Button variant="outline" onClick={shareX}>
                <Twitter className="mr-2 h-4 w-4 text-primary" /> Share on X
              </Button>
              <Button variant="outline" onClick={copyLink}>
                <LinkIcon className="mr-2 h-4 w-4 text-primary" /> Copy link
              </Button>
            </div>
          </div>
        </section>

        {/* ============ Upgrade guide ============ */}
        <section className="relative py-24 md:py-32">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/12),transparent_70%)]"
          />
          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Ready to take your win further?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Your badge and write-up are yours to share today. When you're ready, here's how to take your recognition further:
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {rungs.map((rung, idx) => {
                const Icon = rung.icon;
                return (
                  <div
                    key={rung.title}
                    className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center transition-all hover:border-primary/30 hover:shadow-sm"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-foreground">
                      {rung.title}
                      <span className="mx-1 text-muted-foreground">—</span>
                      <span className="font-normal text-muted-foreground">{rung.text}</span>
                    </p>
                  </div>
                );
              })}
            </div>

            <Button asChild size="lg" className="mt-10">
              <a href="/winner-packages">
                View winner packages
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <p className="mt-3 text-center text-sm text-muted-foreground">
              Three clear steps — choose how far you want your win to travel.
            </p>
          </div>
        </section>

        {/* ============ Mini FAQ ============ */}
        <section className="border-t border-border bg-secondary/30 py-24">
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">Common questions</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Before you decide.</h2>
            </div>
            <Accordion type="single" collapsible className="mt-10 w-full">
              {faqs.map((item, i) => (
                <AccordionItem key={item.q} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-base font-medium">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <SiteFooter />
      <div className="border-t border-border bg-background py-6">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-sm text-muted-foreground">
            Questions about your win? Reply to your winner email and we'll help.
          </p>
        </div>
      </div>
    </div>
  );
}
