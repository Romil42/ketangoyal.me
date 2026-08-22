"use client";

import Container from "@/components/layout/Container";

export default function WritingError({reset}: {reset: () => void}) {
  return (
    <main>
      <Container className="py-20 text-center sm:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-signal">Writing</p>
        <h1 className="font-display mt-5 text-5xl text-ink">The writing could not load.</h1>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-slate">
          The content service may be temporarily unavailable. Nothing has been lost.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-7 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper hover:bg-graphite"
        >
          Try again
        </button>
      </Container>
    </main>
  );
}
