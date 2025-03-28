import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        lg: "10px",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "#093545",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "#092C39",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: "#2BD17E",
        secondary: "hsl(var(--secondary))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "#EB5757",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "#224957",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      typography: {
        h1: {
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "600", // SemiBold
          fontSize: "64px",
          lineHeight: "80px",
        },
        h2: {
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "600", // SemiBold
          fontSize: "48px",
          lineHeight: "56px",
        },
        h3: {
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "600", // SemiBold
          fontSize: "32px",
          lineHeight: "40px",
        },
        h4: {
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "700", // Bold
          fontSize: "24px",
          lineHeight: "32px",
        },
        h5: {
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "700", // Bold
          fontSize: "20px",
          lineHeight: "24px",
        },
        h6: {
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "700", // Bold
          fontSize: "16px",
          lineHeight: "24px",
        },
        bodyLarge: {
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "400", // Regular
          fontSize: "20px",
          lineHeight: "32px",
        },
        bodyRegular: {
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "400", // Regular
          fontSize: "16px",
          lineHeight: "24px",
        },
        bodySmall: {
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "400", // Regular
          fontSize: "14px",
          lineHeight: "24px",
        },
        bodyExtraSmall: {
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "400", // Regular
          fontSize: "12px",
          lineHeight: "24px",
        },
        caption: {
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "400", // Regular
          fontSize: "14px",
          lineHeight: "16px",
        },
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
  plugins: [require("tailwindcss-animate")],
};

export default config;
