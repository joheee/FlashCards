/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      sidebarBackgroundColor: '#C4DFAA',
      navbarBackgroundColor: '#90C8AC',
      barColor: '#ffffff',
      cardBackgroundColor: '#CEE5D0',
      cardColor: '#5F7A61',
      cardOuterBackgroundColor: '#EDEDED',
      popUpBackgroundColor: '#0078AA'
    }
  },
  plugins: [],
}