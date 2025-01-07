/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit", 
  theme: {
    extend: {
      colors: {
        "primary": "#072F4D",
        "secondary": "#E59D23"
      },
      fontFamily: {
        futura: ['Futura', 'sans-serif'],
        roboto: ['"Roboto Serif"', 'serif']
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

