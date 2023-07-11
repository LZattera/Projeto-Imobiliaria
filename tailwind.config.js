/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/modules/appcore/roteirizacao/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
  important: true
}