/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        'desktop': '1280px',
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1280px",
        '2xl': "1400px",
      },
      colors: {
        'font-secondary': 'rgb(115 115 115)',
        'scrollbar': '##718093',
        'scrollbar-thumb': '#7f8fa6',
        'primary': 'rgb(59 130 246 / 1)',
      }
    },

  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/typography'),
  ],
}
