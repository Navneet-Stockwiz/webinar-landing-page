import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/digio-sdk": {
        target: "https://app.digio.in",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/digio-sdk/, "/sdk/v11"),
      },
    },
  },
});
