import { useEffect, useId, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitHubSpotLead } from "@/lib/hubspot.functions";
import { cn } from "@/lib/utils";
import {
  ENTRY_CATEGORIES,
  INDUSTRIES,
  SAVED_ENTRY_KEY,
  hiddenEntryFields,
  isCategoryValue,
  normalizeProfileUrl,
  orderCategories,
  paidCount,
  submitLabel,
  totalLine,
  type SavedEntry,
} from "@/content/entry-categories";

type Fields = {
  firstname: string;
  lastname: string;
  company: string;
  email: string;
  linkedin_or_profile_url: string;
  ea_industry: string;
  ea_industry_other: string;
  what_do_you_do: string;
  standout_achievement: string;
  why_exceptional: string;
};

const EMPTY: Fields = {
  firstname: "",
  lastname: "",
  company: "",
  email: "",
  linkedin_or_profile_url: "",
  ea_industry: "",
  ea_industry_other: "",
  what_do_you_do: "",
  standout_achievement: "",
  why_exceptional: "",
};

function readCookie(name: string) {
  return document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

const SELECT_CLASS =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm";

function Field({ id, label, required, helper, children }: { id: string; label: string; required?: boolean; helper?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {required ? <span className="text-destructive"> *</span> : <span className="font-normal text-muted-foreground"> (optional)</span>}
      </Label>
      {helper}
      {children}
    </div>
  );
}

export function EntryForm() {
  const uid = useId();
  const navigate = useNavigate();
  const submitLead = useServerFn(submitHubSpotLead);
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [selected, setSelected] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Category pages link to /?category=<value>#submit.
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("category");
    if (!isCategoryValue(value)) return;
    setSelected((prev) => (prev.includes(value) ? prev : [...prev, value]));
    requestAnimationFrame(() => document.getElementById("submit")?.scrollIntoView());
  }, []);

  const set = (name: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFields((f) => ({ ...f, [name]: e.target.value }));

  const toggle = (value: string, checked: boolean) => {
    setCategoryError(false);
    setSelected((prev) => (checked ? [...prev, value] : prev.filter((v) => v !== value)));
    if (!checked) {
      const field = ENTRY_CATEGORIES.find((c) => c.value === value)?.question?.field;
      if (field) setAnswers((a) => { const next = { ...a }; delete next[field]; return next; });
    }
  };

  const ordered = orderCategories(selected);
  const total = totalLine(selected);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    if (selected.length === 0) {
      setCategoryError(true);
      document.getElementById(`${uid}-categories`)?.focus();
      return;
    }
    if (!e.currentTarget.reportValidity()) return;

    const pairs: Array<{ name: string; value: string }> = [];
    const push = (name: string, value: string) => {
      const v = value.trim();
      if (v) pairs.push({ name, value: v });
    };
    push("firstname", fields.firstname);
    push("lastname", fields.lastname);
    push("0-2/name", fields.company);
    push("email", fields.email);
    push("linkedin_or_profile_url", normalizeProfileUrl(fields.linkedin_or_profile_url));
    push("ea_industry", fields.ea_industry);
    if (fields.ea_industry === "other") push("ea_industry_other", fields.ea_industry_other);
    push("ea_categories", ordered.map((c) => c.value).join(";"));
    push("what_do_you_do", fields.what_do_you_do);
    push("standout_achievement", fields.standout_achievement);
    push("why_exceptional", fields.why_exceptional);
    ordered.forEach((c) => c.question && push(c.question.field, answers[c.question.field] ?? ""));
    const hidden = hiddenEntryFields(selected);
    Object.entries(hidden).forEach(([name, value]) => pairs.push({ name, value }));

    const hutk = readCookie("hubspotutk");
    setSubmitting(true);
    setFormError(null);
    try {
      const result = await submitLead({
        data: {
          submittedAt: Date.now(),
          fields: pairs,
          context: {
            ...(hutk ? { hutk: decodeURIComponent(hutk) } : {}),
            pageUri: window.location.href.split("#")[0] ?? window.location.href,
            pageName: document.title,
            ...(document.referrer ? { referrer: document.referrer } : {}),
          },
        },
      });
      if (!result.ok) throw new Error(`HubSpot submission failed [${result.status}]`);
      const paid = paidCount(selected);
      const saved: SavedEntry = { firstName: fields.firstname.trim(), email: fields.email.trim(), categories: ordered.map((c) => c.value), paidCount: paid };
      try {
        sessionStorage.setItem(SAVED_ENTRY_KEY, JSON.stringify(saved));
      } catch {
        // Storage can be blocked; /complete shows a fallback.
      }
      navigate({ to: paid > 0 ? "/complete" : "/thank-you" });
    } catch (error) {
      console.error("HubSpot server-side submission failed", error);
      setFormError("Something went wrong submitting your entry. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <Card className="mt-12 p-6 sm:p-8 md:p-10">
      <form onSubmit={onSubmit} noValidate={false} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id={`${uid}-fn`} label="First name" required>
            <Input id={`${uid}-fn`} name="firstname" autoComplete="given-name" required value={fields.firstname} onChange={set("firstname")} />
          </Field>
          <Field id={`${uid}-ln`} label="Last name" required>
            <Input id={`${uid}-ln`} name="lastname" autoComplete="family-name" required value={fields.lastname} onChange={set("lastname")} />
          </Field>
        </div>
        <Field id={`${uid}-co`} label="Company name">
          <Input id={`${uid}-co`} name="company" autoComplete="organization" maxLength={200} value={fields.company} onChange={set("company")} />
        </Field>
        <Field id={`${uid}-em`} label="Email" required>
          <Input id={`${uid}-em`} type="email" name="email" autoComplete="email" inputMode="email" required maxLength={255} value={fields.email} onChange={set("email")} />
        </Field>
        <Field id={`${uid}-url`} label="LinkedIn or website/profile URL" required>
          <Input id={`${uid}-url`} type="text" name="linkedin_or_profile_url" inputMode="url" placeholder="https://" required maxLength={500} pattern="[^\s]+\.[^\s]+" title="Enter a web address such as linkedin.com/in/name" value={fields.linkedin_or_profile_url} onChange={set("linkedin_or_profile_url")} />
        </Field>
        <Field id={`${uid}-ind`} label="Industry" required>
          <select id={`${uid}-ind`} name="ea_industry" required className={SELECT_CLASS} value={fields.ea_industry} onChange={set("ea_industry")}>
            <option value="" disabled>Choose your industry</option>
            {INDUSTRIES.map((i) => (
              <option key={i.value} value={i.value}>{i.label}</option>
            ))}
          </select>
        </Field>
        {fields.ea_industry === "other" && (
          <Field id={`${uid}-indo`} label="Your industry" required>
            <Input id={`${uid}-indo`} name="ea_industry_other" required maxLength={200} value={fields.ea_industry_other} onChange={set("ea_industry_other")} />
          </Field>
        )}

        <fieldset
          id={`${uid}-categories`}
          tabIndex={-1}
          aria-describedby={`${uid}-cat-help${categoryError ? ` ${uid}-cat-err` : ""}`}
          className="space-y-3 pt-2 focus:outline-none"
        >
          <legend className="text-lg font-semibold">Choose your categories<span className="text-destructive"> *</span></legend>
          <p id={`${uid}-cat-help`} className="text-sm text-muted-foreground">Choose as many as fit. Each one is judged separately.</p>
          <div className="space-y-3">
            {ENTRY_CATEGORIES.map((c) => {
              const checked = selected.includes(c.value);
              const id = `${uid}-cat-${c.value}`;
              return (
                <label
                  key={c.value}
                  htmlFor={id}
                  className={cn(
                    "flex min-h-11 cursor-pointer items-start gap-3 rounded-lg border bg-background p-4 transition-colors focus-within:ring-2 focus-within:ring-ring",
                    checked ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
                    c.free && "mt-6",
                  )}
                >
                  <input
                    id={id}
                    type="checkbox"
                    name="ea_categories"
                    value={c.value}
                    checked={checked}
                    onChange={(e) => toggle(c.value, e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 accent-primary"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-col items-start gap-y-0.5 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-3">
                      <span className="font-medium text-foreground">{c.name}</span>
                      <span className="text-sm font-medium text-foreground">{c.free ? "Free" : "US$129.90"}</span>
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">{c.line}</span>
                  </span>
                </label>
              );
            })}
          </div>
          {categoryError && (
            <p id={`${uid}-cat-err`} role="alert" className="text-sm font-medium text-destructive">Choose at least one category.</p>
          )}
        </fieldset>

        <p className="pt-2 text-sm text-muted-foreground">These answers count for every category you choose. For Entrepreneur of Distinction, they are all we need.</p>
        <Field id={`${uid}-q1`} label="What do you/your business do?" required>
          <Textarea id={`${uid}-q1`} name="what_do_you_do" required rows={4} maxLength={5000} value={fields.what_do_you_do} onChange={set("what_do_you_do")} />
        </Field>
        <Field id={`${uid}-q2`} label="What's your standout achievement?" required>
          <Textarea id={`${uid}-q2`} name="standout_achievement" required rows={4} maxLength={5000} value={fields.standout_achievement} onChange={set("standout_achievement")} />
        </Field>
        <Field id={`${uid}-q3`} label="Why is this exceptional?" required>
          <Textarea id={`${uid}-q3`} name="why_exceptional" required rows={4} maxLength={5000} value={fields.why_exceptional} onChange={set("why_exceptional")} />
        </Field>

        {ordered.map((c) => {
          if (!c.question) return null;
          const q = c.question;
          const id = `${uid}-${q.field}`;
          return (
            <Field
              key={q.field}
              id={id}
              label={c.name}
              required
              helper={
                <div id={`${id}-help`} className="space-y-1 text-sm text-muted-foreground">
                  <p>{q.helper}</p>
                  {q.limit && <p>{q.limit}</p>}
                </div>
              }
            >
              <Textarea
                id={id}
                name={q.field}
                required
                rows={4}
                maxLength={5000}
                aria-describedby={`${id}-help`}
                value={answers[q.field] ?? ""}
                onChange={(e) => setAnswers((a) => ({ ...a, [q.field]: e.target.value }))}
              />
            </Field>
          );
        })}

        <div className="space-y-4 pt-2">
          {total && <p className="text-base font-medium text-foreground" aria-live="polite">{total}</p>}
          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitLabel(selected, submitting)}
          </Button>
          {formError && (
            <p className="text-center text-sm font-medium text-destructive" role="alert">{formError}</p>
          )}
          <p className="text-sm text-foreground">
            By submitting you agree to the{" "}
            <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
              Terms and Conditions
            </a>
            .
          </p>
          <p className="text-center text-sm text-muted-foreground">We reply to every entry either way, within five business days.</p>
        </div>
      </form>
    </Card>
  );
}
