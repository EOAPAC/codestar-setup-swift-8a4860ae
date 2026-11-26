import { Fragment, useEffect, useId, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  emptyTestProgress, restoreTestProgress, testSummary,
  TEST_CATEGORIES, TEST_INDUSTRIES, TEST_PROGRESS_KEY, TEST_SHARED_QUESTIONS, TEST_STEPS,
  toggleTestCategory, validateTestStep, type TestDetails,
} from "@/content/test-entry";
import "./test-entry-form.css";

const WINNER_FILES = ["A certificate with your title", "LinkedIn banner, square post and story", "Website badge and email signature", "A written assessment of your entry"];
const DETAIL_FIELDS: { key: keyof TestDetails; label: string; autoComplete: string; type: string; optional?: boolean }[] = [
  { key: "firstName", label: "First name", autoComplete: "given-name", type: "text" },
  { key: "lastName", label: "Last name", autoComplete: "family-name", type: "text" },
  { key: "email", label: "Email", autoComplete: "email", type: "email" },
  { key: "company", label: "Company name (optional)", autoComplete: "organization", type: "text", optional: true },
  { key: "profile", label: "LinkedIn profile or website", autoComplete: "url", type: "text" },
];

export function TestEntryForm() {
  const uid = useId();
  const [progress, setProgress] = useState(emptyTestProgress);
  const [loaded, setLoaded] = useState(false);
  const [restored, setRestored] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const moved = useRef(false);
  const { step, details, selected, answers, impactTitle } = progress;
  const summary = testSummary(selected);
  const categoryNames = new Intl.ListFormat("en", { style: "long", type: "conjunction" }).format(summary.categories.map((category) => category.name));
  const stepName = step === 3 && !summary.cents ? "Review your entry" : TEST_STEPS[step];

  // This test has its own storage key and never reads the live entry draft.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(TEST_PROGRESS_KEY);
      const saved = raw ? restoreTestProgress(raw) : null;
      if (saved) {
        const hasProgress = saved.step > 0 || saved.selected.length > 0 || Object.values(saved.details).some(Boolean) || Object.values(saved.answers).some(Boolean);
        if (hasProgress) { setProgress(saved); setRestored(true); }
      }
    } catch { /* The form still works when browser storage is blocked. */ }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded || done) return;
    // Avoid recreating an empty draft immediately after Start again clears it.
    const hasProgress = step > 0 || selected.length > 0 || Object.values(details).some(Boolean) || Object.values(answers).some(Boolean);
    if (!hasProgress) return;
    try { localStorage.setItem(TEST_PROGRESS_KEY, JSON.stringify(progress)); } catch { /* Storage is optional. */ }
  }, [progress, loaded, done, step, selected, details, answers]);

  useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    sectionRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
    headingRef.current?.focus({ preventScroll: true });
  }, [step, done]);

  useEffect(() => {
    const footer = footerRef.current;
    if (step !== 1 || done || !footer) return;
    // Reserve the actual fixed footer height, including wrapping and safe area.
    const observer = new ResizeObserver(() => sectionRef.current?.style.setProperty("--test-footer-height", `${footer.getBoundingClientRect().height}px`));
    observer.observe(footer);
    return () => observer.disconnect();
  }, [step, done]);

  const go = (next: number) => {
    moved.current = true;
    setErrors({});
    setProgress((previous) => ({ ...previous, step: next }));
  };
  const clearError = (key: string) => setErrors((previous) => {
    const next = { ...previous };
    delete next[key];
    return next;
  });
  const validate = (target: number) => {
    const found = validateTestStep(progress, target);
    if (!Object.keys(found).length) return true;
    setErrors(found);
    const first = Object.keys(found)[0];
    requestAnimationFrame(() => { if (first) document.getElementById(`${uid}-${first}`)?.focus(); });
    return false;
  };
  const next = () => { if (validate(step)) go(step + 1); };
  const confirm = () => {
    for (const target of [0, 1, 2]) {
      const found = validateTestStep(progress, target);
      if (Object.keys(found).length) { go(target); setErrors(found); return; }
    }
    // Deliberately no network call, checkout redirect, server function or entry save.
    moved.current = true;
    setRestored(false);
    setDone(true);
    try { localStorage.removeItem(TEST_PROGRESS_KEY); } catch { /* Storage is optional. */ }
  };
  const restart = () => {
    try { localStorage.removeItem(TEST_PROGRESS_KEY); } catch { /* Storage is optional. */ }
    moved.current = true;
    setRestored(false);
    setErrors({});
    setProgress(emptyTestProgress());
    setDone(false);
  };
  const error = (key: string) => errors[key] ? <p className="test-entry-error" id={`${uid}-${key}-error`} role="alert">{errors[key]}</p> : null;
  const inputProps = (key: string) => ({ id: `${uid}-${key}`, "aria-invalid": Boolean(errors[key]), ...(errors[key] ? { "aria-describedby": `${uid}-${key}-error` } : {}) });
  const answerBox = (id: string, label: string, help?: string) => (
    <div className="test-entry-field" key={id}>
      <label htmlFor={`${uid}-${id}`}>{label} <span aria-hidden="true">*</span></label>
      {help && <p id={`${uid}-${id}-help`} className="test-entry-helper">{help}</p>}
      <Textarea {...inputProps(id)} aria-describedby={[help ? `${uid}-${id}-help` : "", errors[id] ? `${uid}-${id}-error` : ""].filter(Boolean).join(" ")} required rows={4} value={answers[id] ?? ""} onChange={(event) => {
        setProgress((previous) => ({ ...previous, answers: { ...previous.answers, [id]: event.target.value } }));
        clearError(id);
      }} />
      {error(id)}
    </div>
  );
  const header = (title: string, intro: string) => (
    <div className="test-entry-header">
      <h3 className="test-entry-heading" ref={headingRef} tabIndex={-1}>{title}</h3>
      <p>{intro}</p>
    </div>
  );
  const action = (label: string, onClick: () => void, disabled = false) => <Button className="test-entry-action" type="button" disabled={disabled} onClick={onClick}>{label}</Button>;
  const back = () => <Button className="test-entry-action" type="button" variant="outline" onClick={() => go(step - 1)}>Back</Button>;
  const footer = (label: string, onClick: () => void, print?: React.ReactNode) => (
    <div className="test-entry-footer">
      <div className="test-entry-footer-main">{step > 0 ? back() : <span />}{action(label, onClick)}</div>
      {print && <p className="test-entry-note">{print}</p>}
    </div>
  );
  const edit = (target: number, label: string) => <Button variant="link" className="test-entry-edit" type="button" aria-label={`Edit ${label}`} onClick={() => go(target)}>Edit</Button>;

  let card: React.ReactNode;
  if (done) {
    card = <div className="test-entry-confirmation">
      <span className="test-entry-success"><Check aria-hidden="true" size={28} /></span>
      <h3 className="test-entry-heading" ref={headingRef} tabIndex={-1}>Your entry is in</h3>
      <p>{summary.cents
        ? <>Thanks, {details.firstName.trim()}. We've received your payment of {summary.amount} and your entry for {categoryNames}.</>
        : <>Thanks, {details.firstName.trim()}. We've received your entry for New Business. There's nothing to pay.</>}</p>
      <p className="test-entry-test-note">Test version: nothing was sent or charged.</p>
      <div className="test-entry-next">
        <h4>What happens next</h4>
        {summary.cents ? <ol>
          <li>A confirmation and receipt are on their way to {details.email}.</li>
          <li>{selected.includes("new") ? "Each category you entered is assessed separately. For New Business, we also check that your business started trading within the last three years and has paying customers." : "Each category you entered is assessed separately against our published criteria."}</li>
          <li>You'll hear from us within five business days, with a decision for each category.</li>
        </ol> : <ol>
          <li>A confirmation is on its way to {details.email}.</li>
          <li>We check that your business started trading within the last three years and has paying customers, then assess your entry against our published criteria.</li>
          <li>You'll hear from us within five business days, whether you're selected or not. If your business doesn't meet the New Business rule, we'll tell you in that reply.</li>
        </ol>}
      </div>
      <div className="test-entry-confirmation-links">
        <Button variant="outline" className="test-entry-action" asChild><Link to="/winners">See this year's winners</Link></Button>
        <Button variant="link" className="test-entry-edit" asChild><Link to="/criteria">Read the criteria</Link></Button>
      </div>
      <Button variant="link" className="test-entry-restart" type="button" onClick={restart}>Start again (test only)</Button>
    </div>;
  } else if (step === 0) {
    card = <>
      {header("About you", "Start with who you are. You'll choose your categories next.")}
      <div className="test-entry-fields test-entry-details">
        {DETAIL_FIELDS.map((field) => <div className={`test-entry-field${field.key === "profile" ? " test-entry-full-width" : ""}`} key={field.key}>
          <label htmlFor={`${uid}-${field.key}`}>{field.label}{!field.optional && <span aria-hidden="true"> *</span>}</label>
          <Input {...inputProps(field.key)} type={field.type} autoComplete={field.autoComplete} required={!field.optional} {...(field.key === "profile" ? { placeholder: "https://", inputMode: "url" as const } : {})} value={details[field.key]} onChange={(event) => {
            setProgress((previous) => ({ ...previous, details: { ...previous.details, [field.key]: event.target.value } })); clearError(field.key);
          }} />
          {error(field.key)}
        </div>)}
        <div className="test-entry-field test-entry-full-width">
          <label htmlFor={`${uid}-industry`}>Industry <span aria-hidden="true">*</span></label>
          <select {...inputProps("industry")} required value={details.industry} onChange={(event) => {
            setProgress((previous) => ({ ...previous, details: { ...previous.details, industry: event.target.value } })); clearError("industry");
          }}><option value="" disabled>Choose your industry</option>{TEST_INDUSTRIES.map((industry) => <option key={industry} value={industry}>{industry}</option>)}</select>
          <p className="test-entry-industry-help">The judges use your industry as context.</p>
          {error("industry")}
        </div>
      </div>
      {footer("Continue to categories", next)}
    </>;
  } else if (step === 1) {
    card = <>
      {header("What would you like us to assess?", "Choose the category that best fits your strongest result. Each category you enter is assessed separately, and you'll receive a decision for each one.")}
      <fieldset><legend className="sr-only">Categories</legend>
        {TEST_CATEGORIES.map((category) => <Fragment key={category.id}>
          {!category.cents && <div className="test-entry-band">Free for new businesses</div>}
          <label className="test-entry-row" htmlFor={`${uid}-category-${category.id}`} data-selected={selected.includes(category.id)}>
            <span className="test-entry-checkbox"><input id={`${uid}-category-${category.id}`} type="checkbox" aria-label={category.name} checked={selected.includes(category.id)} onChange={() => setProgress((previous) => toggleTestCategory(previous, category.id))} /><span>{selected.includes(category.id) && <Check aria-hidden="true" size={16} />}</span></span>
            <span>
              <span className="test-entry-row-top"><span className="test-entry-category-name">{category.name}</span><span className="test-entry-price">{category.cents ? "US$129.90" : "Free if eligible"}</span></span>
              <span className="test-entry-description">{category.description}</span>
              {selected.includes(category.id) && <span className="test-entry-title">Winner title: {category.title}</span>}
            </span>
          </label>
        </Fragment>)}
      </fieldset>
      <div className="test-entry-footer test-entry-category-footer" ref={footerRef}>
        <div className="test-entry-footer-main">
          {back()}
          <div className="test-entry-checkout">
            <div className="test-entry-total" aria-live="polite" aria-atomic="true">
              <div className="test-entry-count">{summary.count ? `${summary.count} ${summary.count === 1 ? "category" : "categories"} selected` : "Select a category to continue."}</div>
              {summary.count > 0 && <p>Entry total: <strong>{summary.amount}</strong></p>}
            </div>
            {action("Continue", next, !summary.count)}
          </div>
        </div>
        {summary.note && <p className="test-entry-note" aria-live="polite">{summary.note}</p>}
      </div>
    </>;
  } else if (step === 2) {
    card = <>
      {header("Your achievement", "Answer these three questions once. The judges read them for every category you selected.")}
      <div className="test-entry-fields">{TEST_SHARED_QUESTIONS.map((question) => answerBox(question.id, question.label, question.help))}</div>
      <div className="test-entry-question-section">
        <h4>One question for each category</h4>
        <p>{summary.count === 1 ? "You selected 1 category, so there is 1 question here." : `You selected ${summary.count} categories, so there are ${summary.count} questions here.`}</p>
        <div className="test-entry-fields">{summary.categories.map((category) => <div className="test-entry-category-question" key={category.id}>
          <span className="test-entry-question-category">{category.name}</span>
          {category.id === "impact" && <fieldset className="test-entry-radio">
            <legend>Which title fits your result?</legend>
            {["Social Impact Award", "Environmental Impact Award"].map((title, index) => <label key={title} htmlFor={index === 0 ? `${uid}-impactTitle` : `${uid}-impact-title-${index}`}>
              <input id={index === 0 ? `${uid}-impactTitle` : `${uid}-impact-title-${index}`} type="radio" name={`${uid}-impactTitle`} value={title} checked={impactTitle === title} aria-label={title} required aria-invalid={Boolean(errors["impactTitle"])} {...(errors["impactTitle"] ? { "aria-describedby": `${uid}-impactTitle-error` } : {})} onChange={() => { setProgress((previous) => ({ ...previous, impactTitle: title })); clearError("impactTitle"); }} />{title}
            </label>)}
            {error("impactTitle")}
          </fieldset>}
          {answerBox(category.id, category.question)}
        </div>)}</div>
      </div>
      {footer("Continue to review", next)}
    </>;
  } else {
    card = <>
      {header(summary.cents ? "Review and pay" : "Review your entry", summary.cents ? "Check your categories and total, then pay to send your entry to the judges." : "Check your entry, then submit it. There's nothing to pay.")}
      <div className="test-entry-review-row">
        <div className="test-entry-review-top"><h4>About you</h4>{edit(0, "about you")}</div>
        <p>{details.firstName} {details.lastName}{details.company && `, ${details.company}`}</p>
        <p>{details.email} · {details.industry}</p>
      </div>
      <div className="test-entry-review-row">
        <div className="test-entry-review-top"><h4>{summary.count === 1 ? "Category" : "Categories"}</h4>{edit(1, "categories")}</div>
        {summary.categories.map((category) => <div key={category.id}>
          <div className="test-entry-review-category"><span>{category.name}</span><span>{category.cents ? "US$129.90" : "Free"}</span></div>
          {category.id === "impact" && <p>Title: {impactTitle}</p>}
          {category.id === "new" && <p>Started trading within the last three years and has paying customers. We check this during assessment.</p>}
        </div>)}
      </div>
      <div className="test-entry-review-row">
        <div className="test-entry-review-top"><h4>Your answers</h4>{edit(2, "your answers")}</div>
        <p>Three shared answers, plus {summary.count} category {summary.count === 1 ? "question" : "questions"}.</p>
      </div>
      <div className="test-entry-review-total"><span>Entry total</span><strong>{summary.amount}</strong></div>
      <div className="test-entry-assessment">{summary.cents ? "Each category you enter is assessed separately against our published criteria: Originality, Traction and A standout achievement. You'll receive a decision for each one within five business days. Paying does not guarantee selection." : "Your entry is assessed against our published criteria: Originality, Traction and A standout achievement. You'll receive a decision within five business days."}</div>
      {footer(summary.cents ? `Pay ${summary.amount}` : "Submit free entry", confirm, <>{summary.cents ? "You'll pay on Stripe's secure checkout, then come straight back here. " : "No payment required. "}By submitting, you agree to the <Link to="/terms-and-conditions">Terms and Conditions</Link>.</>)}
    </>;
  }

  return <section id="submit" className={`test-entry${step === 1 && !done ? " test-entry-step-categories" : ""}`} ref={sectionRef}>
    <div className="test-entry-column">
      <div className="test-entry-intro"><h2>Enter the 2026 Awards.</h2><p>Four short steps. We reply to every entry either way, within five business days.</p></div>
      {!done && <div className="test-entry-progress" aria-label={`Step ${step + 1} of 4: ${stepName}`}><strong>Step {step + 1} of 4</strong> · {stepName}<div className="test-entry-bars" aria-hidden="true">{TEST_STEPS.map((name, index) => <span key={name} data-filled={index <= step} />)}</div></div>}
      <div className="test-entry-card">{restored && !done && <div className="test-entry-welcome"><Check aria-hidden="true" />Welcome back. We kept your answers.</div>}{card}</div>
      {step === 1 && !done && <div className="test-entry-benefits"><h4>Every winner gets</h4><ul>{WINNER_FILES.map((file) => <li key={file}><Check aria-hidden="true" />{file}</li>)}</ul><p>The same files for every category, with the title you won on them.</p></div>}
    </div>
  </section>;
}