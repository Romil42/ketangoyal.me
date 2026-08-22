import CTA from "@/components/shared/CTA";
import type {POST_BY_SLUG_QUERY_RESULT} from "@/sanity/sanity.types";

type CtaType = NonNullable<POST_BY_SLUG_QUERY_RESULT>["krafttCtaType"];
type ActiveCtaType = Exclude<CtaType, "none">;

const ctaContent: Record<
  ActiveCtaType,
  {title: string; text: string; label: string; href: string}
> = {
  explore: {
    title: "Turn the useful part into something real.",
    text: "Kraftt Digital helps smaller businesses adopt practical websites, digital systems, and automation.",
    label: "Explore Kraftt Digital",
    href: "https://krafttdigital.in",
  },
  project: {
    title: "Have a project worth testing?",
    text: "Share the problem, the current constraints, and what a useful first version would need to prove.",
    label: "Start a conversation",
    href: "/contact",
  },
  website: {
    title: "A website should do more than exist.",
    text: "Kraftt Digital builds clear, practical digital systems around the way a business actually works.",
    label: "See Kraftt Digital",
    href: "https://krafttdigital.in",
  },
  automation: {
    title: "Start with one useful automation.",
    text: "Kraftt Digital helps teams test practical AI and automation without turning the business into an experiment.",
    label: "Discuss an automation",
    href: "/contact",
  },
};

export default function KrafttClosingCta({type}: {type: CtaType}) {
  if (type === "none") return null;

  const content = ctaContent[type];
  const external = content.href.startsWith("http");

  return (
    <aside className="relative overflow-hidden rounded-[2rem] bg-ink px-7 py-10 text-paper sm:px-10 sm:py-12">
      <div
        className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border-[3.5rem] border-signal/30"
        aria-hidden="true"
      />
      <div className="relative max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-signal">Kraftt Digital</p>
        <h2 className="font-display mt-4 text-3xl leading-tight sm:text-4xl">{content.title}</h2>
        <p className="mt-4 max-w-xl leading-7 text-paper/65">{content.text}</p>
        <div className="mt-7">
          <CTA href={content.href} external={external} className="!bg-paper !text-ink hover:!bg-signal-soft">
            {content.label}
          </CTA>
        </div>
      </div>
    </aside>
  );
}
