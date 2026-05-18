/** Match WizOps agency master URLs for testmark landings (see wizops-backend agencies.master-data). */
const CANONICAL_TESTMARK_ORIGIN = "https://testmark.stockwiz.in";

/**
 * Map local dev URLs to the canonical host so GET /agencies/resolve finds XOR Labs entries.
 * Registration payloads should still use the real `paymentSource` from the app.
 */
export function canonicalSourceForAgencyLookup(source) {
  if (!source || typeof source !== "string") return source;
  try {
    const u = new URL(source);
    const host = u.hostname.toLowerCase();
    if (host === "localhost" || host === "127.0.0.1") {
      return `${CANONICAL_TESTMARK_ORIGIN}${u.pathname || "/"}${u.search || ""}`;
    }
  } catch {
    return source;
  }
  return source;
}
