import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  /** Same name as server / Razorpay dashboard: RAZORPAY_KEY_ID (public Key Id only). */
  const razorpayKeyId = (env.RAZORPAY_KEY_ID || env.VITE_RAZORPAY_KEY_ID || "").trim();

  return {
    plugins: [react()],
    define: {
      "import.meta.env.RAZORPAY_KEY_ID": JSON.stringify(razorpayKeyId),
    },
  };
});
