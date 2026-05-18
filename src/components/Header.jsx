import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import mainlogo from "../assets/svg/mainlogo.svg";
import whatsappIcon from "../assets/svg/whatsappiconnew.svg";
import { useLanguage } from "../contexts/LanguageContext";
import { useWebinar } from "../contexts/WebinarContext";
import {
  isLandingPath,
  useLandingVariant,
  LANDING_PATHS,
} from "../contexts/LandingVariantContext.jsx";
import { openPaidAlphatradingWebinar } from "../utils/webinarUrls";
import StrykeXPopupDialog from "./StrykeXPopupDialog";

const Header = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [isPinned, setIsPinned] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const sentinelRef = useRef(null);
  const headerRef = useRef(null);
  const location = useLocation();
  const { selectedLanguage, selectLanguage, clearLanguage } = useLanguage();
  const { webinarData } = useWebinar();
  const { isPaid, paymentSource, channel } = useLandingVariant();

  const whatsappLeadUrl = useMemo(() => {
    const text = `Hello,\nI just visited your website, I am interested in joining the webinar. Please share the webinar joining details.\nStockwiz\n${paymentSource}`;
    return `https://api.whatsapp.com/send/?phone=916350670245&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0`;
  }, [paymentSource]);

  useEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    const updateHeight = () => setHeaderHeight(headerEl.offsetHeight);
    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(headerEl);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsPinned(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const handleDialogClose = () => {
    setShowDialog(false);
    setPendingAction(null);
    clearLanguage();
  };

  const handleDialogSuccess = () => {
    if (pendingAction) {
      pendingAction();
    }
  };

  const handleSignUp = () => {
    if (isPaid) {
      openPaidAlphatradingWebinar(webinarData, "english", channel);
      return;
    }
    selectLanguage("english");
    setShowDialog(true);
  };

  return (
    <>
      <div ref={sentinelRef} className="h-px w-full shrink-0" aria-hidden />
      <div
        className="shrink-0"
        style={{ height: isPinned ? headerHeight : 0 }}
        aria-hidden
      />

      <div
        className={
          isPinned
            ? "fixed top-4 inset-x-0 z-50 flex justify-center px-4 md:px-6 pointer-events-none"
            : "relative z-20 w-full shrink-0"
        }
      >
        <header
          ref={headerRef}
          className={`w-full bg-[#0000005C] backdrop-blur-[30px] transition-shadow duration-200 ${
            isPinned
              ? "pointer-events-auto shadow-[0_16px_48px_rgba(0,0,0,0.55)]"
              : ""
          }`}
        >
          <nav className="flex items-center justify-between gap-4 w-full py-0.5 px-4 md:px-80 3xl:px-[450px]">
            <Link
              to={
                isLandingPath(location.pathname)
                  ? location.pathname
                  : LANDING_PATHS.G_ALGO_FREE
              }
              className="flex flex-col items-start shrink-0 min-w-0"
            >
              <img
                src={mainlogo}
                alt="StrykeX"
                className="h-[18px] md:h-[22px] w-auto"
              />
              <span className="text-[7px] md:text-[8px] font-medium tracking-[0.14em] text-white/70 uppercase mt-0.5">
                A STOCKWIZ PRODUCT
              </span>
            </Link>

            <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
              <button
                type="button"
                onClick={() => window.open(whatsappLeadUrl, "_blank")}
                className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-[8px] border border-white/35 hover:bg-white/10 transition"
                aria-label="Contact on WhatsApp"
              >
                <img
                  src={whatsappIcon}
                  alt=""
                  className="w-4 h-4 md:w-5 md:h-5 object-contain"
                />
              </button>

              <button
                type="button"
                onClick={handleSignUp}
                className="flex items-center gap-1.5 bg-white text-black text-[12px] md:text-[13px] font-semibold pl-3 pr-2.5 md:pl-3.5 md:pr-3 py-1.5 md:py-2 rounded-[10px] hover:bg-gray-100 transition whitespace-nowrap"
              >
                {isPaid ? "Sign Up" : "Register Free"}
                <svg
                  className="w-3.5 h-3.5 shrink-0"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M3 8h9M9 5l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </nav>

          {!isPaid && (
            <StrykeXPopupDialog
              open={showDialog}
              onClose={handleDialogClose}
              onSuccess={handleDialogSuccess}
              selectedLanguage={selectedLanguage}
            />
          )}
        </header>
      </div>
    </>
  );
};

export default Header;
