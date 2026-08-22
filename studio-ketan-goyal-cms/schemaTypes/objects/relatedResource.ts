import {LaunchIcon} from '@sanity/icons/Launch'
import {defineField, defineType} from 'sanity'

export const relatedResource = defineType({
  name: 'relatedResource',
  title: 'Related resource or tool',
  type: 'object',
  icon: LaunchIcon,
  fields: [
    defineField({
      name: 'resourceType',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Resource', value: 'resource'},
          {title: 'Tool', value: 'tool'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(320),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) =>
        rule.required().uri({scheme: ['http', 'https']}).error('Enter a complete http:// or https:// URL.'),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'resourceType'},
  },
})
