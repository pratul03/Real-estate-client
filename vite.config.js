import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8800/api", // The backend server's URL
        changeOrigin: true,
        secure: false, // If you're not using HTTPS
      },
    },
  },
});
