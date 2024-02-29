// tailwind.config.js
module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#211951',
        'light-green': '#97bf0f',
        'dark-green': '#274931',
        'light-gray': '#A4A4A4',
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
