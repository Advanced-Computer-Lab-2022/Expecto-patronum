/** @type {import('tailwindcss').Config} */
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
        "navbar": "#24252A",
        "navlink": "#D7D8DD",
        "navlink-bg": "#0088A8",
        "searchFocus": "#226679",
      },
      scale: {
        '160': '1.60',
        '155': '1.55',
        '135': '1.35',
        '120': '1.2',
      },
      transitionProperty: {
        'outline-width': 'outline-width',
        'width': 'width',
        'display': 'display',
        'bottom': 'bottom',
        'opacity': 'opacity',
        'transform': 'transform',
        'navbar-anime': 'bottom, opacity',
        'top': 'top',
      },
      screens: {
        'nv': '934px',
        '2xl-max': { 'max': '1535px' },
        'xl-max': { 'max': '1279px' },
        'lg-max': { 'max': '1023px' },
        'md-max': { 'max': '767px' },
        'sm-max': { 'max': '639px' },
        'nv-max': { 'max': '935px' },
      },
      zIndex: {
        'behind': '-1',
        'last': '-100',
      },
      spacing: {
        '26': '6.5rem',
        '700': '37rem',
        '18': '4.5rem',
        '1.25': '0.325rem',
        '6.5': '1.62rem',
        '2.75': '0.675rem',
      },
      fontSize: {
        'hover': "1.025rem",
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp'),
  ],
}
