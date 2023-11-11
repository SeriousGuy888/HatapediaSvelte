/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      serif: ["Merriweather", "serif"],
      mono: ["Fira Code", "Consolas", "monospace"],
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
            code: {
              color: theme("colors.gray.300"),
              backgroundColor: theme("colors.gray.800"),
            },
          },
        },
        print: {
          css: {
            // backgroundColor: theme("colors.white"),
            color: theme("colors.gray.800") + " !important",
            h1: {
              color: theme("colors.black"),
            },
            h2: {
              color: theme("colors.black"),
            },
            h3: {
              color: theme("colors.black"),
            },
            h4: {
              color: theme("colors.black"),
            },
            h5: {
              color: theme("colors.black"),
            },
            h6: {
              color: theme("colors.black"),
            },
            blockquote: {
              borderLeftColor: theme("colors.gray.500"),
              color: theme("colors.gray.800"),
            },
            strong: {
              color: theme("colors.gray.800"),
            },
            a: {
              textDecoration: "underline",
            },
          },
        },
      }),
    },
  },
}
