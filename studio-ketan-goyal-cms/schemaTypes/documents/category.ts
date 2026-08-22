import {TagIcon} from '@sanity/icons/Tag'
import {defineField, defineType} from 'sanity'

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'A clear editorial category such as Engineering, Business, or Experiments.',
      validation: (rule) => rule.required().min(2).max(60),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used in category links and filters. Generate it from the title.',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'A short explanation of what belongs in this category.',
      validation: (rule) => rule.max(240).warning('Short descriptions are easier to scan.'),
    }),
  ],
  preview: {
    select: {title: 'title', description: 'description'},
    prepare({title, description}) {
      return {title, subtitle: description || 'No category description yet'}
    },
  },
})
