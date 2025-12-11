import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
    },
    extend: {
      colors: {
        energy: {
          orange: '#FF6B35',
          DEFAULT: '#FF6B35',
        },
        electric: {
          blue: '#00D9FF',
          DEFAULT: '#00D9FF',
        },
        neon: {
          green: '#39FF14',
          DEFAULT: '#39FF14',
        },
        power: {
          pink: '#FF006E',
          DEFAULT: '#FF006E',
        },
        tech: {
          purple: '#7209B7',
          DEFAULT: '#7209B7',
        },
        cyber: {
          yellow: '#FFD60A',
          dark: '#0D0D12',
          mid: '#1A1A24',
          light: '#252533',
          DEFAULT: '#0D0D12',
        },
        surface: '#2D2D3D',
      },
      backgroundImage: {
        'gradient-energy': 'linear-gradient(135deg, #FF6B35, #FF006E)',
        'gradient-growth': 'linear-gradient(135deg, #39FF14, #00D9FF)',
        'gradient-premium': 'linear-gradient(135deg, #7209B7, #00D9FF)',
      },
      boxShadow: {
        'glow-orange': '0 0 20px rgba(255, 107, 53, 0.5)',
        'glow-blue': '0 0 20px rgba(0, 217, 255, 0.5)',
        'glow-green': '0 0 20px rgba(57, 255, 20, 0.5)',
        'glow-pink': '0 0 20px rgba(255, 0, 110, 0.5)',
        'glow-purple': '0 0 20px rgba(114, 9, 183, 0.5)',
      },
      animation: {
        'energy-pulse': 'energy-pulse 2s ease-in-out infinite',
        'neon-glow': 'neon-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'scale-pop': 'scale-pop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'energy-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 10px #FF6B35, 0 0 20px #FF6B35',
            transform: 'scale(1)',
          },
          '50%': {
            boxShadow: '0 0 20px #FF6B35, 0 0 40px #FF6B35',
            transform: 'scale(1.05)',
          },
        },
        'neon-glow': {
          '0%, 100%': {
            textShadow: '0 0 5px currentColor, 0 0 10px currentColor',
          },
          '50%': {
            textShadow: '0 0 10px currentColor, 0 0 20px currentColor',
          },
        },
        'slide-up': {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-pop': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;