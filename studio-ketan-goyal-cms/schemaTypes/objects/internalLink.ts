import {LinkIcon} from '@sanity/icons/Link'
import {defineField, defineType} from 'sanity'

export const internalLink = defineType({
  name: 'internalLink',
  title: 'Internal writing link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'reference',
      title: 'Writing entry',
      type: 'reference',
      to: [{type: 'post'}],
      validation: (rule) => rule.required(),
    }),
  ],
})
