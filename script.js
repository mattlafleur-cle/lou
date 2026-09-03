// =========================================================
// Saluting Lou — Tribute Collection
// Product data + interactions
//
// IMPORTANT: One `url` value below is a best-guess placeholder (marked
// "TODO: verify"). Confirmed-working URLs are marked accordingly.
// =========================================================

// Every "Shop Now" button on the site (product cards, hero, sticky buy
// bar) currently opens the full catalog in a new tab rather than an
// individual product page — see initShopLinks() below and the matching
// hardcoded hrefs in index.html. Change this one constant to point
// "Shop Now" at the catalog elsewhere, or somewhere else entirely.
const SHOP_ALL_URL = 'https://ndshirt.com/collections/all';

// The full current lineup — 4 designs, 6 listings (Saluting Lou comes in
// three colorways). Add a new row here when a new design or colorway
// goes live; nothing else in this file needs to change. Each `url` is
// kept for reference (e.g. if you want a specific product linked again
// later) even though the rendered "Shop Now" button uses SHOP_ALL_URL.
const PRODUCTS = [
  {
    name: 'Saluting Lou',
    variant: 'Navy Blue',
    price: '26.00',
    tag: 'New · Launching Today',
    url: 'https://ndshirt.com/products/saluting-lou-navy-blue', // confirmed
    design: 'saluting-lou',
    shirt: '#0d1b3f',
    ink: '#f7f4ec'
  },
  {
    name: 'Saluting Lou',
    variant: 'Gold',
    price: '26.00',
    tag: 'New',
    url: 'https://ndshirt.com/products/saluting-lou-gold', // confirmed
    design: 'saluting-lou',
    shirt: '#0d1b3f',
    ink: '#c9a961'
  },
  {
    name: 'Saluting Lou',
    variant: 'White',
    price: '26.00',
    tag: 'New',
    url: 'https://ndshirt.com/products/saluting-lou-white', // TODO: verify exact slug
    design: 'saluting-lou',
    shirt: '#f7f4ec',
    ink: '#0d1b3f'
  },
  {
    name: 'Under the Same Sky',
    variant: 'Navy Blue',
    price: '33.98',
    tag: null,
    url: 'https://ndshirt.com/products/lou-same-sky', // confirmed
    design: 'under-the-sky',
    shirt: '#0d1b3f',
    ink: '#c9a961'
  },
  {
    name: 'Do Your Job',
    variant: 'Navy Blue',
    price: '33.98',
    tag: null,
    url: 'https://ndshirt.com/products/lou-holtz-do-your-job', // confirmed
    design: 'do-your-job',
    shirt: '#0d1b3f',
    ink: '#c9a961'
  }
];

// ---------- product artwork ----------
// Each design gets its own hand-drawn placeholder that echoes the real
// print (see README "Product photos") rather than a generic name-on-shirt
// card. Swap these for real product photography when it's ready.
const TEE_PATH = 'M70 10 L20 40 L35 75 L60 62 V240 A6 6 0 0 0 66 246 H154 A6 6 0 0 0 160 240 V62 L185 75 L200 40 L150 10 C150 28 132 40 110 40 C88 40 70 28 70 10 Z';

function designArt(p) {
  switch (p.design) {
    case 'saluting-lou':
      return `
        <text x="110" y="122" text-anchor="middle" font-size="34">🤟</text>
        <text x="110" y="158" text-anchor="middle" font-family="Inter, sans-serif"
              font-weight="800" font-size="34" letter-spacing="1" fill="${p.ink}">LOU</text>
        <text x="110" y="122" text-anchor="middle" font-size="34" transform="translate(148,0) scale(-1,1) translate(-148,0)">🤟</text>
      `;
    case 'under-the-sky':
      // Solid silhouette (not a stick figure): head, coat-shaped torso, one
      // arm raised toward the stars, one arm at the side. All filled shapes.
      return `
        ${starsMarkup()}
        <circle cx="103" cy="132" r="9" fill="${p.ink}"/>
        <path d="M103 141 Q90 143 85 156 L79 214 Q103 226 127 214 L121 156 Q116 143 103 141 Z" fill="${p.ink}"/>
        <path d="M114 148 Q128 146 133 132 L142 100 Q145 94 150 97 Q152 102 149 108 L138 144 Q131 160 113 160 Z" fill="${p.ink}"/>
        <path d="M89 150 Q80 155 78 172 L74 206 Q78 210 83 207 L89 174 Q92 160 89 150 Z" fill="${p.ink}"/>
        <text x="110" y="238" text-anchor="middle" font-family="Playfair Display, serif" font-weight="700" font-size="12" letter-spacing="2" fill="${p.ink}">UNDER THE SKY</text>
      `;
    case 'do-your-job':
      // Bust silhouette: rounded head + jacket-shaped shoulders as one
      // continuous filled shape, like a portrait cutout.
      return `
        <text x="110" y="98" text-anchor="middle" font-family="Inter, sans-serif" font-weight="800" font-size="19" letter-spacing="1" fill="${p.ink}">DO</text>
        <text x="110" y="120" text-anchor="middle" font-family="Inter, sans-serif" font-weight="800" font-size="19" letter-spacing="1" fill="${p.ink}">YOUR</text>
        <text x="110" y="142" text-anchor="middle" font-family="Inter, sans-serif" font-weight="800" font-size="19" letter-spacing="1" fill="${p.ink}">JOB</text>
        <circle cx="110" cy="172" r="15" fill="${p.ink}"/>
        <path d="M110 184 Q80 186 74 214 Q74 222 82 222 L138 222 Q146 222 146 214 Q140 186 110 184 Z" fill="${p.ink}"/>
        <text x="110" y="240" text-anchor="middle" font-family="Playfair Display, serif" font-style="italic" font-size="12" fill="${p.ink}">Lou Holtz</text>
      `;
    default:
      return `<text x="110" y="130" text-anchor="middle" font-family="Playfair Display, serif" font-weight="700" font-size="17" fill="${p.ink}">${p.name}</text>`;
  }
}

function starsMarkup() {
  const pts = [[40,40],[70,25],[100,45],[135,20],[165,42],[55,60],[150,65],[95,15],[180,58]];
  return pts.map(([x, y], i) => {
    const r = i % 3 === 0 ? 2.2 : 1.4;
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="#e3c47a" opacity="${0.5 + (i % 3) * 0.2}"/>`;
  }).join('');
}

function teeSVG(p) {
  return `
  <svg class="tee" viewBox="0 0 220 260" xmlns="http://www.w3.org/2000/svg">
    <path d="${TEE_PATH}" fill="${p.shirt}" stroke="rgba(0,0,0,.08)" stroke-width="1.5"/>
    ${designArt(p)}
  </svg>`;
}

// ---------- render product grid ----------
function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map(p => `
    <article class="product-card">
      <div class="product-visual">
        ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ''}
        ${teeSVG(p)}
      </div>
      <div class="product-body">
        <div class="product-name">${p.name}</div>
        <div class="product-variant">${p.variant}</div>
        <div class="product-price">$${p.price}</div>
        <a class="product-cta" href="${SHOP_ALL_URL}" target="_blank" rel="noopener noreferrer">Shop Now</a>
      </div>
    </article>
  `).join('');
}

// ---------- mobile nav ----------
function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const header = document.querySelector('.site-header');
  if (!toggle || !header) return;
  toggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------- countdown to end of this week's Friday ----------
function initCountdown() {
  const els = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    mins: document.getElementById('cd-mins'),
    secs: document.getElementById('cd-secs')
  };
  if (!els.days) return;

  function nextFridayEnd() {
    const now = new Date();
    const target = new Date(now);
    const day = now.getDay(); // 0 Sun ... 5 Fri ... 6 Sat
    let daysUntilFriday = (5 - day + 7) % 7;
    // if it's already Friday but past end-of-day, roll to next week
    if (day === 5 && now.getHours() >= 23 && now.getMinutes() >= 59) {
      daysUntilFriday = 7;
    }
    target.setDate(now.getDate() + daysUntilFriday);
    target.setHours(23, 59, 59, 0);
    return target;
  }

  const target = nextFridayEnd();

  function tick() {
    const now = new Date();
    let diff = Math.max(0, target - now);
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= d * (1000 * 60 * 60 * 24);
    const h = Math.floor(diff / (1000 * 60 * 60));
    diff -= h * (1000 * 60 * 60);
    const m = Math.floor(diff / (1000 * 60));
    diff -= m * (1000 * 60);
    const s = Math.floor(diff / 1000);

    els.days.textContent = String(d).padStart(2, '0');
    els.hours.textContent = String(h).padStart(2, '0');
    els.mins.textContent = String(m).padStart(2, '0');
    els.secs.textContent = String(s).padStart(2, '0');
  }

  tick();
  setInterval(tick, 1000);
}

// ---------- scroll reveal ----------
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => observer.observe(el));
}

// ---------- misc ----------
function initMisc() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  initNav();
  initCountdown();
  initReveal();
  initMisc();
});
