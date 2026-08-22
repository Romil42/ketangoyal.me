import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import BuildHero from "@/components/builds/BuildHero";
import ScreenshotGallery from "@/components/builds/ScreenshotGallery";
import { BreadcrumbJsonLd, BuildCaseStudyJsonLd } from "@/components/shared/StructuredData";
import { builds } from "@/content/builds";
import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

const build = builds.find((b) => b.id === "smartstore")!;

export const metadata: Metadata = createPageMetadata({
  title: "SmartStore Merchant Platform Work",
  description:
    "A SmartStore merchant-platform case study covering Next.js, TypeScript, PHP, SQL, catalog management, bulk operations, order search, and marketplace tooling.",
  path: "/builds/smartstore",
  keywords: [
    "SmartStore ShopClues",
    "merchant dashboard development",
    "ecommerce catalog management software",
    "Next.js TypeScript ecommerce",
    "bulk catalog management",
    "marketplace seller tools",
    "order dashboard development",
  ],
  image: build.screenshots?.[0]?.src,
});

export default function SmartStorePage() {
  return (
    <Container className="py-16 sm:py-24">
      <BuildCaseStudyJsonLd build={build} />
      <BreadcrumbJsonLd
        items={[
          { name: "Builds", url: `${siteConfig.url}/builds` },
          { name: build.name, url: `${siteConfig.url}/builds/smartstore` },
        ]}
      />
      <BuildHero build={build} />

      <div className="mt-14 max-w-2xl">
        <p className="text-lg text-slate prose-measure">{build.summary}</p>

        <h2 className="font-display mt-12 text-2xl text-ink">What it taught me</h2>
        <ul className="mt-4 space-y-3">
          {build.learnings.map((l) => (
            <li key={l} className="flex gap-3 text-slate">
              <span className="mt-2.5 h-1 w-1 rounded-full bg-signal shrink-0" aria-hidden="true" />
              {l}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16 border-t border-mist pt-12">
        <h2 className="font-display text-2xl text-ink">Screenshots</h2>
        <p className="mt-3 text-slate">
          Shown as evidence, not polished product shots — the interface as it actually shipped.
        </p>
        <div className="mt-8">
          <ScreenshotGallery images={build.screenshots ?? []} />
        </div>
      </div>
    </Container>
  );
}
