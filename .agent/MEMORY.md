# Project Memory

## Completed Work Log

### 2026-06-29 / 2026-06-30
- Updated 20 Atosa work table prices (ST series)
- Updated 8 wall shelf prices (SSWS-12 series)
- Updated MPRA-SP price to $127 and image URL to 2024/10 version
- Updated all refrigeration warranties: "2 Year" → "3 Year Parts & Labor, 5 Year Compressor"
- Applied 16 price changes from 2026 Atosa Price List (Modified 07-01-2026)
- Verified all 16 changes confirmed correct via script

### 2026-07-01
- Atosa email from Hannah Green (hannah@atosausa.com):
  - Subject: "Refrigeration warranty going to 3 years parts and labor warranty"
  - Attachments: price list + July 1st updates letter
  - Warranty change effective July 1, 2026 (already applied)
  - Ice machine pricing reduced

### 2026-07-01 (cont.)
- Ran a customer-experience audit of the live site at owner's request; found the quote/contact forms don't actually submit anywhere. Full findings saved to `WEBSITE-IMPROVEMENTS.md` in project root — owner is discussing with codeveloper.
- Fixed contact form + quote/cart form to build a pre-filled mailto: link on submit (committed on branch `fix/critical-form-submission`).
- Discovered the live dev server actually runs from `C:\Projects\metro-rs` (a stale one-time robocopy mirror, no git), NOT the OneDrive folder — see Known Issues above. Lost significant time before catching this; now documented so it doesn't happen again.
- Added new "Rice Cooker and Warmer" category (slug `rice-cookers-warmers`) with 4 products, all `callForPrice: true` per owner instruction: Rinnai RER55ASN (gas), CUCKOO CR-3032 (electric), Thunder Group SEJ18000 + SEJ22000 (warmers). Committed on branch `feature/rice-cooker-warmer-category`.
- Investigated the OneDrive repo's git history and found `main` has diverged from `origin/main`: local `main` has ~10+ unpushed commits (the real product-catalog work — Refrigeration-X products, Atosa company products, Back Bar Coolers, Display Coolers, Countertop Merchandisers, DSRC-28, etc.), while GitHub's `main` separately gained 6 commits local doesn't have (SEO metadata, sitemap/robots.txt, Google Analytics, CLAUDE.md, image alt text — PRs #3-#8). Both forked from the same commit (`038a4af "Update metro-rs site"`). Nothing is lost, but this needs a reconciliation merge (via PR, not a direct push) before opening any new PRs from `fix/critical-form-submission` or `feature/rice-cooker-warmer-category` — otherwise the PR diff will look confusing/huge. **Not yet resolved** — owner was informed, decided to first explore fixing the two-folder setup instead (see below).
- Tried to eliminate the two-folder split by running the dev server directly from the OneDrive folder (with `node_modules`/`.next` junctioned out to `C:\devcache\metro-rs` to dodge OneDrive sync locking). **This does NOT work and should not be retried**: Next.js's dev server file-watcher crashes immediately on every start with `Assertion failed: !_wcsnicmp(filename, dir, dirlen), file src\win\fs-event.c, line 72` — a known Node.js/libuv incompatibility between Windows' `ReadDirectoryChangesW` file watching and OneDrive's Cloud Files filter driver. This happened even AFTER reverting the junctions (real folders, still inside OneDrive) — so it's not about junctions, it's that OneDrive's sync filter intercepts file-system watch calls anywhere in a synced tree and libuv can't handle it. Confirmed via `_diag_start2.bat` test script (now deleted). **Conclusion: the dev server cannot run from inside the OneDrive-synced folder, period — the two-folder setup (`C:\Projects\metro-rs` for `npm run dev`, OneDrive folder for git) is a hard technical requirement, not just a historical accident.** All junction/shortcut changes were fully reverted; `start-metro-rs.bat` on the Desktop points back at `C:\Projects\metro-rs` as before.

### 2026-07-02
- Owner asked to remove the manual "copy changed files into Projects" step (the real pain point, not the two-folder split itself). Built a one-directional auto-sync watcher instead of trying to eliminate the two folders again:
  - `sync-watcher.ps1` (lives in OneDrive root) — PowerShell `FileSystemWatcher`, watches the OneDrive folder recursively, copies any changed file into `C:\Projects\metro-rs` within ~1 second. Skips `.git`, `node_modules`, `.next`, `.claude`, and anything starting with `_`. One-directional only (OneDrive → Projects), never writes back into OneDrive, so git/source-of-truth safety is unaffected.
  - `C:\Projects\metro-rs\_launch.bat` (NOT in OneDrive) — the real launch logic: starts the sync watcher minimized (`start "metro-rs-sync" /min powershell ...`), kills anything on port 3000, then `call npm run dev`. Must use `call npm run dev`, not bare `npm run dev` — without `call`, when it's the last line of a batch file, the console window vanishes with no error (confirmed by reproducing both ways).
  - `start-metro-rs.bat` on the Desktop is now just a one-line launcher: `start "" "C:\Projects\metro-rs\_launch.bat"`. **Important discovery**: putting the full watcher+dev-server logic directly into the Desktop `.bat` (which is itself inside OneDrive, since Desktop is OneDrive-redirected) made it silently fail almost every time when double-clicked from Explorer — no window, no error, nothing. Moving the real logic into `_launch.bat` inside `C:\Projects\metro-rs` (a plain non-OneDrive folder) and leaving only a trivial `start` call on the Desktop fixed it reliably. Root cause not fully confirmed (suspected OneDrive placeholder/hydration + Explorer's exec-from-cloud-folder handling), but the fix is solid — verified with 5+ repeated launches.
  - End-to-end tested: edited `products.ts` in OneDrive (added a `[SYNC-TEST]` marker to a description), watcher copied it to Projects within ~1s, dev server recompiled automatically, change appeared on `localhost:3000` with no manual action. Reverted the test edit the same way.
  - Net result: editing files in OneDrive now shows up on `localhost:3000` automatically (hot-reload, no restart) for normal content/code changes. Restarting `start-metro-rs` is still needed only for new npm packages or config file changes (`next.config.mjs`, etc.) — same as any normal Next.js dev workflow.
- Also noticed `git-push.bat` (in OneDrive project root) commits directly to `main` with a hardcoded message ("Add all Refrigeration-X products") and pushes straight to `origin main` — this violates the project's own git safety rules (no direct pushes to main, PRs only) and is the likely source of the "Refrigeration-X products" commits sitting unpushed on local `main` (see git divergence note above) or of a prior overwrite the codeveloper flagged. **Not yet cleaned up / neutered — flag before anyone runs it again.**

## Known Issues / Watch List
- **TWO SEPARATE COPIES OF THIS PROJECT EXIST (now auto-synced as of 2026-07-02)**: `C:\Users\just4\OneDrive\문서\metro-rs` (has git, this is where you should edit + commit) and `C:\Projects\metro-rs` (NO git, this is what `npm run dev`/`start-metro-rs` actually serves at localhost:3000). They do NOT git-sync, but a background watcher (`sync-watcher.ps1`, auto-started by `start-metro-rs`) now copies file changes from OneDrive into Projects within ~1 second, and the dev server hot-reloads automatically — no manual copy step needed for normal edits. If the watcher isn't running (e.g. `start-metro-rs` was never launched, or the `metro-rs-sync` PowerShell window was closed), you're back to the old manual-copy requirement — check for that window if changes stop appearing. When ready to publish, git operations (branch/commit/push/PR) happen ONLY in the OneDrive copy — `C:\Projects\metro-rs` has no `.git` and must never be used for git.
- Dev server must be running for site changes to appear
- After file edits, browser may need Ctrl+Shift+R hard refresh
- Restart dev server if changes still don't appear after hard refresh (see above — first check you actually edited the `C:\Projects\metro-rs` copy)
- If port 3000 is already occupied by a stale process, `npm run dev` (or PowerShell) may auto-assign port 3001 instead — either use :3001 or free port 3000 first (`netstat -ano | findstr :3000` then `taskkill /PID <pid> /F`)
- The `start-metro-rs` desktop shortcut kills anything on port 3000 before starting — preferred way to restart the dev server cleanly
- `clear-cache.bat` (in OneDrive project root) deletes `.next` — use if a restart alone doesn't pick up changes (rare; usually the real cause is the two-copies issue above)
- OneDrive sync delay possible — allow a few seconds after saving; also `.git` operations inside the OneDrive folder can hit stale/phantom lock files (`.git/index.lock`) that `rm`/bash can't clear due to sandbox permission limits — delete via real File Explorer on the user's machine instead, or run git commands via a `.bat` file double-clicked in File Explorer (bash git has been unreliable in this OneDrive-synced folder all session; a `.bat` run directly on Windows is more trustworthy)
- **CRITICAL**: Contact form (`src/app/contact/page.tsx`) and Quote/Cart submission (`src/app/cart/page.tsx`) had no backend — FIXED 2026-07-01 (see below), now uses a mailto: fallback since the site is `output: "export"` (static, no API routes possible).
- Product prices can be `callForPrice: true` (see Product interface) for "Call for Price" items instead of a numeric price — ProductCard, ProductDetailClient, and cart page all handle this; cart total math and mailto quote body exclude these items' price contribution.

## Product Data Notes
- `src/data/products.ts` is the single source of truth for all product data
- Ice makers (im-001 through im-006) do NOT have a Warranty field in specs
- Work tables and shelves are in the "work-tables" category
- Price column in Atosa PDF: use MAP/IRP (column 4), not List Price or UMRP

## Atosa Model Naming Patterns
- ST####EC = work table (flat shelf), ST####ECB4 = with 4" backsplash
- SSWS-12## = wall shelf (## = width in inches)
- MPRA-## = pan rack
- MBF#### = top mount reach-in
- MBF8###GR = bottom mount reach-in
- MCF#### = glass door merchandiser
- MGF/AUR#### = undercounter refrigerator
