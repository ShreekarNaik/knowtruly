/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '"Noto Sans"', 'sans-serif']
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
