import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground">
            E
          </span>
          The Entrepreneur Awards
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="/#tiers" className="hover:text-foreground">Awards</a>
          <Link to="/methodology" className="hover:text-foreground" activeProps={{ className: "text-foreground" }}>
            Methodology
          </Link>
          <Link to="/winners" className="hover:text-foreground" activeProps={{ className: "text-foreground" }}>
            Past Winners
          </Link>
          <Link to="/faq" className="hover:text-foreground" activeProps={{ className: "text-foreground" }}>
            FAQ
          </Link>
          <a href="/#contact" className="hover:text-foreground">Contact</a>
        </nav>
        <Button asChild size="sm">
          <a href="/#submit">Enter the 2026 Awards</a>
        </Button>
      </div>
    </header>
  );
}
