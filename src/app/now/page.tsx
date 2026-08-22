import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import Eyebrow from "@/components/typography/Eyebrow";
import CTA from "@/components/shared/CTA";
import KrafttVisionModel from "@/components/now/KrafttVisionModel";
import { nowItems, nowLastUpdated } from "@/content/now";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Now — Building Kraftt Digital",
  description:
    "What Ketan Goyal is focused on now: building Kraftt Digital, exploring practical AI automation, digital systems, and technology for smaller businesses.",
  path: "/now",
  keywords: [
    "Ketan Goyal now",
    "building Kraftt Digital",
    "AI automation India",
    "small business digital transformation",
    "business systems India",
    "founder building in public",
  ],
  image: "/images/kraftt/kraftt-vision.png",
});

export default function NowPage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-mist bg-paper">
        <div
          className="pointer-events-none absolute -left-40 top-24 h-80 w-80 rounded-full bg-signal-soft blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative py-14 sm:py-20">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <Eyebrow>Now</Eyebrow>
              <h1 className="font-display mt-6 text-5xl leading-[1.03] text-ink sm:text-6xl">
                What I&rsquo;m focused on now.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate sm:text-xl">
                A live snapshot of the work, questions, and experiments currently taking up
                most of my attention.
              </p>
              <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-mist bg-fog px-4 py-2.5">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-40" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal" />
                </span>
                <span className="meta-mono text-slate">UPDATED {nowLastUpdated.toUpperCase()}</span>
              </div>
            </div>

            <div className="lg:col-span-7">
              <KrafttVisionModel />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-mist bg-fog py-20 sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>Active threads</Eyebrow>
              <h2 className="font-display mt-5 max-w-2xl text-4xl leading-tight text-ink sm:text-5xl">
                Four things I&rsquo;m actively working through.
              </h2>
            </div>
            <p className="meta-mono text-dust">NOT A ROADMAP · A CURRENT VIEW</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {nowItems.map((item, index) => (
              <article
                key={item.id}
                className="group relative overflow-hidden rounded-[1.75rem] border border-mist bg-paper p-7 transition duration-300 hover:-translate-y-1 hover:border-signal/30 hover:shadow-[0_18px_50px_rgba(20,22,27,0.08)] sm:p-9"
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="meta-mono text-signal">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-signal-soft px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-signal">
                    <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                    In progress
                  </span>
                </div>
                <h3 className="font-display mt-10 max-w-md text-2xl leading-tight text-ink sm:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-slate sm:text-lg">
                  {item.description}
                </p>
                <div
                  className="mt-9 h-px w-12 bg-mist transition-all duration-300 group-hover:w-24 group-hover:bg-signal"
                  aria-hidden="true"
                />
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="relative overflow-hidden items-center gap-8 rounded-[2rem] bg-ink px-7 py-10 text-paper sm:px-12 sm:py-14 lg:grid-cols-12 lg:px-14">
            <div
              className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border-[3.5rem] border-signal/30"
              aria-hidden="true"
            />
            <div className="lg:col-span-8">
              <p className="font-display text-3xl leading-tight sm:text-4xl">
                Building in public, without pretending everything is finished.
              </p>
              <p className="mt-4 max-w-2xl text-paper/65">
                The Journey holds the longer record—what changed, what worked, and what I
                learned when it didn&rsquo;t.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <CTA href="/journey" className="!bg-paper !text-ink hover:!bg-signal-soft">
                Read the journey
              </CTA>
              <CTA
                href="/contact"
                variant="secondary"
                className="border-paper/25 text-paper hover:border-paper hover:text-paper"
              >
                Get in touch
              </CTA>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
