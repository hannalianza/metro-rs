# Metro Restaurant Supply — Agent Context

## Project
- **Business**: Metro Restaurant Supply, Fife, WA
- **Owner**: Sungwoon (just4metrors@gmail.com)
- **Local site**: `http://localhost:3000`
- **Project path**: `C:\Users\just4\OneDrive\문서\metro-rs`
- **Start dev server**: `cd "C:\Users\just4\OneDrive\문서\metro-rs" && npm run dev`
- **Main data file**: `src/data/products.ts`

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
