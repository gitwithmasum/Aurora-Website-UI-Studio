/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        aurora: {
          950: '#06141B', // Deep Abyssal Midnight Base
          900: '#11212D', // Dark Navy Slate Surface
          800: '#253745', // Steel Blue Borders & Accents
          600: '#4A5C6A', // Cold Slate Secondary
          400: '#9BA8AB', // Titanium Ice Primary
          200: '#CCD0CF', // Silver Mist Highlight / Text
        },
        studio: {
          bg: '#06141B',
          card: '#11212D',
          surface: '#11212D',
          border: 'rgba(155, 168, 171, 0.15)',
          'border-light': 'rgba(155, 168, 171, 0.25)',
          muted: '#9BA8AB',
          accent: '#9BA8AB',
          'accent-glow': '#CCD0CF',
          cyan: '#9BA8AB',
          gold: '#eab308',
          neon: '#a855f7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.35)',
        'glow-blue': '0 0 25px -5px rgba(59, 130, 246, 0.35)',
        'glow-purple': '0 0 25px -5px rgba(168, 85, 247, 0.35)',
        'glow-gold': '0 0 25px -5px rgba(234, 179, 8, 0.35)',
        'glow-pink': '0 0 25px -5px rgba(236, 72, 153, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'inner-glow': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 4px rgba(6, 182, 212, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 14px rgba(6, 182, 212, 0.8))' },
        },
      },
    },
  },
  plugins: [],
};
