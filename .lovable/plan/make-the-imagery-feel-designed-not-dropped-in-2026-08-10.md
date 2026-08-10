# Make the imagery feel designed, not dropped in

Right now the three photographs sit on the page as bare rectangles with a grey caption line under each. Nothing ties them to the copy, so they read as decoration. The fix is to give each image a job: pair it with a claim, frame it consistently, and remove the one that adds nothing.

## Home page

**Award band (below the hero)**
Keep it full-bleed, but make it a statement rather than a strip.
- Add a soft top hairline and let the band sit flush under the hero with no gap.
- Overlay a small, restrained caption block anchored bottom-left inside the content column: a brand-blue eyebrow ("The 2026 award") and one line of white text on a subtle dark scrim gradient across the lower third only. Photograph stays untreated above the scrim.
- Move the current long caption sentence out of the overlay and keep it as one short line beneath, in body grey.

**Winner portrait (before the entry form)**
Replace the standalone full-width image + caption with a two-column editorial block inside the content column:
- Left: the portrait at 4:5, rounded corners, matching card radius.
- Right: a short heading, one paragraph tying the picture to what a winner actually gets, and a thin blue left-rule list of three factual items (badge and graphics, citation, award as part of the optional Winner's Feature).
- Stacks to single column below 768px with the image first.
This makes the photo evidence for a claim instead of a break in the page.

## FAQ page

**Remove the engraving detail image from inside the answer.** An image inside an accordion is invisible until opened, and it makes the answer feel padded.

Instead, place it once at the top of the FAQ page as a slim contextual band:
- A contained 21:9 crop of the engraving detail directly under the page heading and subhead, rounded corners, no border.
- One line of body-grey caption beneath, left-aligned.
The five category links and every question and answer stay exactly as written.

## Shared treatment (consistency)

Introduce one small reusable figure component so all contained images share the same rules:
- Card border radius, no border, no shadow, no filters or tints.
- Explicit width/height plus CSS aspect-ratio, WebP, `decoding="async"`, `loading="lazy"` (award band stays eager).
- Caption style: small, body grey, left-aligned to the content column, `mt-3`.

Vertical rhythm follows the existing section spacing (`py-24 md:py-32`); no new spacing scale.

## Technical notes

- Files touched: `src/routes/index.tsx` (AwardBand, WinnerPortrait), `src/routes/faq.tsx` (remove in-answer figure, add header band), plus a new `src/components/site-figure.tsx` for the shared contained-image figure.
- No copy changes to the hero, "Four steps, start to finish.", "What you can rely on.", or the entry form.
- No new images required; the existing three files in `public/images` are re-cropped via `object-position` and aspect-ratio only.
