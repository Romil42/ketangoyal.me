import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Images,
  Layers3,
  Lightbulb,
  Rocket,
  Shapes,
} from "lucide-react";
import Container from "@/components/layout/Container";
import Eyebrow from "@/components/typography/Eyebrow";
import CTA from "@/components/shared/CTA";
import { BuildsCollectionJsonLd } from "@/components/shared/StructuredData";
import { builds, buildsByClassification } from "@/content/builds";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Software Engineering Portfolio & Business Builds",
  description:
    "Professional work, business experiments, and the current venture — ShopClues, SmartStore, The Vibed Vines, and Kraftt Digital.",
  path: "/builds",
  keywords: [
    "software engineering portfolio India",
    "software developer portfolio India",
    "Next.js TypeScript portfolio",
    "ecommerce software projects",
    "PHP developer portfolio",
    "ShopClues developer work",
    "SmartStore merchant platform",
    "Kraftt Digital",
  ],
});

const currentVenture = buildsByClassification("Current Venture")[0];
const professionalWork = buildsByClassification("Professional Work");
const businessExperiment = buildsByClassification("Business Experiment")[0];
const screenshotCount = builds.reduce((total, build) => total + (build.screenshots?.length ?? 0), 0);

const BUILD_LOGOS: Record<string, { src: string; alt: string }> = {
  shopclues: { src: "/images/shopclues-logo.svg", alt: "ShopClues logo" },
  smartstore: { src: "/images/smartstore-logo.svg", alt: "SmartStore logo" },
  "the-vibed-vines": {
    src: "/images/thevibedvines-logo.png",
    alt: "The Vibed Vines logo",
  },
  "kraftt-digital": {
    src: "/images/kraftt/Primary Light.png",
    alt: "Kraftt Digital logo",
  },
};

export default function BuildsPage() {
  return (
    <main>
      <BuildsCollectionJsonLd builds={builds} />
      <section className="relative overflow-hidden border-b border-mist bg-paper">
        <div
          className="pointer-events-none absolute -right-40 -top-52 h-[34rem] w-[34rem] rounded-full border-[6rem] border-signal-soft"
          aria-hidden="true"
        />
        <Container className="relative py-12 sm:py-16">
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Eyebrow>Builds</Eyebrow>
              <h1 className="font-display mt-5 max-w-3xl text-4xl leading-[1.04] text-ink sm:text-5xl lg:text-6xl">
                What I&rsquo;ve built, and what each build taught me.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate sm:text-lg">
                Production engineering, business experiments, and the venture I&rsquo;m running
                now—organized by what the work actually was, with the decisions and lessons
                left visible.
              </p>
            </div>

            <dl className="grid grid-cols-3 overflow-hidden rounded-2xl border border-mist bg-fog lg:col-span-5">
              <div className="px-4 py-4 sm:px-5">
                <Shapes className="h-5 w-5 text-signal" aria-hidden="true" />
                <dd className="font-display mt-3 text-2xl text-ink">{builds.length}</dd>
                <dt className="meta-mono mt-1 text-dust">BUILDS</dt>
              </div>
              <div className="border-x border-mist px-4 py-4 sm:px-5">
                <Layers3 className="h-5 w-5 text-signal" aria-hidden="true" />
                <dd className="font-display mt-3 text-2xl text-ink">3</dd>
                <dt className="meta-mono mt-1 text-dust">PATHS</dt>
              </div>
              <div className="px-4 py-4 sm:px-5">
                <Images className="h-5 w-5 text-signal" aria-hidden="true" />
                <dd className="font-display mt-3 text-2xl text-ink">{screenshotCount}</dd>
                <dt className="meta-mono mt-1 text-dust">SCREENS</dt>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      {currentVenture ? (
        <section className="py-14 sm:py-20">
          <Container>
            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <Eyebrow>Current venture</Eyebrow>
                <h2 className="font-display mt-4 text-3xl text-ink sm:text-4xl">
                  Building the next chapter.
                </h2>
              </div>
              <p className="meta-mono text-dust">ACTIVE · {currentVenture.period}</p>
            </div>

            <Link
              href={`/builds/${currentVenture.slug}`}
              className="group grid overflow-hidden rounded-[1.75rem] border border-mist bg-fog transition duration-300 hover:border-signal/30 hover:shadow-[0_20px_55px_rgba(20,22,27,0.08)] lg:grid-cols-12"
            >
              <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5">
                <div>
                  <div className="flex items-center justify-between gap-5">
                    <span className="inline-flex items-center gap-2 rounded-full bg-signal-soft px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-signal">
                      <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                      In progress
                    </span>
                    <span className="meta-mono text-dust">01 / 04</span>
                  </div>
                  <Image
                    src={BUILD_LOGOS["kraftt-digital"].src}
                    alt={BUILD_LOGOS["kraftt-digital"].alt}
                    width={220}
                    height={110}
                    className="mt-6 h-14 w-auto object-contain"
                  />
                  <h3 className="sr-only">
                    {currentVenture.name}
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-ink">{currentVenture.hook}</p>
                  <p className="mt-4 text-sm leading-6 text-slate sm:text-base sm:leading-7">
                    {currentVenture.summary}
                  </p>
                </div>

                <div className="mt-7">
                  <dl className="grid grid-cols-2 gap-5 border-t border-mist pt-5">
                    <div>
                      <dt className="meta-mono text-dust">ROLE</dt>
                      <dd className="mt-2 font-semibold text-ink">{currentVenture.role}</dd>
                    </div>
                    <div>
                      <dt className="meta-mono text-dust">FOCUS</dt>
                      <dd className="mt-2 font-semibold text-ink">Digital adoption</dd>
                    </div>
                  </dl>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {currentVenture.stack.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-mist bg-paper px-3 py-1.5 text-xs text-slate"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 font-semibold text-ink transition-colors group-hover:text-signal">
                    Explore the venture
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </div>

              <div className="relative min-h-[18rem] overflow-hidden border-t border-mist bg-paper lg:col-span-7 lg:min-h-[28rem] lg:border-l lg:border-t-0">
                <Image
                  src="/images/kraftt/kraftt-vision.png"
                  alt="Kraftt Digital vision map connecting brand, content, web, automation, marketing, and growth"
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-contain p-4 transition duration-500 group-hover:scale-[1.02] sm:p-6"
                />
              </div>
            </Link>
          </Container>
        </section>
      ) : null}

      <section className="border-y border-mist bg-fog py-14 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow>Professional work</Eyebrow>
              <h2 className="font-display mt-4 text-3xl leading-tight text-ink sm:text-4xl">
                Software that real users depended on.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-slate lg:col-span-5">
              Existing production codebases, merchant tooling, analytics implementation,
              performance work, and the practical discipline of shipping inside systems I
              didn&rsquo;t create from scratch.
            </p>
          </div>

          <div className="mt-9 grid gap-6 lg:grid-cols-2">
            {professionalWork.map((build, index) => {
              const preview = build.screenshots?.[0];
              const logo = BUILD_LOGOS[build.id];
              return (
                <Link
                  key={build.id}
                  href={`/builds/${build.slug}`}
                  className="group overflow-hidden rounded-2xl border border-mist bg-paper transition duration-300 hover:-translate-y-0.5 hover:border-signal/30 hover:shadow-[0_16px_42px_rgba(20,22,27,0.07)]"
                >
                  {preview ? (
                    <div className="relative aspect-[2/1] overflow-hidden border-b border-mist bg-fog">
                      <Image
                        src={preview.src}
                        alt={preview.alt}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-contain transition duration-500 group-hover:scale-[1.025]"
                      />
                      <span className="meta-mono absolute left-4 top-4 rounded-full border border-mist bg-paper/90 px-3 py-1.5 text-slate shadow-sm backdrop-blur">
                        {String(index + 2).padStart(2, "0")} / 04
                      </span>
                      {logo ? (
                        <span className="absolute bottom-4 left-4 rounded-xl border border-mist bg-paper/95 px-4 py-2 shadow-sm backdrop-blur">
                          <Image
                            src={logo.src}
                            alt={logo.alt}
                            width={170}
                            height={42}
                            className="h-7 w-auto object-contain"
                          />
                        </span>
                      ) : null}
                    </div>
                  ) : null}

                  <div className="p-6 sm:p-7">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-signal">
                        <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
                        {build.role}
                      </span>
                      <span className="meta-mono text-dust">{build.period}</span>
                    </div>

                    <h3 className="font-display mt-5 text-2xl text-ink transition-colors group-hover:text-signal sm:text-3xl">
                      {build.name}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-ink">{build.hook}</p>
                    <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate">
                      {build.summary}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {build.stack.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full bg-fog px-3 py-1.5 text-xs text-slate"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 border-t border-mist pt-5">
                      <p className="meta-mono text-dust">KEY LESSON</p>
                      <p className="mt-3 flex gap-3 text-sm leading-6 text-slate">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-signal-soft text-signal">
                          <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
                        </span>
                        {build.learnings[0]}
                      </p>
                    </div>

                    <span className="mt-5 inline-flex items-center gap-2 font-semibold text-ink transition-colors group-hover:text-signal">
                      View case study
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {businessExperiment ? (
        <section className="py-14 sm:py-20">
          <Container>
            <div className="grid overflow-hidden rounded-[2rem] border border-mist bg-paper lg:grid-cols-12">
              <div className="relative flex min-h-[21rem] items-center justify-center overflow-hidden bg-signal-soft p-7 lg:col-span-5">
                <div
                  className="absolute -left-24 -top-24 h-72 w-72 rounded-full border-[3.5rem] border-paper/70"
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-28 -right-20 h-72 w-72 rounded-full border-[3.5rem] border-signal/10"
                  aria-hidden="true"
                />
                <div className="relative text-center">
                  <Image
                    src={BUILD_LOGOS["the-vibed-vines"].src}
                    alt={BUILD_LOGOS["the-vibed-vines"].alt}
                    width={150}
                    height={150}
                    className="mx-auto block h-32 w-32 rounded-full border border-paper object-contain shadow-sm"
                  />
                  <span className="meta-mono mt-4 block text-signal">
                    TWO ATTEMPTS · ONE QUESTION
                  </span>
                  <p className="font-display mt-4 text-4xl leading-none text-ink sm:text-5xl">
                    V1 → V2
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-paper bg-paper/70 p-3">
                      <p className="font-display text-2xl text-ink">5+</p>
                      <p className="meta-mono mt-1 text-dust">COLLECTIONS</p>
                    </div>
                    <div className="rounded-xl border border-paper bg-paper/70 p-3">
                      <p className="font-display text-2xl text-ink">100+</p>
                      <p className="meta-mono mt-1 text-dust">SKUs</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 lg:col-span-7">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <Eyebrow>Business experiment</Eyebrow>
                  <span className="meta-mono text-dust">04 / 04</span>
                </div>
                <h2 className="font-display mt-5 text-3xl text-ink sm:text-4xl">
                  {businessExperiment.name}
                </h2>
                <p className="mt-3 text-lg leading-relaxed text-ink">{businessExperiment.hook}</p>
                <p className="mt-4 line-clamp-5 text-sm leading-6 text-slate sm:text-base sm:leading-7">
                  {businessExperiment.summary}
                </p>

                <dl className="mt-6 grid grid-cols-2 gap-5 border-y border-mist py-5">
                  <div>
                    <dt className="meta-mono text-dust">ROLE</dt>
                    <dd className="mt-2 font-semibold text-ink">{businessExperiment.role}</dd>
                  </div>
                  <div>
                    <dt className="meta-mono text-dust">PERIOD</dt>
                    <dd className="mt-2 font-semibold text-ink">{businessExperiment.period}</dd>
                  </div>
                </dl>

                <div className="mt-5 flex flex-wrap gap-2">
                  {businessExperiment.stack.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full bg-fog px-3 py-1.5 text-xs text-slate"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="flex max-w-lg gap-3 text-sm leading-6 text-slate">
                    <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-signal" aria-hidden="true" />
                    {businessExperiment.learnings[0]}
                  </p>
                  <Link
                    href={`/builds/${businessExperiment.slug}`}
                    className="inline-flex shrink-0 items-center gap-2 font-semibold text-ink transition-colors hover:text-signal"
                  >
                    Read the story
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="pb-14 sm:pb-20">
        <Container>
          <div className="relative overflow-hidden items-center gap-8 rounded-[2rem] bg-ink px-7 py-10 text-paper sm:px-12 sm:py-14 lg:grid-cols-12 lg:px-14">
            <div
              className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border-[3.5rem] border-signal/30"
              aria-hidden="true"
            />
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 text-signal">
                <Rocket className="h-5 w-5" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-[0.08em]">Still building</span>
              </div>
              <p className="font-display mt-4 text-3xl leading-tight sm:text-4xl">
                These are milestones, not a finished catalogue.
              </p>
              <p className="mt-4 max-w-2xl text-paper/60">
                The Journey explains how each chapter connected. The Now page shows what is
                currently in motion.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <CTA href="/journey" className="!bg-paper !text-ink hover:!bg-signal-soft">
                Read the journey
              </CTA>
              <CTA
                href="/now"
                variant="secondary"
                className="!border-paper/25 !text-paper hover:!border-paper hover:!text-paper"
              >
                See what&rsquo;s now
              </CTA>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
