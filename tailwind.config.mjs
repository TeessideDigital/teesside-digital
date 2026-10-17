/** @type {import('tailwindcss').Config} */
// Tailwind supplies the base reset. Colours and fonts point at the V4 tokens in
// src/styles/tokens.css, so a utility and a stylesheet always agree.
export default {
  content: ['./src/**/*.{astro,html,js,md,mdx,ts}'],
  // The word "fixed" appears in page copy, and the scanner reads it as the
  // position utility. Nothing on the site uses that class.
  blocklist: ['fixed'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        panel: 'var(--panel)',
        line: 'var(--line)',
        'line-2': 'var(--line-2)',
        fg: 'var(--fg)',
        'fg-2': 'var(--fg-2)',
        'fg-3': 'var(--fg-3)',
        'fg-4': 'var(--fg-4)',
        lime: 'var(--lime)',
        'lime-ink': 'var(--lime-ink)',
        warn: 'var(--warn)',
      },
      fontFamily: {
        sans: ['var(--display)'],
        mono: ['var(--mono)'],
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(.2,.7,.1,1)',
      },
    },
  },
  plugins: [],
};
