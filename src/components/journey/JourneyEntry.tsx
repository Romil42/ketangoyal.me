import type { JourneyEra } from "@/content/journey";
import {
  Activity,
  BarChart3,
  Check,
  Code2,
  Compass,
  Cpu,
  Package,
  Rocket,
  ShoppingBag,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const STATUS_LABEL: Record<NonNullable<JourneyEra["status"]>, string> = {
  shipped: "Shipped",
  paused: "Paused",
  "in-progress": "In progress",
  ongoing: "Ongoing",
};

const STATUS_STYLE: Record<NonNullable<JourneyEra["status"]>, string> = {
  shipped: "border-signal/20 bg-signal-soft text-signal",
  paused: "border-mist bg-fog text-slate",
  "in-progress": "border-ink bg-ink text-paper",
  ongoing: "border-signal/20 bg-paper text-signal",
};

const ERA_ICONS: Record<string, LucideIcon> = {
  curiosity: Compass,
  "learning-to-build": Code2,
  "first-business-experiment": Package,
  "becoming-an-engineer": Cpu,
  "trying-entrepreneurship-properly": ShoppingBag,
  "studying-business": BarChart3,
  "experimenting-with-ai": Sparkles,
  "building-kraftt": Rocket,
  now: Activity,
};

export default function JourneyEntry({ era }: { era: JourneyEra }) {
  const Icon = ERA_ICONS[era.id] ?? Compass;

  return (
    <article className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 pb-8 last:pb-0 lg:grid-cols-[8.5rem_4rem_minmax(0,1fr)] lg:gap-0 lg:pb-10">
      <div className="hidden pr-6 pt-5 text-right lg:block lg:col-start-1 lg:row-start-1">
        <span className="meta-mono block text-signal">CHAPTER {era.number}</span>
        <span className="meta-mono mt-2 block leading-relaxed text-dust">{era.period}</span>
      </div>

      <div className="relative z-10 col-start-1 row-start-1 flex justify-center pt-3 lg:col-start-2">
        <span className="grid h-10 w-10 place-items-center rounded-xl border border-mist bg-paper text-signal shadow-[0_6px_18px_rgba(20,22,27,0.08)] ring-4 ring-fog transition duration-300 group-hover:border-signal">
          <Icon className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.8} aria-hidden="true" />
        </span>
      </div>

      <div className="group col-start-2 row-start-1 rounded-2xl border border-mist bg-paper p-5 transition duration-300 hover:-translate-y-0.5 hover:border-signal/25 hover:shadow-[0_16px_42px_rgba(20,22,27,0.07)] sm:p-6 lg:col-start-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="meta-mono text-dust lg:hidden">
            {era.number} · {era.period}
          </span>
          {era.status ? (
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] ${STATUS_STYLE[era.status]}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
              {STATUS_LABEL[era.status]}
            </span>
          ) : null}
        </div>

        <h2 className="font-display mt-4 text-2xl leading-tight text-ink sm:text-3xl">
          {era.title}
        </h2>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate sm:text-base sm:leading-7">
          {era.summary}
        </p>

        {era.highlights.length ? (
          <div className="mt-5 border-t border-mist pt-4">
            <p className="meta-mono text-dust">KEY POINTS</p>
            <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {era.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-2.5 text-sm leading-5 text-slate"
                >
                  <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-signal-soft text-signal">
                    <Check className="h-2.5 w-2.5" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
}
