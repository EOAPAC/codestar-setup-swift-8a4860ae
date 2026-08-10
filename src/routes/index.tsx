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
import awardRecipient from "@/assets/award-recipient.png.asset.json";

import { ArrowRight, Linkedin, Mail, Twitter } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteNav />
      <main>
        <Hero />
        <ImageBand />
        <Tiers />
        <HowItWorks />
        <OurPosition />
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
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-24 text-center md:pt-40 md:pb-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {AWARD_YEAR} entries are open · decisions within five business days
        </span>
        <h1 className="mt-8 whitespace-nowrap text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
          For the person who <span className="text-primary">built it.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          An independent award for founders. One entry, three published criteria, and a
          decision within five business days. Most entries are not selected.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="min-w-48">
            <a href="#submit">
              Enter now <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <a href="#how-it-works">See how it works</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ImageBand() {
  return (
    <section className="border-t border-border pb-6">
      <img
        src={awardRecipient.url}
        alt="An illustrative image of an award recipient"
        loading="lazy"
        className="h-60 w-full object-cover object-[center_right] md:h-80 lg:h-[460px]"
      />
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-0 mt-[10px] text-right text-[12px] uppercase tracking-[0.08em] text-muted-foreground">
          Illustrative
        </p>
      </div>
    </section>
  );
}


function Tiers() {
  return (
    <section id="tiers" className="border-t border-border bg-secondary/30 py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-[680px] text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Why it matters</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Anything a business says about itself is discounted.
          </h2>
          <p className="mt-6 text-muted-foreground">
            That is simply how buyers, investors and journalists read marketing copy, and it applies
            to yours. Independent recognition is not read the same way, because the business did not
            issue it. That distinction is the whole of what an award is worth.
          </p>
        </div>

        <div className="mt-16 grid items-start gap-10 md:grid-cols-[1fr_1px_1fr_1px_1fr]">
          <div>
            <h3 className="text-base font-semibold">In the conversations that matter</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Proposals, pitches, first meetings, due diligence. An external assessment carries
              weight that a company's own description cannot.
            </p>
          </div>
          <div className="h-px w-full bg-border md:h-full md:w-px" />
          <div>
            <h3 className="text-base font-semibold">On your own channels</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A legitimate reason to talk about the business, the difference between announcing
              something and promoting yourself.
            </p>
          </div>
          <div className="h-px w-full bg-border md:h-full md:w-px" />
          <div>
            <h3 className="text-base font-semibold">For as long as you want it</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Recognition is dated to the year it was awarded. It does not expire, does not renew,
              and is never charged for a second time. What a winner receives is theirs permanently.
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-10">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="min-w-48">
              <a href="#submit">
                Enter now <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-w-48 border-primary text-primary hover:bg-primary/5 hover:text-primary">
              <a href="/methodology">How entries are judged</a>
            </Button>
          </div>
        </div>
      </div>
    </section>

  );
}

const howItWorks = [
  {
    number: "1",
    title: "You enter",
    body: "Four fields and three short questions. About five minutes. We are assessing what was built, not how well an application is written.",
  },
  {
    number: "2",
    title: "We assess it",
    body: "Read against three published criteria: originality, traction, and a standout achievement. There are no categories, so nothing is selected by default.",
  },
  {
    number: "3",
    title: "You hear back",
    body: "Within five business days, either way, with the reason. Most entries are not selected.",
  },
  {
    number: "4",
    title: "If selected",
    body: "Your winner badge, your graphics and your award citation arrive by email. No further payment, and they remain yours permanently.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">How it works</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Four steps, start to finish.
          </h2>
        </div>

        <div className="mt-16 grid items-start gap-8 md:grid-cols-[1fr_1px_1fr_1px_1fr_1px_1fr]">
          {howItWorks.map((step, index) => (
            <Fragment key={step.number}>
              {index > 0 && <div className="h-px w-full bg-border md:h-full md:w-px" />}
              <div>
                <p className="text-sm font-semibold text-primary">{step.number}</p>
                <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

const positions = [
  {
    lead: "One award, one standard.",
    body: `There are no subcategories. A winner is a ${AWARD_YEAR} Entrepreneur Award winner — not the winner of a narrow category that needs explaining every time it is mentioned.`,
  },
  {
    lead: "Assessed on the work, not the application.",
    body: "Three short questions, and no twenty-page submission. We are reading what was built, not how well it has been written up.",
  },
  {
    lead: "A decision either way, with the reason.",
    body: "Within five business days, whether an entry is selected or not. Most awards never tell you why.",
  },
  {
    lead: "Priced in full, upfront.",
    body: "Entry is $129.90 and it is the only compulsory cost. A winner's badge, graphics and citation are never charged for. Winners are separately offered one optional extra, which changes nothing about the award. The complete pricing is set out on our FAQ.",
  },
];

function OurPosition() {
  return (
    <section id="plain-terms" className="border-t border-border bg-secondary/30 py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Plain terms</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            What you can rely on.
          </h2>
        </div>

        <div className="mt-16 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {positions.map((item) => (
            <div key={item.lead} className="border-l-2 border-primary pl-5">
              <p className="text-base font-semibold">{item.lead}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-10">
          <div className="flex justify-center">
            <Button asChild size="lg" className="min-w-48">
              <a href="#submit">
                Enter now <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
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

