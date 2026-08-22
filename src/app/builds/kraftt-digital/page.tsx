import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/layout/Container";
import BuildHero from "@/components/builds/BuildHero";
import CTA from "@/components/shared/CTA";
import { BreadcrumbJsonLd, BuildCaseStudyJsonLd } from "@/components/shared/StructuredData";
import { builds } from "@/content/builds";
import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

const build = builds.find((b) => b.id === "kraftt-digital")!;

export const metadata: Metadata = createPageMetadata({
  title: "Kraftt Digital — Small Business Digital Transformation",
  description:
    "Kraftt Digital helps smaller businesses in India adopt websites, digital systems, practical AI automation, and modern technology for sustainable growth.",
  path: "/builds/kraftt-digital",
  keywords: [
    "Kraftt Digital",
    "digital transformation for small business India",
    "AI automation for small business India",
    "website development for small business India",
    "business automation services India",
    "digital solutions company India",
    "technology for small businesses India",
  ],
  image: "/images/kraftt/kraftt-vision.png",
});

export default function KrafttDigitalPage() {
  return (
    <Container className="py-16 sm:py-24">
      <BuildCaseStudyJsonLd build={build} />
      <BreadcrumbJsonLd
        items={[
          { name: "Builds", url: `${siteConfig.url}/builds` },
          { name: build.name, url: `${siteConfig.url}/builds/kraftt-digital` },
        ]}
      />
      <BuildHero build={build} />

      <section className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="Kraftt Digital identity">
        <div className="flex min-h-44 items-center justify-center rounded-2xl border border-mist bg-paper p-8">
          <div className="relative h-24 w-full max-w-xs">
            <Image
              src="/images/kraftt/Primary Light.png"
              alt="Kraftt Digital logo in its light-background treatment"
              fill
              sizes="(min-width: 640px) 40vw, 80vw"
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex min-h-44 items-center justify-center rounded-2xl bg-graphite p-8">
          <div className="relative h-24 w-full max-w-xs">
            <Image
              src="/images/kraftt/Primary Dark.png"
              alt="Kraftt Digital logo in its dark-background treatment"
              fill
              sizes="(min-width: 640px) 40vw, 80vw"
              className="object-contain"
            />
          </div>
        </div>
      </section>

      <div className="mt-10 max-w-2xl">
        <h2 className="font-display text-2xl text-ink">Why Kraftt exists</h2>
        <p className="mt-4 text-lg text-slate prose-measure">{build.summary}</p>

        <h2 className="font-display mt-12 text-2xl text-ink">What everything before it added up to</h2>
        <ul className="mt-4 space-y-3">
          {build.learnings.map((l) => (
            <li key={l} className="flex gap-3 text-slate">
              <span className="mt-2.5 h-1 w-1 rounded-full bg-signal shrink-0" aria-hidden="true" />
              {l}
            </li>
          ))}
        </ul>

        {build.externalUrl ? (
          <div className="mt-12">
            <CTA href={build.externalUrl} external>
              Visit Kraftt Digital
            </CTA>
          </div>
        ) : (
          <p className="mt-12 text-sm text-dust">
            Kraftt Digital&rsquo;s site isn&rsquo;t linked here yet — reach out directly via the{" "}
            <a href="/contact" className="underline hover:text-signal">
              contact page
            </a>
            .
          </p>
        )}
      </div>
    </Container>
  );
}
