import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import BuildHero from "@/components/builds/BuildHero";
import ScreenshotGallery from "@/components/builds/ScreenshotGallery";
import ExternalLink from "@/components/shared/ExternalLink";
import { BreadcrumbJsonLd, BuildCaseStudyJsonLd } from "@/components/shared/StructuredData";
import { builds } from "@/content/builds";
import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

const build = builds.find((b) => b.id === "shopclues")!;

export const metadata: Metadata = createPageMetadata({
  title: "ShopClues Software Engineering Work",
  description:
    "Ketan Goyal's Software Engineer work at ShopClues across PHP, JavaScript, Next.js, TypeScript, SQL, performance, GTM, and production e-commerce systems.",
  path: "/builds/shopclues",
  keywords: [
    "ShopClues software engineer",
    "ShopClues developer",
    "ecommerce software engineering",
    "PHP ecommerce development",
    "Next.js TypeScript ecommerce",
    "Google Tag Manager implementation",
    "production system performance",
  ],
  image: build.screenshots?.[0]?.src,
});

export default function ShopCluesPage() {
  return (
    <Container className="py-16 sm:py-24">
      <BuildCaseStudyJsonLd build={build} />
      <BreadcrumbJsonLd
        items={[
          { name: "Builds", url: `${siteConfig.url}/builds` },
          { name: build.name, url: `${siteConfig.url}/builds/shopclues` },
        ]}
      />
      <BuildHero build={build} />

      <div className="mt-14 max-w-2xl">
        <p className="text-lg text-slate prose-measure">{build.summary}</p>

        <h2 className="font-display mt-12 text-2xl text-ink">Role</h2>
        <p className="mt-3 text-slate">{build.role}</p>

        <h2 className="font-display mt-12 text-2xl text-ink">What it taught me</h2>
        <ul className="mt-4 space-y-3">
          {build.learnings.map((l) => (
            <li key={l} className="flex gap-3 text-slate">
              <span className="mt-2.5 h-1 w-1 rounded-full bg-signal shrink-0" aria-hidden="true" />
              {l}
            </li>
          ))}
        </ul>

        {build.externalUrl ? (
          <p className="mt-12 text-slate">
            <ExternalLink href={build.externalUrl}>Visit shopclues.com</ExternalLink>
          </p>
        ) : null}
      </div>

      <section className="mt-16 border-t border-mist pt-12">
        <h2 className="font-display text-2xl text-ink">Selected work</h2>
        <p className="mt-3 text-slate prose-measure">
          Production screens and implementation evidence from the ShopClues work.
        </p>
        <div className="mt-8">
          <ScreenshotGallery images={build.screenshots ?? []} />
        </div>
      </section>
    </Container>
  );
}
