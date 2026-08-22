export default function SectionHeading({
  eyebrow,
  title,
  subtext,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtext?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow ? (
        <p className="eyebrow mb-4 inline-flex items-center gap-2 justify-center">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-4xl sm:text-5xl text-ink">{title}</h2>
      {subtext ? (
        <p
          className={`mt-4 text-lg text-slate prose-measure ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtext}
        </p>
      ) : null}
    </div>
  );
}
