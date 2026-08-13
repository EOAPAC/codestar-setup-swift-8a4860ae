import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Download, ArrowRight, Check } from "lucide-react";
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

export const Route = createFileRoute("/winner-materials")({
  head: () => ({
    meta: [
      { title: "Your Entrepreneur Award | Winner Materials" },
      {
        name: "description",
        content:
          "Your award statement, certificate and included winner materials, plus the optional Winner's Feature.",
      },
      { property: "og:title", content: "Your Entrepreneur Award | Winner Materials" },
      {
        property: "og:description",
        content:
          "Your award statement, certificate and included winner materials, plus the optional Winner's Feature.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WinnerMaterialsPage,
});

type Material = {
  id: string;
  title: string;
  fileType: string;
  image?: string;
};

const materials: Material[] = [
  { id: "certificate", title: "Winner certificate", fileType: "[PDF]" },
  { id: "seal", title: "Winner seal", fileType: "[PNG]", image: sealAsset.url },
  { id: "banner", title: "LinkedIn banner", fileType: "[PNG]", image: bannerAsset.url },
  { id: "square", title: "Square social post", fileType: "[PNG]", image: squareAsset.url },
  { id: "story", title: "Story graphic", fileType: "[PNG]", image: storyAsset.url },
  { id: "signature", title: "Email signature", fileType: "[PNG]", image: emailSigAsset.url },
];

const featureInclusions = [
  "A full written feature about your business",
  "Review before publication",
  "Publication at a permanent Entrepreneur Awards URL",
  "An engraved award with your name and award year",
  "A printed edition of your feature",
  "A printed presentation edition of your winner certificate and link card",
];

const processSteps = [
  {
    number: "01",
    title: "Order",
    body: "Choose the optional Winner's Feature.",
  },
  {
    number: "02",
    title: "Review",
    body: "We prepare the feature from your entry and your award statement, then send it to you for review and factual corrections.",
  },
  {
    number: "03",
    title: "Publish and present",
    body: "After approval, the feature is published at its permanent URL and your commemorative edition is prepared.",
  },
];

const faqs = [
  {
    q: "What is the difference between my award statement and the Winner's Feature?",
    a: "Your award statement is the short, formal wording explaining why your entry was selected. The Winner's Feature is an optional, fuller feature about the business behind that recognition.",
  },
  {
    q: "Do I need to purchase the Winner's Feature to keep my award?",
    a: "No. Your selection, award statement, certificate, seal and winner graphics are included with your award and remain yours permanently.",
  },
  {
    q: "Will I review the feature before it is published?",
    a: "Yes. The feature is sent to you for review and factual corrections before publication.",
  },
  {
    q: "What information is used to prepare the feature?",
    a: "We begin with the material submitted in your entry and your award statement. We may use publicly available information from your official business channels where appropriate.",
  },
  {
    q: "Where will the feature be published?",
    a: "It will be published at a permanent Entrepreneur Awards URL in the format entrepreneurawards.co/winners/[name].",
  },
  {
    q: "Does ordering the Winner's Feature change my award?",
    a: "No. It is a separate optional product. Your award remains exactly the same whether you order it or not.",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">
      {children}
    </p>
  );
}

function scrollToFeature() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document
    .getElementById("winners-feature")
    ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
}


/** Neutral, non-representational preview of the feature layout. */
function FeatureSpecimen({ large = false }: { large?: boolean }) {
  return (
    <div
      className="rounded-lg border border-border bg-card p-6 md:p-8"
      role="img"
      aria-label="Neutral placeholder showing the layout of a published feature page"
    >
      <div className="space-y-3">
        <div className="h-2 w-24 rounded bg-primary/30" />
        <div className={`rounded bg-muted ${large ? "h-6" : "h-5"} w-4/5`} />
        <div className={`rounded bg-muted ${large ? "h-6" : "h-5"} w-3/5`} />
      </div>
      <div className="mt-6 aspect-[16/9] w-full rounded bg-muted/70" />
      <div className="mt-6 space-y-2">
        {[
          "w-full",
          "w-11/12",
          "w-full",
          "w-10/12",
          large ? "w-full" : "w-9/12",
          large ? "w-8/12" : "",
        ]
          .filter(Boolean)
          .map((w, i) => (
            <div key={i} className={`h-2.5 rounded bg-muted ${w}`} />
          ))}
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        entrepreneurawards.co/winners/[name]
      </p>
    </div>
  );
}

function WinnerMaterialsPage() {
  const handleDownload = () => {
    toast("Download will be available here.");
  };

  const handleOrder = () => {
    // Placeholder for payment integration.
    toast("Ordering will be available here.");
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      {/* 1. Simplified header */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
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
        {/* 2. Recognition hero */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
            <Eyebrow>Entrepreneur Awards</Eyebrow>
            <div className="mt-6 flex items-start gap-4">
              <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <Award className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
                  You have been selected for the Entrepreneur Award.
                </h1>
                <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
                  Your award statement &mdash; the short, formal lines explaining what was
                  assessed and why your entry was selected &mdash; certificate and winner
                  materials are ready to use.
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

        {/* 3. Citation */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <Eyebrow>Your award statement</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              The formal statement of your selection
            </h2>
            <Card className="mt-8 border-l-2 border-l-primary p-6 md:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Award statement
              </p>
              <p className="mt-4 text-lg italic leading-relaxed text-foreground/90">
                [Your formal 40–70 word award statement will appear here.]
              </p>
            </Card>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Your selection, award statement, certificate and winner materials are included with
              your award and remain yours permanently.
            </p>
          </div>
        </section>

        {/* 4. Transition */}
        <section className="border-y border-border bg-primary/5">
          <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
            <Eyebrow>Optional next step</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Your award statement records the recognition. The Winner's Feature documents the
              business behind it.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Your winner materials are ready to help you announce your selection. If you
              would like a fuller, reviewed feature about the business behind that
              recognition, it can be published at a permanent Entrepreneur Awards URL and
              prepared as a commemorative edition.
            </p>
            <div className="mt-8">
              <Button onClick={scrollToFeature}>
                See the Winner's Feature
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
              <p className="mt-3 text-sm text-muted-foreground">
                Optional. Your award and included materials remain unchanged.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Included materials */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Your included winner materials
            </h2>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground">
              These materials are included with your selection and ready to download.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {materials.map((m) => (
                <Card key={m.id} className="flex flex-col overflow-hidden p-5">
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
                      <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                        {m.title}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-base font-medium">{m.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{m.fileType}</p>
                  <Button
                    variant="outline"
                    className="mt-4 w-full"
                    onClick={handleDownload}
                  >
                    <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                    Download
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Winner's Feature */}
        <section id="winners-feature" className="scroll-mt-8 border-t border-border py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <Eyebrow>The Winner's Feature</Eyebrow>
            <h2 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight md:text-4xl">
              A permanent feature about the business behind your recognition.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              We prepare a full written feature from the material in your entry and your
              award statement, send it to you for review, publish it at a permanent Entrepreneur
              Awards URL, and create a physical commemorative edition.
            </p>

            <div className="mt-12 grid gap-10 md:grid-cols-2 md:items-start">
              <div>
                <FeatureSpecimen />
                <p className="mt-3 text-sm text-muted-foreground">Feature format specimen</p>
              </div>

              <div>
                <ul className="space-y-4">
                  {featureInclusions.map((item) => (
                    <li key={item} className="flex gap-3 text-base">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="mt-6 px-0">
                      View the feature format
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Feature format specimen</DialogTitle>
                    </DialogHeader>
                    <FeatureSpecimen large />
                    <p className="text-sm text-muted-foreground">
                      Feature format specimen — shown to demonstrate structure and
                      presentation. It is not presented as a real award winner.
                    </p>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </section>

        {/* 7. How it works */}
        <section className="border-t border-border py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              How the Winner's Feature works
            </h2>
            <ol className="mt-10 grid gap-8 md:grid-cols-3">
              {processSteps.map((step) => (
                <li key={step.number} className="border-t border-border pt-5">
                  <span className="text-2xl font-semibold text-primary">{step.number}</span>
                  <h3 className="mt-3 text-base font-medium">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 8. Commemorative edition */}
        <section className="border-t border-border py-16 md:py-24">
          <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-2 md:items-center">
            <div
              className="grid aspect-[4/3] w-full place-items-center rounded-lg bg-secondary/60 p-6 text-center"
              role="img"
              aria-label="Placeholder for an image of the physical commemorative edition"
            >
              <span className="text-sm text-muted-foreground">
                Physical commemorative edition — image coming soon
              </span>
            </div>
            <div>
              <Eyebrow>Commemorative edition</Eyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                A presentation piece for the recognition.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                The Winner's Feature is prepared as a physical edition with an engraved
                award, a printed feature, a printed presentation certificate and a card
                linking to the published page.
              </p>
            </div>
          </div>
        </section>

        {/* 9. Purchase card */}
        <section className="border-t border-border py-16 md:py-24">
          <div className="mx-auto max-w-2xl px-6">
            <Card className="p-6 md:p-10">
              <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                The Winner's Feature
              </h2>
              <p className="mt-4 text-4xl font-semibold tracking-tight">$595</p>
              <p className="mt-1 text-sm text-muted-foreground">One-time payment</p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                A reviewed permanent feature and commemorative edition of your Entrepreneur
                Award recognition.
              </p>
              <Button className="mt-8 w-full" size="lg" onClick={handleOrder}>
                Order the Winner's Feature
              </Button>
              <p className="mt-3 text-sm text-muted-foreground">
                Your award, award statement, certificate and included winner materials remain
                unchanged if you decide not to order.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="mt-4 px-0">
                    View the feature format
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Feature format specimen</DialogTitle>
                  </DialogHeader>
                  <FeatureSpecimen large />
                  <p className="text-sm text-muted-foreground">
                    Feature format specimen — shown to demonstrate structure and
                    presentation. It is not presented as a real award winner.
                  </p>
                </DialogContent>
              </Dialog>
            </Card>
          </div>
        </section>

        {/* 10. FAQ */}
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
                    <AccordionContent className="text-muted-foreground">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>
        </section>
      </main>

      {/* 11. Footer */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 text-xs text-muted-foreground">
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
