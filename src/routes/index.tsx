import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Fragment, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: {
          portalId: string;
          formId: string;
          region?: string;
          target?: string;
          css?: string;
          cssClass?: string;
          submitButtonClass?: string;
          pageName?: string;
          pageUrl?: string;
          inlineMessage?: string;
          onFormReady?: (form: unknown) => void;
          onFormSubmit?: (form: unknown) => void;
          onFormSubmitted?: (form: unknown) => void;
        }) => void;
      };
    };
  }
}

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ArrowUpRight } from "lucide-react";


import { submitHubSpotLead } from "@/lib/hubspot.functions";
import { AWARD_YEAR } from "@/content/award";

import { SiteFigure } from "@/components/site-figure";

import heroTrophy from "@/assets/hero-trophy.webp.asset.json";
import awardBand from "@/assets/award-band-2.jpg.asset.json";
import winnerWords from "@/assets/winner-words.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteNav />
      <main>
        <Hero />
        <CredibilityBand />
        <AwardBand />
        <WhatAWinIsWorth />
        <HowItWorks />
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
    <section id="top" className="relative overflow-hidden">
      <img
        src={heroTrophy.url}
        alt=""
        aria-hidden
        width={1920}
        height={815}
        loading="eager"
        decoding="async"
        className="pointer-events-none absolute top-0 right-0 hidden h-full w-auto max-w-none object-contain object-right lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-background from-45% via-background/70 via-55% to-transparent lg:block"
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-10 pb-24 md:pt-12 md:pb-32">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {AWARD_YEAR} entries are open · decisions within five business days
          </span>
          <h1 className="mt-8 text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
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
    href: "https://vanityfairgermany.com/entrepreneur-awards-is-quietly-rewiring-how-founders-earn-status/",
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
        <p className="text-center text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
          As seen in
        </p>
        <div className="mt-6 grid grid-cols-2 justify-items-center gap-x-8 gap-y-6 md:flex md:flex-wrap md:items-center md:justify-center md:gap-x-14">
          {publications.map((pub) => (
            <a
              key={pub.name}
              href={pub.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[#8A94A6] transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${pub.className}`}
              style={pub.style}
            >
              {pub.name}
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
          className="h-full w-full object-cover [object-position:60%_40%]"
        />
      </div>
    </section>
  );
}

const winWorth = [
  {
    title: "Recognition in your name",
    body: "Most business awards go to companies. This one is awarded to the founder, so it travels with you into whatever you build next and reads as a judgment on you rather than on an entity.",
  },
  {
    title: "A reason to be seen",
    body: "Selection is something that happened, on a date. That gives you a legitimate reason to update your profile, write to your clients and talk to press, without any of it reading as self-promotion.",
  },
  {
    title: "Assessed on what you built",
    body: "The reading is about the business itself — what you made, what it does and what happened as a result — rather than how polished the writing around it is.",
  },
];

function WhatAWinIsWorth() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>What you get out of it</Eyebrow>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            What a win is worth to you.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
            Entrepreneur Awards recognises the founder rather than the company. Selection puts an
            external assessment of what you built into your own name, issued by someone outside
            your business, and it stays useful long after the year it was awarded.
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
    body: "What was built, and whether it is meaningfully different from what already existed. We are reading the substance of the thing itself, not how novel it sounds when described.",
  },
  {
    title: "Traction",
    body: "Progress that can be pointed at. Revenue, customers, users, adoption, or another outcome you can evidence. Read in the context of the stage your business is at, not against a fixed threshold.",
  },
  {
    title: "A standout achievement",
    body: "One specific thing you did that a comparable operator would not have. This asks for a single concrete event rather than a general standard, and it is where detail matters most.",
  },
];

/** A rubric, not a sequence: bordered cards with a blue left rule and no numerals. */
function Criteria() {
  return (
    <section id="criteria" className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <Eyebrow>How entries are read</Eyebrow>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            The three criteria, in full.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
            Every entry is read against these, in this order. There are no categories, so nothing is
            selected by default.
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
          <Eyebrow>The words you receive</Eyebrow>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            What the award actually says about you.
          </h2>
          <Card className="mt-7 border border-border bg-background p-8 shadow-none md:p-10">
            <p className="text-base leading-relaxed text-foreground">
              Winners receive a dated, signed record of the assessment. It states what was judged
              and why the entry was selected, written for that specific business rather than from
              a template. You can use it as the basis for any quote you choose.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}

const doesNotDo = [
  {
    title: "No nominations",
    body: "Nobody is put forward by us. Founders enter their own business, in their own words.",
  },
  {
    title: "No shortlist fee",
    body: "Reaching a shortlist costs nothing. Nothing is asked of you to be read and assessed.",
  },
  {
    title: "No categories",
    body: "There are no sector awards, size brackets, or separate categories. Every entry is read against the same three criteria.",
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
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/50">
            Setting expectations
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            What this award does not do.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/60 md:text-xl">
            Worth knowing before you enter, so nothing about the process comes as a surprise later.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
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
        Four fields and three short questions. About five minutes. We are assessing what was built,
        not how well an application is written.
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
    body: <>Either way, and with the reason it was reached. Nothing is left unanswered.</>,
  },
  {
    number: "04",
    title: "If selected",
    body: (
      <>
        Your winner seal, your badge, four sized graphics for LinkedIn, social and email signature,
        and the written record of your assessment arrive by email. No further payment, and they
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
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Four steps, start to finish.
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



type HubSpotSubmissionPayload = {
  submittedAt: number;
  fields: Array<{ name: string; value: string }>;
  context: {
    hutk?: string;
    pageUri: string;
    pageName: string;
    referrer?: string;
  };
};

function readCookie(name: string) {
  return document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

function buildHubSpotSubmissionPayload(form: HTMLFormElement): HubSpotSubmissionPayload {
  const excludedNames = new Set(["hs_context", "hsCtaTracking", "g-recaptcha-response"]);
  const fieldValues = new Map<string, string[]>();

  Array.from(form.elements).forEach((element) => {
    if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement)) {
      return;
    }

    const { name } = element;
    if (!name || excludedNames.has(name) || element.disabled) {
      return;
    }

    if (element instanceof HTMLInputElement) {
      const inputType = element.type.toLowerCase();
      if (["submit", "button", "reset", "file"].includes(inputType)) {
        return;
      }
      if (["checkbox", "radio"].includes(inputType) && !element.checked) {
        return;
      }
    }

    const value = element.value.trim();
    if (!value) {
      return;
    }

    fieldValues.set(name, [...(fieldValues.get(name) ?? []), value]);
  });

  const hsContextInput = form.querySelector<HTMLInputElement>('input[name="hs_context"]');
  let parsedContext: { hutk?: string } = {};
  if (hsContextInput?.value) {
    try {
      parsedContext = JSON.parse(hsContextInput.value) as { hutk?: string };
    } catch {
      parsedContext = {};
    }
  }

  const hutk = parsedContext.hutk ?? readCookie("hubspotutk");

  return {
    submittedAt: Date.now(),
    fields: Array.from(fieldValues, ([name, values]) => ({
      name,
      value: values.join(";"),
    })),
    context: {
      ...(hutk ? { hutk: decodeURIComponent(hutk) } : {}),
      pageUri: window.location.href.split("#")[0],
      pageName: document.title,
      ...(document.referrer ? { referrer: document.referrer } : {}),
    },
  };
}


function SubmissionForm() {
  const formContainerRef = useRef<HTMLDivElement>(null);
  const targetId = "hubspot-form-target";
  const navigate = useNavigate({ from: "/" });
  const submitLead = useServerFn(submitHubSpotLead);
  const [formError, setFormError] = useState<string | null>(null);
  const consentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptSrc = "https://js.hsforms.net/forms/embed/v2.js";
    const formContainer = formContainerRef.current;

    const setSubmitButtonState = (form: HTMLFormElement, submitting: boolean) => {
      const button = form.querySelector<HTMLInputElement | HTMLButtonElement>('input[type="submit"], button[type="submit"]');
      if (!button) return;

      button.disabled = submitting;
      if (button instanceof HTMLInputElement) {
        if (!button.dataset.originalValue) button.dataset.originalValue = button.value;
        button.value = submitting ? "Submitting..." : button.dataset.originalValue;
      } else {
        if (!button.dataset.originalText) button.dataset.originalText = button.textContent ?? "Submit";
        button.textContent = submitting ? "Submitting..." : button.dataset.originalText;
      }
    };

    const handleServerSubmit = async (event: SubmitEvent) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      const form = event.target instanceof HTMLFormElement ? event.target : null;
      if (!form) return;
      if (form.dataset.serverSubmitting === "true") return;
      form.querySelectorAll<HTMLElement>(".hs-form-field").forEach((field) => {
        field.dataset.touched = "true";
      });
      if (!form.reportValidity()) return;

      form.dataset.serverSubmitting = "true";
      setSubmitButtonState(form, true);
      setFormError(null);

      try {
        const payload = buildHubSpotSubmissionPayload(form);
        const result = await submitLead({ data: payload });
        if (!result.ok) {
          throw new Error(`HubSpot submission failed [${result.status}]`);
        }
        navigate({ to: "/complete" });
      } catch (error) {
        console.error("HubSpot server-side submission failed", error);
        setFormError("Something went wrong submitting your entry. Please try again.");
        delete form.dataset.serverSubmitting;
        setSubmitButtonState(form, false);
      }
    };

    const attachServerSubmit = () => {
      const form = formContainerRef.current?.querySelector("form");
      if (!form || form.dataset.serverSubmitAttached === "true") return;

      form.dataset.serverSubmitAttached = "true";

      const firstName = form.querySelector<HTMLInputElement>('input[name="firstname"]');
      if (firstName) {
        firstName.placeholder = "Your first name, used to address you";
      }

      // Errors stay hidden until a field is blurred or the form is submitted.
      form.querySelectorAll<HTMLElement>(".hs-form-field").forEach((field) => {
        field.querySelectorAll<HTMLElement>("input, textarea, select").forEach((input) => {
          input.addEventListener("blur", () => {
            field.dataset.touched = "true";
          });
        });
      });




      // Consent must read directly above the submit button.
      const submitWrapper = form.querySelector(".hs_submit") ?? form.querySelector(".hs-submit");
      if (submitWrapper && consentRef.current) {
        submitWrapper.parentElement?.insertBefore(consentRef.current, submitWrapper);
      }

      const btn = form.querySelector<HTMLInputElement | HTMLButtonElement>(
        'input[type="submit"], button[type="submit"]'
      );
      if (btn) btn.disabled = false;
    };

    formContainer?.addEventListener("submit", handleServerSubmit, true);

    const createForm = () => {
      if (window.hbspt && formContainerRef.current) {
        formContainerRef.current.innerHTML = "";
        setFormError(null);
        window.hbspt.forms.create({
          portalId: "24057088",
          formId: "e11dcc5d-8be4-4fe7-86ff-10f733956165",
          region: "na1",
          target: `#${targetId}`,
          css: "",
          pageName: document.title,
          pageUrl: window.location.href,
          onFormReady: attachServerSubmit,
          onFormSubmitted: () => {
            navigate({ to: "/complete" });
          },
        });
      }
    };

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${scriptSrc}"]`);
    let loadingScript: HTMLScriptElement | null = null;
    if (existing) {
      if (window.hbspt) {
        createForm();
      } else {
        existing.addEventListener("load", createForm);
      }
      loadingScript = existing;
    } else {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      script.charset = "utf-8";
      script.type = "text/javascript";
      script.addEventListener("load", createForm);
      document.body.appendChild(script);
      loadingScript = script;
    }

    return () => {
      loadingScript?.removeEventListener("load", createForm);
      formContainer?.removeEventListener("submit", handleServerSubmit, true);
      formContainer?.querySelectorAll<HTMLFormElement>("form").forEach((form) => {
        delete form.dataset.serverSubmitAttached;
      });
    };
  }, [navigate, submitLead]);

  return (
    <section id="submit" className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <Eyebrow>Enter now</Eyebrow>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Put your entry in.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
            Everything needed to assess the business is on this one page.
          </p>
        </div>
        <Card className="mt-12 p-8 md:p-10">
          <div id={targetId} ref={formContainerRef} />
          <div className="mt-6" ref={consentRef}>
            <p className="text-sm text-foreground">
              By submitting you agree to the{" "}
              <a
                href="/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary"
              >
                Terms and Conditions
              </a>
              .
            </p>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              We reply to every entry either way, within five business days.
            </p>
          </div>
          {formError && (
            <p className="mt-4 text-center text-sm font-medium text-destructive" role="alert">
              {formError}
            </p>
          )}
        </Card>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-t border-border bg-surface py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Eyebrow>Contact</Eyebrow>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
          Questions? Get in touch.
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
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
        <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-base text-muted-foreground">
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            Twitter
          </a>
        </div>
      </div>
    </section>
  );
}

