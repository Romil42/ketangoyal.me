import Image from "next/image";
import {urlForImage} from "@/sanity/image";

export type QueriedSanityImage = {
  asset?: {
    _id?: string;
    url?: string;
    metadata?: {
      lqip?: string | null;
      dimensions?: {
        width: number;
        height: number;
        aspectRatio?: number;
      } | null;
    } | null;
  } | null;
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  } | null;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  } | null;
};

type SanityImageProps = {
  image: QueriedSanityImage;
  alt: string;
  width: number;
  height?: number;
  sizes: string;
  className?: string;
  priority?: boolean;
};

export default function SanityImage({
  image,
  alt,
  width,
  height,
  sizes,
  className,
  priority = false,
}: SanityImageProps) {
  if (!image.asset?._id?.startsWith("image-")) return null;

  const source = {
    asset: {_ref: image.asset._id},
    crop: image.crop ?? undefined,
    hotspot: image.hotspot ?? undefined,
  };
  const sourceDimensions = image.asset.metadata?.dimensions;
  const renderedHeight =
    height ??
    Math.round(
      width /
        (sourceDimensions?.aspectRatio ||
          (sourceDimensions ? sourceDimensions.width / sourceDimensions.height : 16 / 9)),
    );
  let builder = urlForImage(source).width(width).quality(82);

  if (height) {
    builder = builder.height(height).fit("crop");
  }

  const lqip = image.asset.metadata?.lqip;

  return (
    <Image
      src={builder.url()}
      alt={typeof alt === "string" ? alt.trim() : ""}
      width={width}
      height={renderedHeight}
      sizes={sizes}
      className={className}
      priority={priority}
      placeholder={lqip ? "blur" : "empty"}
      blurDataURL={lqip || undefined}
    />
  );
}
