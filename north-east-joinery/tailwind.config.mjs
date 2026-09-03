/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      // Palette from PROJECT_BRIEF.md Section 7 -- already decided, do not
      // redesign. Contrast notes (WCAG 2.2 AA, measured against these hexes):
      //   ebonised on linen      15.0:1  fine everywhere
      //   text-secondary/linen    5.6:1  passes AA for body text
      //   text-secondary/surface  5.0:1  passes AA for body text
      //   brass on linen          4.1:1  LARGE text and non-text only (3:1)
      //   white on brass          4.6:1  passes AA -- hence white button text
      //   linen on brass          4.1:1  fails AA for button-sized text
      colors: {
        linen: '#F6F2EA',
        ebonised: '#211A14',
        surface: '#ECE4D3',
        'text-secondary': '#6B5D4A',
        brass: '#9C6B2E',
        'brass-hover': '#B27F3B',
        heritage: '#2B3A2F',
        border: '#D8CDBA',
      },
      fontFamily: {
        display: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
