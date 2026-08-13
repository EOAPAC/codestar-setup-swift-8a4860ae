import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import markAsset from "@/assets/ea-mark.png.asset.json";

export const Route = createFileRoute("/winner-product-concepts")({
  head: () => ({
    meta: [
      { title: "Winner Product Concepts | Internal comparison" },
      {
        name: "description",
        content:
          "Internal working comparison of two possible post-win products for the Entrepreneur Awards.",
      },
      { property: "og:title", content: "Winner Product Concepts | Internal comparison" },
      {
        property: "og:description",
        content:
          "Internal working comparison of two possible post-win products for the Entrepreneur Awards.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: WinnerProductConceptsPage,
});

type View = "both" | "a" | "b";

const included = [
  "Award statement",
  "Digital winner certificate",
  "Winner seal",
  "LinkedIn banner",
  "Square social post",
  "Story graphic",
  "Email signature",
];

const decisionRows: { label: string; hint?: string; a: string; b: string }[] = [
  {
    label: "Primary buyer desire",
    a: "To display and keep the recognition",
    b: "To preserve and publish the business behind the recognition",
  },
  {
    label: "Main deliverable",
    a: "A physical presentation piece",
    b: "A reviewed permanent feature plus physical edition",
  },
  {
    label: "What the winner can inspect before buying",
    hint: "What we must be able to show a winner before they pay.",
    a: "A photograph or exact prototype",
    b: "A feature specimen and physical prototype",
  },
  {
    label: "Reliance on winner response",
    a: "Low",
    b: "Moderate, unless the workflow is fully bounded",
  },
  { label: "Per-sale editorial workload", a: "Low", b: "High unless templated" },
  { label: "Physical fulfilment workload", a: "Moderate", b: "Moderate" },
  { label: "Scalability", a: "Higher", b: "Limited by editorial capacity" },
  { label: "Need for a permanent winner page", a: "No", b: "Yes" },
  {
    label: "Main commercial risk",
    a: "The product may not feel sufficient at the intended price",
    b: "The value may be difficult to assess without a specimen",
  },
  {
    label: "Main operational risk",
    a: "Physical fulfilment quality and cost",
    b: "Writing, review and publishing workload",
  },
  {
    label: "Best fit if capacity is limited",
    hint: "Which concept we could run today with the team we have.",
    a: "Yes",
    b: "Only with a tightly defined template",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">
      {children}
    </p>
  );
}

function InternalTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
      <Lock className="h-3 w-3" aria-hidden="true" />
      {children}
    </span>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 text-sm text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SubCard({
  heading,
  body,
  bullets,
}: {
  heading: string;
  body?: string;
  bullets?: string[];
}) {
  return (
    <div className="rounded-lg border border-border bg-background p-5">
      <h4 className="text-sm font-semibold text-foreground">{heading}</h4>
      {body ? <p className="mt-2 text-sm text-muted-foreground">{body}</p> : null}
      {bullets ? (
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2.5">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function Placeholder({ className }: { className?: string }) {
  return <div className={cn("rounded bg-muted-foreground/15", className)} />;
}

function CommemorativeVisual() {
  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 flex h-40 items-end justify-center rounded-md border border-border bg-background p-4">
          <div className="flex w-32 flex-col items-center gap-1">
            <Placeholder className="h-16 w-20" />
            <Placeholder className="h-3 w-24" />
          </div>
        </div>
        <div className="space-y-2 rounded-md border border-border bg-background p-4">
          <Placeholder className="h-2.5 w-2/3" />
          <Placeholder className="h-2 w-full" />
          <Placeholder className="h-2 w-5/6" />
          <Placeholder className="h-2 w-1/2" />
        </div>
        <div className="space-y-2 rounded-md border border-border bg-background p-4">
          <Placeholder className="h-2.5 w-1/2" />
          <Placeholder className="h-2 w-full" />
          <Placeholder className="h-2 w-3/4" />
        </div>
        <div className="col-span-2 space-y-2 rounded-md border border-border bg-background p-4">
          <Placeholder className="h-2.5 w-1/3" />
          <Placeholder className="h-2 w-2/3" />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-muted-foreground sm:grid-cols-4">
        <span>Engraved recognition object</span>
        <span>Printed winner certificate</span>
        <span>Award statement card</span>
        <span>Presentation card</span>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Physical Commemorative Edition — concept visual
      </p>
    </div>
  );
}

function FeatureVisual() {
  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <div className="rounded-md border border-border bg-background">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <span className="text-xs font-semibold tracking-tight text-foreground">
            Entrepreneur Awards
          </span>
          <Placeholder className="h-2 w-16" />
        </div>
        <div className="space-y-4 px-5 py-6">
          <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
            [Business Name]
          </p>
          <p className="text-lg font-semibold tracking-tight text-foreground">
            [Feature headline]
          </p>
          <div className="space-y-2">
            <Placeholder className="h-2 w-full" />
            <Placeholder className="h-2 w-11/12" />
            <Placeholder className="h-2 w-full" />
            <Placeholder className="h-2 w-4/5" />
            <Placeholder className="h-2 w-10/12" />
            <Placeholder className="h-2 w-2/3" />
          </div>
          <div className="border-t border-border pt-3 text-xs text-muted-foreground">
            entrepreneurawards.co/winners/[name]
          </div>
        </div>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">Winner&rsquo;s Feature — format concept</p>
      <p className="mt-1 text-xs font-medium text-foreground">
        Format concept — not a real winner feature
      </p>
    </div>
  );
}

function ConceptCard({
  eyebrow,
  heading,
  subheading,
  body,
  visual,
  receives,
  motivation,
  operational,
  watchouts,
  price,
  cta,
}: {
  eyebrow: string;
  heading: string;
  subheading: string;
  body: string;
  visual: React.ReactNode;
  receives: string[];
  motivation: string;
  operational: string[];
  watchouts: string[];
  price: string;
  cta: string;
}) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-border bg-card p-6 md:p-8">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight">{heading}</h3>
      <p className="mt-1 text-sm font-medium text-foreground">{subheading}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>

      <div className="mt-6">{visual}</div>

      <h4 className="mt-8 text-sm font-semibold">Winner receives</h4>
      <div className="mt-3">
        <CheckList items={receives} />
      </div>

      <div className="mt-6 space-y-4">
        <SubCard heading="Why a winner may want it" body={motivation} />
        <SubCard heading="Operational shape" bullets={operational} />
        <SubCard heading="What must be proven" bullets={watchouts} />
      </div>

      <div className="mt-auto pt-8">
        <p className="text-sm text-muted-foreground">{price}</p>
        <Button
          type="button"
          disabled
          aria-disabled="true"
          className="mt-3 w-full cursor-not-allowed"
        >
          {cta}
        </Button>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="h-3 w-3" aria-hidden="true" />
          Internal concept only — not connected to checkout
        </p>
      </div>
    </article>
  );
}

function WinnerProductConceptsPage() {
  const [view, setView] = useState<View>("both");

  const views: { id: View; label: string }[] = [
    { id: "both", label: "Side by side" },
    { id: "a", label: "Commemorative Edition" },
    { id: "b", label: "Winner's Feature" },
  ];

  return (
    <TooltipProvider delayDuration={150}>
      <div className="min-h-screen bg-background font-sans text-foreground antialiased">
        <header className="border-b border-border bg-background">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold tracking-tight">
              <img
                src={markAsset.url}
                alt="Entrepreneur Awards mark"
                className="h-7 w-7 shrink-0 object-contain"
              />
              Entrepreneur Awards
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-muted-foreground">Winner Product Concepts</span>
              <InternalTag>Internal — not for public use</InternalTag>
              <InternalTag>Internal concept page — not public</InternalTag>
            </div>
          </div>
        </header>

        <main>
          {/* Hero */}
          <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <Eyebrow>Post-win product decision</Eyebrow>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
              Two ways to preserve an Entrepreneur Award recognition.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Both concepts sit after selection. The winner&rsquo;s award, award statement, certificate and
              shareable materials remain included and permanent in either case. This page compares
              the optional product we may offer after a winner is notified.
            </p>
            <p className="mt-6 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              This page is a working comparison, not a public offer.
            </p>
          </section>

          {/* Shared entitlement */}
          <section className="border-y border-border bg-surface">
            <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
              <Eyebrow>Included with selection</Eyebrow>
              <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight md:text-3xl">
                Every selected entrant receives these materials permanently.
              </h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {included.map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-border bg-background p-4"
                  >
                    <div className="flex h-20 items-center justify-center rounded border border-border bg-secondary/60">
                      <Placeholder className="h-8 w-8 rounded-full" />
                    </div>
                    <p className="mt-3 text-sm font-medium">{item}</p>
                  </div>
                ))}
              </div>

              <p className="mt-8 border-l-2 border-primary pl-4 text-sm text-muted-foreground">
                The optional product below does not affect these materials or the award itself.
              </p>
            </div>
          </section>

          {/* Comparison */}
          <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  The two concepts
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  Both concepts can be offered as the single optional product after selection. The
                  question is which one gives winners a clearer reason to buy while remaining
                  sustainable to deliver.
                </p>
              </div>

              <div
                role="group"
                aria-label="Comparison view"
                className="inline-flex shrink-0 flex-wrap gap-1 rounded-lg border border-border bg-secondary p-1"
              >
                {views.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setView(v.id)}
                    aria-pressed={view === v.id}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm transition-colors",
                      view === v.id
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            <div
              className={cn(
                "mt-10 grid gap-6",
                view === "both" ? "lg:grid-cols-2" : "lg:grid-cols-1",
              )}
            >
              {view !== "b" ? (
                <ConceptCard
                  eyebrow="Concept A"
                  heading="The Commemorative Edition"
                  subheading="A physical presentation of the recognition."
                  body="A designed physical edition that gives the winner a lasting object for their office, home or team space. It preserves the award in a form that can be displayed and kept."
                  visual={<CommemorativeVisual />}
                  receives={[
                    "An engraved recognition object with winner name and award year",
                    "A printed presentation edition of the winner certificate",
                    "A printed award statement card",
                    "A presentation card carrying the winner's recognition details",
                  ]}
                  motivation="A tangible, displayable record of a recognition they have already earned."
                  operational={[
                    "Standardised physical fulfilment",
                    "No custom long-form editorial production",
                    "Clear production scope",
                    "Easier to scale than bespoke writing",
                  ]}
                  watchouts={[
                    "The exact physical object must be photographed before sale",
                    "The product must feel substantial enough to support its price",
                    "Fulfilment costs and delivery operations must be understood",
                  ]}
                  price="Potential one-time price: [To be decided]"
                  cta="Explore Commemorative Edition"
                />
              ) : null}

              {view !== "a" ? (
                <ConceptCard
                  eyebrow="Concept B"
                  heading="The Winner's Feature"
                  subheading="A permanent feature about the business behind the recognition."
                  body="A reviewed written feature prepared from the winner's entry and award statement, published at a permanent Entrepreneur Awards URL and supported by a physical commemorative edition."
                  visual={<FeatureVisual />}
                  receives={[
                    "A full written feature about their business",
                    "Review before publication",
                    "Publication at a permanent Entrepreneur Awards URL",
                    "An engraved recognition object with winner name and award year",
                    "A printed edition of the feature",
                    "A printed presentation edition of the winner certificate",
                    "A card carrying the permanent URL",
                  ]}
                  motivation="A lasting published record that explains the business behind the recognition, alongside a physical commemorative edition."
                  operational={[
                    "Requires research, drafting, review and publication per purchase",
                    "Can be prepared from the entry and award statement using a defined template",
                    "Needs a clear review process",
                    "Editorial workload grows with every sale",
                  ]}
                  watchouts={[
                    "A genuine feature specimen must exist before sale",
                    "The feature scope must be fixed and repeatable",
                    "Publishing must not depend on a winner completing a questionnaire",
                    "The page-per-winner model must remain manageable at higher volumes",
                  ]}
                  price="Current proposed one-time price: $595"
                  cta="Explore Winner's Feature"
                />
              ) : null}
            </div>
          </section>

          {/* Decision table */}
          <section className="border-y border-border bg-surface">
            <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Decision lens</h2>

              <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-background">
                <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th scope="col" className="w-1/4 px-5 py-4 font-semibold">
                        Decision lens
                      </th>
                      <th scope="col" className="px-5 py-4 font-semibold">
                        Commemorative Edition
                      </th>
                      <th scope="col" className="px-5 py-4 font-semibold">
                        Winner&rsquo;s Feature
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {decisionRows.map((row) => (
                      <tr key={row.label} className="border-b border-border last:border-0">
                        <th
                          scope="row"
                          className="px-5 py-4 align-top font-medium text-foreground"
                        >
                          <span className="inline-flex items-start gap-1.5">
                            {row.label}
                            {row.hint ? (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    aria-label={`More about ${row.label}`}
                                    className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border border-border text-[10px] text-muted-foreground"
                                  >
                                    ?
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">{row.hint}</TooltipContent>
                              </Tooltip>
                            ) : null}
                          </span>
                        </th>
                        <td className="px-5 py-4 align-top text-muted-foreground">{row.a}</td>
                        <td className="px-5 py-4 align-top text-muted-foreground">{row.b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Recommendation */}
          <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="rounded-xl border border-border bg-card p-6 md:p-10">
              <Eyebrow>Working recommendation</Eyebrow>
              <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight md:text-3xl">
                Start with the product you can show and fulfil consistently.
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                The Commemorative Edition is operationally simpler and easier to standardise. The
                Winner&rsquo;s Feature can create a stronger permanent record, but only when its
                format, review process and workload are tightly controlled.
              </p>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border border-border border-l-2 border-l-primary bg-background p-6">
                  <h3 className="text-sm font-semibold">Choose the Commemorative Edition if:</h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {[
                      "You need a lower-touch post-win product",
                      "You can produce a real physical prototype first",
                      "You want to avoid writing capacity becoming the bottleneck",
                      "You do not want to maintain a page for every winner",
                    ].map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg border border-border border-l-2 border-l-primary bg-background p-6">
                  <h3 className="text-sm font-semibold">Choose the Winner&rsquo;s Feature if:</h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {[
                      "You can build an honest format specimen",
                      "You can deliver from entry material without needing a questionnaire",
                      "You can set a firm editorial template and one factual review round",
                      "You are willing to manage permanent winner pages at the expected volume",
                    ].map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-8 flex items-start gap-1.5 text-sm text-muted-foreground">
                <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Do not launch both. Select one offer, prove it with the first completed winner
                cycle, then revisit.
              </p>
            </div>
          </section>
        </main>

        <footer className="border-t border-border py-10">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-xs text-muted-foreground">
            <p>Entrepreneur Awards. Internal working document.</p>
            <InternalTag>Internal — not for public use</InternalTag>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}
