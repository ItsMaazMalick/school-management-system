import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
      boxShadow: {
        input:
          "`0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          "50": "rgba(13, 146, 244, 0.05)",
          "100": "rgba(13, 146, 244, 0.1)",
          "200": "rgba(13, 146, 244, 0.2)",
          "300": "rgba(13, 146, 244, 0.3)",
          "400": "rgba(13, 146, 244, 0.4)",
          "500": "rgba(13, 146, 244, 0.5)",
          "600": "rgba(13, 146, 244, 0.6)",
          "700": "rgba(13, 146, 244, 0.7)",
          "800": "rgba(13, 146, 244, 0.8)",
          "900": "rgba(13, 146, 244, 0.9)",
          DEFAULT: "#223465",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          "50": "rgba(244, 156, 13, 0.05)",
          "100": "rgba(244, 156, 13, 0.1)",
          "200": "rgba(244, 156, 13, 0.55)",
          "300": "rgba(244, 156, 13, 0.6)",
          "400": "rgba(244, 156, 13, 0.65)",
          "500": "rgba(244, 156, 13, 0.7)",
          "600": "rgba(244, 156, 13, 0.75)",
          "700": "rgba(244, 156, 13, 0.8)",
          "800": "rgba(244, 156, 13, 0.85)",
          "900": "rgba(244, 156, 13, 0.9)",
          DEFAULT: "hsl(var(--secondary))", // Add actual secondary color if not using var
          foreground: "hsl(var(--secondary-foreground))", // Add actual foreground if needed
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), addVariablesForColors],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default withUt(config);
