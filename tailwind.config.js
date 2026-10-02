/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Bright, warm Regency palette — light pink paper, gold filigree, burgundy ink.
        paper: '#FBEFF0', // light blush paper (primary)
        'paper-2': '#F6DEE2', // rose paper (secondary)
        ivory: '#FFF9F3', // warm ivory for insets and the invitation card
        rose: '#C9788A', // labels, small accents
        burgundy: '#8B2E41', // headings, UI, wax seal
        charcoal: '#4A3338', // warm plum body text
        gold: '#C9A961', // filigree, frames
        wisteria: '#C3B1D9', // occasional accent
        surround: '#EFD9DC', // neutral desktop surround
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Bodoni Moda"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Jost"', 'system-ui', 'sans-serif'],
        script: ['"Parisienne"', 'cursive'],
      },
      letterSpacing: {
        label: '0.28em',
        wide2: '0.18em',
      },
      maxWidth: {
        invite: '430px',
      },
      transitionTimingFunction: {
        paper: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
