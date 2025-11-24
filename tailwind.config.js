/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const { nextui } = require('@nextui-org/theme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-2': 'linear-gradient(270deg, #f55925 0%, #D75986 100%)',
      },
      gridTemplateColumns: {
        '2CoffeeLg': '1fr 380px',
        '2CoffeeMd': '1fr 330px',
        '2mint': '420px 1fr',
      },
      colors: {
        primary: '#f45f2d',
        'monarch-primary': '#f45f2d',
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        zen: ['var(--font-zen)'],
        monospace: ['var(--font-monospace)'],
      },
      fontWeight: {
        normal: '400',
        bold: '700',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          layout: {
            radius: {
              small: '0.375rem',
              medium: '0.375rem',
              large: '0.375rem',
            },
          },
        },
        dark: {
          layout: {
            radius: {
              small: '0.375rem',
              medium: '0.375rem',
              large: '0.375rem',
            },
          },
        },
      },
    }),
    plugin(function ({ addBase }) {
      addBase({
        'button, .nextui-button': {
          '@apply rounded': {},
        },
      });
    }),
  ],
};