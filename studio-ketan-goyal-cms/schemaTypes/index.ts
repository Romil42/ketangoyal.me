import {category} from './documents/category'
import {post} from './documents/post'
import {articleBody} from './objects/articleBody'
import {callout} from './objects/callout'
import {codeBlock} from './objects/codeBlock'
import {comparisonTable} from './objects/comparisonTable'
import {externalLink} from './objects/externalLink'
import {inlineImage} from './objects/inlineImage'
import {internalLink} from './objects/internalLink'
import {krafttCta} from './objects/krafttCta'
import {numberedProcess} from './objects/numberedProcess'
import {relatedResource} from './objects/relatedResource'
import {seo} from './objects/seo'

export const schemaTypes = [
  category,
  post,
  seo,
  articleBody,
  externalLink,
  internalLink,
  inlineImage,
  callout,
  codeBlock,
  numberedProcess,
  comparisonTable,
  krafttCta,
  relatedResource,
]
