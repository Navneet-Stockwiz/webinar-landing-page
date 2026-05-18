import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import {
  loadRazorpayScript,
  getPayOrderContextStorageKey,
  completePaidWebinarAfterRazorpay,
} from "../utils/razorpayPaidWebinarFlow.js";
import { LANDING_PATHS } from "../contexts/LandingVariantContext.jsx";

function parsePayContext(raw) {
  try {
    const o = JSON.parse(raw);
    if (!o || typeof o !== "object") return null;
    return o;
  } catch {
    return null;
  }
}

function clearPayContext(orderId) {
  if (!orderId) return;
  try {
    localStorage.removeItem(getPayOrderContextStorageKey(orderId));
  } catch {
    /* ignore */
  }
}

/**
 * New tab: query has Razorpay order; localStorage (same origin, shared across tabs) has buyer + agency.
 */
export default function PayOrderTab() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const ranRef = useRef(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const orderId = searchParams.get("order_id");
    const keyFromQuery = searchParams.get("key_id");
    const keyId =
      (keyFromQuery && keyFromQuery.trim()) ||
      (typeof import.meta.env.RAZORPAY_KEY_ID === "string" && import.meta.env.RAZORPAY_KEY_ID.trim()) ||
      (typeof import.meta.env.VITE_RAZORPAY_KEY_ID === "string" &&
        import.meta.env.VITE_RAZORPAY_KEY_ID.trim()) ||
      "";
    const amountPaise = Number(searchParams.get("amount_paise"));
    const currency = searchParams.get("currency") || "INR";

    if (!orderId || !keyId || !Number.isFinite(amountPaise)) {
      setError("Invalid payment link. Missing order details.");
      return;
    }

    const storageKey = getPayOrderContextStorageKey(orderId);
    const ctxRaw = localStorage.getItem(storageKey);
    const ctx = parsePayContext(ctxRaw);

    if (!ctx?.name || !ctx?.agencyId || ctx.razorpay_order_id !== orderId) {
      clearPayContext(orderId);
      setError(
        "Checkout session not found or expired. Open checkout again from the payment form.",
      );
      return;
    }

    const od = {
      order_id: orderId,
      key_id: keyId,
      amount_paise: amountPaise,
      currency,
    };

    void (async () => {
      try {
        await loadRazorpayScript();
      } catch {
        clearPayContext(orderId);
        setError("Could not load payment gateway.");
        return;
      }

      const rzp = new window.Razorpay({
        key: keyId,
        amount: amountPaise,
        currency,
        order_id: orderId,
        name: "Stockwiz",
        prefill: {
          name: ctx.name,
          email: ctx.email,
          contact: (ctx.fullPhone || "").replace(/^\+91/, ""),
        },
        theme: { color: "#3F72FF" },
        modal: {
          ondismiss() {
            clearPayContext(orderId);
            window.close();
          },
        },
        handler(rzpResponse) {
          void (async () => {
            const thankYouPath = ctx.channel === "meta" ? "/m-thankyou" : "/g-thankyou";
            try {
              await completePaidWebinarAfterRazorpay(od, rzpResponse, ctx);
              if (typeof window !== "undefined") {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                  event: "purchase_complete",
                  price_inr: Number(ctx.amountInInr),
                  product: window.ACTIVE_WEBINAR?.product ?? null,
                });
              }
            } catch (e) {
              console.error("Post-checkout confirmation failed (thank-you still shown):", e);
            } finally {
              clearPayContext(orderId);
              navigate(thankYouPath, { replace: true });
            }
          })();
        },
      });

      rzp.on("payment.failed", () => {
        clearPayContext(orderId);
        window.close();
      });

      rzp.open();
    })();
  }, [navigate, searchParams]);

  if (error) {
    return (
      <div
        style={{
          padding: 24,
          fontFamily: "system-ui, sans-serif",
          maxWidth: 480,
          margin: "48px auto",
        }}
      >
        <p style={{ marginBottom: 16 }}>{error}</p>
        <Link to={LANDING_PATHS.TESTMARK_ALGO_PAID} replace>
          Back to webinar
        </Link>
      </div>
    );
  }

  /* No copy here — Razorpay modal provides its own UI; this page only hosts Checkout.open(). */
  return null;
}
