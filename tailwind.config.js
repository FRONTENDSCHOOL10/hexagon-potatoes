/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "var(--black)",
        "collection-1-color": "var(--collection-1-color)",
        errorred: "var(--errorred)",
        "gray-100": "var(--gray-100)",
        "gray-200": "var(--gray-200)",
        "gray-300": "var(--gray-300)",
        "gray-600": "var(--gray-600)",
        mainblue: "var(--mainblue)",
        maingreen: "var(--maingreen)",
        searchpopularred: "var(--searchpopularred)",
        subskyblue: "var(--subskyblue)",
        "subskyblue-2": "var(--subskyblue-2)",
        white: "var(--white)",
      },
      fontFamily: {
        "body-1": "var(--body-1-font-family)",
        "body-2": "var(--body-2-font-family)",
        button: "var(--button-font-family)",
        caption: "var(--caption-font-family)",
        h1: "var(--h1-font-family)",
        h2: "var(--h2-font-family)",
        h3: "var(--h3-font-family)",
        "heading-1": "var(--heading-1-font-family)",
        "sub-1": "var(--sub-1-font-family)",
        "sub-2": "var(--sub-2-font-family)",
      },
      boxShadow: {
        "shadow-blue": "var(--shadow-blue)",
      },
    },
  },
  plugins: [],
};
