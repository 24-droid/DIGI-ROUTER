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
          950: '#040608',
          900: '#080d16',
          850: '#0c1220',
          800: '#111827',
          700: '#1a2540'
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      boxShadow: {
        'glow-cyan': '0 0 40px -8px rgba(6, 182, 212, 0.4)',
        'glow-indigo': '0 0 40px -8px rgba(99, 102, 241, 0.4)',
        'glow-rose': '0 0 40px -8px rgba(244, 63, 94, 0.4)',
        'card': '0 20px 60px -20px rgba(0, 0, 0, 0.7)',
      }
    },
  },
  plugins: [],
}
