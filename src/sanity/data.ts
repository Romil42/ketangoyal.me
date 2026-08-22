import {
  ADJACENT_POSTS_QUERY,
  ALL_POST_SLUGS_QUERY,
  ALL_WRITING_QUERY,
  CATEGORIES_QUERY,
  FEATURED_WRITING_QUERY,
  LATEST_WRITING_QUERY,
  POST_BY_SLUG_QUERY,
  POST_METADATA_QUERY,
  RELATED_POSTS_QUERY,
  SITEMAP_POSTS_QUERY,
  WRITING_BY_CATEGORY_QUERY,
} from "./queries";
import {sanityFetch} from "./fetch";
import type {
  ADJACENT_POSTS_QUERY_RESULT,
  ALL_POST_SLUGS_QUERY_RESULT,
  ALL_WRITING_QUERY_RESULT,
  CATEGORIES_QUERY_RESULT,
  FEATURED_WRITING_QUERY_RESULT,
  LATEST_WRITING_QUERY_RESULT,
  POST_BY_SLUG_QUERY_RESULT,
  POST_METADATA_QUERY_RESULT,
  RELATED_POSTS_QUERY_RESULT,
  SITEMAP_POSTS_QUERY_RESULT,
  WRITING_BY_CATEGORY_QUERY_RESULT,
} from "./sanity.types";

export function getAllWriting(): Promise<ALL_WRITING_QUERY_RESULT> {
  return sanityFetch({query: ALL_WRITING_QUERY});
}

export function getFeaturedWriting(): Promise<FEATURED_WRITING_QUERY_RESULT> {
  return sanityFetch({query: FEATURED_WRITING_QUERY});
}

export function getLatestWriting(): Promise<LATEST_WRITING_QUERY_RESULT> {
  return sanityFetch({query: LATEST_WRITING_QUERY});
}

export function getWritingByCategory(
  categoryId: string,
): Promise<WRITING_BY_CATEGORY_QUERY_RESULT> {
  return sanityFetch({query: WRITING_BY_CATEGORY_QUERY, params: {categoryId}});
}

export function getPostBySlug(slug: string): Promise<POST_BY_SLUG_QUERY_RESULT> {
  return sanityFetch({query: POST_BY_SLUG_QUERY, params: {slug}});
}

export function getPostMetadata(slug: string): Promise<POST_METADATA_QUERY_RESULT> {
  return sanityFetch({query: POST_METADATA_QUERY, params: {slug}});
}

export function getRelatedPosts(ids: string[]): Promise<RELATED_POSTS_QUERY_RESULT> {
  if (ids.length === 0) return Promise.resolve([]);
  return sanityFetch({query: RELATED_POSTS_QUERY, params: {ids}});
}

export function getAdjacentPosts(
  publishedAt: string,
): Promise<ADJACENT_POSTS_QUERY_RESULT> {
  return sanityFetch({query: ADJACENT_POSTS_QUERY, params: {publishedAt}});
}

export function getCategories(): Promise<CATEGORIES_QUERY_RESULT> {
  return sanityFetch({query: CATEGORIES_QUERY});
}

export function getSitemapPosts(): Promise<SITEMAP_POSTS_QUERY_RESULT> {
  return sanityFetch({query: SITEMAP_POSTS_QUERY});
}

export function getAllPostSlugs(): Promise<ALL_POST_SLUGS_QUERY_RESULT> {
  return sanityFetch({query: ALL_POST_SLUGS_QUERY});
}
