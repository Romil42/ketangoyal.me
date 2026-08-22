import { BookOpen, Hammer, RefreshCcw, Search } from "lucide-react";
import Container from "@/components/layout/Container";

const BUILDING_LOOP = [
  {
    title: "Question",
    description: "Start with something I genuinely want to understand.",
    icon: Search,
  },
  {
    title: "Learn",
    description: "Pick up the tools, context, and fundamentals the work demands.",
    icon: BookOpen,
  },
  {
    title: "Build",
    description: "Turn the idea into something real enough to be tested.",
    icon: Hammer,
  },
  {
    title: "Revisit",
    description: "Keep the lesson, adjust the direction, and build again.",
    icon: RefreshCcw,
  },
];

export default function Introduction() {
  return (
    <section className="bg-fog py-16 sm:py-24">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <p className="eyebrow inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
              The pattern
            </p>
            <h2 className="font-display mt-5 text-3xl leading-tight text-ink sm:text-4xl">
              I didn&rsquo;t start with a master plan.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-7 text-slate sm:text-lg">
              <p>
                In 2020 I was making YouTube videos and figuring out NFTs. None of it was a
                strategy—it was curiosity, followed by whatever I had to learn to actually do
                the thing.
              </p>
              <p>
                Some of what follows shipped and is still running. Some of it I paused on
                purpose. Both are here, because both are the actual story.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-6">
            {BUILDING_LOOP.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="rounded-2xl border border-mist bg-paper p-5 shadow-[0_10px_30px_rgba(20,22,27,0.035)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-signal-soft text-signal">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="meta-mono text-dust">0{index + 1}</span>
                  </div>
                  <h3 className="font-display mt-5 text-xl text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
