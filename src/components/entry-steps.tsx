import { useEffect, useId, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Check } from "lucide-react";
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
  amountDue,
  categoryAnswersText,
  checkoutUrl,
  displayName,
  hiddenEntryFields,
  normalizeProfileUrl,
  orderCategories,
  paidCount,
  type SavedEntry,
} from "@/content/entry-categories";

// Four-step version of the homepage entry form for /homepage-v2. Submission
// payload matches EntryForm, plus ea_category_answers.

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

const STEPS = ["About you", "Categories", "Your achievement", "Review"] as const;
const PROGRESS_KEY = "ea-entry-steps-v2";
const MAIN_CATEGORIES = ENTRY_CATEGORIES.filter((c) => !c.free);
const FREE_CATEGORIES = ENTRY_CATEGORIES.filter((c) => c.free);
const WINNER_FILES = [
  "A certificate with your title",
  "LinkedIn banner, square post and story",
  "Website badge and email signature",
  "A written assessment of your entry",
];
const CATEGORY_LINES: Record<string, string> = {
  "entrepreneur-of-distinction": "For founders who stand out in their industry. You are judged against others in the industry you chose in step 1.",
  "high-growth-founder": "At least two years of trading and measurable growth over the last 12 months.",
  innovator: "A new product, service or approach that is already delivering results.",
  "turnaround-leader": "You led a struggling business back to stronger performance.",
  "employer-of-choice": "At least five employees, strong staff retention and a positive workplace.",
  "impact-leader": "Measurable benefits to communities, society or the environment.",
  "emerging-founder": "For founders whose business began trading in the last three years and already has paying customers. Same criteria and the same winner files.",
};

type Progress = { step: number; fields: Fields; selected: string[]; answers: Record<string, string> };
type Done = { firstName: string; email: string; names: string[]; free: true };
type Errors = Partial<Record<string, string>>;

function readCookie(name: string) {
  return document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

const SELECT_CLASS =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm";

function Field({ id, label, required, helper, error, children }: { id: string; label: string; required?: boolean; helper?: React.ReactNode; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {required ? <span className="text-destructive"> *</span> : <span className="font-normal text-muted-foreground"> (optional)</span>}
      </Label>
      {helper}
      {children}
      {error && <p id={`${id}-err`} className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
}

function industryLabel(fields: Fields) {
  if (fields.ea_industry === "other") return fields.ea_industry_other.trim() || "Other";
  return INDUSTRIES.find((i) => i.value === fields.ea_industry)?.label ?? "";
}

function winLine(value: string, fields: Fields) {
  if (value === "entrepreneur-of-distinction") {
    const known = fields.ea_industry && fields.ea_industry !== "other";
    const industry = known ? `in ${industryLabel(fields).toLowerCase()}` : "in your industry";
    return `Named a 2026 Pacesetter ${industry}`;
  }
  return `Named a 2026 ${displayName(value)} by the Entrepreneur Awards`;
}

function PanelBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <h3 className="text-base font-semibold">{title}</h3>
      <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

export function EntrySteps() {
  const uid = useId();
  const submitLead = useServerFn(submitHubSpotLead);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const [step, setStep] = useState(0);
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [selected, setSelected] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Errors>({});
  const [restored, setRestored] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [done, setDone] = useState<Done | null>(null);

  // Saved progress lives in localStorage, so it is read after hydration.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(PROGRESS_KEY);
      if (raw) {
        const p = JSON.parse(raw) as Partial<Progress>;
        const hasInput = Object.values(p.fields ?? {}).some((v) => typeof v === "string" && v.trim()) || (p.selected?.length ?? 0) > 0;
        if (hasInput) {
          setFields({ ...EMPTY, ...p.fields });
          setSelected((p.selected ?? []).filter((v) => ENTRY_CATEGORIES.some((c) => c.value === v)));
          setAnswers(p.answers ?? {});
          setStep(Math.min(Math.max(p.step ?? 0, 0), 3));
          setRestored(true);
        }
      }
    } catch {
      // Unreadable storage: start fresh.
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded || done) return;
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify({ step, fields, selected, answers } satisfies Progress));
    } catch {
      // Storage can be blocked; progress just isn't kept.
    }
  }, [loaded, done, step, fields, selected, answers]);

  // Only after a user-driven step change: scroll to the section top and focus the heading.
  useEffect(() => {
    if (!moved.current) return;
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    headingRef.current?.focus({ preventScroll: true });
  }, [step, done]);

  const go = (next: number) => {
    moved.current = true;
    setErrors({});
    setFormError(null);
    setStep(next);
  };

  const set = (name: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFields((f) => ({ ...f, [name]: e.target.value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const toggle = (value: string, checked: boolean) => {
    setErrors((er) => ({ ...er, categories: undefined }));
    setSelected((prev) => (checked ? [...prev, value] : prev.filter((v) => v !== value)));
  };

  const ordered = orderCategories(selected);
  const questioned = ordered.filter((c) => c.question);
  const paid = paidCount(selected);
  const total = amountDue(paid);

  const fail = (found: Errors) => {
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) requestAnimationFrame(() => document.getElementById(`${uid}-${first}`)?.focus());
    return false;
  };

  const validate = (s: number) => {
    const found: Errors = {};
    if (s === 0) {
      if (!fields.firstname.trim()) found["firstname"] = "Enter your first name.";
      if (!fields.lastname.trim()) found["lastname"] = "Enter your last name.";
      if (!fields.email.trim()) found["email"] = "Enter your email address.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) found["email"] = "Enter an email address such as name@company.com.";
      const url = fields.linkedin_or_profile_url.trim();
      if (!url) found["linkedin_or_profile_url"] = "Enter your LinkedIn or website address.";
      else if (!/^[^\s]+\.[^\s]+$/.test(url)) found["linkedin_or_profile_url"] = "Enter a web address such as linkedin.com/in/name.";
      if (!fields.ea_industry) found["ea_industry"] = "Choose your industry.";
      if (fields.ea_industry === "other" && !fields.ea_industry_other.trim()) found["ea_industry_other"] = "Tell us your industry.";
    }
    if (s === 1 && selected.length === 0) found["categories"] = "Choose at least one category to continue.";
    if (s === 2) {
      if (!fields.what_do_you_do.trim()) found["what_do_you_do"] = "Tell us what you or your business do.";
      if (!fields.standout_achievement.trim()) found["standout_achievement"] = "Tell us your standout achievement.";
      if (!fields.why_exceptional.trim()) found["why_exceptional"] = "Tell us why this is exceptional.";
      questioned.forEach((c) => {
        const f = c.question!.field;
        if (!(answers[f] ?? "").trim()) found[f] = `Answer the ${displayName(c.value)} question.`;
      });
    }
    return Object.keys(found).length ? fail(found) : true;
  };

  const next = () => {
    if (validate(step)) go(step + 1);
  };

  const submit = async () => {
    if (submitting) return;
    for (const s of [0, 1, 2]) {
      if (!validate(s)) return go(s);
    }
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
    Object.entries(hiddenEntryFields(selected)).forEach(([name, value]) => pairs.push({ name, value }));
    push("ea_category_answers", categoryAnswersText(selected, answers));

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
      const email = fields.email.trim();
      const saved: SavedEntry = { firstName: fields.firstname.trim(), email, categories: ordered.map((c) => c.value), paidCount: paid };
      try {
        sessionStorage.setItem(SAVED_ENTRY_KEY, JSON.stringify(saved));
        localStorage.removeItem(PROGRESS_KEY);
      } catch {
        // Storage can be blocked.
      }
      if (paid > 0) {
        window.location.href = checkoutUrl(paid, email);
        return;
      }
      moved.current = true;
      setDone({ firstName: saved.firstName, email, names: ordered.map((c) => displayName(c.value)), free: true });
    } catch (error) {
      console.error("HubSpot server-side submission failed", error);
      setFormError("Something went wrong sending your entry. Your answers are kept, so please try again.");
      setSubmitting(false);
    }
  };

  const describedBy = (name: string) => (errors[name] ? `${uid}-${name}-err` : undefined);
  const headingClass = "text-2xl font-semibold tracking-tight focus:outline-none";

  const yourEntry = (withChange: boolean) => (
    <PanelBox title="Your entry">
      {ordered.length ? (
        <ul className="space-y-1 text-foreground" aria-live="polite">
          {ordered.map((c) => <li key={c.value}>{displayName(c.value)}</li>)}
        </ul>
      ) : (
        <p aria-live="polite">No categories chosen yet.</p>
      )}
      <p className="mt-3">You'll see the total before you pay.</p>
      {withChange && (
        <button type="button" onClick={() => go(1)} className="mt-3 min-h-11 font-medium text-primary underline underline-offset-4">
          Change categories
        </button>
      )}
    </PanelBox>
  );

  const categoryCard = (c: (typeof ENTRY_CATEGORIES)[number]) => {
    const checked = selected.includes(c.value);
    const id = `${uid}-cat-${c.value}`;
    return (
      <label
        key={c.value}
        htmlFor={id}
        className={cn(
          "flex cursor-pointer items-start gap-3 rounded-lg border bg-background p-4 transition-colors focus-within:ring-2 focus-within:ring-ring",
          checked ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
        )}
      >
        <input id={id} type="checkbox" value={c.value} checked={checked} onChange={(e) => toggle(c.value, e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-primary" />
        <span className="min-w-0 flex-1">
          <span className="block font-medium text-foreground">{displayName(c.value)}</span>
          <span className="mt-1 block text-sm text-muted-foreground">{CATEGORY_LINES[c.value]}</span>
          <span className="mt-2 block text-sm text-foreground">If you win: "{winLine(c.value, fields)}"</span>
        </span>
      </label>
    );
  };

  const footer = (back: boolean, label: string, onClick: () => void) => (
    <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
      {back ? <Button type="button" variant="outline" size="lg" onClick={() => go(step - 1)}>Back</Button> : <span />}
      <Button type="button" size="lg" onClick={onClick}>{label}</Button>
    </div>
  );

  let card: React.ReactNode;
  let panel: React.ReactNode;

  if (done) {
    card = (
      <div className="space-y-6">
        <h3 ref={headingRef} tabIndex={-1} className={headingClass}>Your entry is in</h3>
        <p className="text-base leading-relaxed text-foreground">Thanks, {done.firstName}. We've received your entry for {done.names.join(", ")}.</p>
        <p className="text-base leading-relaxed text-muted-foreground">You can also enter another category at any time. Each one is judged separately.</p>
        <div>
          <h4 className="text-base font-semibold">What happens next</h4>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-base text-muted-foreground">
            <li>A confirmation is on its way to {done.email}.</li>
            <li>Each category is judged separately, on the same three criteria.</li>
            <li>We reply within five business days, either way.</li>
          </ol>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg"><a href="/winners">See this year's winners</a></Button>
          <Button asChild size="lg" variant="outline"><a href="/criteria">Read the criteria</a></Button>
        </div>
      </div>
    );
  } else if (step === 0) {
    card = (
      <div className="space-y-6">
        <div>
          <h3 ref={headingRef} tabIndex={-1} className={headingClass}>About you</h3>
          <p className="mt-2 text-base text-muted-foreground">Start with who you are. You choose your categories in the next step.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id={`${uid}-firstname`} label="First name" required error={errors["firstname"]}>
            <Input id={`${uid}-firstname`} autoComplete="given-name" aria-invalid={!!errors["firstname"]} aria-describedby={describedBy("firstname")} value={fields.firstname} onChange={set("firstname")} />
          </Field>
          <Field id={`${uid}-lastname`} label="Last name" required error={errors["lastname"]}>
            <Input id={`${uid}-lastname`} autoComplete="family-name" aria-invalid={!!errors["lastname"]} aria-describedby={describedBy("lastname")} value={fields.lastname} onChange={set("lastname")} />
          </Field>
        </div>
        <Field id={`${uid}-email`} label="Email" required error={errors["email"]}>
          <Input id={`${uid}-email`} type="email" autoComplete="email" inputMode="email" maxLength={255} aria-invalid={!!errors["email"]} aria-describedby={describedBy("email")} value={fields.email} onChange={set("email")} />
        </Field>
        <Field id={`${uid}-company`} label="Company name">
          <Input id={`${uid}-company`} autoComplete="organization" maxLength={200} value={fields.company} onChange={set("company")} />
        </Field>
        <Field id={`${uid}-linkedin_or_profile_url`} label="LinkedIn or website/profile URL" required error={errors["linkedin_or_profile_url"]}>
          <Input id={`${uid}-linkedin_or_profile_url`} type="text" inputMode="url" placeholder="https://" maxLength={500} aria-invalid={!!errors["linkedin_or_profile_url"]} aria-describedby={describedBy("linkedin_or_profile_url")} value={fields.linkedin_or_profile_url} onChange={set("linkedin_or_profile_url")} />
        </Field>
        <Field id={`${uid}-ea_industry`} label="Industry" required error={errors["ea_industry"]}>
          <select id={`${uid}-ea_industry`} className={SELECT_CLASS} aria-invalid={!!errors["ea_industry"]} aria-describedby={describedBy("ea_industry")} value={fields.ea_industry} onChange={set("ea_industry")}>
            <option value="" disabled>Choose your industry</option>
            {INDUSTRIES.map((i) => <option key={i.value} value={i.value}>{i.label}</option>)}
          </select>
        </Field>
        {fields.ea_industry === "other" && (
          <Field id={`${uid}-ea_industry_other`} label="Your industry" required error={errors["ea_industry_other"]}>
            <Input id={`${uid}-ea_industry_other`} maxLength={200} aria-invalid={!!errors["ea_industry_other"]} aria-describedby={describedBy("ea_industry_other")} value={fields.ea_industry_other} onChange={set("ea_industry_other")} />
          </Field>
        )}
        {footer(false, "Continue to categories", next)}
      </div>
    );
    panel = (
      <PanelBox title="How it works">
        <ol className="list-decimal space-y-2 pl-5">
          <li><span className="font-medium text-foreground">About you.</span> Your name and how to reach you.</li>
          <li><span className="font-medium text-foreground">Categories.</span> Choose the ones that fit what you've achieved.</li>
          <li><span className="font-medium text-foreground">Your achievement.</span> Three short questions, plus one for each category that needs it.</li>
          <li><span className="font-medium text-foreground">Review.</span> Check your entry and the total, then pay or submit.</li>
        </ol>
        <p className="mt-4">We reply to every entry either way, within five business days.</p>
      </PanelBox>
    );
  } else if (step === 1) {
    card = (
      <div className="space-y-6">
        <div>
          <h3 ref={headingRef} tabIndex={-1} className={headingClass}>Choose your categories</h3>
          <p className="mt-2 text-base text-muted-foreground">Each category is judged separately, so enter as many as fit.</p>
        </div>
        <fieldset id={`${uid}-categories`} tabIndex={-1} aria-describedby={describedBy("categories")} className="space-y-3 focus:outline-none">
          <legend className="sr-only">Categories</legend>
          {MAIN_CATEGORIES.map(categoryCard)}
          <h4 className="pt-4 text-sm font-semibold text-foreground">For early-stage founders</h4>
          {FREE_CATEGORIES.map(categoryCard)}
        </fieldset>
        {errors["categories"] && <p id={`${uid}-categories-err`} role="alert" className="text-sm font-medium text-destructive">{errors["categories"]}</p>}
        <div className="hidden md:block">{footer(true, "Continue", next)}</div>
        <div className="md:hidden"><Button type="button" variant="outline" size="lg" className="w-full" onClick={() => go(0)}>Back</Button></div>
      </div>
    );
    panel = (
      <div className="space-y-6">
        {yourEntry(false)}
        <PanelBox title="Every winner gets">
          <ul className="space-y-2">
            {WINNER_FILES.map((f) => (
              <li key={f} className="flex gap-2 text-foreground"><Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{f}</li>
            ))}
          </ul>
          <p className="mt-3">The same files for every category, with the title you won on them.</p>
        </PanelBox>
      </div>
    );
  } else if (step === 2) {
    const big = (name: "what_do_you_do" | "standout_achievement" | "why_exceptional", label: string, placeholder: string) => (
      <Field id={`${uid}-${name}`} label={label} required error={errors[name]}>
        <Textarea id={`${uid}-${name}`} rows={5} maxLength={5000} placeholder={placeholder} aria-invalid={!!errors[name]} aria-describedby={describedBy(name)} value={fields[name]} onChange={set(name)} />
      </Field>
    );
    card = (
      <div className="space-y-6">
        <div>
          <h3 ref={headingRef} tabIndex={-1} className={headingClass}>Tell us what you've built</h3>
          <p className="mt-2 text-base text-muted-foreground">These three answers count for every category you chose. A few sentences each is enough.</p>
        </div>
        {big("what_do_you_do", "What do you or your business do?", "What you sell, who buys it and where you operate.")}
        {big("standout_achievement", "What's your standout achievement?", "One result, with the numbers behind it.")}
        {big("why_exceptional", "Why is this exceptional?", "What makes it hard to do, or rare in your field.")}
        {questioned.length > 0 && (
          <div className="space-y-6 rounded-lg border border-border bg-surface p-5 sm:p-6">
            <div>
              <h4 className="text-base font-semibold">One more question for each category</h4>
              <p className="mt-1 text-sm text-muted-foreground">These change with the categories you chose in step 2.</p>
            </div>
            {questioned.map((c) => {
              const q = c.question!;
              const id = `${uid}-${q.field}`;
              return (
                <Field key={q.field} id={id} label={displayName(c.value)} required error={errors[q.field]} helper={<p id={`${id}-help`} className="text-sm text-muted-foreground">{q.helper}</p>}>
                  <Textarea
                    id={id}
                    rows={4}
                    maxLength={5000}
                    aria-invalid={!!errors[q.field]}
                    aria-describedby={[`${id}-help`, describedBy(q.field)].filter(Boolean).join(" ")}
                    value={answers[q.field] ?? ""}
                    onChange={(e) => {
                      setAnswers((a) => ({ ...a, [q.field]: e.target.value }));
                      setErrors((er) => ({ ...er, [q.field]: undefined }));
                    }}
                  />
                </Field>
              );
            })}
          </div>
        )}
        {footer(true, "Continue to review", next)}
      </div>
    );
    panel = yourEntry(true);
  } else {
    const row = (title: string, to: number, body: React.ReactNode) => (
      <div className="flex items-start justify-between gap-4 border-t border-border py-5">
        <div className="min-w-0">
          <h4 className="text-sm font-semibold">{title}</h4>
          <div className="mt-2 text-sm text-muted-foreground">{body}</div>
        </div>
        <button type="button" onClick={() => go(to)} className="min-h-11 shrink-0 text-sm font-medium text-primary underline underline-offset-4" aria-label={`Edit ${title.toLowerCase()}`}>Edit</button>
      </div>
    );
    const terms = (
      <>By submitting you agree to the <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Terms and Conditions</a>.</>
    );
    card = (
      <div className="space-y-6">
        <div>
          <h3 ref={headingRef} tabIndex={-1} className={headingClass}>Thanks, {fields.firstname.trim()}. Your entry is ready.</h3>
          <p className="mt-2 text-base text-muted-foreground">
            {paid > 0 ? "Check it over, then pay to send it to the judges." : "Check it over, then send it to the judges. There's nothing to pay."}
          </p>
        </div>
        <div>
          {row("About you", 0, (
            <>
              <p className="text-foreground">{fields.firstname.trim()} {fields.lastname.trim()}</p>
              {fields.company.trim() && <p>{fields.company.trim()}</p>}
              <p className="break-all">{fields.email.trim()}</p>
              <p>{industryLabel(fields)}</p>
            </>
          ))}
          {row("Your categories", 1, (
            <ul className="space-y-1">
              {ordered.map((c) => (
                <li key={c.value} className="flex justify-between gap-6 text-foreground">
                  <span>{displayName(c.value)}</span>
                  <span className="tabular-nums">{c.free ? "Free" : "US$129.90"}</span>
                </li>
              ))}
            </ul>
          ))}
          {row("Your answers", 2, questioned.length ? "Three main answers, plus one for each category you chose." : "Three main answers.")}
        </div>
        <div className="space-y-4 border-t border-border pt-6">
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button type="button" variant="outline" size="lg" onClick={() => go(2)} disabled={submitting}>Back</Button>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              {paid > 0 && <p className="text-base font-semibold tabular-nums">Total US${total}</p>}
              <Button type="button" size="lg" onClick={submit} disabled={submitting}>
                {submitting ? "Sending..." : paid > 0 ? `Pay US$${total}` : "Submit my entry"}
              </Button>
            </div>
          </div>
          {formError && <p className="text-sm font-medium text-destructive" role="alert">{formError}</p>}
          <p className="text-sm text-muted-foreground">
            {paid > 0 && "Paid once. Nothing is recurring. You'll pay on Stripe's secure checkout, then come straight back here. "}
            {terms}
          </p>
        </div>
      </div>
    );
    panel = (
      <PanelBox title="What happens next">
        <ol className="list-decimal space-y-2 pl-5">
          {paid > 0 ? (
            <>
              <li>You pay US${total} on Stripe. Nothing is recurring.</li>
              <li>We email you a confirmation with your categories.</li>
              <li>Each category is judged separately. We reply within five business days, either way.</li>
            </>
          ) : (
            <>
              <li>We email you a confirmation.</li>
              <li>Rising Star is judged on the same criteria as every other category.</li>
              <li>We reply within five business days, either way.</li>
            </>
          )}
        </ol>
      </PanelBox>
    );
  }

  const shown = done ? 4 : step + 1;
  const count = selected.length;

  return (
    <section id="submit" ref={sectionRef} className="scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Enter the 2026 Awards.</h2>
          <p className="mt-5 text-lg leading-relaxed text-intro-foreground md:text-xl">
            Four short steps. We reply to every entry either way, within five business days.
          </p>
        </div>

        {!done && (
          <div className="mx-auto mt-12 max-w-5xl">
            <p className="text-sm font-medium text-foreground" aria-live="polite">Step {shown} of 4</p>
            <div className="mt-3 grid grid-cols-4 gap-2" aria-hidden>
              {STEPS.map((s, i) => (
                <span key={s} className={cn("h-1.5 rounded-full", i < shown ? "bg-primary" : "bg-border")} />
              ))}
            </div>
            <ol className="mt-3 grid grid-cols-4 gap-2 text-xs text-muted-foreground sm:text-sm">
              {STEPS.map((s, i) => (
                <li key={s} className={cn(i === step && "font-medium text-foreground")} aria-current={i === step ? "step" : undefined}>{s}</li>
              ))}
            </ol>
          </div>
        )}

        <div className={cn("mx-auto max-w-5xl", done ? "mt-12 max-w-3xl" : "mt-8")}>
          {restored && !done && <p className="mb-4 text-sm text-foreground">Welcome back. We kept your answers.</p>}
          <div className={cn("grid gap-8", !done && "md:grid-cols-[minmax(0,1fr)_18rem] lg:grid-cols-[minmax(0,1fr)_20rem]")}>
            <Card className={cn("min-w-0 p-6 sm:p-8 md:p-10", step === 1 && !done && "mb-24 md:mb-0")}>{card}</Card>
            {!done && <aside className="min-w-0 md:sticky md:top-24 md:self-start">{panel}</aside>}
          </div>
        </div>
      </div>

      {step === 1 && !done && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background px-6 py-3 md:hidden">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium" aria-live="polite">{count} {count === 1 ? "category" : "categories"} chosen</p>
            <Button type="button" onClick={next}>Continue</Button>
          </div>
        </div>
      )}
    </section>
  );
}
