import {InfoOutlineIcon} from '@sanity/icons/InfoOutline'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const callout = defineType({
  name: 'callout',
  title: 'Callout',
  type: 'object',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'tone',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Information', value: 'information'},
          {title: 'Takeaway', value: 'takeaway'},
          {title: 'Warning', value: 'warning'},
          {title: 'Success', value: 'success'},
        ],
        layout: 'radio',
      },
      initialValue: 'information',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.max(100),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Inline code', value: 'code'},
            ],
            annotations: [
              defineArrayMember({type: 'externalLink'}),
              defineArrayMember({type: 'internalLink'}),
            ],
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {title: 'title', tone: 'tone'},
    prepare({title, tone}) {
      return {title: title || 'Callout', subtitle: tone || 'information'}
    },
  },
})
