# Full-bleed image band on the home page

Add a single edge-to-edge photo band between the hero and the "WHY IT MATTERS" section, with a small right-aligned "Illustrative" caption underneath. Nothing else on the page changes.

## What gets built

- The uploaded award-recipient photo is uploaded to our own CDN (served from our domain, no external URL) and referenced from the home page.
- A new band sits directly under the hero:
  - Full viewport width, no container, no rounded corners, no shadow.
  - Height 460px on desktop, 320px on tablet, 240px on mobile.
  - Image fills the band (cover) and is anchored centre-right so the seated subject stays in frame on narrow screens.
  - Lazy loaded, alt text "An illustrative image of an award recipient".
  - A 1px hairline in the site border colour along the top edge only.
  - No text, heading, button, or gradient over the image.
- Caption beneath the image, inside the standard content width, right aligned: "Illustrative", 12px, uppercase, 0.08em letter-spacing, muted text colour, 10px above, 0 below.
- No padding above the band; 24px below the caption before the next section.

## Technical notes

- Upload with `lovable-assets create --file /mnt/user-uploads/acbf841c-bf36-4a52-97dd-ef0496b2fd1b.png --filename award-recipient.jpg`, writing the pointer to `src/assets/award-recipient.jpg.asset.json`; import the pointer and use `.url`.
- New `WinnerBand` component inside `src/routes/index.tsx`, rendered between `<Hero />` and `<Tiers />` (the WHY IT MATTERS section).
- Sizing via Tailwind: `h-60 md:h-80 lg:h-[460px]`, `w-full object-cover object-[center_right]`, `border-t border-border`, caption `mx-auto max-w-5xl px-6 text-right text-[12px] uppercase tracking-[0.08em] text-muted-foreground mt-[10px] mb-0`, wrapper `pb-6`.
- No changes to hero, WHY IT MATTERS, or any other section.
