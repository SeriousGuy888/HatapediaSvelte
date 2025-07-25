// https://github.com/tailwindlabs/tailwindcss-typography/blob/main/src/styles.js
const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, "$1")
    .replace(/\.0$/, "")
const rem = (px) => `${round(px / 16)}rem`
const em = (px, base) => `${round(px / base)}em`

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/container-queries")],
  darkMode: "selector",
  theme: {
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      serif: ["Merriweather", "serif"],
      mono: ["Fira Code", "Consolas", "monospace"],
      minecraft: ["MinecraftSeven", "monospace"], // Minecraft font
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
            a: {
              color: theme("colors.blue.600"),
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            },
            blockquote: {
              fontStyle: "normal",
            },
            "blockquote p:first-of-type::before": {
              content: "",
            },
            "blockquote p:last-of-type::after": {
              content: "",
            },
            pre: {
              color: theme("colors.gray.700"),
              backgroundColor: theme("colors.gray.100"),
              padding: theme("spacing.1"),
              borderRadius: theme("borderRadius.lg"),
              whiteSpace: "pre-wrap",
            },
            code: {
              color: theme("colors.gray.700"),
              backgroundColor: theme("colors.gray.100"),
              padding: theme("spacing.1"),
              borderRadius: theme("borderRadius.lg"),
            },
            "code::before": {
              content: "",
            },
            "code::after": {
              content: "",
            },
            img: {
              margin: 0,
            },
            h1: {
              fontSize: em(36, 16),
              marginTop: em(48, 36),
              marginBottom: em(12, 36),
              lineHeight: round(40 / 36),
            },
            h2: {
              fontSize: em(24, 16),
              marginTop: em(32, 24),
              marginBottom: em(8, 24),
              lineHeight: round(32 / 24),
            },
            h3: {
              fontSize: em(20, 16),
              marginTop: em(24, 20),
              marginBottom: em(6, 20),
              lineHeight: round(32 / 20),
            },
            h4: {
              marginTop: em(16, 16),
              marginBottom: em(4, 16),
              lineHeight: round(24 / 16),
            },
          },
        },
        invert: {
          css: {
            color: theme("colors.gray.300"),
            a: {
              color: theme("colors.blue.400"),
            },
            pre: {
              color: theme("colors.gray.300"),
              backgroundColor: theme("colors.gray.800"),
            },
            code: {
              color: theme("colors.gray.300"),
              backgroundColor: theme("colors.gray.800"),
            },
          },
        },
      }),
    },
  },
}
