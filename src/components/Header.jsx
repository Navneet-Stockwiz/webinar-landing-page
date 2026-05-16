import React, { useState, useEffect } from "react";
import mainlogo from "../assets/svg/mainlogo.svg";
import whatsappIcon from "../assets/svg/whatsappiconnew.svg";
import { useLanguage } from "../contexts/LanguageContext";
import StrykeXPopupDialog from "./StrykeXPopupDialog";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=916350670245&text=Hello%2C%0AI+just+visited+your+website%2C+I+am+interested+in+joining+the+webinar.+Please+share+the+webinar+joining+details.%0AStockwiz%0Ahttps%3A%2F%2Falpha.stockwiz.in%2F&type=phone_number&app_absent=0";

const SCROLL_THRESHOLD = 24;

const Header = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const { selectedLanguage, selectLanguage, clearLanguage } = useLanguage();

  useEffect(() => {
    const onScroll = () => {
      setIsSticky(window.scrollY > SCROLL_THRESHOLD);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  const handleRegisterFree = () => {
    selectLanguage("english");
    setShowDialog(true);
  };

  return (
    <header
      className={`w-full bg-[#0000005C] backdrop-blur-[30px] transition-[box-shadow] duration-200 ${
        isSticky
          ? "fixed top-0 left-0 right-0 z-50 shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
          : "relative z-20 shrink-0"
      }`}
    >
      <nav className="flex items-center justify-between gap-4 w-full py-0.5 px-4 md:px-80 3xl:px-[450px]">
        <a href="/" className="flex flex-col items-start shrink-0 min-w-0">
          <img
            src={mainlogo}
            alt="StrykeX"
            className="h-[18px] md:h-[22px] w-auto"
          />
          <span className="text-[7px] md:text-[8px] font-medium tracking-[0.14em] text-white/70 uppercase mt-0.5">
            A STOCKWIZ PRODUCT
          </span>
        </a>

        <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
          <button
            type="button"
            onClick={() => window.open(WHATSAPP_URL, "_blank")}
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
            onClick={handleRegisterFree}
            className="flex items-center gap-1.5 bg-white text-black text-[12px] md:text-[13px] font-semibold pl-3 pr-2.5 md:pl-3.5 md:pr-3 py-1.5 md:py-2 rounded-[10px] hover:bg-gray-100 transition whitespace-nowrap"
          >
            Register Free
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

      <StrykeXPopupDialog
        open={showDialog}
        onClose={handleDialogClose}
        onSuccess={handleDialogSuccess}
        selectedLanguage={selectedLanguage}
      />
    </header>
  );
};

export default Header;
