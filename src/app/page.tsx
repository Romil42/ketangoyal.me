import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Introduction from "@/components/home/Introduction";
import JourneyPreview from "@/components/home/JourneyPreview";
import SelectedWork from "@/components/home/SelectedWork";
import Exploring from "@/components/home/Exploring";
import Principles from "@/components/home/Principles";
import FuturePlatform from "@/components/home/FuturePlatform";
import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Ketan Goyal — Software Engineer & Founder",
  description:
    "Ketan Goyal is a Software Engineer and founder of Kraftt Digital, documenting production engineering, e-commerce systems, business experiments, and AI automation.",
  path: "/",
  keywords: siteConfig.seo.keywords,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <JourneyPreview />
      <SelectedWork />
      <Exploring />
      <Principles />
      <FuturePlatform />
    </>
  );
}
