import { createFileRoute } from "@tanstack/react-router";
import { Fragment } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { AwardNumbers } from "@/components/award-numbers";
import { ArrowUpRight } from "lucide-react";


import { TestEntryForm } from "@/components/test-entry-form";
import { AWARD_YEAR } from "@/content/award";

import { SiteFigure } from "@/components/site-figure";

import heroTrophy from "@/assets/hero-trophy.jpg.asset.json";
import awardBand from "@/assets/award-band.jpg.asset.json";
import winnerWords from "@/assets/winner-words.jpg.asset.json";

export const Route = createFileRoute("/homepage-v2")({
  head: () => ({
    meta: [
      { title: "Entrepreneur Awards | Homepage v2" },
      { name: "description", content: "An independent award for founders. Discover the assessment criteria, how it works, and enter the 2026 Entrepreneur Awards." },
      { name: "twitter:description", content: "An independent award for founders. Discover the assessment criteria, how it works, and enter the 2026 Entrepreneur Awards." },
      { property: "og:title", content: "Entrepreneur Awards | Homepage v2" },
      { property: "og:description", content: "An independent award for founders. Discover the assessment criteria, how it works, and enter the 2026 Entrepreneur Awards." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="homepage-colour-restored min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteNav hideCategoriesLink entryHref="#submit" />
      <main>
        <Hero />
        <CredibilityBand />
        <AwardBand />
        <WhatAWinIsWorth />
        <HowItWorks />
        <AwardNumbers />
        <Criteria />
        <SpecimenCitation />
        <WhatItDoesNotDo />
        <SubmissionForm />
        <Contact />
      </main>
      <SiteFooter entryHref="#submit" />
    </div>
  );
}

/** One eyebrow treatment for every section, so each announces its role. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">{children}</p>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <img
        src={heroTrophy.url}
        alt=""
        aria-hidden
        width={1376}
        height={768}
        loading="eager"
        decoding="async"
        className="pointer-events-none absolute top-0 right-0 hidden h-full w-auto max-w-none object-contain object-right lg:block"
        style={{
          // Feather the image's left edge into the page background so the
          // photo's own studio-grey backdrop never reads as a second colour.
          maskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 18%, black 40%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 18%, black 40%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-background from-30% via-background/60 via-55% to-transparent lg:block"
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-10 pb-24 md:pt-12 md:pb-32">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
            For the person who <span className="text-primary">built it.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            An independent award for founders. One entry, one decision, and most entries are
            not selected.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="min-w-48">
              <a href="#submit">Enter now →</a>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <a href="#how-it-works">See how it works</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const SERIF = "Georgia, 'Times New Roman', serif";

/** Publication wordmarks, each linking to the article about the award. */
const publications: {
  name: string;
  href: string;
  className: string;
  style?: React.CSSProperties;
}[] = [
  {
    name: "Vanity Fair",
    href: "https://vanityfairswitzerland.com/entrepreneur-awards-is-quietly-rewiring-how-founders-earn-status/",
    className: "text-[20px] uppercase tracking-[0.18em]",
    style: { fontFamily: SERIF, fontWeight: 400 },
  },
  {
    name: "VARIETY",
    href: "https://variety.com.se/why-entrepreneur-awards-treats-founders-like-talent-not-studios/",
    className: "text-[21px] tracking-[0.02em]",
    style: { fontFamily: SERIF, fontWeight: 700 },
  },
  {
    name: "FAST COMPANY",
    href: "https://fastcompany.ph/entrepreneur-awards-has-taken-the-category-apart-and-rebuilt-it/",
    className: "text-[19px] font-extrabold tracking-[-0.02em]",
  },
  {
    name: "L'OFFICIEL",
    href: "https://lofficiel-england.co.uk/entrepreneur-awards-makes-the-case-for-recognition-you-actually-keep/",
    className: "text-[20px] tracking-[0.28em]",
    style: { fontFamily: SERIF, fontWeight: 400 },
  },
  {
    name: "Forbes",
    href: "https://forbesbahrain.com/why-entrepreneur-awards-leads-the-six-recognitions-founders-chase-in-2026/",
    className: "text-[22px] uppercase tracking-[0.04em]",
    style: { fontFamily: SERIF, fontWeight: 700 },
  },
];


const proofPoints = [
  {
    title: "Read against a published rubric",
    body: "The same criteria, in the same order, for every entry. Nothing is assessed privately.",
  },
  {
    title: "Five business days",
    body: "A decision either way, with the reason it was reached, inside one working week.",
  },
  {
    title: "Independently assessed",
    body: "The judgment is made outside your business, by people with no stake in the outcome.",
  },
];

function CredibilityBand() {
  return (
    <section className="border-y border-border bg-surface py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs font-medium uppercase tracking-[0.12em] text-primary">
          As seen in
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {publications.map((pub) => (
            <a
              key={pub.name}
              href={pub.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center rounded-xl border border-border bg-card p-5 text-center transition-all hover:border-primary hover:bg-muted hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <span className="flex flex-1 items-center justify-center py-4">
                <span
                  className={`block text-muted-foreground transition-colors group-hover:text-foreground ${pub.className}`}
                  style={pub.style}
                >
                  {pub.name}
                </span>
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
                Read article
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </span>
            </a>
          ))}
        </div>


        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {proofPoints.map((point) => (
            <div key={point.title} className="border-l-2 border-primary pl-5">
              <h3 className="text-lg font-semibold">{point.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{point.body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function AwardBand() {
  return (
    <section>
      <div className="w-full bg-secondary [aspect-ratio:3/2] sm:[aspect-ratio:16/9] md:[aspect-ratio:21/9]">
        <img
          src={awardBand.url}
          alt={`A winner of the ${AWARD_YEAR} Entrepreneur Award holding the crystal award etched with the winner seal.`}
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover [object-position:50%_25%]"
        />
      </div>
    </section>
  );
}

const winWorth = [
  {
    title: "Recognition in your name",
    body: "Most business awards go to companies. This one is awarded to the founder, so it travels with you into whatever you build next.",
  },
  {
    title: "A reason to be seen",
    body: "Selection is a dated event. It gives you a reason to update your profile, write to your clients and talk to press without it reading as self-promotion.",
  },
  {
    title: "Assessed on what you built",
    body: "We read for the business itself: what you made, what it does and what happened as a result.",
  },
];

function WhatAWinIsWorth() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            What a win is worth to you.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-intro-foreground md:text-xl">
            Entrepreneur Awards recognises the founder. Selection puts an outside assessment of what you built in your own name, and it stays useful long after the year it was awarded.
          </p>
        </div>

        <div className="mt-16 grid items-start gap-8 md:grid-cols-[1fr_1px_1fr_1px_1fr]">
          {winWorth.map((item, index) => (
            <Fragment key={item.title}>
              {index > 0 && <div className="h-px w-full bg-border md:h-full md:w-px" />}
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            </Fragment>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Button asChild size="lg" className="min-w-48">
            <a href="#submit">Enter now →</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

const criteria = [
  {
    title: "Originality",
    body: "What was built, and whether it is meaningfully different from what already existed.",
  },
  {
    title: "Traction",
    body: "Progress you can show: revenue, customers, users, adoption or another outcome you can evidence. Judged for the stage your business is at. There is no fixed threshold.",
  },
  {
    title: "A standout achievement",
    body: "One specific thing you did that a comparable operator would not have. Name a single event and give the detail.",
  },
];

/** A rubric, not a sequence: bordered cards with a blue left rule and no numerals. */
function Criteria() {
  return (
    <section id="criteria" className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            The three criteria, in full.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-intro-foreground md:text-xl">
            Every entry is read against these, in this order.
          </p>
        </div>

        <div className="mt-16 space-y-6">
          {criteria.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-border border-l-2 border-l-primary bg-background p-6 md:p-8"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Button asChild size="lg" variant="outline">
            <a href="/criteria">See the full criteria page →</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function SpecimenCitation() {
  return (
    <section className="border-y border-border bg-surface py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-[0.8fr_1fr]">
        <SiteFigure
          src={winnerWords.url}
          alt={`A ${AWARD_YEAR} Entrepreneur Award winner holding the crystal award.`}
          ratio="4 / 5"
          width={614}
          height={768}
          objectPosition="center"
        />
        <div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            What the award says about you.
          </h2>
          <Card className="mt-7 border border-border bg-background p-8 shadow-none md:p-10">
            <p className="text-base leading-relaxed text-foreground">
              Winners receive a dated, signed record of the assessment. It states what was judged and why the entry was selected, written for that specific business. You can quote from it however you like.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}

const doesNotDo = [
  {
    title: "Payment does not buy a win",
    body: `The entry fee covers review and administration. There is no separate shortlist fee, and payment does not guarantee selection.`,
  },
  {
    title: "No membership",
    body: "The award is not a club or network you join. It is a single, dated recognition with no recurring commitment.",
  },
];

function WhatItDoesNotDo() {
  return (
    <section className="bg-[#0B1220] py-24 text-white md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            What this award does not do.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/60 md:text-xl">
            Two things to know before you enter.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2">
          {doesNotDo.map((item, index) => (
            <div key={item.title} className="bg-[#0B1220] p-7 md:p-8">
              <span className="text-sm font-medium tabular-nums text-white/35">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-white/60">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const howItWorks = [
  {
    number: "01",
    title: "You enter",
    body: (
      <>
        Four fields and three short questions. About five minutes. We assess what you built, so the writing doesn't need to be polished. Pay the one-time entry fee at the end of the form.
      </>
    ),
  },
  {
    number: "02",
    title: "We assess it",
    body: (
      <>
        Read against{" "}
        <a href="#criteria" className="text-primary underline underline-offset-4">
          three published criteria
        </a>
        : originality, traction, and a standout achievement.
      </>
    ),
  },
  {
    number: "03",
    title: "You hear back",
    body: <>Either way, with the reason for the decision.</>,
  },
  {
    number: "04",
    title: "If selected",
    body: (
      <>
        Your winner seal, your badge, four sized graphics for LinkedIn, social and email signature,
        and the written record of your assessment arrive by email. Included in your entry fee, and they
        remain yours permanently.
      </>
    ),
  },
];

/** A sequence in time: large grey numerals on a connecting hairline. */
function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-y border-border bg-surface py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Four steps from entry to decision.
          </h2>
        </div>

        <ol className="mt-16 grid gap-12 md:grid-cols-4 md:gap-10">
          {howItWorks.map((step) => (
            <li key={step.number} className="border-t border-border pt-6">
              <span className="block text-4xl font-semibold leading-none tracking-tight text-muted-foreground/40 md:text-5xl">
                {step.number}
              </span>
              <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>

      </div>
    </section>
  );
}

function SubmissionForm() {
  return <TestEntryForm />;
}

function Contact() {
  return (
    <section id="contact" className="border-t border-border bg-surface py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
          Questions? Get in touch.
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-intro-foreground md:text-xl">
          We reply to email within one business day.
        </p>
        <div className="mt-8">
          <a
            href="mailto:hello@entrepreneurawards.co"
            className="text-lg font-medium text-primary underline underline-offset-4"
          >
            hello@entrepreneurawards.co
          </a>
        </div>
      </div>
    </section>
  );
}

