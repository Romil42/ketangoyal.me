import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords: string[];
  image?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  image = "/opengraph-image",
}: PageMetadataOptions): Metadata {
  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;
  const canonicalUrl = new URL(path, siteConfig.url).toString();
  const imageUrl = new URL(image, siteConfig.url).toString();

  return {
    title: { absolute: fullTitle },
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title: fullTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} — ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}
