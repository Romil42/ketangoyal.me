import Container from "@/components/layout/Container";

export default function WritingLoading() {
  return (
    <main aria-busy="true" aria-label="Loading writing">
      <section className="border-b border-mist bg-paper">
        <Container className="py-16 sm:py-24">
          <div className="h-4 w-24 animate-pulse rounded bg-mist" />
          <div className="mt-6 h-16 max-w-3xl animate-pulse rounded-2xl bg-fog sm:h-20" />
          <div className="mt-6 h-7 max-w-2xl animate-pulse rounded bg-fog" />
        </Container>
      </section>
      <Container className="py-14 sm:py-20">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="overflow-hidden rounded-2xl border border-mist bg-paper">
              <div className="aspect-[16/10] animate-pulse bg-fog" />
              <div className="space-y-4 p-6">
                <div className="h-3 w-32 animate-pulse rounded bg-mist" />
                <div className="h-9 animate-pulse rounded bg-fog" />
                <div className="h-16 animate-pulse rounded bg-fog" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
