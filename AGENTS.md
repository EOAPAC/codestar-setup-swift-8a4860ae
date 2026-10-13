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

- The Winner's Feature v2 preview and article overlay read the existing `FEATURES` data directly; keep this page's presentation local so other winner and offer pages remain unchanged.
- Business-name personalization uses a browser-safe helper with tests for sanitization and placeholder replacement so URL input never becomes markup.
