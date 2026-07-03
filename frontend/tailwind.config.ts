import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#07111f',
          900: '#0b1728',
          800: '#10213a',
          700: '#183154',
        },
        paper: '#f7f3ea',
        accent: {
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      boxShadow: {
        glow: '0 20px 80px rgba(245, 158, 11, 0.16)',
      },
      backgroundImage: {
        'radial-grid':
          'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
};

export default config;
