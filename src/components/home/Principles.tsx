import Container from "@/components/layout/Container";

const PRINCIPLES = [
  "Publish the pause, not just the launch.",
  "A shipped thing beats a described one.",
  "Specific numbers beat confident adjectives.",
  "Understand a system by breaking it, then fixing it.",
  "Revisit old work instead of only starting new work.",
];

export default function Principles() {
  return (
    <section className="py-20 sm:py-28 bg-graphite text-paper">
      <Container>
        <p className="eyebrow text-dust">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal mr-2 align-middle" />
          How I work
        </p>
        <h2 className="font-display mt-6 text-3xl sm:text-4xl">Principles.</h2>

        <ol className="mt-12 divide-y divide-white/10">
          {PRINCIPLES.map((p, i) => (
            <li key={p} className="flex items-start gap-6 py-5">
              <span className="meta-mono text-signal shrink-0 pt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-lg sm:text-xl">{p}</span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
