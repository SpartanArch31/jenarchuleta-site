import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';
import { projectId, dataset, apiVersion } from './app/sanity/env';

// Studio is embedded in the Next app at jenarchuleta.com/studio.
export default defineConfig({
  name: 'jenarchuleta',
  title: 'Jen Archuleta — Journal',
  basePath: '/studio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
