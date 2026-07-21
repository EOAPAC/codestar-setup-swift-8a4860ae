Create a concise, reusable prompt document that captures the design idea and context used to build the Entrepreneur Awards Methodology and FAQ pages. The deliverable is a plain-language prompt template that the user can paste into any other project.

Deliverable (the prompt to use):

```text
Build a "Methodology" page and a "FAQ" page for my business website.

Design direction
- Match the existing site style: clean, professional, dark-ish background, minimal UI, brand-blue accent.
- Hero section: a subtle blue radial gradient glow behind the top of the page, text sitting clearly above it (not hidden behind the glow).
- Use a pill/badge above the headline, not a giant hero illustration.
- Keep the tone professional and informational, not salesy. Avoid em dashes; use commas or periods instead so the copy does not feel AI-generated.

Methodology page (/methodology)
- Purpose: explain how the service/program makes decisions or delivers results.
- Hero: badge label, H1 headline, and 2-3 short paragraphs of calm, authoritative subtext.
- Process section: numbered vertical timeline (5-6 steps). Each step has a small icon, a step counter, a title, and a paragraph explaining what happens. Add a thin vertical gradient line connecting the steps on desktop.
- Criteria section: 4-6 criteria cards in a 2-column grid. Each card has a colored icon, a title, and a one-paragraph description. Add a short closing paragraph explaining why the criteria matter.
- Tone: plain, transparent, and substance-first. No heavy marketing language.

FAQ page (/faq)
- Purpose: answer the main questions before someone takes action.
- Hero: badge label, H1 headline, short subtext, and a row of anchor chips linking to topic sections (Getting started, Eligibility, How it works, Judging, Winners, etc.).
- FAQ body: an accordion with 8-10 items. Each item is a single collapsible question/answer.
- Within answers, link naturally to the Methodology page or contact section where relevant.
- Bottom card: a "Still have a question?" box with an email button and a primary action button (e.g., "Start Your Entry" or equivalent).
- Add a site-wide CTA section below the FAQ if the site already uses one.

Technical notes
- Create the route files as separate pages in the framework (e.g., TanStack Start: /methodology and /faq under src/routes/).
- Use shared nav and footer components so both pages are wired into the site navigation.
- Set unique page titles, meta descriptions, and Open Graph tags for each page.
- Use Lucide-style icons for the process and criteria cards.
- Keep all pricing or sales pressure out of the Methodology page; let the FAQ handle objections.

After building, add links in the main navigation and footer so users can reach both pages from anywhere on the site.
```

The plan stops here. No code changes, no implementation. The output above is the requested prompt template.