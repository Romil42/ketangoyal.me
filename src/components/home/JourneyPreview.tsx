import Container from "@/components/layout/Container";
import SectionHeading from "@/components/typography/SectionHeading";
import CTA from "@/components/shared/CTA";
import { journeyEras } from "@/content/journey";

export default function JourneyPreview() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="2020 → Now"
          title="Nine eras, one pattern."
          subtext="Curiosity, learning, building, testing, sometimes failing or pausing, understanding, and building again."
        />

        <div className="mt-10 overflow-x-auto pb-2">
          <ol className="flex min-w-max gap-3">
            {journeyEras.map((era) => (
              <li
                key={era.id}
                className="group relative w-56 shrink-0 overflow-hidden rounded-2xl border border-mist bg-paper p-5 transition duration-300 hover:-translate-y-0.5 hover:border-signal/30 hover:shadow-[0_14px_35px_rgba(20,22,27,0.06)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-signal-soft font-mono text-xs text-signal transition-colors group-hover:bg-signal group-hover:text-paper">
                    {era.number}
                  </span>
                  <span className="meta-mono text-dust">{era.period}</span>
                </div>
                <h3 className="font-display mt-6 text-xl text-ink">{era.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate">{era.summary.slice(0, 92)}…</p>
                <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-signal transition-transform duration-300 group-hover:scale-x-100" aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8">
          <CTA href="/journey" variant="secondary">
            Read the full journey
          </CTA>
        </div>
      </Container>
    </section>
  );
}
