export default {
  darkMode: 'class', // enable dark mode toggle
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
      cream: "#FFFDD0",        
        textdark: "#1F2937",   
        primary: "#EC4899", 
      },
      backgroundImage: {
        'flower-gradient': 'linear-gradient(135deg, #ffb6c1, #c084fc)',
        'gold-gradient': 'linear-gradient(135deg, #ffd700, #ff5e78)'
      }
    },
  },
  plugins: [],
}
