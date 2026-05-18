/**
 * Labels aligned with createRegistration payloads (StrykeXPopupDialog, PaymentPage).
 * @param {"google" | "meta"} channel
 * @param {boolean} isPaid
 * @returns {string}
 */
export function webinarNameFromVariant(channel, isPaid) {
  if (isPaid) {
    return channel === "meta" ? "M-Algo Paid Webinar" : "G-Algo Paid Webinar";
  }
  return channel === "meta" ? "M-Algo Free Webinar" : "G-Algo Free Webinar";
}

/**
 * Stable id for GTM / WizOps when CMS does not expose an id.
 * @param {string} sourcePath e.g. "/testmark-algo-free"
 */
export function webinarIdFromSourcePath(sourcePath) {
  const raw = (sourcePath || "").replace(/^\//, "").replace(/\//g, "-");
  return raw || "unknown";
}

/** Product dimension for ingest / GTM Data Layer Variables */
export function gtmWebinarProduct() {
  return "algo_trading_webinar";
}

/**
 * @param {object | null | undefined} webinarData axios root for getWebinarData
 * @param {string} sourcePath from LandingVariantContext
 */
export function resolveWebinarId(webinarData, sourcePath) {
  const d = webinarData?.data;
  const fromApi = d?.webinar_id ?? d?.webinarId ?? d?.id;
  if (fromApi != null && String(fromApi).trim() !== "") {
    return String(fromApi).trim();
  }
  return webinarIdFromSourcePath(sourcePath);
}
