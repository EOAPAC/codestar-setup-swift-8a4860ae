# Plan: Make the "As seen in" publication links clearly clickable

## Goal
The homepage "As seen in" section currently shows four publication wordmarks as plain text links. Update the treatment so they visibly read as clickable cards and stand out on the page without adding marketing noise.

## What will change
- Wrap each publication link (Vanity Fair, Variety, Fast Company, L'Officiel) in a bordered card with generous padding, subtle background, and a hover state.
- Add a small external-link icon and a "Read article" micro-label to each card so the affordance is unambiguous.
- Keep the existing typographic wordmarks and their per-publication styling.
- Replace the flat grid with a responsive layout that stays centered and balanced across mobile and desktop.
- Maintain the current design-system tokens: Inter, primary blue, surface/border/ring colors, no hard-coded hex values.

## What will stay the same
- The four article URLs and the publication names.
- The "As seen in" eyebrow label and the section position on the homepage.
- The proof points below the publications.
- No new dependencies or images; the icons will come from an existing icon set or a small inline SVG.

## Implementation
1. Edit `src/routes/index.tsx`.
2. Update the `publications` data to include a short `label` if needed, or render the labels directly in the component.
3. Replace the `<a>` loop in `CredibilityBand` with a new card-based component for each publication, using Tailwind utilities for border, background, hover, focus, and transition.
4. Add an inline SVG arrow-up-right icon to each card.
5. Verify visual hierarchy and spacing in the browser preview.

## Acceptance criteria
- Each publication card is visually distinct and clearly reads as a clickable link.
- Hover/focus states provide feedback.
- The layout remains responsive and aligned with the existing page rhythm.
- No new dependencies are introduced.
