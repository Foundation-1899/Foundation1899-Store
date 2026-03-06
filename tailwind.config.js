/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0D0B08',
        'bg-dark': '#110E0A',
        'bg-card': '#1A1410',
        'gold-primary': '#C9A84C',
        'gold-light': '#E8D5A3',
        'gold-bright': '#F0C040',
        'gold-dim': '#8B6914',
        parchment: '#D4B896',
        rust: '#8B3A2A',
        cream: '#F5EDD8',
        'text-primary': '#EDE0C4',
        'text-muted': '#7A6A52',
        'text-dim': '#4A3D2E',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #F0C040 40%, #E8D5A3 70%, #C9A84C 100%)',
      },
      animation: {
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'float-medium': 'float-medium 6s ease-in-out infinite 1s',
        'float-fast': 'float-fast 7s ease-in-out infinite 2s',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'border-glow': 'border-glow 4s ease-in-out infinite',
        'ember-drift': 'ember-drift 3s ease-out infinite',
        'reveal-up': 'reveal-up 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-12px) rotate(0.5deg)' },
          '66%': { transform: 'translateY(-6px) rotate(-0.5deg)' },
        },
        'float-medium': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'float-fast': {
          '0%, 100%': { transform: 'translateY(0px) rotate(-1deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'border-glow': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(201, 168, 76, 0.1)' },
          '50%': { boxShadow: '0 0 30px rgba(201, 168, 76, 0.25)' },
        },
        'ember-drift': {
          '0%': { transform: 'translateY(0) translateX(0) scale(1)', opacity: '0.6' },
          '50%': { transform: 'translateY(-40px) translateX(10px) scale(1.2)', opacity: '0.3' },
          '100%': { transform: 'translateY(-80px) translateX(-5px) scale(0.8)', opacity: '0' },
        },
        'reveal-up': {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      boxShadow: {
        'gold-sm': '0 0 15px rgba(201, 168, 76, 0.1)',
        'gold-md': '0 0 30px rgba(201, 168, 76, 0.15)',
        'gold-lg': '0 0 60px rgba(201, 168, 76, 0.2)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
};