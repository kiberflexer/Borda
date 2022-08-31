module.exports = {
  content: [
    './public/**/*.html',
    './app/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 60s linear infinite',
      }
    },
  },
  plugins: [],
}