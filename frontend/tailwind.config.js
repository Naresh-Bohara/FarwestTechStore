/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite-react/tailwind';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    flowbite.content()
  ],
  theme: {
    extend: {
      fontSize: {
        '30px': '30px',
      },
      colors:{
        primary:{"950": "#1f2937"}
      }
    }, 
  },
  plugins: [
     require("flowbite/plugin"),
     flowbite.plugin()
  ],  
};
