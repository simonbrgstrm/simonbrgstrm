import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://simonbrgstrm.se',
  output: 'static',
  compressHTML: true,
  trailingSlash: 'always',
  vite: {
    server: {
      watch: {
        // Avoid exhausted native inotify instances on shared Linux hosts.
        usePolling: true,
        interval: 500,
      },
    },
  },
});
