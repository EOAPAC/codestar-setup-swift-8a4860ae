import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Check, ArrowRight, Linkedin, Mail, Twitter, Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  component: Index,
});

const tiers = [
  {
    name: "Digital",
    price: "$149",
    tagline: "Prove it online — in under 5 minutes.",
    features: [
      "Official 2026 Winner badge (web + email)",
      "Permanent profile in the Winners Directory",
      "LinkedIn announcement kit (post + banner)",
      "Personalised winner certificate (PDF)",
      "Right to use the Entrepreneur Awards mark",
    ],
  },
  {
    name: "Signature",
    price: "$449",
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
    price: "$1,290",
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
      <Nav />
      <main>
        <Hero />
        <Tiers />
        <Testimonials />
        <SubmissionForm />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground">
            E
          </span>
          The Entrepreneur Awards
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#tiers" className="hover:text-foreground">Awards</a>
          <a href="#testimonials" className="hover:text-foreground">Winners</a>
          <a href="#submit" className="hover:text-foreground">Submit</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
        </nav>
        <Button asChild size="sm">
          <a href="#submit">Enter the 2026 Awards</a>
        </Button>
      </div>
    </header>
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
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Choose your win</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Every entry wins something. You choose how loud.
          </h2>
          <p className="mt-4 text-muted-foreground">
            One story, three ways to amplify it. 30-day money-back guarantee if you're not shortlisted.
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
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">{tier.price}</span>
                <span className="text-sm text-muted-foreground">/ entry</span>
              </div>
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
                <a href="#submit">Enter {tier.name} →</a>
              </Button>
            </Card>
          ))}
        </div>
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

function SubmissionForm() {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    story: "",
  });

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.story.trim()) {
      toast.error("Please fill in your name, email, and story.");
      return;
    }
    if (form.story.length > 2000) {
      toast.error("Story must be under 2000 characters.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("submissions").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim() || null,
      story: form.story.trim(),
    });
    setSubmitting(false);
    if (error) {
      toast.error(error.message || "Something went wrong. Please try again.");
      return;
    }
    setForm({ name: "", email: "", company: "", story: "" });
    toast.success("Submission received. We'll be in touch.");
  };

  return (
    <section id="submit" className="border-t border-border bg-secondary/30 py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Enter now</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Enter in 5 minutes. Judged in 14 days.
          </h2>
          <p className="mt-4 text-muted-foreground">
            No categories. No 20-page application. Just you and the work — that's all our founder-judges want to read.
          </p>
        </div>
        <Card className="mt-12 p-8 md:p-10">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Your name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={onChange("name")}
                  maxLength={100}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={onChange("email")}
                  maxLength={255}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company (optional)</Label>
              <Input
                id="company"
                value={form.company}
                onChange={onChange("company")}
                maxLength={120}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="story">Your story</Label>
              <Textarea
                id="story"
                value={form.story}
                onChange={onChange("story")}
                placeholder="Why did you start? What did it cost you? What did you build? (A few paragraphs is plenty.)"
                rows={8}
                maxLength={2000}
                required
              />
              <p className="text-right text-xs text-muted-foreground">
                {form.story.length}/2000
              </p>
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? "Submitting…" : "Submit my entry — it's free to apply"}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Free to enter. You only pay if you're selected as a winner. We reply within 14 days.
            </p>
          </form>
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
