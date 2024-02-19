// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'dark-blue': '#211951',
        'light-green': '#97bf0f',
        'dark-green': '#274931',
      },
      width: {
        'fit-content': 'fit-content',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
