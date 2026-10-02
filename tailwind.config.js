/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Bridgerton family palette — cool pastels anchored by ivory, with gilded details.
        paper: '#FAF6EE', // ivory paper (primary anchor)
        'paper-2': '#E6EEF4', // pale Wedgwood blue (secondary pages)
        ivory: '#FFFCF6', // cream for insets and the invitation card
        wedgwood: '#4E6A86', // deep Wedgwood — headings, UI, seal
        'wedgwood-light': '#A9BFD3', // signature pale blue — borders, tints
        lilac: '#8F7FAB', // lavender — labels, small accents
        'lilac-light': '#D9CFE6',
        blush: '#F3CAD3', // blush pink — florals
        quartz: '#E6B3BD', // rose quartz — florals
        charcoal: '#3C3F47', // cool charcoal body text
        gold: '#C6A75F', // gilded details
        surround: '#E4E8EC', // desktop surround
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Bodoni Moda"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Jost"', 'system-ui', 'sans-serif'],
        script: ['"Pinyon Script"', 'cursive'],
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
