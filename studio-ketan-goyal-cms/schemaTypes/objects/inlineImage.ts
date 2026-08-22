import {ImageIcon} from '@sanity/icons/Image'
import {defineField, defineType} from 'sanity'

export const inlineImage = defineType({
  name: 'inlineImage',
  title: 'Inline image',
  type: 'image',
  icon: ImageIcon,
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      description: 'Describe the image’s useful visual information. Do not repeat the caption.',
      validation: (rule) => rule.required().min(10).max(180),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional visible context or credit.',
      validation: (rule) => rule.max(220),
    }),
  ],
})
