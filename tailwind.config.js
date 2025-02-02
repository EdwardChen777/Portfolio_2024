/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit", 
  theme: {
    extend: {
      colors: {
        "primary": "#072F4D",
        "secondary": "#E59D23",
        "background": "#101010",
      },
      fontFamily: {
        futura: ['Futura', 'sans-serif'],
        roboto: ['"Roboto Serif"', 'serif'],
        technor: ['Technor', 'sans-serif'],
        supreme: ['Supreme', 'sans-serif'],
      },
      clipPath: {
        'custom-polygon': 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
      },
      height: {
        "60vh": "60vh",
        "180vh": "180vh",
      }
    },
  },
  plugins: [],
}

