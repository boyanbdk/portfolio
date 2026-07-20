// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://boyanbudakov.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'bg'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Never inline bundled scripts into the HTML — keeps the CSP in
      // public/_headers strict (script-src 'self' + one hashed inline guard).
      assetsInlineLimit: 0,
    },
  },
});
