# Static-site security deployment

## Security boundary

GitHub Pages serves files; it does not run the Next.js server. `next.config.ts` response headers,
middleware, server-side rate limiting, runtime authorization, ISR, and a WAF are unavailable.
Security therefore has three layers:

1. Safe static HTML and browser behavior in this repository.
2. GitHub repository, Actions, dependency, and domain controls.
3. Optional edge controls such as Cloudflare in front of GitHub Pages.

Robots directives are crawl guidance, not access control. Draft or confidential content must never
be published to the public Sanity dataset or exported as a page.

## Actual third-party origins

The current public website uses:

- `https://cdn.sanity.io` for exported article images.
- `https://formspree.io` for contact-form submissions.
- `https://schema.org` only as a JSON-LD vocabulary URL; it is not fetched by the page.
- External navigation to LinkedIn, Instagram, ShopClues, and Kraftt Digital.

Fonts, Next.js scripts, CSS, and all non-Sanity images are self-hosted. No analytics, ad network,
embedded frame, or runtime Sanity API request is currently used in the browser.

## Recommended response headers

GitHub Pages cannot configure these per repository. Apply them only at a tested edge proxy. Start
with a staging or narrowly scoped rule and verify navigation, hydration, Sanity images, and the
Formspree submission before enforcing it globally.

```text
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://cdn.sanity.io; font-src 'self' data:; connect-src 'self' https://formspree.io; form-action 'self' https://formspree.io; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; upgrade-insecure-requests
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
```

Notes:

- Next.js emits inline bootstrap scripts and inline styles, so this deployable baseline retains
  `'unsafe-inline'`. Moving to nonces or hashes would require a response-aware deployment layer and
  a separate tested implementation.
- `frame-ancestors`, HSTS, and several other protections must be response headers; a meta CSP is not
  an equivalent replacement.
- Do not add `includeSubDomains` or submit the domain for HSTS preload until every required
  subdomain supports HTTPS permanently. Preload is intentionally not enabled here.
- `frame-ancestors 'none'`, `object-src 'none'`, and `base-uri 'self'` belong in the CSP exactly as
  shown.

## Markup and CMS protections

- Public Sanity queries use `perspective: "published"`, no token, and fresh build-time Content Lake
  reads.
- Article HTML is generated at build time; browsers do not fetch or mutate Sanity content.
- Portable Text never renders raw CMS HTML. Code is rendered as escaped React text.
- CMS links are allowlisted to `https:`, `http:`, and intentional `mailto:` links. Unsafe and
  malformed protocols render without a clickable link.
- New-tab links use `rel="noopener noreferrer"`.
- Internal article slugs must match lowercase letters, numbers, and single hyphens.
- Sanity images are generated from image asset references through the configured URL builder.
- Image alt text and slug formats are validated in Studio; the public renderer still fails safely.
- JSON-LD uses `JSON.stringify` and escapes `<`, U+2028, and U+2029 before inserting serialized JSON
  into its script element.
- The exported verifier compares article pages with the published Sanity slug set and checks
  metadata, draft leakage, sitemap inclusion, internal links, and static assets.

## Contact form and spam

The contact form posts directly to Formspree. It has native required/type/length validation, a
non-focusable honeypot, accessible live status, and a normal HTML form action as a JavaScript
fallback. Browser validation improves usability but is not a server-side security boundary.

In Formspree, manually enable and review:

- Provider-side validation and spam filtering
- Submission-rate limits and notification thresholds
- Domain/origin restrictions if supported by the selected plan
- Formspree's supported CAPTCHA option if spam volume justifies it

Do not add a fake client-only CAPTCHA. Cloudflare Turnstile is secure only when its response token
is verified by a trusted server or provider integration; GitHub Pages cannot perform that
verification itself.

## Search crawlers and bots

`robots.txt` keeps legitimate indexing enabled and exposes only the public sitemap. It does not
contain draft URLs. Article no-index metadata and sitemap exclusion are controlled by Sanity.

Do not add user-agent blocking JavaScript, country blocks, blanket automation blocks, or rules that
impair accessibility and verified search crawlers. Cloudflare Bot Fight Mode is an optional edge
signal, not functionality supplied by GitHub Pages.

## Repository and workflow security

- Local environment files, private-key formats, token files, credentials files, `.next/`, and
  `out/` are ignored.
- The Pages workflow consumes only public repository variables and contains no PAT or Sanity token.
- Actions are pinned to immutable SHAs and use separate least-privilege build/deploy jobs.
- Pull requests never deploy, and concurrency cancels superseded Pages runs.
- Dependabot checks both npm applications and workflow actions weekly without auto-merge.
- Enable GitHub's dependency graph, Dependabot alerts/security updates, secret scanning/push
  protection, protected production branch, and required review for workflow changes.
- Enable CodeQL default setup from **Settings → Advanced Security → CodeQL analysis → Set up →
  Default** instead of adding an overlapping scanner workflow.

## Optional Cloudflare Free layer

Do not make these changes until the ordinary GitHub Pages deployment is healthy.

1. Complete the GitHub Pages Actions deployment and HTTPS setup first.
2. Verify `ketangoyal.me` in GitHub before changing DNS.
3. Preserve the correct GitHub Pages apex and any intended `www` DNS records.
4. Add the domain to Cloudflare, import and carefully compare every DNS record, then enable proxying
   only after the unproxied Pages site works.
5. Use **Full (strict)** TLS only after confirming Cloudflare can validate the GitHub Pages origin
   certificate for the hostname.
6. Enable **Always Use HTTPS**.
7. Add the response-header policy above with Response Header Transform Rules, which are available
   to Free-plan zones, and verify it in report/test conditions before broad enforcement.
8. Enable baseline **Bot Fight Mode** and monitor analytics and contact submissions for false
   positives.
9. Keep verified Google, Bing, and other legitimate search crawlers accessible.
10. Begin with non-destructive managed security settings; do not create country or blanket
    user-agent blocks without traffic evidence.
11. Do not enable `includeSubDomains` or HSTS preload until every subdomain and long-term HTTPS
    behavior is confirmed.
12. Keep GitHub Pages as the origin and retain GitHub domain verification even while proxied.

After enabling Cloudflare, check the CSP/header values on HTML responses, the Formspree request,
all Sanity images, social preview assets, navigation, and search-engine access. Roll back the edge
rule immediately if it breaks required behavior.

