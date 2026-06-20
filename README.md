# Phela Services — Website

Premium marketing site for **Phela Services**: laundry, garment care, carpet
cleaning & restoration, blanket cleaning, and chairs & tables rental — with free
doorstep collection and delivery.

Static site: plain HTML, CSS and vanilla JavaScript. No build step.

---

## Project structure

```
.
├── index.html                 # Single-page site (all sections)
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

## Notes

- Testimonials, the service area, and the email (`hello@phelaservices.co.za`)
  are **placeholders** — update before launch.
- Icons are inline [Lucide](https://lucide.dev) SVGs (no runtime dependency).
- Fully responsive; respects `prefers-reduced-motion`.
