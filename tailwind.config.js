/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        '3xl': '1950px', // custom breakpoint
      },
      fontFamily: {
        sans: ['"DM Sans"', "sans-serif"],
        degular: ['"Degular Display"', "sans-serif"],
        poppins: ['"Poppins"', "sans-serif"],
        inter: ['"Inter"', "sans-serif"],
        roboto: ['"Roboto"', "sans-serif"],
      },
      animation: {
        // Reduced duration for smoother movement
        marquee: "marquee 50s linear infinite",
        marquee1: "marquee 8s linear infinite",
        // Added pause on hover variation
        "marquee-hover": "marquee 50s linear infinite paused",
      },
      keyframes: {
        marquee: {
          // Adjusted translation for smoother infinite loop
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      // Optional: Add easing for more natural movement
      transitionTimingFunction: {
        marquee: "linear",
      },
    },
  },
  plugins: [],
};
