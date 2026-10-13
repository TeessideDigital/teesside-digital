import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
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
  // Preserve Astro 5 whitespace compression during the framework migration.
  compressHTML: true,

  // Integrations
  integrations: [
    // Generates sitemap-index.xml + sitemap-0.xml at build time from every
    // static route Astro renders. Uses the `site` URL above as the base --
    // if that value is ever wrong, the sitemap silently ships wrong URLs
    // too, so there is only one source of truth to keep correct.
    sitemap(),
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
        '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      },
    },
  },

  // Every URL ends in a slash, matching the site's own links, the canonicals
  // and the sitemap. Netlify redirects the bare form to it.
  trailingSlash: 'always',

  // Prefetch configuration
  prefetch: {
    prefetchAll: true,
  },
});
