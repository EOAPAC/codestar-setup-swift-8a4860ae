# Replace homepage image band with on-brand illustration

## Goal
Swap the current photo-based image band on the homepage for a brand-aligned editorial illustration that matches the site's blue palette, and remove the "Illustrative" caption.

## Proposed changes

1. Generate a new brand illustration
   - Full-bleed, wide aspect ratio suitable for a 460px-tall desktop band
   - Color palette pulled from the site: deep blue (`#1e3a8a`), brand blue (`#3b82f6`), soft blue tints (`#eff6ff`, `#bfdbfe`), white
   - Abstract/editorial feel: clean geometric shapes, subtle grid or light-ray texture, a sense of forward motion or recognition without literal trophy/award imagery
   - No text, no people, no warm colors

2. Update `src/routes/index.tsx` image band
   - Replace the `award-recipient.png` asset with the new illustration
   - Keep the band full-bleed and responsive heights (460px / 320px / 240px)
   - Keep the top hairline border
   - Remove the "Illustrative" caption entirely
   - Keep the current placement between hero and "Why it matters"

3. Verify visual result
   - Check the homepage renders the new band
   - Confirm no caption appears and the illustration fits the section

## Files touched
- `src/routes/index.tsx` (swap image URL and remove caption)
- `src/assets/` (new generated illustration asset + pointer)

## Out of scope
- No changes to hero, "Why it matters", or other sections
- No changes to pricing, navigation, or form logic
