/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow:{
        // 'custom-shadow': '#0000000d 0 6px 24px, #00000014 0 0 0 1px',
      }
    },
  },
  plugins: [],
}

