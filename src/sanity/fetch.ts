import type {QueryParams} from "@sanity/client";
import {freshSanityClient} from "./client";

type SanityFetchOptions = {
  query: string;
  params?: QueryParams;
};

export function sanityFetch<Result>({
  query,
  params = {},
}: SanityFetchOptions): Promise<Result> {
  return freshSanityClient.fetch<Result>(query, params, {perspective: "published"});
}
