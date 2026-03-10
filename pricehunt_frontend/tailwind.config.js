/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-blue': '#00f0ff',
        'cyber-pink': '#ff2d95',
        'cyber-purple': '#b026ff',
        'cyber-yellow': '#ffe600',
        'cyber-green': '#39ff14',
        'surface-dark': '#0d0d1a',
        'surface-card': '#13132b',
        'surface-hover': '#1a1a3e',
      },
      fontFamily: {
        'display': ['"Orbitron"', 'sans-serif'],
        'body': ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
