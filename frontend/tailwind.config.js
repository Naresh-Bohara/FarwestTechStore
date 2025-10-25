/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite-react/tailwind';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    flowbite.content(),
    "./node_modules/flowbite-react/**/*.js"
  ],
  theme: {
    extend: {
      fontSize: {
        '30px': '30px',
      },
      colors:{
        primary:{
           "50":  "#f3fbfb",
            "100": "#e6f8f8",
            "200": "#cceeee",
            "300": "#b3e4e5",
            "400": "#80d1d2",
            "500": "#4ebfc0",
            "600": "#38abad",
            "700": "#2d8e90",
            "800": "#237071",
            "900": "#1c595b",
            "950": "#1a9ea2"
        }
      }
    }, 
  },
  plugins: [
     require("flowbite/plugin"),
     flowbite.plugin(),
     require("flowbite/plugin")
  ],  
};
