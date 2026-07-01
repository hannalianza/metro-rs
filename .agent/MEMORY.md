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

## Known Issues / Watch List
- Dev server must be running for site changes to appear
- After file edits, browser may need Ctrl+Shift+R hard refresh
- Restart dev server if changes still don't appear after hard refresh
- If port 3000 is already occupied by a stale process, `npm run dev` (or PowerShell) may auto-assign port 3001 instead — either use :3001 or free port 3000 first (`netstat -ano | findstr :3000` then `taskkill /PID <pid> /F`)
- The `start-metro-rs` desktop shortcut kills anything on port 3000 before starting — preferred way to restart the dev server cleanly
- OneDrive sync delay possible — allow a few seconds after saving
- **CRITICAL**: Contact form (`src/app/contact/page.tsx`) and Quote/Cart submission (`src/app/cart/page.tsx`) have no backend — `handleSubmit` just calls `preventDefault()` and shows a fake success state. No API route exists anywhere in `src/app`. Every quote request and contact message is currently lost silently. See `WEBSITE-IMPROVEMENTS.md` for full write-up.

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
