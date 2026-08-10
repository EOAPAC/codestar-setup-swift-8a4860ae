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


import { submitHubSpotLead } from "@/lib/hubspot.functions";
import { AWARD_YEAR } from "@/content/award";

import heroTrophy from "@/assets/hero-trophy.webp.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteNav />
      <main>
        <Hero />
        <PublicationStrip />
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


function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <img
        src={heroTrophy.url}
        alt=""
        aria-hidden
        width={1920}
        height={823}
        loading="eager"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover [object-position:78%_50%] opacity-40 md:opacity-100"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/10"
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
            An independent award for founders. One entry, three published criteria, and a
            decision within five business days. Most entries are not selected.
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

const publications = ["Inc.", "Fortune", "Business Insider", "TechCrunch", "Newsweek", "Sifted"];

function PublicationStrip() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs uppercase tracking-[0.12em] text-muted-foreground">
          As seen in
        </p>
        <div className="mt-6 grid grid-cols-3 justify-items-center gap-x-8 gap-y-6 md:flex md:flex-wrap md:justify-center md:gap-x-14">
          {publications.map((name) => (
            <span
              key={name}
              className="text-[20px] font-medium tracking-[0.02em] text-[#8A94A6]"
            >
              {name}
            </span>
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
          src="/images/ea-award-band.webp"
          alt={`The ${AWARD_YEAR} Entrepreneur Award, a crystal award etched with the winner seal.`}
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover [object-position:72%_50%]"
        />
      </div>
      <div className="mx-auto max-w-6xl px-6">
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          The {AWARD_YEAR} Entrepreneur Award. The winner seal, badge, graphics and citation carry
          no further charge; the award itself is part of the optional Winner's Feature.
        </p>
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
    body: "Three short questions, not a twenty-page submission. You don't need an agency or a grant writer to put a strong entry in.",
  },
];

function WhatAWinIsWorth() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            What a win is worth to you.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
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
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
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
    number: "1",
    title: "Originality",
    body: "What was built, and whether it is meaningfully different from what already existed. We are reading the substance of the thing itself, not how novel it sounds when described.",
  },
  {
    number: "2",
    title: "Traction",
    body: "Progress that can be pointed at. Revenue, customers, users, adoption, or another outcome you can evidence. Read in the context of the stage your business is at, not against a fixed threshold.",
  },
  {
    number: "3",
    title: "A standout achievement",
    body: "One specific thing you did that a comparable operator would not have. This asks for a single concrete event rather than a general standard, and it is where detail matters most.",
  },
];

function Criteria() {
  return (
    <section id="criteria" className="border-t border-border bg-secondary/30 py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            The three criteria, in full.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Every entry is read against these, in this order. There are no categories, so nothing is
            selected by default.
          </p>
        </div>

        <div className="mt-16 space-y-14">
          {criteria.map((item) => (
            <div key={item.number}>
              <p className="text-sm font-semibold text-primary">{item.number}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <a href="/criteria">Download the criteria and assessment method</a>
          </Button>
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
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <Card className="border border-border bg-background p-10 shadow-none md:p-14">
          <p className="text-center text-xs font-medium uppercase tracking-[0.12em] text-primary">
            What a citation looks like
          </p>
          <p className="mt-6 text-center text-lg italic leading-relaxed text-foreground">
            Selected for the {AWARD_YEAR} Entrepreneur Award in recognition of a business built and
            led by its founder. The entry was assessed against originality, traction and a standout
            achievement. The assessment noted a product taken from concept to a working customer
            base under the founder's direct execution, and a standard of delivery sustained through
            the company's growth.
          </p>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Specimen. Not attributed to a recipient.
          </p>
        </Card>
      </div>
    </section>
  );
}

const doesNotDo = [
  `There are no categories and no subcategories. A winner is a ${AWARD_YEAR} Entrepreneur Award winner.`,
  "There is no fee to reach a shortlist.",
  "There is no renewal. Recognition is dated to the year it was awarded and is never charged for a second time.",
  "There is no ceremony and no ticket to buy. Everything a winner receives arrives by email.",
  "There is no twenty-page submission, and a longer entry is not a stronger one.",
  "Nobody is nominated by us. Founders enter their own business.",
];

function WhatItDoesNotDo() {
  return (
    <section className="bg-[#0B1220] py-24 text-white md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
          What this award does not do.
        </h2>
        <div className="mt-14 space-y-10">
          {doesNotDo.map((line) => (
            <p key={line} className="text-lg leading-relaxed text-white/75 md:text-xl">
              {line}
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
  const [agreed, setAgreed] = useState(false);
  const [agreementError, setAgreementError] = useState(false);
  const agreedRef = useRef(false);
  const consentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    agreedRef.current = agreed;
    const btn = formContainerRef.current?.querySelector<HTMLInputElement | HTMLButtonElement>(
      'input[type="submit"], button[type="submit"]'
    );
    if (btn) btn.disabled = !agreed;
    if (agreed) setAgreementError(false);
  }, [agreed]);

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
      if (!agreedRef.current) {
        setAgreementError(true);
        return;
      }
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
      if (btn) btn.disabled = !agreedRef.current;
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
    <section id="submit" className="border-t border-border bg-secondary/30 py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Enter now</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Enter in five minutes. Decisions within five business days.
          </h2>
          <p className="mt-4 text-muted-foreground">
            No categories. No twenty-page application.
          </p>
        </div>
        <Card className="mt-12 p-8 md:p-10">
          <div id={targetId} ref={formContainerRef} />
          <div className="mt-6" ref={consentRef}>
            <label className="flex items-start gap-3 text-sm text-foreground">
              <input
                type="checkbox"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-border text-primary focus:ring-primary"
                aria-invalid={agreementError || undefined}
                aria-describedby={agreementError ? "agreement-error" : undefined}
              />
              <span>
                I have read and agree to the{" "}
                <a
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-primary"
                >
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-primary"
                >
                  Privacy Policy
                </a>
                .
              </span>
            </label>
            {agreementError && (
              <p id="agreement-error" className="mt-2 text-sm font-medium text-destructive" role="alert">
                Please agree to the Terms and Conditions and Privacy Policy to continue.
              </p>
            )}
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
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-semibold tracking-tight">Questions? Get in touch.</h2>
        <p className="mt-3 text-muted-foreground">
          We reply within one business day.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm">
          <a
            href="mailto:hello@entrepreneurawards.co"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 hover:border-primary hover:text-primary"
          >
            <Mail className="h-4 w-4" /> hello@entrepreneurawards.co
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 hover:border-primary hover:text-primary"
          >
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 hover:border-primary hover:text-primary"
          >
            <Twitter className="h-4 w-4" /> Twitter
          </a>
        </div>
      </div>
    </section>
  );
}

