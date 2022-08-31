module.exports = {
  content: [
    './public/**/*.html',
    './app/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 60s linear infinite',
        'spin-15': 'spin 15s linear infinite',
        'spin-30': 'spin 30s linear infinite',
      }
    },
  },
  plugins: [],
}
