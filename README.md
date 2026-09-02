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

### ⚠️ Before you launch: fix placeholder product URLs

I only had confirmed URLs for 3 products from your screenshots. The rest
point to `ndshirt.com/collections/all` as a safe fallback and are marked
`// TODO: verify` in `script.js` — open that file and swap in the exact
product URL from Shopify admin for each:

| Product | Status |
|---|---|
| Saluting Lou (Navy Blue) | ✅ confirmed |
| Under the Same Sky (Navy Blue) | ✅ confirmed |
| Do Your Job (Navy Blue) | ✅ confirmed |
| Saluting Lou (White) | ⚠️ guessed slug — verify |
| Leave No Doubt (all 6 variants) | ⚠️ placeholder — needs real URLs |

Easiest way to grab them: open each product in Shopify admin → **View** →
copy the URL, then paste into the matching `url:` field in `PRODUCTS` at
the top of `script.js`.

### Product photos

Product cards currently use generated placeholder "tee" graphics (colored
silhouettes with the design name) so the page works immediately with zero
image assets. To use real product photography instead:

1. Export/download the product images from Shopify admin.
2. Drop them in an `images/` folder here.
3. In `script.js`, add an `image: 'images/saluting-lou-navy.png'` field to
   a product and swap the `teeSVG(...)` call in `renderProducts()` for an
   `<img>` tag when `p.image` is set.

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
