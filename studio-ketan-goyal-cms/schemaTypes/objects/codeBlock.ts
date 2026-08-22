import {CodeBlockIcon} from '@sanity/icons/CodeBlock'
import {defineField, defineType} from 'sanity'

export const codeBlock = defineType({
  name: 'codeBlock',
  title: 'Code block',
  type: 'object',
  icon: CodeBlockIcon,
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          {title: 'Plain text', value: 'text'},
          {title: 'Bash / shell', value: 'bash'},
          {title: 'CSS', value: 'css'},
          {title: 'HTML', value: 'html'},
          {title: 'JavaScript', value: 'javascript'},
          {title: 'JSON', value: 'json'},
          {title: 'PHP', value: 'php'},
          {title: 'SQL', value: 'sql'},
          {title: 'TypeScript', value: 'typescript'},
          {title: 'TSX', value: 'tsx'},
        ],
      },
      initialValue: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'filename',
      title: 'Filename',
      type: 'string',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'text',
      rows: 14,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      validation: (rule) => rule.max(220),
    }),
  ],
  preview: {
    select: {filename: 'filename', language: 'language', code: 'code'},
    prepare({filename, language, code}) {
      return {
        title: filename || 'Code block',
        subtitle: `${language || 'text'} · ${String(code || '').split('\n').length} lines`,
      }
    },
  },
})
