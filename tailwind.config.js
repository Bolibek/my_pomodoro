const defaultTheme = require("tailwindcss/defaultTheme");
const { mono: defaultFontFamily } = defaultTheme.fontFamily;

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      mobile: "375px",
      tablet: "768",
      desktop: "1440",
    },
    colors: {
      current: "currentColor",
      transparent: "transparent",
      red: "#f87070",
      teal: "#70f3f8",
      purple: "#d881f8",
      gray: "#d7e0ff",
      "gray-dark": "#1e213f",
      "gray-light": "#eff1fa",
      black: "#161932",
    },
    fontSize: {
      "xs-1": ["12px", { lineHeight: "14px" }],
      "xs-2": ["13px", { lineHeight: "16px", letterSpacing: "5px" }],
      sm: ["14px", { lineHeight: "18px" }],
      base: ["16px", { lineHeight: "19px", letterSpacing: "15px" }],
      lg: ["28px", { lineHeight: "34px" }],
      xl: ["100px", { lineHeight: "120px" }],
    },

    fontFamily: {
      kumbhSans: ["Kumbh Sans, sans-serif", ...defaultFontFamily],
      robotoSlab: ["Roboto Slab, sans-serif", ...defaultFontFamily],
      spaceMono: ["Space Mono, sans-serif", ...defaultFontFamily],
    },
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
