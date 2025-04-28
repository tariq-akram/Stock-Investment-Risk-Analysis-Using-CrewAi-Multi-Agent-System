/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Scans all JS/JSX/TS/TSX files in src/ for Tailwind classes
    ],
    theme: {
      extend: {
        colors: {
          primary: '#1E3A8A',   // Deep blue
          accent: '#8B5CF6',    // Vibrant purple
          secondary: '#6B7280', // Gray
          bgLight: '#F3F4F6',   // Light background
        },
        fontFamily: {
          poppins: ['Poppins', 'sans-serif'], // Custom font
        },
      },
    },
    plugins: [],
  }