import Link from "next/link";
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextMarkComponentProps,
  type PortableTextTypeComponentProps,
} from "@portabletext/react";
import {ArrowUpRight, CircleCheck, Info, Lightbulb, TriangleAlert} from "lucide-react";
import SanityImage from "@/components/writing/SanityImage";
import {safeExternalHref, safeWritingHref} from "@/lib/safeUrl";
import type {POST_BY_SLUG_QUERY_RESULT} from "@/sanity/sanity.types";

type Article = NonNullable<POST_BY_SLUG_QUERY_RESULT>;
type ArticleBlock = Article["body"][number];
type BlockOf<Type extends ArticleBlock["_type"]> = Extract<ArticleBlock, {_type: Type}>;
type RichTextBlock = BlockOf<"block">;
type MarkDefinition = NonNullable<RichTextBlock["markDefs"]>[number];
type ExternalLinkMark = Extract<MarkDefinition, {_type: "externalLink"}>;
type InternalLinkMark = Extract<MarkDefinition, {_type: "internalLink"}>;
type CalloutParagraph = BlockOf<"callout">["body"][number];

function ExternalLinkMarkComponent({
  children,
  value,
}: PortableTextMarkComponentProps<ExternalLinkMark>) {
  const href = safeExternalHref(value?.href, {allowMailto: true});
  if (!href) return <>{children}</>;

  const openInNewTab = value?.openInNewTab !== false;

  return (
    <a
      href={href}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      className="font-medium text-signal underline decoration-signal/35 underline-offset-4 hover:decoration-signal"
    >
      {children}
    </a>
  );
}

function InternalLinkMarkComponent({
  children,
  value,
}: PortableTextMarkComponentProps<InternalLinkMark>) {
  const href = safeWritingHref(value?.slug);
  if (!href) return <>{children}</>;

  return (
    <Link
      href={href}
      className="font-medium text-signal underline decoration-signal/35 underline-offset-4 hover:decoration-signal"
    >
      {children}
    </Link>
  );
}

const sharedMarks = {
  strong: ({children}: {children: React.ReactNode}) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  em: ({children}: {children: React.ReactNode}) => <em>{children}</em>,
  code: ({children}: {children: React.ReactNode}) => (
    <code className="rounded-md border border-mist bg-fog px-1.5 py-0.5 font-mono text-[0.9em] text-ink">
      {children}
    </code>
  ),
  externalLink: ExternalLinkMarkComponent,
  internalLink: InternalLinkMarkComponent,
};

const calloutComponents: PortableTextComponents<CalloutParagraph> = {
  block: {
    normal: ({children}) => <p className="leading-7 text-slate">{children}</p>,
  },
  marks: sharedMarks,
};

const calloutStyles = {
  information: {
    icon: Info,
    label: "Information",
    className: "border-signal/30 bg-signal-soft/70",
  },
  takeaway: {
    icon: Lightbulb,
    label: "Takeaway",
    className: "border-mist bg-fog",
  },
  warning: {
    icon: TriangleAlert,
    label: "Watch for this",
    className: "border-ink/20 bg-paper",
  },
  success: {
    icon: CircleCheck,
    label: "What worked",
    className: "border-signal/30 bg-paper",
  },
} as const;

function InlineImageBlock({value}: PortableTextTypeComponentProps<BlockOf<"inlineImage">>) {
  if (!value.asset) return null;

  const dimensions = value.asset.metadata?.dimensions;
  const width = Math.min(dimensions?.width || 1400, 1600);
  const height = dimensions
    ? Math.max(1, Math.round(width / dimensions.aspectRatio))
    : Math.round(width * 0.625);

  return (
    <figure className="my-10 sm:my-12">
      <div className="overflow-hidden rounded-2xl border border-mist bg-fog">
        <SanityImage
          image={value}
          alt={value.alt}
          width={width}
          height={height}
          sizes="(min-width: 1024px) 48rem, 100vw"
          className="h-auto w-full object-cover"
        />
      </div>
      {value.caption ? (
        <figcaption className="mt-3 text-sm leading-6 text-dust">{value.caption}</figcaption>
      ) : null}
    </figure>
  );
}

function CalloutBlock({value}: PortableTextTypeComponentProps<BlockOf<"callout">>) {
  const style = calloutStyles[value.tone];
  const Icon = style.icon;

  return (
    <aside className={`my-8 rounded-2xl border p-6 ${style.className}`}>
      <div className="flex gap-4">
        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-paper text-signal">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-signal">
            {style.label}
          </p>
          {value.title ? (
            <p className="font-display mt-2 text-2xl leading-tight text-ink">{value.title}</p>
          ) : null}
          <div className={value.title ? "mt-3" : "mt-2"}>
            <PortableText value={value.body} components={calloutComponents} />
          </div>
        </div>
      </div>
    </aside>
  );
}

function CodeBlock({value}: PortableTextTypeComponentProps<BlockOf<"codeBlock">>) {
  return (
    <figure className="my-10 overflow-hidden rounded-2xl border border-graphite bg-graphite text-paper">
      <div className="flex items-center justify-between gap-4 border-b border-paper/10 px-5 py-3 text-xs text-paper/60">
        <span className="truncate font-mono">{value.filename || "Code example"}</span>
        <span className="shrink-0 uppercase tracking-[0.08em]">{value.language}</span>
      </div>
      <pre className="overflow-x-auto p-5 text-sm leading-6" tabIndex={0}>
        <code>{value.code}</code>
      </pre>
      {value.caption ? (
        <figcaption className="border-t border-paper/10 px-5 py-3 text-sm text-paper/60">
          {value.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function NumberedProcessBlock({
  value,
}: PortableTextTypeComponentProps<BlockOf<"numberedProcess">>) {
  const headingId = `process-${value._key}`;

  return (
    <section className="my-10 rounded-2xl border border-mist bg-fog p-6 sm:p-8" aria-labelledby={headingId}>
      <h2 id={headingId} className="font-display text-3xl leading-tight text-ink">
        {value.title}
      </h2>
      <ol className="mt-7 space-y-6">
        {value.steps.map((step, index) => (
          <li key={step._key} className="grid grid-cols-[2.5rem_1fr] gap-4">
            <span
              className="grid h-10 w-10 place-items-center rounded-xl bg-signal text-sm font-semibold text-paper"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 leading-7 text-slate">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ComparisonTableBlock({
  value,
}: PortableTextTypeComponentProps<BlockOf<"comparisonTable">>) {
  const headingId = `table-${value._key}`;

  return (
    <section className="my-10" aria-labelledby={value.title ? headingId : undefined}>
      {value.title ? (
        <h2 id={headingId} className="font-display mb-5 text-3xl leading-tight text-ink">
          {value.title}
        </h2>
      ) : null}
      <div className="overflow-x-auto rounded-2xl border border-mist" tabIndex={0}>
        <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
          <thead className="bg-ink text-paper">
            <tr>
              {value.columnHeaders.map((header, index) => (
                <th key={`${header}-${index}`} scope="col" className="px-5 py-4 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {value.rows.map((row) => (
              <tr key={row._key} className="border-t border-mist even:bg-fog/70">
                {value.columnHeaders.map((header, index) => (
                  <td key={`${row._key}-${header}-${index}`} className="px-5 py-4 align-top leading-6 text-slate">
                    {row.cells[index] || "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function KrafttCtaBlock({value}: PortableTextTypeComponentProps<BlockOf<"krafttCta">>) {
  const href = safeExternalHref(value.linkDestination);

  return (
    <aside className="my-10 rounded-2xl bg-ink p-7 text-paper sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-signal">Kraftt Digital</p>
      <p className="font-display mt-3 text-3xl leading-tight">{value.title}</p>
      <p className="mt-4 max-w-2xl leading-7 text-paper/65">{value.supportingText}</p>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-paper px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-signal-soft"
        >
          {value.linkLabel}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      ) : null}
    </aside>
  );
}

function RelatedResourceBlock({
  value,
}: PortableTextTypeComponentProps<BlockOf<"relatedResource">>) {
  const href = safeExternalHref(value.url);

  return (
    <aside className="my-8 rounded-2xl border border-mist bg-paper p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-signal">
        Related {value.resourceType}
      </p>
      <p className="font-display mt-2 text-2xl text-ink">{value.title}</p>
      <p className="mt-3 leading-7 text-slate">{value.description}</p>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 font-semibold text-ink hover:text-signal"
        >
          Open {value.resourceType}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      ) : null}
    </aside>
  );
}

const components: PortableTextComponents<ArticleBlock> = {
  block: {
    normal: ({children}) => <p className="my-5 text-[1.0625rem] leading-8 text-slate">{children}</p>,
    h2: ({children}) => (
      <h2 className="font-display mb-4 mt-12 scroll-mt-28 text-4xl leading-tight text-ink">{children}</h2>
    ),
    h3: ({children}) => (
      <h3 className="font-display mb-3 mt-9 scroll-mt-28 text-3xl leading-tight text-ink">{children}</h3>
    ),
    h4: ({children}) => (
      <h4 className="mb-3 mt-8 scroll-mt-28 text-xl font-semibold leading-tight text-ink">{children}</h4>
    ),
    blockquote: ({children}) => (
      <blockquote className="font-display my-10 border-l-4 border-signal pl-6 text-2xl leading-relaxed text-ink sm:text-3xl">
        {children}
      </blockquote>
    ),
  },
  marks: sharedMarks,
  list: {
    bullet: ({children}) => <ul className="my-6 space-y-3 pl-6 text-slate marker:text-signal">{children}</ul>,
    number: ({children}) => <ol className="my-6 list-decimal space-y-3 pl-6 text-slate marker:font-semibold marker:text-signal">{children}</ol>,
  },
  listItem: {
    bullet: ({children}) => <li className="list-disc pl-2 leading-7">{children}</li>,
    number: ({children}) => <li className="pl-2 leading-7">{children}</li>,
  },
  types: {
    inlineImage: InlineImageBlock,
    callout: CalloutBlock,
    codeBlock: CodeBlock,
    numberedProcess: NumberedProcessBlock,
    comparisonTable: ComparisonTableBlock,
    krafttCta: KrafttCtaBlock,
    relatedResource: RelatedResourceBlock,
  },
};

export default function PortableTextRenderer({value}: {value: Article["body"]}) {
  return <PortableText value={value} components={components} />;
}
