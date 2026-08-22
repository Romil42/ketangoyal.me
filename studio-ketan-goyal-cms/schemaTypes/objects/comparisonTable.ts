import {ThLargeIcon} from '@sanity/icons/ThLarge'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const comparisonTable = defineType({
  name: 'comparisonTable',
  title: 'Comparison table',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'columnHeaders',
      title: 'Column headers',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'Add between two and six short column labels.',
      validation: (rule) => rule.required().min(2).max(6),
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'comparisonRow',
          title: 'Row',
          type: 'object',
          fields: [
            defineField({
              name: 'cells',
              title: 'Cells',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
              validation: (rule) => rule.required().min(2).max(6),
            }),
          ],
          preview: {
            select: {cells: 'cells'},
            prepare({cells}) {
              return {title: Array.isArray(cells) ? cells.join(' · ') : 'Empty row'}
            },
          },
        }),
      ],
      validation: (rule) => [
        rule.required().min(1).max(30),
        rule.custom((rows, context) => {
          if (!Array.isArray(rows)) return true

          const columnHeaders = (context.parent as {columnHeaders?: unknown[]})?.columnHeaders
          if (!Array.isArray(columnHeaders)) return true

          const mismatchedRow = rows.findIndex((row) => {
            const cells = (row as {cells?: unknown[]})?.cells
            return !Array.isArray(cells) || cells.length !== columnHeaders.length
          })

          return mismatchedRow === -1
            ? true
            : `Row ${mismatchedRow + 1} must contain ${columnHeaders.length} cells.`
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title', rows: 'rows'},
    prepare({title, rows}) {
      return {
        title: title || 'Comparison table',
        subtitle: `${Array.isArray(rows) ? rows.length : 0} rows`,
      }
    },
  },
})
