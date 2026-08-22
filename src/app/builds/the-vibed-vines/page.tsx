import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import BuildHero from "@/components/builds/BuildHero";
import { BreadcrumbJsonLd, BuildCaseStudyJsonLd } from "@/components/shared/StructuredData";
import { builds } from "@/content/builds";
import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

const build = builds.find((b) => b.id === "the-vibed-vines")!;

export const metadata: Metadata = createPageMetadata({
  title: "The Vibed Vines — Shopify Brand Experiment",
  description:
    "Ketan Goyal's Shopify clothing-brand experiment covering dropshipping research, five-plus collections, more than 100 SKUs, content, mockups, and operations.",
  path: "/builds/the-vibed-vines",
  keywords: [
    "Shopify clothing brand India",
    "clothing dropshipping experiment",
    "consumer brand building",
    "Shopify store portfolio",
    "fashion ecommerce experiment",
    "The Vibed Vines",
  ],
  image: "/images/thevibedvines-logo.png",
});

export default function VibedVinesPage() {
  return (
    <Container className="py-16 sm:py-24">
      <BuildCaseStudyJsonLd build={build} />
      <BreadcrumbJsonLd
        items={[
          { name: "Builds", url: `${siteConfig.url}/builds` },
          { name: build.name, url: `${siteConfig.url}/builds/the-vibed-vines` },
        ]}
      />
      <BuildHero build={build} />

      <div className="mt-14 max-w-2xl space-y-10">
        <div>
          <h2 className="font-display text-2xl text-ink">V1 — the first attempt</h2>
          <p className="mt-4 text-lg text-slate prose-measure">
            Placeit mockups, a ChatGPT-generated logo, an Instagram page, a handful of designs,
            and real research into how clothing dropshipping actually works. When my
            circumstances changed, I paused it. No relaunch drama — just a pause.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-ink">V2 — a different scale</h2>
          <p className="mt-4 text-lg text-slate prose-measure">
            After leaving ShopClues, I came back to it instead of starting something new. This
            time: five-plus collections, 100+ SKUs, a real Shopify storefront, an Instagram
            content grid, product mockups, and reels. The point was never &ldquo;look at my
            fashion brand.&rdquo; It was understanding what it costs, in time and attention, to
            actually run a consumer brand rather than just design one.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-ink">Why it paused, again</h2>
          <p className="mt-4 text-lg text-slate prose-measure">
            Time ran out. I paused it a second time when other priorities needed more of my
            attention than the brand could get. That&rsquo;s a decision, not a failure, and it
            belongs on this page as clearly as the launch does.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-ink">What it taught me</h2>
          <ul className="mt-4 space-y-3">
            {build.learnings.map((l) => (
              <li key={l} className="flex gap-3 text-slate">
                <span className="mt-2.5 h-1 w-1 rounded-full bg-signal shrink-0" aria-hidden="true" />
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}
