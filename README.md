# Gosephela Services — Website

Marketing site for **Gosephela Services** (*"We leave spaces looking new"*):
cleaning, laundry, and rug & carpet care for **homes and businesses** across
**Alberton, Sandton & Gauteng** — deep, end-of-tenancy, commercial and regular
domestic cleaning, plus free laundry collection & delivery.

Static site: plain HTML, CSS and vanilla JavaScript. No build step.

> Rebranded from "Phela Services". External accounts (Facebook page, Bark reviews)
> are still named **Phela Services** — those URLs are intentionally left as-is.

---

## Project structure

```
.
├── index.html                 # Home (services, residential/commercial, reviews, FAQ)
├── cleaning.html              # Cleaning services + how-it-works
├── gallery.html               # Before/after gallery of work (placeholder images)
├── contact.html               # Contact / quote form
├── README.md
├── .gitignore
├── assets/
│   ├── css/
│   │   └── styles.css         # All styles (design tokens + components)
│   ├── js/
│   │   └── main.js            # Header, mobile menu, scroll reveal, FAQ, etc.
│   └── img/
│       ├── favicon.svg
│       ├── phela-logo.png
│       └── *.jpg              # Production photography used on the page
└── docs/
    └── design/                # Reference mockups + unused source images
```

## Running locally

It's a static site — just open `index.html` in a browser.

For a local server (recommended, so relative paths and fonts behave like production):

```bash
# Python 3
python -m http.server 8000
# then visit http://localhost:8000
```

## Customising

| What | Where |
|------|-------|
| Brand colours | `:root` tokens at the top of `assets/css/styles.css` |
| Fonts | `<link>` in `index.html` `<head>` + `--font-*` tokens |
| Phone / WhatsApp number | search `27822679862` (links) and `082 267 9862` (text) |
| Email / service area | footer in `index.html` |
| Images | swap files in `assets/img/` (keep the same filename, or update the `src`) |
| Hero background | `.hero { background: url("../img/...") }` in `styles.css` |
| Announcement bar text | `.topbar` in `index.html` |

### Brand palette (from the logo)

| Token | Hex | Use |
|-------|-----|-----|
| `--ink` | `#15262d` | Headlines, dark sections, footer |
| `--teal` | `#0f6c8f` | Primary brand / buttons / links |
| `--teal-deep` | `#0b4a63` | Hovers, gradients |
| `--teal-bright` | `#1fa6bd` | Accents, gradient highlights |
| `--green` | `#79b83f` | Secondary accent (eyebrows, etc.) |
| `--bg` | `#ffffff` | Page background |

## Key integrations

- **Online booking (Picktime):** all primary "Book Online" buttons open
  `https://www.picktime.com/b30ed5c2-f4e1-431e-b812-d000f8c9edb4` in a new tab.
  Search that URL to change it.
- **Reviews (Bark):** the "Read our reviews" buttons + footer Reviews link point to
  the Bark profile. Also listed in `sameAs` in the JSON-LD.
- **Facebook:** footer FB icon links to the page. Instagram is still `#` (add when ready).

## SEO

- Title, meta description, keywords, Open Graph and Twitter cards are set in `<head>`.
- `LocalBusiness` (with `sameAs` + `ReserveAction` booking) and `FAQPage` JSON-LD are included.
- Copy targets local search: **Alberton, Sandton, Johannesburg, Gauteng**.

## Before you go live — confirm these

- **New logo:** the logo file is still `assets/img/phela-logo.png` (old Phela mark).
  Drop the new Gosephela logo in and either keep that filename or rename and update
  the `<img src>` refs (header + footer on all 4 pages).
- **Domain:** `https://www.phelaservices.co.za/` is still used in canonical/OG/JSON-LD.
  Update to the live Gosephela domain everywhere if it differs.
- **Email:** `hello@phelaservices.co.za` — confirm/replace the inbox.
- **Opening hours** in the JSON-LD (`Mon–Sat 08:00–17:00`) — adjust to actual hours.
- **Gallery photos:** `gallery.html` uses **placeholder** before/after pairs from the
  existing image set — swap in real before-and-after photos (`assets/img/`).
- **Testimonials:** the on-page quotes are realistic examples — replace with genuine
  reviews (the Bark link already shows real ones) before publishing.

## Contact form

The form on `contact.html` is **no-backend**: on submit it composes a pre-filled
WhatsApp message and opens `wa.me/27822679862`. This works immediately with no
server. If you'd rather capture leads by email/database, point the form's
`action` at a service like [Formspree](https://formspree.io) or add a backend —
the JS handler is in `assets/js/main.js` (`contactForm`).

Service cards deep-link with `contact.html?service=...` to pre-select the dropdown.

## Notes

- Multi-page: shared header/footer/WhatsApp widget are duplicated per page (static site, no templating). Update all pages if you change shared chrome.
- A WhatsApp chat widget (bottom-right) is on every page; the bare floating button was replaced by it.
- Icons are inline [Lucide](https://lucide.dev) SVGs (no runtime dependency).
- Fully responsive; respects `prefers-reduced-motion`.
