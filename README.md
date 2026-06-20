# Phela Services — Website

Premium marketing site for **Phela Services**: laundry, garment care, carpet
cleaning & restoration, blanket cleaning, and chairs & tables rental — with free
doorstep collection and delivery.

Static site: plain HTML, CSS and vanilla JavaScript. No build step.

---

## Project structure

```
.
├── index.html                 # Home (overview of both service lines)
├── cleaning.html              # Cleaning & care: description, services, how-it-works
├── rentals.html               # Event rentals: chairs & tables, how-it-works
├── contact.html               # Contact + quote form
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

## SEO

- Title, meta description, keywords, Open Graph and Twitter cards are set in `<head>`.
- `LocalBusiness` and `FAQPage` JSON-LD structured data are included for rich results.
- Copy targets local search (Durban, Westville, Pinetown, Durban North).

## Before you go live — confirm these

These are **real values used throughout the site** — verify they're correct, don't leave them assumed:

- **Domain:** `https://www.phelaservices.co.za/` is used in the canonical tag, Open Graph URLs and JSON-LD. Update everywhere if the live domain differs.
- **Email:** `hello@phelaservices.co.za` — make sure this inbox exists.
- **Opening hours** in the JSON-LD (`Mon–Sat 08:00–17:00`) — adjust to your actual hours.
- **Social links:** the Facebook/Instagram footer icons point to `#` — add real URLs (and to `sameAs` in the JSON-LD).
- **Testimonials:** the three reviews are realistic examples. Replace them with **genuine customer reviews** before publishing — fabricated testimonials can breach SA consumer-protection/ASA rules.

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
