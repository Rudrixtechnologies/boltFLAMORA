/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FEFCF9',
          100: '#FAF8F5',
          200: '#F5F1EB',
          300: '#EDE7DC',
          400: '#E0D6C8',
          500: '#CFC2AE',
        },
        gold: {
          50: '#FBF6ED',
          100: '#F5ECDA',
          200: '#E8D5B0',
          300: '#D9BC86',
          400: '#C9A96E',
          500: '#B8934A',
          600: '#9A7A3A',
          700: '#7D622E',
          800: '#614A22',
          900: '#4A3819',
        },
        /* FLAMORA brand forest green — from logo background */
        forest: {
          50: '#E8F4F0',
          100: '#C5E2D8',
          200: '#9ECFC0',
          300: '#72BAA5',
          400: '#45A48D',
          500: '#2A8C74',
          600: '#1D6E5A',
          700: '#155442',
          800: '#0D3B2E',  /* primary logo background */
          900: '#071E17',
          950: '#030F0C',
        },
        charcoal: {
          50: '#F7F7F7',
          100: '#E8E8E8',
          200: '#D1D1D1',
          300: '#A8A8A8',
          400: '#808080',
          500: '#5A5A5A',
          600: '#3D3D3D',
          700: '#2A2A2A',
          800: '#1A1A1A',
          900: '#0F0F0F',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out 1s infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 169, 110, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(201, 169, 110, 0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A96E 0%, #E8D5B0 50%, #C9A96E 100%)',
        'forest-gradient': 'linear-gradient(135deg, #0D3B2E 0%, #155442 50%, #0D3B2E 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
      },
      screens: {
        xs: '380px',
      },
    },
  },
  plugins: [],
};
