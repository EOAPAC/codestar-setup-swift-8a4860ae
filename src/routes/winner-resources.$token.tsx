import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import {
  Award,
  Download,
  Link as LinkIcon,
  Check,
  Shield,
  Search,
  ArrowRight,
  Sparkles,
  Image,
  Square,
  Newspaper,
  FileBadge,
} from "lucide-react";

export const Route = createFileRoute("/winner-resources/$token")({
  head: () => ({
    meta: [
      { title: "Your Winner Resources | The Entrepreneur Awards" },
      { name: "description", content: "Download your 2026 Entrepreneur Award winner assets and make your win official with a verified, published profile." },
      { property: "og:title", content: "Your Winner Resources | The Entrepreneur Awards" },
      { property: "og:description", content: "Download your 2026 Entrepreneur Award winner assets and make your win official with a verified, published profile." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WinnerResourcesPage,
});

function generatePlaceholderDownload(filename: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#1978E5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, sans-serif" font-size="48" font-weight="600" fill="white">${filename}</text></svg>`;
  const blob = new Blob([svg], { type: "image/svg+xml" });
  return URL.createObjectURL(blob);
}

const assets = [
  {
    title: "Winner badge & seal",
    description: "Official badge and seal for your website, email signature, and press kit.",
    icon: FileBadge,
    filename: "EA-Winner-Badge-Seal.svg",
  },
  {
    title: "Square social graphic",
    description: "Instagram, LinkedIn, and X post template designed with space to add your photo.",
    icon: Square,
    filename: "EA-Square-Social-Graphic.svg",
  },
  {
    title: "Story / vertical graphic",
    description: "Stories and Reels format for sharing your win across mobile-first platforms.",
    icon: Image,
    filename: "EA-Story-Vertical-Graphic.svg",
  },
  {
    title: "LinkedIn / website banner",
    description: "Cover image for LinkedIn and website headers, sized for professional profiles.",
    icon: Newspaper,
    filename: "EA-LinkedIn-Website-Banner.svg",
  },
];

const upgradePoints = [
  {
    icon: LinkIcon,
    text: "A verified, published profile at a permanent link.",
  },
  {
    icon: Shield,
    text: "Something others can check, not just a claim you make.",
  },
  {
    icon: Search,
    text: "Recognition that surfaces when someone searches you.",
  },
];

function WinnerResourcesPage() {
  const handleDownload = (filename: string) => {
    const url = generatePlaceholderDownload(filename);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteNav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/15),transparent_70%)]"
          />
          <div className="relative mx-auto max-w-3xl px-6 pt-24 pb-16 text-center md:pt-32 md:pb-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
              <Award className="h-3.5 w-3.5 text-primary" />
              2026 Winner Resources
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
              Your Winner Resources
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Congratulations on your 2026 Entrepreneur Award. Everything you need to share your win is below.
            </p>
          </div>
        </section>

        {/* Download assets */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">Download your assets</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Share your win with confidence.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Each asset is designed with space to add your own name or photo. Download all four, or just the ones you need.
              </p>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {assets.map((asset) => {
                const Icon = asset.icon;
                return (
                  <Card key={asset.title} className="group flex flex-col overflow-hidden border-border transition-colors hover:border-primary/40">
                    {/* Placeholder thumbnail */}
                    <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                      <div className="flex flex-col items-center gap-3 text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <Icon className="h-7 w-7" />
                        </div>
                        <span className="max-w-[80%] text-xs font-medium text-muted-foreground">
                          {asset.title} preview
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-base font-semibold tracking-tight">{asset.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {asset.description}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-5 w-full"
                        onClick={() => handleDownload(asset.filename)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Upgrade guide */}
        <section className="border-t border-border bg-secondary/30 py-24 md:py-32">
          <div className="mx-auto max-w-4xl px-6">
            <Card className="relative overflow-hidden border-primary/10 p-8 md:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/10),transparent_70%)]"
              />
              <div className="relative">
                <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-2xl">
                    <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                      <Sparkles className="h-3.5 w-3.5" />
                      Make it official
                    </span>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                      Make your win official
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                      The assets above are yours to share. The final step is to make your recognition verifiable, published at a permanent link that prospects, investors, and press can find and confirm for themselves, so your win stands as independent proof rather than your own claim.
                    </p>
                    <ul className="mt-8 space-y-4">
                      {upgradePoints.map((point) => {
                        const Icon = point.icon;
                        return (
                          <li key={point.text} className="flex items-start gap-3">
                            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <Icon className="h-3.5 w-3.5" />
                            </div>
                            <span className="text-sm text-foreground/85">{point.text}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="flex flex-col items-start gap-4 md:w-64 md:pt-12">
                    <Button asChild size="lg" className="w-full">
                      <a href="/pricing" target="_blank" rel="noopener noreferrer">
                        Make my win official <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Takes under two minutes. Your published profile goes live once confirmed.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
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
