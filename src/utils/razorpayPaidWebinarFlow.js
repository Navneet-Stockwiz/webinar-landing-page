import {
  createRazorpayOrder,
  recordPayment,
  createRegistration,
  DEFAULT_PAID_CHECKOUT_AMOUNT,
  getWizopsApiRoot,
} from "../api/api";
import axios from "axios";
import { canonicalSourceForAgencyLookup } from "./agencySource.js";
import { gtmWebinarProduct, webinarNameFromVariant } from "./webinarGtm.js";
import { getOrCreateVisitorUid } from "./visitorUid.js";

export const WIZ_PAY_ORDER_SESSION_KEY = "wiz_pay_order_ctx";
const ACTIVE_SESSION_API_BASE = getWizopsApiRoot();

/** localStorage key — shared across tabs (sessionStorage is not). */
export function getPayOrderContextStorageKey(orderId) {
  return `${WIZ_PAY_ORDER_SESSION_KEY}:${orderId}`;
}

function unwrapApiData(res) {
  return res?.data?.data ?? res?.data;
}

/** Public Key Id — matches Razorpay / backend env name `RAZORPAY_KEY_ID` (see vite.config.js). */
function razorpayPublishableKeyId() {
  const fromEnv = import.meta.env?.RAZORPAY_KEY_ID ?? import.meta.env?.VITE_RAZORPAY_KEY_ID;
  return typeof fromEnv === "string" ? fromEnv.trim() : "";
}

export function loadRazorpayScript() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Razorpay requires a browser"));
  }
  if (window.Razorpay) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Could not load Razorpay checkout"));
    document.body.appendChild(s);
  });
}

function isUuidString(value) {
  if (typeof value !== "string") return false;
  const v = value.trim();
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);
}

function generateRegistrationId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback for older browsers.
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

async function resolveZoomWebinarId(zoomWebinarId, paymentSource) {
  if (zoomWebinarId != null && String(zoomWebinarId).trim() !== "") {
    return String(zoomWebinarId).trim();
  }
  if (typeof paymentSource !== "string" || paymentSource.trim() === "") {
    return undefined;
  }
  try {
    const response = await axios.get(
      `${ACTIVE_SESSION_API_BASE}/api/v1/site-product-mappings/webinar-session-active`,
      {
        params: { site_name: paymentSource.trim() },
      },
    );
    const fromApi = response?.data?.data?.webinar_session?.zoom_webinar_id;
    if (fromApi != null && String(fromApi).trim() !== "") {
      return String(fromApi).trim();
    }
  } catch (error) {
    console.warn("Failed to resolve zoom_webinar_id for paid order notes:", error);
  }
  return undefined;
}

/**
 * Creates a Razorpay order, stores context in localStorage (readable in a new tab), opens `checkout_url`.
 */
export async function startPaidWebinarCheckoutInNewTab(opts) {
  const {
    name,
    email,
    fullPhone,
    agencyId: agencyIdOpt,
    paymentSource,
    channel,
    selectedLanguage,
    searchParams,
    leadParamsFromSearch,
    zoomWebinarId,
    amountInInr = DEFAULT_PAID_CHECKOUT_AMOUNT,
  } = opts;

  const visitorUid = getOrCreateVisitorUid();
  if (!visitorUid) {
    throw new Error("Visitor id missing.");
  }
  const registrationId = generateRegistrationId();
  const finalZoomWebinarId = await resolveZoomWebinarId(zoomWebinarId, paymentSource);

  const sourceForResolve =
    typeof paymentSource === "string" && paymentSource.trim()
      ? canonicalSourceForAgencyLookup(paymentSource.trim())
      : "";
  const orderBody = {
    amount: amountInInr,
    currency: "INR",
    notes: {
      name,
      email,
      phone: fullPhone,
      uid: visitorUid,
      registration_id: registrationId,
      ...(finalZoomWebinarId
        ? { zoom_webinar_id: finalZoomWebinarId, id: finalZoomWebinarId }
        : {}),
    },
    ...(sourceForResolve ? { source: sourceForResolve } : {}),
    ...(isUuidString(agencyIdOpt) ? { attributed_agency_id: agencyIdOpt.trim() } : {}),
  };

  let orderRes;
  try {
    orderRes = await createRazorpayOrder(orderBody);
  } catch (e) {
    throw new Error(
      e?.response?.data?.message || e?.message || "Could not create payment order.",
    );
  }

  const od = unwrapApiData(orderRes);
  const keyId =
    (typeof od?.key_id === "string" && od.key_id.trim()) || razorpayPublishableKeyId();
  if (!od?.order_id || !keyId || od.amount_paise == null) {
    throw new Error("Invalid payment order response.");
  }

  const agencyId =
    typeof od.agency_id === "string" && isUuidString(od.agency_id)
      ? od.agency_id.trim()
      : isUuidString(agencyIdOpt)
        ? agencyIdOpt.trim()
        : undefined;
  if (!agencyId) {
    throw new Error("Invalid payment order response (agency missing).");
  }

  const lead =
    typeof leadParamsFromSearch === "function"
      ? leadParamsFromSearch(searchParams)
      : {};

  const payload = {
    razorpay_order_id: od.order_id,
    name,
    email,
    fullPhone,
    agencyId,
    paymentSource,
    channel,
    selectedLanguage: selectedLanguage || "english",
    lead,
    amountInInr,
  };

  // Required paid flow sequence:
  // 1) create order, 2) create registration (replaces legacy create-user call), 3) open checkout.
  await createRegistration({
    ...(lead && typeof lead === "object" ? lead : {}),
    user_id: visitorUid,
    uid: visitorUid,
    name,
    email,
    phone: fullPhone,
    source: paymentSource,
    agency_id: agencyId,
    subscription_type: "PAID",
    language: selectedLanguage || "english",
    webinar_type: "PAID",
    ...(finalZoomWebinarId ? { id: finalZoomWebinarId } : {}),
    registration_id: registrationId,
    event: "webinar_order_created_paid",
    webinar_name: webinarNameFromVariant(channel, true),
    order_id: od.order_id,
    value: amountInInr,
    currency: od.currency || "INR",
  });

  try {
    localStorage.setItem(getPayOrderContextStorageKey(od.order_id), JSON.stringify(payload));
  } catch {
    throw new Error("Could not store checkout context. Allow storage for this site.");
  }

  const apiCheckout =
    typeof od.checkout_url === "string" ? od.checkout_url.trim() : "";
  const fallbackAbs = `${window.location.origin}/pay-order?${new URLSearchParams({
    order_id: od.order_id,
    key_id: keyId,
    amount_paise: String(od.amount_paise),
    currency: od.currency || "INR",
  })}`;
  const checkoutUrl = (() => {
    if (!apiCheckout) return fallbackAbs;
    if (apiCheckout.startsWith("http://") || apiCheckout.startsWith("https://")) return apiCheckout;
    if (apiCheckout.startsWith("/")) return `${window.location.origin}${apiCheckout}`;
    return fallbackAbs;
  })();

  // `window.open(..., "noopener")` returns `null` even when a tab opens — use a real link click instead.
  const a = document.createElement("a");
  a.href = checkoutUrl;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/**
 * Run inside `/pay-order` tab after Razorpay succeeds.
 */
function isPaymentAlreadyRecordedError(err) {
  const status = err?.response?.status;
  const code = err?.response?.data?.error?.code;
  return status === 409 && code === "PAYMENT_EXISTS";
}

export async function completePaidWebinarAfterRazorpay(od, rzpResponse, ctx) {
  const visitorUid = getOrCreateVisitorUid();
  if (!visitorUid) {
    throw new Error("Visitor id missing.");
  }

  const webinarIdRaw = ctx?.lead?.webinar_id;
  const webinarId =
    typeof webinarIdRaw === "string" && isUuidString(webinarIdRaw) ? webinarIdRaw.trim() : undefined;

  try {
    await recordPayment({
      payment_id: rzpResponse.razorpay_payment_id,
      razorpay_order_id: rzpResponse.razorpay_order_id,
      razorpay_signature: rzpResponse.razorpay_signature,
      user_id: visitorUid,
      attributed_agency_id: ctx.agencyId,
      amount_paise: od.amount_paise,
      currency: od.currency || "INR",
      product: gtmWebinarProduct(),
      ...(webinarId ? { webinar_id: webinarId } : {}),
      order_notes: {
        name: ctx.name,
        email: ctx.email,
        phone: ctx.fullPhone,
        uid: visitorUid,
      },
    });
  } catch (err) {
    if (!isPaymentAlreadyRecordedError(err)) {
      throw err;
    }
  }

  await createRegistration({
    ...(ctx.lead && typeof ctx.lead === "object" ? ctx.lead : {}),
    user_id: visitorUid,
    uid: visitorUid,
    name: ctx.name,
    email: ctx.email,
    phone: ctx.fullPhone,
    source: ctx.paymentSource,
    agency_id: ctx.agencyId,
    subscription_type: "PAID",
    language: ctx.selectedLanguage || "english",
    webinar_type: "PAID",
    event: "webinar_purchase_paid",
    webinar_name: webinarNameFromVariant(ctx.channel, true),
    order_id: rzpResponse.razorpay_order_id,
    payment_id: rzpResponse.razorpay_payment_id,
    value: ctx.amountInInr,
    currency: od.currency || "INR",
  });
}
