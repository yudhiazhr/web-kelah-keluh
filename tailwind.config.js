/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      fontFamily: {
        'acumin-pro-bold' : ['acumin-pro-bold', 'sans-serif'],
        'acumin-pro-book' : ['acumin-pro-book', 'sans-serif'],
        'acumin-pro-medium' : ['acumin-pro-medium', 'sans-serif'],
        'monbaiti' : ['monbaiti', 'sans-serif'],
        'Garamond-Regular' : ['Garamond', 'sans-serif']
      },
    },
  },
  plugins: [],
};
