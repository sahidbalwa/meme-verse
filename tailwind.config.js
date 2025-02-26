/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",    // 60% color (black or white)
        secondary: "var(--secondary)", // 30% color (white or black)
        accent: "#FFFF00",            // 10% light green
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Default body font
        bangers: ['Bangers', 'cursive'],    // For headings or emphasis
        spicy: ['"Spicy Rice"', 'serif'],
      },
    },
  },
  plugins: [],
}

