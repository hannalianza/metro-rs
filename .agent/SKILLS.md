# Recurring Task Skills

## SKILL: Update Product Prices from Atosa Price List PDF
1. Download PDF from Gmail or attachment
2. Run pdfplumber to extract all model/price pairs (use MAP/IRP column = column index 4)
3. Grep products.ts for each model's "Model" field to find line numbers
4. Find price line within 30 lines above the Model field
5. Use Python script to batch-update all price lines
6. Verify with grep confirming new values
7. Hard refresh browser (Ctrl+Shift+R) to confirm on site

## SKILL: Update Warranty in products.ts
1. Grep for current warranty string
2. Use Edit tool with replace_all=true for global find/replace
3. Verify count of replacements matches expected
4. Note: ice makers don't have Warranty field — won't be affected

## SKILL: Check Gmail for Supplier Updates
1. Use mcp__62928c3a-e91a-4f37-b935-848dbed61ca5__search_threads
2. Query: `from:atosausa.com newer_than:7d` or `atosa newer_than:1d`
3. Use get_thread with threadId for full content + attachments
4. Ask user to manually download PDFs (Gmail blocks automated downloads)
5. Read PDFs from Downloads folder via pdfplumber

## SKILL: Start Local Dev Server
```
cd "C:\Users\just4\OneDrive\문서\metro-rs"
npm run dev
```
Then open http://localhost:3000

## SKILL: Update Product Image
1. Navigate to manufacturer page (atosausa.com/product/[model-slug])
2. Extract image URL via JavaScript: `Array.from(document.querySelectorAll('img')).map(img => img.src).filter(src => src.includes('MODEL'))`
3. Edit image field in products.ts

## SKILL: Verify Price Changes
```python
# Run after updates to confirm all prices match expected values
import re
with open("src/data/products.ts", "r") as f:
    lines = f.readlines()
# Check specific line numbers for expected values
```

## SKILL: Git Branching (safe workflow)
```bash
git checkout -b feature/price-update-YYYYMMDD
# make changes
git add -A
git commit -m "Update prices from Atosa July 2026 price list"
git push origin feature/price-update-YYYYMMDD
# Then open PR on GitHub — NEVER push to main directly
```
