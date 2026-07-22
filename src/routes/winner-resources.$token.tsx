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
  Shield,
  Search,
  ArrowRight,
  Sparkles,
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

// ---------- Asset previews (inline SVGs, mimic real deliverables) ----------
function BadgePreview() {
  return (
    <svg viewBox="0 0 200 150" className="h-full w-full">
      <defs>
        <linearGradient id="bg1" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={BRAND_BLUE} stopOpacity="0.14" />
          <stop offset="100%" stopColor={BRAND_BLUE} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="url(#bg1)" />
      <g transform="translate(100 75)">
        <circle r="42" fill="none" stroke={BRAND_BLUE} strokeWidth="2.5" />
        <circle r="34" fill={BRAND_BLUE} fillOpacity="0.08" />
        <text textAnchor="middle" y="-6" fontSize="7.5" fontWeight="700" fill={BRAND_BLUE} letterSpacing="1.5">2026 WINNER</text>
        <text textAnchor="middle" y="8" fontSize="6" fill={BRAND_BLUE} fillOpacity="0.85" letterSpacing="0.5">ENTREPRENEUR</text>
        <text textAnchor="middle" y="17" fontSize="6" fill={BRAND_BLUE} fillOpacity="0.85" letterSpacing="0.5">AWARDS</text>
        <path d="M-14 24 L0 30 L14 24" fill="none" stroke={BRAND_BLUE} strokeWidth="1.5" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function SquarePreview() {
  return (
    <svg viewBox="0 0 200 150" className="h-full w-full">
      <rect width="200" height="150" fill={BRAND_BLUE} fillOpacity="0.06" />
      <rect x="60" y="25" width="80" height="80" rx="6" fill="white" stroke={BRAND_BLUE} strokeOpacity="0.25" />
      <text x="100" y="55" textAnchor="middle" fontSize="6" fontWeight="700" fill={BRAND_BLUE} letterSpacing="1.2">2026 WINNER</text>
      <line x1="72" y1="62" x2="128" y2="62" stroke={BRAND_BLUE} strokeOpacity="0.2" />
      <text x="100" y="76" textAnchor="middle" fontSize="7" fontWeight="600" fill="#0f172a">Your Name</text>
      <text x="100" y="86" textAnchor="middle" fontSize="5" fill="#64748b">Company</text>
      <circle cx="100" cy="98" r="3" fill={BRAND_BLUE} />
      <text x="100" y="120" textAnchor="middle" fontSize="5" fill="#64748b" letterSpacing="0.5">entrepreneurawards.co</text>
    </svg>
  );
}

function StoryPreview() {
  return (
    <svg viewBox="0 0 200 150" className="h-full w-full">
      <rect width="200" height="150" fill={BRAND_BLUE} fillOpacity="0.06" />
      <rect x="82" y="15" width="36" height="120" rx="4" fill="white" stroke={BRAND_BLUE} strokeOpacity="0.25" />
      <text x="100" y="32" textAnchor="middle" fontSize="4" fontWeight="700" fill={BRAND_BLUE} letterSpacing="0.8">2026 WINNER</text>
      <circle cx="100" cy="55" r="9" fill={BRAND_BLUE} fillOpacity="0.15" stroke={BRAND_BLUE} strokeOpacity="0.3" />
      <text x="100" y="80" textAnchor="middle" fontSize="5" fontWeight="600" fill="#0f172a">Your Name</text>
      <line x1="90" y1="88" x2="110" y2="88" stroke={BRAND_BLUE} strokeOpacity="0.3" />
      <text x="100" y="98" textAnchor="middle" fontSize="3.5" fill="#64748b">Entrepreneur Awards</text>
      <rect x="88" y="115" width="24" height="7" rx="3" fill={BRAND_BLUE} />
      <text x="100" y="120" textAnchor="middle" fontSize="3.5" fill="white">Read story</text>
    </svg>
  );
}

function BannerPreview() {
  return (
    <svg viewBox="0 0 200 150" className="h-full w-full">
      <rect width="200" height="150" fill={BRAND_BLUE} fillOpacity="0.06" />
      <rect x="20" y="55" width="160" height="40" rx="4" fill="white" stroke={BRAND_BLUE} strokeOpacity="0.25" />
      <circle cx="38" cy="75" r="8" fill={BRAND_BLUE} fillOpacity="0.15" stroke={BRAND_BLUE} strokeOpacity="0.3" />
      <text x="54" y="73" fontSize="6" fontWeight="700" fill="#0f172a">Your Name</text>
      <text x="54" y="82" fontSize="4.5" fill="#64748b">2026 Entrepreneur Award Winner</text>
      <rect x="140" y="68" width="30" height="14" rx="3" fill={BRAND_BLUE} fillOpacity="0.1" stroke={BRAND_BLUE} strokeOpacity="0.4" />
      <text x="155" y="77" textAnchor="middle" fontSize="4.5" fontWeight="600" fill={BRAND_BLUE}>WINNER</text>
    </svg>
  );
}

const assets = [
  {
    title: "Winner badge & seal",
    description:
      "Official badge and seal for your website, email signature, and press kit.",
    Preview: BadgePreview,
    filename: "EA-Winner-Badge-Seal.svg",
  },
  {
    title: "Square social graphic",
    description:
      "Instagram, LinkedIn, and X post template designed with space to add your photo.",
    Preview: SquarePreview,
    filename: "EA-Square-Social-Graphic.svg",
  },
  {
    title: "Story / vertical graphic",
    description:
      "Stories and Reels format for sharing your win across mobile-first platforms.",
    Preview: StoryPreview,
    filename: "EA-Story-Vertical-Graphic.svg",
  },
  {
    title: "LinkedIn / website banner",
    description:
      "Cover image for LinkedIn and website headers, sized for professional profiles.",
    Preview: BannerPreview,
    filename: "EA-LinkedIn-Website-Banner.svg",
  },
];

const upgradePoints = [
  { icon: LinkIcon, text: "A verified, published profile at a permanent link." },
  { icon: Shield, text: "Something others can check, not just a claim you make." },
  { icon: Search, text: "Recognition that surfaces when someone searches you." },
];

const reassurance = [
  { icon: Rocket, text: "Live within 24h" },
  { icon: Globe, text: "Permanent link" },
  { icon: Pencil, text: "Editable anytime" },
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

function triggerDownload(filename: string) {
  const url = generatePlaceholderDownload(filename);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
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
    assets.forEach((a, i) => setTimeout(() => triggerDownload(a.filename), i * 250));
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
            <span className="inline-flex animate-fade-in items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
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
          </div>
        </section>

        {/* ============ At a glance strip ============ */}
        <section className="border-b border-border bg-secondary/30">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-px overflow-hidden bg-border sm:grid-cols-3">
            {[
              { icon: Award, label: "4 assets ready to share" },
              { icon: Timer, label: "Under 2 minutes to post" },
              { icon: Sparkles, label: "1 step to make it official" },
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
                const { Preview } = asset;
                return (
                  <Card
                    key={asset.title}
                    className="group flex flex-col overflow-hidden border-border transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/10 to-primary/[0.02]">
                      <Preview />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-base font-semibold tracking-tight">{asset.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {asset.description}
                      </p>
                      <div className="mt-5 flex flex-col gap-2">
                        <Button size="sm" className="w-full" onClick={() => triggerDownload(asset.filename)}>
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
              Designed with space to add your name or photo. Files download as SVG placeholders in this preview.
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
          <div className="relative mx-auto max-w-6xl px-6">
            <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
              {/* Left: message */}
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  The final step
                </span>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                  Make your win official.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  The assets above are yours to share. The final step is to make your recognition verifiable, published at a permanent link that prospects, investors, and press can find and confirm for themselves, so your win stands as independent proof rather than your own claim.
                </p>
                <ul className="mt-8 space-y-4">
                  {upgradePoints.map((point) => {
                    const Icon = point.icon;
                    return (
                      <li key={point.text} className="flex items-start gap-3">
                        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="pt-0.5 text-sm text-foreground/85 md:text-base">{point.text}</span>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-8 max-w-xl border-l-2 border-primary/40 pl-4 text-sm italic text-muted-foreground">
                  Published profiles are indexed and shareable across LinkedIn, press kits, and investor decks.
                </p>
              </div>

              {/* Right: offer card */}
              <div className="lg:sticky lg:top-24">
                <Card className="relative overflow-hidden border-primary/20 p-7 shadow-xl shadow-primary/5">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/15),transparent_70%)]"
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium uppercase tracking-widest text-primary">
                        Recognized · Published Profile
                      </span>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                        Recommended
                      </span>
                    </div>
                    <p className="mt-5 text-sm text-muted-foreground">
                      A permanent, verifiable profile page for your 2026 win, with additional visibility options for winners ready to go further.
                    </p>

                    <Button asChild size="lg" className="mt-6 w-full">
                      <a href="/pricing" target="_blank" rel="noopener noreferrer">
                        View winner packages
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <p className="mt-3 text-center text-xs text-muted-foreground">
                      Choose the package that fits how far you want your win to travel.
                    </p>

                    <div className="mt-6 grid grid-cols-3 gap-2 border-t border-border pt-5">
                      {reassurance.map((r) => {
                        const Icon = r.icon;
                        return (
                          <div key={r.text} className="flex flex-col items-center gap-1.5 text-center">
                            <Icon className="h-4 w-4 text-primary" />
                            <span className="text-[11px] leading-tight text-muted-foreground">{r.text}</span>
                          </div>
                        );
                      })}
                    </div>

                    <p className="mt-5 text-center text-xs italic text-muted-foreground">
                      Unclaimed wins fade. Verified wins compound.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
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
