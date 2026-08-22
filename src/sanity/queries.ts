import {defineQuery} from "groq";

const publishedPostFilter = /* groq */ `
  _type == "post" &&
  defined(slug.current) &&
  defined(publishedAt) &&
  publishedAt <= now()
`;

const imageFields = /* groq */ `
  asset->{
    _id,
    url,
    metadata{
      lqip,
      dimensions{width, height, aspectRatio}
    }
  },
  crop,
  hotspot
`;

const readingBodyFields = /* groq */ `
  "readingBody": body[]{
    _key,
    _type,
    children[]{text},
    _type == "callout" => {
      title,
      body[]{children[]{text}}
    },
    _type == "codeBlock" => {code, caption},
    _type == "numberedProcess" => {
      title,
      steps[]{title, body}
    },
    _type == "comparisonTable" => {
      title,
      columnHeaders,
      rows[]{cells}
    },
    _type == "krafttCta" => {title, supportingText},
    _type == "relatedResource" => {title, description}
  }
`;

const cardFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  contentType,
  category->{
    _id,
    title,
    "slug": slug.current
  },
  tags,
  publishedAt,
  _updatedAt,
  featured,
  featuredImage{
    ${imageFields}
  },
  featuredImageAlt,
  featuredImageCaption,
  ${readingBodyFields}
`;

const portableTextFields = /* groq */ `
  _key,
  _type,
  ...,
  markDefs[]{
    ...,
    _type == "internalLink" => {
      "slug": reference->slug.current
    }
  },
  _type == "inlineImage" => {
    ${imageFields},
    alt,
    caption
  },
  _type == "callout" => {
    tone,
    title,
    body[]{
      ...,
      markDefs[]{
        ...,
        _type == "internalLink" => {
          "slug": reference->slug.current
        }
      }
    }
  },
  _type == "numberedProcess" => {
    title,
    steps[]{_key, title, body}
  },
  _type == "comparisonTable" => {
    title,
    columnHeaders,
    rows[]{_key, cells}
  }
`;

export const ALL_WRITING_QUERY = defineQuery(/* groq */ `
  *[${publishedPostFilter}]
  | order(featured desc, publishedAt desc, _id asc){
    ${cardFields}
  }
`);

export const FEATURED_WRITING_QUERY = defineQuery(/* groq */ `
  *[${publishedPostFilter} && featured == true]
  | order(publishedAt desc, _id asc)[0]{
    ${cardFields}
  }
`);

export const LATEST_WRITING_QUERY = defineQuery(/* groq */ `
  *[${publishedPostFilter}]
  | order(publishedAt desc, _id asc)[0...3]{
    ${cardFields}
  }
`);

export const WRITING_BY_CATEGORY_QUERY = defineQuery(/* groq */ `
  *[${publishedPostFilter} && category._ref == $categoryId]
  | order(publishedAt desc, _id asc){
    ${cardFields}
  }
`);

export const POST_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[${publishedPostFilter} && slug.current == $slug][0]{
    ${cardFields},
    body[]{
      ${portableTextFields}
    },
    seo{
      title,
      description,
      canonicalUrl,
      noIndex,
      image{${imageFields}}
    },
    krafttCtaType,
    "relatedPosts": array::compact(
      relatedPosts[]->[
        ${publishedPostFilter}
      ]{
        ${cardFields}
      }
    )
  }
`);

export const POST_METADATA_QUERY = defineQuery(/* groq */ `
  *[${publishedPostFilter} && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    _updatedAt,
    featuredImage{${imageFields}},
    featuredImageAlt,
    seo{
      title,
      description,
      canonicalUrl,
      noIndex,
      image{${imageFields}}
    }
  }
`);

export const ALL_POST_SLUGS_QUERY = defineQuery(/* groq */ `
  *[${publishedPostFilter}]
  | order(publishedAt desc){
    "slug": slug.current
  }
`);

export const RELATED_POSTS_QUERY = defineQuery(/* groq */ `
  *[${publishedPostFilter} && _id in $ids]
  | order(publishedAt desc, _id asc)[0...3]{
    ${cardFields}
  }
`);

export const ADJACENT_POSTS_QUERY = defineQuery(/* groq */ `
  {
    "previous": *[${publishedPostFilter} && publishedAt < $publishedAt]
      | order(publishedAt desc, _id asc)[0]{${cardFields}},
    "next": *[${publishedPostFilter} && publishedAt > $publishedAt]
      | order(publishedAt asc, _id asc)[0]{${cardFields}}
  }
`);

export const CATEGORIES_QUERY = defineQuery(/* groq */ `
  *[_type == "category" && defined(slug.current)]
  | order(title asc){
    _id,
    title,
    "slug": slug.current,
    description,
    "postCount": count(*[${publishedPostFilter} && category._ref == ^._id])
  }
`);

export const SITEMAP_POSTS_QUERY = defineQuery(/* groq */ `
  *[${publishedPostFilter} && coalesce(seo.noIndex, false) == false]
  | order(publishedAt desc){
    "slug": slug.current,
    _updatedAt,
    featuredImage{asset->{_id}}
  }
`);
