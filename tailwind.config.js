/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/container-queries")],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      serif: ["Merriweather", "serif"],
      mono: ["Fira Code", "Consolas", "monospace"],
    },
    extend: {
      colors: {
        brand: "var(--brand)",
        foreground: "var(--foreground)",
        background: "var(--background)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
      },
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
          },
        },
        base: {
          css: {
            h1: {
              marginTop: theme("spacing.12"),
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
