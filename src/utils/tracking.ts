import { createUser } from "../api/api";
import { getOrCreateVisitorUid } from "./visitorUid.js";

export const trackVisit = async () => {
  const params = new URLSearchParams(window.location.search);
  const user_id = getOrCreateVisitorUid();
  if (!user_id) {
    return;
  }

  try {
    await createUser({
      user_id,
      uid: user_id,
      first_seen_at: new Date().toISOString(),
      utm_source: params.get("utm_source") || undefined,
      utm_medium: params.get("utm_medium") || undefined,
      utm_campaign: params.get("utm_campaign") || undefined,
      utm_ad_id: params.get("utm_ad_id") || undefined,
      utm_adgroup: params.get("utm_adgroup") || undefined,
      utm_adgroup_id: params.get("utm_adgroup_id") || undefined,
      utm_campaign_id: params.get("utm_campaign_id") || undefined,
      utm_device: params.get("utm_device") || undefined,
      utm_network: params.get("utm_network") || undefined,
      utm_keyword: params.get("utm_keyword") || undefined,
      utm_matchtype: params.get("utm_matchtype") || undefined,
      utm_content: params.get("utm_content") || undefined,
      ad_name: params.get("ad_name") || undefined,
      gclid: params.get("gclid") || undefined,
      lifecycle_stage: "visitor",
    });
  } catch (error) {
    console.error("[Tracking] Error creating visitor user:", error);
  }
};


