import { getLandingApiV2Base } from "./landingApiBase.js";

/** Optional override for blog fetches only (otherwise uses landing env URLs). */
export function getStrykeBlogApiBase() {
  const raw =
    typeof import.meta !== "undefined" && import.meta.env?.VITE_STRYKE_API_BASE_URL
      ? String(import.meta.env.VITE_STRYKE_API_BASE_URL).trim()
      : "";
  if (raw) return raw.replace(/\/$/, "");
  return getLandingApiV2Base();
}

export async function fetchStrykeXBlogCategories() {
  const base = getStrykeBlogApiBase();
  const res = await fetch(`${base}/stryke-x-blog/public/categories`);
  if (!res.ok) {
    throw new Error(`Stryke blog categories failed: ${res.status}`);
  }
  const json = await res.json();
  if (!json || json.code !== 200 || !Array.isArray(json.data)) {
    throw new Error("Stryke blog categories: unexpected response");
  }
  return json.data;
}

export async function fetchStrykeXBlogsPublic() {
  const base = getStrykeBlogApiBase();
  const res = await fetch(`${base}/stryke-x-blog/public/list`);
  if (!res.ok) {
    throw new Error(`Stryke blogs list failed: ${res.status}`);
  }
  const json = await res.json();
  if (!json || json.code !== 200 || !Array.isArray(json.data)) {
    throw new Error("Stryke blogs list: unexpected response");
  }
  return json.data;
}

export async function fetchStrykeXBlogBySlug(slug) {
  const base = getStrykeBlogApiBase();
  const enc = encodeURIComponent(String(slug || "").trim());
  if (!enc) return null;
  const res = await fetch(`${base}/stryke-x-blog/public/post/${enc}`);
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Stryke blog fetch failed: ${res.status}`);
  }
  const json = await res.json();
  if (!json || json.code !== 200 || !json.data) return null;
  return json.data;
}
