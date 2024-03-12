import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
        roboto: ['var(--font-roboto)'],
        anton: ['var(--font-anton)']
      },
      variants: {
        extend: {
          opacity: ['disabled'],
          border: ['disabled'],
          bg: ['disabled'],
          hover: ['disabled']
          // add any tailwind classes you wish to enable disabled: on here  
        }
      },
        
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "bg_default": "#2F364D",
        "bg_dark": "#212634",
        "comp_default": "#D9E0D4",
        "black": "#000",
        "white": "#fff",
        "green": "#03fc07",
        "red": "#FF0000",
      },
    },
    
  },
  plugins: [
    require('tailwindcss-animated')
  ],
};
export default config;
