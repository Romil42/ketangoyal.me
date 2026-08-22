import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Eyebrow from "@/components/typography/Eyebrow";
import CTA from "@/components/shared/CTA";
import { PersonProfileJsonLd } from "@/components/shared/StructuredData";
import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Ketan Goyal — Software Engineer & Founder",
  description:
    "How Ketan Goyal went from YouTube and NFTs in 2020 to production engineering, business experiments, and founding Kraftt Digital.",
  path: "/about",
  keywords: [
    "Ketan Goyal",
    "Ketan Goyal software engineer",
    "Kraftt Digital founder",
    "ShopClues software engineer",
    "B.Tech CSE 2024",
    "software engineer India",
    "founder journey India",
  ],
  image: siteConfig.profileImage,
});

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "Where this starts",
    body: [
      `I'm ${siteConfig.name}. I don't have a founder origin story where everything led somewhere on purpose — it's messier than that, and I'd rather keep it that way than polish it into one.`,
    ],
  },
  {
    heading: "Curiosity before strategy",
    body: [
      "In 2020 I was running YouTube channels with no idea how copyright actually worked — I found out through a few strikes. Around the same time I got into crypto and NFTs, studied the space, and listed my own on OpenSea. None of it was a business. It was curiosity, followed by whatever I had to learn to actually do the thing.",
    ],
  },
  {
    heading: "Learning to build",
    body: [
      "I completed my B.Tech in Computer Science and Engineering in 2024. I joined ShopClues in March that year knowing HTML, CSS, Bootstrap, and a little JavaScript — no real data structures and algorithms, no system design, limited backend experience. The work was in PHP, so I learned PHP to ship it. When Qoo10-related work called for Next.js and TypeScript, I picked those up too.",
    ],
  },
  {
    heading: "A pause, on purpose",
    body: [
      "When my situation shifted to working from home, I used the extra time on something unrelated: clothing dropshipping. The Vibed Vines V1 was Placeit mockups, a ChatGPT-generated logo, an Instagram page, and real research into how dropshipping works. When circumstances changed again, I paused it. That's part of the story, not a footnote I'd rather skip.",
    ],
  },
  {
    heading: "Becoming an engineer",
    body: [
      "Back at ShopClues from March 2025, my work as a Software Engineer stopped being about learning technologies and started being about running production systems — bug fixes, load-time issues, layout problems, GTM implementation, backend behavior, SQL against live data. I also worked on SmartStore during this period and built Aegis Squad on the side, before leaving in September 2025.",
    ],
  },
  {
    heading: "Trying entrepreneurship, properly",
    body: [
      "After leaving ShopClues, I went back to The Vibed Vines instead of starting fresh. V2 was a different scale — five-plus collections, 100+ SKUs, a real Shopify storefront, an Instagram content system, product mockups, reels. The point was never a fashion empire. It was understanding what it actually takes to run a consumer brand end to end. I paused it a second time when time ran out, and I'm fine putting that on the record too.",
    ],
  },
  {
    heading: "Studying business itself",
    body: [
      "My curiosity moved from startups to business fundamentals: import/export, FMCG, oil extraction, spice manufacturing, sourcing from China, wholesale markets, corporate structures. I physically visited wholesale markets around Delhi looking for opportunities — trying to understand how money actually moves through a business, from sourcing to margins to distribution.",
    ],
  },
  {
    heading: "Experiments with AI",
    body: [
      "Not an expert claim — experiments. I built an automated YouTube pipeline using Claude for scripting, Google AI Studio for voice, Pexels for media, and Suno for music, plus a finance-typography page as another test. That expanded into GPT, Claude, Gemini, Sora, Runway, Higgsfield, Lovable, Replit, and Emergent — mostly to see how far one person can get with the current generation of tools.",
    ],
  },
  {
    heading: "Why Kraftt exists",
    body: [
      "By the time I started Kraftt Digital, I'd seen engineering, e-commerce, consumer brands, content, AI tooling, and traditional business — including wholesale markets and manufacturing — up close. One pattern kept showing up: technology is moving fast, but a lot of smaller businesses, especially outside major metros, aren't really part of that shift. Kraftt exists to close that gap.",
    ],
  },
  {
    heading: "Current philosophy",
    body: [
      "If you wake up with a crazy idea—an innovation that excites you—don’t just keep it in your head. Go and turn it into reality. Test it.",
      "If it succeeds, you may have created something valuable. If it fails, you still win because you were one of the few people who actually tried.",
      "Most people never act on their ideas. And many people never even allow themselves to think differently.",
      "So build it. Test it. Learn from it. Fail if you have to. But don’t let a potentially great idea die inside your head.",
    ],
  },
];

export default function AboutPage() {
  const opening = SECTIONS[0];
  const story = SECTIONS.slice(1, -1);
  const philosophy = SECTIONS.at(-1)!;

  return (
    <>
      <PersonProfileJsonLd />
      <section className="relative overflow-hidden border-b border-mist bg-fog">
        <div
          className="pointer-events-none absolute -top-32 right-[-8rem] h-80 w-80 rounded-full bg-signal-soft sm:h-[30rem] sm:w-[30rem]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-[-12rem] left-[-10rem] h-72 w-72 rounded-full border-[4rem] border-paper"
          aria-hidden="true"
        />

        <Container className="relative py-14 sm:py-20">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow>About Ketan</Eyebrow>
              <h1 className="font-display mt-6 max-w-3xl text-5xl leading-[1.02] text-ink sm:text-6xl lg:text-7xl">
                I learn things by doing them badly first.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate sm:text-xl">
                A software engineer and founder following curiosity through code, commerce,
                content, and whatever comes next.
              </p>

              <dl className="mt-10 grid max-w-2xl grid-cols-3 border-y border-mist">
                <div className="py-5 pr-3">
                  <dt className="meta-mono text-dust">STARTED</dt>
                  <dd className="font-display mt-1 text-2xl text-ink sm:text-3xl">2020</dd>
                </div>
                <div className="border-x border-mist px-4 py-5 sm:px-6">
                  <dt className="meta-mono text-dust">DEGREE</dt>
                  <dd className="font-display mt-1 text-2xl text-ink sm:text-3xl">CSE &rsquo;24</dd>
                </div>
                <div className="py-5 pl-4 sm:pl-6">
                  <dt className="meta-mono text-dust">CURRENTLY</dt>
                  <dd className="font-display mt-1 text-2xl text-ink sm:text-3xl">Building</dd>
                </div>
              </dl>
            </div>

            <figure className="relative mx-auto w-full max-w-md lg:col-span-5">
              <div
                className="absolute -inset-3 translate-x-5 translate-y-5 rounded-[2rem] border border-signal/20 bg-signal-soft"
                aria-hidden="true"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-mist bg-paper shadow-[0_24px_70px_rgba(20,22,27,0.12)]">
                <Image
                  src="/images/ketan/ketan-goyal-formal-candid.JPG"
                  alt="Ketan Goyal, formal candid portrait"
                  fill
                  priority
                  sizes="(min-width: 1024px) 38vw, (min-width: 768px) 60vw, 90vw"
                  className="object-cover"
                  style={{ objectPosition: "54% 50%" }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/35 to-transparent px-6 pb-6 pt-24 text-paper">
                  <p className="font-display text-2xl">Ketan Goyal</p>
                  <p className="meta-mono mt-1 text-paper/75">ENGINEER · FOUNDER · BUILDER</p>
                </div>
              </div>
              <div className="absolute -left-4 top-8 rounded-full border border-mist bg-paper px-4 py-2 shadow-sm sm:-left-8">
                <span className="meta-mono text-signal">CURIOUS, ALWAYS.</span>
              </div>
            </figure>
          </div>
        </Container>
      </section>

      <main>
        <section className="py-20 sm:py-28">
          <Container>
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-3">
                <Eyebrow>{opening.heading}</Eyebrow>
              </div>
              <div className="lg:col-span-8 lg:col-start-5">
                <p className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                  {opening.body[0]}
                </p>
                <div className="mt-9 flex items-center gap-4" aria-hidden="true">
                  <span className="h-px w-16 bg-signal" />
                  <span className="h-2 w-2 rounded-full bg-signal" />
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-y border-mist bg-fog py-20 sm:py-28">
          <Container>
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <Eyebrow>The story so far</Eyebrow>
                  <h2 className="font-display mt-5 text-4xl leading-tight text-ink sm:text-5xl">
                    Curiosity became a way of working.
                  </h2>
                  <p className="mt-5 max-w-sm text-lg leading-relaxed text-slate">
                    Each chapter started with a question, became something tangible, and left
                    behind a better understanding of how things work in the real world.
                  </p>
                </div>
              </aside>

              <div className="relative lg:col-span-7 lg:col-start-6">
                <div
                  className="absolute bottom-6 left-5 top-5 w-px bg-mist"
                  aria-hidden="true"
                />
                <div className="space-y-12 sm:space-y-16">
                  {story.map((section, index) => (
                    <article
                      key={section.heading}
                      className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-5 sm:gap-7"
                    >
                      <span className="meta-mono relative z-10 grid h-10 w-10 place-items-center rounded-full border border-mist bg-paper text-signal shadow-sm">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="border-b border-mist pb-12 sm:pb-16">
                        <h3 className="font-display text-2xl leading-tight text-ink sm:text-3xl">
                          {section.heading}
                        </h3>
                        <div className="mt-4 space-y-4 text-base leading-relaxed text-slate sm:text-lg">
                          {section.body.map((paragraph, paragraphIndex) => (
                            <p key={paragraphIndex}>{paragraph}</p>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-20 sm:py-28">
          <Container>
            <div className="relative overflow-hidden rounded-[2rem] bg-ink px-7 py-12 text-paper sm:px-12 sm:py-16 lg:px-16 lg:py-20">
              <div
                className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full border-[4rem] border-signal/30"
                aria-hidden="true"
              />
              <div className="relative max-w-5xl">
                <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-paper/60">
                  {philosophy.heading}
                </p>
                <blockquote className="relative mt-7 space-y-4 border-l-2 border-signal pl-6 sm:pl-8">
                  <span
                    className="font-display absolute -left-1 -top-7 text-5xl leading-none text-signal"
                    aria-hidden="true"
                  >
                    &ldquo;
                  </span>
                  {philosophy.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="font-display text-xl leading-relaxed text-paper sm:text-2xl"
                    >
                      {paragraph}
                    </p>
                  ))}
                </blockquote>
              </div>
            </div>

            <div className="mt-10 flex flex-col justify-between gap-6 border-t border-mist pt-10 sm:flex-row sm:items-center">
              <div>
                <p className="font-display text-2xl text-ink">Continue exploring</p>
                <p className="mt-2 text-slate">The longer version is still being written.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <CTA href="/journey">Read the full journey</CTA>
                <CTA href="/builds" variant="secondary">
                  See what I&rsquo;ve built
                </CTA>
                <CTA href="/contact" variant="secondary">
                  Get in touch
                </CTA>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
