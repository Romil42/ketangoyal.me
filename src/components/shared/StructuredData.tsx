import type { Build } from "@/content/builds";
import type { JourneyEra } from "@/content/journey";
import { siteConfig } from "@/content/site";

const websiteId = `${siteConfig.url}/#website`;
const personId = `${siteConfig.url}/#person`;
const organizationId = `${siteConfig.url}/#kraftt-digital`;

const externalProfiles = [
  siteConfig.social.linkedin,
  siteConfig.social.instagram,
].filter((url): url is string => Boolean(url));

function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

function serializeJsonLd(data: object) {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

export function SiteIdentityJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: siteConfig.name,
        alternateName: "Ketan Goyal Portfolio",
        description: siteConfig.defaultDescription,
        inLanguage: siteConfig.language,
        creator: { "@id": personId },
        publisher: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.name,
        url: siteConfig.url,
        image: {
          "@type": "ImageObject",
          url: absoluteUrl(siteConfig.profileImage),
        },
        description: siteConfig.defaultDescription,
        jobTitle: ["Software Engineer", "Founder"],
        sameAs: externalProfiles,
        worksFor: { "@id": organizationId },
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Bachelor's degree",
          name: "B.Tech in Computer Science and Engineering",
          dateCreated: "2024",
        },
        knowsAbout: [
          "Software Engineering",
          "Next.js",
          "TypeScript",
          "PHP",
          "SQL",
          "E-commerce Systems",
          "AI Automation",
          "Digital Transformation",
          "Business Systems",
        ],
      },
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.organization.name,
        url: siteConfig.organization.url,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl(siteConfig.organization.logo),
        },
        founder: { "@id": personId },
        foundingDate: "2025",
        description:
          "Kraftt Digital helps smaller businesses adopt practical websites, digital systems, automation, and modern technology.",
      },
    ],
  };

  return <JsonLdScript data={data} />;
}

export function PersonProfileJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteConfig.url}/about#profile-page`,
    url: `${siteConfig.url}/about`,
    name: `About ${siteConfig.name}`,
    description:
      "Ketan Goyal's path from B.Tech CSE and production engineering at ShopClues to business experiments and founding Kraftt Digital.",
    isPartOf: { "@id": websiteId },
    mainEntity: { "@id": personId },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.profileImage),
    },
  };

  return <JsonLdScript data={data} />;
}

export function JourneyJsonLd({ eras }: { eras: JourneyEra[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}/journey#collection`,
    url: `${siteConfig.url}/journey`,
    name: `${siteConfig.name}'s journey`,
    description:
      "A chronological record of Ketan Goyal's software engineering, business experiments, and founder journey.",
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: eras.length,
      itemListElement: eras.map((era, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteConfig.url}/journey#${era.id}`,
        name: era.title,
        description: era.summary,
      })),
    },
  };

  return <JsonLdScript data={data} />;
}

export function BuildsCollectionJsonLd({ builds }: { builds: Build[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}/builds#collection`,
    url: `${siteConfig.url}/builds`,
    name: `${siteConfig.name}'s software engineering and business portfolio`,
    description:
      "Case studies covering ShopClues, SmartStore, The Vibed Vines, and Kraftt Digital.",
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    hasPart: builds.map((build) => ({
      "@type": "WebPage",
      "@id": `${siteConfig.url}/builds/${build.slug}#webpage`,
      url: `${siteConfig.url}/builds/${build.slug}`,
      name: build.name,
      description: build.hook,
    })),
  };

  return <JsonLdScript data={data} />;
}

export function BuildCaseStudyJsonLd({ build }: { build: Build }) {
  const pageUrl = `${siteConfig.url}/builds/${build.slug}`;
  const fallbackImages: Record<string, string> = {
    "the-vibed-vines": "/images/thevibedvines-logo.png",
    "kraftt-digital": "/images/kraftt/kraftt-vision.png",
  };
  const image = build.screenshots?.[0]?.src ?? fallbackImages[build.id];

  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: `${build.name} — ${build.classification} case study`,
    description: build.summary,
    isPartOf: { "@id": websiteId },
    author: { "@id": personId },
    about: {
      "@type": "CreativeWork",
      "@id": `${pageUrl}#case-study`,
      name: `${build.name} case study`,
      abstract: build.hook,
      description: build.summary,
      author: { "@id": personId },
      keywords: build.stack,
      ...(image ? { image: absoluteUrl(image) } : {}),
      ...(build.externalUrl ? { sameAs: build.externalUrl } : {}),
    },
  };

  return <JsonLdScript data={data} />;
}

export function ContactPageJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${siteConfig.url}/contact#contact-page`,
    url: `${siteConfig.url}/contact`,
    name: `Contact ${siteConfig.name}`,
    description: `Contact ${siteConfig.name}, Software Engineer and founder of Kraftt Digital.`,
    isPartOf: { "@id": websiteId },
    mainEntity: { "@id": personId },
  };

  return <JsonLdScript data={data} />;
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLdScript data={data} />;
}

export function WritingArticleJsonLd({
  post,
  imageUrl,
  readingMinutes,
}: {
  post: {
    slug: string;
    title: string;
    excerpt: string;
    publishedAt: string;
    updatedAt: string;
    category?: string | null;
    tags?: string[] | null;
  };
  imageUrl?: string;
  readingMinutes: number;
}) {
  const pageUrl = `${siteConfig.url}/writing/${post.slug}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${pageUrl}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: siteConfig.language,
    author: { "@id": personId },
    publisher: { "@id": personId },
    isPartOf: { "@id": websiteId },
    ...(imageUrl ? { image: imageUrl } : {}),
    ...(post.category ? { articleSection: post.category } : {}),
    ...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
    timeRequired: `PT${readingMinutes}M`,
  };

  return <JsonLdScript data={data} />;
}
