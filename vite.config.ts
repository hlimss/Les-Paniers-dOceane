import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { copyFileSync } from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  // IMPORTANT : chemin relatif pour éviter les 404 sur Vercel
  base: "./",

  build: {
    rollupOptions: {
      onwarn() {
        // ignore warnings
      },
    },
  },

  plugins: [
    react(),

    // copie 404.html pour SPA routing
    {
      name: "copy-404",
      closeBundle() {
        if (process.env.NODE_ENV === "production") {
          try {
            copyFileSync("public/404.html", "dist/404.html");
          } catch (err) {
            console.warn("Could not copy 404.html:", err);
          }
        }
      },
    },
  ],

  server: {
    host: "::",
    port: 5173,
    hmr: {
      overlay: false,
    },
    strictPort: false,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
