/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E85D04',
          dark: '#DC2F02',
          light: '#FFBA08',
        },
        secondary: '#F48C06',
        bg: {
          light: '#FFF9F5',
          dark: '#141416',
        },
        card: {
          light: '#FFFFFF',
          dark: '#1F1F24',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#26262C',
        },
        txt: {
          light: '#222222',
          muted: '#777777',
          dark: '#F5F5F7',
          mutedDark: '#A0A0A8',
        },
        border: {
          light: '#EEEEEE',
          dark: '#2E2E35',
        },
        semantic: {
          error: '#D32F2F',
          success: '#388E3C',
          warning: '#F57C00',
          info: '#1976D2',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        'sm': '8px',
        'button': '14px',
        'card': '18px',
        'input': '16px',
        'xl': '24px',
        'full': '9999px',
      },
      boxShadow: {
        'soft-light': '0 6px 16px rgba(232, 93, 4, 0.07), 0 2px 6px rgba(0, 0, 0, 0.03)',
        'soft-dark': '0 4px 12px rgba(0, 0, 0, 0.3)',
        'primary-glow': '0 8px 18px rgba(232, 93, 4, 0.35)',
        'dropdown': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
