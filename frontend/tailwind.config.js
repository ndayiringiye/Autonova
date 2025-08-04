/** @type {import('tailwindcss').Config} */
export default {
 content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        fold:"280px",
        iphone:"36px",
        ipad:"460px"
      }
    },
  },
  plugins: [],
}

