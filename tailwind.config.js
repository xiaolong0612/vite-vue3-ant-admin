/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        '.ant-btn-primary': {
          'background-color': '#1677ff'
        }
      })
    }
  ]
}

