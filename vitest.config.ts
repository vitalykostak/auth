/// <reference types="vitest" />
/// <reference types="vite/client" />
import 'reflect-metadata';

import path from 'path';
import { defineConfig, mergeConfig } from 'vite';
import viteConfig from './vite.config';

export default defineConfig(
  mergeConfig(viteConfig, {
    test: {
      global: true,
      environment: 'jsdom',
      setupFiles: './setupTest.js',
    },
  })
);
