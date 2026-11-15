module.exports = {
  content: ["./frontend/src/**/*.{js,jsx,ts,tsx}", "./frontend/public/index.html"],
  theme: {
    extend: {
      colors: {
        forest: "#1B4D3E",
        forestAlt: "#0E1B14",
        goldLight: "#E5A93B",
        goldDark: "#F3BF58",
        mint: "#F4FBF6",
        sage: "#EEF5F0",
        cardBorder: "#D4DCD7",
        accentGreen: "#2C7A51",
      },
      fontFamily: {
        sans: ["Epilogue", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

