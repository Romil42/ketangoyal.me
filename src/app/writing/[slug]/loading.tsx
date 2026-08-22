import Container from "@/components/layout/Container";

export default function ArticleLoading() {
  return (
    <main aria-busy="true" aria-label="Loading article">
      <Container className="py-12 sm:py-18">
        <div className="mx-auto max-w-4xl">
          <div className="h-4 w-48 animate-pulse rounded bg-mist" />
          <div className="mt-10 h-4 w-28 animate-pulse rounded bg-mist" />
          <div className="mt-5 h-20 animate-pulse rounded-2xl bg-fog sm:h-28" />
          <div className="mt-7 h-16 max-w-3xl animate-pulse rounded-xl bg-fog" />
        </div>
        <div className="mx-auto mt-12 aspect-[5/3] max-w-6xl animate-pulse rounded-[2rem] bg-fog" />
      </Container>
    </main>
  );
}
