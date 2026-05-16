/**
 * Landing / public Stryke-X API base (same host as token-free routes like
 * `/strykex/createAlogoLead` and `/stryke-x-blog/public/...`).
 *
 * Configure via `.env`:
 * - `VITE_NODE_ENV`: `local` | `dev` | `prod`
 * - `VITE_API_LOCAL_URL`: e.g. `http://localhost:8001` (appends `/api/v2` if missing)
 * - `VITE_API_PROD_URL`: e.g. `https://api.strykex.in/api/v2/`
 * - `VITE_API_DEV_URL` (optional): used when `VITE_NODE_ENV=dev`
 */

const DEFAULT_PROD_BASE = "https://api.strykex.in/api/v2";
const DEFAULT_LOCAL_ROOT = "http://localhost:8001";

function trimTrailingSlashes(s) {
  return String(s || "").replace(/\/+$/, "");
}

/** Ensures base ends with `/api/v2` (no trailing slash). */
export function normalizeV2ApiBase(raw) {
  let s = trimTrailingSlashes(String(raw || "").trim());
  if (!s) return DEFAULT_PROD_BASE;
  if (/\/api\/v2$/i.test(s)) return s;
  try {
    const u = new URL(s);
    const path = (u.pathname || "").replace(/\/+$/, "") || "";
    const merged = `${path}/api/v2`.replace(/\/+/g, "/");
    return `${u.origin}${merged}`.replace(/\/+$/, "");
  } catch {
    return `${s}/api/v2`.replace(/\/+/g, "/").replace(/\/+$/, "");
  }
}

function readEnv(key) {
  if (typeof import.meta === "undefined" || !import.meta.env) return "";
  const v = import.meta.env[key];
  return v != null ? String(v).trim() : "";
}

/**
 * @returns {string} Base URL for `/api/v2` (no trailing slash), e.g. `https://api.strykex.in/api/v2`
 */
export function getLandingApiV2Base() {
  const mode = (readEnv("VITE_NODE_ENV") || "prod").toLowerCase();
  const localRaw = readEnv("VITE_API_LOCAL_URL") || DEFAULT_LOCAL_ROOT;
  const prodRaw = readEnv("VITE_API_PROD_URL") || DEFAULT_PROD_BASE;
  const devRaw = readEnv("VITE_API_DEV_URL") || prodRaw;

  let chosen = prodRaw;
  if (mode === "local") chosen = localRaw;
  else if (mode === "dev") chosen = devRaw;

  return normalizeV2ApiBase(chosen);
}

/**
 * @param {string} path — segment after `/api/v2/`, e.g. `strykex/createAlogoLead`
 * @returns {string} Full URL
 */
export function getLandingApiV2Url(path) {
  const base = getLandingApiV2Base();
  const p = String(path || "").replace(/^\/+/, "");
  return p ? `${base}/${p}` : base;
}
