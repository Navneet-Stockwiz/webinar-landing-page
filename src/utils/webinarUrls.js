/**
 * @param {object | undefined} d - webinarData.data from getWebinarData
 * @param {"google" | "meta"} channel
 * @returns {string}
 */
function getXorlabsPaidCheckoutUrlFromData(d, channel) {
  if (!d) return "";
  const raw =
    channel === "meta" ? d.xorlabs_m_algo_paid_url : d.xorlabs_g_algo_paid_url;
  return typeof raw === "string" ? raw.trim() : "";
}

/**
 * Paid funnel: open XORLABS Razorpay link from CMS (`xorlabs_*_algo_paid_url`) by landing channel.
 * Falls back to `agadh_alphatrading_webinar_*` if XORLABS URLs are missing.
 * @param {"english" | "hindi"} language
 * @param {"google" | "meta"} [channel="google"]
 */
export function openPaidAlphatradingWebinar(webinarData, language, channel = "google") {
  const d = webinarData?.data;

  const checkoutUrl = getXorlabsPaidCheckoutUrlFromData(d, channel);
  if (checkoutUrl) {
    window.open(checkoutUrl, "_blank");
    return;
  }

  if (!d) return;

  if (language === "hindi") {
    const url = d.agadh_alphatrading_webinar_hindi;
    if (typeof url === "string" && url.trim()) {
      window.open(url.trim(), "_blank");
    }
    return;
  }

  const url = d.agadh_alphatrading_webinar_english;
  if (typeof url === "string" && url.trim()) {
    window.open(url.trim(), "_blank");
  }
}
