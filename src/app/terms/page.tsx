import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import Eyebrow from "@/components/typography/Eyebrow";
import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Use",
  description: `Terms of use for ${siteConfig.domain}.`,
  path: "/terms",
  keywords: ["Ketan Goyal terms of use", `${siteConfig.domain} terms`],
});

export default function TermsPage() {
  return (
    <Container className="py-16 sm:py-24">
      <Eyebrow>Legal</Eyebrow>
      <h1 className="font-display mt-6 text-4xl text-ink">Terms of Use</h1>
      <p className="meta-mono mt-4 text-dust">Last updated: August 2026</p>

      <div className="mt-12 max-w-2xl space-y-8 text-lg text-slate prose-measure">
        <p>
          {siteConfig.domain} is a personal, informational website belonging to{" "}
          {siteConfig.name}. By using it, you agree to the following.
        </p>

        <div>
          <h2 className="font-display text-xl text-ink">Content</h2>
          <p className="mt-3">
            Everything on this site — writing, images, and the journey/build descriptions — is
            provided as-is, for informational purposes. It reflects one person&rsquo;s account
            of his own work and experiments, not professional advice of any kind.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-ink">External links</h2>
          <p className="mt-3">
            Links to third-party sites (Instagram, LinkedIn, Shopify, ShopClues, and others) are
            provided for reference. This site isn&rsquo;t responsible for the content or
            practices of those external sites.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-ink">Intellectual property</h2>
          <p className="mt-3">
            Text, images, and design on this site belong to {siteConfig.name} unless otherwise
            noted, and shouldn&rsquo;t be reproduced without permission.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-ink">Changes</h2>
          <p className="mt-3">
            These terms may be updated as the site grows. Continued use after an update means
            you accept the revised terms.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-ink">Contact</h2>
          <p className="mt-3">Questions can be sent to {siteConfig.email}.</p>
        </div>
      </div>
    </Container>
  );
}
