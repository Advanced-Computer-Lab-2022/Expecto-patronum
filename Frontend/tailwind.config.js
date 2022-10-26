/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {


    extend: {
      colors: {
        MainColor: '',
        'SecondaryColor': '',


        // ...
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp'),
  ],
}

