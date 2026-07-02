# Metro Restaurant Supply — Agent Context

## Project
- **Business**: Metro Restaurant Supply, Fife, WA
- **Owner**: Sungwoon (just4metrors@gmail.com)
- **Local site**: `http://localhost:3000`
- **Git/source-of-truth path**: `C:\Users\just4\OneDrive\문서\metro-rs` (has `.git`, remote `hannalianza/metro-rs`) — make all edits and git commits here.
- **LIVE DEV SERVER PATH**: `C:\Projects\metro-rs` — has NO `.git`. This is a one-time `robocopy` mirror (see `migrate-to-local.bat`) created to dodge OneDrive file-locking/sync-lag issues. The `start-metro-rs` desktop shortcut runs `npm run dev` from THIS folder, not the OneDrive one.
- **CRITICAL (mostly automated as of 2026-07-02)**: editing a file only in the OneDrive folder will NOT show up on `localhost:3000` on its own — but a background sync watcher (`sync-watcher.ps1`, launched automatically by `start-metro-rs`) now auto-copies any changed file from the OneDrive folder into `C:\Projects\metro-rs` within ~1 second, and the dev server hot-reloads on its own. No manual copy step needed for normal edits. Manual restart of `start-metro-rs` is still needed only for: new npm packages, `next.config.mjs`/config changes, or if a new file/folder doesn't get picked up.
- **This two-folder split is required, not just historical**: tested running `npm run dev` directly from the OneDrive folder (2026-07-01) and it crashes every time with a Node/libuv assertion (`fs-event.c` line 72) — OneDrive's Cloud Files sync filter is incompatible with Node's Windows file-watcher, even with `node_modules`/`.next` excluded via junctions. Do not try to consolidate into one OneDrive-only folder again; see `.agent/MEMORY.md` for the full test log.
- **Start dev server**: double-click `start-metro-rs` shortcut on Desktop. It runs `C:\Projects\metro-rs\_launch.bat`, which starts the sync watcher (minimized PowerShell window, title `metro-rs-sync`) and then `npm run dev`, both from `C:\Projects\metro-rs`.
- **Sync watcher details**: `C:\Users\just4\OneDrive\문서\metro-rs\sync-watcher.ps1` — one-directional (OneDrive → Projects only, never writes back). Skips `.git`, `node_modules`, `.next`, `.claude`, and anything starting with `_`. Does not propagate deletes/renames-away (stray files may need manual cleanup in Projects if something is deleted in OneDrive, though this is rare).
- **Main data file**: `src/data/products.ts` (edit in OneDrive — the watcher handles the rest)
- **IMPORTANT — Desktop `.bat` files are OneDrive-synced too and can fail silently**: `start-metro-rs.bat` on the Desktop must stay minimal (just `start "" "C:\Projects\metro-rs\_launch.bat"`). Putting the full watcher+dev-server logic directly in the Desktop file caused it to silently fail (no window, no error) most of the time when double-clicked from Explorer — root cause not fully confirmed, suspected OneDrive placeholder/hydration interference. Keep all real logic in `_launch.bat` inside `C:\Projects\metro-rs` (not OneDrive-backed) instead.

## Git Rules (MANDATORY — never break these)
- **NEVER** run `git push --force`, `git push -f`, `git push --force-with-lease`, or `git reset --hard` on `main`
- Always work on a **new branch**
- Publish changes only via **pull requests** through GitHub's UI
- If confused git state → **stop and ask**, never use destructive commands

## Tech Stack
- Next.js / TypeScript
- Product data lives in `src/data/products.ts`
- Price field format: `price: 195.00,`
- Warranty field format: `"Warranty": "3 Year Parts & Labor, 5 Year Compressor"`

## Key Suppliers
- **Atosa USA** — primary brand (Hannah Green, hannah@atosausa.com, 206-999-5209)
  - Warranty (as of July 1, 2026): Refrigeration = 3 yr parts & labor + 5 yr compressor; Ice machines = 2 yr parts & labor + 5 yr compressor & evaporator
  - Price list: 2026 Atosa Price List (Modified 07-01-2026)

## Agent Memory
See `.agent/MEMORY.md` for accumulated session knowledge.
See `.agent/USER.md` for user profile and preferences.
See `.agent/SKILLS.md` for recurring task procedures.
