# Create /your-award and redirect /salespage to it

## Goal
Move the free winner-award downloads portion of `/pricing` to a new standalone page at `/your-award`. Keep `/pricing` untouched. Redirect `/salespage` to `/your-award` so any winner-email links pointing at `/salespage` land on the award page instead.

## Files to change

1. `src/routes/your-award.tsx` — new route.
2. `src/routes/salespage.tsx` — replace with a redirect to `/your-award`.
3. `src/routeTree.gen.ts` — regenerates automatically; do not edit.

## Page structure for `/your-award`

### Route metadata
- URL: `/your-award`
- Title: "Your 2026 Entrepreneur Award"
- One-sentence description
- `robots: noindex`
- Reuse `SiteNav` and `SiteFooter`

### 1. Header section (white background)
- Padding: 64px top / 48px bottom
- Eyebrow: "2026 ENTREPRENEUR AWARD" — 11px uppercase, tracking 0.16em, `--muted`
- H1: "You won." — clamp(34px, 5vw, 52px), weight 700, line-height 1.05, letter-spacing -0.02em, `--ink`
- Sub: "Congratulations on your 2026 Entrepreneur Award. Everything that comes with it is on this page, free to use and yours to keep." — centred, max-width 52ch, 16.5px, `--body`, line-height 1.6

### 2. Downloads section (`--tint` background, 56px vertical padding)
- Heading: "Your award, ready to use." — 24px mobile / 28px desktop, weight 700, `--ink`, centred
- Sub: "Download them, then add them to your website, your LinkedIn profile and your email signature. They're yours to keep, at no further cost." — centred, max-width 60ch, 14.5px, `--body`, 12px below heading
- Primary button: "Download everything" — centred, 24px below sub, `--brand` background, white text, 15.5px semibold, 8px radius, min-height 52px, 32px horizontal padding. Links to `/api/public/winner-kit/zip`.
- Card grid: 1 col mobile, 2 cols from 640px, 3 cols from 1024px, 20px gap, 32px below button
- Five cards, sourced from `src/content/winner-kit.ts`:
  1. Winner badge
  2. LinkedIn banner
  3. Square post
  4. Story graphic
  5. Email signature
- Card specs:
  - White background, 1px `--line` border, 8px radius, overflow hidden
  - Preview area: fixed 160px height, `--tint` background, asset image centred with `object-fit: contain` and 16px padding
  - Content area: 16px padding
  - Name: 15.5px weight 600 `--ink`
  - Use line: 13.5px `--body`, line-height 1.5, 6px below name
  - Dimensions line: 11.5px `--muted`, 10px below use line. Use the real pixel width × height and file type of each asset. If dimensions cannot be read from the asset files, omit this line rather than guess.
  - Download link at bottom: `--brand`, 13.5px semibold, with a small inline `Download` icon. Links to the individual asset URL with `download` attribute and the provided filename.

### 3. Closing section (white background, 48px padding)
- Line 1: "That's everything you can post yourself." — 14.5px `--body`, centred
- Line 2: "If you'd like the story behind the award written up and published as well, that's the Winner's Feature." — 13.5px `--muted`, max-width 56ch, centred, 16px below line 1
- Link: "See the Winner's Feature →" — `--brand`, 13.5px semibold, 12px below line 2, points to `/salespage`
- No card, price, or button here.

## Redirect `/salespage` → `/your-award`
- Replace the contents of `src/routes/salespage.tsx` with a route that throws `redirect({ to: "/your-award", statusCode: 301 })` from `beforeLoad`.
- If `statusCode: 301` is not supported by the current TanStack Router version, fall back to the default redirect (the same behaviour used for `/how-it-works` → `/methodology`).
- Keep the route file so existing winner-email links to `/salespage` keep resolving.

## Brand tokens (same as recent pages)
- `--ink: #0F172A`
- `--body: #52606D`
- `--muted: #6B7785`
- `--brand: #1978E5`
- `--brand-dark: #1565C4`
- `--line: #E5E9F0`
- `--tint: #F7F9FC`
- Font: Inter
- Radii: 8px cards/buttons, 6px images

## Rules
- No prices anywhere on `/your-award`.
- The only off-page link is the single "See the Winner's Feature →" text link.
- `/salespage` must resolve but redirect.
- Do not change `/pricing`, `/pricingv2`, `/apply`, or the winner-kit API.

## Verification
- TypeScript check passes.
- Playwright screenshots at 390px, 768px, and 1440px with no horizontal overflow.
- Every download link and the main "Download everything" button are at least 44px tall on mobile.
- `/salespage` redirects to `/your-award`.
