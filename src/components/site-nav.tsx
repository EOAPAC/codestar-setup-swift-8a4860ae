import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import markAsset from "@/assets/ea-mark.png.asset.json";
import { AWARD_YEAR } from "@/content/award";

type SiteNavProps = {
  hideCTA?: boolean;
  mobileMenu?: boolean;
  compactCta?: { href: string; label: string; className?: string };
  containerClassName?: string;
};

const navLinks = [
  { label: "Winners", to: "/winners" },
  { label: "Criteria", to: "/criteria" },
  { label: "FAQ", to: "/faq" },
] as const;

export function SiteNav({ hideCTA = false, mobileMenu = false, compactCta, containerClassName = "max-w-6xl" }: SiteNavProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className={`mx-auto flex h-16 items-center justify-between px-6 ${containerClassName}`}>
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <img
            src={markAsset.url}
            alt="Entrepreneur Awards mark"
            className="h-7 w-7 shrink-0 object-contain"
          />
          Entrepreneur Awards
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          <nav className="flex items-center gap-5 text-sm text-muted-foreground lg:gap-8">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="hover:text-foreground" activeProps={{ className: "text-foreground" }}>
                {link.label}
              </Link>
            ))}
            <a href="/#contact" className="hover:text-foreground">Contact</a>
          </nav>
          {compactCta ? (
            <Button asChild size="sm" className={compactCta.className}>
              <a href={compactCta.href} target="_blank" rel="noopener noreferrer">{compactCta.label}</a>
            </Button>
          ) : !hideCTA ? (
            <Button asChild size="sm">
              <a href="/#submit">Enter the {AWARD_YEAR} Awards</a>
            </Button>
          ) : null}
        </div>

        {mobileMenu ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="min-h-11 min-w-11 md:hidden" aria-label="Open navigation menu">
                <Menu aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(86vw,22rem)]">
              <SheetHeader>
                <SheetTitle>Entrepreneur Awards</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.to}>
                    <Link to={link.to} className="flex min-h-12 items-center border-b border-border text-base font-medium">
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <a href="/#contact" className="flex min-h-12 items-center border-b border-border text-base font-medium">Contact</a>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        ) : !hideCTA ? (
          <Button asChild size="sm">
            <a href="/#submit">Enter the {AWARD_YEAR} Awards</a>
          </Button>
        ) : null}
      </div>
    </header>
  );
}
