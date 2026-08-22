import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import Eyebrow from "@/components/typography/Eyebrow";
import {calculateReadingTime} from "@/lib/readingTime";
import {formatArticleDate} from "@/lib/formatDate";
import {formatContentType} from "@/lib/writing";
import type {FEATURED_WRITING_QUERY_RESULT} from "@/sanity/sanity.types";
import SanityImage from "./SanityImage";

export default function FeaturedWriting({post}: {post: NonNullable<FEATURED_WRITING_QUERY_RESULT>}) {
  const label = post.category?.title || formatContentType(post.contentType) || "Featured writing";
  const readingTime = calculateReadingTime(post.readingBody);

  return (
    <article className="overflow-hidden rounded-[2rem] border border-mist bg-paper">
      <Link
        href={`/writing/${post.slug}`}
        className="group grid focus-visible:outline-none lg:grid-cols-12"
      >
        <div className="aspect-[16/10] overflow-hidden border-b border-mist bg-fog lg:col-span-7 lg:aspect-auto lg:min-h-[28rem] lg:border-b-0 lg:border-r">
          <SanityImage
            image={post.featuredImage}
            alt={post.featuredImageAlt}
            width={1200}
            height={760}
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            priority
          />
        </div>

        <div className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-5 lg:p-12">
          <Eyebrow>Featured writing</Eyebrow>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.08em] text-signal">{label}</p>
          <h2 className="font-display mt-4 text-4xl leading-tight text-ink transition-colors group-hover:text-signal sm:text-5xl">
            {post.title}
          </h2>
          <p className="mt-5 text-base leading-7 text-slate">{post.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-dust">
            <time dateTime={post.publishedAt}>{formatArticleDate(post.publishedAt)}</time>
            <span aria-hidden="true">·</span>
            <span>{readingTime.label}</span>
          </div>
          <span className="mt-8 inline-flex items-center gap-2 font-semibold text-ink">
            Read featured article
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
