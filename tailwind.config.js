/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#F5F2EB',
        rouge: '#6B1D2F',
        'rouge-deep': '#551524',
        camellia: '#A43A4E',
        rose: '#A45F6D',
        blush: '#E6C9CE',
        ivory: '#FAF8F5',
        parchment: '#F0E8DC',
        sage: '#77806E',
        'sage-light': '#DCE1D6',
        gold: '#C5A059',
        'gold-light': '#E5C158',
        trim: '#D4AF37',
        'foil-dark': '#AA771C',
        ink: '#2C2523',
        surround: '#F5F2EB',
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        display: ['"Noto Serif Display"', 'Georgia', 'serif'],
        serif: ['"Noto Serif"', 'Georgia', 'serif'],
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.27em',
        editorial: '0.15em',
      },
      maxWidth: {
        canvas: '430px',
      },
      opacity: {
        18: '0.18', 24: '0.24', 26: '0.26', 28: '0.28', 32: '0.32', 35: '0.35',
        38: '0.38', 42: '0.42', 45: '0.45', 48: '0.48', 52: '0.52', 55: '0.55',
        62: '0.62', 65: '0.65', 68: '0.68', 72: '0.72', 80: '0.8', 82: '0.82', 84: '0.84',
      },
      ringOffsetWidth: { 3: '3px' },
      transitionTimingFunction: { paper: 'cubic-bezier(0.22, 0.61, 0.36, 1)' },
    },
  },
  plugins: [],
}
