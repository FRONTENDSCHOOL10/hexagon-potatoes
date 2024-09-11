/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '22.5rem',
      },
      colors: {
        black: 'var(--black)',
        'collection-1-color': 'var(--collection-1-color)',
        errored: 'var(--errored)',
        'gray-100': 'var(--gray-100)',
        'gray-200': 'var(--gray-200)',
        'gray-300': 'var(--gray-300)',
        'gray-600': 'var(--gray-600)',
        mainblue: 'var(--mainblue)',
        maingreen: 'var(--maingreen)',
        searchpopularred: 'var(--searchpopularred)',
        subskyblue: 'var(--subskyblue)',
        'subskyblue-2': 'var(--subskyblue-2)',
        white: 'var(--white)',
      },
      fontFamily: {
        pretendard: 'Pretendard',
        'body-1': 'var(--body-1-font-family)',
        'body-2': 'var(--body-2-font-family)',
        button: 'var(--button-font-family)',
        caption: 'var(--caption-font-family)',
        h1: 'var(--h1-font-family)',
        h2: 'var(--h2-font-family)',
        h3: 'var(--h3-font-family)',
        'heading-1': 'var(--heading-1-font-family)',
        'sub-1': 'var(--sub-1-font-family)',
        'sub-2': 'var(--sub-2-font-family)',
      },
      fontSize: {
        h1: [
          'var(--h1-font-size)',
          {
            lineHeight: 'var(--h1-line-height)',
            fontWeight: 'var(--h1-font-weight)',
          },
        ],
        h2: [
          'var(--h2-font-size)',
          {
            lineHeight: 'var(--h2-line-height)',
            fontWeight: 'var(--h2-font-weight)',
          },
        ],
        h3: [
          'var(--h3-font-size)',
          {
            lineHeight: 'var(--h3-line-height)',
            fontWeight: 'var(--h3-font-weight)',
          },
        ],
        'body-1': [
          'var(--body-1-font-size)',
          {
            lineHeight: 'var(--body-1-line-height)',
            fontWeight: 'var(--body-1-font-weight)',
          },
        ],
        'body-2': [
          'var(--body-2-font-size)',
          {
            lineHeight: 'var(--body-2-line-height)',
            fontWeight: 'var(--body-2-font-weight)',
          },
        ],
        button: [
          'var(--button-font-size)',
          {
            lineHeight: 'var(--button-line-height)',
            fontWeight: 'var(--button-font-weight)',
          },
        ],
        caption: [
          'var(--caption-font-size)',
          {
            lineHeight: 'var(--caption-line-height)',
            fontWeight: 'var(--caption-font-weight)',
          },
        ],
        'heading-1': [
          'var(--heading-1-font-size)',
          {
            lineHeight: 'var(--heading-1-line-height)',
            fontWeight: 'var(--heading-1-font-weight)',
          },
        ],
        'sub-1': [
          'var(--sub-1-font-size)',
          {
            lineHeight: 'var(--sub-1-line-height)',
            fontWeight: 'var(--sub-1-font-weight)',
          },
        ],
        'sub-2': [
          'var(--sub-2-font-size)',
          {
            lineHeight: 'var(--sub-2-line-height)',
            fontWeight: 'var(--sub-2-font-weight)',
          },
        ],
      },
      boxShadow: {
        'shadow-blue': 'var(--shadow-blue)',
      },
    },
  },
  plugins: [],
};
