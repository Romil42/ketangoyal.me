import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Eyebrow from "@/components/typography/Eyebrow";
import JourneyEntry from "@/components/journey/JourneyEntry";
import JourneyTimeline from "@/components/journey/JourneyTimeline";
import CTA from "@/components/shared/CTA";
import { JourneyJsonLd } from "@/components/shared/StructuredData";
import { journeyEras } from "@/content/journey";
import { builds } from "@/content/builds";
import { createPageMetadata } from "@/lib/seo";
import { CalendarDays, ListOrdered, RefreshCw } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Software Engineering & Founder Journey",
  description:
    "Nine eras, one pattern: curiosity, learning, building, testing, sometimes failing or pausing, understanding, and building again.",
  path: "/journey",
  keywords: [
    "software engineer journey",
    "developer career journey India",
    "founder journey India",
    "learning by building",
    "building in public India",
    "ShopClues software engineer journey",
    "Kraftt Digital founder story",
  ],
  image: "/images/ketan/ketan-goyal-journey.png",
});

const smartstore = builds.find((b) => b.id === "smartstore")!;

export default function JourneyPage() {
  return (
    <main>
      <JourneyJsonLd eras={journeyEras} />
      <section className="relative overflow-hidden border-b border-mist bg-paper text-ink">
        <div
          className="pointer-events-none absolute -right-32 -top-44 h-[32rem] w-[32rem] rounded-full border-[6rem] border-signal-soft"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-52 left-[35%] h-80 w-80 rounded-full bg-signal-soft blur-3xl"
          aria-hidden="true"
        />

        <Container className="relative py-16 sm:py-24">
          <div className="grid items-end gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <p className="inline-flex items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-slate">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                2020 → Now
              </p>
              <h1 className="font-display mt-6 max-w-4xl text-6xl leading-[0.98] text-ink sm:text-7xl lg:text-8xl">
                The journey.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-slate sm:text-xl">
                Nine eras, one pattern: curiosity, learning, building, testing against
                reality, sometimes pausing, understanding why, and building again.
              </p>
            </div>

            <dl className="grid gap-3 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1">
              <div className="flex items-center gap-4 rounded-2xl border border-mist bg-fog/80 p-4 backdrop-blur">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-signal-soft text-signal">
                  <ListOrdered className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <dt className="meta-mono text-dust">CHAPTERS</dt>
                  <dd className="font-display mt-0.5 text-2xl text-ink">09</dd>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-mist bg-fog/80 p-4 backdrop-blur">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-signal-soft text-signal">
                  <CalendarDays className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <dt className="meta-mono text-dust">TIMESPAN</dt>
                  <dd className="font-display mt-0.5 text-2xl text-ink">6+ years</dd>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-mist bg-fog/80 p-4 backdrop-blur">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-signal text-paper">
                  <RefreshCw className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <dt className="meta-mono text-dust">PATTERN</dt>
                  <dd className="font-display mt-0.5 text-2xl text-ink">Build again</dd>
                </div>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      <section className="border-b border-mist bg-paper py-16 sm:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <Eyebrow>The pattern</Eyebrow>
              <h2 className="font-display mt-5 text-4xl leading-tight text-ink sm:text-5xl">
                No master plan. A visible progression.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate">
                Every chapter added a new layer—content, engineering, commerce, business,
                and now Kraftt Digital.
              </p>
            </div>
            <figure className="lg:col-span-8">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[1.75rem] border border-mist bg-fog p-2 shadow-[0_20px_60px_rgba(20,22,27,0.08)] sm:p-4">
                <Image
                  src="/images/ketan/ketan-goyal-journey.png"
                  alt="Journey roadmap showing ten stages from internet experiments to the current focus"
                  fill
                  sizes="(min-width: 1024px) 64vw, 100vw"
                  className="object-contain p-2 sm:p-4"
                />
              </div>
              <figcaption className="meta-mono mt-3 text-dust">
                THE PROGRESSION SO FAR · STILL IN PROGRESS
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      <section className="border-b border-mist bg-fog py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 grid gap-4 lg:grid-cols-[8.5rem_1fr] lg:items-end">
              <p className="meta-mono text-signal">THE FULL RECORD</p>
              <div>
                <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                  Nine chapters, in order.
                </h2>
                <p className="mt-3 max-w-2xl text-base text-slate">
                  The shipped work, the paused experiments, and the lessons each one left
                  behind.
                </p>
              </div>
            </div>

            <JourneyTimeline>
              {journeyEras.map((era) => (
                <JourneyEntry key={era.id} era={era} />
              ))}
            </JourneyTimeline>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow>Production proof</Eyebrow>
              <h2 className="font-display mt-5 text-4xl leading-tight text-ink sm:text-5xl">
                A closer look at SmartStore.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate">{smartstore.summary}</p>
              <div className="mt-7">
                <CTA href="/builds/smartstore" variant="secondary">
                  See the full SmartStore gallery
                </CTA>
              </div>
            </div>

            <div className="relative min-h-[24rem] lg:col-span-7">
              {smartstore.screenshots?.slice(0, 2).map((image, index) => (
                <div
                  key={image.src}
                  className={`absolute aspect-[16/10] w-[86%] overflow-hidden rounded-2xl border border-mist bg-fog shadow-[0_22px_60px_rgba(20,22,27,0.12)] ${
                    index === 0 ? "left-0 top-0 -rotate-2" : "bottom-0 right-0 rotate-2"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 86vw"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink px-7 py-12 text-center text-paper sm:px-12 sm:py-16">
            <div
              className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border-[3.5rem] border-signal/30"
              aria-hidden="true"
            />
            <div className="relative">
              <p className="font-display text-4xl text-paper sm:text-5xl">
                The story is still in progress.
              </p>
              <p className="mx-auto mt-4 max-w-xl text-paper/60">
                The Now page holds the current chapter. The Builds page holds the evidence.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <CTA href="/now" className="!bg-paper !text-ink hover:!bg-signal-soft">
                  See what I&rsquo;m focused on now
                </CTA>
                <CTA
                  href="/builds"
                  variant="secondary"
                  className="border-paper/25 text-paper hover:border-paper hover:text-paper"
                >
                  Browse builds
                </CTA>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
