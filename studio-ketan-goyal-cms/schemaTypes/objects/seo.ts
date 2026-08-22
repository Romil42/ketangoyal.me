import {SearchIcon} from '@sanity/icons/Search'
import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'Search and social settings',
  type: 'object',
  icon: SearchIcon,
  options: {collapsible: true, collapsed: false},
  fields: [
    defineField({
      name: 'title',
      title: 'SEO title',
      type: 'string',
      description: 'Optional search-result title. Leave blank to use the article title. Around 50–60 characters usually reads well.',
      validation: (rule) => rule.max(70).warning('Search engines may shorten titles over 70 characters.'),
    }),
    defineField({
      name: 'description',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'Optional search summary. Leave blank to use the article excerpt. Aim for useful, natural copy rather than keyword stuffing.',
      validation: (rule) => rule.max(180).warning('Search engines may shorten descriptions over 180 characters.'),
    }),
    defineField({
      name: 'image',
      title: 'Social / OG image',
      type: 'image',
      description: 'Optional social-sharing image. The featured image is used when this is empty.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Only set this when another URL should be treated as the original version of this article.',
      validation: (rule) =>
        rule.uri({scheme: ['http', 'https']}).error('Enter a complete URL beginning with http:// or https://'),
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false,
      description: 'Adds no-index instructions and removes the article from the sitemap. The URL remains publicly accessible.',
    }),
  ],
})
