<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- The Winner's Feature preview and article overlay read the existing `FEATURES` data directly; keep this page's presentation local so other winner and offer pages remain unchanged.
- The Categories page uses isolated mock category data and scoped styling; its displayed prices and eligibility must never configure live forms or checkout. Redirect /awards permanently to /categories to preserve the old public URL.
- Categories sample image sources live in the browser-safe mock content module; the hero preloads and cycles client-side with hover pause and reduced-motion support to stay SSR-safe.
- Entry-fee presentation reads the browser-safe `src/content/entry-fees.ts` values so homepage, FAQ and payment-page amounts stay consistent without altering checkout configuration.
- Business-name personalization uses a browser-safe helper with tests for sanitization and placeholder replacement so URL input never becomes markup.
- Keep homepage statistics in a dedicated browser-safe component with scoped styles and tested data/counting logic so its animation does not alter other page sections.
- Scope colour-restoration styles to homepage, Criteria and FAQ classes; their trophy headers reuse the Winners asset without changing the directory or shared CTA presentation.
- Keep the homepage comparison route as an independent copy with its own scoped presentation; its test entry form uses isolated browser-only data and storage, with no submission or checkout imports, so comparisons cannot affect live forms or send entries.
