# Show the four winner graphics in "Already yours, free"

Put the newly uploaded winner assets on the winner offer page (`/pricing`), inside the
"Already yours, free" band, so winners can see exactly what they already have before the
paid feature is offered.

## The assets

Four uploads, used as-is:

- LinkedIn / social banner (1200x630)
- Instagram story (1080x1920)
- Instagram post (square)
- Email signature strip (600x200)

## What changes

The "Already yours, free" section becomes a short intro line plus a four-up gallery.
Each graphic sits in a container shaped like the place it gets used, so the row reads
evenly rather than as four mismatched rectangles:

```text
[ LinkedIn banner ]  [ Square post ]  [ Story (phone) ]  [ Email signature ]
```

- Framed on the existing soft secondary background, with a thin border, rounded corners
  and a small caption under each (name plus dimensions).
- Responsive: four across on desktop, two on tablet, one on mobile.
- Non-interactive here (no downloads on this page); downloads stay on the private winner
  resources page.
- Copy stays factual: the graphics are already theirs, no upgrade needed.

Nothing else on the page moves. The offer card, pricing, timing selector and Stripe
button stay as they are.

## Technical notes

- Upload each image through `lovable-assets` and commit only the `.asset.json` pointers
  in `src/assets/` (no binaries in the repo).
- Add a small `FreeAssetTile` component in `src/routes/pricing.tsx` that renders the
  image inside an aspect-ratio frame with `object-contain`, plus its caption.
- Real alt text on each image; lazy loading.
- The existing icon-only tiles are replaced by this gallery.
