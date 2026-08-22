# Ketan Goyal — Personal Site

`ketangoyal.me` — Next.js (App Router) + TypeScript + Tailwind CSS 4, with a
standalone Sanity Studio for Writing.

Positioning, voice, color, and typography rules live in `brand_guide.md` at the
repo root (copy it in alongside this README) — that document is the source of
truth for any design decision not covered here.

## Development

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Production build

```bash
npm run lint
npm run typecheck
npm run build
npm run verify:export
```

`npm run build` creates the static GitHub Pages artifact in `out/`. See
`GITHUB_PAGES_DEPLOYMENT.md` for deployment and publication operations and
`SECURITY_DEPLOYMENT.md` for repository, browser, form, and optional Cloudflare protections.

## Content

Core profile copy lives in `src/content/*.ts`, separate from components:

- `site.ts` — name, domain, email, social links, SEO defaults
- `journey.ts` — the 9-era chronological journey
- `builds.ts` — ShopClues, SmartStore, The Vibed Vines, Kraftt Digital
- `now.ts` — current-focus items shown on `/now`

Writing content lives in Sanity project `eo7oruo5` and is edited through the
standalone `studio-ketan-goyal-cms/` application. See `CMS_SETUP.md` for setup,
publishing, TypeGen, caching, and deployment instructions.

## Assets — action needed before launch

This build ships with **placeholder images** generated at the exact final
paths so the site builds and renders correctly end to end. Replace them with
real files of the same name before launch:

| Placeholder path | Replace with |
|---|---|
| `public/images/ketan/ketan-goyal-portrait.png` | `3.png` — hero portrait |
| `public/images/ketan/ketan-goyal-formal-candid.jpg` | `1.JPG` — About page photo |
| `public/images/ketan/ketan-goyal-journey.jpg` | `2.jpg` — Journey interstitial |
| `public/images/kraftt/kraftt-digital-logo-light.png` | Kraftt logo, light bg |
| `public/images/kraftt/kraftt-digital-logo-dark.png` | Kraftt logo, dark bg |
| `public/images/kraftt/kraftt-submark-light.png` | Kraftt submark, light |
| `public/images/kraftt/kraftt-submark-dark.png` | Kraftt submark, dark |
| `public/images/smartstore/smartstore-01.png` … `-10.png` | 10 SmartStore screenshots |

Keep the exact filenames and this is a drop-in swap — no code changes needed.

## SEO

- Unique `metadata` export per route (title, description, canonical)
- `src/app/sitemap.ts` — generated from static routes, builds, and indexable Sanity writing
- `src/app/robots.ts` — allows all public routes
- `src/app/opengraph-image.tsx` / `src/app/icon.tsx` — generated OG image and favicon
- `PersonProfileJsonLd` (home), `BreadcrumbJsonLd` (build and article pages), and
  `WritingArticleJsonLd` (article pages) in `src/components/shared/StructuredData.tsx`

Add your Google Search Console verification token to `.env.example` /
`.env.local` as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` after deploying.

## Security headers

Configured in `next.config.ts`: CSP, X-Content-Type-Options, X-Frame-Options,
Referrer-Policy, Permissions-Policy, and `X-Powered-By` removed. The CSP
currently allows `'unsafe-inline'` for scripts/styles, which Next.js needs for
its own hydration bootstrap without a nonce-based setup — tightening this
further requires wiring a per-request nonce through middleware, intentionally
left out of V1 to keep the build simple.

## Known deviations from the original plan

- Scaffolded on **Next.js 16** (React 19), not Next.js 15 — 16 was "latest
  stable" at scaffold time and the App Router API used here is unaffected.
- Tailwind CSS 4 uses CSS-first config (`@theme` in `globals.css`) rather than
  a `tailwind.config.ts` file — this is the standard v4 pattern, not a
  deviation in practice, just a different file than the original plan named.

## Future additions

`/tools`, `/resources`, and additional platform features remain future work.
The Writing CMS and `/writing` routes are now implemented.
