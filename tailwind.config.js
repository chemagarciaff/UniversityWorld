/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      gridTemplateAreas: {
        'md-layout': [
          'header header',
          'sidebar content',
          'footer footer'
        ]
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.grid-template-md-layout': {
          'grid-template-areas': "'header header' 'sidebar content' 'footer footer'",
        }
      })
    }
  ],
}

