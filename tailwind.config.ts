/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Your existing colors
        'button-bg': 'var(--button-bg)',
        'button-hover-bg': 'var(--button-hover-bg)',
        'background': 'var(--background)',
        'soft-coral-tinted': 'var(--soft-coral-tinted)',
        'section-bg': 'var(--section-bg)',
        'charcoal': 'var(--charcoal)',
        'soft-graphite': 'var(--soft-graphite)',
        'muted-ash': 'var(--muted-ash)',
      },
      fontFamily: {
        // Add your custom fonts
        'inter': ['var(--font-inter)', 'sans-serif'],
        'lobster': ['var(--font-lobster)', 'cursive'],
        'plus-jakarta': ['var(--font-plus-jakarta)', 'sans-serif'],
      }
    },
  },
  plugins: [],
}