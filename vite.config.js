import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  base: "/products",

  server: {
    proxy: {
      "/api": {
        target: "https://api.redseam.redberryinternship.ge/api",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
