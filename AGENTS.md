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

# Project rules

- App data (users, session, posts, likes) lives in browser localStorage via `src/lib/store.ts`; there is no backend, so all reads happen client-side after hydration.
- Static heritage content for the 10 states lives in `src/lib/heritage.ts`; screens import from it rather than fetching.
- Every signed-in screen renders inside `src/components/AppShell.tsx`, which owns the responsive desktop navigation rail, mobile bottom navigation, and auth redirect; this keeps navigation behavior consistent across screen sizes.
- Form validation uses zod schemas in `src/lib/validators.ts`; read messages through `fieldError()` because strict index-signature access is enabled.
