/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bio: {
          dark: '#0a0e17',
          card: '#111827',
          border: '#1f293d',
          accent: '#38bdf8',
          soma: '#1e293b',
          axon: '#0f172a',
          depol: '#f97316',
          repol: '#06b6d4',
          hyper: '#8b5cf6',
          na: '#fbbf24',      // Sodium - bright yellow / gold
          k: '#38bdf8',       // Potassium - cyan / light blue
          ca: '#22c55e',      // Calcium - bright emerald green
          ach: '#c084fc',     // Acetylcholine - purple
          epsp: '#ec4899',    // EPSP - pink / magenta
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Consolas', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { filter: 'drop-shadow(0 0 4px rgba(56, 189, 248, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 12px rgba(56, 189, 248, 0.8))' },
        }
      }
    },
  },
  plugins: [],
}
