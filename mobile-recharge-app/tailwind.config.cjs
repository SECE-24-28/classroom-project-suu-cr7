/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#58545F',
        secondary: '#A97882',
        background: '#F9FAFB',
        textColor: '#374151',
      }
    },
  },
  plugins: [],
}