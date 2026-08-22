import type { BuildScreenshot } from "@/content/builds";
import { CoverflowCarousel, type CoverflowSlide } from "@/components/ui/coverflow-carousel";

function titleFromSource(source: string) {
  const filename = decodeURIComponent(source.split("/").at(-1) ?? "Product screen")
    .replace(/\.[^.]+$/, "")
    .replace(/shopclues[-_ ]*/gi, "")
    .replace(/samrtstore|smartstrore|smartstore/gi, "")
    .replace(/[-_]+/g, " ")
    .trim();

  if (!filename) return "Product screen";

  return filename
    .split(/\s+/)
    .map((word) =>
      word.toLowerCase() === "gtm"
        ? "GTM"
        : `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`,
    )
    .join(" ");
}

export default function ScreenshotGallery({
  images,
}: {
  images: BuildScreenshot[];
}) {
  const slides: CoverflowSlide[] = images.map((image, index) => ({
    src: image.src,
    alt: image.alt,
    title: titleFromSource(image.src),
    subtitle: image.caption,
    meta: [{ label: "SCREEN", value: `${String(index + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}` }],
  }));

  return (
    <CoverflowCarousel
      slides={slides}
      label="Production interface screenshots"
      cardWidth="clamp(250px, 62vw, 700px)"
      cardAspect={16 / 10}
      rotate={40}
      depth={0.5}
      gap={0.055}
    />
  );
}
