/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1B4B8A',
          yellow: '#FBBA00',
          red: '#DA291C'
        }
      }
    },
  },
  plugins: [],
};