import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // White surface scale with a soft indigo / periwinkle accent.
        paper: {
          DEFAULT: '#ffffff', // page background
          50: '#fafaff',      // faintest indigo-tinted fill
          100: '#f1f2fb',     // hairline borders / hover
          200: '#e2e4f6',     // stronger borders
        },
        ink: {
          900: '#1e1b2e', // primary text — deep indigo-charcoal
          700: '#3b3754', // strong body
          500: '#6b6786', // muted body
          400: '#9b97b5', // faint labels
          300: '#c4c1d8', // very faint
        },
        accent: {
          DEFAULT: '#6366f1', // indigo-500
          soft: '#818cf8',    // indigo-400 periwinkle
          deep: '#4f46e5',    // indigo-600
          faint: '#e0e7ff',   // indigo-100
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
        tighter: '-0.03em',
      },
      maxWidth: {
        prose: '46rem',
        page: '64rem',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        glow: '0 10px 40px -10px rgba(99,102,241,0.35)',
        'glow-lg': '0 30px 80px -20px rgba(99,102,241,0.45)',
      },
    },
  },
  plugins: [],
};

export default config;
