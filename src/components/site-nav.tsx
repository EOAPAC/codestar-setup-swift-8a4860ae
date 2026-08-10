import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import markAsset from "@/assets/ea-mark.png.asset.json";
import { AWARD_YEAR } from "@/content/award";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <img
            src={markAsset.url}
            alt="Entrepreneur Awards mark"
            className="h-7 w-7 shrink-0 object-contain"
          />
          Entrepreneur Awards
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <Link to="/winners" className="hover:text-foreground" activeProps={{ className: "text-foreground" }}>
            Winners
          </Link>
          <Link to="/criteria" className="hover:text-foreground" activeProps={{ className: "text-foreground" }}>
            Criteria
          </Link>
          <Link to="/insights" className="hover:text-foreground" activeProps={{ className: "text-foreground" }}>
            Insights
          </Link>
          <Link to="/faq" className="hover:text-foreground" activeProps={{ className: "text-foreground" }}>
            FAQ
          </Link>
          <a href="/#contact" className="hover:text-foreground">Contact</a>
        </nav>
        <Button asChild size="sm">
          <a href="/#submit">Enter the {AWARD_YEAR} Awards</a>
        </Button>
      </div>
    </header>
  );
}
