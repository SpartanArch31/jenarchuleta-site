import { defineCliConfig } from 'sanity/cli';
import { projectId, dataset } from './app/sanity/env';

export default defineCliConfig({ api: { projectId, dataset } });
