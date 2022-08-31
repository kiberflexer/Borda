module.exports = {
  content: [
    './public/**/*.html',
    './app/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      animation: {
        'spin-5': 'spin 5s linear infinite',
        'spin-15': 'spin 15s linear infinite',
        'spin-30': 'spin 30s linear infinite',
        'spin-45': 'spin 45s linear infinite',
        'spin-60': 'spin 60s linear infinite',
        'spin-75': 'spin 75s linear infinite',
        'spin-90': 'spin 90s linear infinite',
      }
    },
  },
  plugins: [],
}
