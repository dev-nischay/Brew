/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#634832",
        foreground: "#f7f7f7",
        coffee: {
          light: "#ece0d1",
          dark: "#38220f",
        },
      },

      fontFamily: {
        wenkai: [
          "'LXGW WenKai Mono TC'",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};
