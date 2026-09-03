# Saluting Lou — Tribute Collection Landing Page

A standalone marketing/landing site for the Lou Holtz tribute t-shirt line,
built to sit **alongside** your existing Shopify store at
[ndshirt.com](https://ndshirt.com) — it spotlights the new **Saluting Lou**
launch and the full collection, and hands off to Shopify for actual size
selection, cart, and checkout.

It's plain HTML/CSS/JS — no build step, no framework, no dependencies.

## Files

- `index.html` — page structure/content
- `styles.css` — all styling (navy/gold ND palette, responsive)
- `script.js` — product data, countdown timer, filters, mobile nav, scroll animations

## How it integrates with Shopify

You don't need any API keys for this to work:

- **"Shop Now" buttons** link directly to your real Shopify product pages
  (e.g. `ndshirt.com/products/saluting-lou-navy-blue`). Shoppers pick a size
  and check out exactly as they do today — nothing about your existing
  checkout changes.
- **Newsletter signup** posts directly to your Shopify store's built-in
  customer form (`https://ndshirt.com/contact#ContactFooter`, `form_type=customer`).
  This is the same markup Shopify themes use natively, so signups land in
  your real Shopify customer list (tagged `newsletter,saluting-lou-launch`)
  even though this page can be hosted anywhere.

### The current lineup (4 designs, 6 listings)

`PRODUCTS` in `script.js` holds the full catalog shown on the site. Right
now that's:

| Product | Price | URL status |
|---|---|---|
| Saluting Lou (Navy Blue) | $26.00 | ✅ confirmed |
| Saluting Lou (Gold) | $26.00 | ✅ confirmed |
| Saluting Lou (White) | $26.00 | ⚠️ guessed slug — verify |
| Under the Same Sky (Navy Blue) | $33.98 | ✅ confirmed |
| Do Your Job (Navy Blue) | $33.98 | ✅ confirmed |

One thing to double check: your catalog page showed Saluting Lou (Navy)
at $15.50, but the product page itself showed $26.00 — I went with $26.00
since that's the more direct source, but worth confirming which is
correct in Shopify admin before launch.

When a new design goes live (or an existing one gets a new colorway),
add one object to the `PRODUCTS` array at the top of `script.js` — nothing
else in the file needs to change, the grid re-renders automatically from
that list.

### Product photos

All 5 current listings use the real product photos in `images/`
(cropped to trim the mockup's excess whitespace, resized to ~1000px on
the long side, saved as `.webp`). Each product in `PRODUCTS` has an
`image` field pointing to its file; `renderProducts()` uses that when
present.

The `design`/`shirt`/`ink` fields on each product are only a fallback —
if a future product is added without an `image` yet, it automatically
falls back to a small SVG icon (see `teeSVG()`/`designArt()`) instead of
showing nothing. To add a photo for a new product:

1. Export/download the product image from Shopify admin.
2. Crop/resize it (trim the mockup's white margin, ~1000px long side is
   plenty) and save it into `images/` as `.webp` or another web format.
3. Add an `image: 'images/your-file.webp'` field to that product in
   `PRODUCTS` — nothing else needs to change.

## Where to host it

Pick whichever fits your workflow:

- **Separate domain/subdomain** (recommended, fastest): deploy as-is to
  Netlify, Vercel, Cloudflare Pages, or GitHub Pages, then link to it from
  your Shopify nav/social bios. Zero risk to your live store.
- **As a Shopify page**: paste the HTML content into a Shopify "page" via
  the theme's HTML editor (you'll need to inline `styles.css`/`script.js`
  or upload them as theme assets, since custom pages can't reference
  arbitrary external files by relative path).
- **Custom domain root**: if you want `ndshirt.com` itself to show this,
  that requires replacing your Shopify theme's homepage — bigger change,
  ask if you want help with that route instead.

## Local preview

No build tools needed — just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Customizing

- **Sale end date**: the countdown always targets "this Friday, 11:59pm
  local time." If your sale end date is fixed regardless of day-of-week,
  replace the logic in `initCountdown()` in `script.js` with a hard-coded
  `new Date('2026-09-05T23:59:59')`-style target.
- **Colors/fonts**: all in the `:root` variables at the top of `styles.css`.
- **Legal**: a small disclaimer is included in the footer/FAQ noting this
  is an independent fan tribute, not officially licensed by the University
  of Notre Dame — worth keeping given ND's trademarks, but adjust wording
  to match however you've handled it on the main store.
