import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
    // Site URL (required for canonical URLs and social sharing)
  site: 'https://teessidedigital.uk ', // Change to https://teessidedigital.uk in production

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
  },

  // Trailingslash: 'never' keeps URLs clean (index.html not shown)
  trailingSlash: 'never',

  // Prefetch configuration
  prefetch: {
    prefetchAll: true,
  },
});
