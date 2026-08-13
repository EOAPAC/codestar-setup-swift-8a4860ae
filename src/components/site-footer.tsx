import { Link } from "@tanstack/react-router";
import { AWARD_YEAR } from "@/content/award";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-xs text-muted-foreground">
        <p className="text-center">
          Every {AWARD_YEAR} entry is read against the same three published criteria.
        </p>



        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link to="/winners" className="hover:text-foreground">Winners</Link>
          <Link to="/criteria" className="hover:text-foreground">Criteria</Link>
          <Link to="/insights" className="hover:text-foreground">Insights</Link>
          <Link to="/faq" className="hover:text-foreground">FAQ</Link>
          <Link to="/terms-and-conditions" className="hover:text-foreground">Terms and Conditions</Link>
          <a href="/refunds" className="hover:text-foreground">Refunds</a>
          <a href="/#submit" className="hover:text-foreground">Enter</a>
          <a href="/#contact" className="hover:text-foreground">Contact</a>
        </nav>

        {/* Legal footprint. Fill these three lines in. */}
        <div className="space-y-1 text-center">
          <p>{/* Registered company name */}</p>
          <p>{/* Registered address */}</p>
          <p>{/* Company number */}</p>
        </div>

        <div className="flex flex-col items-center gap-1 text-center md:flex-row md:justify-between md:gap-6">
          <p>Entrepreneur Awards. All rights reserved.</p>
          <p>For the person who built it.</p>
        </div>
      </div>
    </footer>
  );
}
