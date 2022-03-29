const { gray } = require('tailwindcss/colors')

module.exports = {
  content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif']
      },
      fontWeight: {
        normal: 300
      },
      colors: {
        neutral: gray
      }
    }
  },
  plugins: []
}
