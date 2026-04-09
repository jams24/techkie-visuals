# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for **TECHKIE VISUALS LIMITED** (Company No. 15919264), a UK-registered creative agency based in Derby offering video production, post-production, IT consultancy, and photography services. Built to support an Apple Developer Organization account application.

## Development

This is a plain HTML/CSS static site with no build tools, package manager, or JavaScript. To preview, open any `.html` file in a browser.

- **Pages:** `index.html` (homepage), `about.html`, `services.html`, `contact.html`
- **Styles:** Single stylesheet `styles.css` shared by all pages

## Architecture Notes

- **CSS custom properties** are defined in `:root` at the top of `styles.css` — use these for colors, fonts, spacing, and transitions rather than hardcoding values.
- **Typography:** Display font is `Crimson Pro` (serif), body font is `DM Sans` (sans-serif), loaded from Google Fonts.
- **Navigation** is duplicated in each HTML file (no templating). Changes to nav must be applied to all four pages.
- **Footer** is also duplicated across all pages.
- **Contact form** is HTML-only — it does not submit anywhere. Form handling would need to be added separately.
- **Responsive breakpoint** at 768px handles mobile layout via a single media query at the bottom of `styles.css`.

## Deployment

Can be deployed to any static host (GitHub Pages, Netlify, Vercel) by uploading the 5 files to the root directory. No build step required.
