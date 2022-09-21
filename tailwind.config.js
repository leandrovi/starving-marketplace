module.exports = {
  content: [
    "./src/**/*.njs",
    "./src/**/*.jsx",
    "./src/**/*.nts",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      fontSize: {
        mxl: ["1.375rem", "1.375rem"],
      },
    },
    fontFamily: {
      kanit: ["Kanit", "sans-serif"],
    },
    colors: {
      white: "#FFFFFF",
      mediumGray: "#938E8E",
      gray: "#3F3F3F",
      darkGray: "#111111",
      black: "#000000",
      yellow: "#FDC500",
      pink: "##FF8896",
      gradients: {
        linear: {
          yellowBg:
            "linear-gradient(90deg, rgba(255, 199, 1, 0.28) 0%, rgba(255, 199, 1, 0) 100%)",
          yellowBorder:
            "linear-gradient(90deg, #FFC701 0%, rgba(255, 199, 1, 0) 100%)",
        },
        radial: {
          yellow:
            "radial-gradient(50% 50% at 50% 50%, rgba(253, 200, 11, 0.3552) 0%, rgba(253, 200, 11, 0) 100%)",
          pink: "radial-gradient(50% 50% at 50% 50%, rgba(255, 136, 150, 0.4028) 0%, rgba(255, 136, 150, 0) 100%)",
        },
      },
    },
  },
  plugins: [],
};
