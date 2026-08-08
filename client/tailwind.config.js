/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        dark: {
          950: '#07090e',
          900: '#0b0f19',
          850: '#111726',
          800: '#182035',
          700: '#232e4a'
        }
      }
    },
  },
  plugins: [],
}
