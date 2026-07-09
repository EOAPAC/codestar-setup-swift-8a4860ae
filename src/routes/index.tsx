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
    tagline: "Get recognized online.",
    features: [
      "Digital award badge",
      "Feature in our online directory",
      "Shareable LinkedIn asset",
      "Winner certificate (PDF)",
    ],
  },
  {
    name: "Signature",
    price: "$449",
    tagline: "The full winner experience.",
    highlighted: true,
    features: [
      "Everything in Digital",
      "Physical engraved trophy",
      "Founder story published",
      "Press release distribution",
      "Priority judging",
    ],
  },
  {
    name: "Headline",
    price: "$1,290",
    tagline: "Be the story of the year.",
    features: [
      "Everything in Signature",
      "Editorial photo & video feature",
      "Homepage placement",
      "Speaking slot at annual gala",
      "1:1 founder coaching session",
    ],
  },
];

const testimonials = [
  {
    quote:
      "Winning changed how investors saw us. The recognition opened doors we'd been knocking on for years.",
    name: "Amara Okafor",
    role: "Founder, Northline",
  },
  {
    quote:
      "It's the first award that actually cared about the founder — not just the metrics. That distinction matters.",
    name: "Julian Reyes",
    role: "Founder & CEO, Parallel",
  },
  {
    quote:
      "The story feature brought in 40+ inbound customers in the month after publication. Real signal.",
    name: "Priya Shah",
    role: "Co-founder, Kindred Labs",
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
          <a href="#submit">Enter now</a>
        </Button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-6 pt-28 pb-24 text-center md:pt-40 md:pb-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Submissions open for 2026
        </span>
        <h1 className="mt-8 text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
          For the person who <span className="text-primary">built it.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          The Entrepreneur Awards celebrate the founders behind the work — the late nights,
          the pivots, the years of quiet conviction. One entry. One story. Real recognition.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="min-w-48">
            <a href="#submit">
              Submit your story <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <a href="#tiers">View award tiers</a>
          </Button>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs uppercase tracking-widest text-muted-foreground">
          <span>1,200+ Founders Recognized</span>
          <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />
          <span>Featured in TechCrunch</span>
          <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />
          <span>Judged by Founders</span>
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
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Award Tiers</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Recognition, at the level you need it.
          </h2>
          <p className="mt-4 text-muted-foreground">
            One submission. Choose how far you want your story to travel.
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
                  Most chosen
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
                <a href="#submit">Choose {tier.name}</a>
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
            Founders on what winning meant.
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
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setForm({ name: "", email: "", company: "", story: "" });
    toast.success("Submission received. We'll be in touch.");
  };

  return (
    <section id="submit" className="border-t border-border bg-secondary/30 py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Submit</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            One entry. Tell us your story.
          </h2>
          <p className="mt-4 text-muted-foreground">
            No categories to pick. No forms within forms. Just the founder, and the work.
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
                placeholder="Why did you start? What did it cost you? What did you build?"
                rows={8}
                maxLength={2000}
                required
              />
              <p className="text-right text-xs text-muted-foreground">
                {form.story.length}/2000
              </p>
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? "Submitting…" : "Submit my entry"}
            </Button>
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
