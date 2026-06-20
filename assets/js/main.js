/* ============================================================
   PHELA SERVICES — interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Transparent → solid sticky header on scroll ---------- */
  var header = document.getElementById('header');
  function onScroll() {
    if (window.scrollY > 80) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Dismissible announcement bar ---------- */
  var topbar = document.getElementById('topbar');
  var topbarClose = document.getElementById('topbarClose');
  if (topbarClose) {
    topbarClose.addEventListener('click', function () { topbar.classList.add('hidden'); });
  }

  /* ---------- Sticky CTA bar ---------- */
  var stickyCta = document.getElementById('stickyCta');
  if (stickyCta) {
    // hide the bar whenever the final CTA or footer is on screen (avoid duplicate CTAs)
    var hideZones = new Set();
    var zones = [document.getElementById('contact'), document.querySelector('.site-footer')].filter(Boolean);
    var updateSticky = function () {
      var pastHero = window.scrollY > window.innerHeight * 0.6;
      var show = pastHero && hideZones.size === 0;
      stickyCta.classList.toggle('show', show);
      stickyCta.setAttribute('aria-hidden', show ? 'false' : 'true');
      document.body.classList.toggle('cta-open', show);
    };
    if ('IntersectionObserver' in window) {
      var zoneIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) hideZones.add(e.target); else hideZones.delete(e.target);
        });
        updateSticky();
      }, { threshold: 0 });
      zones.forEach(function (z) { zoneIo.observe(z); });
    }
    window.addEventListener('scroll', updateSticky, { passive: true });
    updateSticky();
  }

  /* ---------- Mobile menu ---------- */
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');

  function setMenu(open) {
    if (open) {
      // anchor the panel right beneath the (possibly transparent) header
      mobileMenu.style.top = header.getBoundingClientRect().bottom + 'px';
    }
    hamburger.classList.toggle('active', open);
    mobileMenu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger.addEventListener('click', function () {
    setMenu(!mobileMenu.classList.contains('open'));
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { setMenu(false); });
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) setMenu(false);
  });

  /* ---------- Smooth scroll with sticky-header offset ---------- */
  var headerH = 72;
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - headerH + 1;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    reveals.forEach(function (el, i) {
      // subtle stagger for grouped siblings
      el.style.transitionDelay = (Math.min(i % 6, 5) * 60) + 'ms';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- FAQ: single-open accordion ---------- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
