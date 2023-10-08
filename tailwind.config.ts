import type { Config } from 'tailwindcss'
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
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
    themes: {
      light: {
        colors: {
          'primary': '#974EC3'
        },
      },
    },
  }),]
}
export default config
