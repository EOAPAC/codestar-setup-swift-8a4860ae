# Design handoff prompt: homepage trophy hero

Write a concise design handoff prompt that captures how the trophy image is placed and styled on the homepage hero, so a designer or developer can reproduce the same composition, color treatment, and responsive behaviour.

## Prompt

Design the homepage hero section for a minimal, editorial awards brand. The section is anchored by a large crystal award trophy placed on the right side of the viewport, with the headline and call-to-action stacked on the left.

### Layout and composition

- Use a full-width, light background section. Inside it, a centered content container with generous horizontal padding and max-width 6xl.
- Place the hero trophy image as a large, absolute-positioned element flush to the right edge of the section, spanning the full section height, and sitting behind the text. On mobile and tablet, hide the trophy image entirely; on desktop, show it.
- Left-align the text block inside the container. Keep the text block narrow enough to stay clear of the trophy: max-width ~2xl. The text should sit in front of the image via z-index and a subtle gradient overlay.
- Apply a horizontal gradient overlay over the trophy image so the text remains legible: from solid background color at the left (45%), through a semi-transparent background (55%), to transparent at the right. The trophy stays visible and crisp on the right third of the viewport.

### Typography

- Font: Inter, sans-serif.
- Primary brand blue: #1978E5.
- Hero eyebrow: a small rounded pill/chip with a thin border, secondary background, and a tiny blue dot. Use sentence-case text, xs size, medium weight, muted grey.
- Headline: very large, semibold, tight tracking. The headline is split between dark text and a single phrase in primary blue, e.g. "For the person who built it." where the final clause is colored.
- Subhead: one to two lines, body grey, relaxed leading, large enough to read comfortably but clearly subordinate to the headline.

### Image treatment

- Trophy: a tall, clear crystal or glass award photographed on a clean white or transparent background. It should show a subtle etched seal on the front (e.g. "Entrepreneur Awards Winner 2026") without being the main visual focus.
- The trophy should not be cropped, framed, shadowed, or tinted. Use object-contain and align it to the right edge so the full form is visible.
- The image is decorative, not interactive, and should be hidden from screen readers.

### Call-to-action

- Two buttons in a horizontal row at desktop, stacked at mobile.
- Primary button: filled blue, medium size, rounded, with the label "Enter now →".
- Secondary button: ghost/text style, same size, rounded, with the label "See how it works".

### Responsive behaviour

- Mobile: trophy hidden, text full width, buttons stacked vertically, padding reduced.
- Tablet: trophy hidden, same text layout as mobile but with larger spacing.
- Desktop: trophy appears at the right, text sits in the left half with the gradient overlay, buttons side by side.

### Overall mood

Calm, credible, editorial, and warm. No gradients on buttons, no shadows on the trophy image, no gold or luxury styling. The trophy should feel like a clear piece of evidence rather than a decorative prize.

## Files to reference

- Trophy asset: `src/assets/hero-trophy.webp.asset.json`
- Implementation: `src/routes/index.tsx`, `Hero` component

## Deliverable

A single, self-contained paragraph-style prompt suitable for pasting into a design brief or a generative-design tool.