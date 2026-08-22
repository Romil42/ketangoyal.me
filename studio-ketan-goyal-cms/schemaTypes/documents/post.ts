import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineArrayMember, defineField, defineType} from 'sanity'

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const contentTypeOptions = [
  {title: 'Build Log', value: 'buildLog'},
  {title: 'Guide', value: 'guide'},
  {title: 'Essay', value: 'essay'},
  {title: 'Case Study', value: 'caseStudy'},
  {title: 'Note', value: 'note'},
]

export const post = defineType({
  name: 'post',
  title: 'Writing',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'classification', title: 'Classification'},
    {name: 'media', title: 'Media'},
    {name: 'seo', title: 'SEO'},
    {name: 'connections', title: 'Connections'},
  ],
  initialValue: {
    featured: false,
    publishedAt: new Date().toISOString(),
    krafttCtaType: 'none',
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'The public article headline. Keep it specific and grounded.',
      validation: (rule) => rule.required().min(8).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      description: 'The article URL. Generate it from the title, then keep it stable after publishing.',
      options: {source: 'title', maxLength: 96},
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value?.current) return 'A slug is required'
          if (value.current.length > 96) return 'Keep the slug under 96 characters'
          return slugPattern.test(value.current)
            ? true
            : 'Use lowercase letters, numbers, and single hyphens only'
        }),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
      group: 'content',
      description: 'A concise summary used on Writing cards and as the default search description.',
      validation: (rule) => [
        rule.required().min(60).error('Write at least 60 characters so the article has a useful summary.'),
        rule.max(240).warning('Excerpts over 240 characters may be shortened in listings.'),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Article body',
      type: 'articleBody',
      group: 'content',
      description: 'Write the article and insert structured images, callouts, processes, tables, CTAs, or resources.',
      validation: (rule) => rule.required().min(1).error('Add article content before publishing.'),
    }),
    defineField({
      name: 'contentType',
      title: 'Content type',
      type: 'string',
      group: 'classification',
      description: 'Optional format label shown alongside the category.',
      options: {list: contentTypeOptions, layout: 'radio'},
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      group: 'classification',
      to: [{type: 'category'}],
      description: 'The primary subject area for this article.',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'classification',
      description: 'Add a few precise search and discovery terms. Press Enter after each tag.',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
      validation: (rule) => rule.unique().max(8).warning('Use no more than eight focused tags.'),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published date',
      type: 'datetime',
      group: 'classification',
      description: 'The public publication date. Future-dated entries remain hidden until this time.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured article',
      type: 'boolean',
      group: 'classification',
      description: 'Highlights this article on the Writing page. If several are featured, the newest is used first.',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured image',
      type: 'image',
      group: 'media',
      description: 'The primary image used on article cards and at the top of the article.',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredImageAlt',
      title: 'Featured image alternative text',
      type: 'string',
      group: 'media',
      description: 'Describe the image’s useful visual information for people who cannot see it.',
      validation: (rule) => rule.required().min(10).max(180),
    }),
    defineField({
      name: 'featuredImageCaption',
      title: 'Featured image caption',
      type: 'string',
      group: 'media',
      description: 'Optional visible context or image credit. This is separate from alternative text.',
      validation: (rule) => rule.max(220),
    }),
    defineField({
      name: 'seo',
      title: 'Search and social settings',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related writing',
      type: 'array',
      group: 'connections',
      description: 'Choose up to three genuinely useful follow-up articles.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'post'}],
          options: {
            filter: ({document}) => {
              const id = document._id.replace(/^drafts\./, '')
              return {
                filter: '_id != $id && _id != $draftId',
                params: {id, draftId: `drafts.${id}`},
              }
            },
          },
        }),
      ],
      validation: (rule) => rule.unique().max(3),
    }),
    defineField({
      name: 'krafttCtaType',
      title: 'Kraftt Digital closing CTA',
      type: 'string',
      group: 'connections',
      description: 'Optionally add a contextual Kraftt Digital invitation after the article.',
      options: {
        list: [
          {title: 'No closing CTA', value: 'none'},
          {title: 'Explore Kraftt Digital', value: 'explore'},
          {title: 'Discuss a project', value: 'project'},
          {title: 'Website and digital systems', value: 'website'},
          {title: 'Practical AI automation', value: 'automation'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Publication date, newest',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
      category: 'category.title',
      contentType: 'contentType',
      publishedAt: 'publishedAt',
      id: '_id',
    },
    prepare({title, media, category, contentType, publishedAt, id}) {
      const format = contentTypeOptions.find((option) => option.value === contentType)?.title
      const date = publishedAt
        ? new Intl.DateTimeFormat('en-IN', {dateStyle: 'medium'}).format(new Date(publishedAt))
        : 'No publication date'
      const state = typeof id === 'string' && id.startsWith('drafts.') ? 'Draft' : 'Published'

      return {
        title,
        media,
        subtitle: [state, category || format || 'Uncategorized', date].join(' · '),
      }
    },
  },
})
