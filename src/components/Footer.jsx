import React, { useEffect, useState } from "react";
import logofooter from "../assets/svg/logofooter.svg";
import verified from "../assets/svg/verified2.svg";
import whatsapp1 from "../assets/svg/whatsapp1.svg";
import hour from "../assets/svg/hour.svg";
import call from "../assets/svg/call.svg";
import email from "../assets/svg/email.svg";
import facebook from "../assets/svg/facebook1.svg";
import twitter from "../assets/svg/twitter.svg";
import instagram from "../assets/svg/instagram.svg";
import youtube from "../assets/svg/youtube.svg";
import linkedin from "../assets/svg/linkedin.svg";
import { AnimateFromInside } from "../common/ScrollFadeIn";
import { useWebinar } from "../contexts/WebinarContext";
import { useLanguage } from "../contexts/LanguageContext";
import { getFormattedWebinarDates } from "../utils/dateFormatter";
import StrykeXPopupDialog from "./StrykeXPopupDialog";
import StrykexPaymentDialog from "./StrykexPaymentDialog";
import { useLandingVariant } from "../contexts/LandingVariantContext.jsx";

const CalendarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
    aria-hidden
  >
    <path
      d="M5 1.5V3M11 1.5V3M2.5 6H13.5M4 2.5H12C12.8284 2.5 13.5 3.17157 13.5 4V12.5C13.5 13.3284 12.8284 14 12 14H4C3.17157 14 2.5 13.3284 2.5 12.5V4C2.5 3.17157 3.17157 2.5 4 2.5Z"
      stroke="white"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const floatingBarSurface =
  "rounded-2xl border border-[#FFFFFF3D] backdrop-blur-[61.6px] bg-[linear-gradient(91.44deg,rgba(63,114,255,0.12)_-4.99%,rgba(0,54,178,0.12)_52.99%,rgba(71,180,180,0.12)_112.17%)]";

const registerButtonClassName =
  "rounded-[11px] bg-white border border-white shadow-[0px_0px_29.8px_0px_#40B6FF] px-4 py-1.5 text-sm font-bold text-black";

const urgencyBadgeClassName =
  "rounded-[7px] bg-[linear-gradient(170.51deg,#000000_-4.73%,#CD0000_234.56%)] px-2 py-0.5 whitespace-nowrap";

const dateBadgeClassName =
  "flex items-center gap-1.5 rounded-[7px] border border-[#3E3E3E] bg-[#0000003D] backdrop-blur-[95px] px-2 py-0.5 whitespace-nowrap";

const Footer = () => {
  const [isIphone, setIsIphone] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const { webinarData } = useWebinar();
  const { selectedLanguage, selectLanguage, clearLanguage } = useLanguage();
  const { isPaid } = useLandingVariant();

  const formattedDates = getFormattedWebinarDates(webinarData, isPaid);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/iPhone|iPad|iPod/i.test(userAgent)) {
      setIsIphone(true);
    }
  }, []);

  const handleButtonClick = (language) => {
    if (isPaid) {
      selectLanguage(language);
      setShowPaymentDialog(true);
      return;
    }
    selectLanguage(language);
    setShowDialog(true);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setPendingAction(null);
    clearLanguage();
  };

  const handlePaymentDialogClose = () => {
    setShowPaymentDialog(false);
    clearLanguage();
  };

  const handleDialogSuccess = () => {
    if (pendingAction) {
      pendingAction();
    }
  };

  return (
    <footer
      className={`bg-[#010611] pt-20  ${isIphone ? "pb-40" : "pb-32"} relative`}
    >
      <div className="px-4">
        <div className="flex flex-col justify-center items-center rounded-[24px] bg-[#2323234D] w-full z-20 relative overflow-hidden">
          <div className="flex md:flex-row rounded-[24px]  flex-col md:justify-between md:items-center items-start  md:px-32  md:py-6 py-6 px-6 w-full relative  md:gap-2 gap-4  before:absolute before:inset-0 before:rounded-full before:border-b-[1px] before:border-transparent before:[border-image-source:linear-gradient(270.82deg,rgba(255,255,255,0.1)_2.68%,#ffffff_33.24%,rgba(255,255,255,0.1)_99.29%)] before:[border-image-slice:1] before:pointer-events-none">
            <AnimateFromInside>
              <div className="flex flex-col justify-start items-start gap-4">
                <div className="flex flex-col justify-start items-start w-full gap-4">
                  <div className="flex md:justify-start justify-center md:items-start items-center w-full">
                    <img
                      className="object-cover"
                      src={logofooter}
                      alt="logofooter"
                    />
                  </div>
                  <p className="md:block hidden font-light text-[14px] text-start leading-[22px] text-[#FFFFFF]">
                    Welcome to India's largest SEBI registered <br /> trading &
                    investing platform. We offer <br /> education, advisory &
                    research services.
                  </p>
                  <p className="md:hidden font-light text-[12px] md:text-start text-center leading-5 text-[#FFFFFF]">
                    Welcome to India's largest SEBI registered trading &
                    investing platform. We offer education, advisory & research
                    services.
                  </p>
                </div>
                <div className="flex flex-col gap-4 items-start justify-start w-full">
                  <div className="flex w-full justify-start items-center gap-4 bg-[#FFFFFF05] p-4 rounded-xl">
                    <img className="" src={verified} alt="verified" />
                    <div className="flex flex-col items-start justify-start">
                      <p className="font-light text-[14px] leading-4 text-[#FFFFFF]">
                        SEBI Registered Research Analyst
                      </p>
                      <p className="font-medium text-[16px] leading-5 text-[#FFFFFF]">
                        INH000013925
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full flex-col justify-start items-start gap-4 bg-[#FFFFFF05] p-4 rounded-xl">
                    <p className="font-medium text-[16px] leading-5 text-[#FFFFFF]">
                      Compliance Info
                    </p>
                    <p className="font-normal text-[14px] leading-4 text-[#FFFFFF]/[0.6]">
                      Compliance Officer:
                      <span className="font-medium text-[16px] leading-5 text-[#FFFFFF]">
                        {" "}
                        Parang Mehta
                      </span>
                    </p>
                    <p className="font-normal text-[14px] leading-4 text-[#FFFFFF]/[0.6]">
                      Number:
                      <span className="font-medium text-[16px] leading-5 text-[#FFFFFF]">
                        {" "}
                        +91-6350670245
                      </span>
                    </p>
                    <p className="font-normal text-[14px] leading-4 text-[#FFFFFF]/[0.6]">
                      Accessibility Nodal Officer:
                      <span className="font-medium text-[16px] leading-5 text-[#FFFFFF]">
                        {" "}
                        Madhur Sancheti
                      </span>
                    </p>
                    <p className="font-normal text-[14px] leading-4 text-[#FFFFFF]/[0.6]">
                      Contact Number:
                      <span className="font-medium text-[16px] leading-5 text-[#FFFFFF]">
                        {" "}
                        +91-9414535030
                      </span>
                    </p>
                    <p className="font-normal text-[14px] leading-4 text-[#FFFFFF]/[0.6]">
                      Email:
                      <span className="font-medium text-[16px] leading-5 text-[#FFFFFF]">
                        {" "}
                        parang@stockwiz.in
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </AnimateFromInside>
            <AnimateFromInside>
              <div className="md:flex hidden flex-col justify-start items-start gap-8">
                <p className="font-semibold text-[18px] leading-5 text-[#FFFFFF]">
                  Quick Links
                </p>
                <a
                  target="_blank"
                  href="https://www.stockwiz.in/about-us.html"
                  className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6]"
                >
                  About Us
                </a>

                <a
                  href="#pricing"
                  className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                >
                  Pricing
                </a>
                <a
                  href="#features"
                  className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                >
                  Features
                </a>
                <a
                  target="_blank"
                  href="https://www.stockwiz.in/assets/pdf/SEBIAuditReport.pdf"
                  className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                >
                  SEBI Audit Report
                </a>

                <a
                  target="_blank"
                  href="https://www.stockwiz.in/investor-charter.html"
                  className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                >
                  Investor Charter
                </a>
                <a
                  target="_blank"
                  href="https://www.stockwiz.in/complaint.html"
                  className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                >
                  Complaints
                </a>
              </div>
            </AnimateFromInside>
            <AnimateFromInside>
              <div className="md:flex hidden flex-col justify-start items-start gap-8">
                <p className="font-semibold text-[18px] leading-5 text-[#FFFFFF]">
                  Company
                </p>
                <a
                  target="_blank"
                  href="https://www.stockwiz.in/disclaimer.html"
                  className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                >
                  Disclaimer
                </a>
                <a
                  target="_blank"
                  href="https://www.stockwiz.in/grievance_policy.html"
                  className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                >
                  Grievance Policy
                </a>
                <a
                  target="_blank"
                  href="https://scores.sebi.gov.in/remote/login?lang=en"
                  className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                >
                  SEBI Scores
                </a>
                <a
                  target="_blank"
                  href="https://www.stockwiz.in/terms_nd_conditions.html"
                  className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                >
                  Terms & Conditions
                </a>
                <a
                  target="_blank"
                  href="https://www.stockwiz.in/privacy_policy.html"
                  className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                >
                  Privacy Policy
                </a>
                <a
                  target="_blank"
                  href="https://www.stockwiz.in/refund_policy.html"
                  className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                >
                  Refund Policy
                </a>
              </div>
            </AnimateFromInside>
            <div className="flex flex-col items-start justify-start gap-8">
              <div className="md:hidden flex w-full justify-start gap-6 items-center">
                <AnimateFromInside>
                  <div className="flex flex-col justify-start items-start gap-8">
                    <p className="font-semibold text-[18px] leading-5 text-[#FFFFFF]">
                      Quick Links
                    </p>
                    <a
                      target="_blank"
                      href="https://www.stockwiz.in/about-us.html"
                      className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6]"
                    >
                      About Us
                    </a>

                    <a
                      href="#pricing"
                      className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                    >
                      Pricing
                    </a>
                    <a
                      href="#features"
                      className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                    >
                      Features
                    </a>
                    <a
                      target="_blank"
                      href="https://www.stockwiz.in/assets/pdf/SEBIAuditReport.pdf"
                      className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                    >
                      SEBI Audit Report
                    </a>

                    <a
                      target="_blank"
                      href="https://www.stockwiz.in/investor-charter.html"
                      className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                    >
                      Investor Charter
                    </a>
                    <a
                      target="_blank"
                      href="https://www.stockwiz.in/complaint.html"
                      className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                    >
                      Complaints
                    </a>
                  </div>
                </AnimateFromInside>
                <AnimateFromInside>
                  <div className="flex flex-col justify-start items-start gap-8">
                    <p className="font-semibold text-[18px] leading-5 text-[#FFFFFF]">
                      Company
                    </p>
                    <a
                      target="_blank"
                      href="https://www.stockwiz.in/disclaimer.html"
                      className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                    >
                      Disclaimer
                    </a>
                    <a
                      target="_blank"
                      href="https://www.stockwiz.in/grievance_policy.html"
                      className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                    >
                      Grievance Policy
                    </a>
                    <a
                      target="_blank"
                      href="https://scores.sebi.gov.in/remote/login?lang=en"
                      className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                    >
                      SEBI Scores
                    </a>
                    <a
                      target="_blank"
                      href="https://www.stockwiz.in/terms_nd_conditions.html"
                      className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                    >
                      Terms & Conditions
                    </a>
                    <a
                      target="_blank"
                      href="https://www.stockwiz.in/privacy_policy.html"
                      className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                    >
                      Privacy Policy
                    </a>
                    <a
                      target="_blank"
                      href="https://www.stockwiz.in/refund_policy.html"
                      className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6] cursor-pointer"
                    >
                      Refund Policy
                    </a>
                  </div>
                </AnimateFromInside>
              </div>
              <AnimateFromInside>
                <div className="md:mt-0 mt-4">
                  <div className="flex flex-col md:justify-center md:items-start justify-start items-start w-full gap-4">
                    <p className="font-semibold text-[18px] leading-5 text-[#FFFFFF]">
                      Contact Us
                    </p>
                    <div className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6]">
                      Call Us:
                      <div className="flex gap-2 mt-2">
                        <img className="" src={call} alt="call" />
                        <p className="font-medium text-[14px] leading-5 text-[#FFFFFF]/[0.8] ">
                          <a target="_blank" href="tel:+91-8065919278">
                            +91 - 8065919278
                          </a>{" "}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start justify-start border-t border-[#FFFFFF4D] w-12 "></div>
                    <div className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6]">
                      Working Hours:
                      <div className="flex gap-2 mt-2">
                        <img className="" src={hour} alt="hour" />
                        <p className="font-medium text-[14px] leading-5 text-[#FFFFFF]/[0.8]">
                          09:00 AM to 9:00 PM (Mon - Sun)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start justify-start border-t border-[#FFFFFF4D] w-12 "></div>
                    <div className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6]">
                      Whatapp Us:
                      <div className="flex gap-2 mt-2">
                        <img className="" src={whatsapp1} alt="whatsapp1" />
                        <a
                          target="_blank"
                          href="https://wa.me/+916350670245"
                          className="font-medium text-[14px] leading-5 text-[#FFFFFF]/[0.8]"
                        >
                          +91 - 6350670245
                        </a>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <img className="" src={whatsapp1} alt="whatsapp1" />
                        <a
                          target="_blank"
                          href="https://wa.me/+917850934946"
                          className="font-medium text-[14px] leading-5 text-[#FFFFFF]/[0.8] cursor-pointer"
                        >
                          +91 - 7850934946
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start justify-start border-t border-[#FFFFFF4D] w-12 "></div>
                    <div className="font-normal text-[16px] leading-4 text-[#FFFFFF]/[0.6]">
                      Email Us:
                      <div className="flex gap-2 mt-2">
                        <img className="" src={email} alt="email" />
                        <a
                          target="_blank"
                          href="mailto:help@stockwiz.in"
                          className="font-medium text-[16px] leading-5 text-[#FFFFFF]/[0.8]"
                        >
                          help@stockwiz.in
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateFromInside>
            </div>
          </div>
          <div className="flex md:flex-row flex-col-reverse justify-between items-center md:px-32 px-4 gap-4 py-2 w-full">
            <AnimateFromInside>
              <p className="font-normal md:text-[16px] text-[14px] leading-4 text-[#FFFFFF] md:py-0 py-2">
                Copyright ©{Math.max(2026, new Date().getFullYear())} Stockwiz. All rights reserved.
              </p>
            </AnimateFromInside>
            <div className="md:hidden block border border-[#FFFFFF66]/[0.5] -mx-4 w-[calc(100%+32px)] opacity-50" />
            <AnimateFromInside>
              <div className="flex justify-center items-center gap-2">
                <a
                  target="_blank"
                  href="https://www.facebook.com/pmtradesofficial?mibextid=LQQJ4d"
                >
                  <img className="" src={facebook} alt="facebook" />
                </a>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/company/stockwiz-technologies-llp/"
                >
                  <img className="" src={linkedin} alt="linkedin" />
                </a>
                <a target="_blank" href="https://www.instagram.com/pmtrades/">
                  <img className="" src={instagram} alt="instagram" />
                </a>
                <a target="_blank" href="https://www.youtube.com/@pmtrades">
                  <img className="" src={youtube} alt="youtube" />
                </a>
                <a
                  target="_blank"
                  href="https://x.com/i/flow/login?redirect_after_login=%2Fmehta_parang"
                >
                  <img className="" src={twitter} alt="twitter" />
                </a>
              </div>
            </AnimateFromInside>
          </div>
        </div>
      </div>
      {/* Desktop floating CTA bar */}
      <div className="fixed bottom-4 inset-x-0 z-50 hidden md:flex justify-center px-6 pointer-events-none">
        <div
          className={`pointer-events-auto font-inter flex w-full max-w-[1180px] items-center justify-between gap-4 px-5 py-3.5 shadow-[0_16px_48px_rgba(0,0,0,0.55)] ${floatingBarSurface}`}
        >
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="flex shrink-0 items-baseline gap-2">
              {isPaid ? (
                <>
                  <span className="font-bold text-[36px] leading-none text-white inline-flex items-baseline gap-0.5">
                    <span className="text-[28px]">₹</span>199
                  </span>
                  <span className="text-[20px] leading-none text-white/45 line-through">
                    ₹499
                  </span>
                </>
              ) : (
                <>
                  <span className="font-bold text-[36px] leading-none text-white">
                    Free
                  </span>
                  <span className="text-[20px] leading-none text-white/45 line-through">
                    ₹499
                  </span>
                </>
              )}
            </div>
            <div className={urgencyBadgeClassName}>
              <span className="text-sm font-semibold text-white">
                Hurry Up!
              </span>
              <span className="text-sm font-medium text-[#ff6b6b]">
                {" "}
                Limited Seats Only
              </span>
            </div>
            <div className={dateBadgeClassName}>
              <CalendarIcon />
              <span className="text-sm font-medium text-white">
                {formattedDates.english}
              </span>
            </div>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() => handleButtonClick("english")}
              className={registerButtonClassName}
            >
              Register Now
            </button>
          </div>
        </div>
      </div>

      {/* Mobile floating CTA bar */}
      <div className="fixed bottom-4 inset-x-0 z-50 flex justify-center px-3 md:hidden pointer-events-none">
        <div
          className={`pointer-events-auto font-inter flex w-full max-w-lg items-center justify-between gap-2 px-3 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.5)] ${floatingBarSurface}`}
        >
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
            <div className="flex shrink-0 items-baseline gap-1.5">
              {isPaid ? (
                <>
                  <span className="font-bold text-[24px] leading-none text-white inline-flex items-baseline gap-0.5">
                    <span className="text-[18px]">₹</span>199
                  </span>
                  <span className="text-sm leading-none text-white/45 line-through">
                    ₹499
                  </span>
                </>
              ) : (
                <>
                  <span className="font-bold text-[24px] leading-none text-white">
                    Free
                  </span>
                  <span className="text-sm leading-none text-white/45 line-through">
                    ₹499
                  </span>
                </>
              )}
            </div>
            <div className={urgencyBadgeClassName}>
              <span className="text-xs font-semibold text-white">
                Hurry Up!
              </span>
              <span className="text-xs font-medium text-[#ff6b6b]">
                {" "}
                Limited Seats Only
              </span>
            </div>
            <div className={dateBadgeClassName}>
              <CalendarIcon />
              <span className="text-xs font-medium text-white">
                {formattedDates.english}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleButtonClick("english")}
            className={`${registerButtonClassName} shrink-0 touch-manipulation`}
          >
            Register Now
          </button>
        </div>
      </div>

      {!isPaid && (
        <StrykeXPopupDialog
          open={showDialog}
          onClose={handleDialogClose}
          onSuccess={handleDialogSuccess}
          selectedLanguage={selectedLanguage}
        />
      )}

      {isPaid && (
        <StrykexPaymentDialog
          open={showPaymentDialog}
          selectedLanguage={selectedLanguage}
          handleClose={handlePaymentDialogClose}
        />
      )}
    </footer>
  );
};

export default Footer;
