# GitHub Pages deployment

## Architecture

The repository contains two independent applications:

- The Next.js website at the repository root. It is exported to static files in `out/` and hosted
  by GitHub Pages at `https://ketangoyal.me`.
- The Sanity Studio in `studio-ketan-goyal-cms/`. It is deployed separately to Sanity hosting and
  is never embedded in the public website.

The GitHub Actions build queries Sanity's public `production` dataset using the published
perspective and no token. It generates the Writing index and every currently published article as
static HTML. Browsers do not query Sanity, and GitHub Pages does not run Next.js, Node.js, ISR,
middleware, route handlers, or serverless functions.

## Repository prerequisites

The workflow currently treats `main` as the production branch because this local website folder
does not contain Git metadata or a discoverable remote. Before committing, confirm that the GitHub
repository's default production branch is `main`. If it is different, update the single branch name
under `on.push.branches` in `.github/workflows/deploy-pages.yml`.

Add these values under **Settings → Secrets and variables → Actions → Variables**:

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `eo7oruo5` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console token, when available |

The Sanity project ID and dataset are public identifiers. Do not add a Sanity token, GitHub PAT,
Studio login, or write credential to this workflow.

## Enable GitHub Pages

1. Push the reviewed repository to GitHub only when ready.
2. Open **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Open **Actions** and run **Deploy static website to GitHub Pages** once.
5. Confirm that the build and deploy jobs both succeed.

The workflow uses separate least-privilege jobs. The build job can only read repository contents;
the deploy job receives only `pages: write` and `id-token: write`. Pull requests do not deploy.
Every third-party action is pinned to an immutable full commit SHA with its release version in a
comment.

## Custom domain and HTTPS

`public/CNAME` exports the apex domain `ketangoyal.me`. No repository-name `basePath` or
`assetPrefix` is used.

1. In your personal or organization GitHub settings, open **Pages** and verify `ketangoyal.me`.
2. Add the TXT record GitHub provides and retain it after verification. This reduces domain-takeover
   risk.
3. In the repository's **Settings → Pages**, set the custom domain to `ketangoyal.me`.
4. Preserve the correct GitHub Pages DNS records. Do not use wildcard DNS records.
5. Wait for GitHub's DNS check and TLS certificate provisioning to complete.
6. Enable **Enforce HTTPS**.
7. Verify that both the apex domain and intended `www` behavior resolve consistently without mixed
   content.

Do not change DNS until the repository, Pages source, first deployment, and domain-verification
steps have been reviewed.

## Publishing an article

GitHub Pages cannot react to a Sanity publication by itself.

1. Edit and publish the article in Sanity Studio.
2. Open the website repository's **Actions** tab.
3. Select **Deploy static website to GitHub Pages**.
4. Select **Run workflow**, choose the production branch, and run it.
5. Wait for the build and deploy jobs.
6. Open the expected `/writing/<slug>/` URL.
7. Confirm the URL appears in `https://ketangoyal.me/sitemap.xml` unless the article is no-index.

`workflow_dispatch` is the initial publication mechanism. Do not store a GitHub PAT in Sanity or
call the GitHub API directly from Studio.

Safer future automation options are:

- Add a scheduled workflow rebuild at a reasonable interval.
- Send a signed Sanity webhook to a trusted relay that validates the webhook signature and stores
  its GitHub credential outside Sanity Studio and the public repository.

## Repository security settings

Under **Settings → Advanced Security** or the repository's available security settings, enable:

- Dependency graph
- Dependabot alerts
- Dependabot security updates
- Secret scanning and push protection where available
- CodeQL default setup for TypeScript/JavaScript

`.github/dependabot.yml` checks the website, Studio, and GitHub Actions weekly. It does not merge
updates automatically.

Protect the production branch:

- Require pull requests and at least one approving review.
- Require the build checks before merge.
- Dismiss stale approvals when new commits are pushed.
- Restrict force pushes and branch deletion.
- Require review from a trusted maintainer for `.github/workflows/**` changes, using a ruleset or
  CODEOWNERS after the repository owner/team is known.

CodeQL default setup is preferred over adding a second workflow because GitHub maintains its event
and language configuration without overlapping scanners.

## Local commands

```powershell
cd "D:\04-Live Sites\Ketan Goyal V2"
npm ci
npm run lint
npm run typecheck
npm run build
npm run verify:export
```

For a local production preview after building:

```powershell
npx --yes serve@14.2.5 out
```

The Studio remains separate:

```powershell
cd "D:\04-Live Sites\Ketan Goyal V2\studio-ketan-goyal-cms"
npm ci
npm run dev
```

## Production verification checklist

- [ ] The workflow ran from the intended production branch.
- [ ] `out/index.html`, `out/writing/index.html`, `out/404.html`, `out/sitemap.xml`, and
      `out/robots.txt` were verified by the build.
- [ ] Every published article has static HTML containing its title, article markup, and BlogPosting
      JSON-LD.
- [ ] Drafts are absent and no-index articles are absent from the sitemap.
- [ ] Canonicals, Open Graph URLs, JSON-LD, sitemap, and robots use `https://ketangoyal.me`.
- [ ] Header/mobile navigation, category filtering, article links, and the contact form work.
- [ ] `CNAME` contains only `ketangoyal.me`.
- [ ] The custom domain is verified, TLS is provisioned, and **Enforce HTTPS** is enabled.
- [ ] GitHub security features and production-branch protection are enabled.
- [ ] No credentials, local environment files, or `out/` build artifacts were committed.

