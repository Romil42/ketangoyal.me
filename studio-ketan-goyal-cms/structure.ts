import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {StarIcon} from '@sanity/icons/Star'
import {TagIcon} from '@sanity/icons/Tag'
import type {StructureResolver} from 'sanity/structure'

const contentTypes = [
  {title: 'Build Logs', value: 'buildLog'},
  {title: 'Guides', value: 'guide'},
  {title: 'Essays', value: 'essay'},
  {title: 'Case Studies', value: 'caseStudy'},
  {title: 'Notes', value: 'note'},
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Ketan Goyal CMS')
    .items([
      S.listItem()
        .title('Writing')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Writing')
            .items([
              S.documentTypeListItem('post').title('All writing').icon(DocumentTextIcon),
              S.listItem()
                .title('Featured writing')
                .icon(StarIcon)
                .child(
                  S.documentList()
                    .title('Featured writing')
                    .schemaType('post')
                    .filter('_type == "post" && featured == true'),
                ),
              S.divider(),
              ...contentTypes.map(({title, value}) =>
                S.listItem()
                  .title(title)
                  .child(
                    S.documentList()
                      .title(title)
                      .schemaType('post')
                      .filter('_type == "post" && contentType == $contentType')
                      .params({contentType: value}),
                  ),
              ),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem('category').title('Categories').icon(TagIcon),
    ])
