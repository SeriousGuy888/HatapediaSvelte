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
      colors: {
        brand: "hsl(var(--brand) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        primary: "hsl(var(--primary) / <alpha-value>)",
        secondary: "hsl(var(--secondary) / <alpha-value>)",
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
