import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";

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
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

import { submitHubSpotLead } from "@/lib/hubspot.functions";
import { AWARD_NUMBERS } from "@/lib/award-numbers";
import { AWARD_YEAR } from "@/content/award";
import { WINNERS } from "@/data/winners";

import heroTrophy from "@/assets/hero-trophy.jpg.asset.json";
import adamPisk from "@/assets/adam-pisk.jpg.asset.json";

const TITLE = "Entrepreneur Awards | For the person who built it";
const DESCRIPTION = "An independent award for founders. Discover the assessment criteria, how it works, and enter the 2026 Entrepreneur Awards.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/** Shared page width; body copy is held narrower for reading. */
const WRAP = "mx-auto max-w-[1120px] px-6";
const H2 = "text-4xl font-extrabold leading-[1.1] tracking-[-0.02em] md:text-5xl";
const LINK = "font-medium text-primary underline underline-offset-4 hover:no-underline";

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteNav />
      <main className="divide-y divide-border">
        <Hero />
        <AsSeenIn />
        <WinnerPhoto />
        <AwardedToTheFounder />
        <HowItWorks />
        <AwardNumbers />
        <Criteria />
        <WrittenRecord />
        <WhatItDoesNotDo />
        <SubmissionForm />
      </main>
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section id="top">
      <div className={`${WRAP} grid items-center gap-10 py-16 md:py-24 lg:grid-cols-[1.1fr_1fr]`}>
        <div>
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-[-0.02em] md:text-7xl">
            For the person who built it.
          </h1>
          <p className="mt-6 max-w-[680px] text-xl leading-relaxed text-muted-foreground">
            An independent award for founders. One entry, one decision, and most entries are
            not selected.
          </p>
          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            <Button asChild size="lg">
              <a href="#submit">Enter the {AWARD_YEAR} Awards</a>
            </Button>
            <a href="#how-it-works" className={`${LINK} inline-flex min-h-11 items-center`}>
              See how it works
            </a>
          </div>
          <p className="mt-6 text-base text-muted-foreground">
            {AWARD_YEAR} entries are open. Decisions within five business days.
          </p>
        </div>
        <img
          src={heroTrophy.url}
          alt={`The ${AWARD_YEAR} Entrepreneur Award trophy.`}
          width={1376}
          height={768}
          loading="eager"
          decoding="async"
          className="h-auto w-full"
        />
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
  {
    name: "Forbes",
    href: "https://forbesbahrain.com/why-entrepreneur-awards-leads-the-six-recognitions-founders-chase-in-2026/",
    className: "text-[22px] uppercase tracking-[0.04em]",
    style: { fontFamily: SERIF, fontWeight: 700 },
  },
];

function AsSeenIn() {
  return (
    <section className="py-10">
      <div className={WRAP}>
        <p className="text-base text-muted-foreground">As seen in</p>
        <ul className="mt-4 flex flex-wrap items-center gap-x-10 gap-y-2">
          {publications.map((pub) => (
            <li key={pub.name}>
              <a
                href={pub.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${pub.name} article about Entrepreneur Awards`}
                className={`inline-flex min-h-11 items-center text-foreground transition-colors hover:text-primary ${pub.className}`}
                style={pub.style}
              >
                {pub.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const ADAM = WINNERS.find((w) => w.slug === "adam-pisk");

/** A real winner, captioned like a newspaper photograph. */
function WinnerPhoto() {
  if (!ADAM) return null;
  return (
    <section className="py-16 md:py-20">
      <figure className={WRAP}>
        <img
          src={adamPisk.url}
          alt={`${ADAM.name}, founder of ${ADAM.company}.`}
          loading="lazy"
          decoding="async"
          className="h-auto w-full max-w-[680px]"
        />
        <figcaption className="mt-3 text-sm text-muted-foreground">
          {ADAM.name}, {ADAM.company}, {ADAM.year} winner.
        </figcaption>
      </figure>
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
    body: "The reading is about the business itself (what you made, what it does and what happened as a result) rather than how polished the writing around it is.",
  },
];

function AwardedToTheFounder() {
  return (
    <section className="py-20 md:py-28">
      <div className={WRAP}>
        <h2 className={`${H2} max-w-[800px]`}>This one is awarded to the founder.</h2>
        <div className="mt-8 max-w-[680px] space-y-6">
          <p className="text-xl leading-relaxed">
            Entrepreneur Awards recognises the founder rather than the company. Selection puts an
            external assessment of what you built into your own name, issued by someone outside
            your business, and it stays useful long after the year it was awarded.
          </p>
          {winWorth.map((item) => (
            <p key={item.title}>
              <strong className="font-bold">{item.title}.</strong>{" "}
              <span className="text-muted-foreground">{item.body}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

const howItWorks = [
  {
    when: "Today",
    title: "You enter",
    body: (
      <>
        Four fields and three short questions. About five minutes. We are assessing what was built,
        not how well an application is written.
      </>
    ),
  },
  {
    when: "Next five business days",
    title: "We read it",
    body: (
      <>
        Read against{" "}
        <a href="#criteria" className={LINK}>
          three published criteria
        </a>
        : originality, traction, and a standout achievement.
      </>
    ),
  },
  {
    when: "By the fifth business day",
    title: "You hear back",
    body: <>Either way, and with the reason it was reached. Nothing is left unanswered.</>,
  },
  {
    when: "If selected",
    title: "Your winner pack",
    body: (
      <>
        Your winner seal, your badge, four sized graphics for LinkedIn, social and email signature,
        and the written record of your assessment arrive by email. No further payment, and they
        remain yours permanently.
      </>
    ),
  },
];

/** A timeline: horizontal on desktop, vertical on mobile, one dot per step. */
function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-20 md:py-28">
      <div className={WRAP}>
        <h2 className={`${H2} max-w-[800px]`}>From entry to decision in five business days.</h2>
        <ol className="relative mt-14 grid gap-10 border-l border-foreground pl-6 md:grid-cols-4 md:gap-8 md:border-t md:border-l-0 md:pl-0 md:pt-8">
          {howItWorks.map((step) => (
            <li key={step.title} className="relative">
              <span
                aria-hidden
                className="absolute top-1.5 -left-[29px] size-2.5 rounded-full bg-foreground md:-top-[37px] md:left-0"
              />
              <p className="text-sm font-semibold text-muted-foreground">{step.when}</p>
              <h3 className="mt-1 text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function AwardNumbers() {
  return (
    <section aria-label="The award in numbers" className="py-16 md:py-20">
      <dl className={`${WRAP} grid grid-cols-2 gap-y-10 md:grid-cols-4`}>
        {AWARD_NUMBERS.map((stat, index) => (
          <div
            key={stat.label}
            className={`flex flex-col pr-4 ${index % 2 === 1 ? "border-l border-border pl-6" : ""} ${index > 0 ? "md:border-l md:border-border md:pl-6" : ""}`}
          >
            <dt className="order-2 mt-2 text-base text-muted-foreground">{stat.label}</dt>
            <dd className="text-5xl font-extrabold tracking-[-0.02em] tabular-nums md:text-6xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
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

function Criteria() {
  return (
    <section id="criteria" className="scroll-mt-20 py-20 md:py-28">
      <div className={WRAP}>
        <h2 className={H2}>The three criteria, in full.</h2>
        <p className="mt-6 max-w-[680px] text-xl leading-relaxed">
          Every entry is read against these, in this order. There are no categories, so nothing is
          selected by default. The judgment is made outside your business, by people with no stake
          in the outcome.
        </p>
        <dl className="mt-12 divide-y divide-border border-y border-border">
          {criteria.map((item) => (
            <div key={item.title} className="grid gap-2 py-6 md:grid-cols-[280px_1fr] md:gap-10">
              <dt className="text-xl font-bold">{item.title}</dt>
              <dd className="max-w-[680px] text-muted-foreground">{item.body}</dd>
            </div>
          ))}
        </dl>
        <a href="/criteria" className={`${LINK} mt-8 inline-flex min-h-11 items-center`}>
          See the full criteria page
        </a>
      </div>
    </section>
  );
}

function WrittenRecord() {
  return (
    <section className="py-20 md:py-28">
      <div className={WRAP}>
        <h2 className={H2}>The written record winners receive.</h2>
        <p className="mt-8 max-w-[680px] text-2xl leading-relaxed">
          Winners receive a dated, signed record of the assessment. It states what was judged
          and why the entry was selected, written for that specific business rather than from
          a template. You can use it as the basis for any quote you choose.
        </p>
      </div>
    </section>
  );
}

const doesNotDo = [
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

/** The page's one dark section. */
function WhatItDoesNotDo() {
  return (
    <section className="bg-foreground py-20 text-background md:py-28">
      <div className={WRAP}>
        <h2 className={H2}>What this award does not do.</h2>
        <p className="mt-6 max-w-[680px] text-xl leading-relaxed text-background/75">
          Worth knowing before you enter, so nothing about the process comes as a surprise later.
        </p>
        <div className="mt-10 max-w-[680px] space-y-5">
          {doesNotDo.map((item) => (
            <p key={item.title}>
              <strong className="font-bold">{item.title}.</strong>{" "}
              <span className="text-background/75">{item.body}</span>
            </p>
          ))}
        </div>
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
      if (btn) {
        btn.disabled = false;
        if (btn instanceof HTMLInputElement) btn.value = "Submit entry";
        else btn.textContent = "Submit entry";
      }
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
    <section id="submit" className="scroll-mt-20 py-20 md:py-28">
      <div className={WRAP}>
        <h2 className={H2}>Enter the {AWARD_YEAR} Awards.</h2>
        <p className="mt-6 max-w-[680px] text-xl leading-relaxed">
          Everything needed to assess the business is on this one page.
        </p>
        <div className="mt-10 max-w-[680px]">
          <div id={targetId} ref={formContainerRef} />
          <div className="mt-6" ref={consentRef}>
            <p className="text-sm text-foreground">
              By submitting you agree to the{" "}
              <a
                href="/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4"
              >
                Terms and Conditions
              </a>
              .
            </p>
            <p className="mt-6 text-sm text-muted-foreground">
              We reply to every entry either way, within five business days.
            </p>
          </div>
          {formError && (
            <p className="mt-4 text-sm font-medium text-destructive" role="alert">
              {formError}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
