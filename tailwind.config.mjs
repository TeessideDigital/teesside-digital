/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // V1 aliases bridge components to the single semantic source in tokens.css.
        // Identity is deliberately separate from readable action/focus roles.
        background: 'rgb(var(--color-canvas) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'surface-raised': 'rgb(var(--color-surface-subtle) / <alpha-value>)',
        'text-primary': 'rgb(var(--color-text) / <alpha-value>)',
        'text-secondary': 'rgb(var(--color-text-muted) / <alpha-value>)',
        accent: 'rgb(var(--color-action) / <alpha-value>)',
        'accent-hover': 'rgb(var(--color-action-hover) / <alpha-value>)',
        'accent-text': 'rgb(var(--color-action) / <alpha-value>)',
        identity: 'rgb(var(--color-identity) / <alpha-value>)',
        'on-action': 'rgb(var(--color-on-action) / <alpha-value>)',
        border: 'rgb(var(--color-rule) / <alpha-value>)',
        focus: 'rgb(var(--color-focus) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        error: 'rgb(var(--color-error) / <alpha-value>)',
        control: 'rgb(var(--color-control) / <alpha-value>)',
        'control-border': 'rgb(var(--color-control-border) / <alpha-value>)',
      },

      fontFamily: {
        sans: ['var(--font-body)'],
      },

      fontSize: {
        // Headings
        'h1': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['2.25rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '500' }],
        // Body
        'body': ['var(--text-body)', { lineHeight: 'var(--leading-body)', fontWeight: '400' }],
        'body-sm': ['var(--text-small)', { lineHeight: 'var(--leading-body)', fontWeight: '400' }],
      },

      spacing: {
        // Standard Tailwind spacing + custom values for sections
        '72': '18rem',
      },

      maxWidth: {
        '6xl': 'var(--layout-max)',
      },

      borderRadius: {
        DEFAULT: '0.375rem',
        lg: '0.5rem',
      },

      borderWidth: {
        DEFAULT: 'var(--rule-width)',
      },

      opacity: {
        '15': '0.15',
      },

      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
