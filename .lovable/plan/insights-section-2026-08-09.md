# Insights section

Add an editorial Insights section with five long-form articles, reusing the existing EA design system (Inter, blue accent used sparingly, sentence-case headings). No dates, no images, no bylines, no invented content. Article copy is rendered verbatim.

## What gets built

**1. Content file `src/data/insights.ts`**
Created exactly as supplied, including the header comment block, the `InsightArticle` interface, and the five articles with slug, title, seoTitle, metaDescription, tags and markdown body. Copy is not edited in any way.

**2. Index page `/insights`** (`src/routes/insights.index.tsx`)
- Existing `SiteNav` and `SiteFooter`, same page container widths as `/criteria`.
- H1 "Insights" with the supplied standfirst directly beneath.
- Five text-only cards in array order, each showing title, metaDescription as a one-line excerpt, and tags as small non-interactive chips. Whole card links to `/insights/{slug}`.
- Head: title "Insights | Entrepreneur Awards", meta description = the standfirst, plus og:title/og:description/og:type and canonical.

**3. Article page `/insights/$slug`** (`src/routes/insights.$slug.tsx`)
- Looks up the article by slug; a miss throws `notFound()` so the site's existing 404 renders.
- H1 = article title, tags as chips beneath it, then the markdown body.
- "Back to Insights" link to `/insights`.
- Head built from `seoTitle` and `metaDescription` via the existing route `head()` mechanism (no helmet needed), with a self-referencing canonical and og:url.

**4. Navigation**
Add an "Insights" link to `src/components/site-nav.tsx` (between Past Winners and FAQ) and to `src/components/site-footer.tsx`. Nothing else on those components changes.

## Technical notes

- File-based routing: `src/routes/insights.tsx` is a thin layout rendering `<Outlet />`; `insights.index.tsx` and `insights.$slug.tsx` are the leaves. Alternatively both leaves stand alone without a layout file. Route strings match the generated IDs.
- `react-markdown` is added as a dependency for body rendering. Markdown is styled with a scoped wrapper (max-w-[68ch] centred column, relaxed leading, `###` mapped to an H2-scale sentence-case subheading, links in primary blue). No `prose` plugin is introduced; styling uses existing tokens.
- Tags are display-only chips using `bg-secondary`/`text-muted-foreground`; no tag routes.
- No year is printed anywhere in the section, so the site year constant is not needed.
- `/pricing` and all other existing pages are untouched.
