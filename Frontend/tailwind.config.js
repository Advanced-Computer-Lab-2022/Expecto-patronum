/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      MainColor: '',
      'SecondaryColor': '',
      CardsGradient: {
        YellowL: "#ff930f",
        YellowR: "#fff95b",
        BlueL: "#0061ff",
        BlueR: "#60efff",



      },

      // ...
    },

    extend: {},
  },
  plugins: [],
}

