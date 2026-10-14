/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Restrained Bridgerton stationery: warm paper, dusty florals, antique metal.
        paper: '#FBF7EF',
        'paper-deep': '#F2E9DC',
        'paper-2': '#F5E2E6',
        ivory: '#FEFAF3',
        blush: '#EBC8D0',
        rose: '#B87384',
        burgundy: '#743345',
        sage: '#87947F',
        'sage-light': '#C9D0C1',
        charcoal: '#3D3537',
        gold: '#B4975A',
        surround: '#DED8CF',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Bodoni Moda"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Jost"', 'system-ui', 'sans-serif'],
        script: ['"Parisienne"', 'cursive'],
      },
      letterSpacing: {
        label: '0.28em',
        editorial: '0.16em',
      },
      maxWidth: {
        invite: '430px',
      },
      // Precise low-opacity stationery washes and linework used throughout.
      opacity: {
        22: '0.22',
        24: '0.24',
        28: '0.28',
        35: '0.35',
        38: '0.38',
        42: '0.42',
        45: '0.45',
        55: '0.55',
        62: '0.62',
        65: '0.65',
        68: '0.68',
        72: '0.72',
        84: '0.84',
        85: '0.85',
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
