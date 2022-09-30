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
      backgroundImage: {
        home: {
          header: "url('/images/home/header.png')",
          "left-shade": "url('/images/home/left-shade.png')",
          "bottom-shade": "url('/images/home/bottom-shade.png')",
        },
      },
    },
    fontFamily: {
      kanit: ["Kanit", "sans-serif"],
    },
    colors: {
      white: "#FFFFFF",
      lightGray: "#CECECE",
      lightGray2: "#CACACA",
      mediumGray: "#938E8E",
      gray: "#3F3F3F",
      darkGray: "#111111",
      black: "#000000",
      yellow: "#FDC500",
      pink: "#FF8896",
      red: "#F00",

      alphas: {
        yellow: "rgba(255, 199, 1, 0.28)",
        black: "rgba(255, 199, 1, 0)",
      },

      gradients: {
        radial: {
          yellow:
            "radial-gradient(50% 50% at 50% 50%, rgba(253, 200, 11, 0.3552) 0%, rgba(253, 200, 11, 0) 100%)",
          pink: "radial-gradient(50% 50% at 50% 50%, rgba(255, 136, 150, 0.4028) 0%, rgba(255, 136, 150, 0) 100%)",
        },
      },
    },

    linearBorderGradients: (theme) => ({
      directions: {
        t: "to top",
        tr: "to top right",
        r: "to right",
        br: "to bottom right",
        b: "to bottom",
        bl: "to bottom left",
        l: "to left",
        tl: "to top left",
      },
      colors: {
        yellow: ["#FFC701 0%", "rgba(255, 199, 1, 0) 100%"],
      },
    }),
  },
  plugins: [require("tailwindcss-border-gradients")()],
};
