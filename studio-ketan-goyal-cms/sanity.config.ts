import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET

if (!projectId || !dataset) {
  throw new Error(
    'Missing SANITY_STUDIO_PROJECT_ID or SANITY_STUDIO_DATASET. Copy .env.example to .env.local and provide both values.',
  )
}

export default defineConfig({
  name: 'default',
  title: 'Ketan Goyal CMS',

  projectId,
  dataset,

  plugins: [structureTool({structure})],

  schema: {
    types: schemaTypes,
  },
})
