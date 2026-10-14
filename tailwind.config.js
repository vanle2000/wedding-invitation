/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        rouge: '#852E43',
        'rouge-deep': '#692235',
        camellia: '#AB3E53',
        rose: '#BC7180',
        blush: '#E9CDD3',
        'blush-light': '#F3E3E6',
        ivory: '#FAF6EC',
        parchment: '#F1E8DA',
        sage: '#79846E',
        'sage-light': '#DDE2D6',
        gold: '#C2A15A',
        'gold-light': '#DEC994',
        ink: '#3E3235',
        surround: '#E2DBD1',
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
        18: '0.18',
        24: '0.24',
        26: '0.26',
        28: '0.28',
        32: '0.32',
        35: '0.35',
        38: '0.38',
        42: '0.42',
        45: '0.45',
        48: '0.48',
        55: '0.55',
        62: '0.62',
        65: '0.65',
        68: '0.68',
        72: '0.72',
        82: '0.82',
        84: '0.84',
      },
      ringOffsetWidth: {
        3: '3px',
      },
      transitionTimingFunction: {
        paper: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
