## Goal

Turn `/winner-resources/[token]` from a quiet download page into a celebration moment that naturally guides the winner to make their win official (paid upgrade). Keep EA brand (blue #1978E5, Inter, clean modern), stay professional (guide, not pressure), stay generic (no personal data), stay `noindex`.

Only edits `src/routes/winner-resources.$token.tsx`. Nav, footer, pricing, and HubSpot flow untouched.

---

## Layout (top to bottom)

1. Celebration hero
   - Confetti/particle burst behind headline (subtle, CSS + a few animated dots, no heavy libs).
   - Larger badge chip: "2026 Winner · Verified Entry".
   - Headline: "Congratulations. You made it."
   - Subline: warm, human, one line.
   - Two soft trust chips under subline: "Assets ready to download" · "Your recognition is live".

2. "At a glance" strip (new — CRO anchoring)
   - 3 tiny stat cards: "4 assets ready", "Under 2 min to share", "1 step to make it official".
   - Purpose: primes value + previews the upsell without selling yet.

3. Download your assets (the free value, upgraded)
   - Same 4 assets, but each card gets:
     - Real-feel SVG preview (badge shape, square post mock, story mock, banner mock) instead of generic icon tile.
     - "Download" primary + small "Copy share caption" secondary (copies a pre-written LinkedIn/IG caption to clipboard — a proven share-lift CRO move).
   - "Download all" button above the grid (bundles the 4 SVGs as sequential downloads).
   - Micro-line under grid: "Designed with space to add your name or photo."

4. "Share in one tap" row (new — momentum builder)
   - Small row of share buttons: LinkedIn, X, Copy link.
   - Share target is the public EA site (not the token URL), with a pre-written post.
   - Purpose: gets the winner publicly committed to their win, which increases upgrade intent.

5. Make your win official (the upsell, reworked with CRO)
   - Visually distinct band, still on-brand and calm.
   - Left column:
     - Eyebrow: "The final step".
     - Headline: "Make your win official".
     - Body copy (kept measured, close to current wording).
     - 3-point value list with icons (verified profile · third-party checkable · shows up in search).
     - Mini "social proof / credibility" line: "Published profiles are indexed and shareable across LinkedIn, press kits, and investor decks." (no fake testimonials).
   - Right column (sticky on desktop):
     - Card with a subtle gradient border.
     - "Recognized · Published Profile" label.
     - Price + "One-time" (pulled to match `/pricing` Recognized tier so pricing stays consistent).
     - Primary CTA: "Make my win official →" links to `/pricing#recognized`.
     - Secondary text link: "See all winner packages".
     - Reassurance row: "Live within 24h · Permanent link · Editable anytime" (icons).
   - Loss-aversion micro-line under CTA (soft, not pushy): "Unclaimed wins fade. Verified wins compound."

6. Mini FAQ (new — objection handling, CRO)
   - 3–4 collapsible items reused from shadcn Accordion:
     - "Do I have to upgrade to use the assets?" (No.)
     - "What's on the published profile?"
     - "Can I edit it later?"
     - "Who sees it?"
   - Keeps tone honest; removes friction before the CTA.

7. Footer helper line (kept)
   - "Questions about your win? Reply to your winner email and we'll help."
   - `SiteFooter` reused.

---

## CRO + UX principles applied

- Peak-end rule: strong celebratory open, strong reassuring close.
- Anchoring: "at a glance" strip primes value before ask.
- Reciprocity: assets + share captions delivered first, upsell second.
- Commitment/consistency: public share buttons increase upgrade likelihood.
- Cognitive ease: one primary CTA color, secondary CTAs muted.
- Loss aversion: single soft line, not repeated.
- Objection handling: mini FAQ right before final CTA repeat.
- Visual hierarchy: hero → value → share → upsell → FAQ → footer, one clear next step per section.
- Motion: restrained (fade/slide-in on scroll, small confetti loop on hero only); respects `prefers-reduced-motion`.

---

## Brand + tone guardrails

- Blue #1978E5 accent only, Inter, existing radial-glow hero pattern reused.
- No em dashes (use commas/periods) to match existing pages.
- Professional, classy, celebratory. No "LIMITED TIME", no countdowns, no fake urgency.
- Generic page: no name, no company, no personal fields anywhere.
- `robots: noindex` stays.

---

## Technical notes

- Single file edit: `src/routes/winner-resources.$token.tsx`.
- Reuse: `SiteNav`, `SiteFooter`, `Button`, `Card`, `Accordion` (shadcn, already installed).
- Confetti: pure CSS keyframes + ~12 absolutely-positioned dots, wrapped in `motion-safe:`.
- Share captions + share URLs: local constants in the file.
- Pricing number for Recognized card: hardcode to match current `/pricing` ($245) so the two pages stay consistent; noted so future price changes update both.
- No new routes, no nav changes, no backend changes, no new deps.

---

## Out of scope

- Real asset artwork (still SVG placeholders).
- Personalization / per-winner data.
- Auth or token validation.
- Changes to `/pricing`, `/complete`, HubSpot flow, or nav visibility.
