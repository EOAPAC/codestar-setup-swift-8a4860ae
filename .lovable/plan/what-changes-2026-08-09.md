Replace "Methodology" with "Criteria" sitewide

Rename the `/methodology` route and update all labels, links, and metadata so the site consistently uses "Criteria" instead of "Methodology".

## What changes

- Rename `src/routes/methodology.tsx` to `src/routes/criteria.tsx`.
- Update the route path from `/methodology` to `/criteria`.
- Change page title, description, og:title, and on-page labels from "Methodology" to "Criteria".
- Update the hero eyebrow label from "Methodology" to "Criteria".
- Update all internal links:
  - `src/components/site-nav.tsx`
  - `src/components/site-footer.tsx`
  - `src/routes/pricing.tsx` ("Our methodology" link text)
  - `src/routes/faq.tsx` ("Methodology" link text)
- Preserve existing `/methodology` URLs by adding a redirect route that sends traffic to `/criteria`.

## Why

The page explains the review criteria the panel uses to judge entries. "Criteria" is more specific and more aligned with the content than "Methodology".

## Technical notes

- `src/routeTree.gen.ts` regenerates automatically from the routes folder.
- The redirect route uses TanStack Router's `redirect` helper in `beforeLoad` so bookmarks and external links to `/methodology` still resolve.
- No external links or SEO strategy changes are required beyond the route rename.
