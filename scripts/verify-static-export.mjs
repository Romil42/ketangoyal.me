import {createClient} from "@sanity/client";
import {access, readFile, readdir} from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outputDirectory = path.join(root, "out");
const errors = [];
const notes = [];

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error(
    "Static export verification requires NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.",
  );
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function requireFile(relativePath) {
  const filePath = path.join(outputDirectory, ...relativePath.split("/"));
  if (!(await exists(filePath))) errors.push(`Missing required export file: ${relativePath}`);
  return filePath;
}

async function collectFiles(directory, predicate, files = []) {
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) await collectFiles(entryPath, predicate, files);
    else if (predicate(entryPath)) files.push(entryPath);
  }
  return files;
}

function escapeHtmlText(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function internalTargetCandidates(urlPath) {
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(urlPath.split(/[?#]/, 1)[0]);
  } catch {
    return [];
  }

  const normalized = decodedPath.replace(/^\/+/, "");
  if (!normalized) return [path.join(outputDirectory, "index.html")];

  const direct = path.join(outputDirectory, ...normalized.split("/"));
  return [direct, `${direct}.html`, path.join(direct, "index.html")];
}

async function anyFileExists(candidates) {
  for (const candidate of candidates) {
    if (await exists(candidate)) return true;
  }
  return false;
}

async function verifyInternalReferences(htmlFiles) {
  const missingReferences = new Set();
  const attributePattern = /\b(?:href|src|action)=(?:"([^"]+)"|'([^']+)')/g;

  for (const htmlFile of htmlFiles) {
    const html = await readFile(htmlFile, "utf8");
    for (const match of html.matchAll(attributePattern)) {
      const reference = match[1] || match[2];
      if (!reference?.startsWith("/") || reference.startsWith("//")) continue;
      if (reference.startsWith("/_next/image")) {
        missingReferences.add(`${path.relative(outputDirectory, htmlFile)} -> ${reference}`);
        continue;
      }

      const candidates = internalTargetCandidates(reference);
      if (candidates.length > 0 && !(await anyFileExists(candidates))) {
        missingReferences.add(`${path.relative(outputDirectory, htmlFile)} -> ${reference}`);
      }
    }
  }

  for (const reference of missingReferences) errors.push(`Broken internal reference: ${reference}`);
}

await requireFile("index.html");
await requireFile("writing/index.html");
await requireFile("404.html");
await requireFile("sitemap.xml");
await requireFile("robots.txt");
await requireFile("CNAME");

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-08-01",
  useCdn: false,
  perspective: "published",
});

const posts = await client.fetch(`
  *[
    _type == "post" &&
    !(_id in path("drafts.**")) &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now()
  ] | order(slug.current asc) {
    _id,
    title,
    "slug": slug.current,
    "noIndex": coalesce(seo.noIndex, false)
  }
`);

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const expectedSlugs = new Set();
for (const post of posts) {
  if (typeof post.slug !== "string" || !slugPattern.test(post.slug)) {
    errors.push(`Published post has an invalid export slug (${post._id}).`);
    continue;
  }
  if (expectedSlugs.has(post.slug)) errors.push(`Duplicate published slug: ${post.slug}`);
  expectedSlugs.add(post.slug);

  const articlePath = path.join(outputDirectory, "writing", post.slug, "index.html");
  if (!(await exists(articlePath))) {
    errors.push(`Published article was not exported: /writing/${post.slug}/`);
    continue;
  }

  const articleHtml = await readFile(articlePath, "utf8");
  if (!articleHtml.includes("<article")) errors.push(`Article markup missing for ${post.slug}.`);
  if (!articleHtml.includes("application/ld+json") || !articleHtml.includes("BlogPosting")) {
    errors.push(`BlogPosting JSON-LD missing for ${post.slug}.`);
  }
  if (!articleHtml.includes(escapeHtmlText(post.title))) {
    errors.push(`Article title/content missing from exported HTML for ${post.slug}.`);
  }
  if (!articleHtml.includes("https://ketangoyal.me")) {
    errors.push(`Production metadata origin missing from ${post.slug}.`);
  }
  if (articleHtml.includes("drafts.")) errors.push(`Draft identifier leaked into ${post.slug}.`);
  if (post.noIndex && !articleHtml.includes("noindex")) {
    errors.push(`No-index metadata missing for ${post.slug}.`);
  }
}

const writingDirectory = path.join(outputDirectory, "writing");
const exportedWritingEntries = (await readdir(writingDirectory, {withFileTypes: true}))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((slug) => slugPattern.test(slug));

for (const slug of exportedWritingEntries) {
  if (!expectedSlugs.has(slug)) errors.push(`Unexpected writing export not in published Sanity data: ${slug}`);
}

const sitemap = await readFile(path.join(outputDirectory, "sitemap.xml"), "utf8");
for (const post of posts) {
  const articleUrl = `https://ketangoyal.me/writing/${post.slug}`;
  if (post.noIndex && sitemap.includes(articleUrl)) {
    errors.push(`No-index post appears in sitemap: ${post.slug}`);
  }
  if (!post.noIndex && !sitemap.includes(articleUrl)) {
    errors.push(`Indexable post missing from sitemap: ${post.slug}`);
  }
}

const representativeFiles = [
  "index.html",
  "writing/index.html",
  "404.html",
  "sitemap.xml",
  "robots.txt",
];
for (const relativePath of representativeFiles) {
  const content = await readFile(path.join(outputDirectory, relativePath), "utf8");
  if (/localhost|\.github\.io/i.test(content)) {
    errors.push(`Non-production origin found in ${relativePath}.`);
  }
}

const homeHtml = await readFile(path.join(outputDirectory, "index.html"), "utf8");
const writingHtml = await readFile(path.join(outputDirectory, "writing", "index.html"), "utf8");
const notFoundHtml = await readFile(path.join(outputDirectory, "404.html"), "utf8");
if (!homeHtml.includes("https://ketangoyal.me")) errors.push("Homepage production metadata is missing.");
if (!writingHtml.includes("https://ketangoyal.me/writing")) errors.push("Writing canonical metadata is missing.");
if (!notFoundHtml.includes("noindex")) errors.push("Exported 404 page is missing noindex metadata.");

const robots = await readFile(path.join(outputDirectory, "robots.txt"), "utf8");
if (!robots.includes("Sitemap: https://ketangoyal.me/sitemap.xml")) {
  errors.push("robots.txt does not reference the production sitemap.");
}

const cname = (await readFile(path.join(outputDirectory, "CNAME"), "utf8")).trim();
if (cname !== "ketangoyal.me") errors.push("CNAME must contain only ketangoyal.me.");

const htmlFiles = await collectFiles(outputDirectory, (filePath) => filePath.endsWith(".html"));
await verifyInternalReferences(htmlFiles);

notes.push(`Verified ${htmlFiles.length} exported HTML files.`);
notes.push(
  `Verified ${posts.length} published article export(s); ${posts.filter((post) => post.noIndex).length} no-index.`,
);

if (errors.length > 0) {
  console.error("Static export verification failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("Static export verification passed.");
  for (const note of notes) console.log(`- ${note}`);
}
