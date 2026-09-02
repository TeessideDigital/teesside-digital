import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { fileURLToPath } from 'node:url';

export default defineConfig({
    // Site URL (required for canonical URLs and social sharing)
  site: 'https://teessidedigital.uk', // trailing space removed -- was accidentally left in, and while the URL parser tolerates it silently, it's not something to leave sitting in config

  // Server configuration
  server: {
    port: 3000,
  },

  // Output mode: static (pre-render all pages at build time)
  output: 'static',

  // Integrations
  integrations: [
    react({
      // Only hydrate React components on the client when necessary (islands)
      experimentalReactChildren: true,
    }),
    tailwind(),
  ],

  // Image optimization
  image: {
    // Optimize images during build
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

  // Markdown processing
  markdown: {
    // Use shiki for syntax highlighting (built-in to Astro)
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark',
      wrap: false,
    },
  },

  // Vite configuration (build tool settings)
  vite: {
    ssr: {
      external: ['react', 'react-dom'],
    },
    // Explicit aliases matching tsconfig.json's "paths", defined directly
    // here rather than relying on Astro's automatic tsconfig-paths-to-Vite
    // wiring. That implicit mechanism depends on tsconfig.json being
    // correctly present and synced in every environment; a build that
    // works locally (possibly against a stale dev-server cache) can still
    // fail on a clean CI/Netlify build if that file is out of sync. Explicit
    // aliases here are unambiguous and can't silently drift out of step
    // with what actually gets deployed.
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
        '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
        '@config': fileURLToPath(new URL('./src/config', import.meta.url)),
        '@data': fileURLToPath(new URL('./src/data', import.meta.url)),
        '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      },
    },
  },

  // Trailingslash: 'never' keeps URLs clean (index.html not shown)
  trailingSlash: 'never',

  // Prefetch configuration
  prefetch: {
    prefetchAll: true,
  },
});
