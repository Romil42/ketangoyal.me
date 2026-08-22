import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/layout/Container";
import Eyebrow from "@/components/typography/Eyebrow";
import CTA from "@/components/shared/CTA";
import SocialLinks from "@/components/shared/SocialLinks";
import BuildModel from "@/components/home/BuildModel";
import { KineticFabric } from "@/components/ui/kinetic-particle-fabric";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden border-b border-mist bg-paper">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <KineticFabric className="absolute inset-0" showControls={false} />
      </div>

      <Container className="relative z-20 grid grid-cols-1 items-center gap-10 pt-16 pb-24 sm:pt-20 sm:pb-28 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <Link
            href="/now"
            className="group mb-5 inline-flex items-center gap-2 rounded-full border border-mist bg-paper/80 px-3 py-1.5 text-xs font-semibold text-slate shadow-sm backdrop-blur transition-colors hover:border-signal/30 hover:text-signal"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-30" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
            Building Kraftt Digital now
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <Eyebrow>Technology. Businesses. Systems. Experiments.</Eyebrow>
          <h1 className="font-display mt-6 text-5xl sm:text-6xl lg:text-7xl text-ink leading-[1.05]">
            I learn by <span className="text-signal">building.</span>
          </h1>
          <p className="mt-6 text-lg text-slate prose-measure">
            Most of what&rsquo;s on this site started as something I didn&rsquo;t know how to
            do yet — YouTube, NFTs, PHP, a clothing brand, wholesale markets, AI tooling, and
            now Kraftt Digital. This is the record of that, kept as it happens.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CTA href="/journey">Read the journey</CTA>
            <CTA href="/builds" variant="secondary">
              See what I&rsquo;ve built
            </CTA>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-mist pt-5">
            <SocialLinks />
            <p className="meta-mono text-dust">2020 → STILL BUILDING</p>
          </div>
        </div>

        <div className="md:col-span-5">
          <BuildModel />
        </div>
      </Container>
    </section>
  );
}
