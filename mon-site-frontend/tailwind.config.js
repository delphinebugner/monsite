module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      lg: '640px',
    },
    extend: {
      fontFamily: {
        butterfly: ['Butterfly', 'Georgia', 'serif'],
        sans: ['Raleway', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
