/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F27A44',
        'primary-dark': '#D45F2C',
        secondary: '#FFE8D4',
        accent: '#5A3E36',
        'accent-light': '#A14120',
        cream: '#FFF6EC',
        'cream-dark': '#D9B08C'
      },
      fontFamily: {
        'sans': ['Poppins', 'system-ui', 'sans-serif'],
        'display': ['Playfair Display', 'serif']
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem'
      }
    },
  },
  plugins: [],
}