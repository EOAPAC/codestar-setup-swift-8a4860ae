# Keep /salespage from going live while publishing homepage edits

## Background
Lovable publishes the whole app at once. Any route file under `src/routes/` becomes part of the public deployment, including `/salespage`. There is no per-page "publish / hide" switch.

## Two ways to handle this

### Option A — Temporarily remove the route (recommended if you want to be certain it is not live)
1. Copy `src/routes/salespage.tsx` to a safe draft location outside `src/routes/`, e.g. `.lovable/drafts/salespage-route.tsx`.
2. Delete `src/routes/salespage.tsx`.
3. Make and publish your homepage edits.
4. `src/routeTree.gen.ts` regenerates automatically, so `/salespage` will return 404 on the published site.
5. When you are ready to launch `/salespage`, move the file back to `src/routes/salespage.tsx` and publish again.

Trade-off: `/salespage` will also not render inside the Lovable preview while the file is gone.

### Option B — Keep the route but block production traffic
1. Keep `src/routes/salespage.tsx` in place so it remains editable in preview.
2. Add a small guard that checks the hostname at runtime. If the visitor is on the public production domain (`www.entrepreneurawards.co` / `entrepreneurawards.co`), render a 404 or redirect to `/`. Preview and local dev URLs continue to show the page.
3. Keep the existing `noindex` meta tag and keep the page out of the navigation.

Trade-off: the route and its code still ship; it is only hidden by a runtime check. Someone with the URL could still see it if they spoof a preview host or if the check is missed in SSR.

## Suggested approach
Use Option A if "not live" means the URL should not exist publicly at all.
Use Option B if you need to keep polishing `/salespage` in the Lovable preview while the homepage changes are already public.

## Files involved
- `src/routes/salespage.tsx` — the route to remove or guard.
- `src/components/site-nav.tsx` — already has no link to `/salespage`; will stay unchanged.
- `.lovable/drafts/salespage-route.tsx` — proposed backup location if Option A is chosen.
