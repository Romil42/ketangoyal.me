import {BlockContentIcon} from '@sanity/icons/BlockContent'
import {defineArrayMember, defineType} from 'sanity'

export const articleBody = defineType({
  name: 'articleBody',
  title: 'Article body',
  type: 'array',
  icon: BlockContentIcon,
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Paragraph', value: 'normal'},
        {title: 'Heading 2', value: 'h2'},
        {title: 'Heading 3', value: 'h3'},
        {title: 'Heading 4', value: 'h4'},
        {title: 'Blockquote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet list', value: 'bullet'},
        {title: 'Numbered list', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
          {title: 'Inline code', value: 'code'},
        ],
        annotations: [
          defineArrayMember({type: 'externalLink'}),
          defineArrayMember({type: 'internalLink'}),
        ],
      },
    }),
    defineArrayMember({type: 'inlineImage'}),
    defineArrayMember({type: 'callout'}),
    defineArrayMember({type: 'codeBlock'}),
    defineArrayMember({type: 'numberedProcess'}),
    defineArrayMember({type: 'comparisonTable'}),
    defineArrayMember({type: 'krafttCta'}),
    defineArrayMember({type: 'relatedResource'}),
  ],
})
