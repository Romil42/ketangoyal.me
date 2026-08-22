import type {Metadata} from "next";
import Container from "@/components/layout/Container";
import CTA from "@/components/shared/CTA";

export const metadata: Metadata = {
  title: "Page not found",
  robots: {index: false, follow: false},
};

export default function NotFound() {
  return (
    <Container className="py-24 sm:py-32 text-center">
      <p className="eyebrow justify-center flex">404</p>
      <h1 className="font-display mt-6 text-4xl sm:text-5xl text-ink">
        This page isn&rsquo;t part of the journey.
      </h1>
      <p className="mt-6 text-lg text-slate max-w-md mx-auto">
        Whatever you were looking for doesn&rsquo;t exist here — at least not yet.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <CTA href="/">Home</CTA>
        <CTA href="/journey" variant="secondary">
          Journey
        </CTA>
        <CTA href="/builds" variant="secondary">
          Builds
        </CTA>
      </div>
    </Container>
  );
}
