import Link from "next/link";
import Container from "@/components/layout/Container";

export default function ArticleNotFound() {
  return (
    <main>
      <Container className="py-20 text-center sm:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-signal">404 · Writing</p>
        <h1 className="font-display mt-5 text-5xl leading-tight text-ink sm:text-6xl">
          This article is not published.
        </h1>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-slate">
          The link may be incorrect, the article may still be a draft, or it may have been unpublished.
        </p>
        <Link
          href="/writing"
          className="mt-7 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper hover:bg-graphite"
        >
          View published writing
        </Link>
      </Container>
    </main>
  );
}
