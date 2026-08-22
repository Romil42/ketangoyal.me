import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/typography/SectionHeading";
import { builds } from "@/content/builds";

const BUILD_LOGOS: Record<string, { src: string; alt: string; className: string }> = {
  shopclues: {
    src: "/images/shopclues-logo.svg",
    alt: "ShopClues logo",
    className: "h-7 w-auto max-w-[9rem]",
  },
  smartstore: {
    src: "/images/smartstore-logo.svg",
    alt: "SmartStore logo",
    className: "h-7 w-auto max-w-[9rem]",
  },
  "the-vibed-vines": {
    src: "/images/thevibedvines-logo.png",
    alt: "The Vibed Vines logo",
    className: "h-12 w-12 rounded-full object-contain",
  },
  "kraftt-digital": {
    src: "/images/kraftt/Primary Light.png",
    alt: "Kraftt Digital logo",
    className: "h-10 w-auto max-w-[9rem] object-contain",
  },
};

export default function SelectedWork() {
  return (
    <section className="bg-fog py-16 sm:py-24">
      <Container>
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title="Things I&rsquo;ve built."
            subtext="Production work, business experiments, and the venture I&rsquo;m building now."
          />
          <Link
            href="/builds"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-ink transition-colors hover:text-signal"
          >
            View all builds
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {builds.map((build, index) => {
            const logo = BUILD_LOGOS[build.id];
            return (
              <Link
                key={build.id}
                href={`/builds/${build.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-mist bg-paper p-6 transition duration-300 hover:-translate-y-0.5 hover:border-signal/30 hover:shadow-[0_16px_42px_rgba(20,22,27,0.065)] sm:p-7"
              >
                <div className="flex min-h-14 items-center justify-between gap-5">
                  {logo ? (
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={180}
                      height={56}
                      className={logo.className}
                    />
                  ) : null}
                  <span className="meta-mono rounded-full border border-mist px-2.5 py-1 text-dust">
                    0{index + 1}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-mist pt-5">
                  <p className="eyebrow text-signal">{build.classification}</p>
                  <p className="meta-mono text-dust">{build.period}</p>
                </div>
                <h3 className="font-display mt-4 text-2xl text-ink transition-colors group-hover:text-signal">
                  {build.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate sm:text-base">{build.hook}</p>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-signal-soft px-3 py-1.5 text-xs font-semibold text-signal">
                    {build.role}
                  </span>
                  {build.stack.slice(0, 3).map((technology) => (
                    <span key={technology} className="rounded-full bg-fog px-3 py-1.5 text-xs text-slate">
                      {technology}
                    </span>
                  ))}
                </div>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors group-hover:text-signal">
                  Read the story
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
