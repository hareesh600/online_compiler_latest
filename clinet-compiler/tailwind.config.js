/** @type {import('tailwindcss').Config} */
export default {
  content: [

    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'home-background':"url('./src/assets/laptop-coffee-cup-wooden-table-dark-room.jpg')",
        'landing-background':"url('./src/assets/pexels-olia-danilevich-4974915.jpg')"
      }
    },
  },
  plugins: [],
}

