import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Placeholder until the real Netlify site exists -- canonical tags and the
  // sitemap both derive from this one value, so update it the moment a real
  // subdomain or domain is assigned (PROJECT_BRIEF.md, Section 5).
  site: 'https://north-east-joinery.netlify.app',
  output: 'static',
  integrations: [
    // applyBaseStyles: false because globals.css owns the @tailwind directives;
    // letting the integration inject its own base sheet would duplicate them.
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
});
