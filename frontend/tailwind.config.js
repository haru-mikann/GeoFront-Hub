/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts,scss}',
  ],
  theme: {
    extend: {
      colors: {
        // NERV Base — Backgrounds
        'nerv-black':  '#000000',
        'nerv-panel':  '#0a0a0a',
        'nerv-border': '#1a1a1a',

        // Primary — Amber / Orange
        'nerv-orange': '#ff6600',
        'nerv-amber':  '#ffb300',

        // Accent — Terminal Green
        'nerv-green':     '#00ff41',
        'nerv-green-dim': '#00cc33',

        // Status
        'nerv-alert': '#ff0033',
        'nerv-warn':  '#ffb300',
        'nerv-ok':    '#00ff41',
      },
      fontFamily: {
        mono: ['"Courier New"', 'Courier', 'monospace'],
      },
      letterSpacing: {
        nerv: '0.1em',
        'nerv-wide': '0.15em',
      },
    },
  },
  plugins: [],
};
