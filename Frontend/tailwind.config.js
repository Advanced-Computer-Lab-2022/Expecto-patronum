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
        "semi-transparent": "rgba(255, 255, 255, 0.5)",
        "dark-semi-transparent": "rgba(0, 0, 0, 0.5)",
        "semi-transparent-border": "rgba(0, 136, 168, 0.5)",
        'calm-red': '#FF3636',
        'canadian-red': '#D80621',
        'bright-gray': '#9F9F9F',
        'dark-gray': '#222222',
        'main': '#F4F4F4',
        'input': '#083248',
      },
      scale: {
        '120': '1.2',
        '135': '1.35',
        '155': '1.55',
        '160': '1.60',
        '200': '2',
      },

      transitionProperty: {
        'navbar-anime': 'bottom, opacity',
        'bg': 'background-color',
      },
      screens: {
        'nv': '934px',
        'mob': { 'max': '574px' },
        'not-mob': '575px',
        '3lg': '1275px',
        '4lg': '1500px',
        'lg': '1024px',
        '3xl': '1665px',
        '2xl-max': { 'max': '1535px' },
        'xl-max': { 'max': '1279px' },
        'lg-max': { 'max': '1023px' },
        'md-max': { 'max': '767px' },
        'sm-max': { 'max': '639px' },
        'nv-max': { 'max': '935px' },
        'sb-max': { 'max': '856px' },
        'sb': '857px',
        'nv-max-mob': { 'min': '451px', 'max': '935px' },
        '1030': { 'max': '1030px' },
      },
      zIndex: {
        'behind': '-1',
        'last': '-100',
      },
      spacing: {
        '1.25': '0.325rem',
        '2.75': '0.7rem',
        '6.5': '1.55rem',
        '13': '3.25rem',
        '18': '4.5rem',
        '19': '4.75rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '27': '6.95rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '39': '9.75rem',
        '700': '37rem',
        '800': '55rem',
        'fullscreen': 'calc(100vw - 16.667px)',
        'beside-sidebar': 'calc(100% - 3.5rem)',
        'without-instructor-sidebar': 'calc(100% - 208px)',
        'without-instructor-sidebar-closed': 'calc(100vw - 56px)',
      },
      borderWidth: {
        'px': '1px',
        '1.5': '1.5px',
      },
      minWidth: {
        'without-instructor-sidebar-closed': 'calc(100vw - 56px)',
      },
      backgroundImage: theme => ({
        'All': "linear-gradient(#2B32B2, #1488CC)",
        'Beg': "linear-gradient(#2f8608, #52EB0E)",
        'Int': "linear-gradient(#C29904, #FDE143)",
        'Adv': "linear-gradient(#B20000, #FF4542)",

      }),

    },
  },
  plugins: [require('@tailwindcss/line-clamp'),
  ],
}