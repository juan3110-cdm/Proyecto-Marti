/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold:       '#F5B800',
        'gold-deep':'#D99E00',
        'gold-soft':'#FFEEB0',
        ink:        '#161514',
        'ink-2':    '#2A2826',
        paper:      '#FBFAF7',
        'paper-2':  '#F3F1EB',
        line:       '#E7E3DA',
        'line-dk':  '#34322E',
        muted:      '#6E6A62',
        'muted-dk': '#A8A39A',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', '"Times New Roman"', 'serif'],
        sans:    ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '18px',
        sm:   '12px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 24px 60px -28px rgba(22,21,20,.32)',
        sm:   '0 8px 26px -16px rgba(22,21,20,.30)',
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
}
