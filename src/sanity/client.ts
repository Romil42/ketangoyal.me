import {createClient} from "@sanity/client";

export const sanityApiVersion = "2026-08-01";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET. Copy .env.example to .env.local and provide both values.",
  );
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: sanityApiVersion,
  useCdn: true,
  perspective: "published",
});

export const freshSanityClient = sanityClient.withConfig({useCdn: false});
