/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    colors: {
      'card-blue': '#306cc0',
      'card-red': '#ce0b21',
      'card-yellow': '#f2b10b',
      'card-green': '#005524'
    },
    extend: {}
  },
  plugins: []
};
