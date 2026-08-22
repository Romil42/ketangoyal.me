import {OlistIcon} from '@sanity/icons/Olist'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const numberedProcess = defineType({
  name: 'numberedProcess',
  title: 'Numbered process',
  type: 'object',
  icon: OlistIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'steps',
      title: 'Process steps',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'processStep',
          title: 'Step',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Step title',
              type: 'string',
              validation: (rule) => rule.required().max(100),
            }),
            defineField({
              name: 'body',
              title: 'Step explanation',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required().max(600),
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'body'},
          },
        }),
      ],
      validation: (rule) => rule.required().min(2).max(12),
    }),
  ],
  preview: {
    select: {title: 'title', steps: 'steps'},
    prepare({title, steps}) {
      return {title, subtitle: `${Array.isArray(steps) ? steps.length : 0} steps`}
    },
  },
})
