/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "navbar": "#24252A",
        "navlink": "#D7D8DD",
        "navlink-bg": "#0088A8",
        "searchFocus": "#226679",
      },
      scale: {
        '160': '1.60',
      },
      transitionProperty: {
        'outline-width': 'outline-width'
      }
    },
  },
  plugins: [],
}