/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

const rotateY = plugin(function ({ addUtilities }) {
  addUtilities({
    '.rotate-y-180': {
      transform: 'rotateY(180deg)',
    },
  })
})

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  theme: {
    extend: {
      keyframes: {
        Fly: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        FlyOutRightAndDisapear: {
          '0%': { transform: 'translateX(0%)', opacity: 1 },
          '50%': { transform: 'translateX(100%)', opacity: 0.5 },
          '100%': { transform: 'translateX(100%)', opacity: 0 },
        },

        FlyIn: {
          //at 0 the element doesnt apear as it is at the right of the screen and it is rotated  73 degree and then it goes to the left and it is rotated -73 degree and then translate up and down 20px
          //AFter that it goes to the left and it is rotated -10 degree and then it goes to the right and it is rotated 10 degree forever
          '0%': { transform: 'translateX(100%) rotate(73deg)' },
          '50%': { transform: 'translateX(-10%) rotate(-10deg)' },
          '100%': { transform: 'translateX(0%) rotate(0deg)', },
        },
        RotateLeftRightAnime: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(2deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        FlyInRight: {
          '0%': { transform: 'translateX(100%) ' },
          '50%': { transform: 'translateX(-10%) ' },
          '100%': { transform: 'translateX(0%) ' },
        },
        FlyInLeft: {
          '0%': { transform: 'translateX(-100%) ' },
          '50%': { transform: 'translateX(10%) ' },
          '100%': { transform: 'translateX(0%) ' },
        },


      },
      animation: {
        // Bounces 5 times 1s equals 5 seconds
        'spinSlow': 'spin 4s ease-in-out infinite',
        'bounceSlow': 'bounce 4s ease-in-out 4',
        'FlyAnim': 'Fly 4s ease-in-out infinite',
        "FlyInAnim": "FlyIn 4s ease-in-out 1",
        "LeftRightAnim": "RotateLeftRightAnime 6s ease-in-out infinite",
        "FlyInRightAnim": "FlyInRight 2s ease-in-out 1",
        "FlyInLeftAnim": "FlyInLeft 1s ease-in-out 1,",

        //Add FlyinLeft after a delay of 1 second and then add FlyInAnim after a delay of 4 seconds

      },
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
        'from-mob-to-sb': { 'min': '575px', 'max': '856px' },
        '1030': { 'max': '1030px' },
        '1031': '1031px',
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
        "Dark": "linear-gradient(#222222, #202126)",
      }),
      textShadow: {
        'engraved': 'rgba(255, 255, 255, 0.15) 0.5px 1px 0.5px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-textshadow'),
    rotateY,
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        }
      );
    }),
  ],
}