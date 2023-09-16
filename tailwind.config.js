const colors = require("tailwindcss/colors");

const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: ["bg-red-500", "text-3xl", "lg:text-4xl"],
  theme: {
    extend: {
      colors: {
        accent: "#00BBC2",
        lightaccent: "#00bbc24d",
        darkaccent: "#00a8ae",
        darkbrown: "#A75001",
        darkerbrown: "#964800",
        background: {
          DEFAULT: colors.white,
          dark: colors.slate[900],
        },
        primary: {
          DEFAULT: colors.gray[700],
          dark: colors.gray[300],
        },
        secondary: {
          DEFAULT: "",
          dark: "",
        },
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        roboto: ["Roboto", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        raleway: ["raleway", "sans-serif"],
      },
      boxShadow: {
        blogImg: "inset 0 0 0 50vw rgba(0,28,49,0.76)",
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr))",
        8: "repeat(8, minmax(0, 1fr))",
        9: "repeat(9, minmax(0, 1fr))",
        10: "repeat(10, minmax(0, 1fr))",
        "searchpage-hero": "1fr 40px 40px auto",
        "frontpage-hero": "1fr 40px 40px auto",
        "datasetpage-hero": "fit-content(100ch) 50px fit-content(100ch)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
  plugins: [require("@tailwindcss/typography")],
};
