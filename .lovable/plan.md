# Better covers for the winner file samples (Categories page)

Replace the drawn placeholder previews on /categories with the real designed award files the site already has.

## What changes
- **LinkedIn banner** → the real EA LinkedIn banner image.
- **Square post** → the real Instagram/LinkedIn square winner image.
- **Story** → the real Instagram story winner image (tall format).
- **Website badge** → the full winner seal image.
- **Email signature** → the real 600×200 email signature image.
- **Certificate** → a rendered certificate preview in the same style as the real certificate (paper texture, seal, category title), since no certificate image exists in the asset library. If you have the certificate file, I'll use it instead.
- **Written assessment** → a cleaner document-style preview: paper page, EA mark, the three criteria with short sample panel notes instead of empty grey bars.

Each tile shows the image inside its card with soft border and shadow, cropped to fit, same captions and layout as now. Note under the grid ("Samples. Yours carry the title of the category you won.") stays.

## Not changed
Captions, text, prices, other pages, forms and checkout.

## Technical
- Add an optional `image` per sample in `src/routes/categories.tsx`; render `<img>` from existing `.asset.json` pointers; keep `WinnerFile` fallback for certificate and assessment, restyled in the shared winner-files module.
- The cycling stack in the hero is untouched.
