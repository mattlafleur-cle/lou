# Saluting Lou: Tribute Collection Landing Page

A standalone marketing/landing site for the Lou Holtz tribute t-shirt line,
built to sit **alongside** your existing Shopify store at
[ndshirt.com](https://ndshirt.com): it spotlights **Saluting Lou** and the
full Lou Holtz tribute collection, and hands off to Shopify for actual size
selection, cart, and checkout.

It's plain HTML/CSS/JS: no build step, no framework, no dependencies.

## Files

- `index.html`: page structure/content
- `styles.css`: all styling (navy/gold ND palette, responsive)
- `script.js`: mobile nav, scroll animations, optional click events

## How it integrates with Shopify

No API keys are involved. The page is a brand landing page; ndshirt.com
(Shopify) handles size selection, cart, and checkout.

- Each product card links to its exact ndshirt.com product page.
- Collection-wide buttons link to `ndshirt.com/collections/lou-holtz`.
- Outbound links carry `utm_source=theloushirt.com` parameters so Shopify
  analytics can attribute visits and orders to this site, plus a
  `data-track` label for optional click events (see `script.js`).

### The current lineup (3 designs, 6 Shopify products)

Verified against the live ndshirt.com catalog on 2026-10-23:

| Card | Shopify product | Sizes |
|---|---|---|
| Saluting Lou, navy shirt, white print | `/products/saluting-lou-navy-blue` | XS to 5XL |
| Saluting Lou, gold print on navy | `/products/saluting-lou-gold` | XS to 5XL |
| Saluting Lou, white shirt, navy print | `/products/saluting-lou-white` | XS to 5XL |
| Saluting Lou, heather green, gold print | `/products/saluting-lou-green` | XS to 3XL |
| Under the Same Sky, navy | `/products/lou-same-sky` | XS to 5XL |
| Do Your Job, navy | `/products/lou-holtz-do-your-job` | XS to 5XL |

Prices vary by size on every product: XS and S $21, M $24, L to 2XL $26,
3XL and up $29. The page says "From $21" and lists the ladder. If Shopify
prices or sizes change, update the cards, the price note, the FAQ, and
the meta description in `index.html`.

### Adding a design or colorway

The product grid is static HTML (so search engines and no-JS visitors see
it). Copy one `<article class="product-card">` block in `index.html`,
then update its image, alt text, color line, sizes, and product URL.

Product images: export from Shopify, trim the white margin, and save
400px and 800px wide WebP versions into `images/opt/` (see the existing
`*-400.webp` / `*-800.webp` pairs). Keep `width`/`height` on the `<img>`
so the layout does not shift while images load.

### SEO and performance files

- `robots.txt` allows crawling and points to `sitemap.xml`.
- `sitemap.xml` lists the one canonical URL. Update `<lastmod>` only
  when the page content meaningfully changes.
- `404.html` is served by GitHub Pages with a real 404 status.
- Fonts are self-hosted in `fonts/` (SIL Open Font License); there is no
  Google Fonts dependency.
- The hero image is served as AVIF/WebP at three sizes from
  `images/opt/`; the original files in `images/` are kept as sources.

## Where to host it

Currently hosted on **GitHub Pages**, pointed at the custom domain
**theloushirt.com** (registered at Hostinger). The repo already has the
`CNAME` file GitHub Pages needs; the remaining setup is DNS at Hostinger:

1. Log into Hostinger → **hPanel → Domains → theloushirt.com → DNS / Nameservers → DNS Zone Editor**.
2. Add four **A** records so the bare domain (`theloushirt.com`) points at GitHub Pages:

   | Type | Name | Points to |
   |---|---|---|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |

3. Add one **CNAME** record so `www.theloushirt.com` also works:

   | Type | Name | Points to |
   |---|---|---|
   | CNAME | www | mattlafleur-cle.github.io |

4. Remove/replace any existing A or CNAME record already sitting on `@` or
   `www` (e.g. Hostinger's default parking-page record): only one record
   set per name is allowed.
5. Back in GitHub: **Settings → Pages** on this repo should already show
   `theloushirt.com` as the custom domain (from the `CNAME` file). Once
   DNS propagates (minutes to a few hours), it'll show "DNS check
   successful": then check **Enforce HTTPS** if it isn't already checked.

DNS changes can take anywhere from a few minutes to 24-48 hours to fully
propagate. Until then, `https://mattlafleur-cle.github.io/lou/` keeps
working as before.

### Other hosting options (not what's currently set up)

- **As a Shopify page**: paste the HTML content into a Shopify "page" via
  the theme's HTML editor (you'll need to inline `styles.css`/`script.js`
  or upload them as theme assets, since custom pages can't reference
  arbitrary external files by relative path).
- **ndshirt.com root**: if you ever want `ndshirt.com` itself to show this
  instead of a separate domain, that requires replacing your Shopify
  theme's homepage: bigger change, ask if you want help with that route.

## Local preview

No build tools needed: just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Customizing

- **Colors/fonts**: all in the `:root` variables at the top of `styles.css`.
- **Disclaimer**: the footer, FAQ, and "How ordering works" section note
  that this is an independent fan tribute, not affiliated with or endorsed
  by the University of Notre Dame. Keep the wording consistent with the
  store.
