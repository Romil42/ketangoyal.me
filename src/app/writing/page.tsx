import type {Metadata} from "next";
import {Layers3, PencilLine} from "lucide-react";
import Container from "@/components/layout/Container";
import Eyebrow from "@/components/typography/Eyebrow";
import FeaturedWriting from "@/components/writing/FeaturedWriting";
import WritingArchive from "@/components/writing/WritingArchive";
import WritingCard from "@/components/writing/WritingCard";
import {createPageMetadata} from "@/lib/seo";
import {getAllWriting, getCategories, getFeaturedWriting} from "@/sanity/data";

export const metadata: Metadata = createPageMetadata({
  title: "Writing — Build Logs, Guides & Essays",
  description:
    "Build logs, guides, essays, case studies, and notes from Ketan Goyal—what was built, what changed, what failed, and what the work taught.",
  path: "/writing",
  keywords: [
    "Ketan Goyal writing",
    "software engineering build logs",
    "learning by building",
    "Next.js developer writing India",
    "business experiments India",
    "Kraftt Digital insights",
  ],
});

export default async function WritingPage() {
  const [posts, featuredPost, categories] = await Promise.all([
    getAllWriting(),
    getFeaturedWriting(),
    getCategories(),
  ]);

  return (
    <main>
      <section className="relative overflow-hidden border-b border-mist bg-paper">
        <div
          className="pointer-events-none absolute -right-32 -top-40 h-[30rem] w-[30rem] rounded-full border-[5rem] border-signal-soft"
          aria-hidden="true"
        />
        <Container className="relative py-16 sm:py-24">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Eyebrow>Writing</Eyebrow>
              <h1 className="font-display mt-6 max-w-4xl text-6xl leading-[0.98] text-ink sm:text-7xl lg:text-8xl">
                Notes from the work.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-slate sm:text-xl">
                I learn by building. This is where I write down what shipped, what paused,
                what failed, and what changed after the idea met reality.
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-3 lg:col-span-4">
              <div className="rounded-2xl border border-mist bg-fog/80 p-5">
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-dust">
                  <PencilLine className="h-4 w-4 text-signal" aria-hidden="true" />
                  Published
                </dt>
                <dd className="font-display mt-3 text-4xl text-ink">{posts.length}</dd>
              </div>
              <div className="rounded-2xl border border-mist bg-fog/80 p-5">
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-dust">
                  <Layers3 className="h-4 w-4 text-signal" aria-hidden="true" />
                  Categories
                </dt>
                <dd className="font-display mt-3 text-4xl text-ink">{categories.length}</dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      <WritingArchive
        entries={posts.map((post) => ({
          id: post._id,
          categoryId: post.category?._id ?? null,
          card: <WritingCard post={post} />,
        }))}
        featuredPostId={featuredPost?._id ?? null}
        featuredPost={featuredPost ? <FeaturedWriting post={featuredPost} /> : null}
        categories={categories}
      />
    </main>
  );
}
