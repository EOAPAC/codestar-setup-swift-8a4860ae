import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Check, Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import markAsset from "@/assets/ea-mark.png.asset.json";
import sealAsset from "@/assets/EA_Winner_Seal.png.asset.json";
import bannerAsset from "@/assets/EA_Linkedin_Banner.png.asset.json";
import squareAsset from "@/assets/EA_Square_Social_Image.png.asset.json";
import storyAsset from "@/assets/EA_Portrait_Winner_Image.png.asset.json";
import emailSigAsset from "@/assets/ea-winner-emailsig-full-600x200.png.asset.json";

export const Route = createFileRoute("/winner-options")({
  head: () => ({
    meta: [
      { title: "Your Winner Materials | Entrepreneur Awards" },
      {
        name: "description",
        content:
          "Your citation, certificate and winner materials, plus two optional ways to preserve your Entrepreneur Award recognition.",
      },
      { property: "og:title", content: "Your Winner Materials | Entrepreneur Awards" },
      {
        property: "og:description",
        content:
          "Your citation, certificate and winner materials, plus two optional ways to preserve your Entrepreneur Award recognition.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WinnerOptionsPage,
});

// ---------------------------------------------------------------- data

type Material = {
  id: string;
  title: string;
  fileType: string;
  image?: string;
};

const materials: Material[] = [
  { id: "citation", title: "Citation", fileType: "PDF" },
  { id: "certificate", title: "Digital winner certificate", fileType: "PDF" },
  { id: "seal", title: "Winner seal", fileType: "PNG", image: sealAsset.url },
  { id: "banner", title: "LinkedIn banner", fileType: "PNG", image: bannerAsset.url },
  { id: "square", title: "Square social post", fileType: "PNG", image: squareAsset.url },
  { id: "story", title: "Story graphic", fileType: "PNG", image: storyAsset.url },
  { id: "signature", title: "Email signature", fileType: "PNG", image: emailSigAsset.url },
];

const commemorativeIncludes = [
  "Engraved recognition object with your name and award year",
  "Printed presentation edition of your winner certificate",
  "Printed citation card",
  "Presentation card carrying your recognition details",
];

const commemorativeIncludesDetailed = [
  "Engraved recognition object personalised with your name and award year",
  "Printed presentation edition of your winner certificate",
  "Printed citation card",
  "Presentation card carrying your recognition details",
];

const featureIncludes = [
  "A full written feature about your business",
  "Review before publication",
  "Publication at a permanent Entrepreneur Awards URL",
  "Engraved recognition object with your name and award year",
  "Printed edition of your feature",
  "Printed presentation edition of your winner certificate",
  "Card carrying the permanent URL",
];

const processSteps = [
  { number: "01", title: "Order", body: "Choose the Winner's Feature." },
  {
    number: "02",
    title: "Review",
    body: "We prepare the feature from your entry and citation, then send it for your review and factual corrections.",
  },
  {
    number: "03",
    title: "Publish and present",
    body: "After approval, the feature is published at its permanent URL and your commemorative edition is prepared.",
  },
];

const faqs = [
  {
    q: "Do I need to choose an edition to keep my Entrepreneur Award?",
    a: "No. Your selection, citation, certificate, seal and winner graphics are included with your award and remain yours permanently.",
  },
  {
    q: "What is the difference between the Commemorative Edition and the Winner's Feature?",
    a: "The Commemorative Edition is a physical presentation of your recognition. The Winner's Feature adds a reviewed, permanent feature about the business behind your recognition, alongside its physical commemorative edition.",
  },
  {
    q: "What is the difference between the citation and the feature?",
    a: "The citation is the formal statement explaining why your entry was selected. The feature is a fuller, optional piece about the business behind that recognition.",
  },
  {
    q: "Will I review the feature before it is published?",
    a: "Yes. The feature is sent to you for review and factual corrections before publication.",
  },
  {
    q: "Where will the feature appear?",
    a: "It will be published at a permanent Entrepreneur Awards URL in the format entrepreneurawards.co/winners/[name].",
  },
  {
    q: "Does selecting an edition change my award?",
    a: "No. Each edition is separate from the award itself. Your Entrepreneur Award remains exactly the same whether you select an edition or not.",
  },
];

// ------------------------------------------------------------ utilities

function scrollToId(id: string) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">{children}</p>
  );
}

function Bar({ className }: { className?: string }) {
  return <div className={`rounded bg-muted ${className ?? ""}`} />;
}

/** Restrained abstract recognition mark. No medal or celebration imagery. */
function RecognitionMark() {
  return (
    <span
      aria-hidden="true"
      className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/5"
    >
      <span className="grid h-7 w-7 place-items-center rounded-full border border-primary/50">
        <span className="h-2 w-2 rounded-full bg-primary" />
      </span>
    </span>
  );
}

/** Abstract composition standing in for the physical edition. */
function CommemorativeVisual({ label, large = false }: { label: string; large?: boolean }) {
  return (
    <figure>
      <div
        role="img"
        aria-label="Neutral placeholder representing the Commemorative Edition contents"
        className={`rounded-lg border border-border bg-secondary/40 ${large ? "p-8" : "p-6"}`}
      >
        <div className={`flex items-end justify-center gap-4 ${large ? "h-56" : "h-40"}`}>
          {/* engraved recognition object */}
          <div className="flex h-full flex-col items-center justify-end gap-1.5">
            <div className="w-16 flex-1 rounded-t-sm border border-border bg-background" />
            <div className="h-2 w-20 rounded-sm bg-muted" />
          </div>
          {/* printed certificate */}
          <div className="flex h-[85%] w-24 flex-col gap-2 rounded-sm border border-border bg-background p-3">
            <Bar className="h-1.5 w-2/3" />
            <Bar className="h-1 w-full" />
            <Bar className="h-1 w-5/6" />
            <Bar className="mt-auto h-1 w-1/2" />
          </div>
          {/* citation card */}
          <div className="flex h-[55%] w-20 flex-col gap-2 rounded-sm border border-border bg-background p-3">
            <Bar className="h-1.5 w-1/2" />
            <Bar className="h-1 w-full" />
            <Bar className="h-1 w-3/4" />
          </div>
          {/* presentation card */}
          <div className="flex h-[38%] w-20 flex-col gap-2 rounded-sm border border-border bg-background p-3">
            <Bar className="h-1 w-2/3" />
            <Bar className="h-1 w-1/2" />
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-muted-foreground">{label}</figcaption>
    </figure>
  );
}

/** Neutral, non-representational preview of the published feature layout. */
function FeatureSpecimen({ large = false, caption }: { large?: boolean; caption?: string }) {
  return (
    <figure>
      <div
        role="img"
        aria-label="Neutral placeholder showing the layout of a published feature page"
        className="overflow-hidden rounded-lg border border-border bg-card"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <span className="text-xs font-semibold tracking-tight">Entrepreneur Awards</span>
          <span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            Winner&rsquo;s Feature
          </span>
        </div>
        <div className={`space-y-5 px-6 ${large ? "py-8" : "py-6"}`}>
          <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
            [Business Name]
          </p>
          <p
            className={`font-semibold tracking-tight text-foreground ${large ? "text-2xl" : "text-lg"}`}
          >
            [Feature headline]
          </p>
          <div className="aspect-[16/9] w-full rounded bg-muted/70" />
          <div className="space-y-2">
            {["w-full", "w-11/12", "w-full", "w-10/12", "w-full", large ? "w-9/12" : ""]
              .filter(Boolean)
              .map((w, i) => (
                <Bar key={i} className={`h-2.5 ${w}`} />
              ))}
          </div>
          <p className="border-t border-border pt-4 text-xs text-muted-foreground">
            entrepreneurawards.co/winners/[name]
          </p>
        </div>
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm text-muted-foreground">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

function IncludedList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-sm text-muted-foreground md:text-base">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------- page

function WinnerOptionsPage() {
  useEffect(() => {
    // analytics-ready page view marker
    document.body.setAttribute("data-page-event", "winner-options-view");
    return () => document.body.removeAttribute("data-page-event");
  }, []);

  const handleDownload = () => toast("Your download will be available here.");
  const handleSelect = () => toast("This selection page will be connected shortly.");

  return (
    <div
      data-event="winner-options-view"
      className="min-h-screen bg-background font-sans text-foreground antialiased"
    >
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            <img
              src={markAsset.url}
              alt="Entrepreneur Awards mark"
              className="h-7 w-7 shrink-0 object-contain"
            />
            Entrepreneur Awards
          </Link>
          <span className="text-sm text-muted-foreground">Winner Materials</span>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <Eyebrow>Entrepreneur Awards</Eyebrow>
            <div className="mt-6 flex items-start gap-4">
              <RecognitionMark />
              <div>
                <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
                  Your selection is confirmed.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  Your citation, certificate and winner materials are ready to use. You may also
                  choose an optional way to preserve the recognition.
                </p>
              </div>
            </div>

            <div className="mt-10 max-w-md rounded-lg border border-border bg-secondary/40 p-5">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Winner</dt>
                  <dd className="font-medium">[Winner Name]</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Business</dt>
                  <dd className="font-medium">[Business Name]</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Status</dt>
                  <dd className="font-medium">Selected entrant</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Citation */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <Eyebrow>Your citation</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              The formal statement of your selection
            </h2>
            <Card className="mt-8 border-l-2 border-l-primary p-6 md:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Citation
              </p>
              <p className="mt-4 text-lg italic leading-relaxed text-foreground/90">
                [Your formal 40&ndash;70 word citation will appear here.]
              </p>
            </Card>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Your selection, citation, certificate and winner materials are included with your
              award and remain yours permanently.
            </p>
          </div>
        </section>

        {/* Included materials */}
        <section className="border-t border-border py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Your winner materials
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Included with your selection and ready to use.
            </p>

            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {materials.map((m) => (
                <li key={m.id}>
                  <Card className="flex h-full flex-col p-5 transition-colors hover:border-primary/40">
                    <div className="grid aspect-[16/9] w-full place-items-center overflow-hidden rounded-md bg-secondary/60">
                      {m.image ? (
                        <img
                          src={m.image}
                          alt={m.title}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-contain p-3"
                        />
                      ) : (
                        <div className="w-2/3 space-y-1.5 rounded-sm border border-border bg-background p-3">
                          <Bar className="h-1.5 w-1/2" />
                          <Bar className="h-1 w-full" />
                          <Bar className="h-1 w-4/5" />
                        </div>
                      )}
                    </div>
                    <h3 className="mt-4 text-base font-medium">{m.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{m.fileType}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4 w-full"
                      data-event="winner-asset-download"
                      data-asset={m.id}
                      onClick={handleDownload}
                    >
                      <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                      Download
                    </Button>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Transition */}
        <section className="border-y border-border bg-primary/5">
          <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
            <Eyebrow>Optional</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Two ways to keep the recognition close.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Your award and winner materials are complete as they are. If you would like a
              physical presentation of the recognition, or a permanent published feature about the
              business behind it, explore the two editions below.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Both are optional. Your selection remains unchanged.
            </p>
          </div>
        </section>

        {/* Comparison */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="max-w-3xl text-2xl font-semibold tracking-tight md:text-3xl">
              Choose how you would like to preserve the recognition
            </h2>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground">
              Each edition begins with the same Entrepreneur Award selection. The difference is how
              you choose to keep and present it.
            </p>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {/* Commemorative Edition */}
              <Card className="flex h-full flex-col p-6 md:p-8">
                <Eyebrow>Commemorative Edition</Eyebrow>
                <h3 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">
                  A physical presentation of your recognition.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  A considered physical edition designed to keep the Entrepreneur Award visible
                  long after the announcement.
                </p>

                <div className="mt-6">
                  <CommemorativeVisual label="Commemorative Edition" />
                </div>

                <h4 className="mt-8 text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Included
                </h4>
                <div className="mt-4">
                  <IncludedList items={commemorativeIncludes} />
                </div>

                <p className="mt-6 text-sm text-muted-foreground">
                  A tangible record of an award you have already earned.
                </p>

                <div className="mt-auto pt-8">
                  <p className="text-lg font-semibold tracking-tight">[Price to be confirmed]</p>
                  <Button
                    className="mt-4 w-full"
                    data-event="commemorative-explore"
                    onClick={() => scrollToId("commemorative-edition")}
                  >
                    Explore the Commemorative Edition
                  </Button>
                </div>
              </Card>

              {/* Winner's Feature */}
              <Card className="flex h-full flex-col p-6 md:p-8">
                <Eyebrow>The Winner&rsquo;s Feature</Eyebrow>
                <h3 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">
                  A permanent feature about the business behind your recognition.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  A reviewed feature prepared from your entry and citation, published at a
                  permanent Entrepreneur Awards URL and accompanied by a physical commemorative
                  edition.
                </p>

                <div className="mt-6">
                  <FeatureSpecimen caption="Feature format specimen" />
                </div>

                <h4 className="mt-8 text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Included
                </h4>
                <div className="mt-4">
                  <IncludedList items={featureIncludes} />
                </div>

                <p className="mt-6 text-sm text-muted-foreground">
                  A lasting published record of the work behind your selection.
                </p>

                <div className="mt-auto pt-8">
                  <p className="text-lg font-semibold tracking-tight">$595</p>
                  <p className="text-sm text-muted-foreground">One-time payment</p>
                  <Button
                    className="mt-4 w-full"
                    data-event="feature-explore"
                    onClick={() => scrollToId("winners-feature")}
                  >
                    Explore the Winner&rsquo;s Feature
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Detailed: Commemorative Edition */}
        <section
          id="commemorative-edition"
          className="scroll-mt-8 border-t border-border py-16 md:py-24"
        >
          <div className="mx-auto max-w-6xl px-6">
            <Eyebrow>Commemorative Edition</Eyebrow>
            <h2 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight md:text-4xl">
              A physical way to keep the recognition present.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              The Commemorative Edition brings your Entrepreneur Award together as a designed
              physical presentation for your workspace, home or team.
            </p>

            <div className="mt-12 grid gap-10 md:grid-cols-2 md:items-start">
              <CommemorativeVisual label="Commemorative Edition — image preview" large />

              <div>
                <h3 className="text-lg font-semibold tracking-tight">What it includes</h3>
                <div className="mt-5">
                  <IncludedList items={commemorativeIncludesDetailed} />
                </div>
                <p className="mt-6 text-sm text-muted-foreground">
                  Your digital citation, certificate, seal and winner graphics remain included with
                  your selection.
                </p>
                <Button
                  className="mt-8 w-full sm:w-auto"
                  size="lg"
                  data-event="commemorative-select-click"
                  onClick={handleSelect}
                >
                  Select the Commemorative Edition
                </Button>
                <p className="mt-3 text-sm text-muted-foreground">
                  Optional. Your award remains unchanged.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed: Winner's Feature */}
        <section
          id="winners-feature"
          className="scroll-mt-8 border-y border-border bg-primary/5 py-16 md:py-24"
        >
          <div className="mx-auto max-w-6xl px-6">
            <Eyebrow>The Winner&rsquo;s Feature</Eyebrow>
            <h2 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight md:text-4xl">
              A feature that gives the recognition a permanent home.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              We prepare a fuller feature from the material in your entry and your citation, send
              it to you for review, publish it at a permanent Entrepreneur Awards URL, and prepare
              a physical commemorative edition.
            </p>

            <div className="mt-12 grid gap-10 md:grid-cols-2 md:items-start">
              <div>
                <FeatureSpecimen large caption="Feature format specimen" />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="mt-2 px-0" data-event="feature-specimen-view">
                      View the feature format
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Feature format specimen</DialogTitle>
                    </DialogHeader>
                    <FeatureSpecimen large />
                    <p className="text-sm text-muted-foreground">
                      This specimen shows the format and presentation of a Winner&rsquo;s Feature.
                      It is not presented as a real award winner.
                    </p>
                    <DialogClose asChild>
                      <Button variant="outline" className="mt-2 w-full sm:w-auto">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              </div>

              <div>
                <h3 className="text-lg font-semibold tracking-tight">What it includes</h3>
                <div className="mt-5">
                  <IncludedList items={featureIncludes} />
                </div>
                <p className="mt-6 text-sm text-muted-foreground">
                  Your selection and included winner materials remain yours whether or not you
                  choose the Winner&rsquo;s Feature.
                </p>
                <p className="mt-8 text-2xl font-semibold tracking-tight">$595</p>
                <p className="text-sm text-muted-foreground">One-time payment</p>
                <Button
                  className="mt-5 w-full sm:w-auto"
                  size="lg"
                  data-event="feature-order-click"
                  onClick={handleSelect}
                >
                  Order the Winner&rsquo;s Feature
                </Button>
                <p className="mt-3 text-sm text-muted-foreground">
                  Optional. Your award remains unchanged.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <Eyebrow>The process</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              From selection to published feature
            </h2>
            <ol className="mt-10 grid gap-8 md:grid-cols-3">
              {processSteps.map((step) => (
                <li key={step.number} className="border-t border-border pt-5">
                  <span className="text-2xl font-semibold text-primary">{step.number}</span>
                  <h3 className="mt-3 text-base font-medium">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Questions about your award
            </h2>
            <Card className="mt-8 px-4 py-2 md:px-6 md:py-4">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`q${i}`}>
                    <AccordionTrigger className="text-left text-base font-medium">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Entrepreneur Awards</span>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link to="/terms-and-conditions" className="hover:text-foreground">
              Terms
            </Link>
            <a href="/#contact" className="hover:text-foreground">
              Contact
            </a>
          </nav>
          <p>Entrepreneur Awards. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
