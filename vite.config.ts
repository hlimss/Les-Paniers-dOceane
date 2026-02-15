import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { copyFileSync } from "fs";

// https://vitejs.dev/config/
// Détecter la plateforme : Vercel utilise VERCEL=1, GitHub Pages utilise le base path
const getBasePath = () => {
  if (process.env.VITE_BASE_PATH) {
    return process.env.VITE_BASE_PATH;
  }
  // Si on est sur Vercel, utiliser la racine
  if (process.env.VERCEL) {
    return '/';
  }
  // Sinon, pour GitHub Pages en production
  if (process.env.NODE_ENV === 'production') {
    return '/Les-Paniers-dOceane/';
  }
  return '/';
};

export default defineConfig({
  base: getBasePath(),
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress warnings
      },
    },
  },
  plugins: [
    react(),
    {
      name: 'copy-404',
      closeBundle() {
        if (process.env.NODE_ENV === 'production') {
          try {
            copyFileSync('public/404.html', 'dist/404.html');
          } catch (err) {
            console.warn('Could not copy 404.html:', err);
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
