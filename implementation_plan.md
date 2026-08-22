# Ketan Goyal Personal Website — V1 Implementation Plan

## Overview

Build the complete personal brand website for Ketan Goyal at `ketangoyal.me`. The directory `D:\Live Sites\Ketan Goyal Personal` is empty (no existing framework). This is a greenfield build.

> [!NOTE]
> Positioning, voice, color, and typography rules referenced throughout this plan are defined in the companion document `brand_guide.md`. That document is the source of truth for any brand/design decision not spelled out inline here.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | **Next.js 15** (App Router, latest stable) |
| Language | **TypeScript** |
| Styling | **Tailwind CSS 4** |
| Fonts | **Instrument Serif** (display) + **Manrope** (body/UI) via `next/font/google` |
| Images | `next/image` for all optimized images |
| Package Manager | **npm** |
| Deployment | Static-ready (Vercel/any Node host) |

---

## Asset Mapping

| Asset | Usage | Destination |
|---|---|---|
| `3.png` (professional portrait, white bg) | **Hero** — integrates directly with the white (`--paper`) background | `/public/images/ketan/ketan-goyal-portrait.png` |
| `1.JPG` (formal candid suit, dark bg) | **About page** editorial photo | `/public/images/ketan/ketan-goyal-formal-candid.jpg` |
| `2.jpg` (architectural/travel) | **Journey page** interstitial | `/public/images/ketan/ketan-goyal-journey.jpg` |
| `Primary Light.png` | Kraftt detail page only | `/public/images/kraftt/kraftt-digital-logo-light.png` |
| `Primary Dark Logo.png` | Kraftt detail page only | `/public/images/kraftt/kraftt-digital-logo-dark.png` |
| `Light Sub-log.png` | Kraftt detail page only | `/public/images/kraftt/kraftt-submark-light.png` |
| `Dark Sub-logo.png` | Kraftt detail page only | `/public/images/kraftt/kraftt-submark-dark.png` |
| 10× SmartStore screenshots | SmartStore detail page gallery | `/public/images/smartstore/*.png` |

> [!IMPORTANT]
> Original `/Assets` files will NOT be modified. Copies will be placed in `/public/images/` with normalized filenames.

---

## Proposed Changes

### 1. Project Initialization

#### [NEW] Next.js 15 project scaffold
- `npx -y create-next-app@latest ./ --ts --tailwind --app --eslint --src-dir --import-alias "@/*" --use-npm`
- Will create the full Next.js project with App Router, TypeScript, Tailwind CSS, ESLint

---

### 2. Design System & Global Styles

#### [MODIFY] `tailwind.config.ts`
- Custom color tokens, per `brand_guide.md` §3 — a cool-neutral, true-white palette (explicitly **not** ivory/cream):
  - `--paper` `#FFFFFF` — primary background
  - `--fog` `#F6F7F9` — alternate section background, card fills
  - `--mist` `#E4E6EB` — hairlines, dividers, borders
  - `--ink` `#14161B` — primary text
  - `--slate` `#4B505A` — secondary text
  - `--dust` `#868C97` — captions, timestamps, muted text
  - `--signal` `#2F4CD1` — the single accent (links, active states, focus rings, eyebrow dot)
  - `--signal-soft` `#EDF0FC` — tint for small badges/tags only, never a section background
  - `--graphite` `#0E0F12` — dark sections (footer)
- Custom fonts: `instrument-serif`, `manrope` (see `brand_guide.md` §4 for scale/usage rules; optional metadata-mono face for Journey timeline dates)
- Max content width `1280px`

#### [MODIFY] `src/app/globals.css`
- CSS custom properties for the full color system
- Base typography styles
- Utility classes for editorial layouts
- `prefers-reduced-motion` support

#### [MODIFY] `src/app/layout.tsx`
- Root layout with fonts (next/font/google), metadata base, structured data
- Header + Footer components wrapping `{children}`

---

### 3. Content Data Layer

All long-form content separated from components:

#### [NEW] `src/content/site.ts`
- `siteConfig`: name, domain, email, social links (instagram, linkedin, github: null, kraftt: null)
- SEO defaults, title template

#### [NEW] `src/content/journey.ts`
- Full chronological journey data with eras, descriptions, highlights

#### [NEW] `src/content/builds.ts`
- All build data: ShopClues, SmartStore, The Vibed Vines, Kraftt Digital
- Classifications, descriptions, links, screenshots, learnings

#### [NEW] `src/content/now.ts`
- Current focus items with `lastUpdated: "August 2026"`

---

### 4. Layout Components

#### [NEW] `src/components/layout/Header.tsx`
- Text identity: "Ketan Goyal." (no Kraftt logo)
- Nav: About, Journey, Builds, Now, Contact
- Sticky with subtle border after scroll
- Mobile hamburger menu with keyboard accessibility

#### [NEW] `src/components/layout/Footer.tsx`
- Nav links + social links + copyright with dynamic year
- "Learning by building." tagline
- Privacy & Terms links

#### [NEW] `src/components/layout/Container.tsx`
- Max-width wrapper (1280px) with responsive padding

---

### 5. Shared Components

#### [NEW] `src/components/typography/Eyebrow.tsx`
- Small label component with `--signal` (blue) accent dot

#### [NEW] `src/components/typography/SectionHeading.tsx`
- Editorial serif heading with optional subtext

#### [NEW] `src/components/shared/SocialLinks.tsx`
- Reads from siteConfig, hides null entries

#### [NEW] `src/components/shared/ExternalLink.tsx`
- Safe external links with `rel="noopener noreferrer"`

#### [NEW] `src/components/shared/CTA.tsx`
- Primary (dark charcoal) and secondary (outlined) button styles

#### [NEW] `src/components/shared/Breadcrumbs.tsx`
- Breadcrumb navigation for detail pages

---

### 6. Homepage (`/`)

#### [NEW] `src/app/page.tsx`

**7 sections**, all using Server Components:

1. **Hero** — Eyebrow + "I learn by building." + supporting text + portrait (`3.png`) + CTAs + social links
2. **Introduction** — "I didn't start with a master plan." editorial section
3. **Journey Preview** — Visual chronological eras (2020 → Now), CTA to full journey
4. **Selected Work** — Editorial grid: ShopClues, SmartStore, The Vibed Vines, Kraftt Digital
5. **What I'm Exploring** — 4 themes: Technology, Businesses, Systems, Experiments
6. **Principles** — 5 compact editorial principles
7. **Future Platform** — "Building a useful corner of the internet." statement

---

### 7. About Page (`/about`)

#### [NEW] `src/app/about/page.tsx`
- First-person editorial narrative
- Uses `1.JPG` (formal candid)
- 10 structural sections from curiosity → current philosophy
- Links to Journey, Builds, Contact

---

### 8. Journey Page (`/journey`)

#### [NEW] `src/app/journey/page.tsx`
- Long-form chronological storytelling
- Uses `2.jpg` (architectural) as editorial interstitial
- Custom `JourneyEntry` and `JourneyMedia` components
- SmartStore subsection with screenshot(s)
- Ends with "The story is still in progress."

#### [NEW] `src/components/journey/JourneyEntry.tsx`
#### [NEW] `src/components/journey/JourneyMedia.tsx`

---

### 9. Builds Pages

#### [NEW] `src/app/builds/page.tsx`
- Organized: Professional Work, Business Experiments, Current Venture
- Editorial alternating image/text layouts

#### [NEW] `src/app/builds/shopclues/page.tsx`
- "Where I learned to work on software that was already real."
- External links to shopclues.com

#### [NEW] `src/app/builds/smartstore/page.tsx`
- Screenshot gallery with captions (all 10 SmartStore screenshots)
- "I worked on SmartStore during my time at ShopClues."

#### [NEW] `src/app/builds/the-vibed-vines/page.tsx`
- V1 and V2 story, pause explanation, learnings

#### [NEW] `src/app/builds/kraftt-digital/page.tsx`
- Founder perspective on why Kraftt exists
- Uses Kraftt logos appropriately
- CTA configurable (null URL = no external link)

#### [NEW] `src/components/builds/BuildHero.tsx`
#### [NEW] `src/components/builds/ScreenshotGallery.tsx`

---

### 10. Now Page (`/now`)

#### [NEW] `src/app/now/page.tsx`
- "What I'm focused on now."
- 4 focus areas from `now.ts` data
- "Last updated: August 2026"

---

### 11. Contact Page (`/contact`)

#### [NEW] `src/app/contact/page.tsx`
- "Let's connect."
- Email (mailto:), Instagram, LinkedIn
- No form in V1

---

### 12. Legal Pages

#### [NEW] `src/app/privacy/page.tsx`
- Accurate Phase 1 privacy policy (no analytics, no accounts, no ads)
- "Last updated" date
- Expandable structure for Phase 2

#### [NEW] `src/app/terms/page.tsx`
- Simple terms for personal informational website

---

### 13. 404 Page

#### [NEW] `src/app/not-found.tsx`
- "This page isn't part of the journey."
- Links to Home, Journey, Builds

---

### 14. SEO & Metadata

#### [MODIFY] `src/app/layout.tsx`
- `metadataBase: new URL('https://ketangoyal.me')`
- Title template: `%s | Ketan Goyal`
- Default description, author, Open Graph defaults

#### [NEW] Every page gets unique `metadata` export
- Unique title, description, canonical, OG tags per route

#### [NEW] `src/app/robots.ts`
- Allow all public routes, disallow internal

#### [NEW] `src/app/sitemap.ts`
- All 13 public routes

---

### 15. Structured Data

#### [NEW] `src/components/shared/StructuredData.tsx`
- JSON-LD for `Person` + `ProfilePage` on home/about
- `BreadcrumbList` on detail pages

---

### 16. Open Graph Image

#### [NEW] `src/app/opengraph-image.tsx`
- Generated OG image: white (`--paper`) bg, "Ketan Goyal", "I learn by building.", `--signal` accent, `--ink` text

---

### 17. Favicon

#### [NEW] `src/app/icon.tsx`
- Generated SVG favicon with "KG" monogram

---

### 18. Security Headers

#### [NEW] `next.config.ts` (modify)
- Security headers: CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy
- Remove X-Powered-By

---

### 19. Environment & Configuration

#### [NEW] `.env.example`
```
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
```

#### [NEW/MODIFY] `README.md`
- Development, production, content, assets, SEO, env docs
- Phase 2 roadmap

---

## File Count Summary

| Category | Files |
|---|---|
| Pages (routes) | 13 |
| Content data | 4 |
| Layout components | 3 |
| Typography components | 2 |
| Home section components | 7 |
| Journey components | 2 |
| Builds components | 2 |
| Shared components | 6 |
| SEO/metadata files | 5 |
| Config/env files | 3 |
| **Total new files** | **~47** |

---

## Verification Plan

### Automated Tests
```bash
npm run lint
npx tsc --noEmit
npm run build
```

### Manual Verification
- All 13 routes render correctly
- Responsive at 360px, 390px, 768px, 1024px, 1440px
- Navigation (desktop + mobile menu)
- All images load, no CLS
- External links work with proper `rel` attributes
- Metadata/OG tags per page
- Sitemap and robots.txt
- Structured data validation
- Keyboard navigation and focus states
- No console errors or hydration warnings
- Security headers present

---

## Explicitly Deferred to Phase 2

To keep V1 shippable, the following are **out of scope for this build** and will be scoped separately once V1 ships:

- `/tools` — calculators, generators, checklists
- `/resources` — downloadable PDFs, templates, guides
- Blog / long-form writing (`/notes`, `/writing`) and any MDX/content pipeline
- Backend, CMS, email capture, or analytics

`brand_guide.md` §1–2 (positioning, voice pillars) are written to extend cleanly into Phase 2 without rework.

---

## Open Questions

> [!NOTE]
> These are non-blocking. I will proceed with sensible defaults for all:

1. **Kraftt Digital URL** — No confirmed URL found. The Kraftt detail page CTA will be configurable via `siteConfig.kraftt` (currently `null`, so no external link renders).

2. **GitHub profile** — Not included per instructions. Will be hidden via `siteConfig.github = null`.

3. **Google Site Verification** — Left as empty env variable. You'll add the token after deploying and setting up Google Search Console.

---

## Execution Approach

Given the scope (~47 files, 13 routes), I will use **parallel subagents** to build concurrently:

1. **Foundation Agent** — Project init, design system, layout components, content data
2. **Pages Agent 1** — Homepage (all 7 sections), About, Contact
3. **Pages Agent 2** — Journey, Builds index + 4 detail pages, Now
4. **Infrastructure Agent** — SEO, security headers, legal pages, 404, OG image, favicon, README

This ensures fast, complete delivery of the entire V1.
