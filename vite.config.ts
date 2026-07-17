import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
  },
  preview: {
    host: "0.0.0.0",
    port: Number(process.env.PORT) || 4173,
    allowedHosts: [
      "manish-maiti-portfolio.onrender.com",
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          gsap: ["gsap"],
          router: ["react-router-dom"],
        },
      },
    },
  },
});