const COOKIE_NAME = "stockwiz_uid";
const COOKIE_DAYS = 90;

function hostnameAllowsStockwizCookieDomain(hostname) {
  return hostname === "stockwiz.in" || hostname.endsWith(".stockwiz.in");
}

function getCookie(name) {
  const m = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
  return m ? decodeURIComponent(m.pop()) : null;
}

function setCookie(name, value, days) {
  const exp = new Date(Date.now() + days * 864e5).toUTCString();
  const host = window.location.hostname || "";
  const domainPart = hostnameAllowsStockwizCookieDomain(host)
    ? "; domain=.stockwiz.in"
    : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${exp}${domainPart}; path=/; SameSite=Lax`;
}

/** RFC 4122 v4 (Prisma `User.user_id` is UUID). */
function randomUuidV4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function newVisitorUid() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return randomUuidV4();
}

/**
 * Stable anonymous id for user + registration APIs (matches cookie used for analytics).
 * @returns {string}
 */
export function getOrCreateVisitorUid() {
  if (typeof window === "undefined") return "";
  let uid = getCookie(COOKIE_NAME);
  if (!uid) {
    uid = newVisitorUid();
    setCookie(COOKIE_NAME, uid, COOKIE_DAYS);
  }
  return uid;
}
