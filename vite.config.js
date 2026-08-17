import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
export default defineConfig({
    base: "./",
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
                manualChunks: function (id) {
                    if (id.includes("three") || id.includes("@react-three")) {
                        return "three";
                    }
                    if (id.includes("gsap")) {
                        return "gsap";
                    }
                    if (id.includes("react-router-dom")) {
                        return "router";
                    }
                },
            },
        },
    },
});
