import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-muted-foreground md:flex-row">
        <p>Entrepreneur Awards. All rights reserved.</p>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link to="/winners" className="hover:text-foreground">Winners</Link>
          <Link to="/criteria" className="hover:text-foreground">Criteria</Link>
          <Link to="/insights" className="hover:text-foreground">Insights</Link>
          <Link to="/faq" className="hover:text-foreground">FAQ</Link>
          <Link to="/terms-and-conditions" className="hover:text-foreground">Terms and Conditions</Link>
          <a href="/#submit" className="hover:text-foreground">Enter</a>
          <a href="/#contact" className="hover:text-foreground">Contact</a>
        </nav>
        <p>For the person who built it.</p>
      </div>
    </footer>
  );
}
