# Website Improvement Analysis — Metro Restaurant Supply

**Date:** July 1, 2026
**Prepared by:** Claude (Cowork), at Sungwoon's request
**Purpose:** Customer-experience audit of metro-rs (localhost:3000) — for discussion with codeveloper

Reviewed: homepage, product listing (470 products), a product detail page, cart/quote flow, About Us, Contact — plus the underlying source in `src/app`.

## 1. Critical — quote/contact forms don't submit anywhere

This is the most urgent issue. Checked the code directly:

- `src/app/contact/page.tsx` — `handleSubmit` calls `e.preventDefault()` and sets `submitted = true`. That's it. No fetch, no API call, no email.
- `src/app/cart/page.tsx` (the "Quote List" flow) — `handleSubmitQuote` clears the cart and shows a "Quote Request Submitted!" success screen, but never sends the data anywhere either.
- There is no `api/` route anywhere under `src/app`, and no email/backend integration in the project at all.

**Impact:** Every customer who fills out "Request a Quote" or the Contact form sees a success message, but Sungwoon never receives it. The business has likely been losing leads silently since these pages went live, with no error or signal that anything is wrong.

**Suggested fix:** wire both forms to an actual endpoint — e.g. a Next.js API route that sends an email (Resend, SendGrid, or a simple `mailto` fallback) or writes to a simple store (Airtable, Google Sheet, or a database). Should be relatively small scope for a codeveloper to add.

## 2. No customer reviews or testimonials

Nothing on the site (homepage, product pages, About Us) shows past customer feedback. For $2,000–$14,000 equipment purchases, social proof (reviews, star ratings, "trusted by X restaurants") meaningfully affects buyer confidence. Currently the only trust signals are the "Free Delivery / Expert Installation / Warranty Included / Fife Showroom" badges.

## 3. No price filter or price sort on the product catalog

The `/products` page (470 items) only offers: text search, category dropdown, brand dropdown, and "Sort By: Name (A-Z)". There's no price range filter and no "price: low to high / high to low" sort option — a common expectation for a catalog this size, especially for budget-conscious restaurant buyers comparing equipment.

## 4. No site-wide search

The search box exists only on the `/products` listing page. It's not in the header/nav, so a customer on the homepage, a product page, or About Us has no quick way to search — they have to navigate back to Products first.

## 5. Product pages show a single image, no gallery/zoom

Checked a sample product page (AA-410G faucet) — one product photo, no gallery, no zoom. For commercial kitchen equipment, buyers often want to see multiple angles, dimensions diagrams, or interior views before committing.

## 6. Financing is mentioned but not actionable

The homepage FAQ (schema.org FAQPage, so it's good for SEO) says: *"We partner with trusted lenders to offer flexible financing for qualifying restaurants..."* — but there's no financing application link, contact CTA, or dedicated page tied to that answer. It's just text with no next step.

## 7. No delivery-zone/shipping estimate tool

Free delivery within the "greater Tacoma and Seattle metro area" is marketed on the homepage and trust bar, but there's no way for a customer to check whether their address qualifies or get a shipping estimate for equipment outside that zone — they'd have to contact the store directly (via a form that, per #1, doesn't currently reach anyone).

---

## Suggested priority order

1. Fix quote/contact form submission (critical — actively losing leads)
2. Add price filter/sort to product catalog
3. Add header search
4. Add reviews/testimonials section
5. Product image galleries
6. Financing CTA/page
7. Delivery zone checker

*Full context and session history available in `.agent/MEMORY.md`.*
