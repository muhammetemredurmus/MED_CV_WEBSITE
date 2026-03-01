# CLAUDE.md — CV Web Project

## Project Overview

Personal CV/portfolio website for **M. Emre Durmuş** (Software Engineer · QA & Test Automation).
A static single-page website with no build tools, frameworks, or package managers.

## File Structure

```
CV Web Project/
├── index.html      # Main page — all content + inline CSS (primary file)
├── styles.css      # External stylesheet (extracted from inline styles — NOT linked in index.html yet)
├── theme.css       # Light/dark theme CSS variable overrides
├── theme.js        # Theme toggle logic with localStorage persistence
└── medPhoto.jpeg   # Profile photo (avatar)
```

## Architecture

- **Pure static site**: plain HTML, CSS, JS — no npm, no bundler, no framework
- **Single page** with anchor-based navigation: `#home`, `#experience`, `#skills`, `#education`, `#contact`
- **Sections** (in order): Home, Work History, Skills + Languages + Certifications + Hobbies, Education, Contact
- **Sticky header** with nav links and theme toggle button
- **Theme system**: dark (default) / light, toggled via button, persisted in `localStorage`
- **Responsive**: single media query breakpoint at `max-width: 600px`

## Design System / CSS Variables

Defined in `:root` inside `index.html` and overridden per-theme in `theme.css`:

| Variable              | Dark (default)  | Light     | Purpose                  |
|-----------------------|-----------------|-----------|--------------------------|
| `--bg`                | `#0b0b0f`       | `#f5f5f7` | Page background          |
| `--panel`             | `#14141b`       | `#ffffff` | Card/section background  |
| `--text`              | `#f5f5f7`       | `#111111` | Primary text             |
| `--muted`             | `#b6b6c2`       | `#555555` | Secondary/subdued text   |
| `--accent`            | `#f58881`       | `#e05a52` | Accent color (coral/red) |
| `--border`            | `#404040`       | `#cccccc` | Borders                  |
| `--shadow`            | `#000000`       | `#cccccc` | Box shadows              |
| `--radius`            | `18px`          | same      | Border radius            |
| `--padding-right-left`| `16px`          | same      | Section horizontal pad   |

Font: `system-ui, Roboto, sans-serif`

## Key HTML Patterns

### Section card
```html
<section id="sectionId">
    <h2>Section Title</h2>
    <!-- content -->
</section>
```
All sections: `max-width: 800px`, centered, panel background, border, `border-radius: var(--radius)`.

### Work experience entry
```html
<div class="job">
    <div class="job-header">
        <div>
            <p class="job-title">Title</p>
            <p class="job-company">Company — City, Country</p>
        </div>
        <span class="job-date">Mon YYYY – Mon YYYY</span>
    </div>
    <p>Description paragraph...</p>
    <ul>
        <li>Achievement or responsibility</li>
    </ul>
    <div class="job-tags">
        <span class="tag">Technology</span>
    </div>
</div>
```

### Skill item
```html
<div class="skill-item">
    <span class="skill-name">Skill Name</span>
    <span class="skill-level">Good / Excellent</span>
</div>
```

### Language item
```html
<div class="lang-item">
    <span>Language</span>
    <span class="lang-level">Level</span>
</div>
```

### Education item
```html
<div class="edu-item">
    <p class="edu-degree">Degree Title</p>
    <p class="edu-school">University Name, City</p>
    <ul class="edu-notes">
        <li>Note or highlight</li>
    </ul>
</div>
```

### Contact item
```html
<div class="contact-item">
    <span class="contact-label">Label</span>
    <span class="contact-value"><a href="...">value</a></span>
</div>
```

## Theme System

- `theme.css`: defines `:root[data-theme="light"]` and `:root[data-theme="dark"]` variable sets
- `theme.js`: on DOMContentLoaded, reads `localStorage.getItem('theme')` (default: `'dark'`), sets `data-theme` on `<html>`, updates button text (`☀️ Theme` for dark, `🌙 Theme` for light)
- Button selector: `.theme-btn` in header

## Architecture Notes

- `styles.css` is the active external stylesheet — linked in `index.html` after a FOUC-fix inline script.
- A small synchronous inline `<script>` in `<head>` reads `localStorage` and sets `data-theme` on `<html>` before CSS is applied, preventing theme flash on load.
- `theme.js` is wrapped in an IIFE — no global functions are exported.
- `.job:first-child` / `.edu-item:first-child` selectors were incorrect (preceded by `<h2>`); replaced with `h2 + .job` and `h2 + .edu-item`.

## Content Reference

- **Owner**: M. Emre Durmuş
- **Role**: Software Engineer · QA & Test Automation (7+ years experience)
- **Current employer**: INSIDER ONE (Mar 2025 – Present)
- **Tech stack shown**: Python, Playwright, Selenium, Postman, Swagger, Kubernetes, GitLab CI/CD, Agile/Scrum, LLMOps
- **Education**: MSc + BSc Electronics & Communication Engineering — Yıldız Technical University
- **Languages**: English (Excellent), Deutsch (Average)
- **Contact**: Istanbul, Turkey | me.durmus94@gmail.com | linkedin.com/in/medurmus94

## Development Guidelines

- No build step — open `index.html` directly in a browser
- No external dependencies — everything is vanilla HTML/CSS/JS
- Keep all sections within the `max-width: 800px` container width
- Always use CSS variables (`var(--accent)`, etc.) instead of hardcoded colors
- New sections follow the existing `<section id="...">` pattern with `scroll-margin-top: 80px` for sticky header offset
- Grid layouts (skills, contact, languages) use `grid-template-columns: 1fr 1fr` that collapse to `1fr` at ≤600px
- Date format: `Mon YYYY – Mon YYYY` (e.g., `Mar 2025 – Present`)
