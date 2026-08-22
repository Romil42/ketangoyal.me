import {LinkIcon} from '@sanity/icons/Link'
import {defineField, defineType} from 'sanity'

export const externalLink = defineType({
  name: 'externalLink',
  title: 'External link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'href',
      title: 'URL',
      type: 'url',
      validation: (rule) =>
        rule.required().uri({scheme: ['http', 'https', 'mailto']}).error('Enter a valid web or email URL.'),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in a new tab',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
