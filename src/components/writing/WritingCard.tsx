import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import {calculateReadingTime} from "@/lib/readingTime";
import {formatArticleDate} from "@/lib/formatDate";
import {formatContentType} from "@/lib/writing";
import type {ALL_WRITING_QUERY_RESULT} from "@/sanity/sanity.types";
import SanityImage from "./SanityImage";

export type WritingCardData = ALL_WRITING_QUERY_RESULT[number];

export default function WritingCard({post}: {post: WritingCardData}) {
  const label = post.category?.title || formatContentType(post.contentType) || "Writing";
  const readingTime = calculateReadingTime(post.readingBody);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-mist bg-paper transition-transform duration-300 hover:-translate-y-1">
      <Link href={`/writing/${post.slug}`} className="flex h-full flex-col focus-visible:outline-none">
        <div className="aspect-[16/10] overflow-hidden border-b border-mist bg-fog">
          <SanityImage
            image={post.featuredImage}
            alt={post.featuredImageAlt}
            width={720}
            height={450}
            sizes="(min-width: 1024px) 31vw, (min-width: 640px) 47vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-dust">
            <span className="font-semibold uppercase tracking-[0.08em] text-signal">{label}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.publishedAt}>{formatArticleDate(post.publishedAt)}</time>
            <span aria-hidden="true">·</span>
            <span>{readingTime.label}</span>
          </div>

          <h2 className="font-display mt-4 text-3xl leading-tight text-ink transition-colors group-hover:text-signal">
            {post.title}
          </h2>
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate">{post.excerpt}</p>

          <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-ink">
            Read the article
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
