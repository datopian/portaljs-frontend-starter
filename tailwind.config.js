const colors = require("tailwindcss/colors");
const Color = require("color");
const defaultTheme = require("tailwindcss/defaultTheme");

const themeColor = process.env.NEXT_PUBLIC_THEME_COLOR || "#517fb5d9";

console.log("color:" + themeColor);

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./themes/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: ["bg-red-500", "text-3xl", "lg:text-4xl"],
  theme: {
    extend: {
      colors: {
        accent: {
          100: Color(themeColor).lighten(0.9).hex(), // Lightest shade
          200: Color(themeColor).lighten(0.7).hex(), // Lighter shade
          300: Color(themeColor).lighten(0.5).hex(), // Medium shade
          400: Color(themeColor).lighten(0.3).hex(), // Darker shade
          500: themeColor, // Base color (neutral)
          600: Color(themeColor).darken(0.3).hex(), // Darker
          700: Color(themeColor).darken(0.5).hex(), // Even darker
          800: Color(themeColor).darken(0.7).hex(), // Darkest shade
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
      textColor: {
        accent: themeColor, // Default for text-accent will be accent-500 (base color)
      },
      backgroundColor: {
        accent: themeColor, // Default for bg-accent will be accent-500 (base color)
      },
      borderColor: {
        accent: themeColor, // Default for border-accent will be accent-500 (base color)
      },
      // Add other properties as needed
      placeholderColor: {
        accent: themeColor, // Default for placeholder-accent will be accent-500
      },
      ringColor: {
        accent: themeColor, // Default for ring-accent will be accent-500
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
