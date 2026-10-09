/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Academic, professional palette (deep green + gold accent)
        primary: {
          50: '#eefaf4',
          100: '#d6f1e2',
          200: '#afe3c7',
          300: '#7ecda6',
          400: '#4bad81',
          500: '#2c9066',
          600: '#1f7452',
          700: '#1b5d44',
          800: '#194a38',
          900: '#0f4c3a',
          950: '#082a20',
        },
        accent: {
          50: '#fdf8ee',
          100: '#faedcc',
          200: '#f4d894',
          300: '#eebd5c',
          400: '#e9a636',
          500: '#dd8a1e',
          600: '#c06a17',
          700: '#994e17',
          800: '#7c3e19',
          900: '#673518',
        },
      },
      borderRadius: {
        xl: '0.875rem',
      },
    },
  },
  plugins: [],
};
