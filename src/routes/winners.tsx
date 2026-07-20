import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Search, ArrowRight, Crown } from "lucide-react";

export const Route = createFileRoute("/winners")({
  head: () => ({
    meta: [
      { title: "2026 Winners | The Entrepreneur Awards" },
      { name: "description", content: "Meet the 2026 Entrepreneur Awards winners. Founders and companies recognized for vision, traction, resilience, and influence." },
      { property: "og:title", content: "2026 Winners | The Entrepreneur Awards" },
      { property: "og:description", content: "Meet the 2026 Entrepreneur Awards winners. Founders and companies recognized for vision, traction, resilience, and influence." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WinnersPage,
});

interface Winner {
  id: string;
  name: string;
  role: string;
  company: string;
  award: string;
  category: string;
  initials: string;
  color: string;
}

const winners: Winner[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Co-Founder & CEO",
    company: "Aether Biotech",
    award: "Health & Wellness Innovator",
    category: "Health",
    initials: "SC",
    color: "from-sky-400 to-blue-600",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    role: "Founder",
    company: "CarbonLoop",
    award: "Climate Tech Pioneer",
    category: "Climate",
    initials: "MJ",
    color: "from-emerald-400 to-teal-600",
  },
  {
    id: "3",
    name: "Priya Nair",
    role: "CEO",
    company: "Finova Labs",
    award: "Fintech Disruptor",
    category: "Fintech",
    initials: "PN",
    color: "from-violet-400 to-purple-600",
  },
  {
    id: "4",
    name: "David Okafor",
    role: "Co-Founder",
    company: "GridLink",
    award: "B2B Breakthrough",
    category: "B2B",
    initials: "DO",
    color: "from-amber-400 to-orange-600",
  },
  {
    id: "5",
    name: "Elena Rossi",
    role: "Founder & CEO",
    company: "Lumen Ed",
    award: "Education Impact Award",
    category: "Education",
    initials: "ER",
    color: "from-rose-400 to-pink-600",
  },
  {
    id: "6",
    name: "James Park",
    role: "Founder",
    company: "Nexus Commerce",
    award: "E-commerce Scale-Up",
    category: "E-commerce",
    initials: "JP",
    color: "from-cyan-400 to-blue-600",
  },
  {
    id: "7",
    name: "Amara Singh",
    role: "Co-Founder",
    company: "OrbitAI",
    award: "AI & Automation Leader",
    category: "AI",
    initials: "AS",
    color: "from-indigo-400 to-blue-700",
  },
  {
    id: "8",
    name: "Liam O'Connor",
    role: "CEO",
    company: "SprintLogistics",
    award: "Operational Excellence",
    category: "Operations",
    initials: "LO",
    color: "from-lime-400 to-green-600",
  },
];

const categories = ["All", "Health", "Climate", "Fintech", "B2B", "Education", "E-commerce", "AI", "Operations"];

function WinnerAvatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div
      className={`grid h-20 w-20 shrink-0 place-items-center rounded-full bg-gradient-to-br ${color} text-lg font-bold text-white shadow-sm md:h-24 md:w-24 md:text-xl`}
    >
      {initials}
    </div>
  );
}

function WinnerCard({ winner }: { winner: Winner }) {
  return (
    <Card className="group flex flex-col gap-5 p-6 transition-shadow hover:shadow-md">
      <div className="flex items-start gap-4">
        <WinnerAvatar initials={winner.initials} color={winner.color} />
        <div className="min-w-0 flex-1 pt-1">
          <div className="flex items-start gap-2">
            <h3 className="text-lg font-semibold leading-tight tracking-tight text-foreground">{winner.name}</h3>
            <Crown className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          </div>
          <p className="text-sm text-muted-foreground">{winner.role}</p>
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-foreground">{winner.company}</p>
          <Badge variant="secondary" className="mt-2 font-normal">
            <Award className="mr-1 h-3 w-3" aria-hidden="true" />
            {winner.award}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="-mx-2 h-auto justify-start p-2 text-primary hover:bg-primary/5 hover:text-primary"
          asChild
        >
          <a href={`/winners/${winner.id}`}>
            View profile
            <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </Card>
  );
}

function WinnersPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return winners.filter((w) => {
      const matchesCategory = activeCategory === "All" || w.category === activeCategory;
      const matchesQuery =
        !q ||
        w.name.toLowerCase().includes(q) ||
        w.company.toLowerCase().includes(q) ||
        w.award.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />

      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-b from-primary/5 to-transparent px-6 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4 font-medium">
                <Award className="mr-1.5 h-3.5 w-3.5 text-primary" aria-hidden="true" />
                2026 Honorees
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                2026 Winners
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Founders who moved markets, built teams, and turned ideas into outcomes.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-8 md:py-12">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <Input
                  type="text"
                  placeholder="Search winners, companies, or awards..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-9"
                  aria-label="Search winners"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    size="sm"
                    variant={activeCategory === cat ? "default" : "outline"}
                    onClick={() => setActiveCategory(cat)}
                    className="text-xs"
                    aria-pressed={activeCategory === cat}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            {filtered.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((winner) => (
                  <WinnerCard key={winner.id} winner={winner} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border bg-muted/30 py-16 text-center">
                <p className="text-muted-foreground">No winners match your search.</p>
                <Button
                  variant="link"
                  className="mt-2 text-primary"
                  onClick={() => {
                    setQuery("");
                    setActiveCategory("All");
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
