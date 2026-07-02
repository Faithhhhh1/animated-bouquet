/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        script: ['var(--font-script)', 'cursive'],
        display: ['var(--font-display)', 'serif'],
        serif: ['var(--font-serif)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        cream: '#faf8f5',
        charcoal: '#2d2a26',
        bloom: {
          pink: '#f4a0b5',
          rose: '#e84057',
          lavender: '#b39ddb',
          sky: '#87ceeb',
          gold: '#d4a574',
          leaf: '#4a7c59',
          sage: '#9caf88',
        },
      },
      animation: {
        'bloom': 'bloom 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'bloom-delay-1': 'bloom 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards',
        'bloom-delay-2': 'bloom 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s forwards',
        'bloom-delay-3': 'bloom 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s forwards',
        'petal-fall-1': 'petalFall 8s ease-in-out infinite',
        'petal-fall-2': 'petalFall 10s ease-in-out 1s infinite',
        'petal-fall-3': 'petalFall 9s ease-in-out 2s infinite',
        'petal-fall-4': 'petalFall 11s ease-in-out 0.5s infinite',
        'petal-fall-5': 'petalFall 7s ease-in-out 3s infinite',
        'card-reveal': 'cardReveal 1s ease-out 2.5s forwards',
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'sway': 'sway 4s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'typewriter': 'typewriter 2s steps(40) forwards',
        'wiggle': 'wiggle 0.5s ease-in-out',
      },
      keyframes: {
        bloom: {
          '0%': { transform: 'scale(0) rotate(-15deg)', opacity: '0' },
          '60%': { transform: 'scale(1.1) rotate(3deg)', opacity: '0.9' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        petalFall: {
          '0%': { transform: 'translateY(-10vh) translateX(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '0.6' },
          '100%': { transform: 'translateY(110vh) translateX(100px) rotate(720deg)', opacity: '0' },
        },
        cardReveal: {
          '0%': { transform: 'translateY(40px) rotateX(-10deg)', opacity: '0' },
          '100%': { transform: 'translateY(0) rotateX(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(232, 64, 87, 0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(232, 64, 87, 0.6)' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0)' },
          '25%': { transform: 'rotate(-5deg)' },
          '75%': { transform: 'rotate(5deg)' },
        },
      },
    },
  },
  plugins: [],
};
