/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Background & Surface
        background: '#0a0a0a',
        surface: '#161616',
        'surface-raised': '#222222',

        // Text
        'text-primary': '#f0f0f0',
        'text-secondary': '#9a9a9a',

        // Accent
        accent: '#5b7f9e',
        'accent-hover': '#6e93b5',

        // Border
        border: '#333333',

        // Status
        success: '#4caf50',
        warning: '#f5a623',
        error: '#e74c3c',
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        // Headings
        'h1': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['2.25rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '500' }],
        // Body
        'body': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
      },

      spacing: {
        // Standard Tailwind spacing + custom values for sections
        '72': '18rem',
      },

      maxWidth: {
        '6xl': '72rem',
      },

      borderRadius: {
        DEFAULT: '0.375rem',
        lg: '0.5rem',
      },

      borderWidth: {
        DEFAULT: '1px',
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
