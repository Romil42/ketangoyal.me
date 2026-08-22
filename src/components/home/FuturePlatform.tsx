import Container from "@/components/layout/Container";
import CTA from "@/components/shared/CTA";

export default function FuturePlatform() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-signal/15 bg-signal-soft px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
          <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full border-[3.5rem] border-paper/70" aria-hidden="true" />
          <div className="relative grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="eyebrow text-signal">An evolving record</p>
              <h2 className="font-display mt-4 max-w-2xl text-3xl leading-tight text-ink sm:text-4xl">
                Building a useful corner of the internet.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate sm:text-lg">
                This site will keep growing alongside whatever I&rsquo;m building next—more of
                the journey, more of what&rsquo;s working, and an honest record of what isn&rsquo;t.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <CTA href="/about">About Ketan</CTA>
              <CTA href="/contact" variant="secondary">
                Get in touch
              </CTA>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
