module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        'bordo': '#8B0000',
        'red': '#DC143C',
        'gold': '#FFD700',
        'cream': '#F5F5DC',
        'soft-red': '#F4E4E4',
        'dark-bordo': '#5C0000',
      },
    },
  },
  plugins: [],
}

