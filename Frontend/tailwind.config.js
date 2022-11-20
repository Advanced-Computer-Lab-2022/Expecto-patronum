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
        'CTA-shade': '#FF3636',
        'CTA': '#D80621',
        'bright-gray': '#9F9F9F',
        'dark-gray': '#222222',
      },
      scale: {
        '200': '2',
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
        'top-color': 'top, color',
        'bg': 'background-color',
      },
      screens: {
        'nv': '934px',
        'mob': { 'max': '574px' },
        'not-mob': '575px',
        '3lg': '1275px',
        'lg': '1024px',
        '3xl': '1665px',
        '2xl-max': { 'max': '1535px' },
        'xl-max': { 'max': '1279px' },
        'lg-max': { 'max': '1023px' },
        'md-max': { 'max': '767px' },
        'sm-max': { 'max': '639px' },
        'nv-max': { 'max': '935px' },
        'sb-max': { 'max': '856px' },
        'nv-max-mob': { 'min': '451px', 'max': '935px' },
        '1030': { 'max': '1030px' },
      },
      zIndex: {
        'behind': '-1',
        'last': '-100',
      },
      spacing: {
        '26': '6.5rem',
        '700': '37rem',
        '800': '55rem',
        '18': '4.5rem',
        '1.25': '0.325rem',
        '6.5': '1.55rem',
        '2.75': '0.7rem',
        '19': '4.75rem',
        '27': '6.95rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '39': '9.75rem',
        'fullscreen': 'calc(100vw - 16.667px)',
        'beside-sidebar': 'calc(100% - 3.5rem)',
        'screen-2.5': '2.5vw',
        'negative-80': '-20rem',
        '-50px': '-50px',
        'negative-4': '-1rem',
        'initial': 'initial',
        '22': '5.5rem',
        '30': '7.5rem',
        '13': '3.25rem'
      },
      fontSize: {
        'hover': "1.025rem",
      },
      minWidth: {
        'form-input': '8.9rem',
        'form-page': '18.75rem',
        '64': '16rem',
      },
      borderWidth: {
        'radio-width': '0.7vw',
        'radio-border-width': '0.2vw',
        'icon-outline': '0.25px',
        'px': '1px',
        '1.5': '1.5px',
        '3': '3px',
      },
      boxShadow: {
        'radio-button': '0px 0px 5px #0088A8',
      },
      borderRadius: {
        'half': '50%',
      },
      minHeight: {
        '40': '10rem',
      },
      rotate: {
        'negative-90': '-90deg',
        'negative-180': '-180deg',
        '25': '25deg',
        'neg-25': '-25deg',
      },
      skew: {
        '40': '40deg',
        'neg-40': '-40deg',
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp'),
  ],
}