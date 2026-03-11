import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        primary: "#2563eb",
        primaryPurple: "#7c3aed",
        dingtalk: "#0089ff",
        background: "#f5f7fb",
        cardBorder: "#edf2f7",
      },
      borderRadius: {
        card: "20px",
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: {
          css: {
            maxWidth: "none",
            lineHeight: "1.75",
            "--tw-prose-body": theme("colors.slate.700"),
            "--tw-prose-headings": theme("colors.slate.900"),
            "--tw-prose-links": theme("colors.primary"),
            "--tw-prose-bold": theme("colors.slate.900"),
            h1: {
              fontSize: theme("fontSize.2xl"),
              fontWeight: theme("fontWeight.bold"),
              marginBottom: theme("spacing.4"),
              paddingBottom: theme("spacing.3"),
              borderBottomWidth: "2px",
              borderBottomColor: theme("colors.primary"),
            },
            h2: {
              fontSize: theme("fontSize.xl"),
              fontWeight: theme("fontWeight.semibold"),
              marginTop: theme("spacing.8"),
              marginBottom: theme("spacing.3"),
              paddingLeft: theme("spacing.4"),
              borderLeftWidth: "4px",
              borderLeftColor: theme("colors.primary"),
            },
            h3: {
              fontSize: theme("fontSize.lg"),
              fontWeight: theme("fontWeight.semibold"),
              marginTop: theme("spacing.6"),
              marginBottom: theme("spacing.2"),
            },
            "ul,ol": {
              marginTop: theme("spacing.4"),
              marginBottom: theme("spacing.4"),
              paddingLeft: theme("spacing.6"),
            },
            "li": {
              marginTop: theme("spacing.1"),
              marginBottom: theme("spacing.1"),
            },
            hr: {
              marginTop: theme("spacing.8"),
              marginBottom: theme("spacing.8"),
              borderColor: theme("colors.slate.200"),
            },
            "a": {
              color: theme("colors.primary"),
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            },
            "a:hover": {
              textDecorationThickness: "2px",
            },
            blockquote: {
              fontStyle: "normal",
              borderLeftWidth: "4px",
              borderLeftColor: theme("colors.primary"),
              backgroundColor: theme("colors.slate.50"),
              paddingLeft: theme("spacing.4"),
              paddingTop: theme("spacing.2"),
              paddingBottom: theme("spacing.2"),
              paddingRight: theme("spacing.4"),
              borderRadius: theme("borderRadius.lg"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
