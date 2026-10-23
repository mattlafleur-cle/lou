// =========================================================
// Lou Tribute Collection: interactions
//
// The product grid is plain HTML in index.html (so search engines and
// visitors without JavaScript see every shirt and link). To add a design
// or colorway, copy one <article class="product-card"> block there.
// This file only handles the mobile menu, scroll reveal, the footer year,
// and optional shop-click measurement.
// =========================================================

// ---------- mobile nav ----------
function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const header = document.querySelector('.site-header');
  if (!toggle || !header) return;
  const close = () => {
    header.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  };
  toggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', close));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && header.classList.contains('nav-open')) {
      close();
      toggle.focus();
    }
  });
}

// ---------- scroll reveal ----------
// Content is visible by default; the fade-in only applies once this script
// has run (the "js" class on <html>), and never above the fold.
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) {
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

// ---------- shop-click measurement ----------
// No analytics is installed on this site today, so this does nothing until
// a Google tag (gtag.js) or Tag Manager (dataLayer) is added to index.html.
// Links marked data-track="..." then send one "shop_click" event with the
// link position and destination path. No personal data is collected.
function initShopTracking() {
  document.addEventListener('click', e => {
    const link = e.target.closest('a[data-track]');
    if (!link) return;
    const params = {
      link_id: link.dataset.track,
      link_url: link.hostname + link.pathname
    };
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'shop_click', params);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: 'shop_click', ...params });
    }
  });
}

// ---------- misc ----------
function initMisc() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initShopTracking();
  initMisc();
});
