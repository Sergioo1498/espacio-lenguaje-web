import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terracota: {
          DEFAULT: "#C4745A",
          light: "#d4917a",
          dark: "#a85f48",
        },
        verde: {
          DEFAULT: "#8FAE8B",
          light: "#a8c4a5",
          dark: "#6d8d69",
        },
        arena: "#F5E6D3",
        cacao: "#3D2C2E",
        crema: "#FDF8F4",
        "texto-secundario": "#6b5a5c",
        "texto-muted": "#9a8a8c",
      },
      fontFamily: {
        serif: ["var(--font-dm-serif)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        pill: "50px",
      },
    },
  },
  plugins: [],
};

export default config;
