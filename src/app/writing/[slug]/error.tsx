"use client";

import Link from "next/link";
import Container from "@/components/layout/Container";

export default function ArticleError({reset}: {reset: () => void}) {
  return (
    <main>
      <Container className="py-20 text-center sm:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-signal">Writing</p>
        <h1 className="font-display mt-5 text-5xl text-ink">This article could not load.</h1>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-slate">
          The content service may be temporarily unavailable. You can retry or return to Writing.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper hover:bg-graphite"
          >
            Try again
          </button>
          <Link
            href="/writing"
            className="rounded-full border border-mist px-6 py-3 text-sm font-semibold text-ink hover:border-signal hover:text-signal"
          >
            Back to Writing
          </Link>
        </div>
      </Container>
    </main>
  );
}
