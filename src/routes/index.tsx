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
import { Card } from "@/components/ui/card";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { submitHubSpotLead } from "@/lib/hubspot.functions";

import { Check, ArrowRight, Linkedin, Mail, Twitter, Quote, TrendingUp, ExternalLink, Newspaper } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const tiers = [
  {
    name: "Digital",
    tagline: "Prove it online — recognition you can share the same day.",
    features: [
      "Official 2026 Winner badge (web + email)",
      "Personalised winner certificate (PDF)",
      "Permanent profile in the Winners Directory",
      "LinkedIn announcement kit (post + banner)",
      "Right to use the Entrepreneur Awards mark",
    ],
  },
  {
    name: "Signature",
    tagline: "The winner experience most founders choose.",
    highlighted: true,
    features: [
      "Everything in Digital",
      "Engraved crystal trophy, shipped worldwide",
      "Your founder story published on our site",
      "Press release sent to 400+ business outlets",
      "Priority judging — results in 14 days",
      "Featured in the Winners email (28k founders)",
    ],
  },
  {
    name: "Headline",
    tagline: "Become the founder story of the year.",
    features: [
      "Everything in Signature",
      "Editorial photo + 60-sec video feature",
      "Homepage placement for 30 days",
      "Keynote slot at the annual Winners gala",
      "Two 1:1 sessions with a past Headline winner",
      "Dedicated PR manager for your launch week",
    ],
  },
];

const testimonials = [
  {
    quote:
      "We closed our seed round six weeks after winning. Investors brought up the award in the first meeting.",
    name: "Amara Okafor",
    role: "Founder, Northline — 2024 Signature Winner",
  },
  {
    quote:
      "The only award I've entered that judged the founder, not just the metrics. Worth every dollar.",
    name: "Julian Reyes",
    role: "Founder & CEO, Parallel — 2023 Headline Winner",
  },
  {
    quote:
      "The story feature drove 40+ inbound customers in the first month. Best marketing spend of the year.",
    name: "Priya Shah",
    role: "Co-founder, Kindred Labs — 2024 Signature Winner",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteNav />
      <main>
        <Hero />
        <Tiers />
        <Testimonials />
        <WinnerOutcomes />
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
          2026 entries close March 31 — judged in 14 days
        </span>
        <h1 className="mt-8 whitespace-nowrap text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
          For the person who <span className="text-primary">built it.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Win the award founders actually respect. Get a trophy, press coverage,
          and a story that opens doors — from judges who've built companies themselves.
          One entry. Five minutes. Real recognition.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="min-w-48">
            <a href="#submit">
              Enter in 5 minutes <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <a href="#tiers">See what winners get</a>
          </Button>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs uppercase tracking-widest text-muted-foreground">
          <span>1,200+ Founders Recognised</span>
          <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />
          <span>Featured in TechCrunch &amp; Forbes</span>
          <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />
          <span>Judged by Founders, Not Marketers</span>
        </div>
      </div>
    </section>
  );
}

function Tiers() {
  return (
    <section id="tiers" className="border-t border-border bg-secondary/30 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">What winners receive</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Every entry wins something. You choose how loud.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Three recognition packages, each built to amplify a founder's story. Free to enter — you only receive package details if you're selected.
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative flex flex-col p-8 ${
                tier.highlighted
                  ? "border-primary shadow-lg ring-1 ring-primary/20"
                  : "border-border"
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most founders choose this
                </span>
              )}
              <h3 className="text-xl font-semibold">{tier.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{tier.tagline}</p>
              <ul className="mt-8 flex-1 space-y-3 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="text-foreground/80">{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="mt-8"
                variant={tier.highlighted ? "default" : "outline"}
              >
                <a href="#submit">Start Your Entry →</a>
              </Button>
            </Card>
          ))}
        </div>
        <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-muted-foreground">
          Package details are shared with selected entrants after review.
        </p>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Past winners</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            What winning actually did for their business.
          </h2>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="flex flex-col p-8">
              <Quote className="h-6 w-6 text-primary/40" />
              <p className="mt-4 flex-1 text-base leading-relaxed text-foreground/90">
                "{t.quote}"
              </p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <Linkedin className="h-4 w-4" /> Share on LinkedIn
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

const outcomes = [
  {
    company: "Northline",
    founder: "Amara Okafor",
    tag: "2024 Signature Winner",
    industry: "Logistics SaaS",
    metric: "$4.2M seed round",
    detail: "Closed 6 weeks post-win. Lead investor cited the award in the first meeting.",
    proofLabel: "TechCrunch coverage",
    proofUrl: "https://techcrunch.com/",
  },
  {
    company: "Parallel",
    founder: "Julian Reyes",
    tag: "2023 Headline Winner",
    industry: "Developer Tools",
    metric: "3.1× inbound demos",
    detail: "Homepage feature and press release drove sustained pipeline for 90+ days.",
    proofLabel: "Founder story",
    proofUrl: "https://www.entrepreneurawards.co/",
  },
  {
    company: "Kindred Labs",
    founder: "Priya Shah",
    tag: "2024 Signature Winner",
    industry: "Consumer Health",
    metric: "40+ inbound customers",
    detail: "First month after the story feature — best-performing marketing channel of 2024.",
    proofLabel: "Read case study",
    proofUrl: "https://www.entrepreneurawards.co/",
  },
];

const pressLogos = [
  "TechCrunch",
  "Forbes",
  "Fast Company",
  "Sifted",
  "The Information",
  "Business Insider",
];

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

function WinnerOutcomes() {
  return (
    <section id="outcomes" className="border-t border-border bg-secondary/30 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Proof, not promises</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            What winning actually returned.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Real outcomes from recent winners — funding, press, and pipeline they can point to.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {outcomes.map((o) => (
            <Card key={o.company} className="flex flex-col p-8">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {o.tag}
                </span>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {o.industry}
                </span>
              </div>
              <div className="mt-6 flex items-baseline gap-2">
                <TrendingUp className="h-5 w-5 flex-shrink-0 text-primary" />
                <p className="text-2xl font-semibold tracking-tight">{o.metric}</p>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/80">{o.detail}</p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-medium">{o.founder}</p>
                <p className="text-xs text-muted-foreground">Founder, {o.company}</p>
              </div>
              <a
                href={o.proofUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                {o.proofLabel} <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Card>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-background p-8 md:p-10">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Newspaper className="h-5 w-5 text-primary" />
              <span className="uppercase tracking-widest">Winners featured in</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {pressLogos.map((name) => (
                <span key={name} className="text-sm font-semibold tracking-tight text-foreground/70">
                  {name}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-8 grid gap-6 border-t border-border pt-8 text-center sm:grid-cols-3">
            <div>
              <p className="text-3xl font-semibold tracking-tight">1,247</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                Founders recognised since 2019
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold tracking-tight">$186M+</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                Raised by winners in 12 months after
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold tracking-tight">94%</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                Would recommend to another founder
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild size="lg">
            <a href="#submit">
              Add your name to the 2026 list <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}



function SubmissionForm() {
  const formContainerRef = useRef<HTMLDivElement>(null);
  const targetId = "hubspot-form-target";
  const navigate = useNavigate({ from: "/" });
  const submitLead = useServerFn(submitHubSpotLead);
  const [formError, setFormError] = useState<string | null>(null);

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
      if (!form.reportValidity()) return;

      form.dataset.serverSubmitting = "true";
      setSubmitButtonState(form, true);
      setFormError(null);

      try {
        const payload = buildHubSpotSubmissionPayload(form);
        await submitLead({ data: payload });
        navigate({ to: "/thank-you" });
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
            navigate({ to: "/thank-you" });
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
          <h2 className="mt-3 whitespace-nowrap text-4xl font-semibold tracking-tight md:text-5xl">
            Enter in 5 minutes. Judged in 14 days.
          </h2>
          <p className="mt-4 text-muted-foreground">
            No categories. No 20-page application. Just you and the work — that's all our founder-judges want to read.
          </p>
        </div>
        <Card className="mt-12 p-8 md:p-10">
          <div id={targetId} ref={formContainerRef} />
          {formError && (
            <p className="mt-4 text-center text-sm font-medium text-destructive" role="alert">
              {formError}
            </p>
          )}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Free to enter. You only pay if you're selected as a winner. We reply within 14 days.
          </p>
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

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} The Entrepreneur Awards. All rights reserved.</p>
        <p>For the person who built it.</p>
      </div>
    </footer>
  );
}
