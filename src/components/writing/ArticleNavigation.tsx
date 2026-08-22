import Link from "next/link";
import {ArrowLeft, ArrowRight} from "lucide-react";
import type {ADJACENT_POSTS_QUERY_RESULT} from "@/sanity/sanity.types";

export default function ArticleNavigation({
  previous,
  next,
}: ADJACENT_POSTS_QUERY_RESULT) {
  if (!previous && !next) return null;

  return (
    <nav aria-label="Article navigation" className="grid gap-4 border-t border-mist pt-10 sm:grid-cols-2">
      {previous ? (
        <Link
          href={`/writing/${previous.slug}`}
          className="group rounded-2xl border border-mist bg-paper p-5 transition-colors hover:border-signal/40"
        >
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-dust">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Previous article
          </span>
          <span className="font-display mt-3 block text-2xl leading-tight text-ink group-hover:text-signal">
            {previous.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}

      {next ? (
        <Link
          href={`/writing/${next.slug}`}
          className="group rounded-2xl border border-mist bg-paper p-5 text-left transition-colors hover:border-signal/40 sm:text-right"
        >
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-dust sm:justify-end">
            Next article
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="font-display mt-3 block text-2xl leading-tight text-ink group-hover:text-signal">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
