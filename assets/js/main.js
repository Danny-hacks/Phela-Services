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
    var zones = [document.querySelector('.final-cta'), document.querySelector('.site-footer')].filter(Boolean);
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

  /* ---------- WhatsApp chat widget ---------- */
  var waWidget = document.getElementById('waWidget');
  if (waWidget) {
    var waToggle = document.getElementById('waToggle');
    var waClose = document.getElementById('waClose');
    var setWa = function (open) {
      waWidget.classList.toggle('open', open);
      waToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    waToggle.addEventListener('click', function () { setWa(!waWidget.classList.contains('open')); });
    if (waClose) waClose.addEventListener('click', function () { setWa(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setWa(false);
    });
    document.addEventListener('click', function (e) {
      if (waWidget.classList.contains('open') && !waWidget.contains(e.target)) setWa(false);
    });
  }

  /* ---------- Contact / quote form → WhatsApp ---------- */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    // Pre-select service from ?service= URL param (e.g. from a service card)
    var params = new URLSearchParams(window.location.search);
    var preset = params.get('service');
    if (preset) {
      var sel = contactForm.querySelector('#cf-service');
      if (sel) {
        Array.prototype.forEach.call(sel.options, function (opt) {
          if (opt.text.trim().toLowerCase() === preset.trim().toLowerCase()) opt.selected = true;
        });
      }
    }

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = contactForm;
      var val = function (id) { var el = f.querySelector('#' + id); return el ? el.value.trim() : ''; };
      var name = val('cf-name');
      var phone = val('cf-phone');
      var service = val('cf-service');
      var area = val('cf-area');
      var message = val('cf-message');

      var lines = [
        'Hi Gosephela Services, I\'d like to request a quote / booking.',
        '',
        'Name: ' + name,
        'Phone: ' + phone,
        service ? 'Service: ' + service : '',
        area ? 'Area: ' + area : '',
        message ? 'Details: ' + message : ''
      ].filter(Boolean);

      var url = 'https://wa.me/27822679862?text=' + encodeURIComponent(lines.join('\n'));
      window.open(url, '_blank', 'noopener');

      var ok = document.getElementById('formSuccess');
      if (ok) ok.classList.add('show');
      f.reset();
    });
  }

  /* ---------- Gallery: before/after pagination (6 per page) ---------- */
  var galGrid = document.getElementById('galleryGrid');
  if (galGrid) {
    var perPage = 6;
    var cards = Array.prototype.slice.call(galGrid.querySelectorAll('.ba-card'));
    var pager = document.getElementById('galleryPagination');
    var totalPages = Math.ceil(cards.length / perPage);
    var current = 1;

    var showPage = function (p) {
      current = Math.min(Math.max(1, p), totalPages);
      cards.forEach(function (c, i) {
        var onPage = (Math.floor(i / perPage) + 1) === current;
        c.style.display = onPage ? '' : 'none';
        if (onPage) c.classList.add('in'); // ensure visible (skip reveal lock)
      });
      buildPager();
    };

    function makeBtn(html, label, onClick, opts) {
      var b = document.createElement('button');
      b.innerHTML = html;
      if (label) b.setAttribute('aria-label', label);
      if (opts && opts.cls) b.className = opts.cls;
      if (opts && opts.disabled) b.disabled = true;
      if (opts && opts.current) b.setAttribute('aria-current', 'page');
      b.addEventListener('click', onClick);
      return b;
    }

    function goto(p) {
      showPage(p);
      galGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function buildPager() {
      if (!pager || totalPages <= 1) return;
      pager.innerHTML = '';
      pager.appendChild(makeBtn('<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>', 'Previous page',
        function () { goto(current - 1); }, { cls: 'pg-arrow', disabled: current === 1 }));
      for (var i = 1; i <= totalPages; i++) {
        (function (n) {
          pager.appendChild(makeBtn(String(n), 'Page ' + n, function () { goto(n); },
            { cls: n === current ? 'active' : '', current: n === current }));
        })(i);
      }
      pager.appendChild(makeBtn('<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>', 'Next page',
        function () { goto(current + 1); }, { cls: 'pg-arrow', disabled: current === totalPages }));
    }

    if (totalPages > 1) showPage(1);

    /* ---------- Lightbox (full-screen viewer — scoped to the clicked pair) ---------- */
    var lightbox = document.getElementById('lightbox');
    if (lightbox) {
      var lbImg = document.getElementById('lbImg');
      var lbCounter = document.getElementById('lbCounter');
      var lbSet = [];   // the two images of the clicked card
      var lbIdx = 0;

      var renderLb = function (i) {
        lbIdx = (i + lbSet.length) % lbSet.length;
        lbImg.src = lbSet[lbIdx].src;
        lbImg.alt = lbSet[lbIdx].alt || '';
        if (lbCounter) lbCounter.textContent = (lbIdx === 0 ? 'Before' : 'After') + '  ·  ' + (lbIdx + 1) + ' / ' + lbSet.length;
      };
      var openLb = function (set, i) {
        lbSet = set;
        renderLb(i);
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      };
      var closeLb = function () {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      };

      // each image opens only its own card's before/after pair
      Array.prototype.forEach.call(galGrid.querySelectorAll('.ba-img img'), function (im) {
        im.addEventListener('click', function () {
          var pair = im.closest('.ba-pair');
          if (!pair) return;
          var imgs = Array.prototype.slice.call(pair.querySelectorAll('img'));
          openLb(imgs, imgs.indexOf(im));
        });
      });
      document.getElementById('lbClose').addEventListener('click', closeLb);
      document.getElementById('lbPrev').addEventListener('click', function (e) { e.stopPropagation(); renderLb(lbIdx - 1); });
      document.getElementById('lbNext').addEventListener('click', function (e) { e.stopPropagation(); renderLb(lbIdx + 1); });
      lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
      document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLb();
        else if (e.key === 'ArrowLeft') renderLb(lbIdx - 1);
        else if (e.key === 'ArrowRight') renderLb(lbIdx + 1);
      });
    }
  }
})();
