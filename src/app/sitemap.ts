import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { builds } from "@/content/builds";
import { getSitemapPosts } from "@/sanity/data";
import { urlForImage } from "@/sanity/image";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date("2026-08-20T00:00:00+05:30");
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [new URL(siteConfig.profileImage, siteConfig.url).toString()],
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [new URL(siteConfig.profileImage, siteConfig.url).toString()],
    },
    {
      url: `${siteConfig.url}/journey`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [new URL("/images/ketan/ketan-goyal-journey.png", siteConfig.url).toString()],
    },
    {
      url: `${siteConfig.url}/builds`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/writing`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/now`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
      images: [new URL("/images/kraftt/kraftt-vision.png", siteConfig.url).toString()],
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${siteConfig.url}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const fallbackImages: Record<string, string> = {
    "the-vibed-vines": "/images/thevibedvines-logo.png",
    "kraftt-digital": "/images/kraftt/kraftt-vision.png",
  };
  const buildRoutes: MetadataRoute.Sitemap = builds.map((build) => {
    const image = build.screenshots?.[0]?.src ?? fallbackImages[build.id];

    return {
      url: `${siteConfig.url}/builds/${build.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      ...(image ? { images: [new URL(image, siteConfig.url).toString()] } : {}),
    };
  });

  const writingPosts = await getSitemapPosts();
  const writingRoutes: MetadataRoute.Sitemap = writingPosts.map((post) => {
    const imageId = post.featuredImage.asset?._id;
    const image = imageId?.startsWith("image-")
      ? urlForImage({asset: {_ref: imageId}}).url().replace(/\?.*$/, "")
      : undefined;

    return {
      url: `${siteConfig.url}/writing/${post.slug}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: "weekly",
      priority: 0.8,
      ...(image ? {images: [image]} : {}),
    };
  });

  return [...staticRoutes, ...buildRoutes, ...writingRoutes];
}
