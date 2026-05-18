import axios from "axios";

/** WizOps API origin (no trailing slash). See `.env`: `VITE_NODE_ENV`, `VITE_API_USER_*_URL`, optional `VITE_WIZOPS_API_BASE_URL`. */
export function getWizopsApiRoot() {
  const override = import.meta.env.VITE_WIZOPS_API_BASE_URL?.replace(/\/$/, "").trim();
  if (override) return override;

  const runtimeEnv = (import.meta.env.VITE_NODE_ENV ?? "").toLowerCase();
  const rootLocal =
    import.meta.env.VITE_API_USER_LOCAL_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
  const rootDev =
    import.meta.env.VITE_API_USER_DEV_URL?.replace(/\/$/, "") ?? "https://devapiwizops.stockwiz.in";
  const rootProd =
    import.meta.env.VITE_API_USER_PROD_URL?.replace(/\/$/, "") ?? "https://apiwizops.stockwiz.in";

  const isLocalHost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

  if (runtimeEnv === "local") return rootLocal;
  if (runtimeEnv === "dev") return rootDev;
  if (runtimeEnv === "prod") return rootProd;
  if (isLocalHost) return rootLocal;
  return rootDev;
}

const baseURL = getWizopsApiRoot();
const apiKey = import.meta.env.VITE_API_KEY || "";
const defaultHeaders = {
  "Content-Type": "application/json",
  "accept-language": "en",
  ...(apiKey ? { "api-key": apiKey } : {}),
};

const request = ({ method = "get", url, data, params, headers = {} }) => {
  return axios({
    method,
    url,
    data,
    params,
    baseURL,
    timeout: 30000,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  });
};

const api = {
  request,
  get: (url, config = {}) => request({ method: "get", url, ...config }),
  post: (url, data, config = {}) => request({ method: "post", url, data, ...config }),
  put: (url, data, config = {}) => request({ method: "put", url, data, ...config }),
  patch: (url, data, config = {}) => request({ method: "patch", url, data, ...config }),
  delete: (url, config = {}) => request({ method: "delete", url, ...config }),
};

export const DEFAULT_PAID_CHECKOUT_AMOUNT = 199;

export const createUser = (payload) => api.post("/api/v1/users", payload);

export const createRegistration = (payload) =>
  api.post("/api/v1/registrations", payload);
export const resolveAgency = (source) =>
  api.get("/api/v1/agencies/resolve", {
    params: { source },
  });

/** POST /api/v1/payments/order — body: { amount (INR), source?, attributed_agency_id?, currency?, receipt?, notes? } */
export const createRazorpayOrder = (payload) =>
  api.post("/api/v1/payments/order", payload);

/** POST /api/v1/payments — after Razorpay Checkout success */
export const recordPayment = (payload) => api.post("/api/v1/payments", payload);

export default api;
