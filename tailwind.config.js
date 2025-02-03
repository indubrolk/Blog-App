/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        primary: "#ff7015",
        dark:{
          hard: "#123456",
          soft: "#654321",
        },
      },
      fontFamily:{
        opensans: ["'Open Sans'", "serif"],
        roboto: ["'Roboto'", "serif"],

      },

    },
  },
  plugins: [],
};

