import Breadcrumbs from "@/components/shared/Breadcrumbs";
import type { Build } from "@/content/builds";

export default function BuildHero({ build }: { build: Build }) {
  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Builds", href: "/builds" },
          { label: build.name },
        ]}
      />
      <p className="eyebrow mt-6">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal mr-2 align-middle" />
        {build.classification} · <span className="meta-mono">{build.period}</span>
      </p>
      <h1 className="font-display mt-4 text-4xl sm:text-5xl text-ink">{build.name}</h1>
      <p className="mt-5 text-xl text-slate prose-measure">{build.hook}</p>

      <div className="mt-8 flex flex-wrap gap-2">
        {build.stack.map((s) => (
          <span
            key={s}
            className="meta-mono rounded-full border border-mist px-3 py-1 text-dust"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
