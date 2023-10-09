import type { Config } from 'tailwindcss'
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'primary' : '#7800EF',
      'tertiary' : '#8189A2',
      'base': {
        text: '#252A3C',
        background: '#F6F8FC'
      }
    },
    fontFamily: {
      'sfprodisplay': ['SF Pro Display', 'sans-serif'],
      'poppins': ['var(--font-poppins)']
    },
    container: {
      center: true,
    },
    
  },
  plugins: [nextui({
    addCommonColors: true,
    themes: {
      light: {
        colors: {
          'primary': '#974EC3',
          
        },
      },
    },
  }),]
}
export default config
