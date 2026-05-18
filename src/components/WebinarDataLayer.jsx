import { useEffect } from "react";
import { useWebinar } from "../contexts/WebinarContext.jsx";
import { isLandingPath, useLandingVariant } from "../contexts/LandingVariantContext.jsx";
import {
  resolveWebinarId,
  webinarNameFromVariant,
} from "../utils/webinarGtm.js";

/**
 * Pushes webinar fields for GTM Data Layer Variables (e.g. WizOps landing_page_view tag).
 */
export default function WebinarDataLayer() {
  const { channel, isPaid, pathname, sourcePath } = useLandingVariant();
  const { webinarData } = useWebinar();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isLandingPath(pathname)) return;

    const d = webinarData?.data || {};
    const webinarId = d.webinar_id ?? resolveWebinarId(webinarData, sourcePath);
    const webinarName = d.webinar_name ?? webinarNameFromVariant(channel, isPaid);
    const webinarType = d.webinar_type ?? null;
    const product = d.product ?? null;

    window.dataLayer = window.dataLayer || [];
    window.ACTIVE_WEBINAR = {
      id: webinarId,
      topic: webinarName,
      webinar_type: webinarType,
      product,
    };
    window.dataLayer.push({
      webinar_id: webinarId,
      webinar_name: webinarName,
      webinar_type: webinarType,
      product,
      webinar_channel: channel,
      webinar_is_paid: isPaid,
      page_path: pathname,
    });
  }, [channel, isPaid, pathname, sourcePath, webinarData]);

  return null;
}
