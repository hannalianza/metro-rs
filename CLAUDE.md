# Metro Restaurant Supply

E-commerce / showroom site for Metro Restaurant Supply (Fife, WA). Next.js 14 App Router with **static export**, deployed to **Cloudflare Pages**.

## Deployment — DO NOT set up new deployments

The site is already deployed to Cloudflare Pages. Cloudflare watches the `main` branch and auto-deploys whenever it updates. **Merging a PR is the entire publish step.**

When the user asks about "deploying", "publishing", "pushing to prod", or anything similar:

- ✅ Do explain: "Just merge the PR — Cloudflare auto-deploys from `main` within ~2-3 minutes."
- ❌ Do NOT suggest Vercel, Netlify, or any other host
- ❌ Do NOT suggest running `next build && next export` manually
- ❌ Do NOT suggest setting up a new deployment pipeline
- ❌ Do NOT touch `next.config.mjs` (`output: "export"`) or `.node-version` — they exist for Cloudflare specifically

## Git rules — NEVER force-push or rewrite shared history

- **NEVER** run `git push --force`, `git push -f`, `git push --force-with-lease`, or `git reset --hard` against `main` (or any branch the user shares)
- **NEVER** rebase `main`
- If git state is confusing — uncommitted changes you don't recognize, conflicts, a divergent branch — STOP and ask the user. Do not "fix" it with destructive commands.
- Branch protection on `main` will block force-pushes at the GitHub level, but you should not even attempt them. Treat shared history as immutable.

The workflow is always: `git checkout -b new-branch` → commit → push → open PR → merge in GitHub UI → done.

## Static export constraints

Because this site uses `output: "export"`, the production build cannot include:

- Server-side API routes (`src/app/api/.../route.ts`) that use `nextUrl.searchParams`, `fs`, `cookies()`, `headers()`, or any runtime request data
- `getServerSideProps`, server actions, middleware, or anything else that requires a Node runtime
- Dynamic image optimization (use `unoptimized` or external image hosts)

Anything you write must work as a fully static page at build time. If a feature genuinely needs a server, raise it with the user before building it.

## Tech stack

- Next.js 14.2.x (App Router) + TypeScript
- Tailwind CSS v3.4 (`tailwind.config.ts`, `src/app/globals.css`)
- Inter font via `next/font/google`
- Google Analytics 4 via `@next/third-parties/google` (Measurement ID `G-34M8FE2VFG`, configured in `src/app/layout.tsx`)
- No backend, no database, no auth — product data is hardcoded in `src/data/products.ts`

## Workflow

1. Start from `main`: `git fetch origin && git checkout -b descriptive-branch-name origin/main`
2. Make changes
3. Verify locally: `npm run build` must succeed (it generates ~466 static pages)
4. Commit with a clear, one-line subject ("Add X", "Fix Y", "Update Z")
5. Push, open PR via `gh pr create`
6. The user merges via GitHub UI → Cloudflare auto-deploys

## Repo

- GitHub: `hannalianza/metro-rs`
- Live: `https://metrorestaurantsupply.com/`
- Owner: Hanna (`hannalianza`)
