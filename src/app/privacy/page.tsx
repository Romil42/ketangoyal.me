import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import Eyebrow from "@/components/typography/Eyebrow";
import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.domain}.`,
  path: "/privacy",
  keywords: ["Ketan Goyal privacy policy", `${siteConfig.domain} privacy policy`],
});

export default function PrivacyPage() {
  return (
    <Container className="py-16 sm:py-24">
      <Eyebrow>Legal</Eyebrow>
      <h1 className="font-display mt-6 text-4xl text-ink">Privacy Policy</h1>
      <p className="meta-mono mt-4 text-dust">Last updated: August 2026</p>

      <div className="mt-12 max-w-2xl space-y-8 text-lg text-slate prose-measure">
        <p>
          This is a simple, informational personal website. As of this version (Phase 1), the
          site does not use analytics, does not require or offer user accounts, and does not run
          advertising of any kind.
        </p>

        <div>
          <h2 className="font-display text-xl text-ink">What this site collects</h2>
          <p className="mt-3">
            Nothing is actively collected through cookies, tracking scripts, or forms. If you
            email {siteConfig.email} directly, that exchange is governed by your email provider
            and mine, not by this website.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-ink">Hosting logs</h2>
          <p className="mt-3">
            Like almost any website, the hosting provider may record basic technical logs (such
            as IP address and request time) for security and reliability purposes. These are not
            used for tracking or advertising.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-ink">External links</h2>
          <p className="mt-3">
            This site links out to external services (Instagram, LinkedIn, Shopify, and others
            referenced in the Builds section). Those services have their own privacy policies,
            which this document doesn&rsquo;t cover.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-ink">Future changes</h2>
          <p className="mt-3">
            If a later phase of this site adds analytics, email capture, or advertising, this
            policy will be updated first, with a new &ldquo;last updated&rdquo; date, before
            those features go live.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-ink">Contact</h2>
          <p className="mt-3">
            Questions about this policy can be sent to {siteConfig.email}.
          </p>
        </div>
      </div>
    </Container>
  );
}
