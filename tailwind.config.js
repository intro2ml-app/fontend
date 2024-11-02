/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-90': 'linear-gradient(90deg, var(--tw-gradient-stops))',
      },
      fontFamily: {
        BeVietnamPro: ['BeVietnamPro', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
