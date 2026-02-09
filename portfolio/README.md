# VU HAI NAM — Portfolio Website

A single-page portfolio website for **Vu Hai Nam**, a Data Analyst & Analytics Engineer specializing in Healthcare, Finance, and Marketing Analytics.

---

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Page Sections](#page-sections)
- [Technical Details](#technical-details)
  - [Typography](#typography)
  - [CSS Architecture](#css-architecture)
  - [JavaScript Features](#javascript-features)
  - [Content Management](#content-management)
- [Work Experience](#work-experience)
- [Featured Projects](#featured-projects)
- [How to Run](#how-to-run)
- [How to Customize](#how-to-customize)
- [Technologies](#technologies)

---

## Overview

This is a clean, modern, single-page portfolio built with vanilla HTML, CSS, and JavaScript. Content is data-driven — text and metadata are loaded from a `content.json` file at runtime, making it easy to update without touching HTML markup. The design follows a white-themed aesthetic with scroll-reveal animations and responsive layouts.

---

## Project Structure

```
portfolio-new/
├── index.html      # Main HTML page (single-page layout with all sections)
├── styles.css      # Full CSS styling (variables, grid, responsive breakpoints)
├── script.js       # JavaScript (navigation, scroll reveal, tabs, content loader)
└── content.json    # JSON data file (personal info, about, experience, skills, projects, footer)
```

---

## Page Sections

| # | Section               | Description                                                                 |
|---|-----------------------|-----------------------------------------------------------------------------|
| 1 | **Navigation**        | Fixed top navbar with logo (`VHN`), section links, language selector (ENG/VN), and mobile hamburger menu |
| 2 | **Hero**              | Full-viewport intro with name, role, tagline, contact CTA, and social links (GitHub, LinkedIn, Email) |
| 3 | **About Me**          | Bio paragraph with three info cards: Domain Expertise, Technical Strength, Future Goals |
| 4 | **Work Experience**   | Alternating timeline layout with company logo cards, date/location badges, role, and highlight bullets |
| 5 | **Skills & Expertise**| Three tab panels — **Domain**, **Technical**, **Soft** — each with categorized skill cards and icon grid |
| 6 | **Personal Projects** | 3-column grid of 6 project cards with tech-stack tags and GitHub/demo links |
| 7 | **Footer**            | Copyright text and social icon links                                       |

---

## Technical Details

### Typography

| Font          | Usage                | Source        |
|---------------|----------------------|---------------|
| Gasoek One    | Headings (`h1`–`h6`) | Google Fonts  |
| Funnel Sans   | Body text (primary)  | Google Fonts  |
| Inter          | Body text (fallback) | Framer CDN    |

Fonts are loaded via inline `@font-face` declarations in the `<head>` for optimal performance (no render-blocking external stylesheet).

### CSS Architecture

**Custom Properties (CSS Variables)** defined in `:root` for easy theming:

```css
:root {
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F8FAFC;
  --color-accent: #0EA5E9;
  --color-accent-secondary: #14B8A6;
  --color-text-primary: #0F172A;
  --font-heading: 'Gasoek One', sans-serif;
  --font-body: 'Funnel Sans', 'Inter', sans-serif;
  --section-padding: 120px;
  --container-max-width: 1200px;
  --card-radius: 16px;
  /* ... */
}
```

**Layout patterns:**
- CSS Grid for project cards (3 columns), about section (2 columns), experience timeline (3-column: content | dot | logo)
- Flexbox for navigation, hero CTA, social links, skill cards
- `clamp()` for fluid typography (`hero-name`, `section-title`)

**Responsive breakpoints:**

| Breakpoint     | Changes                                                                  |
|----------------|--------------------------------------------------------------------------|
| `max-width: 1024px` | Section padding reduced, project grid → 2 columns, about/skills → single column |
| `max-width: 768px`  | Mobile menu (fullscreen overlay), project grid → 1 column, timeline collapses to single-side, footer stacks vertically |
| `max-width: 480px`  | Tighter container padding, CTA stacks vertically, skill tabs stack vertically |

**Animations:**
- `@keyframes fadeInUp` — hero elements animate in sequentially (staggered via `animation-delay`)
- `.reveal` / `.reveal.active` — scroll-triggered fade-in-up transition (0.8s ease)

### JavaScript Features

All initialization runs inside `DOMContentLoaded`:

```
initNavigation()       → scroll-based navbar shrink, mobile menu toggle, smooth scroll
initScrollReveal()     → IntersectionObserver-style scroll reveal for .reveal elements
initSkillsTabs()       → tab switching for Domain/Technical/Soft skill panels
initProjectTabs()      → tab switching for project categories (if present)
initLanguageSelector() → ENG/VN toggle (placeholder — logs to console)
loadContent()          → fetches content.json and updates DOM elements
```

| Feature              | Implementation                                                    |
|----------------------|-------------------------------------------------------------------|
| Navbar shrink        | Adds `.scrolled` class when `window.scrollY > 50`                |
| Mobile menu          | Toggles `.active` on `.nav-links` and `.nav-toggle`, locks body scroll |
| Smooth scroll        | `window.scrollTo({ behavior: 'smooth' })` with 80px offset for fixed navbar |
| Scroll reveal        | Checks `getBoundingClientRect().top` against viewport on each scroll event |
| Tab switching        | `data-tab` attribute matching, toggles `.active` class on buttons and content panels |
| Content loading      | `fetch('content.json')` → updates hero, about, experience, skills, projects, footer via DOM manipulation. Falls back gracefully to the HTML defaults on fetch failure |

### Content Management

`content.json` stores all text content in a structured format:

```json
{
  "personal": { "name", "role", "tagline", "email", "github", "linkedin" },
  "about":    { "heading", "subheading", "bio", "cards[]" },
  "experience": { "heading", "subheading", "items[]" },
  "skills":   { "heading", "subheading", "tabs.domain", "tabs.technical", "tabs.soft" },
  "projects": { "heading", "subheading", "items[]" },
  "footer":   { "copyright" }
}
```

The HTML contains default content as a fallback, so the page renders correctly even if `content.json` fails to load.

---

## Work Experience

| Period                | Company                         | Role                    | Location         |
|-----------------------|---------------------------------|-------------------------|------------------|
| Sep 2025 – Nov 2025  | Mevis Healthcare                | Analytics Engineer      | Hanoi, Vietnam   |
| Jan 2025 – Jul 2025  | Phuong Dong General Hospital    | Data Analyst            | Hanoi, Vietnam   |
| May 2025 – Jul 2025  | ComeEco Company (Freelance)     | BI Developer & Trainer  | Remote           |

---

## Featured Projects

| Project                              | Description                                                              | Tech Stack                      |
|--------------------------------------|--------------------------------------------------------------------------|---------------------------------|
| Customer 360 (RFM Model)            | Transaction data segmentation with targeted retention strategies         | Python, Pandas, Matplotlib      |
| FPT Customer Sentiment Analysis     | NLP-based sentiment extraction and ML classification from reviews        | Python, Scikit-learn, NLTK      |
| TikTok Data Scraping & Analysis     | Automated TikTok data scraping with Selenium, trend visualization        | Python, Selenium, Looker Studio |
| Banking Credit Segment Exploration  | Credit usage pattern analysis for customer risk stratification            | Python, SQL, Power BI           |
| Gamelytics: Mobile Game Lifecycle   | ETL pipeline for game logs, retention and whale-user behavior analysis   | Python, BigQuery, Airflow       |
| HR Analytics Dashboard              | HR metrics visualization for turnover analysis and retention strategy     | SQL, Power BI, DAX              |

---

## How to Run

The site uses `fetch()` to load `content.json`, which requires HTTP — opening `index.html` directly via `file://` will block the request due to CORS.

**Option 1 — Python (quickest)**
```bash
cd portfolio-new
python -m http.server 8000
# Open http://localhost:8000
```

**Option 2 — Node.js**
```bash
npx serve .
```

**Option 3 — VS Code**
Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension and click "Go Live" from the status bar.

> **Note:** If you only need a static view without dynamic content loading, you can open `index.html` directly in a browser — the HTML contains all default content as a fallback.

---

## How to Customize

### Change text content

Edit `content.json` — all headings, descriptions, experience entries, project details, and personal info are stored there. No need to modify HTML.

### Change theme / colors

Edit the CSS custom properties in `styles.css` under `:root`:

```css
:root {
  --color-bg-primary: #FFFFFF;      /* page background */
  --color-accent: #0EA5E9;          /* primary accent (links, buttons, highlights) */
  --color-accent-secondary: #14B8A6; /* secondary accent (gradients) */
  --color-text-primary: #0F172A;     /* main text color */
  --card-radius: 16px;              /* card border radius */
  /* ... */
}
```

### Change fonts

Replace the `@font-face` declarations in `index.html` `<head>` and update the `--font-heading` / `--font-body` variables in `styles.css`.

### Add a new project

Add an entry to the `projects.items` array in `content.json`, then add a corresponding `.project-card` block in `index.html` inside `.projects-grid`.

---

## Technologies

- **HTML5** — Semantic markup, Open Graph meta tags, SVG icons (inline)
- **CSS3** — Grid, Flexbox, Custom Properties, `clamp()` fluid typography, `backdrop-filter`, keyframe animations, scroll-driven reveal transitions
- **Vanilla JavaScript (ES6+)** — `async/await` fetch, DOM manipulation, event delegation, `getBoundingClientRect()` scroll detection
- **Google Fonts** — Gasoek One, Funnel Sans (loaded via `@font-face`)

No frameworks. No build tools. No dependencies.
