/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F7F4EC',
        'paper-2': '#EDE8DA',
        sage: '#78836C',
        olive: '#3F493D',
        charcoal: '#34332E',
        gold: '#A39267',
        // Neutral desktop surround — slightly darker than paper so the invitation reads as an object.
        surround: '#DDD8CB',
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
