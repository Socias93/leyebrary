import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@types": path.resolve(__dirname, "src/types"),
    },
  },
  server: {
    host: true,
  },
  preview: {
    host: true,
    port: process.env.PORT ? Number(process.env.PORT) : 4173,
    allowedHosts: ["leyebrary.onrender.com"],
  },
});
