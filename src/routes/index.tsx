import { createFileRoute, Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { AwardNumbers } from "@/components/award-numbers";
import homepageV2Css from "../homepage-v2.css?url";


import { EntryForm } from "@/components/entry-form";
import { AWARD_YEAR } from "@/content/award";
import { ENTRY_FEE_LABEL } from "@/content/entry-fees";

import { SiteFigure } from "@/components/site-figure";

import heroTrophy from "@/assets/hero-trophy.jpg.asset.json";
import awardBand from "@/assets/award-band.jpg.asset.json";
import winnerWords from "@/assets/winner-words.jpg.asset.json";
import eaMark from "@/assets/ea-mark-84.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Entrepreneur Awards | For the person who built it" },
      { name: "description", content: "An independent award for founders. Discover the assessment criteria, how it works, and enter the 2026 Entrepreneur Awards." },
      { name: "twitter:description", content: "An independent award for founders. Discover the assessment criteria, how it works, and enter the 2026 Entrepreneur Awards." },
      { property: "og:title", content: "Entrepreneur Awards | For the person who built it" },
      { property: "og:description", content: "An independent award for founders. Discover the assessment criteria, how it works, and enter the 2026 Entrepreneur Awards." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: homepageV2Css }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="homepage-colour-restored min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteNav />
      <main>
        <div className="homepage-v2-first-screen">
          <Hero />
          <CredibilityBand />
        </div>
        <WhatAWinIsWorth />
        <HowItWorks />
        <AwardNumbers />
        <Criteria />
        <SpecimenCitation />
        <WhatItDoesNotDo />
        <SubmissionForm />
        <Contact />
      </main>
      <SiteFooter />
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
    <section id="top" className="homepage-v2-hero relative overflow-hidden">
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

      <div className="homepage-v2-hero-inner relative mx-auto max-w-6xl px-6 pt-10 pb-14 md:pt-12 md:pb-18">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
            For the person who <span className="text-primary">built it.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            An independent award for founders.
            <br className="homepage-v2-hero-break" aria-hidden="true" />
            Choose from six award categories, and get a decision on each. Most entries are not selected.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="min-w-48">
              <a href="#submit">Enter now →</a>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link to="/categories">See the categories</Link>
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


function CredibilityBand() {
  return (
      <section className="homepage-v2-press">
        <div className="homepage-v2-press-inner">
          <p className="homepage-v2-press-label">As seen in</p>
          <div className="homepage-v2-press-outlets">
            {publications.map((pub) => (
              <a key={pub.name} href={pub.href} target="_blank" rel="noopener noreferrer">
                {pub.name}
              </a>
            ))}
          </div>
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
    <section className="homepage-v2-win-worth">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mt-3 text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            What a win is
            <br className="lg:hidden" />{" "}
            worth to you.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-intro-foreground md:text-xl">
            Selection gives you an outside assessment of what you built, in your own name, and it stays useful long after the year it was awarded.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-10 lg:mt-14 lg:grid lg:grid-cols-2 lg:items-center lg:gap-[72px]">
          <img
            src={awardBand.url}
            alt=""
            loading="eager"
            decoding="async"
            className="homepage-v2-win-photo"
          />
          <div className="min-w-0">
            <div className="divide-y divide-border">
              {winWorth.map((item) => (
                <div key={item.title} className="py-6 first:pt-0">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button asChild size="lg" className="min-w-48">
                <a href="#submit">Enter now →</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const criteria = [
  {
    title: "Originality",
    body: "What you're building, why it matters and what makes your approach your own.",
  },
  {
    title: "Traction",
    body: "Real progress against your own goals: revenue, customers, adoption or results for the people you serve.",
  },
  {
    title: "A standout achievement",
    body: "One thing you did that most people would call hard, told in detail.",
  },
];

/** A rubric, not a sequence: bordered cards with a blue left rule and no numerals. */
function Criteria() {
  return (
    <section id="criteria" className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            The three criteria.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-intro-foreground md:text-xl">
            Every entry is read against these three, in this order.
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

const recordRows = [
  {
    label: "The story",
    body: "What you built and how you got there, written about your business.",
  },
  {
    label: "The panel's words",
    body: "Why your entry was selected, in the judging panel's own words.",
  },
  {
    label: "Your details",
    body: "Your company, industry, location and website, linked from the page.",
  },
  {
    label: "Yours to share",
    body: "Link to it from your site, in proposals or with press.",
  },
];

function SpecimenCitation() {
  return (
    <section className="border-y border-border bg-surface py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-[0.8fr_1fr]">
        <SiteFigure
          src={winnerWords.url}
          alt=""
          ratio="4 / 5"
          width={614}
          height={768}
          objectPosition="center"
        />
        <div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            What the award says about you.
          </h2>
          <Card className="mt-7 border border-border bg-background p-8 shadow-none">
            <div className="flex items-center justify-between gap-3 border-b border-border pb-5">
              <div className="flex items-center gap-2">
                <img src={eaMark.url} alt="" width={24} height={24} className="h-6 w-6" />
                <span className="whitespace-nowrap text-sm font-semibold">Entrepreneur Awards</span>
              </div>
            </div>
            <p className="mt-6 text-[17px] leading-relaxed text-foreground">
              A winner feature is a published page about you and what you built.
            </p>
            <dl className="mt-6">
              {recordRows.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col gap-1 border-t border-border py-4 sm:flex-row sm:items-baseline sm:gap-8"
                >
                  <dt className="shrink-0 text-[15px] font-semibold">{row.label}</dt>
                  <dd className="text-[15px] leading-relaxed text-muted-foreground sm:ml-auto sm:max-w-[58%]">
                    {row.body}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="border-t border-border pt-5">
              <a href="/winners" className="text-[15px] font-semibold text-[#1978E5] hover:underline">
                See winner features
              </a>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

const doesNotDo = [
  {
    title: "Payment does not buy a win",
    body: `Each US${ENTRY_FEE_LABEL} category fee covers review and administration. There is no separate shortlist fee, and payment does not guarantee selection.`,
  },
  {
    title: "No winner by default",
    body: "Every category is judged on its own, against the same three criteria. If no entry in a category meets the standard, nobody is selected in it.",
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
            Three things to know before you enter.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
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
        Choose your categories, then answer a few short questions. About five minutes, and plain answers are fine. After you submit, you pay US${ENTRY_FEE_LABEL} for each category you entered. Emerging Founder is free.
      </>
    ),
  },
  {
    number: "02",
    title: "We assess it",
    body: (
      <>
        Each category you enter is read against{" "}
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
    body: <>A decision on each category, either way, with the reason.</>,
  },
  {
    number: "04",
    title: "If selected",
    body: (
      <>
        Your winner seal, your badge, four sized graphics for LinkedIn, social and email signature,
        and the written record of your assessment arrive by email. They carry the title you won, come at no extra
        cost and remain yours permanently.
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
  return (
    <section id="submit" className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Enter the 2026 Awards.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-intro-foreground md:text-xl">
            Choose your categories and answer a short question for each. Paid categories are US$129.90 each, paid once. Emerging Founder is free. The fee covers review and administration, not an award.
          </p>
        </div>
        <EntryForm />
      </div>
    </section>
  );
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

