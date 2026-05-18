import React, { createContext, useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";

const LandingVariantContext = createContext(null);

export const LANDING_PATHS = {
  G_ALGO_FREE: "/G-algo-free",
  G_ALGO_PAID: "/G-algo-paid",
  M_ALGO_FREE: "/M-algo-free",
  M_ALGO_PAID: "/M-algo-paid",
  TESTMARK_ALGO_FREE: "/testmark-algo-free",
  TESTMARK_ALGO_PAID: "/testmark-algo-paid",
};

const LANDING_PATH_SET = new Set(Object.values(LANDING_PATHS));

/** @returns {boolean} */
export function isLandingPath(pathname) {
  const p = pathname.replace(/\/$/, "") || "/";
  return LANDING_PATH_SET.has(p);
}

function parseLandingPath(pathname) {
  const p = pathname.replace(/\/$/, "") || "/";
  if (p === LANDING_PATHS.TESTMARK_ALGO_PAID) {
    return {
      channel: "google",
      isPaid: true,
      sourcePath: LANDING_PATHS.TESTMARK_ALGO_PAID,
    };
  }
  if (p === LANDING_PATHS.TESTMARK_ALGO_FREE) {
    return {
      channel: "google",
      isPaid: false,
      sourcePath: LANDING_PATHS.TESTMARK_ALGO_FREE,
    };
  }
  if (p === LANDING_PATHS.G_ALGO_PAID) {
    return { channel: "google", isPaid: true, sourcePath: LANDING_PATHS.G_ALGO_PAID };
  }
  if (p === LANDING_PATHS.M_ALGO_PAID) {
    return { channel: "meta", isPaid: true, sourcePath: LANDING_PATHS.M_ALGO_PAID };
  }
  if (p === LANDING_PATHS.M_ALGO_FREE) {
    return { channel: "meta", isPaid: false, sourcePath: LANDING_PATHS.M_ALGO_FREE };
  }
  if (p === LANDING_PATHS.G_ALGO_FREE) {
    return { channel: "google", isPaid: false, sourcePath: LANDING_PATHS.G_ALGO_FREE };
  }
  if (p === "/g-thankyou") {
    return {
      channel: "google",
      isPaid: false,
      sourcePath: LANDING_PATHS.G_ALGO_FREE,
    };
  }
  if (p === "/m-thankyou") {
    return {
      channel: "meta",
      isPaid: false,
      sourcePath: LANDING_PATHS.M_ALGO_FREE,
    };
  }
  return { channel: "google", isPaid: false, sourcePath: LANDING_PATHS.TESTMARK_ALGO_FREE };
}

export function LandingVariantProvider({ children }) {
  const { pathname } = useLocation();

  const value = useMemo(() => {
    const parsed = parseLandingPath(pathname);
    const origin =
      typeof window !== "undefined" && window.location?.origin
        ? window.location.origin
        : "https://automate.stockwiz.in";
    const paymentSource = `${origin}${parsed.sourcePath}`;
    return {
      ...parsed,
      paymentSource,
      pathname,
    };
  }, [pathname]);

  return (
    <LandingVariantContext.Provider value={value}>
      {children}
    </LandingVariantContext.Provider>
  );
}

export function useLandingVariant() {
  const ctx = useContext(LandingVariantContext);
  if (!ctx) {
    return {
      channel: "google",
      isPaid: false,
      sourcePath: LANDING_PATHS.TESTMARK_ALGO_FREE,
      paymentSource: "https://testmark.stockwiz.in/testmark-algo-free",
      pathname: "/",
    };
  }
  return ctx;
}
