/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        peach: {
          50: '#fff6f5',
          100: '#ffe5e3',
          200: '#ffccc9',
          300: '#f8a7a0',
          400: '#ee776e',
          500: '#de4e44',
          600: '#ca352b',
          700: '#a92820',
          800: '#8c241d',
          900: '#75241f',
          950: '#400d0a',
        },
        rosewood: {
          800: '#26171a',
          900: '#190e11',
          950: '#0c0708',
        },
        brandDark: '#0c0708',
        brandSurface: '#160e10',
      },
      fontFamily: {
        arabic: ['Tajawal', 'Cairo', 'sans-serif'],
        quran: ['"Traditional Arabic"', 'Scheherazade New', 'Amiri', 'serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(180deg, #0c0708 0%, #170d10 50%, #0c0708 100%)',
        'gold-gradient': 'linear-gradient(135deg, #ffffff 0%, #FFCCC9 50%, #E59892 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(255, 204, 201, 0.04) 0%, rgba(255, 204, 201, 0.005) 100%)',
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
        'peach-soft': '0 10px 30px -5px rgba(255, 204, 201, 0.15)',
      }
    },
  },
  plugins: [],
}
