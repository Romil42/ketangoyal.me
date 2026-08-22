import { Code2, FlaskConical, Network, Store } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/typography/SectionHeading";

const THEMES = [
  {
    title: "Technology",
    description:
      "Production engineering, AI tooling, and how far one person can push both right now.",
    icon: Code2,
  },
  {
    title: "Businesses",
    description:
      "Consumer brands, e-commerce, and the fundamentals of how a business actually makes money.",
    icon: Store,
  },
  {
    title: "Systems",
    description:
      "The unglamorous parts — workflows, operations, and what it takes to run something reliably.",
    icon: Network,
  },
  {
    title: "Experiments",
    description: "Small, deliberate tests with a clear question and an honest answer.",
    icon: FlaskConical,
  },
];

export default function Exploring() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Right now" title="What I&rsquo;m exploring." />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {THEMES.map((theme, index) => {
            const Icon = theme.icon;
            return (
              <div
                key={theme.title}
                className="group rounded-2xl border border-mist bg-paper p-5 transition duration-300 hover:-translate-y-0.5 hover:border-signal/30 hover:bg-signal-soft/40"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-signal-soft text-signal transition-colors group-hover:bg-signal group-hover:text-paper">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="meta-mono text-dust">0{index + 1}</span>
                </div>
                <h3 className="font-display mt-6 text-xl text-ink">{theme.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate">{theme.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
