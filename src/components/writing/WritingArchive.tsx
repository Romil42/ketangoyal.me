"use client";

import {Fragment, useState, type ReactNode} from "react";
import {BookOpen} from "lucide-react";
import Container from "@/components/layout/Container";
import Eyebrow from "@/components/typography/Eyebrow";
import type {CATEGORIES_QUERY_RESULT} from "@/sanity/sanity.types";

type WritingArchiveEntry = {
  id: string;
  categoryId: string | null;
  card: ReactNode;
};

type WritingArchiveProps = {
  entries: WritingArchiveEntry[];
  featuredPostId: string | null;
  featuredPost: ReactNode;
  categories: CATEGORIES_QUERY_RESULT;
};

export default function WritingArchive({
  entries,
  featuredPostId,
  featuredPost,
  categories,
}: WritingArchiveProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const selectedCategory = categories.find((category) => category._id === selectedCategoryId);
  const filteredEntries = selectedCategoryId
    ? entries.filter((entry) => entry.categoryId === selectedCategoryId)
    : entries;
  const visibleFeaturedPost = selectedCategoryId ? null : featuredPost;
  const remainingEntries = visibleFeaturedPost
    ? filteredEntries.filter((entry) => entry.id !== featuredPostId)
    : filteredEntries;

  return (
    <>
      <section className="border-b border-mist bg-fog py-8">
        <Container>
          <div role="group" aria-label="Filter writing by category" className="flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={!selectedCategoryId}
              onClick={() => setSelectedCategoryId(null)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                !selectedCategoryId
                  ? "border-signal bg-signal text-paper"
                  : "border-mist bg-paper text-slate hover:border-signal hover:text-signal"
              }`}
            >
              All writing
            </button>
            {categories
              .filter((category) => category.postCount > 0)
              .map((category) => (
                <button
                  type="button"
                  key={category._id}
                  aria-pressed={selectedCategoryId === category._id}
                  onClick={() => setSelectedCategoryId(category._id)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategoryId === category._id
                      ? "border-signal bg-signal text-paper"
                      : "border-mist bg-paper text-slate hover:border-signal hover:text-signal"
                  }`}
                >
                  {category.title} <span className="text-current/60">{category.postCount}</span>
                </button>
              ))}
          </div>
        </Container>
      </section>

      {visibleFeaturedPost ? (
        <section className="py-14 sm:py-20">
          <Container>
            {visibleFeaturedPost}
          </Container>
        </section>
      ) : null}

      <section className={`pb-20 sm:pb-28 ${visibleFeaturedPost ? "pt-0" : "pt-14 sm:pt-20"}`}>
        <Container>
          <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>{selectedCategory ? selectedCategory.title : "The full record"}</Eyebrow>
              <h2 className="font-display mt-4 text-4xl leading-tight text-ink sm:text-5xl">
                {selectedCategory ? `Writing about ${selectedCategory.title}.` : "Latest writing."}
              </h2>
            </div>
            {selectedCategory ? (
              <button
                type="button"
                onClick={() => setSelectedCategoryId(null)}
                className="self-start text-sm font-semibold text-slate hover:text-signal sm:self-auto"
              >
                Clear category filter
              </button>
            ) : null}
          </div>

          {remainingEntries.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {remainingEntries.map((entry) => (
                <Fragment key={entry.id}>{entry.card}</Fragment>
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-mist bg-fog px-7 py-14 text-center sm:px-12">
              <BookOpen className="mx-auto h-8 w-8 text-signal" aria-hidden="true" />
              <h2 className="font-display mt-5 text-3xl text-ink">
                {selectedCategory
                  ? "Nothing published in this category yet."
                  : "The first article is still being built."}
              </h2>
              <p className="mx-auto mt-4 max-w-xl leading-7 text-slate">
                {selectedCategory
                  ? "Try another category or return to all writing."
                  : "Published Sanity articles will appear after the next website build completes."}
              </p>
              {selectedCategory ? (
                <button
                  type="button"
                  onClick={() => setSelectedCategoryId(null)}
                  className="mt-6 inline-flex font-semibold text-signal hover:text-ink"
                >
                  View all writing
                </button>
              ) : null}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
