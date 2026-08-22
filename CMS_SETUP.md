# Sanity CMS setup

This repository contains two separately packaged applications:

- The existing Next.js website at the repository root.
- A standalone Sanity Studio in `studio-ketan-goyal-cms/`.

The Studio is not embedded in Next.js and is not served from a website route. It has its own
`package.json`, development server, production build, and Sanity-hosting deployment command.
Both applications require Node.js 22.12 or newer.

## Project details

- Sanity project: **Ketan Goyal CMS**
- Project ID: `eo7oruo5`
- Dataset: `production`
- Dataset visibility: public
- Public Writing routes: `/writing` and `/writing/[slug]`
- Fixed Content Lake API version: `2026-08-01`

The public website uses the `published` perspective and does not use an API token. Drafts and
Content Releases are therefore excluded from public queries.

## Folder structure

```text
.
├── src/app/writing/                 # Writing listing and route states
├── src/app/writing/[slug]/          # Server-rendered article route
├── src/components/portable-text/    # Accessible Portable Text renderers
├── src/components/writing/          # Writing cards, images, navigation and CTAs
├── src/sanity/                      # Client, cache wrapper, queries and generated types
├── studio-ketan-goyal-cms/          # Standalone Sanity Studio
│   ├── schemaTypes/documents/       # Post and Category documents
│   ├── schemaTypes/objects/         # SEO and structured article blocks
│   ├── sanity.config.ts             # Studio and Structure configuration
│   └── sanity.cli.ts                # CLI and TypeGen configuration
└── CMS_SETUP.md
```

## Environment variables

Create `.env.local` in the Next.js root:

```dotenv
NEXT_PUBLIC_SANITY_PROJECT_ID=eo7oruo5
NEXT_PUBLIC_SANITY_DATASET=production
```

Create `studio-ketan-goyal-cms/.env.local`:

```dotenv
SANITY_STUDIO_PROJECT_ID=eo7oruo5
SANITY_STUDIO_DATASET=production
```

Both local files are ignored. Project IDs and dataset names are public identifiers, but tokens,
login credentials, and write credentials must never be added to either file or committed.

The checked-in `.env.example` files contain placeholders for a fresh setup.

## Run locally

Use two terminals.

Website:

```powershell
cd "D:\04-Live Sites\Ketan Goyal V2"
npm install
npm run dev
```

The website is normally available at `http://localhost:3000`.

Studio:

```powershell
cd "D:\04-Live Sites\Ketan Goyal V2\studio-ketan-goyal-cms"
npm install
npm run dev
```

The Studio is normally available at `http://localhost:3333` and requires a Sanity account with
access to project `eo7oruo5`.

## Editorial workflow

### Create a category

1. Open **Categories** in the Studio.
2. Select **Create** and enter a title.
3. Generate the slug from the title.
4. Add a short description if it improves editorial context.
5. Publish the category.

### Create and publish an article

1. Open **Writing → All writing**.
2. Create a new Writing document.
3. Complete the Content group: title, generated slug, excerpt, and article body.
4. Choose a content type, category, tags, and publication date in Classification.
5. Upload the featured image and write meaningful alternative text in Media.
6. Review SEO and Connections.
7. Publish when the article is ready.

Sanity automatically saves drafts. A draft never appears on the public website. Publishing creates
the public document; unpublishing removes it from public queries after caches expire. There is no
manual status field because the Studio's built-in draft and publishing workflow is authoritative.

Future-dated published documents are hidden until their publication time.

### Images

- Featured images and inline images support crop and hotspot controls.
- Alternative text is required for featured and inline images.
- Captions are optional and visible; alternative text is for accessibility and is not reused as a
  caption.
- The website requests appropriately sized images from `cdn.sanity.io`, uses responsive
  `next/image`, and uses Sanity's LQIP metadata when available.

### Structured article blocks

The article editor supports paragraphs, H2–H4 headings, bold, italic, inline code, bullet and
numbered lists, blockquotes, internal and external links, plus:

- Inline image
- Callout
- Code block
- Numbered process
- Comparison table
- Kraftt Digital CTA
- Related resource or tool

Comparison tables render with semantic table markup and become horizontally scrollable on narrow
screens.

### SEO

The article title and excerpt are the defaults. The SEO group can override the search title, meta
description, social image, and canonical URL. Use **Hide from search engines** only when the public
URL should remain available but should not be indexed; no-index articles are excluded from the
sitemap.

### Featured and related writing

- Enable **Featured article** to make an article eligible for the featured Writing treatment. When
  several are enabled, the newest published article appears first.
- Select up to three **Related writing** entries. The editor filters out the current document, and
  only published related entries render publicly.
- The closing Kraftt Digital CTA is optional and selected independently from CTA blocks inserted
  inside the article body.

## Publishing and static builds

The public website is a complete static export hosted by GitHub Pages. Sanity is queried with the
published perspective and without the CDN while GitHub Actions runs `npm run build`.

After an article is published or edited:

1. Open the repository's **Actions** tab.
2. Select **Deploy static website to GitHub Pages**.
3. Choose **Run workflow** on the production branch.
4. Wait for both the build and deploy jobs to succeed.
5. Verify the article URL and `https://ketangoyal.me/sitemap.xml`.

The live website does not query Sanity in the browser and cannot refresh itself when Sanity
changes. A new or changed slug appears only after a successful website rebuild. Drafts are never
queried, and posts marked no-index remain out of the sitemap.

## Type generation

Queries are wrapped in `defineQuery`, and Sanity TypeGen generates strict result types at
`src/sanity/sanity.types.ts`.

Run TypeGen whenever schemas or GROQ projections change:

```powershell
cd studio-ketan-goyal-cms
npm run typegen
```

Do not edit `src/sanity/sanity.types.ts` directly.

## Production builds

Website:

```powershell
npm run lint
npx tsc --noEmit
npm run build
```

Studio:

```powershell
cd studio-ketan-goyal-cms
npx eslint .
npx tsc --noEmit
npm run typegen
npm run build
```

## GitHub Pages preparation

The website uses `output: "export"`, trailing slashes, and unoptimized `next/image` output so that
`npm run build` creates a deployable `out/` directory. The custom domain is stored in
`public/CNAME`; no repository-name `basePath` or `assetPrefix` is used.

Add these GitHub repository variables before running the workflow:

- `NEXT_PUBLIC_SANITY_PROJECT_ID=eo7oruo5`
- `NEXT_PUBLIC_SANITY_DATASET=production`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` when available

See `GITHUB_PAGES_DEPLOYMENT.md` for the complete repository, Pages, domain, publication, and
verification procedure. See `SECURITY_DEPLOYMENT.md` for the browser-security and optional
Cloudflare guidance that GitHub Pages cannot enforce itself.

## Deploy the Studio later

Do not run this until a Studio hostname has been chosen and deployment is approved:

```powershell
cd studio-ketan-goyal-cms
npx sanity deploy
```

The Studio will be hosted separately on a `*.sanity.studio` URL. Deploying the Studio does not
deploy the Next.js website or modify DNS.

## Troubleshooting

### A published post is missing

- Confirm the document is published rather than only saved as a draft.
- Confirm title, slug, excerpt, body, featured image, featured-image alt text, and publication date
  pass validation.
- Confirm the publication date is not in the future.
- Run the GitHub Pages workflow after publishing and confirm that its build job completed.
- Confirm both Next.js environment variables match project `eo7oruo5` and dataset `production`.

### An image is missing

- Confirm the image upload completed and the document was republished.
- Confirm the image asset still exists in Sanity.
- Confirm `cdn.sanity.io` remains present in `next.config.ts` image and CSP configuration.

### Environment configuration fails

- Copy the relevant `.env.example` to `.env.local`.
- Restart the development server after editing environment variables.
- Do not quote or add spaces around the identifiers.

### The Studio cannot access the project

```powershell
npx sanity debug
npx sanity projects list
```

If needed, run `npx sanity login` with the account that has access to `eo7oruo5`.
