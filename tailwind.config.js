module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'script': ['Dancing Script', 'cursive'],
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        'bordo': '#8B0000',
        'red': '#DC143C',
        'gold': '#FFD700',
        'beige': '#F5F5DC',
        'cream': '#FFF8DC',
        'soft-red': '#F4E4E4',
        'dark-bordo': '#5C0000',
        'light-bordo': '#A52A2A',
      },
    },
  },
  plugins: [],
}

