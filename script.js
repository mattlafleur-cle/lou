// =========================================================
// Saluting Lou — Tribute Collection
// Product data + interactions
//
// IMPORTANT: Several `url` values below are best-guess placeholders
// (marked "TODO: verify"). Replace them with the exact product page
// URLs from your Shopify admin before this site goes live — a wrong
// slug will 404. Confirmed-working URLs are marked accordingly.
// =========================================================

const PRODUCTS = [
  {
    name: 'Saluting Lou',
    variant: 'Navy Blue',
    price: '15.50',
    tag: 'New · Launching Today',
    category: 'new',
    url: 'https://ndshirt.com/products/saluting-lou-navy-blue', // confirmed
    fill: '#0d1b3f',
    text: '#c9a961'
  },
  {
    name: 'Saluting Lou',
    variant: 'White',
    price: '26.00',
    tag: 'New',
    category: 'new',
    url: 'https://ndshirt.com/products/saluting-lou-white', // TODO: verify exact slug
    fill: '#f7f4ec',
    text: '#0d1b3f'
  },
  {
    name: 'Under the Same Sky',
    variant: 'Navy Blue',
    price: '33.98',
    tag: null,
    category: 'tribute',
    url: 'https://ndshirt.com/products/lou-same-sky', // confirmed
    fill: '#0d1b3f',
    text: '#c9a961'
  },
  {
    name: 'Do Your Job',
    variant: 'Navy Blue',
    price: '33.98',
    tag: null,
    category: 'tribute',
    url: 'https://ndshirt.com/products/lou-holtz-do-your-job', // confirmed
    fill: '#0d1b3f',
    text: '#c9a961'
  },
  {
    name: 'Leave No Doubt',
    variant: 'Navy Blue',
    price: '33.98',
    tag: null,
    category: 'tribute',
    url: 'https://ndshirt.com/collections/all', // TODO: replace with exact product URL
    fill: '#0d1b3f',
    text: '#c9a961'
  },
  {
    name: 'Leave No Doubt',
    variant: 'Navy Blue Shield',
    price: '33.98',
    tag: null,
    category: 'tribute',
    url: 'https://ndshirt.com/collections/all', // TODO: replace with exact product URL
    fill: '#0d1b3f',
    text: '#c9a961'
  },
  {
    name: 'Leave No Doubt',
    variant: 'Navy Blue Chest',
    price: '33.98',
    tag: null,
    category: 'tribute',
    url: 'https://ndshirt.com/collections/all', // TODO: replace with exact product URL
    fill: '#0d1b3f',
    text: '#c9a961'
  },
  {
    name: 'Leave No Doubt',
    variant: 'Heather Gray',
    price: '33.98',
    tag: null,
    category: 'tribute',
    url: 'https://ndshirt.com/collections/all', // TODO: replace with exact product URL
    fill: '#b7b7b7',
    text: '#0d1b3f'
  },
  {
    name: 'Leave No Doubt',
    variant: 'White',
    price: '33.98',
    tag: null,
    category: 'tribute',
    url: 'https://ndshirt.com/collections/all', // TODO: replace with exact product URL
    fill: '#f7f4ec',
    text: '#0d1b3f'
  },
  {
    name: 'Leave No Doubt',
    variant: 'White-Gray',
    price: '33.98',
    tag: null,
    category: 'tribute',
    url: 'https://ndshirt.com/collections/all', // TODO: replace with exact product URL
    fill: '#eae8e2',
    text: '#0d1b3f'
  }
];

// ---------- render a simple tee silhouette as inline SVG ----------
function teeSVG(fill, textColor, label) {
  return `
  <svg class="tee" viewBox="0 0 220 260" xmlns="http://www.w3.org/2000/svg">
    <path d="M70 10 L20 40 L35 75 L60 62 V240 A6 6 0 0 0 66 246 H154 A6 6 0 0 0 160 240 V62 L185 75 L200 40 L150 10
             C150 28 132 40 110 40 C88 40 70 28 70 10 Z"
          fill="${fill}" stroke="rgba(0,0,0,.08)" stroke-width="1.5"/>
    <text x="110" y="130" text-anchor="middle" font-family="Playfair Display, serif"
          font-weight="700" font-size="17" fill="${textColor}">
      ${wrapLabel(label)}
    </text>
  </svg>`;
}

// crude 2-line wrap for the SVG <text> (tspans)
function wrapLabel(label) {
  const words = label.split(' ');
  if (words.length <= 2) {
    return `<tspan x="110" dy="0">${label}</tspan>`;
  }
  const mid = Math.ceil(words.length / 2);
  const line1 = words.slice(0, mid).join(' ');
  const line2 = words.slice(mid).join(' ');
  return `<tspan x="110" dy="-10">${line1}</tspan><tspan x="110" dy="22">${line2}</tspan>`;
}

// ---------- render product grid ----------
function renderProducts(filter = 'all') {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  const items = PRODUCTS.filter(p => filter === 'all' || p.category === filter);

  grid.innerHTML = items.map(p => `
    <article class="product-card">
      <div class="product-visual" style="background:${p.fill === '#f7f4ec' || p.fill === '#eae8e2' ? '#f0ece2' : '#f0ece2'}">
        ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ''}
        ${teeSVG(p.fill, p.text, p.name)}
      </div>
      <div class="product-body">
        <div class="product-name">${p.name}</div>
        <div class="product-variant">${p.variant}</div>
        <div class="product-price">$${p.price}</div>
        <a class="product-cta" href="${p.url}">Shop Now</a>
      </div>
    </article>
  `).join('');
}

// ---------- filter bar ----------
function initFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      renderProducts(btn.dataset.filter);
    });
  });
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
  renderProducts('all');
  initFilters();
  initNav();
  initCountdown();
  initReveal();
  initMisc();
});
