/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'eco-dark': '#0A0C10',
        'eco-cyan': '#00F2FF',
        'eco-yellow': '#FFD700',
        'eco-green': '#10B981',
        'eco-purple': '#9333EA',
        'eco-card': 'rgba(255, 255, 255, 0.03)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
