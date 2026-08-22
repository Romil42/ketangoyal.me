import Image from "next/image";

export default function JourneyMedia({
  src,
  alt,
  caption,
  fit = "cover",
}: {
  src: string;
  alt: string;
  caption?: string;
  fit?: "cover" | "contain";
}) {
  return (
    <figure className="my-16 sm:my-20 -mx-6 sm:mx-0">
      <div className="relative aspect-[16/10] w-full overflow-hidden sm:rounded-2xl bg-fog border-y sm:border border-mist">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className={fit === "contain" ? "object-contain" : "object-cover"}
        />
      </div>
      {caption ? (
        <figcaption className="meta-mono mt-3 px-6 sm:px-0 text-dust">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
