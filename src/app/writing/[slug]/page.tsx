import type {Metadata} from "next";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";
import {notFound} from "next/navigation";
import Container from "@/components/layout/Container";
import PortableTextRenderer from "@/components/portable-text/PortableTextRenderer";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import {BreadcrumbJsonLd, WritingArticleJsonLd} from "@/components/shared/StructuredData";
import ArticleNavigation from "@/components/writing/ArticleNavigation";
import KrafttClosingCta from "@/components/writing/KrafttClosingCta";
import SanityImage, {type QueriedSanityImage} from "@/components/writing/SanityImage";
import WritingCard from "@/components/writing/WritingCard";
import {siteConfig} from "@/content/site";
import {formatArticleDate, isMeaningfullyUpdated} from "@/lib/formatDate";
import {calculateReadingTime} from "@/lib/readingTime";
import {safeExternalHref} from "@/lib/safeUrl";
import {formatContentType} from "@/lib/writing";
import {getAdjacentPosts, getAllPostSlugs, getPostBySlug, getPostMetadata} from "@/sanity/data";
import {urlForImage} from "@/sanity/image";

export const dynamicParams = false;

type ArticlePageProps = {
  params: Promise<{slug: string}>;
};

function socialImageUrl(image: QueriedSanityImage | null | undefined): string | undefined {
  if (!image?.asset?._id?.startsWith("image-")) return undefined;
  return urlForImage({
    asset: {_ref: image.asset._id},
    crop: image.crop ?? undefined,
    hotspot: image.hotspot ?? undefined,
  })
    .width(1200)
    .height(630)
    .fit("crop")
    .quality(85)
    .url();
}

export async function generateStaticParams() {
  const posts = await getAllPostSlugs();
  return posts.map(({slug}) => ({slug}));
}

export async function generateMetadata({params}: ArticlePageProps): Promise<Metadata> {
  const {slug} = await params;
  const post = await getPostMetadata(slug);

  if (!post) notFound();

  const title = post.seo?.title || post.title;
  const fullTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;
  const description = post.seo?.description || post.excerpt;
  const canonical =
    safeExternalHref(post.seo?.canonicalUrl) || `${siteConfig.url}/writing/${post.slug}`;
  const imageUrl = socialImageUrl(post.seo?.image || post.featuredImage);
  const noIndex = post.seo?.noIndex === true;

  return {
    title: {absolute: fullTitle},
    description,
    alternates: {canonical},
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {index: false, follow: false},
        }
      : {index: true, follow: true},
    openGraph: {
      type: "article",
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title: fullTitle,
      description,
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: [siteConfig.url],
      ...(imageUrl
        ? {
            images: [
              {
                url: imageUrl,
                width: 1200,
                height: 630,
                alt: post.featuredImageAlt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: fullTitle,
      description,
      ...(imageUrl ? {images: [imageUrl]} : {}),
    },
  };
}

export default async function ArticlePage({params}: ArticlePageProps) {
  const {slug} = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const adjacent = await getAdjacentPosts(post.publishedAt);
  const readingTime = calculateReadingTime(post.body);
  const label = post.category?.title || formatContentType(post.contentType) || "Writing";
  const updated = isMeaningfullyUpdated(post.publishedAt, post._updatedAt);
  const jsonLdImage = socialImageUrl(post.seo?.image || post.featuredImage);

  return (
    <main>
      <BreadcrumbJsonLd
        items={[
          {name: "Home", url: siteConfig.url},
          {name: "Writing", url: `${siteConfig.url}/writing`},
          {name: post.title, url: `${siteConfig.url}/writing/${post.slug}`},
        ]}
      />
      <WritingArticleJsonLd
        post={{
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          publishedAt: post.publishedAt,
          updatedAt: post._updatedAt,
          category: post.category?.title,
          tags: post.tags,
        }}
        imageUrl={jsonLdImage}
        readingMinutes={readingTime.minutes}
      />

      <article>
        <header className="border-b border-mist bg-paper">
          <Container className="py-12 sm:py-18">
            <div className="mx-auto max-w-4xl">
              <Breadcrumbs
                items={[
                  {label: "Home", href: "/"},
                  {label: "Writing", href: "/writing"},
                  {label: post.title},
                ]}
              />
              <p className="mt-10 text-xs font-semibold uppercase tracking-[0.08em] text-signal">{label}</p>
              <h1 className="font-display mt-5 text-5xl leading-[1.02] text-ink sm:text-6xl lg:text-7xl">
                {post.title}
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-slate sm:text-xl">{post.excerpt}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-dust">
                <time dateTime={post.publishedAt}>Published {formatArticleDate(post.publishedAt)}</time>
                {updated ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <time dateTime={post._updatedAt}>Updated {formatArticleDate(post._updatedAt)}</time>
                  </>
                ) : null}
                <span aria-hidden="true">·</span>
                <span>{readingTime.label}</span>
              </div>
            </div>
          </Container>
        </header>

        <Container className="py-10 sm:py-14">
          <figure className="mx-auto max-w-6xl">
            <div className="overflow-hidden rounded-[2rem] border border-mist bg-fog">
              <SanityImage
                image={post.featuredImage}
                alt={post.featuredImageAlt}
                width={1600}
                height={960}
                sizes="(min-width: 1280px) 72rem, 100vw"
                className="h-auto w-full object-cover"
                priority
              />
            </div>
            {post.featuredImageCaption ? (
              <figcaption className="mt-3 text-sm leading-6 text-dust">
                {post.featuredImageCaption}
              </figcaption>
            ) : null}
          </figure>

          <div className="mx-auto mt-12 max-w-3xl sm:mt-16">
            <PortableTextRenderer value={post.body} />

            {post.tags?.length ? (
              <div className="mt-12 flex flex-wrap gap-2 border-t border-mist pt-7" aria-label="Article tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-fog px-3 py-1.5 text-xs text-slate">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </Container>
      </article>

      <Container className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-6xl space-y-14">
          <KrafttClosingCta type={post.krafttCtaType} />

          {post.relatedPosts?.length ? (
            <section aria-labelledby="related-writing-title">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-signal">Keep reading</p>
              <h2 id="related-writing-title" className="font-display mt-4 text-4xl text-ink">
                Related writing.
              </h2>
              <div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {post.relatedPosts
                  .filter((relatedPost) => relatedPost !== null)
                  .map((relatedPost) => (
                    <WritingCard key={relatedPost._id} post={relatedPost} />
                  ))}
              </div>
            </section>
          ) : null}

          <ArticleNavigation previous={adjacent.previous} next={adjacent.next} />

          <Link href="/writing" className="inline-flex items-center gap-2 font-semibold text-ink hover:text-signal">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Writing
          </Link>
        </div>
      </Container>
    </main>
  );
}
