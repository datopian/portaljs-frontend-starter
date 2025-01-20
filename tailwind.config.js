const colors = require("tailwindcss/colors");
const Color = require("color");
const defaultTheme = require("tailwindcss/defaultTheme");

const themeColor = process.env.NEXT_PUBLIC_THEME_COLOR || "#4977AB";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./themes/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  safelist: ["bg-red-500", "text-3xl", "lg:text-4xl"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: themeColor,
          50: Color(themeColor).mix(Color("#ffffff"), 0.95).hex(), // 90% white, 10% theme color
          100: Color(themeColor).mix(Color("#ffffff"), 0.9).hex(), // 90% white, 10% theme color
          200: Color(themeColor).mix(Color("#ffffff"), 0.7).hex(), // 70% white, 30% theme color
          300: Color(themeColor).mix(Color("#ffffff"), 0.5).hex(), // 50% white, 50% theme color
          400: Color(themeColor).mix(Color("#ffffff"), 0.3).hex(), // 30% white, 70% theme color
          500: themeColor, // Base color
          600: Color(themeColor).mix(Color("#000000"), 0.3).hex(), // 30% black, 70% theme color
          700: Color(themeColor).mix(Color("#000000"), 0.5).hex(), // 50% black, 50% theme color
          800: Color(themeColor).mix(Color("#000000"), 0.7).hex(), // 70% black, 30% theme color
        },
        lightaccent: Color(themeColor).lighten(0.3).hex(), // Lighten by 20%
        darkaccent: Color(themeColor).darken(0.3).hex(), // Darken by 20%
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
