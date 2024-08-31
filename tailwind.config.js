/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '22.5rem',
      },
      fontFamily: { pretendard: 'Pretendard' },
    },
  },
  plugins: [],
};
