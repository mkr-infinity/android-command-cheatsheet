/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          // Pure Neutral Cybercore Dark (Zero Blue Tint)
          black: '#050505',
          dark: '#0A0A0A',
          surface: '#121212',
          surfaceHover: '#181818',
          surfaceElevated: '#1F1F1F',
          border: '#242424',
          borderHover: '#383838',
          lime: 'rgb(var(--accent-lime-rgb) / <alpha-value>)',
          limeHover: 'var(--accent-lime)',
          limeDim: 'var(--accent-lime-dim)',
          limeBorder: 'var(--accent-lime-border)',
          text: '#FAFAFA',
          muted: '#A3A3A3',
          dim: '#666666',

          // Cybercore Technical Light (Stark Engineering Lab Aesthetic)
          lightBg: '#F4F5F7',
          lightSurface: '#FFFFFF',
          lightSurfaceHover: '#EBECEF',
          lightBorder: '#D8DCE3',
          lightBorderHover: '#B8BFCB',
          lightText: '#0A0A0A',
          lightMuted: '#4A4A4A',
          lightDim: '#737373',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'SF Mono', 'ui-monospace', 'Menlo', 'monospace'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        cyber: '0 0 16px -2px rgba(226, 249, 82, 0.14)',
        'cyber-lg': '0 0 28px -4px rgba(226, 249, 82, 0.22)',
        'tech-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'tech-card': '0 4px 12px -2px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
};
