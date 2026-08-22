import {RocketIcon} from '@sanity/icons/Rocket'
import {defineField, defineType} from 'sanity'

export const krafttCta = defineType({
  name: 'krafttCta',
  title: 'Kraftt Digital CTA',
  type: 'object',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'ctaType',
      title: 'CTA type',
      type: 'string',
      options: {
        list: [
          {title: 'General', value: 'general'},
          {title: 'Website and digital systems', value: 'website'},
          {title: 'Practical AI automation', value: 'automation'},
          {title: 'Project conversation', value: 'project'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'supportingText',
      title: 'Supporting text',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: 'linkLabel',
      title: 'Link label',
      type: 'string',
      validation: (rule) => rule.required().max(50),
    }),
    defineField({
      name: 'linkDestination',
      title: 'Link destination',
      type: 'url',
      initialValue: 'https://krafttdigital.in',
      validation: (rule) =>
        rule.required().uri({scheme: ['http', 'https']}).error('Enter a complete http:// or https:// URL.'),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'ctaType'},
  },
})
